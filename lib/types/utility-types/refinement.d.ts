import { IType, Type } from "../type"
import { Node } from "../../core"
import { IContext, IValidationResult } from "../type-checker"
export declare class Refinement<S, T> extends Type<S, T> {
    readonly type: IType<any, any>
    readonly predicate: (v: any) => boolean
    readonly flags: number
    constructor(name: string, type: IType<any, any>, predicate: (v: any) => boolean)
    describe(): string
    instantiate(parent: Node, subpath: string, environment: any, value: any): Node
    isAssignableFrom(type: IType<any, any>): boolean
    isValidSnapshot(value: any, context: IContext): IValidationResult
}
export declare function refinement<T>(
    name: string,
    type: IType<T, T>,
    predicate: (snapshot: T) => boolean
): IType<T, T>
export declare function refinement<S, T extends S, U extends S>(
    name: string,
    type: IType<S, T>,
    predicate: (snapshot: S) => snapshot is U
): IType<S, U>
