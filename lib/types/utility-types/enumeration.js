import { union } from "./union"
import { literal } from "./literal"
/**
 * Can be used to create an string based enumeration.
 * (note: this methods is just sugar for a union of string literals)
 *
 * @example
 * ```javascript
 * const TrafficLight = types.model({
 *   color: types.enum("Color", ["Red", "Orange", "Green"])
 * })
 * ```
 *
 * @export
 * @alias types.enumeration
 * @param {string} name descriptive name of the enumeration (optional)
 * @param {string[]} options possible values this enumeration can have
 * @returns {ISimpleType<string>}
 */
export function enumeration(name, options) {
    var realOptions = typeof name === "string" ? options : name
    var type = union.apply(
        void 0,
        realOptions.map(function(option) {
            return literal("" + option)
        })
    )
    if (typeof name === "string") type.name = name
    return type
}
//# sourceMappingURL=enumeration.js.map
