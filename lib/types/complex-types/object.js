import * as tslib_1 from "tslib"
import { action, extendShallowObservable, intercept, observe } from "mobx"
import { extendKeepGetter, fail, hasOwnProperty, isPlainObject, isPrimitive } from "../../utils"
import { ComplexType } from "../type"
import { TypeFlags, isType, isObjectType } from "../type-flags"
import { createNode, getStateTreeNode } from "../../core"
import { flattenTypeErrors, typecheck, typeCheckFailure } from "../type-checker"
import { getPrimitiveFactoryFromValue } from "../primitives"
import { optional } from "../utility-types/optional"
import { ComputedProperty } from "../property-types/computed-property"
import { ValueProperty } from "../property-types/value-property"
import { ActionProperty } from "../property-types/action-property"
import { ViewProperty } from "../property-types/view-property"
import { VolatileProperty } from "../property-types/volatile-property"
var HOOK_NAMES = [
    "preProcessSnapshot",
    "afterCreate",
    "afterAttach",
    "postProcessSnapshot",
    "beforeDetach",
    "beforeDestroy"
]
function objectTypeToString() {
    return getStateTreeNode(this).toString()
}
// TODO: rename to Model
var ObjectType = (function(_super) {
    tslib_1.__extends(ObjectType, _super)
    function ObjectType(name, baseModel, baseState, baseActions) {
        var _this = _super.call(this, name) || this
        _this.shouldAttachNode = true
        _this.flags = TypeFlags.Object
        /*
         * Parsed description of all properties
         */
        _this.props = {}
        _this.createNewInstance = function() {
            var instance = new _this.modelConstructor()
            extendShallowObservable(instance, {})
            return instance
        }
        _this.finalizeNewInstance = function(node, snapshot) {
            var instance = node.storedValue
            _this.forAllProps(function(prop) {
                return prop.initialize(instance, snapshot)
            })
            intercept(instance, function(change) {
                return _this.willChange(change)
            })
            observe(instance, _this.didChange)
        }
        _this.didChange = function(change) {
            _this.props[change.name].didChange(change)
        }
        Object.freeze(baseModel) // make sure nobody messes with it
        Object.freeze(baseActions)
        _this.properties = baseModel
        _this.state = baseState
        _this.actions = baseActions
        if (!/^\w[\w\d_]*$/.test(name)) fail("Typename should be a valid identifier: " + name)
        // fancy trick to get a named function...., http://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
        // Although object.defineProperty on a real function could also be used, that name is not used everywhere, for example when logging an object to the Chrome console, so this works better:
        _this.modelConstructor = (function() {
            function class_1() {}
            return class_1
        })()
        Object.defineProperty(_this.modelConstructor, "name", {
            value: name,
            writable: false
        })
        _this.modelConstructor.prototype.toString = objectTypeToString
        _this.parseModelProps()
        _this.forAllProps(function(prop) {
            return prop.initializePrototype(_this.modelConstructor.prototype)
        })
        return _this
    }
    ObjectType.prototype.instantiate = function(parent, subpath, environment, snapshot) {
        return createNode(
            this,
            parent,
            subpath,
            environment,
            this.preProcessSnapshot(snapshot),
            this.createNewInstance,
            this.finalizeNewInstance
        )
    }
    ObjectType.prototype.willChange = function(change) {
        var node = getStateTreeNode(change.object)
        node.assertWritable()
        return this.props[change.name].willChange(change)
    }
    ObjectType.prototype.parseModelProps = function() {
        var _a = this,
            properties = _a.properties,
            state = _a.state,
            actions = _a.actions
        for (var key in properties)
            if (hasOwnProperty(properties, key)) {
                if (HOOK_NAMES.indexOf(key) !== -1)
                    console.warn(
                        "Hook '" +
                            key +
                            "' was defined as property. Hooks should be defined as part of the actions"
                    )
                var descriptor = Object.getOwnPropertyDescriptor(properties, key)
                if ("get" in descriptor) {
                    this.props[key] = new ComputedProperty(key, descriptor.get, descriptor.set)
                    continue
                }
                var value = descriptor.value
                if (value === null || undefined) {
                    fail(
                        "The default value of an attribute cannot be null or undefined as the type cannot be inferred. Did you mean `types.maybe(someType)`?"
                    )
                } else if (isPrimitive(value)) {
                    var baseType = getPrimitiveFactoryFromValue(value)
                    this.props[key] = new ValueProperty(key, optional(baseType, value))
                } else if (isType(value)) {
                    this.props[key] = new ValueProperty(key, value)
                } else if (typeof value === "function") {
                    this.props[key] = new ViewProperty(key, value)
                } else if (typeof value === "object") {
                    fail(
                        "In property '" +
                            key +
                            "': base model's should not contain complex values: '" +
                            value +
                            "'"
                    )
                } else {
                    fail("Unexpected value for property '" + key + "'")
                }
            }
        for (var key in state)
            if (hasOwnProperty(state, key)) {
                if (HOOK_NAMES.indexOf(key) !== -1)
                    console.warn(
                        "Hook '" +
                            key +
                            "' was defined as local state. Hooks should be defined as part of the actions"
                    )
                var value = state[key]
                if (key in this.properties)
                    fail(
                        "Property '" +
                            key +
                            "' was also defined as local state. Local state fields and properties should not collide"
                    )
                this.props[key] = new VolatileProperty(key, value)
            }
        for (var key in actions)
            if (hasOwnProperty(actions, key)) {
                var value = actions[key]
                if (key in this.properties)
                    fail(
                        "Property '" +
                            key +
                            "' was also defined as action. Actions and properties should not collide"
                    )
                if (key in this.state)
                    fail(
                        "Property '" +
                            key +
                            "' was also defined as local state. Actions and state should not collide"
                    )
                if (typeof value === "function") {
                    this.props[key] = new ActionProperty(key, value)
                } else {
                    fail(
                        "Unexpected value for action '" +
                            key +
                            "'. Expected function, got " +
                            typeof value
                    )
                }
            }
    }
    ObjectType.prototype.getChildren = function(node) {
        var res = []
        this.forAllProps(function(prop) {
            if (prop instanceof ValueProperty) res.push(prop.getValueNode(node.storedValue))
        })
        return res
    }
    ObjectType.prototype.getChildNode = function(node, key) {
        if (!(this.props[key] instanceof ValueProperty)) return fail("Not a value property: " + key)
        return this.props[key].getValueNode(node.storedValue)
    }
    ObjectType.prototype.getValue = function(node) {
        return node.storedValue
    }
    ObjectType.prototype.getSnapshot = function(node) {
        var res = {}
        this.forAllProps(function(prop) {
            return prop.serialize(node.storedValue, res)
        })
        return this.postProcessSnapshot(res)
    }
    ObjectType.prototype.applyPatchLocally = function(node, subpath, patch) {
        if (!(patch.op === "replace" || patch.op === "add"))
            fail("object does not support operation " + patch.op)
        node.storedValue[subpath] = patch.value
    }
    ObjectType.prototype.applySnapshot = function(node, snapshot) {
        var s = this.preProcessSnapshot(snapshot)
        typecheck(this, s)
        for (var key in this.props) this.props[key].deserialize(node.storedValue, s)
    }
    ObjectType.prototype.preProcessSnapshot = function(snapshot) {
        if (typeof this.actions.preProcessSnapshot === "function")
            return this.actions.preProcessSnapshot.call(null, snapshot)
        return snapshot
    }
    ObjectType.prototype.postProcessSnapshot = function(snapshot) {
        if (typeof this.actions.postProcessSnapshot === "function")
            return this.actions.postProcessSnapshot.call(null, snapshot)
        return snapshot
    }
    ObjectType.prototype.getChildType = function(key) {
        return this.props[key].type
    }
    ObjectType.prototype.isValidSnapshot = function(value, context) {
        var _this = this
        var snapshot = this.preProcessSnapshot(value)
        if (!isPlainObject(snapshot)) {
            return typeCheckFailure(context, snapshot)
        }
        return flattenTypeErrors(
            Object.keys(this.props).map(function(path) {
                return _this.props[path].validate(snapshot, context)
            })
        )
    }
    ObjectType.prototype.forAllProps = function(fn) {
        var _this = this
        // optimization: persists keys or loop more efficiently
        Object.keys(this.props).forEach(function(key) {
            return fn(_this.props[key])
        })
    }
    ObjectType.prototype.describe = function() {
        var _this = this
        // TODO: make proptypes responsible
        // optimization: cache
        return (
            "{ " +
            Object.keys(this.props)
                .map(function(key) {
                    var prop = _this.props[key]
                    return prop instanceof ValueProperty ? key + ": " + prop.type.describe() : ""
                })
                .filter(Boolean)
                .join("; ") +
            " }"
        )
    }
    ObjectType.prototype.getDefaultSnapshot = function() {
        return {}
    }
    ObjectType.prototype.removeChild = function(node, subpath) {
        node.storedValue[subpath] = null
    }
    tslib_1.__decorate([action], ObjectType.prototype, "applySnapshot", null)
    return ObjectType
})(ComplexType)
export { ObjectType }
/**
 * Creates a new model type by providing a name, properties, volatile state and actions.
 *
 * See the [model type](https://github.com/mobxjs/mobx-state-tree#creating-models) description or the [getting started](https://github.com/mobxjs/mobx-state-tree/blob/master/docs/getting-started.md#getting-started-1) tutorial.
 *
 * @export
 * @alias types.model
 */
