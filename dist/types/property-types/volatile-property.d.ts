import { IObjectWillChange } from "mobx"
import { Property } from "./property"
import { IContext, IValidationResult } from "../type-checker"
export declare class VolatileProperty extends Property {
    private initialValue
    constructor(propertyName: string, initialValue: any)
    initialize(instance: any, snapshot: any): void
    willChange(change: IObjectWillChange): IObjectWillChange | null
    validate(snapshot: any, context: IContext): IValidationResult
}
