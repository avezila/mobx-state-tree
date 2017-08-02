import * as tslib_1 from "tslib"
import { Type } from "../type"
import { TypeFlags } from "../type-flags"
import { typeCheckFailure } from "../type-checker"
import { fail } from "../../utils"
import { createNode, isStateTreeNode } from "../../core"
import { string as stringType } from "../primitives"
var Identifier = (function() {
    function Identifier(identifier) {
        this.identifier = identifier
    }
    Identifier.prototype.toString = function() {
        return "identifier(" + this.identifier + ")"
    }
    return Identifier
})()
var IdentifierType = (function(_super) {
    tslib_1.__extends(IdentifierType, _super)
    function IdentifierType(identifierType) {
        var _this = _super.call(this, "identifier(" + identifierType.name + ")") || this
        _this.identifierType = identifierType
        _this.flags = TypeFlags.Identifier
        return _this
    }
    IdentifierType.prototype.instantiate = function(parent, subpath, environment, snapshot) {
        if (!parent || !isStateTreeNode(parent.storedValue))
            return fail("Identifier types can only be instantiated as direct child of a model type")
        if (parent.identifierAttribute)
            fail(
                "Cannot define property '" +
                    subpath +
                    "' as object identifier, property '" +
                    parent.identifierAttribute +
                    "' is already defined as identifier property"
            )
        parent.identifierAttribute = subpath
        return createNode(this, parent, subpath, environment, snapshot)
    }
    IdentifierType.prototype.reconcile = function(current, newValue) {
        if (current.storedValue !== newValue)
            return fail(
                "Tried to change identifier from '" +
                    current.storedValue +
                    "' to '" +
                    newValue +
                    "'. Changing identifiers is not allowed."
            )
        return current
    }
    IdentifierType.prototype.describe = function() {
        return "identifier(" + this.identifierType.describe() + ")"
    }
    IdentifierType.prototype.isValidSnapshot = function(value, context) {
        if (
            value === undefined ||
            value === null ||
            typeof value === "string" ||
            typeof value === "number"
        )
            return this.identifierType.validate(value, context)
        return typeCheckFailure(context, value, "References should be a primitive value")
    }
    return IdentifierType
})(Type)
export { IdentifierType }
/**
 * Identifier are used to make references, lifecycle events and reconciling works.
 * Inside a state tree, for each type can exist only one instance for each given identifier.
 * For example there could'nt be 2 instances of user with id 1. If you need more, consider using references.
 * Identifier can be used only as type property of a model.
 * This type accepts as parameter the value type of the identifier field that can be either string or number.
 *
 * @example
 *  const Todo = types.model("Todo", {
 *      id: types.identifier(types.string),
 *      title: types.string
 *  })
 *
 * @export
 * @alias types.identifier
 * @template T
 * @param {IType<T, T>} baseType
 * @returns {IType<T, T>}
 */
export function identifier(baseType) {
    if (baseType === void 0) {
        baseType = stringType
    }
    return new IdentifierType(baseType)
}
//# sourceMappingURL=identifier.js.map
