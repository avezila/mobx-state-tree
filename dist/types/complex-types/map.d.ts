import { ObservableMap, IMapChange, IMapWillChange } from "mobx"
import { IJsonPatch, Node } from "../../core"
import { IType, IComplexType, ComplexType } from "../type"
import { TypeFlags } from "../type-flags"
import { IContext, IValidationResult } from "../type-checker"
export interface IExtendedObservableMap<T> extends ObservableMap<T> {
    put(value: T | any): this
}
export declare function mapToString(this: ObservableMap<any>): string
export declare class MapType<S, T> extends ComplexType<
    {
        [key: string]: S
    },
    IExtendedObservableMap<T>
> {
    shouldAttachNode: boolean
    subType: IType<any, any>
    readonly flags: TypeFlags
    constructor(name: string, subType: IType<any, any>)
    instantiate(parent: Node | null, subpath: string, environment: any, snapshot: S): Node
    describe(): string
    createNewInstance: () => ObservableMap<{}>
    finalizeNewInstance: (node: Node, snapshot: any) => void
    getChildren(node: Node): Node[]
    getChildNode(node: Node, key: string): Node
    willChange(change: IMapWillChange<any>): IMapWillChange<any> | null
    private verifyIdentifier(expected, node)
    getValue(node: Node): any
    getSnapshot(
        node: Node
    ): {
        [key: string]: any
    }
    didChange(change: IMapChange<any>): void
    applyPatchLocally(node: Node, subpath: string, patch: IJsonPatch): void
    applySnapshot(node: Node, snapshot: any): void
    getChildType(key: string): IType<any, any>
    isValidSnapshot(value: any, context: IContext): IValidationResult
    getDefaultSnapshot(): {}
    removeChild(node: Node, subpath: string): void
}
/**
 * Creates a key based collection type who's children are all of a uniform declared type.
 * If the type stored in a map has an identifier, it is mandatory to store the child under that identifier in the map.
 *
 * This type will always produce [observable maps](https://mobx.js.org/refguide/map.html)
 *
 * @example
 * ```javascript
 * const Todo = types.model({
 *   id: types.identifier,
 *   task: types.string
 * })
 *
 * const TodoStore = types.model({
 *   todos: types.map(Todo)
 * })
 *
 * const s = TodoStore.create({ todos: [] })
 * s.todos.set(17, { task: "Grab coffee", id: 17 })
 * s.todos.put({ task: "Grab cookie", id: 18 }) // put will infer key from the identifier
 * console.log(s.todos.get(17)) // prints: "Grab coffee"
 * ```
 * @export
 * @alias types.map
 * @param {IType<S, T>} subtype
 * @returns {IComplexType<S[], IObservableArray<T>>}
 */
export declare function map<S, T>(
    subtype: IType<S, T>
): IComplexType<
    {
        [key: string]: S
    },
    IExtendedObservableMap<T>
>
