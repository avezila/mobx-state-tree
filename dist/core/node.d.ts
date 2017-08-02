export declare class Node {
    readonly nodeId: number
    readonly type: IType<any, any>
    readonly storedValue: any
    protected _parent: Node | null
    subpath: string
    identifierCache: IdentifierCache | undefined
    isProtectionEnabled: boolean
    identifierAttribute: string | undefined
    _environment: any
    _isRunningAction: boolean
    private _autoUnbox
    private _isAlive
    private _isDetaching
    readonly middlewares: IMiddleWareHandler[]
    private readonly snapshotSubscribers
    private readonly patchSubscribers
    private readonly disposers
    applyPatches: (patches: IReversibleJsonPatch[]) => void
    applySnapshot: (snapshot: any) => void
    constructor(
        type: IType<any, any>,
        parent: Node | null,
        subpath: string,
        environment: any,
        storedValue: any
    )
    readonly identifier: string | null
    readonly path: string
    readonly isRoot: boolean
    readonly parent: Node | null
    readonly root: Node
    getRelativePathTo(target: Node): string
    resolve(pathParts: string): Node
    resolve(pathParts: string, failIfResolveFails: boolean): Node | undefined
    resolvePath(pathParts: string[]): Node
    resolvePath(pathParts: string[], failIfResolveFails: boolean): Node | undefined
    readonly value: any
    readonly isAlive: boolean
    die(): void
    aboutToDie(): void
    finalizeDeath(): void
    assertAlive(): void
    readonly snapshot: any
    onSnapshot(onChange: (snapshot: any) => void): IDisposer
    emitSnapshot(snapshot: any): void
    applyPatchLocally(subpath: string, patch: IReversibleJsonPatch): void
    onPatch(onPatch: (patch: IReversibleJsonPatch) => void, includeOldValue: boolean): IDisposer
    emitPatch(patch: IReversibleJsonPatch, source: Node): void
    setParent(newParent: Node | null, subpath?: string | null): void
    addDisposer(disposer: () => void): void
    isRunningAction(): boolean
    addMiddleWare(handler: IMiddleWareHandler): IDisposer
    getChildNode(subpath: string): Node
    getChildren(): Node[]
    getChildType(key: string): IType<any, any>
    readonly isProtected: boolean
    assertWritable(): void
    removeChild(subpath: string): void
    detach(): void
    unbox(childNode: Node): any
    fireHook(name: string): void
    toString(): string
}
export declare type IStateTreeNode = {
    readonly $treenode?: any
}
/**
 * Returns true if the given value is a node in a state tree.
 * More precisely, that is, if the value is an instance of a
 * `types.model`, `types.array` or `types.map`.
 *
 * @export
 * @param {*} value
 * @returns {value is IStateTreeNode}
 */
export declare function isStateTreeNode(value: any): value is IStateTreeNode
export declare function getStateTreeNode(value: IStateTreeNode): Node
export declare function createNode<S, T>(
    type: IType<S, T>,
    parent: Node | null,
    subpath: string,
    environment: any,
    initialValue: any,
    createNewInstance?: (initialValue: any) => T,
    finalizeNewInstance?: (node: Node, initialValue: any) => void
): Node
import { IType } from "../types/type"
import { IReversibleJsonPatch } from "./json-patch"
import { IMiddleWareHandler } from "./action"
import { IDisposer } from "../utils"
import { IdentifierCache } from "./identifier-cache"
