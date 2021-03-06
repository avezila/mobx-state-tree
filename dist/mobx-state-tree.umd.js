!(function(t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? e(exports, require("mobx"))
        : "function" == typeof define && define.amd
          ? define(["exports", "mobx"], e)
          : e((t.mobxStateTree = t.mobxStateTree || {}), t.mobx)
})(this, function(t, e) {
    "use strict"
    function n(t, e) {
        function n() {
            this.constructor = t
        }
        Ot(
            t,
            e
        ), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()))
    }
    function r(t, e, n, r) {
        var i,
            o = arguments.length,
            a = o < 3 ? e : null === r ? (r = Object.getOwnPropertyDescriptor(e, n)) : r
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            a = Reflect.decorate(t, e, n, r)
        else
            for (var s = t.length - 1; s >= 0; s--)
                (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a)
        return o > 3 && a && Object.defineProperty(e, n, a), a
    }
    function i(t) {
        throw (void 0 === t && (t = "Illegal state"), new Error("[mobx-state-tree] " + t))
    }
    function o(t) {
        return t
    }
    function a() {}
    function s(t) {
        return !(!Array.isArray(t) && !e.isObservableArray(t))
    }
    function u(t) {
        return t ? (s(t) ? t : [t]) : _t
    }
    function p(t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
        for (var r = 0; r < e.length; r++) {
            var i = e[r]
            for (var o in i) t[o] = i[o]
        }
        return t
    }
    function c(t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
        for (var r = 0; r < e.length; r++) {
            var i = e[r]
            for (var o in i) {
                var a = Object.getOwnPropertyDescriptor(i, o)
                "get" in a
                    ? Object.defineProperty(t, o, xt({}, a, { configurable: !0 }))
                    : (t[o] = i[o])
            }
        }
        return t
    }
    function l(t) {
        if (null === t || "object" != typeof t) return !1
        var e = Object.getPrototypeOf(t)
        return e === Object.prototype || null === e
    }
    function h(t) {
        return !(null === t || "object" != typeof t || t instanceof Date || t instanceof RegExp)
    }
    function f(t) {
        return (
            null === t ||
            void 0 === t ||
            ("string" == typeof t ||
                "number" == typeof t ||
                "boolean" == typeof t ||
                t instanceof Date)
        )
    }
    function d(t) {
        var e = t.constructor
        return !!e && ("GeneratorFunction" === e.name || "GeneratorFunction" === e.displayName)
    }
    function y(t) {
        return f(t) ? t : Object.freeze(t)
    }
    function v(t) {
        return y(t), l(t) &&
            Object.keys(t).forEach(function(e) {
                f(t[e]) || Object.isFrozen(t[e]) || v(t[e])
            }), t
    }
    function b(t) {
        return "function" != typeof t
    }
    function g(t, e, n) {
        Object.defineProperty(t, e, { enumerable: !1, writable: !1, configurable: !0, value: n })
    }
    function m(t, e, n) {
        Object.defineProperty(t, e, { enumerable: !0, writable: !1, configurable: !0, value: n })
    }
    function w(t, e) {
        return t.push(e), function() {
            var n = t.indexOf(e)
            ;-1 !== n && t.splice(n, 1)
        }
    }
    function V(t, e) {
        return Nt.call(t, e)
    }
    function P(t) {
        for (var e = new Array(t.length), n = 0; n < t.length; n++) e[n] = t[n]
        return e
    }
    function A(t) {
        switch ((
            "oldValue" in t || i("Patches without `oldValue` field cannot be inversed"),
            t.op
        )) {
            case "add":
                return { op: "remove", path: t.path, oldValue: t.value }
            case "remove":
                return { op: "add", path: t.path, value: t.oldValue }
            case "replace":
                return { op: "replace", path: t.path, value: t.oldValue, oldValue: t.value }
        }
    }
    function j(t) {
        var e = xt({}, t)
        return delete e.oldValue, e
    }
    function C(t) {
        return t.replace(/~/g, "~1").replace(/\//g, "~0")
    }
    function S(t) {
        return t.replace(/~0/g, "\\").replace(/~1/g, "~")
    }
    function T(t) {
        return 0 === t.length ? "" : "/" + t.map(C).join("/")
    }
    function O(t) {
        var e = t.split("/").map(S)
        return "" === e[0] ? e.slice(1) : e
    }
    function x(t) {
        for (var e = t.middlewares.slice(), n = t; n.parent; )
            (n = n.parent), (e = e.concat(n.middlewares))
        return e
    }
    function _(t, e, n) {
        function r(t) {
            var o = i.shift()
            return o ? o(t, r) : n.apply(e.object, e.args)
        }
        var i = x(t)
        return i.length ? r(e) : n.apply(e.object, e.args)
    }
    function N(t, n, r, i) {
        void 0 === r && (r = "none"), void 0 === i && (i = 0)
        var o = e.action(t, n)
        return function() {
            var e = et(this)
            if ((e.assertAlive(), e.isRunningAction())) return o.apply(this, arguments)
            var n = {
                    name: t,
                    object: e.storedValue,
                    args: P(arguments),
                    asyncId: i,
                    asyncMode: r
                },
                a = e.root
            a._isRunningAction = !0
            try {
                return _(e, n, o)
            } finally {
                a._isRunningAction = !1
            }
        }
    }
    function I(t, n, r, i) {
        if (f(i)) return i
        if (tt(i)) {
            var o = et(i)
            if (t.root !== o.root)
                throw new Error(
                    "Argument " +
                        r +
                        " that was passed to action '" +
                        n +
                        "' is a model that is not part of the same state tree. Consider passing a snapshot or some representative ID instead"
                )
            return { $ref: t.getRelativePathTo(et(i)) }
        }
        if ("function" == typeof i)
            throw new Error(
                "Argument " +
                    r +
                    " that was passed to action '" +
                    n +
                    "' should be a primitive, model object or plain object, received a function"
            )
        if ("object" == typeof i && !l(i) && !s(i))
            throw new Error(
                "Argument " +
                    r +
                    " that was passed to action '" +
                    n +
                    "' should be a primitive, model object or plain object, received a " +
                    (i && i.constructor ? i.constructor.name : "Complex Object")
            )
        if (e.isObservable(i))
            throw new Error(
                "Argument " +
                    r +
                    " that was passed to action '" +
                    n +
                    "' should be a primitive, model object or plain object, received an mobx observable."
            )
        try {
            return JSON.stringify(i), i
        } catch (t) {
            throw new Error(
                "Argument " + r + " that was passed to action '" + n + "' is not serializable."
            )
        }
    }
    function z(t, e) {
        if ("object" == typeof e) {
            var n = Object.keys(e)
            if (1 === n.length && "$ref" === n[0]) return Q(t.storedValue, e.$ref)
        }
        return e
    }
    function D(t, e) {
        var n = X(t, e.path || "")
        if (!n) return i("Invalid action path: " + (e.path || ""))
        var r = et(n)
        return "@APPLY_PATCHES" === e.name
            ? $.call(null, n, e.args[0])
            : "@APPLY_SNAPSHOT" === e.name
              ? G.call(null, n, e.args[0])
              : (
                    "function" != typeof n[e.name] &&
                        i("Action '" + e.name + "' does not exist in '" + r.path + "'"),
                    n[e.name].apply(
                        n,
                        e.args
                            ? e.args.map(function(t) {
                                  return z(r, t)
                              })
                            : []
                    )
                )
    }
    function E(t, e) {
        return K(t) ||
            console.warn(
                "[mobx-state-tree] Warning: Attaching onAction listeners to non root nodes is dangerous: No events will be emitted for actions initiated higher up in the tree."
            ), Y(t) || console.warn("[mobx-state-tree] Warning: Attaching onAction listeners to non protected nodes is dangerous: No events will be emitted for direct modifications without action."), U(t, function(n, r) {
            var i = et(n.object)
            return ("none" !== n.asyncMode && "invoke" !== n.asyncMode) ||
                e({
                    name: n.name,
                    path: et(t).getRelativePathTo(i),
                    args: n.args.map(function(t, e) {
                        return I(i, n.name, e, t)
                    })
                }), r(n)
        })
    }
    function R(t) {
        return "object" == typeof t && t && !0 === t.isType
    }
    function k(t) {
        return R(t) && (t.flags & (Tt.String | Tt.Number | Tt.Boolean | Tt.Date)) > 0
    }
    function F(t) {
        return R(t) && (t.flags & Tt.Object) > 0
    }
    function M(t) {
        return (t.flags & Tt.Reference) > 0
    }
    function L(t) {
        return et(t).type
    }
    function U(t, e) {
        var n = et(t)
        return n.isProtectionEnabled ||
            console.warn(
                "It is recommended to protect the state tree before attaching action middleware, as otherwise it cannot be guaranteed that all changes are passed through middleware. See `protect`"
            ), n.addMiddleWare(e)
    }
    function H(t, e, n) {
        return void 0 === n && (n = !1), et(t).onPatch(e, n)
    }
    function W(t, e) {
        return et(t).onSnapshot(e)
    }
    function $(t, e) {
        et(t).applyPatches(u(e))
    }
    function J(t, e) {
        var n = u(e).map(A)
        n.reverse(), et(t).applyPatches(n)
    }
    function B(t, n) {
        e.runInAction(function() {
            u(n).forEach(function(e) {
                return D(t, e)
            })
        })
    }
    function Y(t) {
        return et(t).isProtected
    }
    function G(t, e) {
        return et(t).applySnapshot(e)
    }
    function q(t) {
        return et(t).snapshot
    }
    function K(t) {
        return et(t).isRoot
    }
    function Q(t, e) {
        var n = et(t).resolve(e)
        return n ? n.value : void 0
    }
    function X(t, e) {
        var n = et(t).resolve(e, !1)
        if (void 0 !== n) return n ? n.value : void 0
    }
    function Z(t, e) {
        var n = et(t)
        n.getChildren().forEach(function(t) {
            tt(t.storedValue) && Z(t.storedValue, e)
        }), e(n.storedValue)
    }
    function tt(t) {
        return !(!t || !t.$treenode)
    }
    function et(t) {
        return tt(t) ? t.$treenode : i("Value " + t + " is no MST Node")
    }
    function nt(t) {
        return t && "object" == typeof t && !(t instanceof Date) && !tt(t) && !Object.isFrozen(t)
    }
    function rt() {
        return et(this).snapshot
    }
    function it(t, e, n, r, s, u, p) {
        if ((void 0 === u && (u = o), void 0 === p && (p = a), tt(s))) {
            var c = et(s)
            return c.isRoot ||
                i(
                    "Cannot add an object to a state tree if it is already part of the same or another state tree. Tried to assign an object to '" +
                        (e ? e.path : "") +
                        "/" +
                        n +
                        "', but it lives already at '" +
                        c.path +
                        "'"
                ), c.setParent(e, n), c
        }
        var l = u(s),
            h = nt(l),
            f = new Dt(t, e, n, r, l)
        e || (f.identifierCache = new It()), h && g(l, "$treenode", f)
        var d = !0
        try {
            return h &&
                m(
                    l,
                    "toJSON",
                    rt
                ), (f._isRunningAction = !0), p(f, s), (f._isRunningAction = !1), e ? e.root.identifierCache.addNodeToCache(f) : f.identifierCache.addNodeToCache(f), f.fireHook("afterCreate"), e && f.fireHook("afterAttach"), (d = !1), f
        } finally {
            d && (f._isAlive = !1)
        }
    }
    function ot(t, e) {
        var n = ++Et
        return function() {
            function r(e, r, i) {
                N(t, e, r, n).call(o, i)
            }
            var o = this,
                a = arguments
            return new Promise(function(s, u) {
                function p(t) {
                    var e
                    try {
                        r(
                            function(t) {
                                e = h.next(t)
                            },
                            "yield",
                            t
                        )
                    } catch (t) {
                        return void setImmediate(function() {
                            r(
                                function(e) {
                                    u(t)
                                },
                                "throw",
                                t
                            )
                        })
                    }
                    l(e)
                }
                function c(t) {
                    var e
                    try {
                        r(
                            function(t) {
                                e = h.throw(t)
                            },
                            "yieldError",
                            t
                        )
                    } catch (t) {
                        return void setImmediate(function() {
                            r(
                                function(e) {
                                    u(t)
                                },
                                "throw",
                                t
                            )
                        })
                    }
                    l(e)
                }
                function l(t) {
                    if (!t.done)
                        return (t.value && "function" == typeof t.value.then) ||
                            i("Only promises can be yielded to `async`, got: " + t), t.value.then(
                            p,
                            c
                        )
                    setImmediate(function() {
                        r(
                            function(t) {
                                s(t)
                            },
                            "return",
                            t.value
                        )
                    })
                }
                var h
                N(
                    t,
                    function() {
                        ;(h = e.apply(this, arguments)), p(void 0)
                    },
                    "invoke",
                    n
                ).apply(o, a)
            })
        }
    }
    function at(t) {
        return "function" == typeof t
            ? "<function" + (t.name ? " " + t.name : "") + ">"
            : tt(t) ? "<" + t + ">" : "`" + JSON.stringify(t) + "`"
    }
    function st(t) {
        var e = t.value,
            n = t.context[t.context.length - 1].type,
            r = t.context
                .map(function(t) {
                    return t.path
                })
                .filter(function(t) {
                    return t.length > 0
                })
                .join("/"),
            i = r.length > 0 ? 'at path "/' + r + '" ' : "",
            o = tt(e) ? "value of type " + et(e).type.name + ":" : f(e) ? "value" : "snapshot",
            a = n && tt(e) && n.is(et(e).snapshot)
        return (
            "" +
            i +
            o +
            " " +
            at(e) +
            " is not assignable " +
            (n ? "to type: `" + n.name + "`" : "") +
            (t.message ? " (" + t.message + ")" : "") +
            (n
                ? k(n)
                  ? "."
                  : ", expected an instance of `" +
                    n.name +
                    "` or a snapshot like `" +
                    n.describe() +
                    "` instead." +
                    (a
                        ? " (Note that a snapshot of the provided value is compatible with the targeted type)"
                        : "")
                : ".")
        )
    }
    function ut(t, e, n) {
        return t.concat([{ path: e, type: n }])
    }
    function pt() {
        return _t
    }
    function ct(t, e, n) {
        return [{ context: t, value: e, message: n }]
    }
    function lt(t) {
        return t.reduce(function(t, e) {
            return t.concat(e)
        }, [])
    }
    function ht(t, e) {
        var n = t.validate(e, [{ path: "", type: t }])
        n.length > 0 &&
            i("Error while converting " + at(e) + " to `" + t.name + "`:\n" + n.map(st).join("\n"))
    }
    function ft() {
        return et(this) + "(" + this.size + " items)"
    }
    function dt(t) {
        t || i("Map.put cannot be used to set empty values")
        var e
        if (tt(t)) e = et(t)
        else {
            if (!h(t)) return i("Map.put can only be used to store complex values")
            e = et(et(this).type.subType.create(t))
        }
        return e.identifierAttribute ||
            i(
                "Map.put can only be used to store complex values that have an identifier type attribute"
            ), this.set(e.identifier, e.value), this
    }
    function yt() {
        return et(this) + "(" + this.length + " items)"
    }
    function vt(t, e, n, r, o) {
        function a(t) {
            for (var e in p) {
                var n = t[e]
                if (("string" == typeof n || "number" == typeof n) && p[e][n]) return p[e][n]
            }
            return null
        }
        var s = new Array(r.length),
            u = {},
            p = {}
        n.forEach(function(t) {
            t.identifierAttribute &&
                ((p[t.identifierAttribute] || (p[t.identifierAttribute] = {}))[
                    t.identifier
                ] = t), (u[t.nodeId] = t)
        }), r.forEach(function(n, r) {
            var p = "" + o[r]
            if (tt(n))
                (l = et(n)).assertAlive(), l.parent === t
                    ? (
                          u[l.nodeId] ||
                              i(
                                  "Cannot add an object to a state tree if it is already part of the same or another state tree. Tried to assign an object to '" +
                                      t.path +
                                      "/" +
                                      p +
                                      "', but it lives already at '" +
                                      l.path +
                                      "'"
                              ),
                          (u[l.nodeId] = void 0),
                          l.setParent(t, p),
                          (s[r] = l)
                      )
                    : (s[r] = e.instantiate(t, p, void 0, n))
            else if (h(n)) {
                var c = a(n)
                if (c) {
                    var l = e.reconcile(c, n)
                    ;(u[c.nodeId] = void 0), l.setParent(t, p), (s[r] = l)
                } else s[r] = e.instantiate(t, p, void 0, n)
            } else s[r] = e.instantiate(t, p, void 0, n)
        })
        for (var c in u) void 0 !== u[c] && u[c].die()
        return s
    }
    function bt(t) {
        switch (typeof t) {
            case "string":
                return Ut
            case "number":
                return Ht
            case "boolean":
                return Wt
            case "object":
                if (t instanceof Date) return Bt
        }
        return i("Cannot determine primtive type from value " + t)
    }
    function gt(t, e) {
        var n = "function" == typeof e ? e() : e
        return ht(t, tt(n) ? et(n).snapshot : n), new Gt(t, e)
    }
    function mt(t) {
        return f(t) || i("Literal types can be built only on top of primitives"), new Qt(t)
    }
    function wt(t, n) {
        return function() {
            var t = this,
                r = arguments
            return et(this).assertAlive(), e.extras.allowStateChanges(!1, function() {
                return n.apply(t, r)
            })
        }
    }
    function Vt() {
        return et(this).toString()
    }
    function Pt() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
        var n = "string" == typeof t[0] ? t.shift() : "AnonymousModel",
            r = t.shift() || i("types.model must specify properties"),
            o = (t.length > 1 && t.shift()) || {},
            a = t.shift() || {}
        return new ie(n, r, o, a)
    }
    function At() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
        var n = "string" == typeof t[0] ? t.shift() : "AnonymousModel"
        if (
            t.every(function(t) {
                return R(t)
            })
        )
            return t.reduce(function(t, e) {
                return At(n, t, e.properties, e.state, e.actions)
            })
        var r = t.shift(),
            o = t.shift() || i("types.compose must specify properties or `{}`"),
            a = (t.length > 1 && t.shift()) || {},
            s = t.shift() || {}
        return F(r)
            ? Pt(n, c({}, r.properties, o), c({}, r.state, a), c({}, r.actions, s))
            : i("Only model types can be composed")
    }
    function jt(t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
        var r = R(t) ? null : t,
            i = R(t) ? e.concat(t) : e,
            o = i
                .map(function(t) {
                    return t.name
                })
                .join(" | ")
        return new se(o, i, r)
    }
    function Ct(t) {
        var e = p({}, t)
        return delete e.type, { name: t.type, args: [e] }
    }
    function St(t, e, n) {
        function r(t) {
            var i = e.shift()
            i ? i(r)(t) : n(t)
        }
        r(t)
    }
    var Tt,
        Ot =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
                function(t, e) {
                    t.__proto__ = e
                }) ||
            function(t, e) {
                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
            },
        xt =
            Object.assign ||
            function(t) {
                for (var e, n = 1, r = arguments.length; n < r; n++) {
                    e = arguments[n]
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                }
                return t
            },
        _t = Object.freeze([]),
        Nt = Object.prototype.hasOwnProperty
    !(function(t) {
        ;(t[(t.String = 1)] =
            "String"), (t[(t.Number = 2)] = "Number"), (t[(t.Boolean = 4)] = "Boolean"), (t[(t.Date = 8)] = "Date"), (t[(t.Literal = 16)] = "Literal"), (t[(t.Array = 32)] = "Array"), (t[(t.Map = 64)] = "Map"), (t[(t.Object = 128)] = "Object"), (t[(t.Frozen = 256)] = "Frozen"), (t[(t.Optional = 512)] = "Optional"), (t[(t.Reference = 1024)] = "Reference"), (t[(t.Identifier = 2048)] = "Identifier"), (t[(t.Late = 4096)] = "Late"), (t[(t.Refinement = 8192)] = "Refinement"), (t[(t.Union = 16384)] = "Union"), (t[(t.Null = 32768)] = "Null"), (t[(t.Undefined = 65536)] = "Undefined")
    })(Tt || (Tt = {}))
    var It = (function() {
            function t() {
                this.cache = e.observable.map()
            }
            return (t.prototype.addNodeToCache = function(t) {
                if (t.identifierAttribute) {
                    var n = t.identifier
                    this.cache.has(n) || this.cache.set(n, e.observable.shallowArray())
                    var r = this.cache.get(n)
                    ;-1 !== r.indexOf(t) && i("Already registered"), r.push(t)
                }
                return this
            }), (t.prototype.mergeCache = function(t) {
                var e = this
                t.identifierCache.cache.values().forEach(function(t) {
                    return t.forEach(function(t) {
                        e.addNodeToCache(t)
                    })
                })
            }), (t.prototype.notifyDied = function(t) {
                if (t.identifierAttribute) {
                    var e = this.cache.get(t.identifier)
                    e && e.remove(t)
                }
            }), (t.prototype.splitCache = function(e) {
                var n = new t(),
                    r = e.path
                return this.cache.values().forEach(function(t) {
                    for (var e = t.length - 1; e >= 0; e--)
                        0 === t[e].path.indexOf(r) && (n.addNodeToCache(t[e]), t.splice(e, 1))
                }), n
            }), (t.prototype.resolve = function(t, e) {
                var n = this.cache.get(e)
                if (!n) return null
                var r = n.filter(function(e) {
                    return t.isAssignableFrom(e.type)
                })
                switch (r.length) {
                    case 0:
                        return null
                    case 1:
                        return r[0]
                    default:
                        return i(
                            "Cannot resolve a reference to type '" +
                                t.name +
                                "' with id: '" +
                                e +
                                "' unambigously, there are multiple candidates: " +
                                r
                                    .map(function(t) {
                                        return t.path
                                    })
                                    .join(", ")
                        )
                }
            }), t
        })(),
        zt = 1,
        Dt = (function() {
            function t(t, n, r, i, o) {
                var a = this
                ;(this.nodeId = ++zt), (this._parent = null), (this.subpath =
                    ""), (this.isProtectionEnabled = !0), (this.identifierAttribute = void 0), (this._environment = void 0), (this._isRunningAction = !1), (this._autoUnbox = !0), (this._isAlive = !0), (this._isDetaching = !1), (this.middlewares = []), (this.snapshotSubscribers = []), (this.patchSubscribers = []), (this.disposers = []), (this.type = t), (this._parent = n), (this.subpath = r), (this.storedValue = o), (this._environment = i), (this.unbox = this.unbox.bind(
                    this
                )), (this.applyPatches = N("@APPLY_PATCHES", function(t) {
                    t.forEach(function(t) {
                        var e = O(t.path)
                        a.resolvePath(e.slice(0, -1)).applyPatchLocally(e[e.length - 1], t)
                    })
                }).bind(this.storedValue)), (this.applySnapshot = N("@APPLY_SNAPSHOT", function(t) {
                    if (t !== a.snapshot) return a.type.applySnapshot(a, t)
                }).bind(this.storedValue))
                var s = e.reaction(
                    function() {
                        return a.snapshot
                    },
                    function(t) {
                        a.emitSnapshot(t)
                    }
                )
                s.onError(function(t) {
                    throw t
                }), this.addDisposer(s)
            }
            return Object.defineProperty(t.prototype, "identifier", {
                get: function() {
                    return this.identifierAttribute
                        ? this.storedValue[this.identifierAttribute]
                        : null
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "path", {
                get: function() {
                    return this.parent ? this.parent.path + "/" + C(this.subpath) : ""
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "isRoot", {
                get: function() {
                    return null === this.parent
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "parent", {
                get: function() {
                    return this._parent
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "root", {
                get: function() {
                    for (var t, e = this; (t = e.parent); ) e = t
                    return e
                },
                enumerable: !0,
                configurable: !0
            }), (t.prototype.getRelativePathTo = function(t) {
                this.root !== t.root &&
                    i(
                        "Cannot calculate relative path: objects '" +
                            this +
                            "' and '" +
                            t +
                            "' are not part of the same object tree"
                    )
                for (
                    var e = O(this.path), n = O(t.path), r = 0;
                    r < e.length && e[r] === n[r];
                    r++
                );
                return (
                    e
                        .slice(r)
                        .map(function(t) {
                            return ".."
                        })
                        .join("/") + T(n.slice(r))
                )
            }), (t.prototype.resolve = function(t, e) {
                return void 0 === e && (e = !0), this.resolvePath(O(t), e)
            }), (t.prototype.resolvePath = function(t, e) {
                void 0 === e && (e = !0)
                for (var n = this, r = 0; r < t.length; r++) {
                    if ("" === t[r]) n = n.root
                    else if (".." === t[r]) n = n.parent
                    else {
                        if ("." === t[r] || "" === t[r]) continue
                        if (n) {
                            n = n.getChildNode(t[r])
                            continue
                        }
                    }
                    if (!n)
                        return e
                            ? i(
                                  "Could not resolve '" +
                                      t[r] +
                                      "' in '" +
                                      T(t.slice(0, r - 1)) +
                                      "', path of the patch does not resolve"
                              )
                            : void 0
                }
                return n
            }), Object.defineProperty(t.prototype, "value", {
                get: function() {
                    if (this._isAlive) return this.type.getValue(this)
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "isAlive", {
                get: function() {
                    return this._isAlive
                },
                enumerable: !0,
                configurable: !0
            }), (t.prototype.die = function() {
                this._isDetaching ||
                    (tt(this.storedValue) &&
                        (
                            Z(this.storedValue, function(t) {
                                return et(t).aboutToDie()
                            }),
                            Z(this.storedValue, function(t) {
                                return et(t).finalizeDeath()
                            })
                        ))
            }), (t.prototype.aboutToDie = function() {
                this.disposers.splice(0).forEach(function(t) {
                    return t()
                }), this.fireHook("beforeDestroy")
            }), (t.prototype.finalizeDeath = function() {
                this.root.identifierCache.notifyDied(this)
                var t = this,
                    e = this.path
                m(this, "snapshot", this.snapshot), this.patchSubscribers.splice(
                    0
                ), this.snapshotSubscribers.splice(0), this.patchSubscribers.splice(
                    0
                ), (this._isAlive = !1), (this._parent = null), (this.subpath =
                    ""), Object.defineProperty(this.storedValue, "$mobx", {
                    get: function() {
                        i(
                            "This object has died and is no longer part of a state tree. It cannot be used anymore. The object (of type '" +
                                t.type.name +
                                "') used to live at '" +
                                e +
                                "'. It is possible to access the last snapshot of this object using 'getSnapshot', or to create a fresh copy using 'clone'. If you want to remove an object from the tree without killing it, use 'detach' instead."
                        )
                    }
                })
            }), (t.prototype.assertAlive = function() {
                this._isAlive ||
                    i(
                        this +
                            " cannot be used anymore as it has died; it has been removed from a state tree. If you want to remove an element from a tree and let it live on, use 'detach' or 'clone' the value"
                    )
            }), Object.defineProperty(t.prototype, "snapshot", {
                get: function() {
                    if (this._isAlive) return y(this.type.getSnapshot(this))
                },
                enumerable: !0,
                configurable: !0
            }), (t.prototype.onSnapshot = function(t) {
                return w(this.snapshotSubscribers, t)
            }), (t.prototype.emitSnapshot = function(t) {
                this.snapshotSubscribers.forEach(function(e) {
                    return e(t)
                })
            }), (t.prototype.applyPatchLocally = function(t, e) {
                this.assertWritable(), this.type.applyPatchLocally(this, t, e)
            }), (t.prototype.onPatch = function(t, e) {
                return w(
                    this.patchSubscribers,
                    e
                        ? t
                        : function(e) {
                              return t(j(e))
                          }
                )
            }), (t.prototype.emitPatch = function(t, e) {
                if (this.patchSubscribers.length) {
                    var n = p({}, t, { path: e.path.substr(this.path.length) + "/" + t.path })
                    this.patchSubscribers.forEach(function(t) {
                        return t(n)
                    })
                }
                this.parent && this.parent.emitPatch(t, e)
            }), (t.prototype.setParent = function(t, e) {
                void 0 === e && (e = null), (this.parent === t && this.subpath === e) ||
                    (
                        this._parent &&
                            t &&
                            t !== this._parent &&
                            i(
                                "A node cannot exists twice in the state tree. Failed to add " +
                                    this +
                                    " to path '" +
                                    t.path +
                                    "/" +
                                    e +
                                    "'."
                            ),
                        !this._parent &&
                            t &&
                            t.root === this &&
                            i(
                                "A state tree is not allowed to contain itself. Cannot assign " +
                                    this +
                                    " to path '" +
                                    t.path +
                                    "/" +
                                    e +
                                    "'"
                            ),
                        !this._parent &&
                            this._environment &&
                            i(
                                "A state tree that has been initialized with an environment cannot be made part of another state tree."
                            ),
                        this.parent && !t
                            ? this.die()
                            : (
                                  (this.subpath = e || ""),
                                  t &&
                                      t !== this._parent &&
                                      (
                                          t.root.identifierCache.mergeCache(this),
                                          (this._parent = t),
                                          this.fireHook("afterAttach")
                                      )
                              )
                    )
            }), (t.prototype.addDisposer = function(t) {
                this.disposers.unshift(t)
            }), (t.prototype.isRunningAction = function() {
                return !!this._isRunningAction || (!this.isRoot && this.parent.isRunningAction())
            }), (t.prototype.addMiddleWare = function(t) {
                return w(this.middlewares, t)
            }), (t.prototype.getChildNode = function(t) {
                this.assertAlive(), (this._autoUnbox = !1)
                var e = this.type.getChildNode(this, t)
                return (this._autoUnbox = !0), e
            }), (t.prototype.getChildren = function() {
                this.assertAlive(), (this._autoUnbox = !1)
                var t = this.type.getChildren(this)
                return (this._autoUnbox = !0), t
            }), (t.prototype.getChildType = function(t) {
                return this.type.getChildType(t)
            }), Object.defineProperty(t.prototype, "isProtected", {
                get: function() {
                    return this.root.isProtectionEnabled
                },
                enumerable: !0,
                configurable: !0
            }), (t.prototype.assertWritable = function() {
                this.assertAlive(), !this.isRunningAction() &&
                    this.isProtected &&
                    i(
                        "Cannot modify '" +
                            this +
                            "', the object is protected and can only be modified by using an action."
                    )
            }), (t.prototype.removeChild = function(t) {
                this.type.removeChild(this, t)
            }), (t.prototype.detach = function() {
                this._isAlive || i("Error while detaching, node is not alive."), this.isRoot ||
                    (
                        this.fireHook("beforeDetach"),
                        (this._environment = this.root._environment),
                        (this._isDetaching = !0),
                        (this.identifierCache = this.root.identifierCache.splitCache(this)),
                        this.parent.removeChild(this.subpath),
                        (this._parent = null),
                        (this.subpath = ""),
                        (this._isDetaching = !1)
                    )
            }), (t.prototype.unbox = function(t) {
                return t && !0 === this._autoUnbox ? t.value : t
            }), (t.prototype.fireHook = function(t) {
                var e =
                    this.storedValue && "object" == typeof this.storedValue && this.storedValue[t]
                "function" == typeof e && e.apply(this.storedValue)
            }), (t.prototype.toString = function() {
                var t = this.identifier ? "(id: " + this.identifier + ")" : ""
                return (
                    this.type.name +
                    "@" +
                    (this.path || "<root>") +
                    t +
                    (this.isAlive ? "" : "[dead]")
                )
            }), r([e.observable], t.prototype, "_parent", void 0), r(
                [e.observable],
                t.prototype,
                "subpath",
                void 0
            ), r([e.computed], t.prototype, "path", null), r(
                [e.computed],
                t.prototype,
                "value",
                null
            ), r([e.computed], t.prototype, "snapshot", null), t
        })(),
        Et = 0,
        Rt = (function() {
            function t(t) {
                ;(this.isType = !0), (this.name = t)
            }
            return (t.prototype.create = function(t, e) {
                return void 0 === t && (t = this.getDefaultSnapshot()), ht(
                    this,
                    t
                ), this.instantiate(null, "", e, t).value
            }), (t.prototype.isAssignableFrom = function(t) {
                return t === this
            }), (t.prototype.validate = function(t, e) {
                return tt(t)
                    ? L(t) === this || this.isAssignableFrom(L(t)) ? pt() : ct(e, t)
                    : this.isValidSnapshot(t, e)
            }), (t.prototype.is = function(t) {
                return 0 === this.validate(t, [{ path: "", type: this }]).length
            }), (t.prototype.reconcile = function(t, e) {
                if (t.snapshot === e) return t
                if (tt(e) && et(e) === t) return t
                if (
                    t.type === this &&
                    h(e) &&
                    !tt(e) &&
                    (!t.identifierAttribute || t.identifier === e[t.identifierAttribute])
                )
                    return t.applySnapshot(e), t
                var n = t.parent,
                    r = t.subpath
                if ((t.die(), tt(e) && this.isAssignableFrom(L(e)))) {
                    var i = et(e)
                    return i.setParent(n, r), i
                }
                return this.instantiate(n, r, t._environment, e)
            }), Object.defineProperty(t.prototype, "Type", {
                get: function() {
                    return i(
                        "Factory.Type should not be actually called. It is just a Type signature that can be used at compile time with Typescript, by using `typeof type.Type`"
                    )
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "SnapshotType", {
                get: function() {
                    return i(
                        "Factory.SnapshotType should not be actually called. It is just a Type signature that can be used at compile time with Typescript, by using `typeof type.SnapshotType`"
                    )
                },
                enumerable: !0,
                configurable: !0
            }), r([e.action], t.prototype, "create", null), t
        })(),
        kt = (function(t) {
            function e(e) {
                return t.call(this, e) || this
            }
            return n(e, t), (e.prototype.getValue = function(t) {
                return t.storedValue
            }), (e.prototype.getSnapshot = function(t) {
                return t.storedValue
            }), (e.prototype.getDefaultSnapshot = function() {}), (e.prototype.applySnapshot = function(
                t,
                e
            ) {
                i("Immutable types do not support applying snapshots")
            }), (e.prototype.applyPatchLocally = function(t, e, n) {
                i("Immutable types do not support applying patches")
            }), (e.prototype.getChildren = function(t) {
                return _t
            }), (e.prototype.getChildNode = function(t, e) {
                return i("No child '" + e + "' available in type: " + this.name)
            }), (e.prototype.getChildType = function(t) {
                return i("No child '" + t + "' available in type: " + this.name)
            }), (e.prototype.reconcile = function(t, e) {
                if (t.type === this && t.storedValue === e) return t
                var n = this.instantiate(t.parent, t.subpath, t._environment, e)
                return t.die(), n
            }), (e.prototype.removeChild = function(t, e) {
                return i("No child '" + e + "' available in type: " + this.name)
            }), e
        })(Rt),
        Ft = (function(t) {
            function o(n, r) {
                var i = t.call(this, n) || this
                return (i.shouldAttachNode = !0), (i.flags =
                    Tt.Map), (i.createNewInstance = function() {
                    var t = e.observable.shallowMap()
                    return g(t, "put", dt), g(t, "toString", ft), t
                }), (i.finalizeNewInstance = function(t, n) {
                    var r = t.storedValue
                    e.extras.interceptReads(r, t.unbox), e.intercept(r, function(t) {
                        return i.willChange(t)
                    }), t.applySnapshot(n), e.observe(r, i.didChange)
                }), (i.subType = r), i
            }
            return n(o, t), (o.prototype.instantiate = function(t, e, n, r) {
                return it(this, t, e, n, r, this.createNewInstance, this.finalizeNewInstance)
            }), (o.prototype.describe = function() {
                return "Map<string, " + this.subType.describe() + ">"
            }), (o.prototype.getChildren = function(t) {
                return t.storedValue.values()
            }), (o.prototype.getChildNode = function(t, e) {
                var n = t.storedValue.get(e)
                return n || i("Not a child " + e), n
            }), (o.prototype.willChange = function(t) {
                var e = et(t.object)
                switch ((e.assertWritable(), t.type)) {
                    case "update":
                        var n = t.newValue
                        if (n === t.object.get(t.name)) return null
                        ht(this.subType, n), (t.newValue = this.subType.reconcile(
                            e.getChildNode(t.name),
                            t.newValue
                        )), this.verifyIdentifier(t.name, t.newValue)
                        break
                    case "add":
                        ht(this.subType, t.newValue), (t.newValue = this.subType.instantiate(
                            e,
                            t.name,
                            void 0,
                            t.newValue
                        )), this.verifyIdentifier(t.name, t.newValue)
                        break
                    case "delete":
                        e.storedValue.has(t.name) && e.getChildNode(t.name).die()
                }
                return t
            }), (o.prototype.verifyIdentifier = function(t, e) {
                var n = e.identifier
                null !== n &&
                    "" + n != "" + t &&
                    i(
                        "A map of objects containing an identifier should always store the object under their own identifier. Trying to store key '" +
                            n +
                            "', but expected: '" +
                            t +
                            "'"
                    )
            }), (o.prototype.getValue = function(t) {
                return t.storedValue
            }), (o.prototype.getSnapshot = function(t) {
                var e = {}
                return t.getChildren().forEach(function(t) {
                    e[t.subpath] = t.snapshot
                }), e
            }), (o.prototype.didChange = function(t) {
                var e = et(t.object)
                switch (t.type) {
                    case "update":
                        return void e.emitPatch(
                            {
                                op: "replace",
                                path: C(t.name),
                                value: t.newValue.snapshot,
                                oldValue: t.oldValue ? t.oldValue.snapshot : void 0
                            },
                            e
                        )
                    case "add":
                        return void e.emitPatch(
                            {
                                op: "add",
                                path: C(t.name),
                                value: t.newValue.snapshot,
                                oldValue: void 0
                            },
                            e
                        )
                    case "delete":
                        return void e.emitPatch(
                            { op: "remove", path: C(t.name), oldValue: t.oldValue.snapshot },
                            e
                        )
                }
            }), (o.prototype.applyPatchLocally = function(t, e, n) {
                var r = t.storedValue
                switch (n.op) {
                    case "add":
                    case "replace":
                        r.set(e, n.value)
                        break
                    case "remove":
                        r.delete(e)
                }
            }), (o.prototype.applySnapshot = function(t, e) {
                ht(this, e)
                var n = t.storedValue,
                    r = {}
                n.keys().forEach(function(t) {
                    r[t] = !1
                }), Object.keys(e).forEach(function(t) {
                    n.set(t, e[t]), (r[t] = !0)
                }), Object.keys(r).forEach(function(t) {
                    !1 === r[t] && n.delete(t)
                })
            }), (o.prototype.getChildType = function(t) {
                return this.subType
            }), (o.prototype.isValidSnapshot = function(t, e) {
                var n = this
                return l(t)
                    ? lt(
                          Object.keys(t).map(function(r) {
                              return n.subType.validate(t[r], ut(e, r, n.subType))
                          })
                      )
                    : ct(e, t)
            }), (o.prototype.getDefaultSnapshot = function() {
                return {}
            }), (o.prototype.removeChild = function(t, e) {
                t.storedValue.delete(e)
            }), r([e.action], o.prototype, "applySnapshot", null), o
        })(Rt),
        Mt = (function(t) {
            function o(n, r) {
                var i = t.call(this, n) || this
                return (i.shouldAttachNode = !0), (i.flags =
                    Tt.Array), (i.createNewInstance = function() {
                    var t = e.observable.shallowArray()
                    return g(t, "toString", yt), t
                }), (i.finalizeNewInstance = function(t, n) {
                    var r = t.storedValue
                    ;(e.extras.getAdministration(r).dehancer = t.unbox), e.intercept(r, function(
                        t
                    ) {
                        return i.willChange(t)
                    }), t.applySnapshot(n), e.observe(r, i.didChange)
                }), (i.subType = r), i
            }
            return n(o, t), (o.prototype.describe = function() {
                return this.subType.describe() + "[]"
            }), (o.prototype.instantiate = function(t, e, n, r) {
                return it(this, t, e, n, r, this.createNewInstance, this.finalizeNewInstance)
            }), (o.prototype.getChildren = function(t) {
                return t.storedValue.peek()
            }), (o.prototype.getChildNode = function(t, e) {
                var n = parseInt(e, 10)
                return n < t.storedValue.length ? t.storedValue[n] : i("Not a child: " + e)
            }), (o.prototype.willChange = function(t) {
                var e = et(t.object)
                e.assertWritable()
                var n = e.getChildren()
                switch (t.type) {
                    case "update":
                        if (t.newValue === t.object[t.index]) return null
                        t.newValue = vt(e, this.subType, [n[t.index]], [t.newValue], [t.index])[0]
                        break
                    case "splice":
                        var r = t.index,
                            i = t.removedCount,
                            o = t.added
                        t.added = vt(
                            e,
                            this.subType,
                            n.slice(r, r + i),
                            o,
                            o.map(function(t, e) {
                                return r + e
                            })
                        )
                        for (var a = r + i; a < n.length; a++)
                            n[a].setParent(e, "" + (a + o.length - i))
                }
                return t
            }), (o.prototype.getValue = function(t) {
                return t.storedValue
            }), (o.prototype.getSnapshot = function(t) {
                return t.getChildren().map(function(t) {
                    return t.snapshot
                })
            }), (o.prototype.didChange = function(t) {
                var e = et(t.object)
                switch (t.type) {
                    case "update":
                        return void e.emitPatch(
                            {
                                op: "replace",
                                path: "" + t.index,
                                value: t.newValue.snapshot,
                                oldValue: t.oldValue ? t.oldValue.snapshot : void 0
                            },
                            e
                        )
                    case "splice":
                        for (n = t.removedCount - 1; n >= 0; n--)
                            e.emitPatch(
                                {
                                    op: "remove",
                                    path: "" + (t.index + n),
                                    oldValue: t.removed[n].snapshot
                                },
                                e
                            )
                        for (var n = 0; n < t.addedCount; n++)
                            e.emitPatch(
                                {
                                    op: "add",
                                    path: "" + (t.index + n),
                                    value: e.getChildNode("" + (t.index + n)).snapshot,
                                    oldValue: void 0
                                },
                                e
                            )
                        return
                }
            }), (o.prototype.applyPatchLocally = function(t, e, n) {
                var r = t.storedValue,
                    i = "-" === e ? r.length : parseInt(e)
                switch (n.op) {
                    case "replace":
                        r[i] = n.value
                        break
                    case "add":
                        r.splice(i, 0, n.value)
                        break
                    case "remove":
                        r.splice(i, 1)
                }
            }), (o.prototype.applySnapshot = function(t, e) {
                ht(this, e), t.storedValue.replace(e)
            }), (o.prototype.getChildType = function(t) {
                return this.subType
            }), (o.prototype.isValidSnapshot = function(t, e) {
                var n = this
                return s(t)
                    ? lt(
                          t.map(function(t, r) {
                              return n.subType.validate(t, ut(e, "" + r, n.subType))
                          })
                      )
                    : ct(e, t)
            }), (o.prototype.getDefaultSnapshot = function() {
                return []
            }), (o.prototype.removeChild = function(t, e) {
                t.storedValue.splice(parseInt(e, 10), 1)
            }), r([e.action], o.prototype, "applySnapshot", null), o
        })(Rt),
        Lt = (function(t) {
            function e(e, n, r, i) {
                void 0 === i && (i = o)
                var a = t.call(this, e) || this
                return (a.flags = n), (a.checker = r), (a.initializer = i), a
            }
            return n(e, t), (e.prototype.describe = function() {
                return this.name
            }), (e.prototype.instantiate = function(t, e, n, r) {
                return it(this, t, e, n, r, this.initializer)
            }), (e.prototype.isValidSnapshot = function(t, e) {
                return f(t) && this.checker(t) ? pt() : ct(e, t)
            }), e
        })(kt),
        Ut = new Lt("string", Tt.String, function(t) {
            return "string" == typeof t
        }),
        Ht = new Lt("number", Tt.Number, function(t) {
            return "number" == typeof t
        }),
        Wt = new Lt("boolean", Tt.Boolean, function(t) {
            return "boolean" == typeof t
        }),
        $t = new Lt("null", Tt.Null, function(t) {
            return null === t
        }),
        Jt = new Lt("undefined", Tt.Undefined, function(t) {
            return void 0 === t
        }),
        Bt = new Lt(
            "Date",
            Tt.Date,
            function(t) {
                return "number" == typeof t || t instanceof Date
            },
            function(t) {
                return t instanceof Date ? t : new Date(t)
            }
        )
    Bt.getSnapshot = function(t) {
        return t.storedValue.getTime()
    }
    var Yt = (function(t) {
            function e(e) {
                var n = t.call(this, "identifier(" + e.name + ")") || this
                return (n.identifierType = e), (n.flags = Tt.Identifier), n
            }
            return n(e, t), (e.prototype.instantiate = function(t, e, n, r) {
                return t && tt(t.storedValue)
                    ? (
                          t.identifierAttribute &&
                              i(
                                  "Cannot define property '" +
                                      e +
                                      "' as object identifier, property '" +
                                      t.identifierAttribute +
                                      "' is already defined as identifier property"
                              ),
                          (t.identifierAttribute = e),
                          it(this, t, e, n, r)
                      )
                    : i("Identifier types can only be instantiated as direct child of a model type")
            }), (e.prototype.reconcile = function(t, e) {
                return t.storedValue !== e
                    ? i(
                          "Tried to change identifier from '" +
                              t.storedValue +
                              "' to '" +
                              e +
                              "'. Changing identifiers is not allowed."
                      )
                    : t
            }), (e.prototype.describe = function() {
                return "identifier(" + this.identifierType.describe() + ")"
            }), (e.prototype.isValidSnapshot = function(t, e) {
                return void 0 === t || null === t || "string" == typeof t || "number" == typeof t
                    ? this.identifierType.validate(t, e)
                    : ct(e, t, "References should be a primitive value")
            }), e
        })(kt),
        Gt = (function(t) {
            function e(e, n) {
                var r = t.call(this, e.name) || this
                return (r.type = e), (r.defaultValue = n), r
            }
            return n(e, t), Object.defineProperty(e.prototype, "flags", {
                get: function() {
                    return this.type.flags | Tt.Optional
                },
                enumerable: !0,
                configurable: !0
            }), (e.prototype.describe = function() {
                return this.type.describe() + "?"
            }), (e.prototype.instantiate = function(t, e, n, r) {
                if (void 0 === r) {
                    var i = this.getDefaultValue(),
                        o = tt(i) ? et(i).snapshot : i
                    return this.type.instantiate(t, e, n, o)
                }
                return this.type.instantiate(t, e, n, r)
            }), (e.prototype.reconcile = function(t, e) {
                return this.type.reconcile(t, this.type.is(e) ? e : this.getDefaultValue())
            }), (e.prototype.getDefaultValue = function() {
                var t =
                    "function" == typeof this.defaultValue ? this.defaultValue() : this.defaultValue
                return "function" == typeof this.defaultValue && ht(this, t), t
            }), (e.prototype.isValidSnapshot = function(t, e) {
                return void 0 === t ? pt() : this.type.validate(t, e)
            }), (e.prototype.isAssignableFrom = function(t) {
                return this.type.isAssignableFrom(t)
            }), e
        })(kt),
        qt = (function() {
            function t(t) {
                this.name = t
            }
            return (t.prototype.initializePrototype = function(
                t
            ) {}), (t.prototype.initialize = function(t, e) {}), (t.prototype.willChange = function(
                t
            ) {
                return null
            }), (t.prototype.didChange = function(t) {}), (t.prototype.serialize = function(
                t,
                e
            ) {}), (t.prototype.deserialize = function(t, e) {}), t
        })(),
        Kt = (function(t) {
            function r(e, n, r) {
                var i = t.call(this, e) || this
                return (i.getter = n), (i.setter = r), i
            }
            return n(r, t), (r.prototype.initializePrototype = function(t) {
                Object.defineProperty(
                    t,
                    this.name,
                    e.computed(t, this.name, {
                        get: this.getter,
                        set: this.setter,
                        configurable: !0,
                        enumerable: !1
                    })
                )
            }), (r.prototype.validate = function(t, e) {
                return this.name in t
                    ? ct(
                          ut(e, this.name),
                          t[this.name],
                          "Computed properties should not be provided in the snapshot"
                      )
                    : pt()
            }), r
        })(qt),
        Qt = (function(t) {
            function e(e) {
                var n = t.call(this, "" + e) || this
                return (n.flags = Tt.Literal), (n.value = e), n
            }
            return n(e, t), (e.prototype.instantiate = function(t, e, n, r) {
                return it(this, t, e, n, r)
            }), (e.prototype.describe = function() {
                return JSON.stringify(this.value)
            }), (e.prototype.isValidSnapshot = function(t, e) {
                return f(t) && t === this.value ? pt() : ct(e, t)
            }), e
        })(kt),
        Xt = mt(void 0),
        Zt = (function(t) {
            function r(e, n) {
                var r = t.call(this, e) || this
                return (r.type = n), r
            }
            return n(r, t), (r.prototype.initializePrototype = function(t) {
                e.observable.ref(t, this.name, { value: Xt.instantiate(null, "", null, void 0) })
            }), (r.prototype.initialize = function(t, n) {
                var r = et(t)
                ;(t[this.name] = this.type.instantiate(
                    r,
                    this.name,
                    r._environment,
                    n[this.name]
                )), e.extras.interceptReads(t, this.name, r.unbox)
            }), (r.prototype.getValueNode = function(t) {
                var e = t.$mobx.values[this.name].value
                return e || i("Node not available for property " + this.name)
            }), (r.prototype.willChange = function(t) {
                var e = et(t.object)
                return ht(this.type, t.newValue), (t.newValue = this.type.reconcile(
                    e.getChildNode(t.name),
                    t.newValue
                )), t
            }), (r.prototype.didChange = function(t) {
                var e = et(t.object)
                e.emitPatch(
                    {
                        op: "replace",
                        path: C(this.name),
                        value: t.newValue.snapshot,
                        oldValue: t.oldValue ? t.oldValue.snapshot : void 0
                    },
                    e
                )
            }), (r.prototype.serialize = function(t, n) {
                e.extras.getAtom(t, this.name).reportObserved(), (n[this.name] = this.getValueNode(
                    t
                ).snapshot)
            }), (r.prototype.deserialize = function(t, e) {
                t[this.name] = e[this.name]
            }), (r.prototype.validate = function(t, e) {
                return this.type.validate(t[this.name], ut(e, this.name, this.type))
            }), r
        })(qt),
        te = (function(t) {
            function e(e, n) {
                var r = t.call(this, e) || this
                return (r.invokeAction = d(n) ? ot(e, n) : N(e, n)), r
            }
            return n(e, t), (e.prototype.initialize = function(t) {
                g(t, this.name, this.invokeAction.bind(t))
            }), (e.prototype.validate = function(t, e) {
                return this.name in t
                    ? ct(
                          ut(e, this.name),
                          t[this.name],
                          "Action properties should not be provided in the snapshot"
                      )
                    : pt()
            }), e
        })(qt),
        ee = (function(t) {
            function e(e, n) {
                var r = t.call(this, e) || this
                return (r.invokeView = wt(0, n)), r
            }
            return n(e, t), (e.prototype.initialize = function(t) {
                g(t, this.name, this.invokeView.bind(t))
            }), (e.prototype.validate = function(t, e) {
                return this.name in t
                    ? ct(
                          ut(e, this.name),
                          t[this.name],
                          "View properties should not be provided in the snapshot"
                      )
                    : pt()
            }), e
        })(qt),
        ne = (function(t) {
            function r(e, n) {
                var r = t.call(this, e) || this
                return (r.initialValue = n), null !== n && "object" == typeof n
                    ? i(
                          "Trying to declare property " +
                              e +
                              " with a non-primitive value. Please provide an initializer function to avoid accidental sharing of local state, like `" +
                              e +
                              ": () => initialValue`"
                      )
                    : r
            }
            return n(r, t), (r.prototype.initialize = function(t, n) {
                var r =
                    "function" == typeof this.initialValue
                        ? this.initialValue.call(t, t)
                        : this.initialValue
                e.extendObservable(t, ((i = {}), (i[this.name] = r), i))
                var i
            }), (r.prototype.willChange = function(t) {
                return t
            }), (r.prototype.validate = function(t, e) {
                return this.name in t
                    ? ct(
                          ut(e, this.name),
                          t[this.name],
                          "volatile state should not be provided in the snapshot"
                      )
                    : pt()
            }), r
        })(qt),
        re = [
            "preProcessSnapshot",
            "afterCreate",
            "afterAttach",
            "postProcessSnapshot",
            "beforeDetach",
            "beforeDestroy"
        ],
        ie = (function(t) {
            function o(n, r, o, a) {
                var s = t.call(this, n) || this
                return (s.shouldAttachNode = !0), (s.flags =
                    Tt.Object), (s.props = {}), (s.createNewInstance = function() {
                    var t = new s.modelConstructor()
                    return e.extendShallowObservable(t, {}), t
                }), (s.finalizeNewInstance = function(t, n) {
                    var r = t.storedValue
                    s.forAllProps(function(t) {
                        return t.initialize(r, n)
                    }), e.intercept(r, function(t) {
                        return s.willChange(t)
                    }), e.observe(r, s.didChange)
                }), (s.didChange = function(t) {
                    s.props[t.name].didChange(t)
                }), Object.freeze(r), Object.freeze(
                    a
                ), (s.properties = r), (s.state = o), (s.actions = a), /^\w[\w\d_]*$/.test(n) ||
                    i(
                        "Typename should be a valid identifier: " + n
                    ), (s.modelConstructor = (function() {
                    return function() {}
                })()), Object.defineProperty(s.modelConstructor, "name", {
                    value: n,
                    writable: !1
                }), (s.modelConstructor.prototype.toString = Vt), s.parseModelProps(), s.forAllProps(
                    function(t) {
                        return t.initializePrototype(s.modelConstructor.prototype)
                    }
                ), s
            }
            return n(o, t), (o.prototype.instantiate = function(t, e, n, r) {
                return it(
                    this,
                    t,
                    e,
                    n,
                    this.preProcessSnapshot(r),
                    this.createNewInstance,
                    this.finalizeNewInstance
                )
            }), (o.prototype.willChange = function(t) {
                return et(t.object).assertWritable(), this.props[t.name].willChange(t)
            }), (o.prototype.parseModelProps = function() {
                var t = this,
                    e = t.properties,
                    n = t.state,
                    r = t.actions
                for (var o in e)
                    if (V(e, o)) {
                        ;-1 !== re.indexOf(o) &&
                            console.warn(
                                "Hook '" +
                                    o +
                                    "' was defined as property. Hooks should be defined as part of the actions"
                            )
                        var a = Object.getOwnPropertyDescriptor(e, o)
                        if ("get" in a) {
                            this.props[o] = new Kt(o, a.get, a.set)
                            continue
                        }
                        if (null === (u = a.value))
                            i(
                                "The default value of an attribute cannot be null or undefined as the type cannot be inferred. Did you mean `types.maybe(someType)`?"
                            )
                        else if (f(u)) {
                            var s = bt(u)
                            this.props[o] = new Zt(o, gt(s, u))
                        } else
                            R(u)
                                ? (this.props[o] = new Zt(o, u))
                                : "function" == typeof u
                                  ? (this.props[o] = new ee(o, u))
                                  : i(
                                        "object" == typeof u
                                            ? "In property '" +
                                              o +
                                              "': base model's should not contain complex values: '" +
                                              u +
                                              "'"
                                            : "Unexpected value for property '" + o + "'"
                                    )
                    }
                for (var o in n)
                    if (V(n, o)) {
                        ;-1 !== re.indexOf(o) &&
                            console.warn(
                                "Hook '" +
                                    o +
                                    "' was defined as local state. Hooks should be defined as part of the actions"
                            )
                        u = n[o]
                        o in this.properties &&
                            i(
                                "Property '" +
                                    o +
                                    "' was also defined as local state. Local state fields and properties should not collide"
                            ), (this.props[o] = new ne(o, u))
                    }
                for (var o in r)
                    if (V(r, o)) {
                        var u = r[o]
                        o in this.properties &&
                            i(
                                "Property '" +
                                    o +
                                    "' was also defined as action. Actions and properties should not collide"
                            ), o in this.state &&
                            i(
                                "Property '" +
                                    o +
                                    "' was also defined as local state. Actions and state should not collide"
                            ), "function" == typeof u
                            ? (this.props[o] = new te(o, u))
                            : i(
                                  "Unexpected value for action '" +
                                      o +
                                      "'. Expected function, got " +
                                      typeof u
                              )
                    }
            }), (o.prototype.getChildren = function(t) {
                var e = []
                return this.forAllProps(function(n) {
                    n instanceof Zt && e.push(n.getValueNode(t.storedValue))
                }), e
            }), (o.prototype.getChildNode = function(t, e) {
                return this.props[e] instanceof Zt
                    ? this.props[e].getValueNode(t.storedValue)
                    : i("Not a value property: " + e)
            }), (o.prototype.getValue = function(t) {
                return t.storedValue
            }), (o.prototype.getSnapshot = function(t) {
                var e = {}
                return this.forAllProps(function(n) {
                    return n.serialize(t.storedValue, e)
                }), this.postProcessSnapshot(e)
            }), (o.prototype.applyPatchLocally = function(t, e, n) {
                "replace" !== n.op &&
                    "add" !== n.op &&
                    i("object does not support operation " + n.op), (t.storedValue[e] = n.value)
            }), (o.prototype.applySnapshot = function(t, e) {
                var n = this.preProcessSnapshot(e)
                ht(this, n)
                for (var r in this.props) this.props[r].deserialize(t.storedValue, n)
            }), (o.prototype.preProcessSnapshot = function(t) {
                return "function" == typeof this.actions.preProcessSnapshot
                    ? this.actions.preProcessSnapshot.call(null, t)
                    : t
            }), (o.prototype.postProcessSnapshot = function(t) {
                return "function" == typeof this.actions.postProcessSnapshot
                    ? this.actions.postProcessSnapshot.call(null, t)
                    : t
            }), (o.prototype.getChildType = function(t) {
                return this.props[t].type
            }), (o.prototype.isValidSnapshot = function(t, e) {
                var n = this,
                    r = this.preProcessSnapshot(t)
                return l(r)
                    ? lt(
                          Object.keys(this.props).map(function(t) {
                              return n.props[t].validate(r, e)
                          })
                      )
                    : ct(e, r)
            }), (o.prototype.forAllProps = function(t) {
                var e = this
                Object.keys(this.props).forEach(function(n) {
                    return t(e.props[n])
                })
            }), (o.prototype.describe = function() {
                var t = this
                return (
                    "{ " +
                    Object.keys(this.props)
                        .map(function(e) {
                            var n = t.props[e]
                            return n instanceof Zt ? e + ": " + n.type.describe() : ""
                        })
                        .filter(Boolean)
                        .join("; ") +
                    " }"
                )
            }), (o.prototype.getDefaultSnapshot = function() {
                return {}
            }), (o.prototype.removeChild = function(t, e) {
                t.storedValue[e] = null
            }), r([e.action], o.prototype, "applySnapshot", null), o
        })(Rt),
        oe = (function() {
            return function(t, e) {
                if (((this.mode = t), (this.value = e), "object" === t)) {
                    if (!tt(e))
                        return i("Can only store references to tree nodes, got: '" + e + "'")
                    if (!et(e).identifierAttribute)
                        return i("Can only store references with a defined identifier attribute.")
                }
            }
        })(),
        ae = (function(t) {
            function e(e) {
                var n = t.call(this, "reference(" + e.name + ")") || this
                return (n.targetType = e), (n.flags = Tt.Reference), n
            }
            return n(e, t), (e.prototype.describe = function() {
                return this.name
            }), (e.prototype.getValue = function(t) {
                var e = t.storedValue
                if ("object" === e.mode) return e.value
                if (t.isAlive) {
                    var n = t.root.identifierCache.resolve(this.targetType, e.value)
                    return n
                        ? n.value
                        : i(
                              "Failed to resolve reference of type " +
                                  this.targetType.name +
                                  ": '" +
                                  e.value +
                                  "' (in: " +
                                  t.path +
                                  ")"
                          )
                }
            }), (e.prototype.getSnapshot = function(t) {
                var e = t.storedValue
                switch (e.mode) {
                    case "identifier":
                        return e.value
                    case "object":
                        return et(e.value).identifier
                }
            }), (e.prototype.instantiate = function(t, e, n, r) {
                var i = tt(r)
                return it(this, t, e, n, new oe(i ? "object" : "identifier", r))
            }), (e.prototype.reconcile = function(t, e) {
                var n = tt(e) ? "object" : "identifier"
                if (M(t.type)) {
                    var r = t.storedValue
                    if (n === r.mode && r.value === e) return t
                }
                var i = this.instantiate(t.parent, t.subpath, t._environment, e)
                return t.die(), i
            }), (e.prototype.isAssignableFrom = function(t) {
                return this.targetType.isAssignableFrom(t)
            }), (e.prototype.isValidSnapshot = function(t, e) {
                return "string" == typeof t || "number" == typeof t
                    ? pt()
                    : ct(
                          e,
                          t,
                          "Value '" +
                              at(t) +
                              "' is not a valid reference. Expected a string or number."
                      )
            }), e
        })(kt),
        se = (function(t) {
            function e(e, n, r) {
                var i = t.call(this, e) || this
                return (i.dispatcher = null), (i.dispatcher = r), (i.types = n), i
            }
            return n(e, t), Object.defineProperty(e.prototype, "flags", {
                get: function() {
                    var t = Tt.Union
                    return this.types.forEach(function(e) {
                        t |= e.flags
                    }), t
                },
                enumerable: !0,
                configurable: !0
            }), (e.prototype.isAssignableFrom = function(t) {
                return this.types.some(function(e) {
                    return e.isAssignableFrom(t)
                })
            }), (e.prototype.describe = function() {
                return (
                    "(" +
                    this.types
                        .map(function(t) {
                            return t.describe()
                        })
                        .join(" | ") +
                    ")"
                )
            }), (e.prototype.instantiate = function(t, e, n, r) {
                return this.determineType(r).instantiate(t, e, n, r)
            }), (e.prototype.reconcile = function(t, e) {
                return this.determineType(e).reconcile(t, e)
            }), (e.prototype.determineType = function(t) {
                if (null !== this.dispatcher) return this.dispatcher(t)
                var e = this.types.filter(function(e) {
                    return e.is(t)
                })
                return e.length > 1
                    ? i(
                          "Ambiguos snapshot " +
                              JSON.stringify(t) +
                              " for union " +
                              this.name +
                              ". Please provide a dispatch in the union declaration."
                      )
                    : e[0]
            }), (e.prototype.isValidSnapshot = function(t, e) {
                if (null !== this.dispatcher) return this.dispatcher(t).validate(t, e)
                var n = this.types.map(function(n) {
                        return n.validate(t, e)
                    }),
                    r = n.filter(function(t) {
                        return 0 === t.length
                    })
                return r.length > 1
                    ? ct(
                          e,
                          t,
                          "Multiple types are applicable and no dispatch method is defined for the union"
                      )
                    : r.length < 1
                      ? ct(
                            e,
                            t,
                            "No type is applicable and no dispatch method is defined for the union"
                        ).concat(lt(n))
                      : pt()
            }), e
        })(kt),
        ue = new ((function(t) {
            function e() {
                var e = t.call(this, "frozen") || this
                return (e.flags = Tt.Frozen), e
            }
            return n(e, t), (e.prototype.describe = function() {
                return "<any immutable value>"
            }), (e.prototype.instantiate = function(t, e, n, r) {
                return it(this, t, e, n, v(r))
            }), (e.prototype.isValidSnapshot = function(t, e) {
                return b(t) ? pt() : ct(e, t)
            }), e
        })(kt))(),
        pe = gt($t, null),
        ce = (function(t) {
            function e(e, n, r) {
                var i = t.call(this, e) || this
                return (i.type = n), (i.predicate = r), i
            }
            return n(e, t), Object.defineProperty(e.prototype, "flags", {
                get: function() {
                    return this.type.flags | Tt.Refinement
                },
                enumerable: !0,
                configurable: !0
            }), (e.prototype.describe = function() {
                return this.name
            }), (e.prototype.instantiate = function(t, e, n, r) {
                return this.type.instantiate(t, e, n, r)
            }), (e.prototype.isAssignableFrom = function(t) {
                return this.type.isAssignableFrom(t)
            }), (e.prototype.isValidSnapshot = function(t, e) {
                if (this.type.is(t)) {
                    var n = tt(t) ? et(t).snapshot : t
                    if (this.predicate(n)) return pt()
                }
                return ct(e, t)
            }), e
        })(kt),
        le = (function(t) {
            function e(e, n) {
                var r = t.call(this, e) || this
                return (r._subType = null), ("function" == typeof n && 0 === n.length) ||
                    i(
                        "Invalid late type, expected a function with zero arguments that returns a type, got: " +
                            n
                    ), (r.definition = n), r
            }
            return n(e, t), Object.defineProperty(e.prototype, "flags", {
                get: function() {
                    return this.subType.flags | Tt.Late
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "subType", {
                get: function() {
                    return null === this._subType && (this._subType = this.definition()), this
                        ._subType
                },
                enumerable: !0,
                configurable: !0
            }), (e.prototype.instantiate = function(t, e, n, r) {
                return this.subType.instantiate(t, e, n, r)
            }), (e.prototype.reconcile = function(t, e) {
                return this.subType.reconcile(t, e)
            }), (e.prototype.describe = function() {
                return this.subType.name
            }), (e.prototype.isValidSnapshot = function(t, e) {
                return this.subType.validate(t, e)
            }), (e.prototype.isAssignableFrom = function(t) {
                return this.subType.isAssignableFrom(t)
            }), e
        })(kt),
        he = {
            enumeration: function(t, e) {
                var n = "string" == typeof t ? e : t,
                    r = jt.apply(
                        void 0,
                        n.map(function(t) {
                            return mt("" + t)
                        })
                    )
                return "string" == typeof t && (r.name = t), r
            },
            model: Pt,
            compose: At,
            reference: function(t) {
                return 2 === arguments.length &&
                    "string" == typeof arguments[1] &&
                    i(
                        "References with base path are no longer supported. Please remove the base path."
                    ), new ae(t)
            },
            union: jt,
            optional: gt,
            literal: mt,
            maybe: function(t) {
                return t === ue &&
                    i(
                        "Unable to declare `types.maybe(types.frozen)`. Frozen already accepts `null`. Consider using `types.optional(types.frozen, null)` instead."
                    ), jt(pe, t)
            },
            refinement: function(t, e, n) {
                return new ce(t, e, n)
            },
            string: Ut,
            boolean: Wt,
            number: Ht,
            Date: Bt,
            map: function(t) {
                return new Ft("map<string, " + t.name + ">", t)
            },
            array: function(t) {
                return new Mt(t.name + "[]", t)
            },
            frozen: ue,
            identifier: function(t) {
                return void 0 === t && (t = Ut), new Yt(t)
            },
            late: function(t, e) {
                var n = "string" == typeof t ? t : "late(" + t.toString() + ")"
                return new le(n, "string" == typeof t ? e : t)
            },
            undefined: Jt,
            null: $t
        }
    ;(t.types = he), (t.escapeJsonPath = C), (t.unescapeJsonPath = S), (t.onAction = E), (t.isStateTreeNode = tt), (t.asReduxStore = function(
        t
    ) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
        tt(t) || i("Expected model object")
        var r = {
                getState: function() {
                    return q(t)
                },
                dispatch: function(e) {
                    St(e, o.slice(), function(e) {
                        return D(t, Ct(e))
                    })
                },
                subscribe: function(e) {
                    return W(t, e)
                }
            },
            o = e.map(function(t) {
                return t(r)
            })
        return r
    }), (t.connectReduxDevtools = function(t, e) {
        var n = t.connectViaExtension(),
            r = !1
        n.subscribe(function(n) {
            var i = t.extractState(n)
            i && ((r = !0), G(e, i), (r = !1))
        }), E(e, function(t) {
            if (!r) {
                var i = {}
                ;(i.type = t.name), t.args &&
                    t.args.forEach(function(t, e) {
                        return (i[e] = t)
                    }), n.send(i, q(e))
            }
        })
    }), (t.getType = L), (t.getChildType = function(t, e) {
        return et(t).getChildType(e)
    }), (t.addMiddleware = U), (t.onPatch = H), (t.onSnapshot = W), (t.applyPatch = $), (t.revertPatch = J), (t.recordPatches = function(
        t
    ) {
        var e = {
                patches: [],
                get cleanPatches() {
                    return this.patches.map(j)
                },
                stop: function() {
                    n()
                },
                replay: function(n) {
                    $(n || t, e.patches)
                },
                undo: function(e) {
                    J(t || t, this.patches)
                }
            },
            n = H(
                t,
                function(t) {
                    e.patches.push(t)
                },
                !0
            )
        return e
    }), (t.applyAction = B), (t.recordActions = function(t) {
        var e = {
                actions: [],
                stop: function() {
                    return n()
                },
                replay: function(t) {
                    B(t, e.actions)
                }
            },
            n = E(t, e.actions.push.bind(e.actions))
        return e
    }), (t.protect = function(t) {
        var e = et(t)
        e.isRoot || i("`protect` can only be invoked on root nodes"), (e.isProtectionEnabled = !0)
    }), (t.unprotect = function(t) {
        var e = et(t)
        e.isRoot || i("`unprotect` can only be invoked on root nodes"), (e.isProtectionEnabled = !1)
    }), (t.isProtected = Y), (t.applySnapshot = G), (t.getSnapshot = q), (t.hasParent = function(
        t,
        e
    ) {
        void 0 === e && (e = 1), e < 0 && i("Invalid depth: " + e + ", should be >= 1")
        for (var n = et(t).parent; n; ) {
            if (0 == --e) return !0
            n = n.parent
        }
        return !1
    }), (t.getParent = function(t, e) {
        void 0 === e && (e = 1), e < 0 && i("Invalid depth: " + e + ", should be >= 1")
        for (var n = e, r = et(t).parent; r; ) {
            if (0 == --n) return r.storedValue
            r = r.parent
        }
        return i("Failed to find the parent of " + et(t) + " at depth " + e)
    }), (t.getRoot = function(t) {
        return et(t).root.storedValue
    }), (t.getPath = function(t) {
        return et(t).path
    }), (t.getPathParts = function(t) {
        return O(et(t).path)
    }), (t.isRoot = K), (t.resolvePath = Q), (t.resolveIdentifier = function(t, e, n) {
        R(t) || i("Expected a type as first argument")
        var r = et(e).root.identifierCache.resolve(t, "" + n)
        return r ? r.value : void 0
    }), (t.tryResolve = X), (t.getRelativePath = function(t, e) {
        return et(t).getRelativePathTo(et(e))
    }), (t.clone = function(t, e) {
        void 0 === e && (e = !0)
        var n = et(t)
        return n.type.create(n.snapshot, !0 === e ? n.root._environment : !1 === e ? void 0 : e)
    }), (t.detach = function(t) {
        return et(t).detach(), t
    }), (t.destroy = function(t) {
        var e = et(t)
        e.isRoot ? e.die() : e.parent.removeChild(e.subpath)
    }), (t.isAlive = function(t) {
        return et(t).isAlive
    }), (t.addDisposer = function(t, e) {
        et(t).addDisposer(e)
    }), (t.getEnv = function(t) {
        var e = et(t),
            n = e.root._environment
        return n ||
            i(
                "Node '" +
                    e +
                    "' is not part of state tree that was initialized with an environment. Environment can be passed as second argumentt to .create()"
            ), n
    }), (t.walk = Z), Object.defineProperty(t, "__esModule", { value: !0 })
})
