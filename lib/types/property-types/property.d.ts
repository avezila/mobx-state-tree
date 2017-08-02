import { IStateTreeNode } from "../../core/"
import { IContext, IValidationResult } from "../type-checker"
import { IObjectChange, IObjectWillChange } from "mobx"
export abstract class Property {
    name: string
    constructor(name: string)
    initializePrototype(prototype: any): void
    initialize(targetInstance: IStateTreeNode, snapshot: any): void
    willChange(change: IObjectWillChange): IObjectWillChange | null
    didChange(change: IObjectChange): void
    serialize(instance: IStateTreeNode, snapshot: any): void
    deserialize(instance: IStateTreeNode, snapshot: any): void
    abstract validate(snapshot: any, context: IContext): IValidationResult
}
