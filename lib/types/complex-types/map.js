import * as tslib_1 from "tslib"
import { observable, action, intercept, observe, extras } from "mobx"
import { getStateTreeNode, escapeJsonPath, createNode, isStateTreeNode } from "../../core"
import { addHiddenFinalProp, fail, isMutable, isPlainObject } from "../../utils"
import { ComplexType } from "../type"
import { TypeFlags } from "../type-flags"
import { typeCheckFailure, flattenTypeErrors, getContextForPath, typecheck } from "../type-checker"
export function mapToString() {
    return getStateTreeNode(this) + "(" + this.size + " items)"
}
function put(value) {
    if (!!!value) fail("Map.put cannot be used to set empty values")
    var node
    if (isStateTreeNode(value)) {
        node = getStateTreeNode(value)
    } else if (isMutable(value)) {
        var targetType = getStateTreeNode(this).type.subType
        node = getStateTreeNode(targetType.create(value))
    } else {
        return fail("Map.put can only be used to store complex values")
    }
    if (!node.identifierAttribute)
        fail(
            "Map.put can only be used to store complex values that have an identifier type attribute"
        )
    this.set(node.identifier, node.value)
    return this
}
var MapType = (function(_super) {
    tslib_1.__extends(MapType, _super)
    function MapType(name, subType) {
        var _this = _super.call(this, name) || this
        _this.shouldAttachNode = true
        _this.flags = TypeFlags.Map
        _this.createNewInstance = function() {
            // const identifierAttr = getIdentifierAttribute(this.subType)
            var map = observable.shallowMap()
            addHiddenFinalProp(map, "put", put)
            addHiddenFinalProp(map, "toString", mapToString)
            return map
        }
        _this.finalizeNewInstance = function(node, snapshot) {
            var instance = node.storedValue
            extras.interceptReads(instance, node.unbox)
            intercept(instance, function(c) {
                return _this.willChange(c)
            })
            node.applySnapshot(snapshot)
            observe(instance, _this.didChange)
        }
        _this.subType = subType
        return _this
    }
    MapType.prototype.instantiate = function(parent, subpath, environment, snapshot) {
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
    MapType.prototype.describe = function() {
        return "Map<string, " + this.subType.describe() + ">"
    }
    MapType.prototype.getChildren = function(node) {
        return node.storedValue.values()
    }
    MapType.prototype.getChildNode = function(node, key) {
        var childNode = node.storedValue.get(key)
        if (!childNode) fail("Not a child " + key)
        return childNode
    }
    MapType.prototype.willChange = function(change) {
        var node = getStateTreeNode(change.object)
        node.assertWritable()
        switch (change.type) {
            case "update":
                {
                    var newValue = change.newValue
                    var oldValue = change.object.get(change.name)
                    if (newValue === oldValue) return null
                    typecheck(this.subType, newValue)
                    change.newValue = this.subType.reconcile(
                        node.getChildNode(change.name),
                        change.newValue
                    )
                    this.verifyIdentifier(change.name, change.newValue)
                }
                break
            case "add":
                {
                    typecheck(this.subType, change.newValue)
                    change.newValue = this.subType.instantiate(
                        node,
                        change.name,
                        undefined,
                        change.newValue
                    )
                    this.verifyIdentifier(change.name, change.newValue)
                }
                break
            case "delete":
                {
                    if (node.storedValue.has(change.name)) {
                        node.getChildNode(change.name).die()
                    }
                }
                break
        }
        return change
    }
    MapType.prototype.verifyIdentifier = function(expected, node) {
        var identifier = node.identifier
        if (identifier !== null && "" + identifier !== "" + expected)
            fail(
                "A map of objects containing an identifier should always store the object under their own identifier. Trying to store key '" +
                    identifier +
                    "', but expected: '" +
                    expected +
                    "'"
            )
    }
    MapType.prototype.getValue = function(node) {
        return node.storedValue
    }
    MapType.prototype.getSnapshot = function(node) {
        var res = {}
        node.getChildren().forEach(function(childNode) {
            res[childNode.subpath] = childNode.snapshot
        })
        return res
    }
    MapType.prototype.didChange = function(change) {
        var node = getStateTreeNode(change.object)
        switch (change.type) {
            case "update":
                return void node.emitPatch(
                    {
                        op: "replace",
                        path: escapeJsonPath(change.name),
                        value: change.newValue.snapshot,
                        oldValue: change.oldValue ? change.oldValue.snapshot : undefined
                    },
                    node
                )
            case "add":
                return void node.emitPatch(
                    {
                        op: "add",
                        path: escapeJsonPath(change.name),
                        value: change.newValue.snapshot,
                        oldValue: undefined
                    },
                    node
                )
            case "delete":
                return void node.emitPatch(
                    {
                        op: "remove",
                        path: escapeJsonPath(change.name),
                        oldValue: change.oldValue.snapshot
                    },
                    node
                )
        }
    }
    MapType.prototype.applyPatchLocally = function(node, subpath, patch) {
        var target = node.storedValue
        switch (patch.op) {
            case "add":
            case "replace":
                target.set(subpath, patch.value)
                break
            case "remove":
                target.delete(subpath)
                break
        }
    }
    MapType.prototype.applySnapshot = function(node, snapshot) {
        typecheck(this, snapshot)
        var target = node.storedValue
        var currentKeys = {}
        target.keys().forEach(function(key) {
            currentKeys[key] = false
        })
        // Don't use target.replace, as it will throw all existing items first
        Object.keys(snapshot).forEach(function(key) {
            target.set(key, snapshot[key])
            currentKeys[key] = true
        })
        Object.keys(currentKeys).forEach(function(key) {
            if (currentKeys[key] === false) target.delete(key)
        })
    }
    MapType.prototype.getChildType = function(key) {
        return this.subType
    }
    MapType.prototype.isValidSnapshot = function(value, context) {
        var _this = this
        if (!isPlainObject(value)) {
            return typeCheckFailure(context, value)
        }
        return flattenTypeErrors(
            Object.keys(value).map(function(path) {
                return _this.subType.validate(
                    value[path],
                    getContextForPath(context, path, _this.subType)
                )
            })
        )
    }
    MapType.prototype.getDefaultSnapshot = function() {
        return {}
    }
    MapType.prototype.removeChild = function(node, subpath) {
        node.storedValue.delete(subpath)
    }
    tslib_1.__decorate([action], MapType.prototype, "applySnapshot", null)
    return MapType
})(ComplexType)
export { MapType }
/**
 * Creates a key based collection type who's children are all of a uniform declared type.
 * If the type stored in a map has an identifier, it is mandatory to store the child under that identifier in the map.
 *
 * This type will always produce [observable maps](https://mobx.js.org/refguide/map.html)
 *
 * @example
 * ```javascript
 * const Todo = types.model({
 *   id: types.identifier,
 *   task: types.string
 * })
 *
 * const TodoStore = types.model({
 *   todos: types.map(Todo)
 * })
 *
 * const s = TodoStore.create({ todos: [] })
 * s.todos.set(17, { task: "Grab coffee", id: 17 })
 * s.todos.put({ task: "Grab cookie", id: 18 }) // put will infer key from the identifier
 * console.log(s.todos.get(17)) // prints: "Grab coffee"
 * ```
 * @export
 * @alias types.map
 * @param {IType<S, T>} subtype
 * @returns {IComplexType<S[], IObservableArray<T>>}
 */
export function map(subtype) {
    return new MapType("map<string, " + subtype.name + ">", subtype)
}
//# sourceMappingURL=map.js.map
