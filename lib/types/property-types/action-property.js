import * as tslib_1 from "tslib"
import { addHiddenFinalProp, isGeneratorFunction } from "../../utils"
import { createActionInvoker, createAsyncActionInvoker } from "../../core"
import { Property } from "./property"
import { typeCheckFailure, typeCheckSuccess, getContextForPath } from "../type-checker"
var ActionProperty = (function(_super) {
    tslib_1.__extends(ActionProperty, _super)
    function ActionProperty(name, fn) {
        var _this = _super.call(this, name) || this
        _this.invokeAction = isGeneratorFunction(fn)
            ? createAsyncActionInvoker(name, fn)
            : createActionInvoker(name, fn)
        return _this
    }
    ActionProperty.prototype.initialize = function(target) {
        addHiddenFinalProp(target, this.name, this.invokeAction.bind(target))
    }
    ActionProperty.prototype.validate = function(snapshot, context) {
        if (this.name in snapshot) {
            return typeCheckFailure(
                getContextForPath(context, this.name),
                snapshot[this.name],
                "Action properties should not be provided in the snapshot"
            )
        }
        return typeCheckSuccess()
    }
    return ActionProperty
})(Property)
export { ActionProperty }
//# sourceMappingURL=action-property.js.map
