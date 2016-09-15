var svGlobal = {
    version: "4.8.6",
    log: 1,
    isMultitask: hi5.browser.isMultitask,
    util: {},
    logger: {
        debug: function(f) {
            2 < svGlobal.log && console.log(f)
        },
        info: function(f) {
            1 < svGlobal.log && console.log(f)
        },
        warn: function(f) {
            0 < svGlobal.log && console.log(f)
        }
    }
};

function cancelDefault(f) {
    f.preventDefault && f.preventDefault();
    f.stopPropagation && f.stopPropagation();
    return !1
}

function LocalInterface(f) {
    function C(a) {
        var b = 0,
            d = 0,
            c = a.offsetParent;
        c && c.offsetParent && (c = c.offsetParent, b = c.scrollTop, d = c.scrollLeft);
        a.focus();
        b && (c.scrollTop = b);
        d && (c.scrollLeft = d)
    }

    function n() {
        var a = [];
        this.sent = 0;
        this.types = [];
        var b = this;
        this.datas = a;
        this.setData = function(d, c) {
            if ("text/plain" == d || "text/html" == d) 2 < c.length && "`\t`" == c.substring(0, 3) && (c = c.substring(3)), c = c.replace(/\r?\n/g, "\r\n");
            b.types.push(d);
            a.push(c)
        };
        this.getData = function(d) {
            return a[b.types.indexOf(d)]
        };
        this.equals = function(a) {
            if (!a ||
                !hi5.Arrays.equals(b.types, a.types)) return !1;
            for (var c, h, k = b.types, q = 0, ia = k.length; q < ia; q++)
                if (c = k[q], h = b.getData(c), c = a.getData(c), h != c) return !1;
            return !0
        }
    }

    function u(a) {
        function b() {
            var c = p ? a.value : a.innerText || a.textContent;
            e && !p && c.charAt(0) != x.PLACE_HOLDER && (c = x.PLACE_HOLDER + c);
            return c
        }

        function d() {
            var c = e || T && H ? x.PLACE_HOLDER : "";
            l = c;
            x.setValue(c);
            if (e)
                if (p) a.setSelectionRange && a.setSelectionRange(a.value.length, a.value.length);
                else if (c = a, c.focus(), "undefined" != typeof window.getSelection && "undefined" !=
                typeof document.createRange) {
                var b = document.createRange();
                b.selectNodeContents(c);
                b.collapse(!1);
                c = window.getSelection();
                c.removeAllRanges();
                c.addRange(b)
            } else "undefined" != typeof document.body.createTextRange && (b = document.body.createTextRange(), b.moveToElementText(c), b.collapse(!1), b.select())
        }

        function c(a) {
            g = 8 == a.keyCode;
            if (x.onkeydown) x.onkeydown(a);
            return !0
        }

        function h(c) {
            if (x.onkeyup) x.onkeyup(c);
            c = c.keyCode;
            1 != (p ? a.value : a.innerText || a.textContent).length && 13 != c && 32 != c || setTimeout(d, 100);
            return !0
        }

        function k(a) {
            if (x.onkeypress) x.onkeypress(a)
        }

        function q(a) {
            if (x.onbackspace)
                for (var c = 0; c < a; c++) x.onbackspace()
        }

        function ia(c) {
            if (!x.disableTextInput) {
                c.stopPropagation();
                c = b();
                var h = c.length;
                1 < h && c.charAt(0) != x.PLACE_HOLDER && c.charAt(h - 1) == x.PLACE_HOLDER && (c = x.PLACE_HOLDER + c.substring(0, h - 1), x.setValue(c));
                if (c != l) {
                    var B = l.length,
                        k = c.indexOf(l);
                    if (c && 0 === k) {
                        if (c = c.substring(B), 0 < c.length && f && x.ontextinput && (x.ontextinput({
                                data: c,
                                target: a
                            }), "." == c)) {
                            d();
                            return
                        }
                    } else if (k = l.indexOf(c), 0 === k) g || q(B -
                        h);
                    else if (f && (e && (B--, c = c.substring(1)), q(B), 0 < c.length && x.ontextinput)) x.ontextinput({
                        data: c,
                        target: a
                    });
                    "" === b() && setTimeout(d, 100);
                    l = b()
                }
            }
        }

        function E(a) {
            if (!x.disableTextInput && a.data) {
                a.stopPropagation();
                if (x.ontextinput) x.ontextinput(a);
                m && a.preventDefault()
            }
        }
        var x = this,
            e = hi5.browser.isAndroid && hi5.browser.isChrome,
            f = hi5.browser.isFirefox || hi5.browser.isOpera || e,
            g = !1,
            m = !hi5.browser.isRIM,
            l = "",
            p = "INPUT" == a.nodeName || "TEXTAREA" == a.nodeName,
            B = "DIV" == a.nodeName;
        this.PLACE_HOLDER = "`";
        this.setValue =
            function(c) {
                var b = x.disableTextInput;
                x.disableTextInput = !0;
                p ? a.value = c : B && (a.innerHTML = c);
                x.disableTextInput = b
            };
        this.init = d;
        this.disableTextInput = !1;
        d();
        a.addEventListener("keydown", c, !1);
        a.addEventListener("keyup", h, !1);
        a.addEventListener("keypress", k, !1);
        f ? (a.addEventListener("input", ia, !1), e ? a.onclick = d : a.addEventListener("mouseup", d, !1)) : (a.addEventListener("textInput", E, !1), a.addEventListener("textinput", E, !1));
        this.release = function() {
            x = null;
            a.removeEventListener("keydown", c, !1);
            a.removeEventListener("keyup",
                h, !1);
            a.removeEventListener("input", ia, !1);
            a.removeEventListener("focus", d, !1);
            a = null
        };
        this.select = function() {
            db(a)
        }
    }

    function I(a, b, d) {
        function c(a) {
            var c = 0,
                d = 0,
                x = 0,
                e = za(a);
            "wheelDelta" in a ? (x = Date.now(), 100 < x - k && (h = 0), d = a.wheelDelta, 0 != d && (h += d, c = h / 120 | 0, h %= 120, 0 !== c && b(c, e)), k = x) : (c = -a.detail, 32768 == Math.abs(c) && (d = window.innerHeight / 40 | 0, c = 0 > c ? -d : d), b(c, e))
        }
        var h = 0,
            k = 0;
        a.addEventListener("DOMMouseScroll", c, !0);
        a.addEventListener("mousewheel", c, !0)
    }

    function A(a) {
        function b(a) {
            if (!k && q.onmousedown) q.onmousedown(a)
        }

        function d(a) {
            if (!k && q.onmousemove) q.onmousemove(a)
        }

        function c(a) {
            if (k) k = !1;
            else if (q.onmouseup) q.onmouseup(a)
        }

        function h(a) {
            var c = a.type;
            "touchstart" == c && (k = !0);
            if (q.ontouch) q.ontouch(a)
        }
        var k = !1,
            q = this,
            ia = navigator.pointerEnabled || navigator.msPointerEnabled || !1;
        "ontouchstart" in window || !ia ? (a.addEventListener("touchstart", h, !1), a.addEventListener("touchend", h, !1), a.addEventListener("touchmove", h, !1), a.addEventListener("touchcancel", h, !1), a.addEventListener("mousemove", d, !1), a.addEventListener("mousedown",
            b, !1), a.addEventListener("mouseup", c, !1)) : navigator.pointerEnabled ? (a.addEventListener("pointerdown", h, !1), a.addEventListener("pointerup", h, !1), a.addEventListener("pointermove", h, !1), a.addEventListener("pointercancel", h, !1)) : navigator.msPointerEnabled && (a.addEventListener("MSPointerDown", h, !1), a.addEventListener("MSPointerUp", h, !1), a.addEventListener("MSPointerMove", h, !1), a.addEventListener("MSPointerCancel", h, !1))
    }

    function r() {
        return e.railWin ? !0 : !fa && N <= window.innerWidth && L <= window.innerHeight
    }

    function U(a) {
        function b(a, b) {
            for (var d, h = a.length, e = Array(h), f = 0; f < h; f++) {
                d = a[f];
                var g = Aa(d.clientX, d.clientY, m.getElement()),
                    l = f;
                d = d.identifier;
                if (!(256 > d)) {
                    var ka = c.indexOf(d); - 1 != ka ? d = ka : (c.push(d), d = c.length - 1)
                }
                e[l] = {
                    contactId: d,
                    contactFlags: b,
                    x: g.x,
                    y: g.y
                }
            }
            return e
        }
        var d, c = [],
            h = !1;
        this.handle = function(k) {
            var q = k.type,
                e = k.touches,
                E = k.changedTouches;
            cancelDefault(k);
            switch (q) {
                case "touchstart":
                    h = !1;
                    d = k = b(e, 25);
                    break;
                case "touchmove":
                    k = b(E, 26);
                    q = !1;
                    if (0 < d.length && 1 == k.length) {
                        a: {
                            e = d.length;
                            for (E =
                                0; E < e; E++)
                                if (d[E].contactId == k[0].contactId) {
                                    e = E;
                                    break a
                                }
                            e = -1
                        } - 1 != e && d[e].x == k[0].x && d[e].y == k[0].y && (q = !0)
                    }
                    if (q) break;
                    else 0 < d.length && (a.redirectTouches(d), d.length = 0);
                    a.redirectTouches(k);
                    h = !0;
                    break;
                case "touchend":
                    if (h) k = b(E, 4);
                    else {
                        a.redirectTouches(d);
                        k = d.length;
                        for (q = 0; q < k; q++) d[q].contactFlags = 4;
                        k = d
                    }
                    a.redirectTouches(k);
                    c.length = d.length = 0;
                    break;
                case "touchcancel":
                    a.redirectTouches(b(E, 34)), c.length = d.length = 0
            }
        }
    }

    function la(a) {
        function b(a) {
            var c = a[1].screenX - a[0].screenX;
            a = a[1].screenY - a[0].screenY;
            return Math.sqrt(c * c + a * a)
        }

        function d(a, d) {
            var h = [],
                B = c(a, W[0].identifier) || c(d, W[0].identifier);
            B && h.push(B);
            (B = c(a, W[1].identifier) || c(d, W[1].identifier)) && h.push(B);
            B = "";
            if (2 != h.length) return B;
            var k = b(h) - b(W);
            60 > Math.abs(k) ? (k = 80, h[0].screenX - W[0].screenX > k ? B = "RIGHT" : W[0].screenX - h[0].screenX > k ? B = "LEFT" : h[0].screenY - W[0].screenY > k ? B = "DOWN" : W[0].screenY - h[0].screenY > k && (B = "UP")) : B = 0 > k ? "CLOSE" : "OPEN";
            return B
        }

        function c(a, c) {
            for (var b = 0, d = a.length; b < d; b++)
                if (a[b].identifier == c) return a[b];
            return null
        }

        function h(a) {
            this.identifier = a.pointerId;
            this.clientX = a.clientX;
            this.clientY = a.clientY;
            this.pageX = a.pageX;
            this.pageY = a.pageY;
            this.screenX = a.screenX;
            this.screenY = a.screenY
        }
        var k = 0,
            q = 0,
            e = 0,
            E = 0,
            f = !1,
            g = 0,
            l = 0,
            p = 0,
            ka = 0,
            n = !1,
            t = !1,
            B = 3,
            ja = !1;
        T && (B *= 3);
        this.delay = !1;
        var W = [],
            z = this;
        this.handlePointer = function(a) {
            if (a.pointerType == a.MSPOINTER_TYPE_MOUSE || "mouse" == a.pointerType) switch (a.type) {
                case "MSPointerDown":
                case "pointerdown":
                    Ma(a);
                    break;
                case "pointermove":
                case "MSPointerMove":
                    Na(a);
                    break;
                case "pointerup":
                case "MSPointerUp":
                    Oa(a)
            } else a.touches =
                a.changedTouches = [new h(a)], z.handle(a)
        };
        this.handle = function(b) {
            var h = b.type,
                z = 0,
                z = b.touches,
                A = b.changedTouches,
                u = 0,
                D = 0,
                v = 0;
            switch (h) {
                case "touchstart":
                case "MSPointerDown":
                case "pointerdown":
                    moveSpace = moveCount = 0;
                    ja = !1;
                    q = "touchstart" == h ? z.length : q + 1;
                    t = !1;
                    E = Date.now();
                    f = 1 == q && 200 > E - e;
                    v = z[0];
                    k = v.identifier;
                    D = Aa(v.clientX, v.clientY, m.getElement());
                    g = D.x | 0;
                    l = D.y | 0;
                    n = !0;
                    2 != z.length ? ja = !1 : (u = z[1].screenX - z[0].screenX, v = z[1].screenY - z[0].screenY, ja = 100 < Math.abs(v) || 350 < Math.abs(u));
                    (f || 2 < q) && cancelDefault(b);
                    if (3 == q) {
                        for (var D = v = u = 0, h = 9999, A = 0, C = z.length; A < C; A++) z[A].screenY > D && (D = z[A].screenY, u = A), z[A].screenY < h && (h = z[A].screenY, v = A);
                        W = [{
                            screenX: z[v].screenX,
                            screenY: z[v].screenY,
                            identifier: z[v].identifier
                        }, {
                            screenX: z[u].screenX,
                            screenY: z[u].screenY,
                            identifier: z[u].identifier
                        }]
                    }
                    break;
                case "pointermove":
                case "MSPointerMove":
                    if (1 < q) break;
                case "touchmove":
                    if (ja) return;
                    1 == q && r() && (y.disableScoll || window.scrollTo(0, 0), cancelDefault(b));
                    v = A[z.length - 1];
                    if (v.identifier != k && (v = c(A, k), !v)) {
                        cancelDefault(b);
                        return
                    }
                    D =
                        Aa(v.clientX, v.clientY, m.getElement());
                    u = D.x | 0;
                    D = D.y | 0;
                    if (n) {
                        if (0 === u - g && 0 === D - l) return;
                        if (Math.abs(u - g) < B && Math.abs(D - l) < B) {
                            cancelDefault(b);
                            return
                        }
                        n = !1;
                        z = Date.now() - E;
                        if ((t = 180 > z) && !r() && 1 == q) {
                            ja = !0;
                            return
                        }
                        a.touchstart({
                            x: g,
                            y: l,
                            flick: t,
                            pointes: q,
                            screenX: v.screenX,
                            screenY: v.screenY,
                            moved: !0,
                            target: b.target
                        })
                    }
                    cancelDefault(b);
                    a.touchmove({
                        x: u,
                        y: D,
                        flick: t,
                        pointes: q,
                        moved: !0,
                        screenX: v.screenX,
                        screenY: v.screenY,
                        target: b.target
                    });
                    break;
                case "MSPointerUp":
                case "touchend":
                case "pointerup":
                    if (ja) return;
                    if (3 == A.length + z.length) {
                        a.touchend({
                            x: u,
                            y: D,
                            flick: t,
                            pointes: q,
                            moved: !n,
                            target: b.target,
                            gesture: d(z, A)
                        });
                        q = 0;
                        break
                    } else {
                        if (2 < q) {
                            q = 0;
                            break
                        }
                        if (v = c(A, k)) h = Date.now(), D = Aa(v.clientX, v.clientY, m.getElement()), u = D.x | 0, D = D.y | 0, t ? a.touchend({
                            x: u,
                            y: D,
                            flick: !0,
                            pointes: q,
                            moved: !n,
                            screenX: v.screenX,
                            screenY: v.screenY,
                            target: b.target
                        }) : (z = h - E, n ? (e = h, f ? cancelDefault(b) : (p = u, ka = D), 500 > z ? (e = h, a.touchstart({
                            x: p,
                            y: ka,
                            flick: !1,
                            pointes: q,
                            screenX: v.screenX,
                            screenY: v.screenY,
                            moved: !1,
                            target: b.target
                        }), a.touchend({
                            x: p,
                            y: ka,
                            flick: !1,
                            pointes: q,
                            moved: !1,
                            screenX: v.screenX,
                            screenY: v.screenY,
                            target: b.target
                        })) : a.longpress({
                            x: u,
                            y: D,
                            flick: !1,
                            pointes: q,
                            moved: !1,
                            screenX: v.screenX,
                            screenY: v.screenY,
                            target: b.target
                        })) : a.touchend({
                            x: u,
                            y: D,
                            flick: !1,
                            pointes: q,
                            moved: !0,
                            screenX: v.screenX,
                            screenY: v.screenY,
                            target: b.target
                        }))
                    }
                    q = 0;
                    break;
                case "MSPointerCancel":
                case "touchcancel":
                    q = 0
            }
            f && cancelDefault(b)
        }
    }

    function eb() {
        l(!0, 14);
        l(!1, 14)
    }

    function db(a) {
        try {
            a.select ? a.select() : hi5.browser.selectEditable(a)
        } catch (b) {
            svGlobal.logger.info(b)
        }
    }

    function fb() {
        function a() {
            h.focus()
        }

        function b(c, b) {
            var d = document.createElement("a");
            d.href = "#";
            d.accessKey = c;
            d.onfocus = a;
            d.style.position = "absolute";
            d.style.width = 1;
            d.style.height = 1;
            d.style.left = 0;
            d.style.top = b + "px";
            return d
        }
        var d = hi5.browser.isIE,
            c = document.createElement(d ? "textarea" : "div"),
            h = this;
        this.setFontSize = function(a) {
            c.style.fontSize = y.inputFontSize || a
        };
        d ? (c.style.opacity = 0, c.readOnly = H && hi5.browser.isMetro ? !0 : !1) : c.contentEditable = !H || hi5.browser.isChrome && (hi5.browser.isWindows || hi5.browser.isCrOS) ?
            !0 : !1;
        c.accessKey = "f";
        c.id = "wsinput";
        c.tabIndex = 1;
        c.style.opacity = 0;
        c.style.resize = "none";
        c.style.position = "absolute";
        c.style.margin = "0";
        c.style.border = "none";
        c.style.outline = "none";
        var k = hi5.tool.getPos(f, !0);
        c.style.left = k.x + "px";
        c.style.top = k.y + "px";
        c.style.paddingRight = 0;
        c.style.paddingBottom = 0;
        c.style.width = "10px";
        c.style.height = "10px";
        c.style.zIndex = 88;
        c.style.cursor = "default";
        c.style.fontWeight = "normal";
        c.style.fonStyle = "normal";
        c.style.overflow = "hidden";
        G = new u(c);
        G.onbackspace = eb;
        k = f.parentNode;
        k.appendChild(c);
        T && (k.appendChild(b("E"), 60), k.appendChild(b("V"), 61), k.appendChild(b("A"), 62), k.appendChild(b("T"), 63), k.appendChild(b("H"), 64));
        var q = c.style.opacity,
            g = c.style.textIndent;
        this.resetCSS = function() {
            _fontSize = c.style.fontSize;
            q = c.style.opacity;
            c.style.opacity = 0;
            c.style.textIndent = 0
        };
        this.restoreCSS = function() {
            c.style.opacity = q;
            c.style.textIndent = g
        };
        this.getValue = function() {
            return d ? c.value : c.innerHTML
        };
        this.setValue = function(a) {
            G && (G.disableTextInput = !0);
            d ? c.value = a : c.innerHTML = a;
            G && (G.disableTextInput = !1)
        };
        this.focus = function() {
            h.setValue(" ");
            C(c)
        };
        this.setContentEditable = function(a) {
            d ? (a = "true" == a, c.readOnly == a && (c.readOnly = !a)) : c.contentEditable != a && (c.contentEditable = a, "true" == a && T && hi5.browser.selectEditable(c))
        };
        this.isIMEMode = !1;
        this.setIMEStatus = function(a) {
            a ? h.isIMEMode || (d && (c.style.background = "transparent", c.style.opacity = 1), h.isIMEMode = !0) : h.isIMEMode && (d && (c.style.background = "", c.style.opacity = 0), h.isIMEMode = !1)
        };
        this.adjust = function(a) {
            var b = hi5.tool.getPos(f, !0),
                d = e.railWin ? Math.min(window.innerWidth - b.x, N) : N,
                k = e.railWin ? Math.min(window.innerHeight - b.y, L) : L,
                q = Math.min(window.innerWidth - b.x, N),
                g = Math.min(window.innerHeight - b.y, L),
                q = Math.round(.7 * q);
            a = Math.round(g * (a ? .99 : .7));
            d -= q;
            k -= a;
            y.disableAdjust && (a = q = 0, d = f.offsetWidth + "px", k = f.offsetHeight + "px");
            c.style.width = d + "px";
            c.style.height = k + "px";
            c.style.paddingLeft = q + "px";
            c.style.paddingTop = a + "px";
            c.style.left = b.x + "px";
            c.style.top = b.y + "px";
            c.style.textIndent = -(q + (T ? 48 : 0)) + "px";
            hi5.browser.isFirefox && (c.style.fontSize =
                0);
            H && hi5.browser.isChrome && h.setFontSize("2em");
            y.disableScoll || window.scrollTo(0, 0)
        };
        this.remove = function() {
            c.parentNode && c.parentNode.removeChild(c)
        };
        this.hide = function() {
            c.style.visibility = "hidden"
        };
        this.getElement = function() {
            return c
        };
        this.select = function() {
            db(c)
        }
    }

    function Pa() {
        if (!g) {
            var a = f.parentNode;
            g = a.querySelector('canvas[name="svImgCursor"]');
            if (!g) {
                g = document.createElement("canvas");
                g.name = "svImgCursor";
                g.style.position = "absolute";
                g.style.left = 90;
                g.style.top = 90;
                g.scrX = 0;
                g.scrY = 0;
                g.hotX =
                    10;
                g.hotY = 10;
                g.width = g.height = 32;
                "ontouchstart" in window ? (g.addEventListener("touchstart", O, !1), g.addEventListener("touchend", O, !1), g.addEventListener("touchmove", O, !1), g.addEventListener("touchcancel", O, !1)) : navigator.pointerEnabled ? (g.addEventListener("pointerdown", O, !1), g.addEventListener("pointerup", O, !1), g.addEventListener("pointermove", O, !1), g.addEventListener("pointercancel", O, !1)) : navigator.msPointerEnabled && (g.addEventListener("MSPointerDown", O, !1), g.addEventListener("MSPointerUp", O, !1),
                    g.addEventListener("MSPointerMove", O, !1), g.addEventListener("MSPointerCancel", O, !1));
                g.setCursor = function(a) {
                    var c = a.width,
                        b = a.height,
                        k = a.rawData,
                        q = c * b,
                        e = 0,
                        E = 0;
                    if (!(1 > q)) {
                        g.hotX = a.hotX;
                        g.hotY = a.hotY;
                        g.width = c;
                        g.height = b;
                        a = g.getContext("2d");
                        var f = a.createImageData(c, b),
                            l = f.data;
                        if (k) {
                            for (c = 0; c < q; c++) e = k[c], l[E++] = e & 255, l[E++] = e >> 8 & 255, l[E++] = e >> 16 & 255, l[E++] = e >> 24 & 255;
                            a.putImageData(f, 0, 0)
                        } else a.fillStyle = "rgba(0,0,0,0)", a.fillRect(0, 0, c, b)
                    }
                };
                if (Ba) g.setCursor(Ba);
                else {
                    var b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -1, -16777216, -16777216, -16777216, -16777216, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -16777216, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -16777216, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0
                    ];
                    g.setCursor({
                        rawData: b,
                        width: 32,
                        height: 32
                    })
                }
                a.appendChild(g)
            }
        }
    }

    function gb(a) {
        if (!1 !== y.disableScrollbars) {
            var b = document.body;
            a ? (Qa = a, b.style.overflow = a) : (Qa = (a = N <= window.innerWidth && L <= window.innerHeight) ? "hidden" : "visible", b.style.overflow = Qa)
        }
    }

    function ta(a) {
        var b = f.parentNode,
            d;
        d = window.innerWidth;
        var c = window.innerHeight;
        (d = Math.max(N, L) < Math.max(d, c) && Math.min(N, L) < Math.min(d, c)) ? 1 != P && (hi5.tool.scale(b, 1), P = X = 1): (document.body.style.overflow = "hidden", P = X = a ? Math.min(window.innerWidth /
            N, window.innerHeight / L) : 1, hi5.tool.scale(b, P, P))
    }

    function hb() {
        var a = chrome.app.window.current();
        a && a.fullscreen()
    }

    function Nb() {
        document && t && (document.removeEventListener("paste", t.onPaste, !1), document.removeEventListener("copy", t.onCopy, !1), document.removeEventListener("cut", t.onCopy, !1));
        if (window) {
            window.removeEventListener("resize", ib, !1);
            window.removeEventListener("beforeunload", jb, !1);
            window.removeEventListener("focus", kb, !1);
            window.removeEventListener("blur", lb, !1);
            window.removeEventListener("unload",
                Ca, !1);
            g && g.parentNode && (g.parentNode.removeChild(g), g = null);
            e && e.toolbar && (e.toolbar.setFadable = null, e.toolbar.startFade = null, e.toolbar = null);
            try {
                ua && ua.parentNode && (ua.parentNode.removeChild(ua), ua = null), m && m.remove(), m = null
            } catch (b) {}
        }
        var a = window;
        try {
            for (;;) {
                a.document.removeEventListener("mouseup", mb, !1);
                if (a.parent == a) break;
                a = a.parent
            }
        } catch (b) {}
    }

    function Ra(a) {
        a || (a = "div");
        var b = document.createElement(a),
            d = document.body;
        b.id = "_tmpEditable";
        "div" == a && (b.contentEditable = !0);
        b.style.position =
            "absolute";
        b.style.zIndex = 9999;
        b.style.left = d.scrollLeft + 50 + "px";
        b.style.top = d.scrollTop + 50 + "px";
        b.tabIndex = 2;
        b.style.outline = "none";
        b.style.opacity = 0;
        d.appendChild(b);
        return b
    }

    function kb(a) {
        Sa.clearPDF();
        e.focused = !0;
        p.onfocus(a);
        p.hasSurfaceBlurIn && p.hasSurfaceBlurIn(2E3) || (ma = !0);
        Da = !0;
        p.send("891");
        R.sendMissKey()
    }

    function jb(a) {
        var b = __svi18n.remoteApp.close,
            d = nb || !e.railWin || !e.railWin.isRunning() || !b;
        if (!d && (a || (a = window.event), 2 != p.getAppMode())) return e.showMessage(b), a && (a.returnValue =
            b), b
    }

    function Ca(a) {
        if (e && (e.focused = !1, e.onunload)) e.onunload()
    }

    function Ta() {
        m && (m.getElement().oncontextmenu = function() {
            return !1
        }, T || (m.getElement().onselectstart = function() {
            return !1
        }))
    }

    function ob() {
        m && (m.getElement().oncontextmenu = null, m.getElement().onselectstart = null)
    }

    function ib(a) {
        m && m.adjust();
        if (na) ta(!0);
        else if (!(fa && 2500 > Date.now() - fa)) {
            var b = hi5.browser.isWindows && !hi5.browser.isMetro;
            if (!H || b && !fa) p.onresize(a)
        }
    }

    function lb() {
        e && (e.focused = !1, e.blurTime = Date.now())
    }

    function Ob() {
        window.svSurface ||
            (window.svSurface = e);
        window.addEventListener("resize", ib, !1);
        if (!aa) {
            var a = !hi5.browser.isChromeApp;
            a && window.addEventListener("beforeunload", jb, !1);
            a ? window.addEventListener("unload", Ca, !1) : chrome.runtime.onSuspend.addListener(Ca);
            Ta();
            window.addEventListener("focus", kb, !1);
            window.addEventListener("blur", lb, !1);
            hi5.browser.isChromeApp && chrome.app.window.current().onMaximized.addListener(hb);
            (a = hi5.$("saveSession")) && a.addEventListener("change", function(a) {
                p.saveSession({
                    save: a.target.checked
                })
            })
        }
    }

    function pb() {
        if (!M) {
            var a = hi5.$("touchGesture");
            a && (a.style.display = "block");
            if (a = hi5.$("extKBD")) a.onchange = function(a) {
                e.setExtKeyboard(a.target.checked)
            };
            M = hi5.$("svTouchInput");
            try {
                window.parent == window || M || (M = window.parent.document.getElementById("svTouchInput"))
            } catch (b) {}
            M && (hi5.browser.isWindows && (a = document.createElement("div"), a.contentEditable = !0, a.id = "svTouchInput", M.parentNode.replaceChild(a, M), M = a), hi5.browser.isChrome && (M.style.fontSize = "2em"), F = new u(M), F.onkeydown = F.onkeyup = qb, F.ontextinput =
                rb, F.onbackspace = eb)
        }
    }

    function va(a, b) {
        function d(a, c) {
            var d = document.createElement("span");
            d.data_path = a;
            d.className = "path";
            d.innerHTML = c;
            d.onclick = function() {
                va(this.data_path, b)
            };
            return d
        }

        function c(a) {
            for (var c = k; c.hasChildNodes();) c.removeChild(c.firstChild);
            var b = d("/", "&nbsp&nbsp&nbsp/");
            c.appendChild(b);
            if ("/" != a && "" !== a) {
                a = a.split("/");
                for (var h = "/", e = 0, f = a.length; e < f; e++) b = a[e], "" !== b && (h = h + a[e] + "/", b = d(h, b + "/"), c.appendChild(b))
            }
        }

        function h(a) {
            function d(c) {
                c || (c = k.getValue("Name"));
                var b =
                    a.parent;
                if ("" === b || "/" != b.charAt(b.length - 1)) b += "/";
                return b + c
            }
            a.error && e.showMessage(__svi18n.file[a.error]);
            var h = new hi5.DataTable(a),
                k = new hi5.DataGrid(hi5.$("filelist"));
            k.dataTable = h;
            var f = hi5.tool.bytesToSize;
            k.beforeDisplayValue = function(a, c) {
                var b = h.cols[a].name;
                return "Date Modified" == b ? (new Date(c)).toLocaleString() : "Size" == b ? f(c) : "Type" == b && "folder" == c ? __svi18n.file.folder : "Name" == b ? decodeURIComponent(c) : c
            };
            k.onrowclick = function(c) {
                var h = k.getValue("Name"),
                    e = k.getValue("Type"),
                    f = d(h);
                c = c.target.name;
                "delete" == c ? (K.removeFile(f), va(a.parent, b)) : "folder" == e ? (e = "/" == a.parent ? "" : a.parent, va(e + "/" + h, b)) : ("view" == c && (f += "&action=view"), p.getFile(f))
            };
            k.beforeAppendRow = function(a) {
                var c;
                c = h.getValue(h.getColNo("Type"));
                if ("folder" == c) {
                    if (c = a.querySelector('img[name="download"]')) c.style.visibility = "hidden"
                } else {
                    a.draggable = !0;
                    c = k.getValue("Name");
                    var b = d(c),
                        b = "application/octet-stream:" + c + ":" + p.getFileLink(b);
                    a.addEventListener("dragstart", function(a) {
                        a.dataTransfer.setData("DownloadURL",
                            b)
                    }, !1);
                    if (10 < c.length && ".uploading" == c.substring(c.length - 10)) {
                        if (c = a.querySelector('img[name="download"]')) c.style.visibility = "hidden";
                        if (c = a.querySelector('img[name="view"]')) c.style.visibility = "hidden"
                    }
                }
            };
            k.open();
            c(a.parent);
            var g = document.getElementById("__diskSpace");
            g && (g.innerHTML = hi5.tool.bytesToSize(a.freeSpace) + "/" + hi5.tool.bytesToSize(a.totalSpace));
            b.resize()
        }
        var k = hi5.$("parentPath");
        k.currentDir || (k.currentDir = "/");
        "." == a ? a = k.currentDir : k.currentDir = a;
        k.currentDir = a;
        p.getShareFiles(a,
            h)
    }

    function sb(a) {
        a && cancelDefault(a);
        a = hi5.$("filecontainer");
        Y = new hi5.Lightbox(a);
        va(".", Y);
        Y.show()
    }

    function Ua() {
        var a = hi5.$("svToolbar");
        if (a) {
            for (var b = a.childNodes, d = !1, c = 0, h = b.length; c < h; c++)
                if (1 == b[c].nodeType && -1 == ["svTouchInput", "svCloud", "svInfo"].indexOf(b[c].id)) {
                    d = !0;
                    break
                }
            b = hi5.$("appinfo");
            if (d = e.showToolbar && (H || K || b || d)) {
                if (d = null === e.toolbar) e.toolbar = new hi5.Toolbar(a);
                H ? e.toolbar.activeObj = M : (a = hi5.$("svTouchInput")) && a.parentNode.removeChild(a);
                if (a = e.toolbar.getButton("svCloud")) K ?
                    (a.style.display = "", a.onclick = sb) : a.style.display = "none";
                a = y.toolbar.fadeDelay || 5E3;
                new hi5.Fadable(e.toolbar, a, m.getElement());
                a = y.toolbar.fadable;
                e.toolbar.setFadable(a);
                a && (e.toolbar.style.display = "none");
                if (a = e.toolbar.getButton("svInfo")) b ? (a.style.display = "", d && (a.onclick = function(a) {
                    cancelDefault(a);
                    a = p.getAppInfo();
                    var c = hi5.$("numericId");
                    c && (c.innerHTML = a.numericId);
                    if (c = hi5.$("connectingTo")) c.innerHTML = a.server;
                    if (c = hi5.$("joinLink")) c.href = c.innerHTML = a.joinLink;
                    a = new hi5.Lightbox(hi5.$("appinfo"));
                    a.show();
                    ob();
                    a.onclose = Ta
                })) : a.style.display = "none";
                if (e.onloadtoolbar) e.onloadtoolbar(e.toolbar)
            }
        }
    }

    function tb(a) {
        K.addFiles(a.target.files);
        a = hi5.$("uploadfile");
        var b = a.cloneNode(!0),
            d = a.parentNode;
        d.replaceChild(b, a);
        b.addEventListener("change", tb, !1)
    }

    function Pb() {
        var a = m.getElement();
        K && !aa && (Ea = new svGlobal.util.MapDisk(a, K), Fa = new svGlobal.util.MapDisk(hi5.$("filecontainer"), K), hi5.$("uploadfile").addEventListener("change", tb, !1))
    }

    function mb(a) {
        a.target != m.getElement() && oa(ub, vb, a.button)
    }

    function Va(a, b, d) {
        if (g) {
            var c = g.scrX,
                h = g.scrY;
            a = c + a;
            b = h + b;
            0 > a ? a = 0 : a > N && (a = N - 1);
            0 > b ? b = 0 : b > L && (b = L - 1);
            g.scrX = a;
            g.scrY = b;
            g.style.left = a - g.hotX + "px";
            g.style.top = b - g.hotY + "px";
            J && !d && p.sendInput("82" + a + "\t" + b)
        }
    }

    function wa(a, b, d) {
        g || Pa();
        Va(a - g.scrX, b - g.scrY, d)
    }

    function Wa(a, b, d, c) {
        var h;
        switch (a) {
            case "touchstart":
                Xa = !1;
                0 === g.scrX && 0 === g.scrY && wa(b - 50, d - 50);
                c && p.sendInput("80" + g.scrX + "\t" + g.scrY + "\t0");
                break;
            case "touchmove":
                c = b - Ga;
                a = d - pa;
                if (0 === c && 0 === a) return;
                h = 5 > Math.abs(wb) && 5 > Math.abs(xb) && (7 < Math.abs(c) ||
                    7 < Math.abs(a));
                h || (Va(c, a), Xa = !0);
                wb = c;
                xb = a;
                break;
            case "touchend":
                (a = !Xa && !c) && p.sendInput("80" + g.scrX + "\t" + g.scrY + "\t0"), (a || c) && p.sendInput("81" + g.scrX + "\t" + g.scrY + "\t0")
        }
        Ga = b;
        pa = d
    }

    function O(a) {
        J && ("ontouchstart" in window ? qa.handle(a) : qa.handlePointer(a))
    }

    function qb(a) {
        if (!J) return !1;
        R.check(a);
        var b = ba.getKeyCode(a),
            d = "keydown" == a.type;
        d && m && m.setIMEStatus(229 == b);
        if (18 == b && (yb && d && (Ya = 2 == (a.location || a.keyLocation)), Ya)) return !0;
        if (zb(a, b, d)) return cancelDefault(a);
        17 != b || d || (xa = !1);
        var c = Za(b);
        if (0 < c) {
            l(d, c);
            c = a.target == m.getElement();
            if (b = d && ra && m && 17 == b && (hi5.browser.isFirefox || hi5.browser.isSafari || T && !c)) c ? (m.setValue("`\t`"), m.select()) : (F.setValue("`\t`"), F.select());
            return cancelDefault(a)
        }
        if (a.ctrlKey || a.altKey && !Ya || a.metaKey) return (c = 86 == b && (a.ctrlKey || a.metaKey) && !(a.ctrlKey && a.altKey) && da) || V(d, b), d && (Ha = b), 17 == b || (a.ctrlKey || a.metaKey) && (86 == b || 67 == b || 88 == b) ? (!d || 67 != b && 88 != b || (xa = !0), !0) : a.altKey && !a.ctrlKey || a.ctrlKey && !a.altKey ? cancelDefault(a) : !0;
        if (!(b != Ha || d || a.ctrlKey &&
                a.altKey)) return V(!1, b), Ha = 0, !0;
        Ha = 0;
        return !0
    }

    function zb(a, b, d) {
        if (!a.altKey) return !1;
        switch (b) {
            case 8:
            case 35:
                if (!a.ctrlKey && !a.metaKey) return !1;
                l(d, 211);
                break;
            case 33:
                l(d, 15);
                break;
            case 34:
                d ? (l(!0, 42), l(!0, 15)) : (l(!1, 15), l(!1, 42));
                break;
            case 45:
                l(d, 1);
                break;
            case 36:
                d ? (l(!1, 56), l(!0, 29), l(!0, 1)) : (l(!1, 1), l(!1, 29));
                break;
            default:
                return !1
        }
        return !0
    }

    function Qb(a) {
        if (Da) {
            R.ignoreText = !0;
            var b = String.fromCharCode(a.charCode || a.keyCode || w.which);
            b.toUpperCase() != b.toLowerCase() && (b = b.toUpperCase() ==
                b, a = a.shiftKey ? !b : b, Da = !1, p.capsLock != a && (p.sendKeyboardSynchronize(!1, p.numLock, a), R.preKeyCode && (S(!0, 14), S(!1, 14), a = ba.getScancodeByKeyCode(R.preKeyCode), S(!0, a), S(!1, a))))
        }
    }

    function Rb(a) {
        if (!J) return !1;
        R.check(a);
        var b = ba.getKeyCode(a),
            d = "keydown" == a.type,
            c = R.preKeyCode;
        d ? m && m.setIMEStatus(229 == b) : m && m.isIMEMode && T && m && m.setIMEStatus(!1);
        if (zb(a, b, d)) return cancelDefault(a);
        R.preKeyCode = b;
        if (229 == b || 229 == c && !d) return !0;
        var c = b,
            h = d;
        44 == c ? (l(!0, 170), l(!0, 183), c = !0) : 19 == c ? (h ? (l(!0, 225), l(!0, 29),
            l(!0, 69), l(!0, 225), l(!0, 157), l(!0, 197)) : l(!1, 29), c = !0) : c = !1;
        if (c) return cancelDefault(a);
        c = ba.getScancode(a);
        h = 1 > Za(b) && !a.ctrlKey && !a.altKey && !a.metaKey;
        c || (c = Za(b) || 0);
        var k = 86 == b && (Ab && !d || (a.ctrlKey || a.metaKey) && !(a.ctrlKey && a.altKey)) && da;
        0 < c && !k ? l(d, c) : k || V(d, b);
        17 != b && (Ab = k);
        return 17 == b || (a.ctrlKey || a.metaKey) && (86 == b || 67 == b || 88 == b) ? (d && (17 == b && ra && m && (m.setValue("`\t`"), m.select()), 67 == b || 88 == b) && (xa = !0), 17 != b || d || (xa = !1), !0) : (b = 144 == b || 16 == b || Da && h) ? !1 : cancelDefault(a)
    }

    function rb(a) {
        if (J)
            if (R.ignoreText) R.ignoreText = !1;
            else if (a = a.data, !(!H && Ia && 1 == a.length && 128 > a.charCodeAt(0)) && "`\t`" != a) {
            var b = ga || ha;
            b && (a = a.toLowerCase());
            T && (a = a.replace(/\u00a0/g, " "));
            p.sendInput("86" + a + "\t" + (b || Ia ? 1 : 0));
            Z && Z.resetModifier()
        }
    }

    function Bb() {
        l(!0, 29);
        V(!0, 86);
        V(!1, 86);
        l(!1, 29)
    }

    function Sb(a) {
        var b = 0 === a.types.length || a.equals(t.clipData),
            d = b ? "" : a.types.join(","),
            c = 0,
            h = !0;
        b || ((b = a.getData("text/html")) ? (b = b.replace(/(<([^>]+)>)|\r?\n/gi, ""), -1 == d.indexOf("text/richtext") && (d += ",text/richtext")) : b = a.getData("text/plain"), b &&
            (c = b.hashCode()), p.send("880" + d + "\t" + c), t.clipData = a, e.onclipdata && (h = !e.onclipdata(t.clipData)));
        h && setTimeout(Bb, 500)
    }

    function S(a, b) {
        if (e.onscancode) {
            var d = e.onscancode(a, b);
            if (d) {
                for (var c = 0, h = d.length; c < h; c++) p.sendInput("84" + (d[c].down ? 0 : 49152) + "\t" + d[c].key);
                return
            }
        }
        p.sendInput("84" + (a ? 0 : 49152) + "\t" + b)
    }

    function l(a, b) {
        if (J) {
            switch (b) {
                case 221:
                    if (a) {
                        S(!0, 221);
                        S(!1, 221);
                        return
                    }
                    break;
                case 58:
                    if (a && (p.capsLock = !p.capsLock, Cb)) {
                        S(!0, 58);
                        S(!1, 58);
                        return
                    }
                    break;
                case 69:
                    a && (p.numLock = !p.numLock);
                    break;
                default:
                    70 < b && 84 > b && (p.numLock || p.sendKeyboardSynchronize(!1, !0, p.capsLock))
            }
            if (184 == b) S(a, 29), S(a, 56);
            else {
                var d = !a && (hi5.browser.isCrOS && 61 < b && 69 > b || 58 == b && Cb || 95 == b);
                d && S(!0, b);
                95 != b && S(a, b)
            }
        }
    }

    function V(a, b) {
        J && (111 == b ? a && p.sendInput("86/\t1") : p.sendInput("8B" + (a ? 0 : 49152) + "\t" + b))
    }

    function ya(a, b, d, c, h) {
        c || (c = P);
        h || (h = X);
        $a[d] || ($a[d] = !0, a = a / c | 0, b = b / h | 0, e.beforemousedown && e.beforemousedown(a, b, d), p.sendInput("80" + a + "\t" + b + "\t" + d))
    }

    function Ma(a) {
        var b = a.target;
        C(b);
        if (!J) return !1;
        m && m.setIMEStatus(!1);
        a.ctrlKey || a.shiftKey || a.metaKey || a.altKey || R.sendMissKey();
        b = za(a);
        ya(b.x, b.y, a.button);
        return cancelDefault(a)
    }

    function Ja(a, b, d, c) {
        d || (d = P);
        c || (c = X);
        ub = a;
        vb = b;
        p.sendInput("82" + a / d + "\t" + b / c)
    }

    function Na(a) {
        if (!J) return !1;
        g && "-30px" != g.style.left && (g.style.left = "-30px");
        var b = za(a);
        Ja(b.x, b.y);
        return cancelDefault(a)
    }

    function oa(a, b, d, c, h) {
        c || (c = P);
        h || (h = X);
        $a[d] = !1;
        a = a / c | 0;
        b = b / h | 0;
        p.sendInput("81" + a + "\t" + b + "\t" + d);
        e.aftermouseup && e.aftermouseup(a, b, d);
        0 == d && Db && hi5.browser.isChrome && t.waitForCopyContent();
        Db = 2 == d
    }

    function Oa(a) {
        if (!J) return !1;
        var b = za(a);
        oa(b.x, b.y, a.button);
        return cancelDefault(a)
    }

    function Eb(a, b, d, c, h) {
        c || (c = P);
        h || (h = X);
        p.sendInput("83" + a / c + "\t" + b / h + "\t" + d)
    }

    function Fb(a, b) {
        if (!J) return !1;
        Eb(b.x, b.y, 0 > a ? 1 : 0);
        return !1
    }

    function Za(a) {
        (a = Tb[a]) || (a = -1);
        return a
    }

    function Gb(a) {
        return a.none ? "none" : a.url ? "url(" + a.url + "), pointer" : 0 == a.data.indexOf("data:image/") ? "url(" + a.data + ") " + a.hotX + " " + a.hotY + ", default" : a.data
    }
    f || (f = hi5.$("remotectrl"));
    if (window.svSurface && svSurface.canvas == f &&
        svSurface.railWin) return svSurface.railWin.mainWin = null, window.svSurface;
    var H = hi5.browser.isTouch,
        ab = !1,
        p = null,
        na = !1,
        P = 1,
        X = 1;
    f.style.outline = "none";
    var N = 0,
        L = 0,
        Q = f.getContext("2d"),
        G = null,
        F = null,
        Hb = !1,
        ga = !1,
        ha = !1,
        sa = !1,
        nb = !1,
        ma = !0,
        K = null,
        da = !0,
        xa = !1,
        Ab = !1;
    this.context = Q;
    this.fileProgress = null;
    this.blurTime = 0;
    var e = this,
        J = !0,
        ea = !1,
        aa = !1,
        Ia = !1,
        ua = null,
        Y = null,
        g = null,
        Ba = null,
        qa = null,
        M = null,
        fa = 0,
        Ga = -1,
        pa = -1,
        wb = 0,
        xb = 0,
        Xa = !1,
        Qa = null,
        Ib = document.queryCommandSupported("copy"),
        ub = 0,
        vb = 0,
        Da = !0,
        Jb = 0,
        Kb = 0,
        Ea =
        null,
        Fa = null;
    this._cr = [82, 69, 77, 79, 84, 69, 83, 80, 65, 82, 75];
    window.svSurface = this;
    var y = hi5.appcfg || {
        img: {},
        toolbar: {
            fadable: !0
        }
    };
    this.setConfig = function(a) {
        y = a
    };
    this.railWin = this.toolbar = null;
    this.focused = !1;
    this.showToolbar = !0;
    this.canvas = f;
    this.mouseMoveEmu = this.alwaysPaste = !1;
    "visible" in y.toolbar && (this.showToolbar = y.toolbar.visible);
    var yb = !1,
        Ya = !1,
        za = hi5.browser.getMousePos,
        Aa = hi5.browser.calMousePos;
    this.getWindow = function() {
        return window
    };
    this.getScale = function() {
        return {
            x: P,
            y: X
        }
    };
    var ca = null,
        Z = null,
        Ka = "",
        ra = !hi5.browser.isChromeApp && !y.copyDialog,
        T = hi5.browser.isIE;
    this.getThumbnail = function(a) {
        a = a || 64;
        ca || (ca = document.createElement("canvas"));
        var b = Math.floor(f.height / f.width * a);
        ca.width != a && (ca.width = a);
        ca.height != b && (ca.height = b);
        ca.getContext("2d").drawImage(f, 0, 0, f.width, f.height, 0, 0, a, b);
        return ca.toDataURL()
    };
    this.initChat = function(a) {
        var b = document.getElementById("chatWindow");
        hi5.Dragable(b);
        return new hi5.Chat(b, a)
    };
    this.equals = function(a) {
        return f == a.canvas
    };
    this.getFreeSpace =
        function() {
            var a = hi5.tool.getPos(f),
                b = window.innerWidth - a.x,
                a = window.innerHeight - a.y;
            return {
                width: b,
                height: a
            }
        };
    var ba = new function() {
        var a = 1033,
            b = hi5.browser.isFirefox,
            d = hi5.browser.isMacOS || hi5.browser.isiOS,
            c = [0],
            h = null;
        c[8] = 14;
        c[9] = 15;
        c[12] = 76;
        c[13] = 28;
        c[16] = 42;
        c[17] = 29;
        c[18] = 56;
        c[19] = 197;
        c[20] = 58;
        c[27] = 1;
        c[33] = 201;
        c[34] = 209;
        c[35] = 207;
        c[36] = 199;
        c[37] = 203;
        c[38] = 200;
        c[39] = 205;
        c[40] = 208;
        c[44] = 55;
        c[45] = 210;
        c[46] = 211;
        c[48] = 11;
        c[49] = 2;
        c[50] = 3;
        c[51] = 4;
        c[52] = 5;
        c[53] = 6;
        c[54] = 7;
        c[55] = 8;
        c[56] = 9;
        c[57] = 10;
        c[65] = 30;
        c[66] = 48;
        c[67] = 46;
        c[68] = 32;
        c[69] = 18;
        c[70] = 33;
        c[71] = 34;
        c[72] = 35;
        c[73] = 23;
        c[74] = 36;
        c[75] = 37;
        c[76] = 38;
        c[77] = 50;
        c[78] = 49;
        c[79] = 24;
        c[80] = 25;
        c[81] = 16;
        c[82] = 19;
        c[83] = 31;
        c[84] = 20;
        c[85] = 22;
        c[86] = 47;
        c[87] = 17;
        c[88] = 45;
        c[89] = 21;
        c[90] = 44;
        c[91] = 219;
        c[92] = 220;
        c[93] = 221;
        c[96] = 82;
        c[97] = 79;
        c[98] = 80;
        c[99] = 81;
        c[100] = 75;
        c[101] = 76;
        c[102] = 77;
        c[103] = 71;
        c[104] = 72;
        c[105] = 73;
        c[106] = 55;
        c[107] = 78;
        c[109] = 74;
        c[110] = 83;
        c[111] = 181;
        c[112] = 59;
        c[113] = 60;
        c[114] = 61;
        c[115] = 62;
        c[116] = 63;
        c[117] = 64;
        c[118] = 65;
        c[119] = 66;
        c[120] = 67;
        c[121] = 68;
        c[122] = 87;
        c[123] = 88;
        c[144] = 69;
        c[145] = 70;
        c[154] = 183;
        c[166] = 59;
        c[167] = 60;
        c[168] = 61;
        c[173] = 66;
        c[174] = 67;
        c[175] = 68;
        c[182] = 63;
        c[183] = 62;
        c[216] = 64;
        c[217] = 65;
        c[186] = 39;
        c[187] = 13;
        c[188] = 51;
        c[189] = 12;
        c[190] = 52;
        c[191] = 53;
        c[192] = 41;
        c[219] = 26;
        c[220] = 43;
        c[221] = 27;
        c[222] = 40;
        c[224] = 29;
        c[225] = 184;
        var k = function(a) {
                a = a.keyCode;
                if (b) switch (a) {
                    case 173:
                        return 189;
                    case 61:
                        return 187;
                    case 59:
                        return 186;
                    case 224:
                        return 17
                }
                return a
            },
            e = d ? function(a) {
                switch (a) {
                    case 91:
                    case 93:
                        return 17;
                    case 17:
                        return 91;
                    case 229:
                        return 69
                }
                return 0
            } :
            null;
        this.setLayout = function(b) {
            a = b;
            var d = null,
                k = "K" + b;
            k in f && (d = f[k]());
            null === d && (1033 == b || 0 > b || 3758096384 < b) && (d = c);
            h = d;
            null !== h && svGlobal.logger.info("Keyboard layout: " + a)
        };
        this.getKeyCode = function(a) {
            var c = 0;
            if (a.key == 'б' || a.key == 'Б') return 188;
            if (a.key == 'ю' || a.key == 'Ю') return 190;
            if (a.key == 'ж' || a.key == 'Ж') return 186;
            if (a.key == 'х' || a.key == 'Х') return 219;
            if (a.key == 'э' || a.key == 'Э') return 222;
            if (a.key == 'ъ' || a.key == 'Ъ') return 221;
            e && (c = e(a.keyCode));
            c || (c = k ? k(a) : a.keyCode);
            return c
        };
        this.getScancode = function(a) {
            a = ba.getKeyCode(a);
            return h ? h[a] : 0
        };
        this.getScancodeByKeyCode = function(a) {
            return h ? h[a] : 0
        };
        this.getLayoutCreator = function() {
            return f
        };
        var f = new function() {
            function a() {
                var d = c.slice(0);
                d[220] = 41;
                d[219] = 12;
                d[221] = 13;
                d[186] = 26;
                d[187] = 27;
                d[191] = 43;
                d[192] = 39;
                d[189] = 53;
                d[226] = 86;
                b && (d[171] = 27, d[173] = 53, k = function(a) {
                    var c = a.keyCode,
                        b = a.key;
                    if (0 === c) {
                        if ("\u00ba" == b || "\u00aa" == b && a.shiftKey || "\\" == b && a.ctrlKey && a.altKey) return 220;
                        if ("\u00a1" == b || "\u00bf" == b && a.shiftKey) return 221;
                        if ("\u00e7" == b || "\u00c7" == b && a.shiftKey || "}" == b && a.ctrlKey && a.altKey) return 191;
                        if ("\u00f1" == b || "\u00d1" == b && a.shiftKey) return 192;
                        if ("DeadAcute" == b || "\u00b4\u00b4" == b || "\u00b4" == b || "DeadUmlaut" == b && a.shiftKey || "{" == b && a.ctrlKey &&
                            a.altKey) return 222
                    } else {
                        if (192 == c) return 186;
                        if (222 == c) return 219
                    }
                    return c
                });
                return d
            }

            function d() {
                var a = c.slice(0);
                a[220] = 41;
                a[219] = 12;
                a[221] = 13;
                a[186] = 26;
                a[187] = 27;
                a[191] = 43;
                a[192] = 39;
                a[189] = 53;
                a[226] = 86;
                a[90] = 21;
                a[89] = 44;
                b && (k = function(a) {
                    var c = a.keyCode,
                        b = a.key;
                    switch (c) {
                        case 60:
                            return 226;
                        case 160:
                            return 220;
                        case 63:
                            return 219;
                        case 192:
                            return 221;
                        case 171:
                            return 187;
                        case 163:
                            return 191;
                        case 173:
                            return 189;
                        case 0:
                            if ("\u00f6" == b || "\u00d6" == b && a.shiftKey) return 192;
                            if ("\u00e4" == b || "\u00c4" == b &&
                                a.shiftKey) return 222;
                            if ("\u00fc" == b || "\u00dc" == b && a.shiftKey) return 186
                    }
                    return c
                });
                return a
            }

            function h() {
                var a = c.slice(0);
                a[222] = 41;
                a[219] = 12;
                a[189] = 13;
                a[221] = 26;
                a[186] = 27;
                a[77] = 39;
                a[192] = 40;
                a[188] = 50;
                a[190] = 51;
                a[191] = 52;
                a[187] = 53;
                a[226] = 86;
                a[65] = 16;
                a[90] = 17;
                a[81] = 30;
                a[87] = 44;
                b && (k = function(a) {
                    var c = a.keyCode,
                        b = a.key;
                    switch (c) {
                        case 60:
                            return 226;
                        case 169:
                            return 219;
                        case 173:
                            return 189;
                        case 160:
                            return 221;
                        case 164:
                            return 186;
                        case 165:
                            return 192;
                        case 59:
                            return 190;
                        case 58:
                            return 191;
                        case 61:
                            return 187;
                        case 0:
                            if ("\u00b2" == b || "\u00b3" == b && a.shiftKey) return 222;
                            if ("\u00b5" == b || "`\u00b5" == b || "DeadGrave" == b || "\u00a3" == b && a.shiftKey || ("`" == b || "``" == b) && a.ctrlKey && a.altKey) return 220
                    }
                    return c
                });
                return a
            }

            function e() {
                var a = c.slice(0);
                a[222] = 41;
                a[192] = 40;
                a[226] = 86;
                b && (k = function(a) {
                    var c = a.keyCode,
                        b = a.key;
                    switch (c) {
                        case 0:
                            if ("\u00b0" == b || "\u00ac" == b && a.ctrlKey && a.altKey) return 222;
                            if ("\u00e7" == b || "\u00c7" == b && a.shiftKey) return 221;
                            if ("\u00e0" == b || "DeadGrave" == b || "\u00c0" == b && a.shiftKey) return 220;
                            if ("\u00e8" ==
                                b || "\u00c8" == b && a.shiftKey) return 192;
                            if ("\u00e9" == b || "\u00c9" == b && a.shiftKey) return 191;
                            if ("\u00f9" == b || "\u00d9" == b && a.shiftKey) return 226;
                            if ("DeadTilde" == b) return 221;
                            break;
                        case 173:
                            return 189;
                        case 61:
                            return 187;
                        case 160:
                            return 219;
                        case 59:
                            return 186
                    }
                    return c
                });
                return a
            }

            function q() {
                var a = c.slice(0);
                a[222] = 41;
                a[219] = 12;
                a[187] = 13;
                a[221] = 26;
                a[186] = 27;
                a[220] = 43;
                a[77] = 39;
                a[192] = 40;
                a[190] = 51;
                a[191] = 52;
                a[223] = 53;
                a[226] = 86;
                a[65] = 16;
                a[90] = 17;
                a[81] = 30;
                a[87] = 44;
                a[188] = 50;
                b && (k = function(a) {
                    var c = a.keyCode,
                        b = a.key;
                    switch (c) {
                        case 0:
                            if ("\u00b2" == b) return 222;
                            if ("\u00e7" == b || "\u00c7" == b && a.shiftKey) return 221;
                            if ("\u00e0" == b || "\u00c0" == b && a.shiftKey) return 220;
                            if ("\u00e8" == b || "\u00c8" == b && a.shiftKey) return 192;
                            if ("\u00e9" == b || "\u00c9" == b && a.shiftKey) return 189;
                            if ("\u00f9" == b || "\u00d9" == b && a.shiftKey) return 226;
                            if ("DeadTilde" == b) return 221;
                            break;
                        case 60:
                            return 226;
                        case 169:
                            return 219;
                        case 61:
                            return 187;
                        case 160:
                            return 221;
                        case 164:
                            return 186;
                        case 170:
                            return 220;
                        case 165:
                            return 192;
                        case 59:
                            return 190;
                        case 58:
                            return 191;
                        case 161:
                            return 223
                    }
                    return c
                });
                return a
            }

            function f() {
                var a = c.slice(0);
                a[191] = 41;
                a[219] = 12;
                a[221] = 13;
                a[186] = 26;
                a[192] = 27;
                a[223] = 43;
                a[222] = 39;
                a[220] = 40;
                a[188] = 51;
                a[190] = 52;
                a[189] = 53;
                a[226] = 86;
                a[90] = 21;
                a[89] = 44;
                b && (k = function(a) {
                    var c = a.keyCode,
                        b = a.key;
                    switch (c) {
                        case 0:
                            if ("\u00a7" == b || "\u00b0" == b && a.shiftKey) return 191;
                            if ("\u00e0" == b || "\u00e4" == b && a.shiftKey || "{" == b && a.ctrlKey && a.altKey) return 220;
                            if ("\u00e8" == b || "\u00fc" == b && a.shiftKey || "[" == b && a.ctrlKey && a.altKey) return 186;
                            if ("\u00e9" == b || "\u00f6" ==
                                b && a.shiftKey) return 222;
                            break;
                        case 222:
                            return 219;
                        case 160:
                            return 221;
                        case 161:
                            return 192;
                        case 164:
                            return 223;
                        case 173:
                            return 189;
                        case 60:
                            return 226
                    }
                    return c
                });
                return a
            }

            function g() {
                var a = c.slice(0);
                a[220] = 41;
                a[187] = 12;
                a[219] = 13;
                a[221] = 26;
                a[186] = 27;
                a[191] = 43;
                a[192] = 39;
                a[222] = 40;
                a[189] = 53;
                a[226] = 86;
                b && (k = function(a) {
                    var c = a.keyCode,
                        b = a.key;
                    switch (c) {
                        case 0:
                            if ("\u00e5" == b || "\u00c5" == b && a.shiftKey) return 221;
                            if ("\u00f8" == b || "\u00d8" == b && a.shiftKey || "\u00f6" == b && a.ctrlKey && a.altKey) return 192;
                            if ("\u00e6" ==
                                b || "\u00c6" == b && a.shiftKey || "\u00e4" == b && a.ctrlKey && a.altKey) return 222;
                            break;
                        case 172:
                            return 220;
                        case 171:
                            return 187;
                        case 220:
                            return 219;
                        case 160:
                            return 186;
                        case 222:
                            return 191;
                        case 173:
                            return 189;
                        case 60:
                            return 226
                    }
                    return c
                });
                return a
            }

            function l() {
                var a = c.slice(0);
                a[220] = 41;
                a[187] = 12;
                a[219] = 13;
                a[221] = 26;
                a[186] = 27;
                a[191] = 43;
                a[192] = 39;
                a[222] = 40;
                a[189] = 53;
                a[226] = 86;
                b && (k = function(a) {
                    var c = a.keyCode,
                        b = a.key;
                    switch (c) {
                        case 0:
                            if ("\u00a7" == b || "\u00bd" == b && a.shiftKey) return 220;
                            if ("\u00e5" == b || "\u00c5" ==
                                b && a.shiftKey) return 221;
                            if ("\u00f8" == b || "\u00d8" == b && a.shiftKey || "\u00f6" == b && a.ctrlKey && a.altKey) return 192;
                            if ("\u00e4" == b || "\u00c4" == b && a.shiftKey) return 222;
                            break;
                        case 171:
                            return 187;
                        case 192:
                            return 219;
                        case 160:
                            return 186;
                        case 222:
                            return 191;
                        case 173:
                            return 189;
                        case 60:
                            return 226
                    }
                    return c
                });
                return a
            }
            this.K3758162961 = function() {
                var a = c.slice(0);
                a[244] = 41;
                a[243] = 41;
                a[189] = 12;
                a[222] = 13;
                a[220] = 125;
                a[192] = 26;
                a[219] = 27;
                a[187] = 39;
                a[186] = 40;
                a[221] = 43;
                a[188] = 51;
                a[190] = 52;
                a[191] = 53;
                a[226] = 115;
                a[29] = 123;
                a[28] = 121;
                a[240] = 112;
                a[242] = 112;
                b && (a[173] = 12, a[160] = 13, a[64] = 26, a[59] = 39, a[58] = 40, k = function(a) {
                    return 220 == a.keyCode && "_" == a.key ? 226 : a.keyCode
                });
                return a
            };
            this.K1034 = this.K66570 = this.K2058 = this.K1040 = this.K66576 = a;
            this.K2057 = function() {
                var a = c.slice(0);
                a[223] = 41;
                a[222] = 43;
                a[192] = 40;
                a[220] = 86;
                b && (a[192] = 41, a[173] = 12, a[61] = 13, a[59] = 39, a[222] = 40, a[163] = 43);
                return a
            };
            this.K1031 = this.K4106 = this.K5130 = this.K6154 = this.K7178 = this.K8202 = this.K9226 = this.K10250 = this.K11274 = this.K12298 = this.K13322 = this.K14346 =
                this.K15370 = this.K16395 = this.K17418 = this.K18442 = this.K19466 = this.K20490 = this.K99997 = this.K66567 = this.K2952791047 = d;
            this.K2060 = this.K99998 = h;
            this.K3084 = this.K4105 = e;
            this.K1036 = q;
            this.K4108 = this.K2055 = f;
            this.K1044 = this.K1083 = g;
            this.K1053 = l;
            this.K1055 = function() {
                var a = c.slice(0);
                a[220] = 52;
                a[223] = 12;
                a[189] = 13;
                a[191] = 51;
                a[188] = 43;
                a[190] = 53;
                a[226] = 86;
                b && (k = function(a) {
                    var c = a.keyCode,
                        b = a.key;
                    switch (c) {
                        case 0:
                            if ("\u011f" == b || "\u011e" == b && a.shiftKey || a.ctrlKey && a.altKey && "BracketLeft" == a.code) return 219;
                            if ("\u00fc" == b || "\u00dc" == b && a.shiftKey || a.ctrlKey && a.altKey && "BracketRight" == a.code) return 221;
                            if ("\u015f" == b || "\u015e" == b && a.shiftKey || a.ctrlKey && a.altKey && "Semicolon" == a.code) return 186;
                            if ("\u00f6" == b || "\u00d6" == b && a.shiftKey) return 191;
                            if ("\u00e7" == b || "\u00c7" == b && a.shiftKey) return 220;
                            break;
                        case 73:
                            return 222;
                        case 60:
                            return 226;
                        case 173:
                            return 189;
                        case 170:
                            return 223;
                        case 162:
                            return 192
                    }
                    return c
                });
                return a
            }
        }
    };
    this.getKeyboardMgr = function() {
        return ba
    };
    var t = new function() {
            function a(a, b) {
                var c =
                    d.parseClipData(b),
                    e = !1;
                "text/plain" == c.type && (e = window.clipboardData ? window.clipboardData.setData("Text", c.value) || !0 : a.clipboardData.setData("text/plain", c.value) || !0, a.preventDefault());
                e || (hi5.browser.isIE ? (e = Ra("div"), e.innerHTML = c.value, hi5.browser.selectEditable(e)) : (m.resetCSS(), m.setValue(c.value), m.select()));
                return c
            }

            function b() {
                if (t.copyContent) {
                    var a = "text/plain" == t.copyContent.type ? "textarea" : "div";
                    t.copyToClipboard(a, t.copyContent.value);
                    t.copyContent = null
                }
                t.waitingCopyContent = !1
            }
            var d = this;
            this.release = function() {
                d = null
            };
            this.clipData = null;
            this.paste = function(a, b, c) {
                var d = new n,
                    e = 0,
                    e = window.clipboardData || b.clipboardData;
                c = null;
                var f = e.getData(window.clipboardData ? "Text" : "text/plain");
                if (f) d.setData("text/plain", f);
                else if (e)
                    if (f = e.items)
                        for (e = 0, len = f.length; e < len; e++) {
                            if ("image/png" == f[e].type) {
                                c = f[e].getAsFile();
                                break
                            }
                        } else if (e.files)
                            for (f = e.files, e = 0, len = f.length; e < len; e++)
                                if (-1 != f[e].type.indexOf("image/png")) {
                                    c = f[e];
                                    break
                                }
                if (c) e = new FileReader, b.preventDefault(), e.onloadend =
                    function(b) {
                        b.target.readyState == FileReader.DONE && (b = hi5.Base64.enc(new Uint8Array(b.target.result)), d.setData("image/png", b), a(d))
                    }, e.readAsArrayBuffer(c);
                else if (T) b.preventDefault(), d = t.getClipContent(), a(d);
                else {
                    var g = b.target.innerHTML;
                    G && (G.disableTextInput = !0);
                    F && (F.disableTextInput = !0);
                    var l = b.target.style.opacity;
                    b.target.style.opacity = 0;
                    setTimeout(function() {
                        var c = b.target.innerHTML;
                        if (c && c != g) {
                            var e = b.target.childNodes; - 1 < c.search(/<.*(font|color|img|table|style|class).*>/gmi) ? 1 == e.length &&
                                "IMG" == e[0].nodeName && 0 === e[0].src.indexOf("data:image/png;base64,") ? d.setData("image/png", e[0].src.substring(22)) : d.setData("text/html", c) : 0 === d.types.length && d.setData("text/plain", c);
                            b.target.innerHTML = "";
                            G && G.init()
                        }
                        a(d);
                        b.target.style.opacity = l;
                        G && (G.disableTextInput = !1);
                        F && (F.disableTextInput = !1)
                    }, 300)
                }
            };
            var c = 0;
            this.onCopy = function(b) {
                J && da || cancelDefault(b);
                if (!xa) {
                    l(!0, 29);
                    var e = "copy" == b.type ? "67" : 88;
                    V(!0, e);
                    V(!1, e);
                    l(!1, 29)
                }
                if (Hb) {
                    var e = Date.now(),
                        f = e - c;
                    c = e;
                    if (500 < f) return
                }
                if (!(hi5.browser.isChromeApp ||
                        T && !hi5.browser.isEdge)) {
                    Ka = p.getClipData();
                    if (m) {
                        var g = a(b, Ka);
                        setTimeout(function() {
                            var a = document.getElementById("_tmpEditable");
                            a ? a.parentNode.removeChild(a) : (m.setValue(""), F && F.setValue(""), "text/html" == g.type && m.restoreCSS());
                            0 < Ka.indexOf("data-sv-img") && bb.open(g.value, __svi18n.info.copy)
                        }, 555)
                    }
                    d.clipData = null;
                    ma = !1
                }
            };
            this.onPaste = function(a) {
                if (!J || !da) return cancelDefault(a);
                if (!e.alwaysPaste && !ma) return setTimeout(Bb, 500), cancelDefault(a);
                ma = !1;
                d.paste(Sb, a, null);
                return !0
            };
            this.parseClipData =
                function(a) {
                    var b = 0 === a.indexOf("text/plain;"),
                        c = 0 === a.indexOf("text/html;"),
                        d = c ? "text/html" : "text/plain",
                        b = b ? 11 : c ? 10 : 0;
                    0 < b && (a = a.substring(b));
                    return {
                        type: d,
                        value: a
                    }
                };
            this.getClipContent = function() {
                if (!document.queryCommandSupported("paste")) return null;
                var a = Ra("div");
                a.focus();
                try {
                    if (document.queryCommandEnabled("paste")) {
                        var b = document.execCommand("paste");
                        if (b) {
                            var c = new n,
                                d = a.innerHTML;
                            c.setData("text/html", d);
                            c.setData("text/plain", a.innerText || d.replace(/<br>/gi, "\n").replace(/&nbsp;/gi, " ").replace(/&amp;/gi,
                                "&").replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">"));
                            return c
                        }
                    }
                } finally {
                    a.parentNode.removeChild(a), m && m.focus()
                }
                return null
            };
            this.getContent = function() {
                var a = t.getClipContent();
                m && m.getElement().removeEventListener("click", t.getContent);
                return a && !a.equals(t.clipData) ? (t.clipData = a, p.send("880text/plain,text/html\t0"), !0) : !1
            };
            this.startPasteCmd = function() {
                m && document.queryCommandSupported("paste") && m.getElement().addEventListener("click", t.getContent)
            };
            this.waitingCopyContent = !1;
            this.copyContent = null;
            this.waitForCopyContent = function() {
                t.waitingCopyContent = !0;
                setTimeout(b, 700)
            };
            this.copyToClipboard = function(a, b) {
                var c = Ra(a),
                    d = !1;
                "div" == a ? (c.innerHTML = b, c.focus(), hi5.browser.selectEditable(c)) : (c.value = b, c.focus(), c.select());
                try {
                    d = document.execCommand("copy", !1, null)
                } catch (e) {} finally {
                    c.parentNode.removeChild(c), m && m.focus()
                }
                if (d) return ma = !0, d;
                bb.open(b, __svi18n.info.copy, a)
            }
        },
        Cb = hi5.browser.isMacOS || hi5.browser.isiOS,
        R = new function() {
            this.altUp = this.shiftUp = this.winUp =
                this.ctrlUp = !0;
            this.preKeyCode = 0;
            this.ignoreText = !1;
            var a = this;
            this.sendMissKey = function() {
                a.shiftUp || (l(!1, 42), a.shiftUp = !0);
                a.altUp || (l(!1, 56), l(!0, 56), l(!1, 56), a.altUp = !0);
                a.ctrlUp || (l(!1, 29), a.ctrlUp = !0);
                a.winUp || (l(!1, 219), a.winUp = !0)
            };
            this.check = function(b) {
                var d = ba.getKeyCode(b),
                    c = "keydown" == b.type;
                switch (d) {
                    case 16:
                        !c || !a.shiftUp || b.altKey || b.ctrlKey || b.metaKey || a.sendMissKey();
                        a.shiftUp = !c;
                        break;
                    case 17:
                        c && a.ctrlUp && !b.altKey && !b.shiftKey && a.sendMissKey();
                        a.ctrlUp = !c;
                        break;
                    case 18:
                        !c || !a.altUp ||
                            b.shiftKey || b.ctrlKey || b.metaKey || a.sendMissKey();
                        a.altUp = !c;
                        break;
                    case 91:
                    case 92:
                        !c || !a.winUp || b.shiftKey || b.ctrlKey || b.metaKey || b.altKey || a.sendMissKey();
                        a.winUp = !c;
                        break;
                    default:
                        !c || b.ctrlKey || b.altKey || b.shiftKey || b.metaKey || a.sendMissKey()
                }
            }
        };
    this.requestCredential = function(a, b) {
        ab = !1;
        var d = __svi18n.template.login;
        if (d) {
            var c = document.createElement("div");
            c.className = "appdlg";
            c.innerHTML = d;
            document.body.appendChild(c);
            (d = hi5.$("loginDomain")) && a.nbDomain && (d.innerHTML = a.nbDomain);
            var h = new hi5.Lightbox(c,
                .9);
            h.onclose = function() {
                document.body.removeChild(c)
            };
            h.show();
            (d = hi5.$("loginUser")) && d.focus();
            if (d = hi5.$("frmLogin")) d.onsubmit = function() {
                var a = hi5.$("loginUser").value,
                    c = hi5.$("loginPassword").value,
                    d = hi5.$("loginDomain").innerHTML;
                h.dismiss();
                setTimeout(function() {
                    b(a, c, d)
                }, 5);
                return !1
            }
        } else e.showMessage("No value for login template")
    };
    var m = null;
    if (H) pb();
    else {
        var cb = hi5.$("tmContainer");
        cb && cb.parentNode.removeChild(cb)
    }
    m = new fb;
    H && hi5.browser.isSafari && window.addEventListener("scroll",
        function() {
            setTimeout(function() {
                var a = hi5.$("pc_key");
                a && (a.style.top = window.pageYOffset + "px");
                e.toolbar && (e.toolbar.style.top = window.pageYOffset + "px")
            }, 200)
        }, !1);
    this.setCaretPos = function(a, b) {};
    this.showMessage = function(a, b) {
        a && y.displayMsg && hi5.notifications.notify({
            msg: a,
            timeout: b || 0
        })
    };
    this.hideWhenClose = "hideWhenClose" in y ? y.hideWhenClose : !0;
    this.setReadOnly = function(a) {
        J = !a
    };
    this.setPlayerMode = function() {
        aa = !0;
        e.showToolbar = !1;
        e.setReadOnly(!0);
        e.hideWhenClose = !1
    };
    this.setAutoScale = function(a) {
        var b =
            "autoScale" in y;
        b && (a = y.autoScale);
        a ? (ta(!0), gb("hidden")) : b || ta(!1);
        na = a
    };
    this.setTouchpad = function(a) {
        ea = a;
        var b = hi5.$("touchpadMode");
        b && (b.checked = a, b.onchange = function(a) {
            ea = a.target.checked
        });
        a ? g || Pa() : g && g.parentNode && (g.parentNode.removeChild(g), g = null)
    };
    this.setExtKeyboard = function(a) {
        if (H) {
            m.adjust(!0);
            m.setContentEditable(a ? "true" : "false");
            fa = a ? 1 : 0;
            hi5.browser.isChrome && m.setFontSize("2em");
            a && m.focus();
            var b = hi5.$("extKBD");
            b && b.checked != a && (b.checked = a)
        }
    };
    this.focus = function() {
        m && C(m.getElement())
    };
    this.getInputElement = function() {
        return m
    };
    this.scaleTo = function(a, b, d) {
        a /= N;
        b /= L;
        d ? (P = a, X = b) : X = P = b = a = Math.min(a, b);
        hi5.tool.scale(f.parentNode, a, b)
    };
    this.setSize = function(a, b, d) {
        N = a;
        L = b;
        na || gb(d);
        f.width = N;
        f.height = L;
        na && ta(!0);
        H && pb();
        m || (m = new fb);
        m.adjust();
        Y && Y.visible() && Y.dismiss()
    };
    this.reposition = function() {
        m.adjust()
    };
    this.setController = function(a) {
        p = a;
        p.sendInput || (p.sendInput = p.send);
        H && hi5.browser.setOrientaionHandler(function() {
            na ? ta(!0) : setTimeout(function() {
                p.onorientationchange({
                    svSurface: e,
                    innerWidth: window.innerWidth,
                    innerHeight: window.innerHeight
                });
                y.disableScoll || window.scrollTo(0, 0)
            }, 300)
        })
    };
    this.setFileHandler = function(a) {
        "FileReader" in window || (a = null);
        if (a) {
            if (!K && !aa && hi5.$("filecontainer")) {
                K = a;
                e.fileProgress = new hi5.ProgressBar(hi5.$("total"));
                Ua();
                Pb();
                var b = document.getElementById("__cancelUpload");
                b && b.addEventListener("click", function() {
                    K.cancelAll()
                }, !1);
                K.addEvent("beforeupload", function(a, c) {
                    b && (b.style.visibility = "visible");
                    e.fileProgress.style.display = "block";
                    e.fileProgress.maxValue +=
                        a.size
                });
                K.addEvent("uploaded", function() {
                    b && (b.style.visibility = "hidden");
                    e.fileProgress.maxValue = 0;
                    e.fileProgress.style.display = "none";
                    e.showMessage(__svi18n.file.uploadDone, 5E3);
                    e.refreshFiles()
                });
                K.addEvent("progress", function(a) {
                    e.fileProgress.setProgress(a)
                })
            }
        } else K = null, e.fileProgress = null, e.toolbar && e.toolbar.removeButton("svCloud"), Ua()
    };
    this.setFeature = function(a) {
        var b;
        !aa && a & 16 ? a & 128 && (b = hi5.$("uploadfile")) && (b.style.visibility = "hidden") : e.setFileHandler(null);
        a & 256 || (b = hi5.$("shadowing")) &&
            b.parentNode.removeChild(b);
        a & 1024 || (b = hi5.$("ssParent")) && b.parentNode.removeChild(b)
    };
    var Sa = new function() {
        function a() {
            if (0 === d.length) {
                c = !1;
                var a = hi5.$("_sv_pdf_parent");
                a && a.visible && a.visible() && a.dismiss && a.dismiss();
                a && a.parentNode && (a.parentNode.removeChild(a), console.log("pdf removed"))
            } else b()
        }

        function b() {
            var b = d.shift();
            if (b) {
                var e = hi5.$("_sv_pdf_parent"),
                    f = __svi18n.info.printready || "Your document is ready.",
                    g = H || !!y.showPDFLink || hi5.browser.isEdge,
                    f = g ? '<p style="text-align:center;line-height:4em"><a href="' +
                    b + '" target="_blank">' + f + "</a></p>" : (hi5.browser.isChromeApp ? "<webview" : "<iframe") + ' src="' + b + '" width="100%" height="100%" id="_iFramePDF">' + (hi5.browser.isChromeApp ? "</webview>" : "</iframe>");
                e ? (g = hi5.$("_iFramePDF")) ? g.src = b : e.innerHTML += f : (e = document.createElement("div"), e.style.backgroundColor = "white", e.style.width = H ? "30%" : "90%", e.style.height = H ? "4elm" : "85%", e.id = "_sv_pdf_parent", e.innerHTML = f, document.body.appendChild(e), b = new hi5.Lightbox(e), b.onclose = a, b.show())
            }
            c = !0
        }
        var d = [],
            c = !1;
        this.clearPDF =
            function() {
                a()
            };
        this.showPDF = function(a) {
            d.push(a);
            c || b()
        }
    };
    this.close = function() {
        J = !1;
        Ca();
        Nb();
        t && (t.release(), t = null);
        Fa && (Fa.release(), Fa = null);
        Ea && (Ea.release(), Ea = null);
        G && (G.release(), G = null);
        F && (F.release(), F = null);
        p = qa = Ba = g = Y = K = F = ca = Z = R = ba = null;
        e.fileProgress = null;
        Sa.clearPDF();
        na && e.setAutoScale(!1);
        Z && Z.setVisibility(!1);
        "clearScreen" in y && !y.clearScreen || Q.fillRect(0, 0, f.width, f.height);
        window.svSurface = null;
        nb = !0;
        if (window && !aa) {
            try {
                if (0 < hi5.notifications.notifySize()) {
                    hi5.notifications.onempty =
                        function() {
                            e.close();
                            hi5.notifications.onempty = null
                        };
                    return
                }
                if (ab) window.close();
                else if (this.hide(), hi5.browser.isChromeApp) {
                    var a = chrome.app.window.current();
                    a && (a.onMaximized.removeListener(hb), a.isFullscreen() && (a.restore(), a.restore()))
                }
            } catch (b) {}
            e = f = Q = e.context = null
        }
    };
    this.setFastCopy = function(a) {
        Hb = a
    };
    this.drawLicense = function(a) {
        if (0 != y.drawLicense) {
            var b = a.charAt(0);
            Q.font = "12pt Arial";
            Q.fillStyle = "W" == b ? "red" : "black";
            a = a.substring(1);
            Q.fillText(a, 10, L - 24)
        }
    };
    this.drawText = function(a) {
        var b =
            y.text || {};
        if (b.backgroundFillStyle) {
            var d = f.width,
                c = f.height;
            Q.fillStyle = b.backgroundFillStyle;
            Q.fillRect(0, 0, d, c)
        }
        var e = 20,
            k = 50;
        "center" == b.textAlign && (e = d / 2, k = c / 2);
        Q.font = b.font || "18pt Arial";
        Q.fillStyle = b.fillStyle || "black";
        b.textAlign && (Q.textAlign = b.textAlign);
        b.textBaseline && (Q.textBaseline = b.textBaseline);
        Q.fillText(a, e, k)
    };
    this.showPDF = function(a) {
        Sa.showPDF(a)
    };
    this.hide = function() {
        e.hideWhenClose && (f.height = 1, f.width = 1);
        m && m.hide()
    };
    var La = 0,
        Lb = !1,
        bb = new function() {
            var a = null,
                b = null;
            this.createDialog =
                function(d, c, e) {
                    var f = document.createElement("div");
                    f.className = "copyDialog";
                    var g = document.createElement("div");
                    g.innerHTML = c;
                    g.className = "hi5_notifer_title";
                    f.appendChild(g);
                    c = document.createElement(e);
                    "div" == e ? c.innerHTML = d : c.value = d;
                    c.style.border = "1px solid #666";
                    c.style.width = "100%";
                    c.style.minHeight = "80px";
                    f.appendChild(c);
                    a = c;
                    Ib && (b = document.createElement("input"), b.className = "btnCopy", b.type = "button", b.value = __svi18n.info.copylable || "Copy", b.onclick = function() {
                        "div" == e ? hi5.browser.selectEditable(a) :
                            a.select();
                        document.execCommand("copy")
                    }, f.appendChild(b));
                    if (0 < d.indexOf('data-sv-img="wmf"') && (c = d.indexOf('src="') + 5, g = d.indexOf('"', c), g > c && 0 < c)) {
                        var l = document.createElement("a");
                        l.href = d.substring(c, g);
                        l.target = "_blank";
                        l.innerHTML = "Download image";
                        f.appendChild(l)
                    }
                    return f
                };
            this.open = function(d, c, h) {
                function f() {
                    var g = bb.createDialog(d, c, h);
                    document.body.appendChild(g);
                    var k = new hi5.Lightbox(g);
                    k.show();
                    a && 0 !== d.indexOf("<img ") && ("div" == h ? hi5.browser.selectEditable(a) : a.select());
                    ob();
                    k.onclose =
                        function() {
                            Ta();
                            g && g.parentNode && g.parentNode.removeChild(g);
                            e.toolbar && e.toolbar.removeButton("_svClipInfo")
                        };
                    document.queryCommandEnabled("copy") || g.removeChild(b)
                }
                h || (h = "div");
                if (y.clipWarnAlways || !Lb) e.showMessage(__svi18n.info.copyWarning, 5E3), Lb = !0;
                clearTimeout(La);
                var g = e.toolbar;
                if (g) {
                    var l = g.getButton("_svClipInfo");
                    l ? l.onclick = f : (l = g.addButton(y.img.copy ? y.img.copy : "copy.png", f), l.id = "_svClipInfo", l.className = "pulse");
                    g.startFade();
                    La = setTimeout(function() {
                            e.toolbar.removeButton("_svClipInfo")
                        },
                        3E4)
                }
            }
        };
    this.copyToClip = function(a, b) {
        var d = t.parseClipData(a);
        t.waitingCopyContent ? t.copyContent = d : setTimeout(function() {
            if (!(!da || ra && Ka == a || M)) {
                a = d.value;
                var b = 0 < a.indexOf("<img ") || y.copyDialog,
                    e = "text/plain" == d.type ? "textarea" : "div";
                b && !Ib || t.copyToClipboard(e, a)
            }
        }, 50)
    };
    this.fullScreen = function() {
        f.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
    };
    var Z = new function() {
            function a(a) {
                fa = Date.now();
                if (a = hi5.$("pc_key")) a.style.display = "block", a.style.top = window.pageYOffset + "px", F && (F.setValue("`\t`"),
                    F.select())
            }

            function b(a) {
                fa = 0;
                if (a = hi5.$("pc_key")) a = hi5.$("shortcuts"), a && a.checked || (m.style.display = "none")
            }

            function d() {
                h && (ga ? hi5.html.addClass(h, "button_selected") : hi5.html.removeClass(h, "button_selected"));
                f && (ha ? hi5.html.addClass(f, "button_selected") : hi5.html.removeClass(f, "button_selected"));
                g && (sa ? hi5.html.addClass(g, "button_selected") : hi5.html.removeClass(g, "button_selected"))
            }

            function c(a) {
                cancelDefault(a);
                a = a.target;
                var b = a.innerHTML,
                    b = b.replace(/\u2190/g, "left").replace(/\u2191/g, "up").replace(/\u2192/g,
                        "right").replace(/\u2193/g, "down");
                switch (b) {
                    case "Ctrl":
                        h || (h = a);
                        ga ? l(!1, 29) : l(!0, 29);
                        ga = !ga;
                        d();
                        break;
                    case "Alt":
                        f || (f = a);
                        ha ? l(!1, 56) : l(!0, 56);
                        ha = !ha;
                        d();
                        break;
                    case "Shift":
                        g || (g = a);
                        sa ? l(!1, 42) : l(!0, 42);
                        sa = !sa;
                        d();
                        break;
                    case "...":
                        if (a = hi5.$("pc_key_more")) a.style.display = "block" == a.style.display ? "none" : "block";
                        break;
                    case "Start":
                        b = "Ctrl+Esc";
                    default:
                        e.writeKeyComb(b), Z.resetModifier()
                }
            }
            var h = null,
                f = null,
                g = null;
            this.setVisibility = function(c) {
                c ? a() : b()
            };
            this.resetModifier = function() {
                ha && (ha = !1, l(!1,
                    56));
                ga && (ga = !1, l(!1, 29));
                sa && (sa = !1, l(!1, 42));
                d()
            };
            hi5.$("svTouchInput") && (hi5.$("svTouchInput").addEventListener("focus", a, !1), hi5.$("svTouchInput").addEventListener("blur", b, !1));
            var m = hi5.$("pc_key");
            if (m) {
                var p = m.getElementsByTagName("span"),
                    r = p.length,
                    n = hi5.browser.isFirefox ? "mousedown" : "touchstart";
                "ontouchstart" in window || (navigator.pointerEnabled ? n = "pointerdown" : navigator.msPointerEnabled && (n = "MSPointerDown"));
                for (var t = 0; t < r; t++) {
                    var u = p[t];
                    u.className = "button";
                    u.addEventListener(n, c, !1);
                    "mousedown" != n && u.addEventListener("mousedown", c, !1)
                }
                m.style.position = "absolute"
            }
        },
        Mb = hi5.$("shortcuts");
    Mb && Mb.addEventListener("change", function(a) {
        Z.setVisibility(a.target.checked)
    });
    this.setKeysVisibility = function(a) {
        Z && Z.setVisibility(a)
    };
    this.refreshFiles = function() {
        Y && Y.visible() ? va(".", Y) : sb(null)
    };
    this.processLink = function(a) {
        function b(b) {
            window.open(a);
            b.target.parentNode.removeChild(b.target)
        }
        clearTimeout(La);
        var d = e.toolbar,
            c = d.getButton("_svLinkInfo");
        c ? c.onclick = b : (c = d.addButton(y.img.link ?
            y.img.link : "link.png", b), c.id = "_svLinkInfo", c.className = "pulse");
        c.title = a;
        d.startFade();
        La = setTimeout(function() {
            e.toolbar.removeButton("_svLinkInfo")
        }, 1E4)
    };
    this.setUnicode = function(a) {
        m && (!a && H && (hi5.browser.isiOS || hi5.browser.isChrome && !hi5.browser.isWindows) && (a = !0), Ia = !a, svGlobal.logger.info("Unicode:" + a), G.onkeydown = G.onkeyup = a ? qb : Rb, !a && p && p.sendKeyboardSynchronize && (G.onkeypress = Qb), G.ontextinput = rb)
    };
    this.setTouchRemoting = function(a) {
        !0 === a ? (qa = new U(e, f), svGlobal.logger.info("touch remoting"),
            e.showMessage(__svi18n.info.touchremoting)) : qa = new la(e)
    };
    this.setClipboard = function(a) {
        (da = a) || (ra = !1)
    };
    this.setJoinMode = function(a) {
        p.setJoinMode(a)
    };
    this.requestControl = function() {
        p.requestControl()
    };
    this.run = function(a) {
        function b(a) {
            a.target.removeEventListener("click", b, !1);
            p.send("884")
        }
        hi5.notifications.clearAll();
        3758162961 != a && 3758162962 != a || !m || m.setContentEditable("false");
        ba.setLayout(a);
        var d = -1 != [99997, 99998, 99999].indexOf(a);
        Ia = !d;
        yb = (d || -1 == [1033, 3758162961, 3758162962, 1049].indexOf(a)) &&
            hi5.browser.isMacOS;
        ab = "boolean" == typeof y.closeOnDisconn ? y.closeOnDisconn : !!window.opener && !hi5.browser.isChromeApp;
        y.disableScoll || window.scrollTo(0, 0);
        Ua();
        Ob();
        a = m.getElement();
        if (H) {
            if (!aa) {
                qa = new la(e);
                var c = new A(a);
                c.ontouch = O;
                c.onmousedown = Ma;
                c.onmousemove = Na;
                c.onmouseup = Oa;
                I(a, Fb, !1);
                document.addEventListener("paste", t.onPaste, !1);
                da && ra && (document.addEventListener("copy", t.onCopy, !1), document.addEventListener("cut", t.onCopy, !1))
            }
        } else aa || (a.addEventListener("mousemove", Na, !1), a.addEventListener("mousedown",
            Ma, !1), a.addEventListener("mouseup", Oa, !1), I(a, Fb, !1), a.addEventListener("paste", t.onPaste, !1), da && ra && (a.addEventListener("copy", t.onCopy, !1), a.addEventListener("cut", t.onCopy, !1))), C(a);
        m.adjust();
        e.setUnicode(d);
        d = window;
        try {
            for (;;) {
                d.document.addEventListener("mouseup", mb, !1);
                if (d.parent == d) break;
                d = d.parent
            }
        } catch (h) {}
        this.drawText(__svi18n.wait);
        if (e.onstart) e.onstart(f);
        a.addEventListener("click", b, !1)
    };
    this.movCursorBy = Va;
    this.moveCursor = wa;
    this.touchstart = function(a) {
        switch (a.pointes) {
            case 1:
                if (ea) g ||
                    Pa(), Wa("touchstart", a.screenX, a.screenY, !a.flick);
                else if (!a.flick || r()) {
                    var b = m.getElement().getBoundingClientRect(),
                        d = a.x - b.left;
                    a = a.y - b.top;
                    if (e.mouseMoveEmu) {
                        var b = Jb,
                            c = Kb,
                            f = d,
                            k = a,
                            l = f - b,
                            p = k - c,
                            n = Math.max(Math.abs(p), Math.abs(l)) / 2 | 0;
                        if (0 < n)
                            for (var l = l / n | 0, p = p / n | 0, t = 0; t < n; t++) b += l, c += p, Ja(b, c);
                        b == f && c == k || Ja(f, k);
                        Jb = d;
                        Kb = a
                    }
                    ya(d, a, 0)
                }
                break;
            case 2:
                Ga = a.screenX, pa = a.screenY
        }
    };
    this.touchmove = function(a) {
        var b = m.getElement().getBoundingClientRect();
        switch (a.pointes) {
            case 1:
                ea ? Wa("touchmove", a.screenX,
                    a.screenY, !a.flick) : a.flick && !r() || Ja(a.x - b.left, a.y - b.top);
                break;
            case 2:
                40 <= Math.abs(a.screenY - pa) && (Eb(a.x - b.left, a.y - b.top, 0 < a.screenY - pa ? 0 : 1), Ga = a.screenX, pa = a.screenY)
        }
    };
    this.touchend = function(a) {
        var b = a.pointes,
            d = m.getElement().getBoundingClientRect();
        switch (b) {
            case 1:
                ea ? Wa("touchend", a.screenX, a.screenY, !a.flick) : (wa(a.x, a.y, !0), a.flick && !r() || oa(a.x - d.left, a.y - d.top, 0));
                break;
            case 2:
                a.moved || (b = ea ? g.scrX : a.x - d.left, a = ea ? g.scrY : a.y - d.top, wa(b, a), ya(b, a, 2), oa(b, a, 2));
                break;
            case 3:
                if (a.gesture) switch (a.gesture) {
                    case "OPEN":
                        l(!0,
                            219);
                        l(!0, 200);
                        l(!1, 200);
                        l(!1, 219);
                        break;
                    case "CLOSE":
                        l(!0, 219);
                        l(!0, 208);
                        l(!1, 208);
                        l(!1, 219);
                        break;
                    case "LEFT":
                        l(!0, 56);
                        l(!0, 1);
                        l(!1, 1);
                        l(!1, 56);
                        break;
                    case "RIGHT":
                        l(!0, 42);
                        l(!0, 56);
                        l(!0, 1);
                        l(!1, 1);
                        l(!1, 56);
                        l(!1, 42);
                        break;
                    case "UP":
                        l(!0, 42);
                        l(!0, 219);
                        V(!0, 77);
                        V(!1, 77);
                        l(!1, 219);
                        l(!1, 42);
                        break;
                    case "DOWN":
                        l(!0, 219), V(!0, 77), V(!1, 77), l(!1, 219)
                } else e.toolbar && e.toolbar.startFade && e.toolbar.startFade(), M && M.focus()
        }
    };
    this.flick = function(a) {
        switch (a.from) {
            case 4:
                p.sendInput("840\t209");
                p.sendInput("8449152\t209");
                break;
            case 2:
                p.sendInput("840\t201"), p.sendInput("8449152\t201")
        }
    };
    this.longpress = function(a) {
        ea && (a.pointes = 2);
        var b = m.getElement().getBoundingClientRect();
        switch (a.pointes) {
            case 1:
                var d = a.x - b.left;
                a = a.y - b.top;
                wa(d, a);
                ya(d, a, 2);
                oa(d, a, 2);
                break;
            case 2:
                g && (ya(g.scrX, g.scrY, 2, 1), oa(g.scrX, g.scrY, 2, 1))
        }
    };
    this.redirectTouches = function(a) {
        if (J) {
            for (var b = a.length, d, c = "90" + b, e = 0; e < b; e++) d = a[e], c = c + "\t" + d.contactId + ";" + d.contactFlags + ";" + Math.floor(d.x / P) + ";" + Math.floor(d.y / X);
            p.send(c)
        }
    };
    var Ha = 0;
    this.setIgnorePaste =
        function(a) {
            a && (ma = !1)
        };
    this.processClipReq = function(a) {
        var b = t.clipData,
            d = Date.now();
        if (!b || b.sent && 2E3 < d - b.sent) b = t.getClipContent();
        var c = b ? b.getData("text/richtext" == a ? "text/html" : a) : null;
        if (c && "text/plain" == a) {
            for (var e = 0, f = "", g = c.length; e < g && (f = c.charAt(e), "\r" == f || "\n" == f); e++);
            e && (c = c.substring(e))
        }
        if (c) return p.send("881" + a + "\t" + c), b.sent = d, !0;
        p.send("881" + a + "\t");
        return !1
    };
    var $a = {},
        Db = !1,
        Tb = {
            33: 201,
            34: 209,
            35: 207,
            36: 199,
            37: 203,
            38: 200,
            39: 205,
            40: 208,
            154: 183,
            45: 210,
            46: 211,
            225: 184,
            91: 219,
            92: 220,
            93: 221,
            27: 1,
            8: 14,
            9: 15,
            13: 28,
            224: 29,
            17: 29,
            16: 42,
            18: 56,
            20: 58,
            166: 59,
            112: 59,
            167: 60,
            113: 60,
            168: 61,
            114: 61,
            183: 62,
            115: 62,
            182: 63,
            116: 63,
            216: 64,
            117: 64,
            217: 65,
            118: 65,
            173: 66,
            119: 66,
            174: 67,
            120: 67,
            175: 68,
            121: 68,
            122: 87,
            123: 88
        };
    this.writeKeyComb = function(a) {
        p.writeKeyComb(a)
    };
    this.setCursor = function(a) {
        !y.disableCursor && a && (a.data || a.url || a.none) && (Ba = a, g && g.setCursor(a), aa || (m ? (m.getElement().style.cursor = "default", m.getElement().style.cursor = Gb(a)) : f.style.cursor = Gb(a)))
    };
    this.setVisible = function(a, b) {
        var d =
            a ? "visible" : "hidden";
        "number" == typeof b ? setTimeout(function() {
            f.style.visibility = d
        }, b) : f.style.visibility = d
    }
}
svGlobal.LocalInterface = LocalInterface;
svGlobal.rdpFile = {
    loadRdpFile: function(f, C) {
        var n = C.elements,
            u = f.split("\r\n");
        2 > u.length && (u = f.split("\n"));
        if (2 > u.length) return !1;
        var I = hi5.$("gateway"),
            A = I.value;
        C.reset();
        I.value = A;
        I = 0;
        for (A = u.length; I < A; I++) {
            var r = u[I],
                U = r.indexOf(":"),
                la = r.substring(0, U),
                r = r.substring(U + 3),
                la = la.toLowerCase();
            switch (la) {
                case "full address":
                    U = r.indexOf(":");
                    0 < U ? (n.server.value = r.substring(0, U), n.port.value = r.substring(U + 1)) : n.server.value = r;
                    break;
                case "username":
                    n.user.value = r;
                    break;
                case "domain":
                    n.domain.value =
                        r;
                    break;
                case "connect to console":
                    n.useConsole.checked = "0" != r;
                    break;
                case "desktopwidth":
                    n.width.value = r;
                    break;
                case "desktopheight":
                    n.height.value = r;
                    break;
                case "session bpp":
                    n.server_bpp.value = r;
                    break;
                case "audiomode":
                    n.playSound.value = r;
                    break;
                case "alternate shell":
                    0 < r.length && (n.command.value = r, hi5.$("app").checked || (hi5.$("shell").checked = !0));
                    break;
                case "shell working directory":
                    n.directory = r;
                    break;
                case "redirectclipboard":
                    n.mapClipboard.checked = "0" != r;
                    break;
                case "redirectprinters":
                    n.mapPrinter.checked =
                        "0" != r;
                    break;
                case "server port":
                    0 < r.length && (n.port.value = r);
                    break;
                case "disable wallpaper":
                    n.background.checked = "0" == r;
                    break;
                case "disable themes":
                    n.styles.checked = "0" == r;
                    break;
                case "disable menu anims":
                    n.animation.checked = "0" == r;
                    break;
                case "disable full window drag":
                    n.contents.checked = "0" == r;
                    break;
                case "allow font smoothing":
                    n.smoothfont.checked = "0" != r;
                    break;
                case "allow desktop composition":
                    n.composition.checked = "0" != r;
                    break;
                case "bitmapcachepersistenable":
                    n.bitmap.checked = "0" != r;
                    break;
                case "remoteapplicationprogram":
                    n.exe.value =
                        r;
                    break;
                case "remoteapplicationcmdline":
                    n.args.value = r;
                    break;
                case "remoteapplicationmode":
                    hi5.$("app").checked = "1" == r;
                    break;
                case "loadbalanceinfo":
                    n.loadBalanceInfo.value = r
            }
        }
        return !0
    },
    handleFiles: function(f, C) {
        if (1 != f.length) hi5.notifications.notify({
            msg: "Please one file only"
        });
        else {
            var n = f[0],
                u = n.name,
                I = u.length;
            if (u = 4 < I && ".rdp" == u.substring(I - 4).toLowerCase()) {
                var A = new FileReader,
                    r = !1;
                A.onload = function(f) {
                    if (f = f.target.result) f = svGlobal.rdpFile.loadRdpFile(f, C), f || r || (r = !0, A.readAsText(n))
                };
                A.readAsText(n,
                    "UTF-16LE")
            } else hi5.notifications.notify({
                msg: "Sorry, Please .rdp file only"
            })
        }
    }
};

