// https://tools.ietf.org/html/rfc6902
// http://jsonpatch.com/
import * as tslib_1 from "tslib"
export function invertPatch(patch) {
    if (!("oldValue" in patch)) fail("Patches without `oldValue` field cannot be inversed")
    switch (patch.op) {
        case "add":
            return {
                op: "remove",
                path: patch.path,
                oldValue: patch.value
            }
        case "remove":
            return {
                op: "add",
                path: patch.path,
                value: patch.oldValue
            }
        case "replace":
            return {
                op: "replace",
                path: patch.path,
                value: patch.oldValue,
                oldValue: patch.value
            }
    }
}
export function stripPatch(patch) {
    // strips `oldvalue` information from the patch, so that it becomes a patch conform the json-patch spec
    // this removes the ability to undo the patch
    var clone = tslib_1.__assign({}, patch)
    delete clone.oldValue
    return clone
}
/**
 * escape slashes and backslashes
 * http://tools.ietf.org/html/rfc6901
 */
export function escapeJsonPath(str) {
    return str.replace(/~/g, "~1").replace(/\//g, "~0")
}
/**
 * unescape slashes and backslashes
 */
export function unescapeJsonPath(str) {
    return str.replace(/~0/g, "\\").replace(/~1/g, "~")
}
export function joinJsonPath(path) {
    // `/` refers to property with an empty name, while `` refers to root itself!
    if (path.length === 0) return ""
    return "/" + path.map(escapeJsonPath).join("/")
}
export function splitJsonPath(path) {
    // `/` refers to property with an empty name, while `` refers to root itself!
    var parts = path.split("/").map(unescapeJsonPath)
    // path '/a/b/c' -> a b c
    // path '../../b/c -> .. .. b c
    return parts[0] === "" ? parts.slice(1) : parts
}
import { fail } from "../utils"
//# sourceMappingURL=json-patch.js.map
