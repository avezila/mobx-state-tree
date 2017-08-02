import * as tslib_1 from "tslib"
import { observable, computed, reaction } from "mobx"
var nextNodeId = 1
var Node = (function() {
    function Node(type, parent, subpath, environment, storedValue) {
        var _this = this
        // optimization: these fields make MST memory expensive for primitives. Most can be initialized lazily, or with EMPTY_ARRAY on prototype
        this.nodeId = ++nextNodeId
        this._parent = null
        this.subpath = ""
        this.isProtectionEnabled = true
        this.identifierAttribute = undefined // not to be modified directly, only through model initialization
        this._environment = undefined
        this._isRunningAction = false // only relevant for root
        this._autoUnbox = true // unboxing is disabled when reading child nodes
        this._isAlive = true // optimization: use binary flags for all these switches
        this._isDetaching = false
        this.middlewares = []
        this.snapshotSubscribers = []
        this.patchSubscribers = []
        this.disposers = []
        this.type = type
        this._parent = parent
        this.subpath = subpath
        this.storedValue = storedValue
        this._environment = environment
        this.unbox = this.unbox.bind(this)
        // Optimization: this does not need to be done per instance
        // if some pieces from createActionInvoker are extracted
        this.applyPatches = createActionInvoker("@APPLY_PATCHES", function(patches) {
            patches.forEach(function(patch) {
                var parts = splitJsonPath(patch.path)
                var node = _this.resolvePath(parts.slice(0, -1))
                node.applyPatchLocally(parts[parts.length - 1], patch)
            })
        }).bind(this.storedValue)
        this.applySnapshot = createActionInvoker("@APPLY_SNAPSHOT", function(snapshot) {
            // if the snapshot is the same as the current one, avoid performing a reconcile
            if (snapshot === _this.snapshot) return
            // else, apply it by calling the type logic
            return _this.type.applySnapshot(_this, snapshot)
        }).bind(this.storedValue)
        // optimization: don't keep the snapshot by default alive with a reaction by default
        // in prod mode. This saves lot of GC overhead (important for e.g. React Native)
        // if the feature is not actively used
        // downside; no structural sharing if getSnapshot is called incidently
        var snapshotDisposer = reaction(
            function() {
                return _this.snapshot
            },
            function(snapshot) {
                _this.emitSnapshot(snapshot)
            }
        )
        snapshotDisposer.onError(function(e) {
            throw e
        })
        this.addDisposer(snapshotDisposer)
    }
    Object.defineProperty(Node.prototype, "identifier", {
        get: function() {
            return this.identifierAttribute ? this.storedValue[this.identifierAttribute] : null
        },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(Node.prototype, "path", {
        /*
         * Returnes (escaped) path representation as string
         */
        get: function() {
            if (!this.parent) return ""
            return this.parent.path + "/" + escapeJsonPath(this.subpath)
        },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(Node.prototype, "isRoot", {
        get: function() {
            return this.parent === null
        },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(Node.prototype, "parent", {
        get: function() {
            return this._parent
        },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(Node.prototype, "root", {
        // TODO: make computed
        get: function() {
            // future optimization: store root ref in the node and maintain it
            var p,
                r = this
            while ((p = r.parent)) r = p
            return r
        },
        enumerable: true,
        configurable: true
    })
    // TODO: lift logic outside this file
    Node.prototype.getRelativePathTo = function(target) {
        // PRE condition target is (a child of) base!
        if (this.root !== target.root)
            fail(
                "Cannot calculate relative path: objects '" +
                    this +
                    "' and '" +
                    target +
                    "' are not part of the same object tree"
            )
        var baseParts = splitJsonPath(this.path)
        var targetParts = splitJsonPath(target.path)
        var common = 0
        for (; common < baseParts.length; common++) {
            if (baseParts[common] !== targetParts[common]) break
        }
        // TODO: assert that no targetParts paths are "..", "." or ""!
        return (
            baseParts
                .slice(common)
                .map(function(_) {
                    return ".."
                })
                .join("/") + joinJsonPath(targetParts.slice(common))
        )
    }
    Node.prototype.resolve = function(path, failIfResolveFails) {
        if (failIfResolveFails === void 0) {
            failIfResolveFails = true
        }
        return this.resolvePath(splitJsonPath(path), failIfResolveFails)
    }
    Node.prototype.resolvePath = function(pathParts, failIfResolveFails) {
        if (failIfResolveFails === void 0) {
            failIfResolveFails = true
        }
        // counter part of getRelativePath
        // note that `../` is not part of the JSON pointer spec, which is actually a prefix format
        // in json pointer: "" = current, "/a", attribute a, "/" is attribute "" etc...
        // so we treat leading ../ apart...
        var current = this
        for (var i = 0; i < pathParts.length; i++) {
            if (
                pathParts[i] === "" // '/bla' or 'a//b' splits to empty strings
            )
                current = current.root
            else if (pathParts[i] === "..") current = current.parent
            else if (pathParts[i] === "." || pathParts[i] === "") continue
            else if (current) {
                current = current.getChildNode(pathParts[i])
                continue
            }
            if (!current) {
                if (failIfResolveFails)
                    return fail(
                        "Could not resolve '" +
                            pathParts[i] +
                            "' in '" +
                            joinJsonPath(pathParts.slice(0, i - 1)) +
                            "', path of the patch does not resolve"
                    )
                else return undefined
            }
        }
        return current
    }
    Object.defineProperty(Node.prototype, "value", {
        get: function() {
            if (!this._isAlive) return undefined
            return this.type.getValue(this)
        },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(Node.prototype, "isAlive", {
        get: function() {
            return this._isAlive
        },
        enumerable: true,
        configurable: true
    })
    Node.prototype.die = function() {
        if (this._isDetaching) return
        if (isStateTreeNode(this.storedValue)) {
            walk(this.storedValue, function(child) {
                return getStateTreeNode(child).aboutToDie()
            })
            walk(this.storedValue, function(child) {
                return getStateTreeNode(child).finalizeDeath()
            })
        }
    }
    Node.prototype.aboutToDie = function() {
        this.disposers.splice(0).forEach(function(f) {
            return f()
        })
        this.fireHook("beforeDestroy")
    }
    Node.prototype.finalizeDeath = function() {
        // invariant: not called directly but from "die"
        this.root.identifierCache.notifyDied(this)
        var self = this
        var oldPath = this.path
        addReadOnlyProp(this, "snapshot", this.snapshot) // kill the computed prop and just store the last snapshot
        this.patchSubscribers.splice(0)
        this.snapshotSubscribers.splice(0)
        this.patchSubscribers.splice(0)
        this._isAlive = false
        this._parent = null
        this.subpath = ""
        // This is quite a hack, once interceptable objects / arrays / maps are extracted from mobx,
        // we could express this in a much nicer way
        Object.defineProperty(this.storedValue, "$mobx", {
            get: function() {
                fail(
                    "This object has died and is no longer part of a state tree. It cannot be used anymore. The object (of type '" +
                        self.type.name +
                        "') used to live at '" +
                        oldPath +
                        "'. It is possible to access the last snapshot of this object using 'getSnapshot', or to create a fresh copy using 'clone'. If you want to remove an object from the tree without killing it, use 'detach' instead."
                )
            }
        })
    }
    Node.prototype.assertAlive = function() {
        if (!this._isAlive)
            fail(
                this +
                    " cannot be used anymore as it has died; it has been removed from a state tree. If you want to remove an element from a tree and let it live on, use 'detach' or 'clone' the value"
            )
    }
    Object.defineProperty(Node.prototype, "snapshot", {
        get: function() {
            if (!this._isAlive) return undefined
            // advantage of using computed for a snapshot is that nicely respects transactions etc.
            // Optimization: only freeze on dev builds
            return freeze(this.type.getSnapshot(this))
        },
        enumerable: true,
        configurable: true
    })
    Node.prototype.onSnapshot = function(onChange) {
        return registerEventHandler(this.snapshotSubscribers, onChange)
    }
    Node.prototype.emitSnapshot = function(snapshot) {
        this.snapshotSubscribers.forEach(function(f) {
            return f(snapshot)
        })
    }
    Node.prototype.applyPatchLocally = function(subpath, patch) {
        this.assertWritable()
        this.type.applyPatchLocally(this, subpath, patch)
    }
    Node.prototype.onPatch = function(onPatch, includeOldValue) {
        return registerEventHandler(
            this.patchSubscribers,
            includeOldValue
                ? onPatch
                : function(patch) {
                      return onPatch(stripPatch(patch))
                  }
        )
    }
    Node.prototype.emitPatch = function(patch, source) {
        if (this.patchSubscribers.length) {
            var localizedPatch_1 = extend({}, patch, {
                path: source.path.substr(this.path.length) + "/" + patch.path // calculate the relative path of the patch
            })
            this.patchSubscribers.forEach(function(f) {
                return f(localizedPatch_1)
            })
        }
        if (this.parent) this.parent.emitPatch(patch, source)
    }
    Node.prototype.setParent = function(newParent, subpath) {
        if (subpath === void 0) {
            subpath = null
        }
        if (this.parent === newParent && this.subpath === subpath) return
        if (this._parent && newParent && newParent !== this._parent) {
            fail(
                "A node cannot exists twice in the state tree. Failed to add " +
                    this +
                    " to path '" +
                    newParent.path +
                    "/" +
                    subpath +
                    "'."
            )
        }
        if (!this._parent && newParent && newParent.root === this) {
            fail(
                "A state tree is not allowed to contain itself. Cannot assign " +
                    this +
                    " to path '" +
                    newParent.path +
                    "/" +
                    subpath +
                    "'"
            )
        }
        if (!this._parent && !!this._environment) {
            fail(
                "A state tree that has been initialized with an environment cannot be made part of another state tree."
            )
        }
        if (this.parent && !newParent) {
            this.die()
        } else {
            this.subpath = subpath || ""
            if (newParent && newParent !== this._parent) {
                newParent.root.identifierCache.mergeCache(this)
                this._parent = newParent
                this.fireHook("afterAttach")
            }
        }
    }
    Node.prototype.addDisposer = function(disposer) {
        this.disposers.unshift(disposer)
    }
    Node.prototype.isRunningAction = function() {
        if (this._isRunningAction) return true
        if (this.isRoot) return false
        return this.parent.isRunningAction()
    }
    Node.prototype.addMiddleWare = function(handler) {
        // TODO: check / warn if not protected?
        return registerEventHandler(this.middlewares, handler)
    }
    Node.prototype.getChildNode = function(subpath) {
        this.assertAlive()
        this._autoUnbox = false
        var res = this.type.getChildNode(this, subpath)
        this._autoUnbox = true
        return res
    }
    Node.prototype.getChildren = function() {
        this.assertAlive()
        this._autoUnbox = false
        var res = this.type.getChildren(this)
        this._autoUnbox = true
        return res
    }
    Node.prototype.getChildType = function(key) {
        return this.type.getChildType(key)
    }
    Object.defineProperty(Node.prototype, "isProtected", {
        get: function() {
            return this.root.isProtectionEnabled
        },
        enumerable: true,
        configurable: true
    })
    Node.prototype.assertWritable = function() {
        this.assertAlive()
        if (!this.isRunningAction() && this.isProtected) {
            fail(
                "Cannot modify '" +
                    this +
                    "', the object is protected and can only be modified by using an action."
            )
        }
    }
    Node.prototype.removeChild = function(subpath) {
        this.type.removeChild(this, subpath)
    }
    Node.prototype.detach = function() {
        if (!this._isAlive) fail("Error while detaching, node is not alive.")
        if (this.isRoot) return
        else {
            this.fireHook("beforeDetach")
            this._environment = this.root._environment // make backup of environment
            this._isDetaching = true
            this.identifierCache = this.root.identifierCache.splitCache(this)
            this.parent.removeChild(this.subpath)
            this._parent = null
            this.subpath = ""
            this._isDetaching = false
        }
    }
    Node.prototype.unbox = function(childNode) {
        if (childNode && this._autoUnbox === true) return childNode.value
        return childNode
    }
    Node.prototype.fireHook = function(name) {
        var fn = this.storedValue && typeof this.storedValue === "object" && this.storedValue[name]
        if (typeof fn === "function") fn.apply(this.storedValue)
    }
    Node.prototype.toString = function() {
        var identifier = this.identifier ? "(id: " + this.identifier + ")" : ""
        return (
            this.type.name +
            "@" +
            (this.path || "<root>") +
            identifier +
            (this.isAlive ? "" : "[dead]")
        )
    }
    tslib_1.__decorate([observable], Node.prototype, "_parent", void 0)
    tslib_1.__decorate([observable], Node.prototype, "subpath", void 0)
    tslib_1.__decorate([computed], Node.prototype, "path", null)
    tslib_1.__decorate([computed], Node.prototype, "value", null)
    tslib_1.__decorate([computed], Node.prototype, "snapshot", null)
    return Node
})()
export { Node }
/**
 * Returns true if the given value is a node in a state tree.
 * More precisely, that is, if the value is an instance of a
 * `types.model`, `types.array` or `types.map`.
 *
 * @export
 * @param {*} value
 * @returns {value is IStateTreeNode}
 */
export function isStateTreeNode(value) {
    return !!(value && value.$treenode)
}
export function getStateTreeNode(value) {
    if (isStateTreeNode(value)) return value.$treenode
    else return fail("Value " + value + " is no MST Node")
}
function canAttachNode(value) {
    return (
        value &&
        typeof value === "object" &&
        !(value instanceof Date) &&
        !isStateTreeNode(value) &&
        !Object.isFrozen(value)
    )
}
function toJSON() {
    return getStateTreeNode(this).snapshot
}
export function createNode(
    type,
    parent,
    subpath,
    environment,
    initialValue,
    createNewInstance,
    finalizeNewInstance
) {
    if (createNewInstance === void 0) {
        createNewInstance = identity
    }
    if (finalizeNewInstance === void 0) {
        finalizeNewInstance = noop
    }
    if (isStateTreeNode(initialValue)) {
        var targetNode = getStateTreeNode(initialValue)
        if (!targetNode.isRoot)
            fail(
                "Cannot add an object to a state tree if it is already part of the same or another state tree. Tried to assign an object to '" +
                    (parent ? parent.path : "") +
                    "/" +
                    subpath +
                    "', but it lives already at '" +
                    targetNode.path +
                    "'"
            )
        targetNode.setParent(parent, subpath)
        return targetNode
    }
    var instance = createNewInstance(initialValue)
    var canAttachTreeNode = canAttachNode(instance)
    // tslint:disable-next-line:no_unused-variable
    var node = new Node(type, parent, subpath, environment, instance)
    if (!parent) node.identifierCache = new IdentifierCache()
    if (canAttachTreeNode) addHiddenFinalProp(instance, "$treenode", node)
    var sawException = true
    try {
        if (canAttachTreeNode) addReadOnlyProp(instance, "toJSON", toJSON)
        node._isRunningAction = true
        finalizeNewInstance(node, initialValue)
        node._isRunningAction = false
        if (parent) parent.root.identifierCache.addNodeToCache(node)
        else node.identifierCache.addNodeToCache(node)
        node.fireHook("afterCreate")
        if (parent) node.fireHook("afterAttach")
        sawException = false
        return node
    } finally {
        if (sawException) {
            // short-cut to die the instance, to avoid the snapshot computed starting to throw...
            node._isAlive = false
        }
    }
}
import { escapeJsonPath, splitJsonPath, joinJsonPath, stripPatch } from "./json-patch"
import { walk } from "./mst-operations"
import { createActionInvoker } from "./action"
import {
    addReadOnlyProp,
    addHiddenFinalProp,
    extend,
    fail,
    registerEventHandler,
    identity,
    noop,
    freeze
} from "../utils"
import { IdentifierCache } from "./identifier-cache"
//# sourceMappingURL=node.js.map
