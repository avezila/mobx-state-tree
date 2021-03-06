import { ISimpleType, Type } from "../type"
import { TypeFlags } from "../type-flags"
import { IContext, IValidationResult } from "../type-checker"
import { Node } from "../../core"
export declare class Literal<T> extends Type<T, T> {
    readonly value: any
    readonly flags: TypeFlags
    constructor(value: any)
    instantiate(parent: Node | null, subpath: string, environment: any, snapshot: T): Node
    describe(): string
    isValidSnapshot(value: any, context: IContext): IValidationResult
}
/**
 * The literal type will return a type that will match only the exact given type.
 * The given value must be a primitive, in order to be serialized to a snapshot correctly.
 * You can use literal to match exact strings for example the exact male or female string.
 *
 * @example
 * const Person = types.model({
 *     name: types.string,
 *     gender: types.union(types.literal('male'), types.literal('female'))
 * })
 *
 * @export
 * @alias types.literal
 * @template S
 * @param {S} value The value to use in the strict equal check
 * @returns {ISimpleType<S>}
 */
export declare function literal<S>(value: S): ISimpleType<S>
