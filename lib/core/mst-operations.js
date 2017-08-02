/**
 * Returns the _actual_ type of the given tree node. (Or throws)
 *
 * @export
 * @param {IStateTreeNode} object
 * @returns {IType<S, T>}
 */
export function getType(object) {
    return getStateTreeNode(object).type
}
/**
 * Returns the _declared_ type of the given sub property of an object, array or map.
 *
 * @example
 * ```typescript
 * const Box = types.model({ x: 0, y: 0 })
 * const box = Box.create()
 *
 * console.log(getChildType(box, "x").name) // 'number'
 * ```
 *
 * @export
 * @param {IStateTreeNode} object
 * @param {string} child
 * @returns {IType<any, any>}
 */
export function getChildType(object, child) {
    return getStateTreeNode(object).getChildType(child)
}
/**
 * Middleware can be used to intercept any action is invoked on the subtree where it is attached.
 * If a tree is protected (by default), this means that any mutation of the tree will pass through your middleware.
 *
 * [SandBox example](https://codesandbox.io/s/mQrqy8j73)
 *
 * It is allowed to attach multiple middlewares. The order in which middleware is invoked is inside-out:
 * local middleware is invoked before parent middleware. On the same object, earlier attached middleware is run before later attached middleware.
 *
 * A middleware receives two arguments: 1. the description of the the call, 2: a function to invoke the next middleware in the chain.
 * If `next(call)` is not invoked by your middleware, the action will be aborted and not actually executed.
 * Before passing the call to the next middleware using `next`, feel free to clone and modify the call description
 *
 * A call description looks like:
 *
 * ```
 * {
 *      name: string // name of the action
 *      object: any & IStateTreeNode // the object on which the action was original invoked
 *      args: any[] // the arguments of the action
 *      asyncMode: string
 *      asyncId: number
 * }
 * ```
 *
 * The fields `asyncMode` and `asyncId` are explained in detail in the [asynchronous action](https://github.com/mobxjs/mobx-state-tree/blob/master/docs/async-actions.md#asynchronous-actions-and-middleware) section.
 *
 * An example of a build in middleware is the `onAction` method.
 *
 * @example
 * ```typescript
 * const store = SomeStore.create()
 * const disposer = addMiddleWare(store, (call, next) => {
 *   console.log(`action ${call.name} was invoked`)
 *   next(call) // runs the next middleware (or the intended action if there is no middleware to run left)
 * })
 * ```
 *
 * @export
 * @param {IStateTreeNode} target
 * @param {(action: IRawActionCall, next: (call: IRawActionCall) => any) => any} middleware
 * @returns {IDisposer}
 */
export function addMiddleware(target, middleware) {
    var node = getStateTreeNode(target)
    if (!node.isProtectionEnabled)
        console.warn(
            "It is recommended to protect the state tree before attaching action middleware, as otherwise it cannot be guaranteed that all changes are passed through middleware. See `protect`"
        )
    return node.addMiddleWare(middleware)
}
/**
 * Registers a function that will be invoked for each mutation that is applied to the provided model instance, or to any of its children.
 * See [patches](https://github.com/mobxjs/mobx-state-tree#patches) for more details. onPatch events are emitted immediately and will not await the end of a transaction.
 * Patches can be used to deep observe a model tree.
 *
 * @export
 * @param {Object} target the model instance from which to receive patches
 * @param {(patch: IJsonPatch) => void} callback the callback that is invoked for each patch
 * @param {includeOldValue} boolean if oldValue is included in the patches, they can be inverted. However patches will become much bigger and might not be suitable for efficient transport
 * @returns {IDisposer} function to remove the listener
 */
export function onPatch(target, callback, includeOldValue) {
    if (includeOldValue === void 0) {
        includeOldValue = false
    }
    return getStateTreeNode(target).onPatch(callback, includeOldValue)
}
/**
 * Registeres a function that is invoked whenever a new snapshot for the given model instance is available.
 * The listener will only be fire at the and of the current MobX (trans)action.
 * See [snapshots](https://github.com/mobxjs/mobx-state-tree#snapshots) for more details.
 *
 * @export
 * @param {Object} target
 * @param {(snapshot: any) => void} callback
 * @returns {IDisposer}
 */
export function onSnapshot(target, callback) {
    return getStateTreeNode(target).onSnapshot(callback)
}
/**
 * Applies a JSON-patch to the given model instance or bails out if the patch couldn't be applied
 * See [patches](https://github.com/mobxjs/mobx-state-tree#patches) for more details.
 *
 * Can apply a single past, or an array of patches.
 *
 * @export
 * @param {Object} target
 * @param {IJsonPatch} patch
 * @returns
 */
