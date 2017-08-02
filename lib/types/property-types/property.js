var Property = (function() {
    function Property(name) {
        this.name = name
        // empty
    }
    Property.prototype.initializePrototype = function(prototype) {}
    Property.prototype.initialize = function(targetInstance, snapshot) {}
    Property.prototype.willChange = function(change) {
        return null
    }
    Property.prototype.didChange = function(change) {}
    Property.prototype.serialize = function(instance, snapshot) {}
    Property.prototype.deserialize = function(instance, snapshot) {}
    return Property
})()
export { Property }
//# sourceMappingURL=property.js.map
