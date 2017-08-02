import * as tslib_1 from "tslib"
import { Type } from "../type"
import { TypeFlags } from "../type-flags"
import { fail, isPrimitive } from "../../utils"
import { typeCheckSuccess, typeCheckFailure } from "../type-checker"
import { createNode } from "../../core"
var Literal = (function(_super) {
    tslib_1.__extends(Literal, _super)
    function Literal(value) {
        var _this = _super.call(this, "" + value) || this
        _this.flags = TypeFlags.Literal
        _this.value = value
        return _this
    }
    Literal.prototype.instantiate = function(parent, subpath, environment, snapshot) {
        return createNode(this, parent, subpath, environment, snapshot)
    }
    Literal.prototype.describe = function() {
        return JSON.stringify(this.value)
    }
    Literal.prototype.isValidSnapshot = function(value, context) {
        if (isPrimitive(value) && value === this.value) {
            return typeCheckSuccess()
        }
        return typeCheckFailure(context, value)
    }
    return Literal
})(Type)
export { Literal }
/**
 * The literal type will return a type that will match only the exact given type.
 * The given value must be a primitive, in order to be serialized to a snapshot correctly.
 * You can use literal to match exact strings for example the exact male or female string.
 *
 * @example
 * const Person = types.model({
 *     name: types.string,
 *     gender: types.union(types.literal('male'), types.literal('female'))
 * })
 *
 * @export
 * @alias types.literal
 * @template S
 * @param {S} value The value to use in the strict equal check
 * @returns {ISimpleType<S>}
 */
export function literal(value) {
    if (!isPrimitive(value)) fail("Literal types can be built only on top of primitives")
    return new Literal(value)
}
//# sourceMappingURL=literal.js.map