export function applyPatch(target, patch) {
    getStateTreeNode(target).applyPatches(asArray(patch))
}
/**
 * The inverse function of apply patch.
 * Given a patch or set of patches, restores the target to the state before the patches where produced.
 * The inverse patch is computed, and all the patches are applied in reverse order, basically 'rewinding' the target,
 * so that conceptually the following holds for any set of patches:
 *
 * `getSnapshot(x) === getSnapshot(revertPatch(applyPatches(x, patches), patches))`
 *
 * Note: Reverting patches will generate a new set of patches as side effect of applying the patches.
 * Note: only patches that include `oldValue` information are suitable for reverting. Such patches can be generated by passing `true` as second argument when attaching an `onPatch` listener.
 */
export function revertPatch(target, patch) {
    var patches = asArray(patch).map(invertPatch)
    patches.reverse() // inverse apply them in reverse order!
    getStateTreeNode(target).applyPatches(patches)
}
/**
 * Small abstraction around `onPatch` and `applyPatch`, attaches a patch listener to a tree and records all the patches.
 * Returns an recorder object with the following signature:
 *
 * ```typescript
 * export interface IPatchRecorder {
 *      // the recorded patches
 *      patches: IJsonPatch[]
 *      // the same set of recorded patches, but without undo information, making them smaller and compliant with json-patch spec
 *      cleanPatches: IJSonPatch[]
 *      // stop recording patches
 *      stop(target?: IStateTreeNode): any
 *      // apply all the recorded patches on the given target (the original subject if omitted)
 *      replay(target?: IStateTreeNode): any
 *      // reverse apply the recorded patches on the given target  (the original subject if omitted)
 *      // stops the recorder if not already stopped
 *      undo(): void
 * }
 * ```
 *
 * @export
 * @param {IStateTreeNode} subject
 * @returns {IPatchRecorder}
 */
export function recordPatches(subject) {
    var recorder = {
        patches: [],
        get cleanPatches() {
            return this.patches.map(stripPatch)
        },
        stop: function() {
            disposer()
        },
        replay: function(target) {
            applyPatch(target || subject, recorder.patches)
        },
        undo: function(target) {
            revertPatch(subject || subject, this.patches)
        }
    }
    var disposer = onPatch(
        subject,
        function(patch) {
            recorder.patches.push(patch)
        },
        true
    )
    return recorder
}
/**
 * Applies an action or a series of actions in a single MobX transaction.
 * Does not return any value
 * Takes an action description as produced by the `onAction` middleware.
 *
 * @export
 * @param {Object} target
 * @param {IActionCall[]} actions
 * @param {IActionCallOptions} [options]
 */
export function applyAction(target, actions) {
    runInAction(function() {
        asArray(actions).forEach(function(action) {
            return baseApplyAction(target, action)
        })
    })
}
/**
 * Small abstraction around `onAction` and `applyAction`, attaches an action listener to a tree and records all the actions emitted.
 * Returns an recorder object with the following signature:
 *
 * ```typescript
 * export interface IActionRecorder {
 *      // the recorded actions
 *      actions: ISerializedActionCall[]
 *      // stop recording actions
 *      stop(): any
 *      // apply all the recorded actions on the given object
 *      replay(target: IStateTreeNode): any
 * }
 * ```
 *
 * @export
 * @param {IStateTreeNode} subject
 * @returns {IPatchRecorder}
 */
export function recordActions(subject) {
    var recorder = {
        actions: [],
        stop: function() {
            return disposer()
        },
        replay: function(target) {
            applyAction(target, recorder.actions)
        }
    }
    var disposer = onAction(subject, recorder.actions.push.bind(recorder.actions))
    return recorder
}
/**
 * The inverse of `unprotect`
 *
 * @export
 * @param {IStateTreeNode} target
 *
 */
export function protect(target) {
    var node = getStateTreeNode(target)
    if (!node.isRoot) fail("`protect` can only be invoked on root nodes")
    node.isProtectionEnabled = true
}
/**
 * By default it is not allowed to directly modify a model. Models can only be modified through actions.
 * However, in some cases you don't care about the advantages (like replayability, tracability, etc) this yields.
 * For example because you are building a PoC or don't have any middleware attached to your tree.
 *
 * In that case you can disable this protection by calling `unprotect` on the root of your tree.
 *
 * @example
 * const Todo = types.model({
 *     done: false,
 *     toggle() {
 *         this.done = !this.done
 *     }
 * })
 *
 * const todo = new Todo()
 * todo.done = true // OK
 * protect(todo)
 * todo.done = false // throws!
 * todo.toggle() // OK
 */
