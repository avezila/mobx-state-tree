import { IRawActionCall } from "../core/action"
export interface IMiddleWareApi {
    getState: () => any
    dispatch: (action: any) => void
}
export interface IReduxStore extends IMiddleWareApi {
    subscribe(listener: (snapshot: any) => void): any
}
export declare type MiddleWare = (
    middlewareApi: IMiddleWareApi
) => ((next: (action: IRawActionCall) => void) => void)
/**
 * Creates a tiny proxy around a MST tree that conforms to the redux store api.
 * This makes it possible to use MST inside a redux application.
 *
 * See the [redux-todomvc example](https://github.com/mobxjs/mobx-state-tree/blob/e9e804c8c43e1edde4aabbd52675544e2b3a905b/examples/redux-todomvc/src/index.js#L20) for more details.
 *
 * @export
 * @param {*} model
 * @param {...MiddleWare[]} middlewares
 * @returns {IReduxStore}
 */
export declare function asReduxStore(model: any, ...middlewares: MiddleWare[]): IReduxStore
/**
 * Connects a MST tree to the Redux devtools.
 * See this [example](https://github.com/mobxjs/mobx-state-tree/blob/e9e804c8c43e1edde4aabbd52675544e2b3a905b/examples/redux-todomvc/src/index.js#L21) for a setup example.
 *
 * @export
 * @param {*} remoteDevDep
 * @param {*} model
 */
export declare function connectReduxDevtools(remoteDevDep: any, model: any): void
