import {
    IObservableArray,
    IArrayWillChange,
    IArrayWillSplice,
    IArrayChange,
    IArraySplice
} from "mobx"
import { IJsonPatch, Node, IStateTreeNode } from "../../core"
import { ComplexType, IComplexType, IType } from "../type"
import { TypeFlags } from "../type-flags"
import { IContext, IValidationResult } from "../type-checker"
export declare function arrayToString(this: IObservableArray<any> & IStateTreeNode): string
export declare class ArrayType<S, T> extends ComplexType<S[], IObservableArray<T>> {
    shouldAttachNode: boolean
    subType: IType<any, any>
    readonly flags: TypeFlags
    constructor(name: string, subType: IType<any, any>)
    describe(): string
    createNewInstance: () => IObservableArray<{}>
    finalizeNewInstance: (node: Node, snapshot: any) => void
    instantiate(parent: Node | null, subpath: string, environment: any, snapshot: S): Node
    getChildren(node: Node): Node[]
    getChildNode(node: Node, key: string): Node
    willChange(change: IArrayWillChange<any> | IArrayWillSplice<any>): Object | null
    getValue(node: Node): any
    getSnapshot(node: Node): any
    didChange(this: {}, change: IArrayChange<any> | IArraySplice<any>): void
    applyPatchLocally(node: Node, subpath: string, patch: IJsonPatch): void
    applySnapshot(node: Node, snapshot: any[]): void
    getChildType(key: string): IType<any, any>
    isValidSnapshot(value: any, context: IContext): IValidationResult
    getDefaultSnapshot(): never[]
    removeChild(node: Node, subpath: string): void
}
/**
 * Creates a index based collection type who's children are all of a uniform declared type.
 *
 * This type will always produce [observable arrays](https://mobx.js.org/refguide/array.html)
 *
 * @example
 * ```javascript
 * const Todo = types.model({
 *   task: types.string
 * })
 *
 * const TodoStore = types.model({
 *   todos: types.array(Todo)
 * })
 *
 * const s = TodoStore.create({ todos: [] })
 * s.todos.push({ task: "Grab coffee" })
 * console.log(s.todos[0]) // prints: "Grab coffee"
 * ```
 * @export
 * @alias types.array
 * @param {IType<S, T>} subtype
 * @returns {IComplexType<S[], IObservableArray<T>>}
 */
export declare function array<S, T>(subtype: IType<S, T>): IComplexType<S[], IObservableArray<T>>