export function unprotect(target) {
    var node = getStateTreeNode(target)
    if (!node.isRoot) fail("`unprotect` can only be invoked on root nodes")
    node.isProtectionEnabled = false
}
/**
 * Returns true if the object is in protected mode, @see protect
 */
export function isProtected(target) {
    return getStateTreeNode(target).isProtected
}
/**
 * Applies a snapshot to a given model instances. Patch and snapshot listeners will be invoked as usual.
 *
 * @export
 * @param {Object} target
 * @param {Object} snapshot
 * @returns
 */
export function applySnapshot(target, snapshot) {
    return getStateTreeNode(target).applySnapshot(snapshot)
}
/**
 * Calculates a snapshot from the given model instance. The snapshot will always reflect the latest state but use
 * structural sharing where possible. Doesn't require MobX transactions to be completed.
 *
 * @export
 * @param {Object} target
 * @returns {*}
 */
export function getSnapshot(target) {
    return getStateTreeNode(target).snapshot
}
/**
 * Given a model instance, returns `true` if the object has a parent, that is, is part of another object, map or array
 *
 * @export
 * @param {Object} target
 * @param {number} depth = 1, how far should we look upward?
 * @returns {boolean}
 */
export function hasParent(target, depth) {
    if (depth === void 0) {
        depth = 1
    }
    if (depth < 0) fail("Invalid depth: " + depth + ", should be >= 1")
    var parent = getStateTreeNode(target).parent
    while (parent) {
        if (--depth === 0) return true
        parent = parent.parent
    }
    return false
}
/**
 * Returns the immediate parent of this object, or null.
 *
 * Note that the immediate parent can be either an object, map or array, and
 * doesn't necessarily refer to the parent model
 *
 * @export
 * @param {Object} target
 * @param {number} depth = 1, how far should we look upward?
 * @returns {*}
 */
export function getParent(target, depth) {
    if (depth === void 0) {
        depth = 1
    }
    if (depth < 0) fail("Invalid depth: " + depth + ", should be >= 1")
    var d = depth
    var parent = getStateTreeNode(target).parent
    while (parent) {
        if (--d === 0) return parent.storedValue
        parent = parent.parent
    }
    return fail("Failed to find the parent of " + getStateTreeNode(target) + " at depth " + depth)
}
/**
 * Given an object in a model tree, returns the root object of that tree
 *
 * @export
 * @param {Object} target
 * @returns {*}
 */
export function getRoot(target) {
    return getStateTreeNode(target).root.storedValue
}
/**
 * Returns the path of the given object in the model tree
 *
 * @export
 * @param {Object} target
 * @returns {string}
 */
export function getPath(target) {
    return getStateTreeNode(target).path
}
/**
 * Returns the path of the given object as unescaped string array
 *
 * @export
 * @param {Object} target
 * @returns {string[]}
 */
export function getPathParts(target) {
    return splitJsonPath(getStateTreeNode(target).path)
}
/**
 * Returns true if the given object is the root of a model tree
 *
 * @export
 * @param {Object} target
 * @returns {boolean}
 */
export function isRoot(target) {
    return getStateTreeNode(target).isRoot
}
/**
 * Resolves a path relatively to a given object.
 * Returns undefined if no value can be found.
 *
 * @export
 * @param {Object} target
 * @param {string} path - escaped json path
 * @returns {*}
 */
export function resolvePath(target, path) {
    var node = getStateTreeNode(target).resolve(path)
    return node ? node.value : undefined
}
/**
 * Resolves a model instance given a root target, the type and the identifier you are searching for.
 * Returns undefined if no value can be found.
 *
 * @export
 * @param {IType<any, any>} type
 * @param {IStateTreeNode} target
 * @param {(string | number)} identifier
 * @returns {*}
 */
export function resolveIdentifier(type, target, identifier) {
    if (!isType(type)) fail("Expected a type as first argument")
    var node = getStateTreeNode(target).root.identifierCache.resolve(type, "" + identifier)
    return node ? node.value : undefined
}
/**
 *
 *
 * @export
 * @param {Object} target
 * @param {string} path
 * @returns {*}
 */
