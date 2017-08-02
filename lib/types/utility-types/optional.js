import * as tslib_1 from "tslib"
import { Type } from "../type"
import { TypeFlags } from "../type-flags"
import { typecheck, typeCheckSuccess } from "../type-checker"
import { isStateTreeNode, getStateTreeNode } from "../../core"
var OptionalValue = (function(_super) {
    tslib_1.__extends(OptionalValue, _super)
    function OptionalValue(type, defaultValue) {
        var _this = _super.call(this, type.name) || this
        _this.type = type
        _this.defaultValue = defaultValue
        return _this
    }
    Object.defineProperty(OptionalValue.prototype, "flags", {
        get: function() {
            return this.type.flags | TypeFlags.Optional
        },
        enumerable: true,
        configurable: true
    })
    OptionalValue.prototype.describe = function() {
        return this.type.describe() + "?"
    }
    OptionalValue.prototype.instantiate = function(parent, subpath, environment, value) {
        if (typeof value === "undefined") {
            var defaultValue = this.getDefaultValue()
            var defaultSnapshot = isStateTreeNode(defaultValue)
                ? getStateTreeNode(defaultValue).snapshot
                : defaultValue
            return this.type.instantiate(parent, subpath, environment, defaultSnapshot)
        }
        return this.type.instantiate(parent, subpath, environment, value)
    }
    OptionalValue.prototype.reconcile = function(current, newValue) {
        return this.type.reconcile(
            current,
            this.type.is(newValue) ? newValue : this.getDefaultValue()
        )
    }
    OptionalValue.prototype.getDefaultValue = function() {
        var defaultValue =
            typeof this.defaultValue === "function" ? this.defaultValue() : this.defaultValue
        if (typeof this.defaultValue === "function") typecheck(this, defaultValue)
        return defaultValue
    }
    OptionalValue.prototype.isValidSnapshot = function(value, context) {
        // defaulted values can be skipped
        if (value === undefined) {
            return typeCheckSuccess()
        }
        // bounce validation to the sub-type
        return this.type.validate(value, context)
    }
    OptionalValue.prototype.isAssignableFrom = function(type) {
        return this.type.isAssignableFrom(type)
    }
    return OptionalValue
})(Type)
export { OptionalValue }
/**
 * `types.optional` can be used to create a property with a default value.
 * If the given value is not provided in the snapshot, it will default to the provided `defaultValue`.
 * If `defaultValue` is a function, the function will be invoked for every new instance.
 * Applying a snapshot in which the optional value is _not_ present, causes the value to be reset
 *
 * @example
 * ```javascript
 * const Todo = types.model({
 *   title: types.optional(types.string, "Test"),
 *   done: types.optional(types.boolean, false),
 *   created: types.optional(types.Date, () => new Date())
 * })
 *
 * // it is now okay to omit 'created' and 'done'. created will get a freshly generated timestamp
 * const todo = Todo.create({ title: "Get coffee "})
 * ```
 *
 * @export
 * @alias types.optional
 */
export function optional(type, defaultValueOrFunction) {
    var defaultValue =
        typeof defaultValueOrFunction === "function"
            ? defaultValueOrFunction()
            : defaultValueOrFunction
    var defaultSnapshot = isStateTreeNode(defaultValue)
        ? getStateTreeNode(defaultValue).snapshot
        : defaultValue
    typecheck(type, defaultSnapshot)
    return new OptionalValue(type, defaultValueOrFunction)
}
//# sourceMappingURL=optional.js.map
