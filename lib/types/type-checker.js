export function prettyPrintValue(value) {
    return typeof value === "function"
        ? "<function" + (value.name ? " " + value.name : "") + ">"
        : isStateTreeNode(value) ? "<" + value + ">" : "`" + JSON.stringify(value) + "`"
}
function toErrorString(error) {
    var value = error.value
    var type = error.context[error.context.length - 1].type
    var fullPath = error.context
        .map(function(_a) {
            var path = _a.path
            return path
        })
        .filter(function(path) {
            return path.length > 0
        })
        .join("/")
    var pathPrefix = fullPath.length > 0 ? 'at path "/' + fullPath + '" ' : ""
    var currentTypename = isStateTreeNode(value)
        ? "value of type " + getStateTreeNode(value).type.name + ":"
        : isPrimitive(value) ? "value" : "snapshot"
    var isSnapshotCompatible =
        type && isStateTreeNode(value) && type.is(getStateTreeNode(value).snapshot)
    return (
        "" +
        pathPrefix +
        currentTypename +
        " " +
        prettyPrintValue(value) +
        " is not assignable " +
        (type ? "to type: `" + type.name + "`" : "") +
        (error.message ? " (" + error.message + ")" : "") +
        (type
            ? isPrimitiveType(type)
              ? "."
              : ", expected an instance of `" +
                type.name +
                "` or a snapshot like `" +
                type.describe() +
                "` instead." +
                (isSnapshotCompatible
                    ? " (Note that a snapshot of the provided value is compatible with the targeted type)"
                    : "")
            : ".")
    )
}
export function getDefaultContext(type) {
    return [{ type: type, path: "" }]
}
export function getContextForPath(context, path, type) {
    return context.concat([{ path: path, type: type }])
}
export function typeCheckSuccess() {
    return EMPTY_ARRAY
}
export function typeCheckFailure(context, value, message) {
    return [{ context: context, value: value, message: message }]
}
export function flattenTypeErrors(errors) {
    return errors.reduce(function(a, i) {
        return a.concat(i)
    }, [])
}
// TODO; doublecheck: typecheck should only needed to be invoked from: type.create and array / map / value.property will change
export function typecheck(type, value) {
    var errors = type.validate(value, [{ path: "", type: type }])
    if (errors.length > 0) {
        fail(
            "Error while converting " +
                prettyPrintValue(value) +
                " to `" +
                type.name +
                "`:\n" +
                errors.map(toErrorString).join("\n")
        )
    }
}
import { fail, EMPTY_ARRAY, isPrimitive } from "../utils"
import { getStateTreeNode, isStateTreeNode } from "../core"
import { isPrimitiveType } from "./type-flags"
//# sourceMappingURL=type-checker.js.map