export function tryResolve(target, path) {
    var node = getStateTreeNode(target).resolve(path, false)
    if (node === undefined) return undefined
    return node ? node.value : undefined
}
/**
 * Given two state tree nodes that are part of the same tree,
 * returns the shortest jsonpath needed to navigate from the one to the other
 *
 * @export
 * @param {IStateTreeNode} base
 * @param {IStateTreeNode} target
 * @returns {string}
 */
export function getRelativePath(base, target) {
    return getStateTreeNode(base).getRelativePathTo(getStateTreeNode(target))
}
/**
 * Returns a deep copy of the given state tree node as new tree.
 * Short hand for `snapshot(x) = getType(x).create(getSnapshot(x))`
 *
 * _Tip: clone will create a literal copy, including the same identifiers. To modify identifiers etc during cloning, don't use clone but take a snapshot of the tree, modify it, and create new instance_
 *
 * @export
 * @template T
 * @param {T} source
 * @param {boolean | any} keepEnvironment indicates whether the clone should inherit the same environment (`true`, the default), or not have an environment (`false`). If an object is passed in as second argument, that will act as the environment for the cloned tree.
 * @returns {T}
 */
export function clone(source, keepEnvironment) {
    if (keepEnvironment === void 0) {
        keepEnvironment = true
    }
    var node = getStateTreeNode(source)
    return node.type.create(
        node.snapshot,
        keepEnvironment === true
            ? node.root._environment
            : keepEnvironment === false ? undefined : keepEnvironment // it's an object or something else
    )
}
/**
 * Removes a model element from the state tree, and let it live on as a new state tree
 */
export function detach(thing) {
    getStateTreeNode(thing).detach()
    return thing
}
/**
 * Removes a model element from the state tree, and mark it as end-of-life; the element should not be used anymore
 */
export function destroy(thing) {
    var node = getStateTreeNode(thing)
    if (node.isRoot) node.die()
    else node.parent.removeChild(node.subpath)
}
/**
 * Returns true if the given state tree node is not killed yet.
 * This means that the node is still a part of a tree, and that `destroy`
 * has not been called. If a node is not alive anymore, the only thing one can do with it
 * is requesting it's last path and snapshot
 *
 * @export
 * @param {IStateTreeNode} thing
 * @returns {boolean}
 */
export function isAlive(thing) {
    return getStateTreeNode(thing).isAlive
}
/**
 * Use this utility to register a function that should be called whenever the
 * targeted state tree node is destroyed. This is a useful alternative to managing
 * cleanup methods yourself using the `beforeDestroy` hook.
 *
 * @example
 * ```javascript
 * const Todo = types.model({
 *   title: types.string
 * }, {
 *   afterCreate() {
 *     const autoSaveDisposer = reaction(
 *       () => getSnapshot(this),
 *       snapshot => sendSnapshotToServerSomehow(snapshot)
 *     )
 *     // stop sending updates to server if this
 *     // instance is destroyed
 *     addDisposer(this, autoSaveDisposer)
 *   }
 * })
 * ```
 *
 * @export
 * @param {IStateTreeNode} target
 * @param {() => void} disposer
 */
export function addDisposer(target, disposer) {
    getStateTreeNode(target).addDisposer(disposer)
}
/**
 * Returns the environment of the current state tree. For more info on environments,
 * see [Dependency injection](https://github.com/mobxjs/mobx-state-tree#dependency-injection)
 *
 * @export
 * @param {IStateTreeNode} thing
 * @returns {*}
 */
export function getEnv(thing) {
    var node = getStateTreeNode(thing)
    var env = node.root._environment
    if (!!!env)
        fail(
            "Node '" +
                node +
                "' is not part of state tree that was initialized with an environment. Environment can be passed as second argumentt to .create()"
        )
    return env
}
/**
 * Performs a depth first walk through a tree
 */
export function walk(thing, processor) {
    var node = getStateTreeNode(thing)
    // tslint:disable-next-line:no_unused-variable
    node.getChildren().forEach(function(child) {
        if (isStateTreeNode(child.storedValue)) walk(child.storedValue, processor)
    })
    processor(node.storedValue)
}
import { applyAction as baseApplyAction, onAction } from "./action"
import { runInAction } from "mobx"
import { getStateTreeNode, isStateTreeNode } from "./node"
import { splitJsonPath, invertPatch, stripPatch } from "./json-patch"
import { fail, asArray } from "../utils"
import { isType } from "../types/type-flags"
//# sourceMappingURL=mst-operations.js.map
