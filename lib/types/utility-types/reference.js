import * as tslib_1 from "tslib"
import { getStateTreeNode, isStateTreeNode, createNode } from "../../core"
import { Type } from "../type"
import { TypeFlags, isReferenceType } from "../type-flags"
import { typeCheckSuccess, typeCheckFailure, prettyPrintValue } from "../type-checker"
import { fail } from "../../utils"
var StoredReference = (function() {
    function StoredReference(mode, value) {
        this.mode = mode
        this.value = value
        if (mode === "object") {
            if (!isStateTreeNode(value))
                return fail("Can only store references to tree nodes, got: '" + value + "'")
            var targetNode = getStateTreeNode(value)
            if (!targetNode.identifierAttribute)
                return fail("Can only store references with a defined identifier attribute.")
        }
    }
    return StoredReference
})()
var ReferenceType = (function(_super) {
    tslib_1.__extends(ReferenceType, _super)
    function ReferenceType(targetType) {
        var _this = _super.call(this, "reference(" + targetType.name + ")") || this
        _this.targetType = targetType
        _this.flags = TypeFlags.Reference
        return _this
    }
    ReferenceType.prototype.describe = function() {
        return this.name
    }
    ReferenceType.prototype.getValue = function(node) {
        var ref = node.storedValue
        if (ref.mode === "object") return ref.value
        if (!node.isAlive) return undefined
        // reference was initialized with the identifier of the target
        var target = node.root.identifierCache.resolve(this.targetType, ref.value)
        if (!target)
            return fail(
                "Failed to resolve reference of type " +
                    this.targetType.name +
                    ": '" +
                    ref.value +
                    "' (in: " +
                    node.path +
                    ")"
            )
        return target.value
    }
    ReferenceType.prototype.getSnapshot = function(node) {
        var ref = node.storedValue
        switch (ref.mode) {
            case "identifier":
                return ref.value
            case "object":
                return getStateTreeNode(ref.value).identifier
        }
    }
    ReferenceType.prototype.instantiate = function(parent, subpath, environment, snapshot) {
        var isComplex = isStateTreeNode(snapshot)
        return createNode(
            this,
            parent,
            subpath,
            environment,
            new StoredReference(isComplex ? "object" : "identifier", snapshot)
        )
    }
    ReferenceType.prototype.reconcile = function(current, newValue) {
        var targetMode = isStateTreeNode(newValue) ? "object" : "identifier"
        if (isReferenceType(current.type)) {
            var ref = current.storedValue
            if (targetMode === ref.mode && ref.value === newValue) return current
        }
        var newNode = this.instantiate(
            current.parent,
            current.subpath,
            current._environment,
            newValue
        )
        current.die()
        return newNode
    }
    ReferenceType.prototype.isAssignableFrom = function(type) {
        return this.targetType.isAssignableFrom(type)
    }
    ReferenceType.prototype.isValidSnapshot = function(value, context) {
        return typeof value === "string" || typeof value === "number"
            ? typeCheckSuccess()
            : typeCheckFailure(
                  context,
                  value,
                  "Value '" +
                      prettyPrintValue(value) +
                      "' is not a valid reference. Expected a string or number."
              )
    }
    return ReferenceType
})(Type)
export { ReferenceType }
/**
 * Creates a reference to another type, which should have defined an identifier.
 * See also the [reference and identifiers](https://github.com/mobxjs/mobx-state-tree#references-and-identifiers) section.
 *
 * @export
 * @alias types.reference
 */
export function reference(factory) {
    if (arguments.length === 2 && typeof arguments[1] === "string")
        fail("References with base path are no longer supported. Please remove the base path.")
    return new ReferenceType(factory)
}
//# sourceMappingURL=reference.js.map
