import * as tslib_1 from "tslib"
import { extendObservable } from "mobx"
import { Property } from "./property"
import { getContextForPath, typeCheckFailure, typeCheckSuccess } from "../type-checker"
import { fail } from "../../utils"
var VolatileProperty = (function(_super) {
    tslib_1.__extends(VolatileProperty, _super)
    function VolatileProperty(propertyName, initialValue) {
        var _this = _super.call(this, propertyName) || this
        _this.initialValue = initialValue
        if (initialValue !== null && typeof initialValue === "object")
            return fail(
                "Trying to declare property " +
                    propertyName +
                    " with a non-primitive value. Please provide an initializer function to avoid accidental sharing of local state, like `" +
                    propertyName +
                    ": () => initialValue`"
            )
        return _this
    }
    VolatileProperty.prototype.initialize = function(instance, snapshot) {
        var v =
            typeof this.initialValue === "function"
                ? this.initialValue.call(instance, instance)
                : this.initialValue
        extendObservable(instance, ((_a = {}), (_a[this.name] = v), _a))
        var _a
    }
    VolatileProperty.prototype.willChange = function(change) {
        return change
    }
    VolatileProperty.prototype.validate = function(snapshot, context) {
        if (this.name in snapshot) {
            return typeCheckFailure(
                getContextForPath(context, this.name),
                snapshot[this.name],
                "volatile state should not be provided in the snapshot"
            )
        }
        return typeCheckSuccess()
    }
    return VolatileProperty
})(Property)
export { VolatileProperty }
//# sourceMappingURL=volatile-property.js.map
