export declare type ISerializedActionCall = {
    name: string
    path?: string
    args?: any[]
}
export declare type IActionAsyncMode =
    | "none"
    | "invoke"
    | "yield"
    | "yieldError"
    | "return"
    | "throw"
export declare type IRawActionCall = {
    /**
     * AsyncId indicates whether this action is part of an `async` based action. Id is zero if it isn't.
     */
    asyncId: number
    asyncMode: IActionAsyncMode
    name: string
    object: any & IStateTreeNode
    args: any[]
}
export declare type IMiddleWareHandler = (
    actionCall: IRawActionCall,
    next: (actionCall: IRawActionCall) => any
) => any
export declare function createActionInvoker(
    name: string,
    fn: Function,
    asyncMode?: IActionAsyncMode,
    asyncId?: number
): (this: IStateTreeNode) => any
export declare function applyAction(target: IStateTreeNode, action: ISerializedActionCall): any
/**
 * Registers a function that will be invoked for each action that is called on the provided model instance, or to any of its children.
 * See [actions](https://github.com/mobxjs/mobx-state-tree#actions) for more details. onAction events are emitted only for the outermost called action in the stack.
 * Action can also be intercepted by middleware using addMiddleware to change the function call before it will be run.
 *
 * @export
 * @param {IStateTreeNode} target
 * @param {(call: ISerializedActionCall) => void} listener
 * @returns {IDisposer}
 */
export declare function onAction(
    target: IStateTreeNode,
    listener: (call: ISerializedActionCall) => void
): IDisposer
import { IStateTreeNode } from "./node"
import { IDisposer } from "../utils"
