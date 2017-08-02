import * as tslib_1 from "tslib"
import { extras } from "mobx"
import { addHiddenFinalProp } from "../../utils"
import { getStateTreeNode } from "../../core"
import { Property } from "./property"
import { typeCheckFailure, typeCheckSuccess, getContextForPath } from "../type-checker"
var ViewProperty = (function(_super) {
    tslib_1.__extends(ViewProperty, _super)
    function ViewProperty(name, fn) {
        var _this = _super.call(this, name) || this
        _this.invokeView = createViewInvoker(name, fn)
        return _this
    }
    ViewProperty.prototype.initialize = function(target) {
        addHiddenFinalProp(target, this.name, this.invokeView.bind(target))
    }
    ViewProperty.prototype.validate = function(snapshot, context) {
        if (this.name in snapshot) {
            return typeCheckFailure(
                getContextForPath(context, this.name),
                snapshot[this.name],
                "View properties should not be provided in the snapshot"
            )
        }
        return typeCheckSuccess()
    }
    return ViewProperty
})(Property)
export { ViewProperty }
export function createViewInvoker(name, fn) {
    return function() {
        var _this = this
        var args = arguments
        var adm = getStateTreeNode(this)
        adm.assertAlive()
        return extras.allowStateChanges(false, function() {
            return fn.apply(_this, args)
        })
    }
}
//# sourceMappingURL=view-property.js.map
