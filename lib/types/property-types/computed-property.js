import * as tslib_1 from "tslib"
import { computed } from "mobx"
import { Property } from "./property"
import { typeCheckSuccess, typeCheckFailure, getContextForPath } from "../type-checker"
var ComputedProperty = (function(_super) {
    tslib_1.__extends(ComputedProperty, _super)
    function ComputedProperty(propertyName, getter, setter) {
        var _this = _super.call(this, propertyName) || this
        _this.getter = getter
        _this.setter = setter
        return _this
    }
    ComputedProperty.prototype.initializePrototype = function(proto) {
        Object.defineProperty(
            proto,
            this.name,
            computed(proto, this.name, {
                get: this.getter,
                set: this.setter,
                configurable: true,
                enumerable: false
            })
        )
    }
    ComputedProperty.prototype.validate = function(snapshot, context) {
        if (this.name in snapshot) {
            return typeCheckFailure(
                getContextForPath(context, this.name),
                snapshot[this.name],
                "Computed properties should not be provided in the snapshot"
            )
        }
        return typeCheckSuccess()
    }
    return ComputedProperty
})(Property)
export { ComputedProperty }
//# sourceMappingURL=computed-property.js.map
