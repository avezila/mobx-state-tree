import { Type, IType } from "../type"
import { IContext, IValidationResult } from "../type-checker"
import { Node } from "../../core"
export declare class Late<S, T> extends Type<S, T> {
    readonly definition: () => IType<S, T>
    private _subType
    readonly flags: number
    readonly subType: IType<S, T>
    constructor(name: string, definition: () => IType<S, T>)
    instantiate(parent: Node | null, subpath: string, environment: any, snapshot: any): Node
    reconcile(current: Node, newValue: any): Node
    describe(): string
    isValidSnapshot(value: any, context: IContext): IValidationResult
    isAssignableFrom(type: IType<any, any>): boolean
}
export declare type ILateType<S, T> = () => IType<S, T>
export declare function late<S = any, T = any>(type: ILateType<S, T>): IType<S, T>
export declare function late<S = any, T = any>(name: string, type: ILateType<S, T>): IType<S, T>
