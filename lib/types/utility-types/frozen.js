import * as tslib_1 from "tslib"
import { Type } from "../type"
import { TypeFlags } from "../type-flags"
import { typeCheckSuccess, typeCheckFailure } from "../type-checker"
import { isSerializable, deepFreeze } from "../../utils"
import { createNode } from "../../core"
var Frozen = (function(_super) {
    tslib_1.__extends(Frozen, _super)
    function Frozen() {
        var _this = _super.call(this, "frozen") || this
        _this.flags = TypeFlags.Frozen
        return _this
    }
    Frozen.prototype.describe = function() {
        return "<any immutable value>"
    }
    Frozen.prototype.instantiate = function(parent, subpath, environment, value) {
        // deep freeze the object/array
        return createNode(this, parent, subpath, environment, deepFreeze(value))
    }
    Frozen.prototype.isValidSnapshot = function(value, context) {
        if (!isSerializable(value)) {
            return typeCheckFailure(context, value)
        }
        return typeCheckSuccess()
    }
    return Frozen
})(Type)
export { Frozen }
/**
 * Frozen can be used to story any value that is serializable in itself (that is valid JSON).
 * Frozen values need to be immutable or treated as if immutable.
 * Values stored in frozen will snapshotted as-is by MST, and internal changes will not be tracked.
 *
 * This is useful to store complex, but immutable values like vectors etc. It can form a powerful bridge to parts of your application that should be immutable, or that assume data to be immutable.
 *
 * @example
 * ```javascript
 * const GameCharacter = types.model({
 *   name: string,
 *   location: types.frozen
 * })
 *
 * const hero = new GameCharacter({
 *   name: "Mario",
 *   location: { x: 7, y: 4 }
 * })
 *
 * hero.location = { x: 10, y: 2 } // OK
 * hero.location.x = 7 // Not ok!
 * ```
 *
 *
 * @alias types.frozen
 */
export var frozen = new Frozen()
//# sourceMappingURL=frozen.js.map
