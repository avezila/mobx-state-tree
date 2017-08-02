import * as tslib_1 from "tslib"
import { fail } from "../../utils"
import { Type } from "../type"
import { TypeFlags } from "../type-flags"
var Late = (function(_super) {
    tslib_1.__extends(Late, _super)
    function Late(name, definition) {
        var _this = _super.call(this, name) || this
        _this._subType = null
        if (!(typeof definition === "function" && definition.length === 0))
            fail(
                "Invalid late type, expected a function with zero arguments that returns a type, got: " +
                    definition
            )
        _this.definition = definition
        return _this
    }
    Object.defineProperty(Late.prototype, "flags", {
        get: function() {
            return this.subType.flags | TypeFlags.Late
        },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(Late.prototype, "subType", {
        get: function() {
            if (this._subType === null) {
                this._subType = this.definition()
            }
            return this._subType
        },
        enumerable: true,
        configurable: true
    })
    Late.prototype.instantiate = function(parent, subpath, environment, snapshot) {
        return this.subType.instantiate(parent, subpath, environment, snapshot)
    }
    Late.prototype.reconcile = function(current, newValue) {
        return this.subType.reconcile(current, newValue)
    }
    Late.prototype.describe = function() {
        return this.subType.name
    }
    Late.prototype.isValidSnapshot = function(value, context) {
        return this.subType.validate(value, context)
    }
    Late.prototype.isAssignableFrom = function(type) {
        return this.subType.isAssignableFrom(type)
    }
    return Late
})(Type)
export { Late }
/**
 * Defines a type that gets implemented later. This is usefull when you have to deal with circular dependencies.
 * Please notice that when defining circular dependencies TypeScript is'nt smart enought to inference them.
 * You need to declare an interface to explicit the return type of the late parameter function.
 *
 * ```typescript
 *  interface INode {
 *       childs: INode[]
 *  }
 *
 *   // TypeScript is'nt smart enough to infer self referencing types.
 *  const Node = types.model({
 *       childs: types.optional(types.array(types.late<any, INode>(() => Node)), [])
 *  })
 * ```
 *
 * @export
 * @alias types.late
 * @template S
 * @template T
 * @param {string} [name] The name to use for the type that will be returned.
 * @param {ILateType<S, T>} type A function that returns the type that will be defined.
 * @returns {IType<S, T>}
 */
export function late(nameOrType, maybeType) {
    var name = typeof nameOrType === "string" ? nameOrType : "late(" + nameOrType.toString() + ")"
    var type = typeof nameOrType === "string" ? maybeType : nameOrType
    return new Late(name, type)
}
//# sourceMappingURL=late.js.map
