import * as tslib_1 from "tslib"
import { Type } from "../type"
import { isType, TypeFlags } from "../type-flags"
import { typeCheckSuccess, typeCheckFailure, flattenTypeErrors } from "../type-checker"
import { fail } from "../../utils"
var Union = (function(_super) {
    tslib_1.__extends(Union, _super)
    function Union(name, types, dispatcher) {
        var _this = _super.call(this, name) || this
        _this.dispatcher = null
        _this.dispatcher = dispatcher
        _this.types = types
        return _this
    }
    Object.defineProperty(Union.prototype, "flags", {
        get: function() {
            var result = TypeFlags.Union
            this.types.forEach(function(type) {
                result |= type.flags
            })
            return result
        },
        enumerable: true,
        configurable: true
    })
    Union.prototype.isAssignableFrom = function(type) {
        return this.types.some(function(subType) {
            return subType.isAssignableFrom(type)
        })
    }
    Union.prototype.describe = function() {
        return (
            "(" +
            this.types
                .map(function(factory) {
                    return factory.describe()
                })
                .join(" | ") +
            ")"
        )
    }
    Union.prototype.instantiate = function(parent, subpath, environment, value) {
        return this.determineType(value).instantiate(parent, subpath, environment, value)
    }
    Union.prototype.reconcile = function(current, newValue) {
        return this.determineType(newValue).reconcile(current, newValue)
    }
    Union.prototype.determineType = function(value) {
        // try the dispatcher, if defined
        if (this.dispatcher !== null) {
            return this.dispatcher(value)
        }
        // find the most accomodating type
        var applicableTypes = this.types.filter(function(type) {
            return type.is(value)
        })
        if (applicableTypes.length > 1)
            return fail(
                "Ambiguos snapshot " +
                    JSON.stringify(value) +
                    " for union " +
                    this.name +
                    ". Please provide a dispatch in the union declaration."
            )
        return applicableTypes[0]
    }
    Union.prototype.isValidSnapshot = function(value, context) {
        if (this.dispatcher !== null) {
            return this.dispatcher(value).validate(value, context)
        }
        var errors = this.types.map(function(type) {
            return type.validate(value, context)
        })
        var applicableTypes = errors.filter(function(errorArray) {
            return errorArray.length === 0
        })
        if (applicableTypes.length > 1) {
            return typeCheckFailure(
                context,
                value,
                "Multiple types are applicable and no dispatch method is defined for the union"
            )
        } else if (applicableTypes.length < 1) {
            return typeCheckFailure(
                context,
                value,
                "No type is applicable and no dispatch method is defined for the union"
            ).concat(flattenTypeErrors(errors))
        }
        return typeCheckSuccess()
    }
    return Union
})(Type)
export { Union }
/**
 * types.union(dispatcher?, types...) create a union of multiple types. If the correct type cannot be inferred unambigously from a snapshot, provide a dispatcher function of the form (snapshot) => Type.
 *
 * @export
 * @alias types.union
 * @param {(ITypeDispatcher | IType<any, any>)} dispatchOrType
 * @param {...IType<any, any>[]} otherTypes
 * @returns {IType<any, any>}
 */
export function union(dispatchOrType) {
    var otherTypes = []
    for (var _i = 1; _i < arguments.length; _i++) {
        otherTypes[_i - 1] = arguments[_i]
    }
    var dispatcher = isType(dispatchOrType) ? null : dispatchOrType
    var types = isType(dispatchOrType) ? otherTypes.concat(dispatchOrType) : otherTypes
    var name = types
        .map(function(type) {
            return type.name
        })
        .join(" | ")
    return new Union(name, types, dispatcher)
}
//# sourceMappingURL=union.js.map
