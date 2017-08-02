import * as tslib_1 from "tslib"
import { isObservableArray } from "mobx"
export var EMPTY_ARRAY = Object.freeze([])
export function fail(message) {
    if (message === void 0) {
        message = "Illegal state"
    }
    throw new Error("[mobx-state-tree] " + message)
}
export function identity(_) {
    return _
}
export function nothing() {
    return null
}
export function noop() {}
export function isArray(val) {
    return !!(Array.isArray(val) || isObservableArray(val))
}
export function asArray(val) {
    if (!val) return EMPTY_ARRAY
    if (isArray(val)) return val
    return [val]
}
export function extend(a) {
    var b = []
    for (var _i = 1; _i < arguments.length; _i++) {
        b[_i - 1] = arguments[_i]
    }
    for (var i = 0; i < b.length; i++) {
        var current = b[i]
        for (var key in current) a[key] = current[key]
    }
    return a
}
export function extendKeepGetter(a) {
    var b = []
    for (var _i = 1; _i < arguments.length; _i++) {
        b[_i - 1] = arguments[_i]
    }
    for (var i = 0; i < b.length; i++) {
        var current = b[i]
        for (var key in current) {
            var descriptor = Object.getOwnPropertyDescriptor(current, key)
            if ("get" in descriptor) {
                Object.defineProperty(
                    a,
                    key,
                    tslib_1.__assign({}, descriptor, { configurable: true })
                )
                continue
            }
            a[key] = current[key]
        }
    }
    return a
}
export function isPlainObject(value) {
    if (value === null || typeof value !== "object") return false
    var proto = Object.getPrototypeOf(value)
    return proto === Object.prototype || proto === null
}
export function isMutable(value) {
    return (
        value !== null &&
        typeof value === "object" &&
        !(value instanceof Date) &&
        !(value instanceof RegExp)
    )
}
export function isPrimitive(value) {
    if (value === null || value === undefined) return true
    if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        value instanceof Date
    )
        return true
    return false
}
export function isGeneratorFunction(value) {
    var constructor = value.constructor
    if (!constructor) return false
    if ("GeneratorFunction" === constructor.name || "GeneratorFunction" === constructor.displayName)
        return true
    return false
}
export function freeze(value) {
    return isPrimitive(value) ? value : Object.freeze(value)
}
export function deepFreeze(value) {
    freeze(value)
    if (isPlainObject(value)) {
        Object.keys(value).forEach(function(propKey) {
            if (!isPrimitive(value[propKey]) && !Object.isFrozen(value[propKey])) {
                deepFreeze(value[propKey])
            }
        })
    }
    return value
}
export function isSerializable(value) {
    return typeof value !== "function"
}
export function addHiddenFinalProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: value
    })
}
export function addHiddenWritableProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    })
}
export function addReadOnlyProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: true,
        writable: false,
        configurable: true,
        value: value
    })
}
export function registerEventHandler(handlers, handler) {
    handlers.push(handler)
    return function() {
        var idx = handlers.indexOf(handler)
        if (idx !== -1) handlers.splice(idx, 1)
    }
}
var prototypeHasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwnProperty(object, propName) {
    return prototypeHasOwnProperty.call(object, propName)
}
export function argsToArray(args) {
    var res = new Array(args.length)
    for (var i = 0; i < args.length; i++) res[i] = args[i]
    return res
}
//# sourceMappingURL=utils.js.map
