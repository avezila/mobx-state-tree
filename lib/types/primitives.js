import * as tslib_1 from "tslib"
import { Type } from "./type"
import { TypeFlags } from "./type-flags"
import { typeCheckSuccess, typeCheckFailure } from "./type-checker"
import { isPrimitive, fail, identity } from "../utils"
import { createNode } from "../core"
var CoreType = (function(_super) {
    tslib_1.__extends(CoreType, _super)
    function CoreType(name, flags, checker, initializer) {
        if (initializer === void 0) {
            initializer = identity
        }
        var _this = _super.call(this, name) || this
        _this.flags = flags
        _this.checker = checker
        _this.initializer = initializer
        return _this
    }
    CoreType.prototype.describe = function() {
        return this.name
    }
    CoreType.prototype.instantiate = function(parent, subpath, environment, snapshot) {
        return createNode(this, parent, subpath, environment, snapshot, this.initializer)
    }
    CoreType.prototype.isValidSnapshot = function(value, context) {
        if (isPrimitive(value) && this.checker(value)) {
            return typeCheckSuccess()
        }
        return typeCheckFailure(context, value)
    }
    return CoreType
})(Type)
export { CoreType }
/**
 * Creates a type that can only contain a string value.
 * This type is used for string values by default
 *
 * @export
 * @alias types.string
 * @example
 * ```javascript
 * const Person = types.model({
 *   firstName: types.string,
 *   lastName: "Doe"
 * })
 * ```
 */
// tslint:disable-next-line:variable-name
export var string = new CoreType("string", TypeFlags.String, function(v) {
    return typeof v === "string"
})
/**
 * Creates a type that can only contain a numeric value.
 * This type is used for numeric values by default
 *
 * @export
 * @alias types.number
 * @example
 * ```javascript
 * const Vector = types.model({
 *   x: types.number,
 *   y: 0
 * })
 * ```
 */
// tslint:disable-next-line:variable-name
export var number = new CoreType("number", TypeFlags.Number, function(v) {
    return typeof v === "number"
})
/**
 * Creates a type that can only contain a boolean value.
 * This type is used for boolean values by default
 *
 * @export
 * @alias types.boolean
 * @example
 * ```javascript
 * const Thing = types.model({
 *   isCool: types.boolean,
 *   isAwesome: false
 * })
 * ```
 */
// tslint:disable-next-line:variable-name
export var boolean = new CoreType("boolean", TypeFlags.Boolean, function(v) {
    return typeof v === "boolean"
})
/**
 * The type of the value `null`
 *
 * @export
 * @alias types.null
 */
export var nullType = new CoreType("null", TypeFlags.Null, function(v) {
    return v === null
})
/**
 * The type of the value `undefined`
 *
 * @export
 * @alias types.undefined
 */
export var undefinedType = new CoreType("undefined", TypeFlags.Undefined, function(v) {
    return v === undefined
})
/**
 * Creates a type that can only contain a javascript Date value.
 *
 * @export
 * @alias types.Date
 * @example
 * ```javascript
 * const LogLine = types.model({
 *   timestamp: types.Date,
 * })
 *
 * LogLine.create({ timestamp: new Date() })
 * ```
 */
// tslint:disable-next-line:variable-name
export var DatePrimitive = new CoreType(
    "Date",
    TypeFlags.Date,
    function(v) {
        return typeof v === "number" || v instanceof Date
    },
    function(v) {
        return v instanceof Date ? v : new Date(v)
    }
)
DatePrimitive.getSnapshot = function(node) {
    return node.storedValue.getTime()
}
export function getPrimitiveFactoryFromValue(value) {
    switch (typeof value) {
        case "string":
            return string
        case "number":
            return number
        case "boolean":
            return boolean
        case "object":
            if (value instanceof Date) return DatePrimitive
    }
    return fail("Cannot determine primtive type from value " + value)
}
//# sourceMappingURL=primitives.js.map