function initDragDrop(f, C) {
    function n(f) {
        svGlobal.rdpFile.handleFiles(f.target.files, C)
    }

    function u(n) {
        cancelDefault(n);
        f.style.backgroundColor = r;
        n = n.dataTransfer.files;
        svGlobal.rdpFile.handleFiles(n, C)
    }

    function I(n) {
        cancelDefault(n);
        f.style.backgroundColor = "yellow"
    }

    function A(n) {
        cancelDefault(n);
        f.style.backgroundColor = r
    }
    if ("FileReader" in window) {
        var r = f.style.backgroundColor,
            U = hi5.$("rdpfile");
        U && U.addEventListener("change", n, !1);
        f.addEventListener("dragover", I, !1);
        f.addEventListener("dragleave",
            A, !1);
        f.addEventListener("drop", u, !1)
    }
}
svGlobal.util.initDragDrop = initDragDrop;
svGlobal.util.initMapDisk = svGlobal.util.MapDisk = function(f, C) {
    function n(n) {
        cancelDefault(n);
        "0.6" != f.style.opacity && (f.style.opacity = "0.6");
        f.style.backgroundColor = "yellow"
    }

    function u(n) {
        cancelDefault(n);
        f.style.opacity = f.__oldOpacity;
        f.style.backgroundColor = f.__oldColor
    }

    function I(n) {
        cancelDefault(n);
        f.style.opacity = f.__oldOpacity;
        f.style.backgroundColor = f.__oldColor;
        var r = hi5.file.getEntries(n);
        r.length ? (n = new hi5.file.DirectoryReader(r), n.onfile = function(f, n) {
            C.addFile(f, n)
        }, n.start()) : C.addFiles(n.dataTransfer.files)
    }
    "FileReader" in window && (f.__oldColor = f.style.backgroundColor, f.__oldOpacity = f.style.opacity, f.addEventListener("dragover", n, !1), f.addEventListener("dragleave", u, !1), f.addEventListener("drop", I, !1), this.release = function() {
        f.removeEventListener("dragover", n, !1);
        f.removeEventListener("dragleave", u, !1);
        f.removeEventListener("drop", I, !1);
        f = C = null
    })
};
(function() {
    function f(C) {
        C = document.getElementsByClassName("ver");
        for (var n = C.length, u = 0; u < n; u++) C[u].innerHTML = svGlobal.version;
        window.removeEventListener("load", f, !1)
    }
    window.addEventListener("load", f, !1)
})();
svGlobal.logger.info("ver:" + svGlobal.version);
