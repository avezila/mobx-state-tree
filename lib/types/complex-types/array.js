import * as tslib_1 from "tslib"
import { observable, action, intercept, observe, extras } from "mobx"
import { createNode, getStateTreeNode, isStateTreeNode } from "../../core"
import { addHiddenFinalProp, fail, isMutable, isArray } from "../../utils"
import { ComplexType } from "../type"
import { TypeFlags } from "../type-flags"
import { typecheck, flattenTypeErrors, getContextForPath, typeCheckFailure } from "../type-checker"
export function arrayToString() {
    return getStateTreeNode(this) + "(" + this.length + " items)"
}
var ArrayType = (function(_super) {
    tslib_1.__extends(ArrayType, _super)
    function ArrayType(name, subType) {
        var _this = _super.call(this, name) || this
        _this.shouldAttachNode = true
        _this.flags = TypeFlags.Array
        _this.createNewInstance = function() {
            var array = observable.shallowArray()
            addHiddenFinalProp(array, "toString", arrayToString)
            return array
        }
        _this.finalizeNewInstance = function(node, snapshot) {
            var instance = node.storedValue
            extras.getAdministration(instance).dehancer = node.unbox
            intercept(instance, function(change) {
                return _this.willChange(change)
            })
            node.applySnapshot(snapshot)
            observe(instance, _this.didChange)
        }
        _this.subType = subType
        return _this
    }
    ArrayType.prototype.describe = function() {
        return this.subType.describe() + "[]"
    }
    ArrayType.prototype.instantiate = function(parent, subpath, environment, snapshot) {
        return createNode(
            this,
            parent,
            subpath,
            environment,
            snapshot,
            this.createNewInstance,
            this.finalizeNewInstance
        )
    }
    ArrayType.prototype.getChildren = function(node) {
        return node.storedValue.peek()
    }
    ArrayType.prototype.getChildNode = function(node, key) {
        var index = parseInt(key, 10)
        if (index < node.storedValue.length) return node.storedValue[index]
        return fail("Not a child: " + key)
    }
    ArrayType.prototype.willChange = function(change) {
        var node = getStateTreeNode(change.object)
        node.assertWritable()
        var childNodes = node.getChildren()
        switch (change.type) {
            case "update":
                if (change.newValue === change.object[change.index]) return null
                change.newValue = reconcileArrayChildren(
                    node,
                    this.subType,
                    [childNodes[change.index]],
                    [change.newValue],
                    [change.index]
                )[0]
                break
            case "splice":
                var index_1 = change.index,
                    removedCount = change.removedCount,
                    added = change.added
                change.added = reconcileArrayChildren(
                    node,
                    this.subType,
                    childNodes.slice(index_1, index_1 + removedCount),
                    added,
                    added.map(function(_, i) {
                        return index_1 + i
                    })
                )
                // update paths of remaining items
                for (var i = index_1 + removedCount; i < childNodes.length; i++) {
                    childNodes[i].setParent(node, "" + (i + added.length - removedCount))
                }
                break
        }
        return change
    }
    ArrayType.prototype.getValue = function(node) {
        return node.storedValue
    }
    ArrayType.prototype.getSnapshot = function(node) {
        return node.getChildren().map(function(childNode) {
            return childNode.snapshot
        })
    }
    ArrayType.prototype.didChange = function(change) {
        var node = getStateTreeNode(change.object)
        switch (change.type) {
            case "update":
                return void node.emitPatch(
                    {
                        op: "replace",
                        path: "" + change.index,
                        value: change.newValue.snapshot,
                        oldValue: change.oldValue ? change.oldValue.snapshot : undefined
                    },
                    node
                )
            case "splice":
                for (var i = change.removedCount - 1; i >= 0; i--)
                    node.emitPatch(
                        {
                            op: "remove",
                            path: "" + (change.index + i),
                            oldValue: change.removed[i].snapshot
                        },
                        node
                    )
                for (var i = 0; i < change.addedCount; i++)
                    node.emitPatch(
                        {
                            op: "add",
                            path: "" + (change.index + i),
                            value: node.getChildNode("" + (change.index + i)).snapshot,
                            oldValue: undefined
                        },
                        node
                    )
                return
        }
    }
    ArrayType.prototype.applyPatchLocally = function(node, subpath, patch) {
        var target = node.storedValue
        var index = subpath === "-" ? target.length : parseInt(subpath)
        switch (patch.op) {
            case "replace":
                target[index] = patch.value
                break
            case "add":
                target.splice(index, 0, patch.value)
                break
            case "remove":
                target.splice(index, 1)
                break
        }
    }
    ArrayType.prototype.applySnapshot = function(node, snapshot) {
        typecheck(this, snapshot)
        var target = node.storedValue
        target.replace(snapshot)
    }
    ArrayType.prototype.getChildType = function(key) {
        return this.subType
    }
    ArrayType.prototype.isValidSnapshot = function(value, context) {
        var _this = this
        if (!isArray(value)) {
            return typeCheckFailure(context, value)
        }
        return flattenTypeErrors(
            value.map(function(item, index) {
                return _this.subType.validate(
                    item,
                    getContextForPath(context, "" + index, _this.subType)
                )
            })
        )
    }
    ArrayType.prototype.getDefaultSnapshot = function() {
        return []
    }
    ArrayType.prototype.removeChild = function(node, subpath) {
        node.storedValue.splice(parseInt(subpath, 10), 1)
    }
    tslib_1.__decorate([action], ArrayType.prototype, "applySnapshot", null)
    return ArrayType
})(ComplexType)
export { ArrayType }
/**
 * Creates a index based collection type who's children are all of a uniform declared type.
 *
 * This type will always produce [observable arrays](https://mobx.js.org/refguide/array.html)
 *
 * @example
 * ```javascript
 * const Todo = types.model({
 *   task: types.string
 * })
 *
 * const TodoStore = types.model({
 *   todos: types.array(Todo)
 * })
 *
 * const s = TodoStore.create({ todos: [] })
 * s.todos.push({ task: "Grab coffee" })
 * console.log(s.todos[0]) // prints: "Grab coffee"
 * ```
 * @export
 * @alias types.array
 * @param {IType<S, T>} subtype
 * @returns {IComplexType<S[], IObservableArray<T>>}
 */
