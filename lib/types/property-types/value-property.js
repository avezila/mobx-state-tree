import * as tslib_1 from "tslib"
import { observable, extras } from "mobx"
import { Property } from "./property"
import { getStateTreeNode, escapeJsonPath } from "../../core"
import { getContextForPath, typecheck } from "../type-checker"
import { fail } from "../../utils"
import { literal } from "../utility-types/literal"
var undefinedType = literal(undefined)
var ValueProperty = (function(_super) {
    tslib_1.__extends(ValueProperty, _super)
    function ValueProperty(propertyName, type) {
        var _this = _super.call(this, propertyName) || this
        _this.type = type
        return _this
    }
    ValueProperty.prototype.initializePrototype = function(proto) {
        observable.ref(proto, this.name, {
            value: undefinedType.instantiate(null, "", null, undefined)
        }) // TODO: undefined type should not be needed
    }
    ValueProperty.prototype.initialize = function(instance, snapshot) {
        var node = getStateTreeNode(instance)
        instance[this.name] = this.type.instantiate(
            node,
            this.name,
            node._environment,
            snapshot[this.name]
        )
        extras.interceptReads(instance, this.name, node.unbox)
    }
    ValueProperty.prototype.getValueNode = function(targetInstance) {
        var node = targetInstance.$mobx.values[this.name].value // TODO: blegh!
        if (!node) return fail("Node not available for property " + this.name)
        return node
    }
    ValueProperty.prototype.willChange = function(change) {
        var node = getStateTreeNode(change.object) // TODO: pass node in from object property
        typecheck(this.type, change.newValue)
        change.newValue = this.type.reconcile(node.getChildNode(change.name), change.newValue)
        return change
    }
    ValueProperty.prototype.didChange = function(change) {
        var node = getStateTreeNode(change.object)
        node.emitPatch(
            {
                op: "replace",
                path: escapeJsonPath(this.name),
                value: change.newValue.snapshot,
                oldValue: change.oldValue ? change.oldValue.snapshot : undefined
            },
            node
        )
    }
    ValueProperty.prototype.serialize = function(instance, snapshot) {
        // TODO: FIXME, make sure the observable ref is used!
        extras.getAtom(instance, this.name).reportObserved()
        snapshot[this.name] = this.getValueNode(instance).snapshot
    }
    ValueProperty.prototype.deserialize = function(instance, snapshot) {
        instance[this.name] = snapshot[this.name]
    }
    ValueProperty.prototype.validate = function(snapshot, context) {
        return this.type.validate(
            snapshot[this.name],
            getContextForPath(context, this.name, this.type)
        )
    }
    return ValueProperty
})(Property)
export { ValueProperty }
//# sourceMappingURL=value-property.js.map
