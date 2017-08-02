import { isStateTreeNode } from "../core"
import { getSnapshot, applySnapshot, onSnapshot } from "../core/mst-operations"
import { applyAction, onAction } from "../core/action"
import { fail, extend } from "../utils"
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
export function asReduxStore(model) {
    var middlewares = []
    for (var _i = 1; _i < arguments.length; _i++) {
        middlewares[_i - 1] = arguments[_i]
    }
    if (!isStateTreeNode(model)) fail("Expected model object")
    var store = {
        getState: function() {
            return getSnapshot(model)
        },
        dispatch: function(action) {
            runMiddleWare(action, runners.slice(), function(newAction) {
                return applyAction(model, reduxActionToAction(newAction))
            })
        },
        subscribe: function(listener) {
            return onSnapshot(model, listener)
        }
    }
    var runners = middlewares.map(function(mw) {
        return mw(store)
    })
    return store
}
function reduxActionToAction(action) {
    var actionArgs = extend({}, action)
    delete actionArgs.type
    return {
        name: action.type,
        args: [actionArgs]
    }
}
function runMiddleWare(action, runners, next) {
    function n(retVal) {
        var f = runners.shift()
        if (f) f(n)(retVal)
        else next(retVal)
    }
    n(action)
}
/**
 * Connects a MST tree to the Redux devtools.
 * See this [example](https://github.com/mobxjs/mobx-state-tree/blob/e9e804c8c43e1edde4aabbd52675544e2b3a905b/examples/redux-todomvc/src/index.js#L21) for a setup example.
 *
 * @export
 * @param {*} remoteDevDep
 * @param {*} model
 */
export function connectReduxDevtools(remoteDevDep, model) {
    // Connect to the monitor
    var remotedev = remoteDevDep.connectViaExtension()
    var applyingSnapshot = false
    // Subscribe to change state (if need more than just logging)
    remotedev.subscribe(function(message) {
        // Helper when only time travelling needed
        var state = remoteDevDep.extractState(message)
        if (state) {
            applyingSnapshot = true
            applySnapshot(model, state)
            applyingSnapshot = false
        }
    })
    // Send changes to the remote monitor
    onAction(model, function(action) {
        if (applyingSnapshot) return
        var copy = {}
        copy.type = action.name
        if (action.args)
            action.args.forEach(function(value, index) {
                return (copy[index] = value)
            })
        remotedev.send(copy, getSnapshot(model))
    })
}
//# sourceMappingURL=redux.js.map