export function array(subtype) {
    return new ArrayType(subtype.name + "[]", subtype)
}
function reconcileArrayChildren(parent, childType, oldNodes, newValues, newPaths) {
    var res = new Array(newValues.length)
    var nodesToBeKilled = {}
    var oldNodesByIdentifier = {}
    function findReconcilationCandidates(snapshot) {
        for (var attr in oldNodesByIdentifier) {
            var id = snapshot[attr]
            if (
                (typeof id === "string" || typeof id === "number") &&
                oldNodesByIdentifier[attr][id]
            )
                return oldNodesByIdentifier[attr][id]
        }
        return null
    }
    // Investigate which values we could reconcile, and mark them all as potentially dead
    oldNodes.forEach(function(oldNode) {
        if (oldNode.identifierAttribute)
            (oldNodesByIdentifier[oldNode.identifierAttribute] ||
                (oldNodesByIdentifier[oldNode.identifierAttribute] = {}))[
                oldNode.identifier
            ] = oldNode
        nodesToBeKilled[oldNode.nodeId] = oldNode
    })
    // Prepare new values, try to reconcile
    newValues.forEach(function(newValue, index) {
        var subPath = "" + newPaths[index]
        if (isStateTreeNode(newValue)) {
            // A tree node...
            var childNode = getStateTreeNode(newValue)
            childNode.assertAlive()
            if (childNode.parent === parent) {
                // Came from this array already
                if (!nodesToBeKilled[childNode.nodeId]) {
                    // this node is owned by this parent, but not in the reconcilable set, so it must be double
                    fail(
                        "Cannot add an object to a state tree if it is already part of the same or another state tree. Tried to assign an object to '" +
                            parent.path +
                            "/" +
                            subPath +
                            "', but it lives already at '" +
                            childNode.path +
                            "'"
                    )
                }
                nodesToBeKilled[childNode.nodeId] = undefined
                childNode.setParent(parent, subPath)
                res[index] = childNode // reuse node
            } else {
                // Lives somewhere else (note that instantiate might still reconcile for complex types!)
                res[index] = childType.instantiate(parent, subPath, undefined, newValue)
            }
        } else if (isMutable(newValue)) {
            // The snapshot of a tree node, try to reconcile based on id
            var reconcilationCandidate = findReconcilationCandidates(newValue)
            if (reconcilationCandidate) {
                var childNode = childType.reconcile(reconcilationCandidate, newValue)
                nodesToBeKilled[reconcilationCandidate.nodeId] = undefined
                childNode.setParent(parent, subPath)
                res[index] = childNode
            } else {
                res[index] = childType.instantiate(parent, subPath, undefined, newValue)
            }
        } else {
            // create a fresh MST node
            res[index] = childType.instantiate(parent, subPath, undefined, newValue)
        }
    })
    // Kill non reconciled values
    for (var key in nodesToBeKilled)
        if (nodesToBeKilled[key] !== undefined) nodesToBeKilled[key].die()
    return res
}
//# sourceMappingURL=array.js.map
