import { IObjectChange, IObjectWillChange } from "mobx"
import { ComplexType, IComplexType, IType } from "../type"
import { TypeFlags } from "../type-flags"
import { IStateTreeNode, IJsonPatch, Node } from "../../core"
import { IContext, IValidationResult } from "../type-checker"
export declare class ObjectType extends ComplexType<any, any> {
    shouldAttachNode: boolean
    readonly flags: TypeFlags
    properties: any
    state: any
    actions: any
    modelConstructor: new () => any
    private props
    constructor(name: string, baseModel: Object, baseState: Object, baseActions: Object)
    instantiate(parent: Node | null, subpath: string, environment: any, snapshot: any): Node
    createNewInstance: () => Object
    finalizeNewInstance: (node: Node, snapshot: any) => void
    willChange(change: IObjectWillChange): IObjectWillChange | null
    didChange: (change: IObjectChange) => void
    parseModelProps(): void
    getChildren(node: Node): Node[]
    getChildNode(node: Node, key: string): Node
    getValue(node: Node): any
    getSnapshot(node: Node): any
    applyPatchLocally(node: Node, subpath: string, patch: IJsonPatch): void
    applySnapshot(node: Node, snapshot: any): void
    preProcessSnapshot(snapshot: any): any
    postProcessSnapshot(snapshot: any): any
    getChildType(key: string): IType<any, any>
    isValidSnapshot(value: any, context: IContext): IValidationResult
    private forAllProps(fn)
    describe(): string
    getDefaultSnapshot(): any
    removeChild(node: Node, subpath: string): void
}
export declare type IModelProperties<T> = { [K in keyof T]: IType<any, T[K]> | T[K] }
export declare type IModelVolatileState<T> = { [K in keyof T]: ((self?: any) => T[K]) | T[K] }
export declare type Snapshot<T> = { [K in keyof T]?: Snapshot<T[K]> | any }
export interface IModelType<T = {}, S = {}, A = {}> extends IComplexType<Snapshot<T>, T & S & A> {
    properties: IModelProperties<T>
    state: IModelVolatileState<S>
    actions: A
}
export declare function model<T = {}, S = {}, A = {}>(
    name: string,
    properties: IModelProperties<T> & ThisType<IStateTreeNode & T & S>,
    volatileState: IModelVolatileState<S> & ThisType<IStateTreeNode & T & S>,
    operations: A & ThisType<IStateTreeNode & T & A & S>
): IModelType<T & IStateTreeNode, S, A>
export declare function model<T = {}, S = {}, A = {}>(
    name: string,
    properties: IModelProperties<T> & ThisType<IStateTreeNode & T & S>,
    operations?: A & ThisType<IStateTreeNode & T & A & S>
): IModelType<T & IStateTreeNode, S, A>
export declare function model<T = {}, S = {}, A = {}>(
    properties: IModelProperties<T> & ThisType<IStateTreeNode & T & S>,
    volatileState: IModelVolatileState<S> & ThisType<IStateTreeNode & T & S>,
    operations: A & ThisType<IStateTreeNode & T & A & S>
): IModelType<T & IStateTreeNode, S, A>
export declare function model<T = {}, S = {}, A = {}>(
    properties: IModelProperties<T> & ThisType<IStateTreeNode & T & S>,
    operations?: A & ThisType<IStateTreeNode & T & A & S>
): IModelType<T & IStateTreeNode, S, A>
export declare function compose<T1, S1, A1, T2, S2, A2, T3, S3, A3>(
    t1: IModelType<T1, S1, A1>,
    t2: IModelType<T2, S2, A2>,
    t3?: IModelType<T3, S3, A3>
): IModelType<IStateTreeNode & T1 & T2 & T3, S1 & S2 & S3, A1 & A2 & A3>
export declare function compose<T1, S1, A1, T2, S2, A2, T3, S3, A3>(
    name: string,
    t1: IModelType<T1, S1, A1>,
    t2: IModelType<T2, S2, A2>,
    t3?: IModelType<T3, S3, A3>
): IModelType<IStateTreeNode & T1 & T2 & T3, S1 & S2 & S3, A1 & A2 & A3>
export declare function compose<BASE_T, BASE_S, BASE_A, T, S, A>(
    name: string,
    baseType: IModelType<BASE_T, BASE_S, BASE_A>,
    properties: IModelProperties<T> & ThisType<IStateTreeNode & T & BASE_T>,
    volatileState: IModelVolatileState<S> & ThisType<IStateTreeNode & BASE_T & T & BASE_S & S>,
    operations: A & ThisType<BASE_T & T & BASE_S & S & BASE_A & A>
): IModelType<IStateTreeNode & BASE_T & T, BASE_S & S, BASE_A & A>
export declare function compose<BASE_T, BASE_S, BASE_A, T, S, A>(
    name: string,
    baseType: IModelType<BASE_T, BASE_S, BASE_A>,
    properties: IModelProperties<T> & ThisType<IStateTreeNode & T & BASE_T>,
    operations?: A & ThisType<BASE_T & T & BASE_S & S & BASE_A & A>
): IModelType<IStateTreeNode & BASE_T & T, BASE_S & S, BASE_A & A>
export declare function compose<BASE_T, BASE_S, BASE_A, T, S, A>(
    baseType: IModelType<BASE_T, BASE_S, BASE_A>,
    properties: IModelProperties<T> & ThisType<IStateTreeNode & T & BASE_T>,
    volatileState: IModelVolatileState<S> & ThisType<IStateTreeNode & BASE_T & T & BASE_S & S>,
    operations: A & ThisType<BASE_T & T & BASE_S & S & BASE_A & A>
): IModelType<IStateTreeNode & BASE_T & T, BASE_S & S, BASE_A & A>
export declare function compose<BASE_T, BASE_S, BASE_A, T, S, A>(
    baseType: IModelType<BASE_T, BASE_S, BASE_A>,
    properties: IModelProperties<T> & ThisType<IStateTreeNode & T & BASE_T>,
    operations?: A & ThisType<BASE_T & T & BASE_S & S & BASE_A & A>
): IModelType<IStateTreeNode & BASE_T & T, BASE_S & S, BASE_A & A>
