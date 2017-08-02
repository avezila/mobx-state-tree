import * as tslib_1 from "tslib"
import { Type } from "../type"
import { TypeFlags } from "../type-flags"
import { isStateTreeNode, getStateTreeNode } from "../../core"
import { typeCheckSuccess, typeCheckFailure } from "../type-checker"
var Refinement = (function(_super) {
    tslib_1.__extends(Refinement, _super)
    function Refinement(name, type, predicate) {
        var _this = _super.call(this, name) || this
        _this.type = type
        _this.predicate = predicate
        return _this
    }
    Object.defineProperty(Refinement.prototype, "flags", {
        get: function() {
            return this.type.flags | TypeFlags.Refinement
        },
        enumerable: true,
        configurable: true
    })
    Refinement.prototype.describe = function() {
        return this.name
    }
    Refinement.prototype.instantiate = function(parent, subpath, environment, value) {
        // create the child type
        var inst = this.type.instantiate(parent, subpath, environment, value)
        return inst
    }
    Refinement.prototype.isAssignableFrom = function(type) {
        return this.type.isAssignableFrom(type)
    }
    Refinement.prototype.isValidSnapshot = function(value, context) {
        if (this.type.is(value)) {
            var snapshot = isStateTreeNode(value) ? getStateTreeNode(value).snapshot : value
            if (this.predicate(snapshot)) {
                return typeCheckSuccess()
            }
        }
        return typeCheckFailure(context, value)
    }
    return Refinement
})(Type)
export { Refinement }
/**
 * `types.refinement(baseType, (snapshot) => boolean)` creates a type that is more specific then the base type, e.g. `types.refinement(types.string, value => value.length > 5)` to create a type of strings that can only be longer then 5.
 *
 * @export
 * @alias types.refinement
 * @template T
 * @param {string} name
 * @param {IType<T, T>} type
 * @param {(snapshot: T) => boolean} predicate
 * @returns {IType<T, T>}
 */
export function refinement(name, type, predicate) {
    return new Refinement(name, type, predicate)
}
//# sourceMappingURL=refinement.js.map
