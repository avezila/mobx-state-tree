import * as tslib_1 from "tslib"
import { action } from "mobx"
/*
 * A complex type produces a MST node (Node in the state tree)
 */
var ComplexType = (function() {
    function ComplexType(name) {
        this.isType = true
        this.name = name
    }
    ComplexType.prototype.create = function(snapshot, environment) {
        if (snapshot === void 0) {
            snapshot = this.getDefaultSnapshot()
        }
        typecheck(this, snapshot)
        return this.instantiate(null, "", environment, snapshot).value
    }
    ComplexType.prototype.isAssignableFrom = function(type) {
        return type === this
    }
    ComplexType.prototype.validate = function(value, context) {
        if (isStateTreeNode(value)) {
            return getType(value) === this || this.isAssignableFrom(getType(value))
                ? typeCheckSuccess()
                : typeCheckFailure(context, value)
            // it is tempting to compare snapshots, but in that case we should always clone on assignments...
        }
        return this.isValidSnapshot(value, context)
    }
    ComplexType.prototype.is = function(value) {
        return this.validate(value, [{ path: "", type: this }]).length === 0
    }
    ComplexType.prototype.reconcile = function(current, newValue) {
        if (current.snapshot === newValue)
            // newValue is the current snapshot of the node, noop
            return current
        if (isStateTreeNode(newValue) && getStateTreeNode(newValue) === current)
            // the current node is the same as the new one
            return current
        if (
            current.type === this &&
            isMutable(newValue) &&
            !isStateTreeNode(newValue) &&
            (!current.identifierAttribute ||
                current.identifier === newValue[current.identifierAttribute])
        ) {
            // the newValue has no node, so can be treated like a snapshot
            // we can reconcile
            current.applySnapshot(newValue)
            return current
        }
        // current node cannot be recycled in any way
        var parent = current.parent,
            subpath = current.subpath
        current.die()
        // attempt to reuse the new one
        if (isStateTreeNode(newValue) && this.isAssignableFrom(getType(newValue))) {
            // newValue is a Node as well, move it here..
            var newNode = getStateTreeNode(newValue)
            newNode.setParent(parent, subpath)
            return newNode
        }
        // nothing to do, we have to create a new node
        return this.instantiate(parent, subpath, current._environment, newValue)
    }
    Object.defineProperty(ComplexType.prototype, "Type", {
        get: function() {
            return fail(
                "Factory.Type should not be actually called. It is just a Type signature that can be used at compile time with Typescript, by using `typeof type.Type`"
            )
        },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(ComplexType.prototype, "SnapshotType", {
        get: function() {
            return fail(
                "Factory.SnapshotType should not be actually called. It is just a Type signature that can be used at compile time with Typescript, by using `typeof type.SnapshotType`"
            )
        },
        enumerable: true,
        configurable: true
    })
    tslib_1.__decorate([action], ComplexType.prototype, "create", null)
    return ComplexType
})()
export { ComplexType }
var Type = (function(_super) {
    tslib_1.__extends(Type, _super)
    function Type(name) {
        return _super.call(this, name) || this
    }
    Type.prototype.getValue = function(node) {
        return node.storedValue
    }
    Type.prototype.getSnapshot = function(node) {
        return node.storedValue
    }
    Type.prototype.getDefaultSnapshot = function() {
        return undefined
    }
    Type.prototype.applySnapshot = function(node, snapshot) {
        fail("Immutable types do not support applying snapshots")
    }
    Type.prototype.applyPatchLocally = function(node, subpath, patch) {
        fail("Immutable types do not support applying patches")
    }
    Type.prototype.getChildren = function(node) {
        return EMPTY_ARRAY
    }
    Type.prototype.getChildNode = function(node, key) {
        return fail("No child '" + key + "' available in type: " + this.name)
    }
    Type.prototype.getChildType = function(key) {
        return fail("No child '" + key + "' available in type: " + this.name)
    }
    Type.prototype.reconcile = function(current, newValue) {
        // reconcile only if type and value are still the same
        if (current.type === this && current.storedValue === newValue) return current
        var res = this.instantiate(current.parent, current.subpath, current._environment, newValue)
        current.die()
        return res
    }
    Type.prototype.removeChild = function(node, subpath) {
        return fail("No child '" + subpath + "' available in type: " + this.name)
    }
    return Type
})(ComplexType)
export { Type }
import { EMPTY_ARRAY, fail, isMutable } from "../utils"
import { isStateTreeNode, getStateTreeNode } from "../core/node"
import { typecheck, typeCheckFailure, typeCheckSuccess } from "./type-checker"
import { getType } from "../core/mst-operations"
//# sourceMappingURL=type.js.map
