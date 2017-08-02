import { Property } from "./property"
import { IContext, IValidationResult } from "../type-checker"
export declare class ComputedProperty extends Property {
    getter: () => any
    setter: ((value: any) => void) | undefined
    constructor(
        propertyName: string,
        getter: () => any,
        setter?: ((value: any) => void) | undefined
    )
    initializePrototype(proto: any): void
    validate(snapshot: any, context: IContext): IValidationResult
}
