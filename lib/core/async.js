// based on: https://github.com/mobxjs/mobx-utils/blob/master/src/async-action.ts
// export function asyncAction<R>(generator: () => IterableIterator<any>): () => Promise<R>
// export function asyncAction<A1>(
//     generator: (a1: A1) => IterableIterator<any>
// ): (a1: A1) => Promise<any> // Ideally we want to have R instead of Any, but cannot specify R without specifying A1 etc... 'any' as result is better then not specifying request args
// export function asyncAction<A1, A2, A3, A4, A5, A6, A7, A8>(
//     generator: (
//         a1: A1,
//         a2: A2,
//         a3: A3,
//         a4: A4,
//         a5: A5,
//         a6: A6,
//         a7: A7,
//         a8: A8
//     ) => IterableIterator<any>
// ): (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7, a8: A8) => Promise<any>
// export function asyncAction<A1, A2, A3, A4, A5, A6, A7>(
//     generator: (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7) => IterableIterator<any>
// ): (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7) => Promise<any>
// export function asyncAction<A1, A2, A3, A4, A5, A6>(
//     generator: (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6) => IterableIterator<any>
// ): (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6) => Promise<any>
// export function asyncAction<A1, A2, A3, A4, A5>(
//     generator: (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5) => IterableIterator<any>
// ): (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5) => Promise<any>
// export function asyncAction<A1, A2, A3, A4>(
//     generator: (a1: A1, a2: A2, a3: A3, a4: A4) => IterableIterator<any>
// ): (a1: A1, a2: A2, a3: A3, a4: A4) => Promise<any>
// export function asyncAction<A1, A2, A3>(
//     generator: (a1: A1, a2: A2, a3: A3) => IterableIterator<any>
// ): (a1: A1, a2: A2, a3: A3) => Promise<any>
// export function asyncAction<A1, A2>(
//     generator: (a1: A1, a2: A2) => IterableIterator<any>
// ): (a1: A1, a2: A2) => Promise<any>
// export function asyncAction<A1>(
//     generator: (a1: A1) => IterableIterator<any>
// ): (a1: A1) => Promise<any>
// TODO: disabled until #273 is resolved
// /**
//  * See [asynchronous actions](https://github.com/mobxjs/mobx-state-tree/blob/master/docs/async-actions.md).
//  *
//  * @export
//  * @alias async
//  * @returns {Promise}
//  */
// export function asyncAction(asyncAction: any): any {
//     if (!isGeneratorFunction(asyncAction))
//         fail(`async expects a generator function (e.g. function* () {...}))`)
//     // async just helps with typings, the real creation of the invoker is done by the ActionProperty type
//     return asyncAction
// }
var generatorId = 0
export function createAsyncActionInvoker(name, generator) {
    // Implementation based on https://github.com/tj/co/blob/master/index.js
    var runId = ++generatorId
    return function asyncAction() {
        var ctx = this
        var args = arguments
        function wrap(fn, mode, arg) {
            createActionInvoker(name, fn, mode, runId).call(ctx, arg)
        }
        return new Promise(function(resolve, reject) {
            var gen
            createActionInvoker(
                name,
                function asyncActionInit() {
                    gen = generator.apply(this, arguments)
                    onFulfilled(undefined) // kick off the process
                },
                "invoke",
                runId
            ).apply(ctx, args)
            function onFulfilled(res) {
                var ret
                try {
                    // prettier-ignore
                    wrap(function (r) { ret = gen.next(r); }, "yield", res);
                } catch (e) {
                    // prettier-ignore
                    setImmediate(function () {
                        wrap(function (r) { reject(e); }, "throw", e);
                    });
                    return
                }
                next(ret)
                return
            }
            function onRejected(err) {
                var ret
                try {
                    // prettier-ignore
                    wrap(function (r) { ret = gen.throw(r); }, "yieldError", err); // or yieldError?
                } catch (e) {
                    // prettier-ignore
                    setImmediate(function () {
                        wrap(function (r) { reject(e); }, "throw", e);
                    });
                    return
                }
                next(ret)
            }
            function next(ret) {
                if (ret.done) {
                    // prettier-ignore
                    setImmediate(function () {
                        wrap(function (r) { resolve(r); }, "return", ret.value);
                    });
                    return
                }
                // TODO: support more type of values? See https://github.com/tj/co/blob/249bbdc72da24ae44076afd716349d2089b31c4c/index.js#L100
                if (!ret.value || typeof ret.value.then !== "function")
                    fail("Only promises can be yielded to `async`, got: " + ret)
                return ret.value.then(onFulfilled, onRejected)
            }
        })
    }
}
import { createActionInvoker } from "./action"
import { fail } from "../utils"
//# sourceMappingURL=async.js.map
