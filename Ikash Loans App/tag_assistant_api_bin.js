(function() {
    'use strict';
    var m = typeof Object.defineProperties == "function" ? Object.defineProperty : function(a, c, b) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[c] = b.value;
        return a
    }
      , p = function(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var c = 0; c < a.length; ++c) {
            var b = a[c];
            if (b && b.Math == Math)
                return b
        }
        throw Error("Cannot find global object");
    }
      , q = p(this)
      , r = function(a, c) {
        if (c)
            a: {
                var b = q;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var f = a[d];
                    if (!(f in b))
                        break a;
                    b = b[f]
                }
                a = a[a.length - 1];
                d = b[a];
                c = c(d);
                c != d && c != null && m(b, a, {
                    configurable: !0,
                    writable: !0,
                    value: c
                })
            }
    };
    r("globalThis", function(a) {
        return a || q
    });
    /*

 Copyright Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
    let t = globalThis.trustedTypes, u;
    function v() {
        let a = null;
        if (!t)
            return a;
        try {
            const c = b => b;
            a = t.createPolicy("goog#html", {
                createHTML: c,
                createScript: c,
                createScriptURL: c
            })
        } catch (c) {}
        return a
    }
    ;var w = class {
        constructor(a) {
            this.v = a
        }
        toString() {
            return this.v + ""
        }
    }
    ;
    function x(a) {
        u === void 0 && (u = v());
        var c = u;
        return new w(c ? c.createScriptURL(a) : a)
    }
    ;function A(a, ...c) {
        if (c.length === 0)
            return x(a[0]);
        let b = a[0];
        for (let d = 0; d < c.length; d++)
            b += encodeURIComponent(c[d]) + a[d + 1];
        return x(b)
    }
    ;A`api/tag_assistant_api_bin.js`;
    A`api/content_script_bin.js`;
    A`api/start_debug_content_script_bin.js`;
    A`api/start_prod_debug_content_script_bin.js`;
    var B = function(a, c, b=null) {
        if (c == null)
            return c;
        const d = typeof c;
        if (d === "boolean" || d === "string" || d === "number")
            return c;
        if (d === "function")
            return "Function";
        if (d === "object") {
            const g = a.l.indexOf(c);
            if (g !== -1) {
                a.cycles[b] = a.m[g];
                return
            }
            try {
                if (c && typeof c[Symbol.iterator] === "function") {
                    var f = [];
                    a.l.push(c);
                    a.m.push(b);
                    var e = 0;
                    for (var k of c)
                        f.push(B(a, k, b == null ? `${e}` : `${b}.${e}`)),
                        e++;
                    return f
                }
                if (c instanceof Node) {
                    a = [];
                    b = c;
                    do {
                        if (b instanceof Element) {
                            const y = b.classList ? [...b.classList].join(".") : ""
                              , z = (b.tagName ? b.tagName.toLowerCase() : "") + (y ? "." + y : "") + (b.id ? "#" + b.id : "");
                            z && a.unshift(z)
                        }
                        b = b.parentNode
                    } while (b != null);
                    var h;
                    const l = (h = (e = c.toString().match(/\[object (\w+)\]/)) == null ? void 0 : e[1]) != null ? h : c.toString()
                      , n = a.join(" > ");
                    return n ? `${l}: ${n}` : l
                }
                k = {};
                a.l.push(c);
                a.m.push(b);
                for (const [l,n] of Object.entries(c))
                    e = l,
                    h = n,
                    f = e.replace(/\\/g, "\\\\").replace(/\./, "\\."),
                    k[e] = B(a, h, b == null ? `${f}` : `${b}.${f}`);
                return k
            } catch (l) {
                console.log("Object inspection failed: %o", l)
            }
        }
        try {
            return String(c)
        } catch (g) {
            console.log("Failed to convert to string: %o", g);
            try {
                return String(Object.prototype.toString.call(c))
            } catch (l) {
                return `[${d}]`
            }
        }
    };
    class C {
        constructor() {
            this.cycles = {};
            this.l = [];
            this.m = []
        }
    }
    ;var E = function(a) {
        const c = a.g["google.tagmanager.ta.prodqueue"];
        if (c) {
            D(a, [...c]);
            var b = c.push;
            c.push = (...d) => {
                D(a, d);
                return b.apply(c, d)
            }
        } else
            Date.now() - a.u < 1E4 && a.g.setTimeout( () => {
                E(a)
            }
            , 300)
    }
      , D = function(a, c) {
        for (const b of c)
            c = new C,
            c = {
                sanitized: B(c, b),
                cycles: c.cycles
            },
            a.h({
                type: "MEMO",
                data: {
                    memo: c,
                    sequence: a.o,
                    pageId: a.pageId
                }
            }),
            a.o++
    }
      , F = class {
        constructor(a, c) {
            this.g = a;
            this.h = c;
            this.u = Date.now();
            this.o = 0;
            c = new Uint8Array(16);
            a.crypto.getRandomValues(c);
            this.pageId = a.btoa(String.fromCharCode(...c)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
            E(this)
        }
    }
    ;
    function G(a) {
        if (a == null || a.length === 0)
            return !1;
        a = Number(a);
        const c = (new Date(Date.now())).getTime();
        return a < c + 3E5 && a > c - 9E5
    }
    ;function H(a) {
        return a.replace(/([\?&])gtm_debug=x&/, "$1").replace(/[\?&]gtm_debug=x($|#)/, "$1")
    }
    ;let I = window;
    function J() {
        let a = I.google_tags_first_party;
        Array.isArray(a) || (a = []);
        const c = {};
        for (const b of a)
            c[b] = !0;
        return Object.freeze(c)
    }
    class K {
        constructor() {
            this.container = {};
            this.destination = {};
            this.canonical = {};
            this.pending = [];
            this.siloed = [];
            this.injectedFirstPartyContainers = {};
            this.injectedFirstPartyContainers = J()
        }
    }
    ;var L = function(a) {
        const c = a.g.document.documentElement.getAttribute("data-tag-assistant-prod-present");
        if (G(c))
            a.startProdDebug();
        else {
            const b = d => {
                d.detail.startProdDebug && a.startProdDebug();
                a.g.document.removeEventListener("TADebugSignal", b)
            }
            ;
            a.g.document.addEventListener("TADebugSignal", b)
        }
    }
      , N = function(a) {
        a.g === a.g.top && (a.j = a.g.setInterval( () => {
            a.h({
                type: "PING"
            })
        }
        , 1E3),
        a.g.document.readyState === "complete" ? M(a) : a.g.addEventListener("load", () => {
            M(a)
        }
        ))
    }
      , M = function(a, c) {
        if (c !== "RESEND_MEMOS" || a.g === a.g.top) {
            c = a.h;
            var b = Object, d = b.assign, f = a.g, e;
            var k = H(f.location.href);
            var h;
            if (!(h = f.document.title) && (h = f.location.href,
            h !== "/")) {
                try {
                    var g = new URL(h);
                    g.search = "";
                    g.hash = "";
                    h = g.toString()
                } catch (l) {}
                g = h.split("/");
                h = g[g.length - 1] || g[g.length - 2]
            }
            k = {
                href: k,
                title: h,
                referrer: H((e = f.document.referrer) != null ? e : ""),
                readyState: f.document.readyState
            };
            e = a.g;
            e = e.google_tag_manager = e.google_tag_manager || {};
            e = e.debugGroupId || (e.debugGroupId = String(Math.floor(Number.MAX_SAFE_INTEGER * Math.random())));
            c.call(a, {
                type: "PAGE_SUMMARY",
                data: d.call(b, {}, k, {
                    groupId: e,
                    pageId: ""
                })
            })
        }
    }
      , P = function(a) {
        a.i || (O(a),
        a.i = a.g.setInterval( () => {
            O(a)
        }
        , 1500))
    }
      , O = function(a) {
        var c = {};
        var b = I.google_tag_data;
        I.google_tag_data = b === void 0 ? c : b;
        c = I.google_tag_data;
        b = c.tidr;
        b && typeof b === "object" || (b = new K,
        c.tidr = b);
        b.container || (b.container = {});
        b.destination || (b.destination = {});
        b.canonical || (b.canonical = {});
        b.pending || (b.pending = []);
        b.siloed || (b.siloed = []);
        b.injectedFirstPartyContainers || (b.injectedFirstPartyContainers = J());
        c = [];
        for (const [,d] of Object.entries(b.container))
            if (b = d,
            b.scriptContainerId != null) {
                switch (b.state) {
                case 2:
                    break;
                default:
                    continue
                }
                c.push({
                    ctid: b.scriptContainerId,
                    aliases: Q(b.containers || [b.scriptContainerId]),
                    destinations: Q(b.destinations || []),
                    canonicalId: b.canonicalContainerId,
                    parent: b.parent,
                    context: b.context
                })
            }
        c.length && a.h({
            type: "SIDE_PANEL",
            subType: "sp_list_tags",
            data: {
                tags: c
            }
        })
    }
      , S = class {
        constructor(a) {
            this.g = R;
            this.s = a;
            this.enableUntaggedPageReporting = !1;
            this.g.document.addEventListener("__TAG_ASSISTANT_API_MESSAGE", c => {
                c = c.detail;
                a: {
                    var b = c == null ? void 0 : c.type;
                    if (typeof b !== "string")
                        b = !1;
                    else
                        switch (b) {
                        case "API_INSTALLED":
                        case "CHECK_DEBUG":
                        case "DISCONNECT":
                        case "PIPE_MESSAGE":
                        case "RECONNECT":
                        case "WINDOWS_CLOSED":
                            b = !0;
                            break a;
                        default:
                            b = !1
                        }
                }
                if (b)
                    a: if (b = c == null ? void 0 : c.source,
                    typeof b !== "string")
                        b = !1;
                    else
                        switch (b) {
                        case "PAGE":
                        case "EXTENSION":
                            b = !0;
                            break a;
                        default:
                            b = !1
                        }
                if (b && c.type === "PIPE_MESSAGE" && c.source === "EXTENSION") {
                    b = c.data;
                    const d = c.origin;
                    if (b.type === "SIDE_PANEL")
                        b.subType === "sp_list_tags" && P(this),
                        b.subType === "sp_off" && (this.g.clearInterval(this.i),
                        this.i = void 0);
                    else {
                        if (c = !this.enableUntaggedPageReporting)
                            a: {
                                try {
                                    if (b.type !== "PING") {
                                        c = !1;
                                        break a
                                    }
                                    let f, e;
                                    c = (e = (f = b.flags) == null ? void 0 : f.enableUntaggedPageReporting) != null ? e : !1;
                                    break a
                                } catch (f) {
                                    c = !1;
                                    break a
                                }
                                c = void 0
                            }
                        c ? (this.enableUntaggedPageReporting = !0,
                        N(this)) : b.type === "RESEND_MEMOS" && !this.receiver && this.enableUntaggedPageReporting && M(this, "RESEND_MEMOS");
                        this.receiver && this.receiver(b, d)
                    }
                }
            }
            );
            this.g.document.dispatchEvent(new CustomEvent("__TAG_ASSISTANT_API_MESSAGE",{
                detail: {
                    type: "API_INSTALLED",
                    source: "PAGE"
                }
            }));
            this.g.addEventListener("pagehide", () => {
                this.i != null && (this.g.clearInterval(this.i),
                this.i = void 0)
            }
            );
            L(this)
        }
        setReceiver(a) {
            this.receiver = a
        }
        sendMessage(a) {
            this.j && (this.g.clearInterval(this.j),
            this.j = void 0);
            this.h(a)
        }
        h(a) {
            this.g.document.dispatchEvent(new CustomEvent("__TAG_ASSISTANT_API_MESSAGE",{
                detail: {
                    type: "PIPE_MESSAGE",
                    source: "PAGE",
                    data: a,
                    origin: this.g.origin
                }
            }))
        }
        disconnect() {
            this.g.document.dispatchEvent(new CustomEvent("__TAG_ASSISTANT_API_MESSAGE",{
                detail: {
                    type: "DISCONNECT",
                    source: "PAGE"
                }
            }));
            this.s()
        }
        startProdDebug() {
            this.A = this.A || new F(this.g,a => {
                this.h(a)
            }
            )
        }
    }
    ;
    function Q(a) {
        const c = [];
        for (const b of a)
            b != null && c.push(b);
        return c
    }
    ;const R = window;
    R.__TAG_ASSISTANT_API || (R.__TAG_ASSISTANT_API = new S( () => {
        R.__TAG_ASSISTANT_API = void 0
    }
    ));
}
).call(this);