export function model() {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i]
    }
    var name = typeof args[0] === "string" ? args.shift() : "AnonymousModel"
    var props = args.shift() || fail("types.model must specify properties")
    var volatileState = (args.length > 1 && args.shift()) || {}
    var actions = args.shift() || {}
    return new ObjectType(name, props, volatileState, actions)
}
/**
 * Composes a new model from one or more existing model types.
 * This method can be invoked in two forms:
 * 1. Given 2 or more model types, the types are composed into a new Type.
 * 2. Given 1 model type, and additionally a set of properties, actions and volatile state, a new type is composed.
 *
 * Overloads:
 *
 * * `compose(...modelTypes)`
 * * `compose(modelType, properties)`
 * * `compose(modelType, properties, actions)`
 * * `compose(modelType, properties, volatileState, actions)`
 *
 * [Example of form 2](https://github.com/mobxjs/mobx-state-tree#simulate-inheritance-by-using-type-composition)
 *
 * @export
 * @alias types.compose
 */
export function compose() {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i]
    }
    var typeName = typeof args[0] === "string" ? args.shift() : "AnonymousModel"
    if (
        args.every(function(arg) {
            return isType(arg)
        })
    ) {
        // compose types
        return args.reduce(function(prev, cur) {
            return compose(typeName, prev, cur.properties, cur.state, cur.actions)
        })
    }
    var baseType = args.shift()
    var props = args.shift() || fail("types.compose must specify properties or `{}`")
    var volatileState = (args.length > 1 && args.shift()) || {}
    var actions = args.shift() || {}
    if (!isObjectType(baseType)) return fail("Only model types can be composed")
    return model(
        typeName,
        extendKeepGetter({}, baseType.properties, props),
        extendKeepGetter({}, baseType.state, volatileState),
        extendKeepGetter({}, baseType.actions, actions)
    )
}
//# sourceMappingURL=object.js.map
