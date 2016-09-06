var svGlobal = {
    version: "4.8.7",
    build: "732",
    log: 1,
    isMultitask: hi5.browser.isMultitask,
    util: {},
    logger: {
        debug: function(l) {
            if (svGlobal.log > 2) console.log(l)
        },
        info: function(l) {
            if (svGlobal.log > 1) console.log(l)
        },
        warn: function(l) {
            if (svGlobal.log > 0) console.log(l)
        }
    }
};

function cancelDefault(l) {
    if (l.preventDefault) l.preventDefault();
    if (l.stopPropagation) l.stopPropagation();
    return false
}

function LocalInterface(l) {
    function E(c) {
        var d = hi5.tool.cumulativePos(c);
        if (ob) d.y += c.scrollTop;
        return d
    }

    function t(c) {
        if (document.activeElement == c) return;
        var d = c;
        var e;
        var a;
        for (var b = []; d.parentElement;) {
            d = d.parentElement;
            e = getComputedStyle(d);
            if (e) {
                a = e.getPropertyValue("overflow");
                if (e.getPropertyValue("display") == "block") b.push([d, d.scrollTop, d.scrollLeft])
            }
        }
        c.focus();
        if (b.length) {
            var k = 0;
            for (var g = b.length; k < g; k++) {
                d = b[k];
                if (d[0].scrollTop != d[1] || d[0].scrollLeft != d[2]) {
                    d[0].scrollTop = d[1];
                    d[0].scrollLeft =
                        d[2]
                }
                b[k] = null
            }
            b = null
        }
    }

    function C(c) {
        if (c.type == "application/x-filegroup") {
            var d = c.value.split("\r\n");
            var e = "";
            var a = 0;
            d.forEach(function(c) {
                var d = c.split("\t");
                if (d.length > 1) {
                    if (e) e += ",";
                    e += d[0];
                    a += parseInt(d[1], 10)
                }
            });
            if (e.length > 28) e = e.substring(0, 28) + "...";
            e = e + "<br>Total: " + hi5.tool.bytesToSize(a) + " Qty:" + d.length;
            hi5.notifications.notify({
                "title": __svi18n.info.download,
                "msg": e,
                "timeout": 9E3,
                "cbYes": function() {
                    this.destroy();
                    K.download()
                },
                "cbNo": function() {
                    this.destroy()
                }
            });
            return true
        } else return false
    }

    function H() {
        var c = [];
        this.sent = 0;
        this.types = [];
        var d = this;
        this.datas = c;
        this.setData = function(e, a) {
            if (e == "text/plain" || e == "text/html") {
                if (a.length > 2 && a.substring(0, 3) == "`\t`") a = a.substring(3);
                a = a.replace(/\r?\n/g, "\r\n")
            }
            d.types.push(e);
            c.push(a)
        };
        this.getData = function(e) {
            var a = c[d.types.indexOf(e)];
            if (!a && e == "text/richtext") a = c[d.types.indexOf("text/html")];
            return a
        };
        this.equals = function(c) {
            if (!c) return false;
            if (!hi5.Arrays.equals(d.types, c.types)) return false;
            var a;
            var b;
            var k;
            var g = d.types;
            var v =
                0;
            for (var z = g.length; v < z; v++) {
                a = g[v];
                b = d.getData(a);
                k = c.getData(a);
                if (b != k) return false
            }
            return true
        }
    }

    function O(c) {
        function d(a) {
            a.focus();
            if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                var c = document.createRange();
                c.selectNodeContents(a);
                c.collapse(false);
                var b = window.getSelection();
                b.removeAllRanges();
                b.addRange(c)
            } else if (typeof document.body.createTextRange != "undefined") {
                var d = document.body.createTextRange();
                d.moveToElementText(a);
                d.collapse(false);
                d.select()
            }
        }

        function e() {
            var a = P ? c.value : r.isFirefox ? c.textContent : c.innerText;
            if (l && !P && a.charAt(0) != f.PLACE_HOLDER) a = f.PLACE_HOLDER + a;
            return a
        }

        function a() {
            if (l)
                if (P) {
                    if (c.setSelectionRange) c.setSelectionRange(c.value.length, c.value.length)
                } else d(c)
        }

        function b() {
            var c = l || T && L ? f.PLACE_HOLDER : "";
            p = c;
            f.setValue(c);
            a()
        }

        function k() {
            setTimeout(b, 100)
        }

        function g(a) {
            G = a.keyCode;
            if (f.onkeydown) f.onkeydown(a)
        }

        function v(a) {
            if (f.onkeyup) f.onkeyup(a);
            var c = a.keyCode;
            if (c == 13 || c == 32 && G == 32) k()
        }

        function z(a) {
            if (f.onkeypress) f.onkeypress(a)
        }

        function X(a) {
            if (f.onbackspace)
                for (var c = 0; c < a; c++) f.onbackspace()
        }

        function F(a) {
            if (f.disableTextInput) return;
            a.stopPropagation();
            var d = e();
            var g = d.length;
            if (g > 1 && d.charAt(0) != f.PLACE_HOLDER && d.charAt(g - 1) == f.PLACE_HOLDER) {
                d = f.PLACE_HOLDER + d.substring(0, g - 1);
                f.setValue(d)
            }
            if (d == p) return;
            var v = p.length;
            var z = d.indexOf(p);
            if (d && z === 0) {
                d = d.substring(v);
                if (d.length > 0 && m && f.ontextinput) {
                    f.ontextinput({
                        data: d,
                        "target": c
                    });
                    if (d == ".") {
                        b();
                        return
                    }
                }
            } else {
                z = p.indexOf(d);
                if (z === 0) {
                    if (G != 8) X(v - g)
                } else if (m) {
                    if (l) {
                        v--;
                        d = d.substring(1)
                    }
                    X(v);
                    if (d.length > 0 && f.ontextinput) f.ontextinput({
                        data: d,
                        "target": c
                    })
                }
            }
            if (e() === "") k();
            p = e()
        }

        function h(a) {
            if (f.disableTextInput) return;
            if (!a.data) return;
            a.stopPropagation();
            if (f.ontextinput) f.ontextinput(a);
            if (n) a.preventDefault()
        }
        var f = this;
        var l = r.isAndroid && r.isChrome;
        var m = r.isFirefox || r.isOpera || l;
        var n = !r.isRIM;
        var p = "";
        var G = 0;
        var P = "INPUT" == c.nodeName || "TEXTAREA" == c.nodeName;
        var ba = "DIV" == c.nodeName;
        this.PLACE_HOLDER = "`";
        this.setValue = function(a) {
            var b = f.disableTextInput;
            f.disableTextInput = true;
            if (P) c.value = a;
            else if (ba) c.innerHTML = a;
            f.disableTextInput = b
        };
        this.init = b;
        this.disableTextInput = false;
        b();
        c.addEventListener("keydown", g, false);
        c.addEventListener("keyup", v, false);
        c.addEventListener("keypress", z, false);
        if (m) {
            c.addEventListener("input", F, false);
            if (l) c.onclick = b;
            else c.addEventListener("mouseup", b, false)
        } else {
            c.addEventListener("textInput", h, false);
            c.addEventListener("textinput", h, false)
        }
        this.release = function() {
            f = null;
            c.removeEventListener("keydown", g, false);
            c.removeEventListener("keyup", v, false);
            c.removeEventListener("input", F, false);
            c.removeEventListener("focus", b, false);
            c.removeEventListener("textInput", h, false);
            c.removeEventListener("textinput", h, false);
            c = null
        };
        this.select = function() {
            pb(c)
        }
    }

    function Y(c, d, e) {
        function a(a) {
            var c = 0;
            var e = 0;
            var X = 0;
            var F = Da(a);
            var f = a.deltaMode || 0;
            var h = !!a.deltaX || !!a.wheelDeltaX;
            a.preventDefault();
            a.stopPropagation();
            if (f == 1) {
                d(-a.deltaY || -a.deltaX, F, h);
                return
            }
            var l = "deltaY" in a;
            var m = l ? 40 : "wheelDelta" in a ? 120 : 0;
            if (m) {
                X =
                    Date.now();
                if (X - k > 100) b = 0;
                e = -a.deltaY || -a.deltaX || a.wheelDelta;
                if (e != 0) {
                    b += e;
                    c = b / m | 0;
                    b = b % m;
                    if (c !== 0) d(c, F, h)
                }
                k = X
            } else {
                c = -a.detail;
                if (Math.abs(c) == 32768) {
                    e = window.innerHeight / 40 | 0;
                    c = c < 0 ? -e : e
                }
                d(c, F, false)
            }
        }
        var b = 0;
        var k = 0;
        c.addEventListener("DOMMouseScroll", a, true);
        c.addEventListener("mousewheel", a, true)
    }

    function ha(c) {
        function d(a) {
            if (k) return;
            if (g.onmousedown) g.onmousedown(a)
        }

        function e(a) {
            if (k) return;
            if (g.onmousemove) g.onmousemove(a)
        }

        function a(a) {
            if (k) {
                k = false;
                return
            }
            if (g.onmouseup) g.onmouseup(a)
        }

        function b(a) {
            var c = a.type;
            if (c == "touchstart") k = true;
            if (g.ontouch) g.ontouch(a)
        }
        var k = false;
        var g = this;
        var v = navigator.pointerEnabled || navigator.msPointerEnabled || false;
        if ("ontouchstart" in window || !v) {
            c.addEventListener("touchstart", b, false);
            c.addEventListener("touchend", b, false);
            c.addEventListener("touchmove", b, false);
            c.addEventListener("touchcancel", b, false);
            c.addEventListener("mousemove", e, false);
            c.addEventListener("mousedown", d, false);
            c.addEventListener("mouseup", a, false)
        } else if (navigator.pointerEnabled) {
            c.addEventListener("pointerdown",
                b, false);
            c.addEventListener("pointerup", b, false);
            c.addEventListener("pointermove", b, false);
            c.addEventListener("pointercancel", b, false)
        } else if (navigator.msPointerEnabled) {
            c.addEventListener("MSPointerDown", b, false);
            c.addEventListener("MSPointerUp", b, false);
            c.addEventListener("MSPointerMove", b, false);
            c.addEventListener("MSPointerCancel", b, false)
        }
    }

    function la() {
        return !oa && U <= window.innerWidth && Q <= window.innerHeight
    }

    function ma(c) {
        function d(a) {
            if (a < 256) return a;
            var c = k.indexOf(a);
            if (c != -1) return c;
            k.push(a);
            return k.length - 1
        }

        function e(a, c) {
            var b;
            var e = a.length;
            var g = new Array(e);
            for (var k = 0; k < e; k++) {
                b = a[k];
                var f = Ea(b.clientX, b.clientY, l);
                g[k] = {
                    "contactId": d(b.identifier),
                    "contactFlags": c,
                    "x": f.x,
                    "y": f.y
                }
            }
            return g
        }

        function a(a) {
            var c = b.length;
            for (var d = 0; d < c; d++)
                if (b[d].contactId == a) return d;
            return -1
        }
        var b;
        var k = [];
        var g = false;
        this.handle = function(d) {
            var z = d.type;
            var X = d.touches;
            var F;
            var f;
            var h = d.changedTouches;
            cancelDefault(d);
            switch (z) {
                case "touchstart":
                    g = false;
                    f = X.length;
                    F = e(X, 25);
                    b = F;
                    break;
                case "touchmove":
                    F = e(h, 26);
                    var l = false;
                    if (b.length > 0 && F.length == 1) {
                        var m = a(F[0].contactId);
                        if (m != -1 && b[m].x == F[0].x && b[m].y == F[0].y) l = true
                    }
                    if (l) return;
                    else if (b.length > 0) {
                        c.redirectTouches(b);
                        b.length = 0
                    }
                    c.redirectTouches(F);
                    g = true;
                    break;
                case "touchend":
                    if (!g) {
                        c.redirectTouches(b);
                        f = b.length;
                        for (var n = 0; n < f; n++) b[n].contactFlags = 4;
                        F = b
                    } else F = e(h, 4);
                    c.redirectTouches(F);
                    k.length = b.length = 0;
                    break;
                case "touchcancel":
                    c.redirectTouches(e(h, 34));
                    k.length = b.length = 0
            }
        }
    }

    function sa(c) {
        function d(a) {
            var c =
                a[1].screenX - a[0].screenX;
            var b = a[1].screenY - a[0].screenY;
            return Math.sqrt(c * c + b * b)
        }

        function e(a) {
            if (a.length != 2) return false;
            var c = a[1].screenX - a[0].screenX;
            var b = a[1].screenY - a[0].screenY;
            return Math.abs(b) > 100 || Math.abs(c) > 350
        }

        function a(a) {
            var c = 0;
            var b = 0;
            var d = 0;
            var e = 9999;
            var g = 0;
            for (var v = a.length; g < v; g++) {
                if (a[g].screenY > d) {
                    d = a[g].screenY;
                    c = g
                }
                if (a[g].screenY < e) {
                    e = a[g].screenY;
                    b = g
                }
            }
            return [{
                screenX: a[b].screenX,
                screenY: a[b].screenY,
                identifier: a[b].identifier
            }, {
                screenX: a[c].screenX,
                screenY: a[c].screenY,
                identifier: a[c].identifier
            }]
        }

        function b(a, c) {
            var b = [];
            var e = k(a, S[0].identifier) || k(c, S[0].identifier);
            if (e) b.push(e);
            e = k(a, S[1].identifier) || k(c, S[1].identifier);
            if (e) b.push(e);
            var g = "";
            if (b.length != 2) return g;
            var v = d(b) - d(S);
            if (Math.abs(v) < 60) {
                var z = 80;
                if (b[0].screenX - S[0].screenX > z) g = "RIGHT";
                else if (S[0].screenX - b[0].screenX > z) g = "LEFT";
                else if (b[0].screenY - S[0].screenY > z) g = "DOWN";
                else if (S[0].screenY - b[0].screenY > z) g = "UP"
            } else g = v < 0 ? "CLOSE" : "OPEN";
            return g
        }

        function k(a, c) {
            var b = 0;
            for (var d = a.length; b <
                d; b++)
                if (a[b].identifier == c) return a[b];
            return null
        }

        function g(a) {
            this.identifier = a.pointerId;
            this.clientX = a.clientX;
            this.clientY = a.clientY;
            this.pageX = a.pageX;
            this.pageY = a.pageY;
            this.screenX = a.screenX;
            this.screenY = a.screenY
        }
        var v = 0;
        var z = 0;
        var X = 0;
        var F = 0;
        var f = false;
        var h = 0;
        var m = 0;
        var n = 0;
        var p = 0;
        var q = false;
        var G = false;
        var P = 3;
        var ba = false;
        if (T) P *= 3;
        this.delay = false;
        var S = [];
        var r = this;
        this.handlePointer = function(a) {
            if (a.pointerType == a.MSPOINTER_TYPE_MOUSE || a.pointerType == "mouse") switch (a.type) {
                case "MSPointerDown":
                case "pointerdown":
                    Fa(a);
                    break;
                case "pointermove":
                case "MSPointerMove":
                    Ga(a);
                    break;
                case "pointerup":
                case "MSPointerUp":
                    Ha(a)
            } else {
                a.touches = a.changedTouches = [new g(a)];
                r.handle(a)
            }
        };
        this.handle = function(d) {
            var g = d.type;
            var r = 0;
            var u = d.touches;
            var x = d.changedTouches;
            var t = 0;
            var y = 0;
            var D = 0;
            var A;
            switch (g) {
                case "touchstart":
                case "MSPointerDown":
                case "pointerdown":
                    moveCount = 0;
                    moveSpace = 0;
                    ba = false;
                    z = "touchstart" == g ? u.length : z + 1;
                    G = false;
                    F = Date.now();
                    f = z == 1 && F - X < 200;
                    D = u[0];
                    v = D.identifier;
                    A = Ea(D.clientX, D.clientY, l);
                    h = A.x | 0;
                    m = A.y |
                        0;
                    q = true;
                    ba = e(u);
                    if (f || z > 2) cancelDefault(d);
                    if (z == 3) S = a(u);
                    break;
                case "pointermove":
                case "MSPointerMove":
                    if (z > 1) break;
                case "touchmove":
                    if (ba) return;
                    D = x[u.length - 1];
                    if (D.identifier != v) {
                        D = k(x, v);
                        if (!D) {
                            cancelDefault(d);
                            return
                        }
                    }
                    A = Ea(D.clientX, D.clientY, l);
                    t = A.x | 0;
                    y = A.y | 0;
                    if (q) {
                        if (t - h === 0 && y - m === 0) return;
                        if (Math.abs(t - h) < P && Math.abs(y - m) < P) {
                            cancelDefault(d);
                            return
                        }
                        q = false;
                        r = Date.now() - F;
                        G = r < 88;
                        if (G && !la() && z == 1) {
                            ba = true;
                            return
                        }
                        c.touchstart({
                            "x": h,
                            "y": m,
                            "flick": G,
                            "pointes": z,
                            "screenX": D.screenX,
                            "screenY": D.screenY,
                            "moved": true,
                            "target": d.target
                        })
                    }
                    cancelDefault(d);
                    c.touchmove({
                        "x": t,
                        "y": y,
                        "flick": G,
                        "pointes": z,
                        "moved": true,
                        "screenX": D.screenX,
                        "screenY": D.screenY,
                        "target": d.target
                    });
                    break;
                case "MSPointerUp":
                case "touchend":
                case "pointerup":
                    if (ba) return;
                    if (x.length + u.length == 3) {
                        c.touchend({
                            "x": t,
                            "y": y,
                            "flick": G,
                            "pointes": z,
                            "moved": !q,
                            "target": d.target,
                            "gesture": b(u, x)
                        });
                        z = 0;
                        break
                    } else {
                        if (z > 2) {
                            z = 0;
                            break
                        }
                        D = k(x, v);
                        if (D) {
                            var B = Date.now();
                            A = Ea(D.clientX, D.clientY, l);
                            t = A.x | 0;
                            y = A.y | 0;
                            if (!G) {
                                r = B - F;
                                if (q) {
                                    X = B;
                                    if (!f) {
                                        n =
                                            t;
                                        p = y
                                    } else cancelDefault(d);
                                    if (r < 500) {
                                        X = B;
                                        c.touchstart({
                                            "x": n,
                                            "y": p,
                                            "flick": false,
                                            "pointes": z,
                                            "screenX": D.screenX,
                                            "screenY": D.screenY,
                                            "moved": false,
                                            "target": d.target
                                        });
                                        c.touchend({
                                            "x": n,
                                            "y": p,
                                            "flick": false,
                                            "pointes": z,
                                            "moved": false,
                                            "screenX": D.screenX,
                                            "screenY": D.screenY,
                                            "target": d.target
                                        })
                                    } else c.longpress({
                                        "x": t,
                                        "y": y,
                                        "flick": false,
                                        "pointes": z,
                                        "moved": false,
                                        "screenX": D.screenX,
                                        "screenY": D.screenY,
                                        "target": d.target
                                    })
                                } else c.touchend({
                                    "x": t,
                                    "y": y,
                                    "flick": false,
                                    "pointes": z,
                                    "moved": true,
                                    "screenX": D.screenX,
                                    "screenY": D.screenY,
                                    "target": d.target
                                })
                            } else c.touchend({
                                "x": t,
                                "y": y,
                                "flick": true,
                                "pointes": z,
                                "moved": !q,
                                "screenX": D.screenX,
                                "screenY": D.screenY,
                                "target": d.target
                            })
                        }
                    }
                    z = 0;
                    break;
                case "MSPointerCancel":
                case "touchcancel":
                    z = 0
            }
            if (f) cancelDefault(d)
        }
    }

    function y() {
        m(true, 14);
        m(false, 14)
    }

    function pb(c) {
        try {
            if (c.select) c.select();
            else r.selectEditable(c)
        } catch (d) {
            svGlobal.logger.info(d)
        }
    }

    function tc(c, d) {
        if (c.value) c.value = d;
        else c.innerHTML = d
    }

    function Yb() {
        function c() {
            b.focus()
        }

        function d(a, b) {
            var d = document.createElement("a");
            d.href = "#";
            d.accessKey = a;
            d.onfocus = c;
            d.style.position = "absolute";
            d.style.width = 1;
            d.style.height = 1;
            d.style.left = 0;
            d.style.top = b + "px";
            return d
        }
        var e = h.forceTextArea || r.isIE;
        var a = document.createElement(e ? "textarea" : "div");
        var b = this;
        this.element = a;
        this.setFontSize = function(c) {
            a.style.fontSize = u.inputFontSize || c
        };
        if (e) {
            a.style.opacity = 0;
            a.readOnly = L && r.isMetro ? true : false
        } else a.contentEditable = L && !(r.isChrome && (r.isWindows || r.isCrOS)) ? false : true;
        a.accessKey = "f";
        a.id = "wsinput";
        a.tabIndex = 1;
        a.style.opacity =
            0;
        a.style.resize = "none";
        a.style.position = "absolute";
        a.style.margin = "0";
        a.style.border = "none";
        a.style.outline = "none";
        var k = hi5.tool.getPos(l, true);
        a.style.left = k.x + "px";
        a.style.top = k.y + "px";
        a.style.paddingRight = 0;
        a.style.paddingBottom = 0;
        a.style.width = "10px";
        a.style.height = "10px";
        a.style.zIndex = 88;
        a.style.cursor = "default";
        a.style.fontWeight = "normal";
        a.style.fonStyle = "normal";
        a.style.overflow = "hidden";
        J = new O(a);
        J.onbackspace = y;
        var g = l.parentNode;
        g.appendChild(a);
        if (T) {
            g.appendChild(d("E"), 60);
            g.appendChild(d("V"),
                61);
            g.appendChild(d("A"), 62);
            g.appendChild(d("T"), 63);
            g.appendChild(d("H"), 64)
        }
        var v = a.style.opacity;
        var z = a.style.textIndent;
        this.resetCSS = function() {
            _fontSize = a.style.fontSize;
            v = a.style.opacity;
            a.style.opacity = 0;
            a.style.textIndent = 0
        };
        this.restoreCSS = function() {
            a.style.opacity = v;
            a.style.textIndent = z
        };
        this.getValue = function() {
            return e ? a.value : a.innerHTML
        };
        this.setValue = function(c) {
            if (J) J.disableTextInput = true;
            if (e) a.value = c;
            else a.innerHTML = c;
            if (J) J.disableTextInput = false
        };
        this.focus = function() {
            b.setValue(" ");
            t(a)
        };
        this.setContentEditable = function(c) {
            if (e) {
                var b = c == "true";
                if (a.readOnly == b) a.readOnly = !b
            } else if (a.contentEditable != c) {
                a.contentEditable = c;
                if (c == "true" && T) r.selectEditable(a)
            }
        };
        this.isIMEMode = false;
        this.setIMEStatus = function(c) {
            if (c) {
                if (!b.isIMEMode) {
                    if (e) {
                        a.style.background = "transparent";
                        a.style.opacity = 1
                    }
                    b.isIMEMode = true
                }
            } else if (b.isIMEMode) {
                if (e) {
                    a.style.background = "";
                    a.style.opacity = 0
                }
                b.isIMEMode = false
            }
        };
        this.adjust = function(c) {
            var d = hi5.tool.getPos(l, true);
            q.offX = d.x;
            q.offY = d.y;
            var e =
                h.railWin ? Math.min(window.innerWidth - d.x, U) : U;
            var g = h.railWin ? Math.min(window.innerHeight - d.y, Q) : Q;
            var v = Math.min(window.innerWidth - d.x, U);
            var k = Math.min(window.innerHeight - d.y, Q);
            var z = Math.round(v * .7);
            var f = Math.round(k * (c ? .99 : .7));
            var G = e - z;
            var P = g - f;
            if (u.disableAdjust) {
                z = 0;
                f = 0;
                G = l.offsetWidth;
                P = l.offsetHeight
            }
            a.style.width = G + "px";
            a.style.height = P + "px";
            a.style.paddingLeft = z + "px";
            a.style.paddingTop = f + "px";
            a.style.left = d.x + "px";
            a.style.top = d.y + "px";
            a.style.textIndent = -(z + (T ? 48 : 0)) + "px";
            if (r.isFirefox) a.style.fontSize =
                0;
            if (L && r.isChrome) b.setFontSize("2em");
            if (!u.disableScoll) window.scrollTo(0, 0)
        };
        this.remove = function() {
            if (J) {
                J.release();
                J = null
            }
            if (a.parentNode) a.parentNode.removeChild(a);
            a = null
        };
        this.hide = function() {
            a.style.visibility = "hidden"
        };
        this.getElement = function() {
            return a
        };
        this.select = function() {
            pb(a)
        }
    }

    function Zb() {
        var c = window.innerWidth;
        var d = window.innerHeight;
        return Math.max(U, Q) < Math.max(c, d) && Math.min(U, Q) < Math.min(c, d)
    }

    function Ia() {
        function c() {
            if (!u.text) u.text = {};
            return u.text
        }

        function d(a) {
            return (a.measureText("W").width +
                1) * 1.2
        }

        function e(a) {
            var c = (a & 16777215).toString(16).toUpperCase();
            return "00000".substring(0, 6 - c.length) + c
        }

        function a(a, b, d, v, k) {
            if (g) {
                var f = c();
                a.fillStyle = f.backgroundFillStyle || "white";
                a.fillRect(b, d - k + 2, v, k);
                a.fillStyle = f.fillStyle || "#337788";
                a.textBaseline = "bottom";
                a.fillText(g, b + 3, d - 2);
                a.strokeStyle = "#" + e(g.hashCode());
                a.lineWidth = 3;
                a.beginPath();
                a.moveTo(b, d);
                a.lineTo(b + v, d);
                a.stroke()
            }
        }

        function b() {
            var b = f.getContext("2d");
            var e = b.getImageData(0, 0, f.cursorWidth, f.cursorHeight);
            if (g) {
                b.font =
                    c().font || "11px Arial";
                var v = d(b) + 4;
                f.width = Math.max(f.cursorWidth, b.measureText(g).width + 4);
                f.height = f.cursorHeight + v;
                a(b, 0, f.height - 1, f.width, v)
            }
            b.putImageData(e, 0, 0)
        }
        if (f) return;
        var k = l.parentNode;
        var g = "";
        f = k.querySelector('canvas[name="svImgCursor"]');
        if (f) return;
        f = document.createElement("canvas");
        f.name = "svImgCursor";
        f.style.position = "absolute";
        f.style.left = 90;
        f.style.top = 90;
        f.scrX = 0;
        f.scrY = 0;
        f.hotX = 10;
        f.hotY = 10;
        f.width = f.height = 32;
        f.style.visibility = "hidden";
        f.style.zIndex = 87;
        f.setCursor = function(b) {
            var e =
                b.width;
            var v = b.height;
            var k = b.rawData;
            var h = f.getContext("2d");
            if (k && e && v) {
                var l = e * v;
                var m = 0;
                var n = 0;
                var p = h.createImageData(e, v);
                var G = p.data;
                var P = 0;
                var ba = 0;
                if (g) {
                    h.font = c().font || "11px Arial";
                    P = h.measureText(g).width;
                    ba = d(h) + 4
                }
                f.cursorWidth = e;
                f.cursorHeight = v;
                f.hotX = b.hotX;
                f.hotY = b.hotY;
                f.width = Math.max(e, P + 4);
                f.height = v + ba + 4;
                if (g) a(h, 0, f.height - 1, f.width, ba);
                for (var S = 0; S < l; S++) {
                    m = k[S];
                    G[n++] = m & 255;
                    G[n++] = m >> 8 & 255;
                    G[n++] = m >> 16 & 255;
                    G[n++] = m >> 24 & 255
                }
                h.putImageData(p, 0, 0, 0, 0, e, v)
            }
        };
        f.hideCursor =
            function() {
                f.style.visibility = "hidden"
            };
        if (ta && ta.rawData) f.setCursor(ta);
        else {
            var v = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -1, -1, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -1, -1, -1, -16777216, -16777216, -16777216, -16777216, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -1, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -16777216, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -16777216, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -16777216, -1, -1, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, -16777216, -16777216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            f.setCursor({
                "rawData": v,
                "width": 32,
                "height": 32,
                "hotX": 10,
                "hotY": 10
            })
        }
        f.moveCursor = function(a, c, d) {
            f.style.left = a + "px";
            f.style.top = c + "px";
            if (g != d) {
                g = d;
                b()
            }
        };
        k.appendChild(f)
    }

    function $b() {
        ta = null;
        if (f) {
            if (f.parentNode) f.parentNode.removeChild(f);
            f = null
        }
    }

    function Ya(c) {
        if (u.disableScrollbars === false) return;
        var d = document.body;
        if (c) {
            Za = c;
            d.style.overflow = c;
            return
        }
        var e = U <= window.innerWidth &&
            Q <= window.innerHeight;
        Za = e ? "hidden" : "visible";
        d.style.overflow = Za
    }

    function Aa(c) {
        var d = l.parentNode;
        if (Zb()) {
            if (R != 1) {
                hi5.tool.scale(d, 1);
                R = ca = 1
            }
            return
        }
        document.body.style.overflow = "hidden";
        R = ca = c ? Math.min(window.innerWidth / U, window.innerHeight / Q) : 1;
        hi5.tool.scale(d, R, R)
    }

    function qb() {
        if (!n) n = new Yb;
        n.adjust()
    }

    function $a() {
        if (h.toolbar) h.toolbar.removeButton("svCloud");
        else {
            var c = hi5.$("svCloud");
            if (c) c.parentNode.removeChild(c)
        }
    }

    function rb() {
        var c = chrome.app.window.current();
        if (c) c.fullscreen()
    }

    function ac() {
        ua = null;
        if (document) {
            var c = n.element;
            document.removeEventListener("mousemove", Ga, false);
            c.removeEventListener("mousedown", Fa, false);
            document.removeEventListener("mouseup", Ha, false);
            c.removeEventListener("mouseleave", Ja, false);
            c.removeEventListener("mouseenter", Ja, false);
            c.removeEventListener("paste", x.onPaste, false);
            c.removeEventListener("copy", x.onCopy, false);
            c.removeEventListener("cut", x.onCopy, false);
            document.removeEventListener("visibilitychange", sb, false);
            if (x) {
                document.removeEventListener("paste",
                    x.onPaste, false);
                document.removeEventListener("copy", x.onCopy, false);
                document.removeEventListener("cut", x.onCopy, false)
            }
        }
        if (window) {
            window.removeEventListener("resize", tb, false);
            window.removeEventListener("beforeunload", ub, false);
            window.removeEventListener("focus", vb, false);
            window.removeEventListener("blur", wb, false);
            window.removeEventListener("unload", Ka, false);
            $b();
            if (h && h.toolbar) {
                h.toolbar.setFadable = null;
                h.toolbar.startFade = null;
                h.toolbar = null
            }
            try {
                if (pa && pa.parentNode) {
                    pa.parentNode.removeChild(pa);
                    pa = null
                }
                if (n) {
                    n.remove();
                    n = null
                }
            } catch (d) {}
        }
    }

    function xb(c) {
        if (!c) c = "div";
        var d = document.createElement(c);
        var e = document.body;
        d.id = "_tmpEditable";
        if (c == "div") d.contentEditable = true;
        d.style.position = "absolute";
        d.style.zIndex = 9999;
        d.style.left = e.scrollLeft + 50 + "px";
        d.style.top = e.scrollTop + 50 + "px";
        d.tabIndex = 2;
        d.style.outline = "none";
        d.style.opacity = 0;
        e.appendChild(d);
        return d
    }

    function vb(c) {
        ab.clearPDF();
        h.focused = true;
        p.onfocus(c);
        if (Z) {
            if (p.fromSyncedSurface) ea = p.fromSyncedSurface(1300);
            else ea = false;
            if (!ea) p.send("891" + (Z && T && !r.isEdge || h.onreqpaste || bb ? 1 : 0))
        }
        La = true;
        V.sendMissKey(true)
    }

    function ub(c) {
        var d = __svi18n.remoteApp.close;
        var e = yb || !h.railWin || !h.railWin.isRunning() || !d;
        if (e) return;
        if (!c) c = window.event;
        if (p.getAppMode() != 2) {
            h.showMessage(d);
            if (c) c.returnValue = d;
            return d
        }
    }

    function Ka(c) {
        if (h) {
            h.focused = false;
            if (h.onunload) h.onunload()
        }
    }

    function cb() {
        if (n) {
            n.element.oncontextmenu = function() {
                return false
            };
            if (!T) n.element.onselectstart = function() {
                return false
            }
        }
    }

    function zb() {
        if (n) {
            n.element.oncontextmenu =
                null;
            n.element.onselectstart = null
        }
    }

    function tb(c) {
        if (n) n.adjust();
        if (va) Aa(true);
        else {
            if (oa && Date.now() - oa < 2500) return;
            var d = r.isWindows && !r.isMetro;
            if (!L || d && !oa || r.isCrOS || r.isChromeApp) p.onresize(c)
        }
    }

    function wb() {
        if (h) {
            h.focused = false;
            h.blurTime = Date.now()
        }
    }

    function bc() {
        if (!window.svSurface) window.svSurface = h;
        window.addEventListener("resize", tb, false);
        if (fa) return;
        var c = !r.isChromeApp;
        if (c) window.addEventListener("beforeunload", ub, false);
        if (c) window.addEventListener("unload", Ka, false);
        else chrome.runtime.onSuspend.addListener(Ka);
        cb();
        window.addEventListener("focus", vb, false);
        window.addEventListener("blur", wb, false);
        if (r.isChromeApp && !u.disableMaxFullScn) chrome.app.window.current().onMaximized.addListener(rb);
        var d = hi5.$("saveSession");
        if (d) d.addEventListener("change", function(c) {
            p.saveSession({
                save: c.target.checked
            })
        })
    }

    function uc(c) {
        return c.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }

    function Ab() {
        if (N) return;
        var c = hi5.$("touchGesture");
        if (c) c.style.display = "block";
        var d = hi5.$("extKBD");
        if (d) d.onchange = function(a) {
            h.setExtKeyboard(a.target.checked)
        };
        N = hi5.$("svTouchInput");
        try {
            if (window.parent != window && !N) N = window.parent.document.getElementById("svTouchInput")
        } catch (a) {}
        if (!N) return;
        if (r.isWindows) {
            var e = document.createElement("div");
            e.contentEditable = true;
            e.id = "svTouchInput";
            N.parentNode.replaceChild(e, N);
            N = e
        }
        if (r.isChrome) N.style.fontSize = "2em";
        I = new O(N);
        I.onkeydown = I.onkeyup = Bb;
        I.ontextinput = Cb;
        I.onbackspace = y
    }

    function vc() {
        if (!pa) return;
        pa.style.display = "block";
        if (db) clearTimeout(db);
        db = setTimeout(inputTimeout, 3E3)
    }

    function wa(c, d) {
        function e(a,
            c) {
            var b = document.createElement("span");
            b.data_path = a;
            b.className = "path";
            b.innerHTML = c;
            b.onclick = function() {
                wa(this.data_path, d)
            };
            return b
        }

        function a(a) {
            for (var c = k; c.hasChildNodes();) c.removeChild(c.firstChild);
            var b = e("/", "&nbsp&nbsp&nbsp/");
            c.appendChild(b);
            if (a == "/" || a === "") return;
            var d = a.split("/");
            var f = "/";
            var h = 0;
            for (var l = d.length; h < l; h++) {
                var m = d[h];
                if (m === "") continue;
                f = f + d[h] + "/";
                b = e(f, m + "/");
                c.appendChild(b)
            }
        }

        function b(c) {
            function b(a) {
                if (!a) a = k.getValue("Name");
                var d = c.parent;
                if (d ===
                    "" || d.charAt(d.length - 1) != "/") d += "/";
                d += a;
                return d
            }
            if (c.error) h.showMessage(__svi18n.file[c.error]);
            var e = new hi5.DataTable(c);
            var k = new hi5.DataGrid(hi5.$("filelist"));
            k.dataTable = e;
            var f = hi5.tool.bytesToSize;
            k.beforeDisplayValue = function(a, c) {
                var b = e.cols[a].name;
                if (b == "Date Modified") return (new Date(c)).toLocaleString();
                else if (b == "Size") return f(c);
                else if (b == "Type" && "folder" == c) return __svi18n.file.folder;
                else if (b == "Name") return decodeURIComponent(c);
                else return c
            };
            k.onrowclick = function(a) {
                var e =
                    k.getValue("Name");
                var f = k.getValue("Type");
                var h = b(e);
                var z = a.target.name;
                if (z == "delete") {
                    K.removeFile(h);
                    wa(c.parent, d);
                    return
                }
                if (f == "folder") {
                    var G = c.parent == "/" ? "" : c.parent;
                    wa(G + "/" + e, d);
                    return
                }
                if (z == "view") h += "&action=view";
                p.getFile(h)
            };
            k.beforeAppendRow = function(a) {
                var c;
                var d = e.getValue(e.getColNo("Type"));
                if (d == "folder") {
                    c = a.querySelector('img[name="download"]');
                    if (c) c.style.visibility = "hidden";
                    return
                }
                a.draggable = true;
                var g = k.getValue("Name");
                var f = b(g);
                f = "application/octet-stream:" + g + ":" +
                    p.getFileLink(f);
                a.addEventListener("dragstart", function(a) {
                    a.dataTransfer.setData("DownloadURL", f)
                }, false);
                if (g.length > 10 && g.substring(g.length - 10) == ".uploading") {
                    c = a.querySelector('img[name="download"]');
                    if (c) c.style.visibility = "hidden";
                    c = a.querySelector('img[name="view"]');
                    if (c) c.style.visibility = "hidden"
                }
            };
            k.open();
            a(c.parent);
            var l = document.getElementById("__diskSpace");
            if (l) l.innerHTML = hi5.tool.bytesToSize(c.freeSpace) + "/" + hi5.tool.bytesToSize(c.totalSpace);
            d.resize();
            d.__position = "\\\\tsclient\\" +
                c.name + c.parent.replace(new RegExp("/", "g"), "\\")
        }
        var k = hi5.$("parentPath");
        if (!k.currentDir) k.currentDir = "/";
        if ("." == c) c = k.currentDir;
        else k.currentDir = c;
        k.currentDir = c;
        p.getShareFiles(c, b)
    }

    function Db(c) {
        if (c) cancelDefault(c);
        var d = hi5.$("filecontainer");
        aa = new hi5.Lightbox(d);
        wa(".", aa);
        aa.show();
        var e = document.getElementById("__sv_folder__");
        if (e && K.mkdirs) e.onclick = function() {
            var a = document.getElementById("__sv_folder_name_");
            if (a && a.value) {
                K.mkdirs(a.value);
                wa(".", aa)
            }
        };
        e = document.getElementById("__sv_position__");
        if (e) e.onclick = function() {
            p.writeKeyComb("Windows+R");
            setTimeout(function() {
                p.writeText(aa.__position);
                W(true, 28);
                W(false, 28)
            }, 555);
            aa.dismiss()
        }
    }

    function Eb() {
        var c = hi5.$("svToolbar");
        if (!c) return;
        var d = c.childNodes;
        var e = false;
        var a = 0;
        for (var b = d.length; a < b; a++)
            if (d[a].nodeType == 1 && ["svTouchInput", "svCloud", "svInfo"].indexOf(d[a].id) == -1) {
                e = true;
                break
            }
        var k = hi5.$("appinfo");
        var g = h.showToolbar && (L || K || k || e);
        if (g) {
            var v = h.toolbar === null;
            if (v) h.toolbar = new hi5.Toolbar(c);
            if (!L) {
                var f = hi5.$("svTouchInput");
                if (f) f.parentNode.removeChild(f)
            } else h.toolbar.activeObj = N;
            var l = h.toolbar.getButton("svCloud");
            if (l)
                if (K) {
                    l.style.display = "";
                    l.onclick = Db
                } else l.style.display = "none";
            var F = u.toolbar.fadeDelay || 5E3;
            new hi5.Fadable(h.toolbar, F, n.element);
            var m = u.toolbar.fadable;
            h.toolbar.setFadable(m);
            if (m) h.toolbar.style.display = "none";
            l = h.toolbar.getButton("svInfo");
            if (l)
                if (k) {
                    l.style.display = "";
                    if (v) l.onclick = function(a) {
                        cancelDefault(a);
                        var c = p.getAppInfo();
                        var b = hi5.$("numericId");
                        if (b) b.innerHTML = c.numericId;
                        b = hi5.$("connectingTo");
                        if (b) b.innerHTML = c.server;
                        b = hi5.$("joinLink");
                        if (b) b.href = b.innerHTML = c.joinLink;
                        var d = new hi5.Lightbox(hi5.$("appinfo"));
                        d.show();
                        zb();
                        d.onclose = cb
                    }
                } else l.style.display = "none";
            if (h.onloadtoolbar) h.onloadtoolbar(h.toolbar)
        }
    }

    function cc() {
        return n.element
    }

    function Fb(c) {
        K.addFiles(c.target.files, false);
        var d = hi5.$("uploadfile");
        var e = d.cloneNode(true);
        var a = d.parentNode;
        a.replaceChild(e, d);
        e.addEventListener("change", Fb, false)
    }

    function dc() {
        var c = cc();
        if (ia) ia.release();
        ia =
            new svGlobal.util.MapDisk(c, K, true);
        if (hi5.$("filecontainer")) {
            Ma = new svGlobal.util.MapDisk(hi5.$("filecontainer"), K, false);
            hi5.$("uploadfile").addEventListener("change", Fb, false)
        }
    }

    function Ja(c) {
        if (f) f.hideCursor()
    }

    function sb() {
        if (document.hidden == false && l) setTimeout(function() {
            if (l && p) {
                l.width++;
                l.width--;
                var c = p.refresh(q.left, q.top, q.right, q.bottom);
                if (c) B.putImageData(c.imgData, c.left - q.left, c.top - q.top, 0, 0, c.width, c.height)
            }
        }, 50)
    }

    function Gb(c) {
        if (B) {
            if (c - eb > Hb)
                if (q.isMultiMon) {
                    var d = Ba(q.left,
                        q.top, q.right, q.bottom);
                    if (d) {
                        B.putImageData(d.imgData, d.left - q.left, d.top - q.top, 0, 0, d.width, d.height);
                        eb = c
                    }
                } else {
                    d = Ba(0, 0, q.right, q.bottom);
                    if (d) {
                        B.putImageData(d.imgData, d.left, d.top, 0, 0, d.width, d.height);
                        eb = c
                    }
                }
            Na = requestAnimationFrame(Gb)
        }
    }

    function wc(c) {
        c = c.replace(/<br\/?>/gi, "\r\n").replace(/(<([^>]+)>)/gi, "");
        return c.replace(/&[^;]+;/gi, function(c) {
            return ec[c] || c
        })
    }

    function fc(c, d, e) {
        if (!f) return;
        if (f.style.visibility == "hidden") f.style.visibility = "visible";
        var a = f.scrX;
        var b = f.scrY;
        var k =
            a + c;
        var g = b + d;
        if (k < 0) k = 0;
        else if (k > U) k = U - 1;
        if (g < 0) g = 0;
        else if (g > Q) g = Q - 1;
        f.scrX = k;
        f.scrY = g;
        var v = k - f.hotX;
        var h = g - f.hotY;
        if (T) {
            v = v / R | 0;
            h = h / ca | 0
        }
        f.style.left = v + q.offX + "px";
        f.style.top = h + q.offY + "px";
        if (M && !e) p.sendInput("82" + k + "\t" + g);
        q.x = k;
        q.y = g
    }

    function Oa(c, d, e) {
        if (T) {
            c = c / R | 0;
            d = d / ca | 0
        }
        h.moveCursor(c, d, e)
    }

    function gc() {
        if (h.toolbar)
            if (h.toolbar.startFade) h.toolbar.startFade();
        if (N) N.focus()
    }

    function fb(c, d, e, a) {
        var b;
        var k;
        var g;
        switch (c) {
            case "touchstart":
                gb = false;
                if (f.scrX === 0 && f.scrY === 0) Oa(d - 50,
                    e - 50);
                if (a) {
                    if (h.beforemousedown) h.beforemousedown(f.scrX, f.scrY, 0);
                    p.sendInput("80" + f.scrX + "\t" + f.scrY + "\t0")
                }
                break;
            case "touchmove":
                b = d - Pa;
                k = e - xa;
                if (b === 0 && k === 0) return;
                g = Math.abs(Ib) < 5 && Math.abs(Jb) < 5 && (Math.abs(b) > 7 || Math.abs(k) > 7);
                if (!g) {
                    fc(b, k);
                    gb = true
                }
                Ib = b;
                Jb = k;
                break;
            case "touchend":
                var v = !gb && !a;
                if (v) {
                    if (h.beforemousedown) h.beforemousedown(f.scrX, f.scrY, 0);
                    p.sendInput("80" + f.scrX + "\t" + f.scrY + "\t0")
                }
                if (v || a) {
                    p.sendInput("81" + f.scrX + "\t" + f.scrY + "\t0");
                    if (h.aftermouseup) h.aftermouseup(f.scrX,
                        f.scrY, 0)
                }
        }
        Pa = d;
        xa = e
    }

    function Kb(c, d) {
        Oa(c, d);
        Qa(c, d, 2);
        Ra(c, d, 2)
    }

    function hc(c, d, e, a) {
        var b = e - c;
        var k = a - d;
        var g = Math.max(Math.abs(k), Math.abs(b)) / 2 | 0;
        if (g > 0) {
            var v = b / g | 0;
            var f = k / g | 0;
            for (var h = 0; h < g; h++) {
                c += v;
                d += f;
                Sa(c, d)
            }
        }
        if (c != e || d != a) Sa(e, a)
    }

    function ic(c) {
        if (M && qa)
            if ("ontouchstart" in window) qa.handle(c);
            else qa.handlePointer(c)
    }

    function Bb(c) {
        if (!M) return false;
        c.stopPropagation();
        V.check(c);
        var d = ja.getKeyCode(c);
        var e = c.type == "keydown";
        if (e)
            if (n) n.setIMEStatus(d == 229);
        if (d == 18) {
            if (Lb && e) hb =
                2 == (c.location || c.keyLocation);
            if (hb) return true
        }
        if (Mb(c, d, e)) return cancelDefault(c);
        if (d == 17 && !e) Ca = false;
        var a = ib(d, c);
        if (a > 0) {
            m(e, a);
            var b = c.target == n.element;
            var k = e && ya && n && d == 17 && (r.isFirefox || r.isSafari || T && !b);
            if (k)
                if (b) {
                    n.setValue("`\t`");
                    n.select()
                } else {
                    I.setValue("`\t`");
                    I.select()
                }
            return cancelDefault(c)
        }
        if (A || c.altKey && !hb || c.metaKey) {
            var g = d == 86 && (A || c.metaKey) && !(A && c.altKey) && Z;
            if (!g) da(e, d, c.key);
            if (e) Ta = d;
            if (d == 17 || (A || c.metaKey) && (d == 86 || d == 67 || d == 88)) {
                if (e)
                    if (d == 67 || d == 88) Ca =
                        true;
                return true
            }
            return c.altKey && !A || A && !c.altKey || c.metaKey ? cancelDefault(c) : true
        } else {
            if (d == Ta && !e && !(A && c.altKey)) {
                da(false, d, c.key);
                Ta = 0;
                return cancelDefault(c)
            }
            Ta = 0;
            return true
        }
    }

    function Mb(c, d, e) {
        switch (d) {
            case 8:
            case 35:
                if (!A && !c.metaKey) return false;
                if (!c.altKey || u.disableShortcuts) return false;
                m(e, 211);
                break;
            case 33:
                if (!c.altKey || u.disableShortcuts) return false;
                m(e, 15);
                break;
            case 34:
                if (!c.altKey || u.disableShortcuts) return false;
                if (e) {
                    m(true, 42);
                    m(true, 15)
                } else {
                    m(false, 15);
                    m(false, 42)
                }
                break;
            case 45:
                if (!c.altKey || u.disableShortcuts) return false;
                m(e, 1);
                break;
            case 36:
                if (!c.altKey || u.disableShortcuts) return false;
                if (e) {
                    m(false, 56);
                    m(true, 29);
                    m(true, 1)
                } else {
                    m(false, 1);
                    m(false, 29)
                }
                break;
            case 124:
                m(e, 59);
                break;
            case 125:
                m(e, 62);
                break;
            case 126:
                m(e, 63);
                break;
            case 127:
                m(e, 64);
                break;
            case 128:
                m(e, 87);
                break;
            case 129:
                m(e, 88);
                break;
            default:
                return false
        }
        return true
    }

    function jc(c) {
        if (!La || V.preKeyCode == 229 || V.preKeyCode == 0) return;
        V.ignoreText = true;
        var d = String.fromCharCode(c.charCode || c.keyCode || w.which);
        if (d.toUpperCase() == d.toLowerCase()) return;
        var e = d.toUpperCase() == d;
        var a = c.shiftKey ? !e : e;
        La = false;
        if (p.capsLock != a) {
            p.sendKeyboardSynchronize(false, p.numLock, a);
            if (V.preKeyCode) {
                W(true, 14);
                W(false, 14);
                var b = ja.getScancodeByKeyCode(V.preKeyCode);
                W(true, b);
                W(false, b)
            }
        }
    }

    function kc(c) {
        if (!M) return false;
        V.check(c);
        var d = ja.getKeyCode(c);
        var e = c.type == "keydown";
        var a = V.preKeyCode;
        if (e) {
            if (n) n.setIMEStatus(d == 229)
        } else if (n && n.isIMEMode)
            if (T)
                if (n) n.setIMEStatus(false);
        V.preKeyCode = d;
        if (d == 229 || a == 229 &&
            !e) return true;
        if (Mb(c, d, e)) return cancelDefault(c);
        if (lc(d, e, c)) return cancelDefault(c);
        var b = ja.getScancode(c);
        var k = ib(d, c) < 1 && !A && !c.altKey && !c.metaKey;
        if (!b) b = ib(d, c) || 0;
        var g = d == 86 && (Nb && !e || (c.ctrlKey || c.metaKey) && !(c.ctrlKey && c.altKey)) && Z;
        if (b > 0 && !g) m(e, b);
        else if (!g) da(e, d);
        if (d != 17) Nb = g;
        if (d == 17 || (A || c.metaKey) && (d == 86 || d == 67 || d == 88)) {
            if (e) {
                if (d == 17 && ya && n) {
                    n.setValue("`\t`");
                    n.select()
                }
                if (d == 67 || d == 88) Ca = true
            }
            if (d == 17 && !e) Ca = false;
            return true
        }
        var v = d == 144 || d == 16 || La && k;
        return v ? false :
            cancelDefault(c)
    }

    function Cb(c) {
        if (!M) return;
        if (V.ignoreText) {
            V.ignoreText = false;
            return
        }
        var d = c.data;
        if (!L && Ua && d.length == 1 && d.charCodeAt(0) < 128) return;
        if (d == "`\t`") return;
        var e = A || ra;
        if (e) d = d.toLowerCase();
        d = d.replace(/\u00a0/g, " ");
        p.sendInput("86" + d + "\t" + (e || Ua ? 1 : 0));
        if (ga) ga.resetModifier()
    }

    function jb() {
        m(true, 29);
        da(true, 86);
        da(false, 86);
        m(false, 29)
    }

    function mc(c) {
        var d = c.types.length === 0 || c.equals(x.clipData);
        var e = d ? "" : c.types.join(",");
        var a = 0;
        var b = true;
        if (!d) {
            var k = c.getData("text/html");
            if (k) {
                k = k.replace(/(<([^>]+)>)|\r?\n/gi, "");
                if (e.indexOf("text/richtext") == -1) e += ",text/richtext"
            } else k = c.getData("text/plain");
            if (k) a = k.hashCode();
            p.send("880" + e + "\t" + a);
            x.clipData = c
        }
        if (h.onclipdata) b = !h.onclipdata(c, d);
        if (b) setTimeout(jb, 500)
    }

    function lc(c, d, e) {
        if (c == 44) {
            if (A || e.shiftKey) {
                m(true, 128 | 55);
                m(false, 128 | 55)
            } else {
                m(true, 128 | 42);
                m(true, 128 | 55);
                m(false, 128 | 55);
                m(false, 128 | 42)
            }
            return true
        }
        if (c == 19)
            if (d) {
                m(true, 225);
                m(true, 29);
                m(true, 69);
                m(true, 225);
                m(true, 157);
                m(true, 197);
                return true
            } else {
                m(false,
                    29);
                return true
            }
        return false
    }

    function W(c, d) {
        if (h.onscancode) {
            var e = h.onscancode(c, d);
            if (e) {
                var a = 0;
                for (var b = e.length; a < b; a++) p.sendInput("84" + (e[a].down ? 0 : 49152) + "\t" + e[a].key);
                return
            }
        }
        p.sendInput("84" + (c ? 0 : 49152) + "\t" + d)
    }

    function m(c, d) {
        if (!M) return;
        switch (d) {
            case 221:
                if (c) {
                    W(true, 221);
                    W(false, 221);
                    return
                }
                break;
            case 58:
                if (c) {
                    p.capsLock = !p.capsLock;
                    if (Ob) {
                        W(true, 58);
                        W(false, 58);
                        return
                    }
                }
                break;
            case 69:
                if (c) p.numLock = !p.numLock;
                break;
            default:
                if (d > 70 && d < 84 && p.sendKeyboardSynchronize) p.sendKeyboardSynchronize(false,
                    true, p.capsLock)
        }
        if (d == 184) {
            W(c, 29);
            W(c, 56);
            return
        }
        var e = !c && (r.isCrOS && d > 61 && d < 69 || d == 58 && Ob || d == 95);
        if (e) W(true, d);
        if (d != 95) W(c, d)
    }

    function da(c, d, e) {
        if (!M) return;
        if (d == 111) {
            if (c) p.sendInput("86/\t1");
            return
        }
        var a = "8B" + (c ? 0 : 49152) + "\t" + d;
        if (e) a += "\t" + e;
        p.sendInput(a)
    }

    function Qa(c, d, e, a, b) {
        if (!a) a = R;
        if (!b) b = ca;
        if (ua[e]) return;
        ua[e] = true;
        c = (c / a | 0) + q.left;
        d = (d / b | 0) + q.top;
        if (h.beforemousedown) h.beforemousedown(c, d, e);
        p.sendInput("80" + c + "\t" + d + "\t" + e)
    }

    function Fa(c) {
        var d = c.target;
        t(d);
        if (!M) return false;
        if (n) n.setIMEStatus(false);
        if (!(A || c.shiftKey || c.metaKey || c.altKey)) V.sendMissKey();
        var e = Da(c);
        Qa(e.x, e.y, c.button);
        return cancelDefault(c)
    }

    function Sa(c, d, e, a) {
        if (!e) e = R;
        if (!a) a = ca;
        c = (c / e | 0) + q.left;
        d = (d / a | 0) + q.top;
        if (c < 0) c = 0;
        if (d < 0) d = 0;
        if (h.onmousemove) h.onmousemove(c, d);
        q.x = c;
        q.y = d;
        p.sendInput("82" + c + "\t" + d)
    }

    function Ga(c) {
        if (!M) return false;
        if (c.target != n.element && !ua[0]) return false;
        var d = Da(c, n.element);
        if (Va) Oa(d.x, d.y, true);
        Sa(d.x, d.y);
        return cancelDefault(c)
    }

    function Ra(c, d, e, a, b) {
        if (!a) a =
            R;
        if (!b) b = ca;
        ua[e] = false;
        c = (c / a | 0) + q.left;
        d = (d / b | 0) + q.top;
        if (c < 0) c = 0;
        if (d < 0) d = 0;
        p.sendInput("81" + c + "\t" + d + "\t" + e);
        if (h.aftermouseup) h.aftermouseup(c, d, e);
        if (r.isChrome && x) x.waitForCopyContent();
        nc = e == 2
    }

    function Ha(c) {
        if (!M) return false;
        if (c.target != n.element && !ua[0]) return false;
        var d = c.target;
        var e = Da(c, n.element);
        Ra(e.x, e.y, c.button);
        return cancelDefault(c)
    }

    function Pb(c, d, e, a, b) {
        if (!a) a = R;
        if (!b) b = ca;
        c = (c / a | 0) + q.left;
        d = (d / b | 0) + q.top;
        if (h.onmousewheel)
            if (h.onmousewheel(c, d, e)) return;
        p.sendInput("83" +
            c + "\t" + d + "\t" + e)
    }

    function Qb(c, d) {
        if (!M) return false;
        var e = Math.abs(c);
        var a = c < 0 ? 1 : 0;
        for (var b = 0; b < e; b++) Pb(d.x, d.y, a);
        return false
    }

    function ib(c, d) {
        var e = d.keyCode;
        if (e == 17) return d.location == 2 ? 157 : 29;
        else if (e == 16) return d.location == 2 ? 54 : 42;
        var a = oc[c];
        if (!a) a = -1;
        return a
    }

    function pc(c, d, e) {
        var a = document.createElement("canvas");
        var b = a.getContext("2d");
        var k = b.createImageData(d, e);
        var g = k.data;
        var v = d * e;
        var f = window.devicePixelRatio || 1;
        var h = 0;
        var l = 0;
        var m = 0;
        a.width = d;
        for (a.height = e; h < v; h++) {
            m =
                c[h];
            g[l++] = m & 255;
            g[l++] = m >> 8 & 255;
            g[l++] = m >> 16 & 255;
            g[l++] = m >> 24 & 255
        }
        b.putImageData(k, 0, 0, 0, 0, d, e);
        if (f == 1) return a.toDataURL();
        else if (a.toDataURLHD) return a.toDataURLHD();
        else {
            var n = document.createElement("canvas");
            var p = n.getContext("2d");
            n.width = d * f | 0;
            n.height = e * f | 0;
            p.scale(f, f);
            p.drawImage(a, 0, 0);
            return n.toDataURL()
        }
    }

    function qc(c) {
        if (c.none) return "none";
        else if (c.system) return c.system;
        else if (Va) return "none";
        else return "url(" + (c.url || pc(c.rawData, c.width, c.height)) + ") " + c.hotX + " " + c.hotY + ", default"
    }
    if (!l) l = hi5.$("remotectrl");
    if (window.svSurface && svSurface.canvas == l && svSurface.railWin) {
        svSurface.railWin.mainWin = null;
        return window.svSurface
    }
    var r = hi5.browser;
    var L = r.isTouch;
    var Wa = false;
    var p = null;
    var va = false;
    var R = 1;
    var ca = 1;
    l.style.outline = "none";
    var U = 0;
    var Q = 0;
    var rc = 0;
    var sc = 0;
    var B = l.getContext("2d");
    var J = null;
    var I = null;
    var Rb = false;
    var A = false;
    var ra = false;
    var za = false;
    var yb = false;
    var ea = false;
    var K = null;
    var Z = true;
    var Ca = false;
    var Nb = false;
    this.context = B;
    this.fileProgress = null;
    this.blurTime =
        0;
    var h = this;
    var M = true;
    var na = false;
    var fa = false;
    var Ua = false;
    var pa = null;
    var db = null;
    var aa = null;
    var f = null;
    var ta = null;
    var qa = null;
    var N = null;
    var oa = 0;
    var Pa = -1;
    var xa = -1;
    var Ib = 0;
    var Jb = 0;
    var gb = false;
    var Za = null;
    var Sb = document.queryCommandSupported("copy");
    var ob = false;
    var La = true;
    var q = {
        x: 0,
        y: 0,
        offX: 0,
        offY: 0,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        primary: false,
        isMultiMon: false
    };
    var Tb = 0;
    var Ub = 0;
    var ia = null;
    var Ma = null;
    var eb = 0;
    var Ba;
    var kb = false;
    var Vb = 0;
    var Na = 0;
    this._cr = [82, 69, 77, 79, 84, 69, 83, 80,
        65, 82, 75
    ];
    window.svSurface = this;
    var u = hi5.appcfg || {
        img: {},
        toolbar: {
            fadable: true
        }
    };
    var T = r.isIE;
    var Va = T && !u.disableCursor;
    var bb = r.isChromeApp || T && !r.isEdge || u.directClipAccess == true;
    this.setConfig = function(c) {
        u = c
    };
    this.toolbar = null;
    this.railWin = null;
    this.focused = false;
    this.showToolbar = true;
    this.canvas = l;
    this.alwaysPaste = false;
    this.mouseMoveEmu = false;
    this.forceTextArea = false;
    if ("visible" in u.toolbar) this.showToolbar = u.toolbar.visible;
    var Lb = false;
    var hb = false;
    var Da = r.getMousePos;
    var Ea = r.calMousePos;
    this.getWindow = function() {
        return window
    };
    this.setMonitor = function(c, d, e, a) {
        q.left = c;
        q.top = d;
        q.right = e;
        q.bottom = a;
        q.primary = c == 0 && d == 0;
        if (e != 0 && a != 0) {
            q.isMultiMon = false;
            h.setSize(e - c + 1, a - d + 1);
            q.isMultiMon = true;
            Ya("hidden")
        }
    };
    this.isClipSynced = function(c) {
        if (!ea) return false;
        var d = Date.now() - h.blurTime;
        if (c && d > c) return false;
        svGlobal.logger.info("clip synced in " + d);
        return true
    };
    this.getScale = function() {
        return {
            x: R,
            y: ca
        }
    };
    var ka = null;
    var ga = null;
    var lb = "";
    var ya = !r.isChromeApp && !u.copyDialog;
    this.getThumbnail =
        function(c) {
            c = c || 64;
            if (!ka) ka = document.createElement("canvas");
            var d = Math.floor(l.height / l.width * c);
            if (ka.width != c) ka.width = c;
            if (ka.height != d) ka.height = d;
            ka.getContext("2d").drawImage(l, 0, 0, l.width, l.height, 0, 0, c, d);
            return ka.toDataURL()
        };
    this.initChat = function(c) {
        var d = document.getElementById("chatWindow");
        hi5.Dragable(d);
        return new hi5.Chat(d, c)
    };
    this.equals = function(c) {
        return l == c.canvas
    };
    this.getFreeSpace = function() {
        var c = hi5.tool.getPos(l);
        var d = window.innerWidth - c.x;
        var e = window.innerHeight -
            c.y;
        if (d > screen.width) d = screen.width;
        if (e > screen.height) e = screen.height;
        return {
            "width": d,
            "height": e
        }
    };
    var ja = new function() {
        function c(a) {
            var c = null;
            var d = "K" + a;
            if (d in f) c = f[d]();
            if (c === null && (a == 1033 || a < 0 || a > 3758096384)) c = b;
            return c
        }
        var d = 1033;
        var e = r.isFirefox;
        var a = r.isMacOS || r.isiOS;
        var b = [0 | 0];
        var k = null;
        b[3] = 197;
        b[8] = 14;
        b[9] = 15;
        b[12] = 76;
        b[13] = 28;
        b[16] = 42;
        b[17] = 29;
        b[18] = 56;
        b[19] = 197;
        b[20] = 58;
        b[27] = 1;
        b[33] = 201;
        b[34] = 209;
        b[35] = 207;
        b[36] = 199;
        b[37] = 203;
        b[38] = 200;
        b[39] = 205;
        b[40] = 208;
        b[44] = 55;
        b[45] =
            210;
        b[46] = 211;
        b[48] = 11;
        b[49] = 2;
        b[50] = 3;
        b[51] = 4;
        b[52] = 5;
        b[53] = 6;
        b[54] = 7;
        b[55] = 8;
        b[56] = 9;
        b[57] = 10;
        b[65] = 30;
        b[66] = 48;
        b[67] = 46;
        b[68] = 32;
        b[69] = 18;
        b[70] = 33;
        b[71] = 34;
        b[72] = 35;
        b[73] = 23;
        b[74] = 36;
        b[75] = 37;
        b[76] = 38;
        b[77] = 50;
        b[78] = 49;
        b[79] = 24;
        b[80] = 25;
        b[81] = 16;
        b[82] = 19;
        b[83] = 31;
        b[84] = 20;
        b[85] = 22;
        b[86] = 47;
        b[87] = 17;
        b[88] = 45;
        b[89] = 21;
        b[90] = 44;
        b[91] = 219;
        b[92] = 220;
        b[93] = 221;
        b[96] = 82;
        b[97] = 79;
        b[98] = 80;
        b[99] = 81;
        b[100] = 75;
        b[101] = 76;
        b[102] = 77;
        b[103] = 71;
        b[104] = 72;
        b[105] = 73;
        b[106] = 55;
        b[107] = 78;
        b[109] = 74;
        b[110] = 83;
        b[111] =
            181;
        b[112] = 59;
        b[113] = 60;
        b[114] = 61;
        b[115] = 62;
        b[116] = 63;
        b[117] = 64;
        b[118] = 65;
        b[119] = 66;
        b[120] = 67;
        b[121] = 68;
        b[122] = 87;
        b[123] = 88;
        b[144] = 69;
        b[145] = 70;
        b[154] = 183;
        b[166] = 59;
        b[167] = 60;
        b[168] = 61;
        b[173] = 66;
        b[174] = 67;
        b[175] = 68;
        b[182] = 63;
        b[183] = 62;
        b[216] = 64;
        b[217] = 65;
        b[186] = 39;
        b[187] = 13;
        b[188] = 51;
        b[189] = 12;
        b[190] = 52;
        b[191] = 53;
        b[192] = 41;
        b[219] = 26;
        b[220] = 43;
        b[221] = 27;
        b[222] = 40;
        b[224] = 29;
        b[225] = 184;
        var g = function(a) {
            var c = a.keyCode;
            if (e) {
                switch (c) {
                    case 173:
                        return 189;
                    case 61:
                        return 187;
                    case 59:
                        return 186;
                    case 224:
                        return 17
                }
                return c
            }
            return c
        };
        var v = a ? function(a) {
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
        } : null;
        this.setLayout = function(a) {
            d = a;
            k = c(a);
            if (k !== null) svGlobal.logger.info("Keyboard layout: " + d)
        };
        this.getKeyCode = function(a) {
            if (a.key == 'б' || a.key == 'Б') return 188;
            if (a.key == 'ю' || a.key == 'Ю') return 190;
            if (a.key == 'ж' || a.key == 'Ж') return 186;
            if (a.key == 'х' || a.key == 'Х') return 219;
            if (a.key == 'э' || a.key == 'Э') return 222;
            if (a.key == 'ъ' || a.key == 'Ъ') return 221;
            var c = 0;
            if (v) c = v(a.keyCode);
            if (!c) c = g ? g(a) : a.keyCode;
            return c
        };
        this.getScancode = function(a) {
            var c = ja.getKeyCode(a);
            if (c == 17) return a.location == 2 ? 157 : 29;
            else if (c == 16) return a.location == 2 ? 54 : 42;
            return k ? k[c] : 0
        };
        this.getScancodeByKeyCode = function(a) {
            return k ? k[a] : 0
        };
        this.getCodeTable =
            function() {
                return k
            };
        this.getLayoutCreator = function() {
            return f
        };
        var f = new function() {
            function a() {
                var c = b.slice(0);
                c[220] = 41;
                c[219] = 12;
                c[221] = 13;
                c[186] = 26;
                c[187] = 27;
                c[191] = 43;
                c[192] = 39;
                c[189] = 53;
                c[226] = 86;
                if (e) {
                    c[171] = 27;
                    c[173] = 53;
                    g = function(a) {
                        var c = a.keyCode;
                        var b = a.key;
                        if (c === 0)
                            if (b == "\u00ba" || b == "\u00aa" && a.shiftKey || b == "\\" && a.ctrlKey && a.altKey) return 220;
                            else if (b == "\u00a1" || b == "\u00bf" && a.shiftKey) return 221;
                        else if (b == "\u00e7" || b == "\u00c7" && a.shiftKey || b == "}" && a.ctrlKey && a.altKey) return 191;
                        else if (b == "\u00f1" || b == "\u00d1" && a.shiftKey) return 192;
                        else {
                            if (b == "DeadAcute" || b == "\u00b4\u00b4" || b == "\u00b4" || b == "DeadUmlaut" && a.shiftKey || b == "{" && a.ctrlKey && a.altKey) return 222
                        } else if (c == 192) return 186;
                        else if (c == 222) return 219;
                        return c
                    }
                }
                return c
            }

            function c() {
                var a = b.slice(0);
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
                if (e) g = function(a) {
                    var c = a.keyCode;
                    var b = a.key;
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
                            if (b == "\u00f6" || b == "\u00d6" && a.shiftKey) return 192;
                            else if (b == "\u00e4" || b == "\u00c4" && a.shiftKey) return 222;
                            else if (b == "\u00fc" || b == "\u00dc" && a.shiftKey) return 186
                    }
                    return c
                };
                return a
            }

            function d() {
                var a = b.slice(0);
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
                if (e) g = function(a) {
                    var c = a.keyCode;
                    var b = a.key;
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
                            if (b == "\u00b2" || b == "\u00b3" && a.shiftKey) return 222;
                            else if (b == "\u00b5" || b == "`\u00b5" || b == "DeadGrave" || b == "\u00a3" && a.shiftKey) return 220;
                            else if ((b == "`" || b == "``") && a.ctrlKey && a.altKey) return 220
                    }
                    return c
                };
                return a
            }

            function k() {
                var a = b.slice(0);
                a[222] = 41;
                a[192] = 40;
                a[226] = 86;
                if (e) g = function(a) {
                    var c = a.keyCode;
                    var b = a.key;
                    switch (c) {
                        case 0:
                            if (b == "\u00b0" || b == "\u00ac" && a.ctrlKey && a.altKey) return 222;
                            else if (b == "\u00e7" || b == "\u00c7" && a.shiftKey) return 221;
                            else if (b == "\u00e0" || b == "DeadGrave" || b == "\u00c0" && a.shiftKey) return 220;
                            else if (b == "\u00e8" || b == "\u00c8" && a.shiftKey) return 192;
                            else if (b == "\u00e9" || b == "\u00c9" && a.shiftKey) return 191;
                            else if (b == "\u00f9" || b == "\u00d9" && a.shiftKey) return 226;
                            else if (b == "DeadTilde") return 221;
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
                };
                return a
            }

            function v() {
                var a = b.slice(0);
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
                if (e) g = function(a) {
                    var c = a.keyCode;
                    var b = a.key;
                    switch (c) {
                        case 0:
                            if (b == "\u00b2") return 222;
                            else if (b == "\u00e7" || b == "\u00c7" && a.shiftKey) return 221;
                            else if (b == "\u00e0" || b == "\u00c0" && a.shiftKey) return 220;
                            else if (b == "\u00e8" || b == "\u00c8" && a.shiftKey) return 192;
                            else if (b == "\u00e9" || b == "\u00c9" && a.shiftKey) return 189;
                            else if (b == "\u00f9" || b == "\u00d9" && a.shiftKey) return 226;
                            else if (b == "DeadTilde") return 221;
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
                };
                return a
            }

            function f() {
                var a = b.slice(0);
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
                if (e) g = function(a) {
                    var c =
                        a.keyCode;
                    var b = a.key;
                    switch (c) {
                        case 0:
                            if (b == "\u00a7" || b == "\u00b0" && a.shiftKey) return 191;
                            else if (b == "\u00e0" || b == "\u00e4" && a.shiftKey || b == "{" && a.ctrlKey && a.altKey) return 220;
                            else if (b == "\u00e8" || b == "\u00fc" && a.shiftKey || b == "[" && a.ctrlKey && a.altKey) return 186;
                            else if (b == "\u00e9" || b == "\u00f6" && a.shiftKey) return 222;
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
                };
                return a
            }

            function h() {
                var a = b.slice(0);
                a[220] = 41;
                a[187] =
                    12;
                a[219] = 13;
                a[221] = 26;
                a[186] = 27;
                a[191] = 43;
                a[192] = 39;
                a[222] = 40;
                a[189] = 53;
                a[226] = 86;
                if (e) g = function(a) {
                    var c = a.keyCode;
                    var b = a.key;
                    switch (c) {
                        case 0:
                            if (b == "\u00e5" || b == "\u00c5" && a.shiftKey) return 221;
                            else if (b == "\u00f8" || b == "\u00d8" && a.shiftKey || b == "\u00f6" && a.ctrlKey && a.altKey) return 192;
                            else if (b == "\u00e6" || b == "\u00c6" && a.shiftKey || b == "\u00e4" && a.ctrlKey && a.altKey) return 222;
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
                };
                return a
            }

            function l() {
                var a = b.slice(0);
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
                if (e) g = function(a) {
                    var c = a.keyCode;
                    var b = a.key;
                    switch (c) {
                        case 0:
                            if (b == "\u00a7" || b == "\u00bd" && a.shiftKey) return 220;
                            else if (b == "\u00e5" || b == "\u00c5" && a.shiftKey) return 221;
                            else if (b == "\u00f8" || b == "\u00d8" && a.shiftKey || b == "\u00f6" && a.ctrlKey && a.altKey) return 192;
                            else if (b == "\u00e4" || b == "\u00c4" && a.shiftKey) return 222;
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
                };
                return a
            }
            this.K3758162961 = function P() {
                var a = b.slice(0);
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
                if (e) {
                    a[173] = 12;
                    a[160] = 13;
                    a[64] = 26;
                    a[59] = 39;
                    a[58] = 40;
                    g = function(a) {
                        return a.keyCode == 220 && a.key == "_" ? 226 : a.keyCode
                    }
                }
                return a
            };
            this.K1034 = this.K66570 = this.K2058 =
                this.K1040 = this.K66576 = a;
            this.K2057 = function ba() {
                var a = b.slice(0);
                a[223] = 41;
                a[222] = 43;
                a[192] = 40;
                a[220] = 86;
                if (e) {
                    a[192] = 41;
                    a[173] = 12;
                    a[61] = 13;
                    a[59] = 39;
                    a[222] = 40;
                    a[163] = 43
                }
                return a
            };
            this.K1031 = this.K4106 = this.K5130 = this.K6154 = this.K7178 = this.K8202 = this.K9226 = this.K10250 = this.K11274 = this.K12298 = this.K13322 = this.K14346 = this.K15370 = this.K16395 = this.K17418 = this.K18442 = this.K19466 = this.K20490 = this.K99997 = this.K66567 = this.K2952791047 = c;
            this.K2060 = this.K99998 = d;
            this.K3084 = this.K4105 = k;
            this.K1036 = v;
            this.K4108 =
                this.K2055 = f;
            this.K1044 = this.K1083 = h;
            this.K1053 = l;
            this.K1055 = function() {
                var a = b.slice(0);
                a[220] = 52;
                a[223] = 12;
                a[189] = 13;
                a[191] = 51;
                a[188] = 43;
                a[190] = 53;
                a[226] = 86;
                if (e) g = function(a) {
                    var c = a.keyCode;
                    var b = a.key;
                    switch (c) {
                        case 0:
                            if (b == "\u011f" || b == "\u011e" && a.shiftKey || a.ctrlKey && a.altKey && a.code == "BracketLeft") return 219;
                            else if (b == "\u00fc" || b == "\u00dc" && a.shiftKey || a.ctrlKey && a.altKey && a.code == "BracketRight") return 221;
                            else if (b == "\u015f" || b == "\u015e" && a.shiftKey || a.ctrlKey && a.altKey && a.code == "Semicolon") return 186;
                            else if (b == "\u00f6" || b == "\u00d6" && a.shiftKey) return 191;
                            else if (b == "\u00e7" || b == "\u00c7" && a.shiftKey) return 220;
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
                };
                return a
            }
        }
    };
    this.getKeyboardMgr = function() {
        return ja
    };
    var x = new function d() {
        function e(a) {
            return a.search(/<.*(font|color|img|table|style|class).*>/gmi) > -1
        }

        function a(a, b) {
            var d = x.parseClipData(b);
            if (u.copyTextOnly && d.type != "text/plain") return;
            if (C(d)) return;
            if (r.isEdge && d.type !=
                "text/plain") {
                n.resetCSS();
                n.setValue(d.value);
                n.select();
                setTimeout(function() {
                    n.setValue("");
                    if (I) I.setValue("");
                    n.restoreCSS();
                    if (d.value.indexOf("data-sv-img") > 0) mb.open(d.value, __svi18n.info.copy)
                }, 555)
            } else {
                a.clipboardData.setData(d.type, d.value);
                if (d.type != "text/plain") {
                    var e = hi5.browser.html2text(d.value);
                    if (e) a.clipboardData.setData("text/plain", e)
                }
                a.preventDefault()
            }
        }

        function b(a) {
            return a.replace(/<br>/gi, "\n").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&lt;/gi,
                "<").replace(/&gt;/gi, ">")
        }

        function k() {
            if (!x) return;
            if (x.copyContent) {
                x.copyToClipboard(x.copyContent.type, x.copyContent.value);
                x.copyContent = null
            }
            x.waitingCopyContent = false
        }
        this.release = function() {
            x.clipData = null
        };
        this.clipData = null;
        this.paste = function(a, b, d) {
            var g = new H;
            var k = 0;
            var f = "";
            var h = null;
            h = window.clipboardData || b.clipboardData;
            var l = null;
            var m = h ? h.getData(window.clipboardData ? "Text" : "text/plain") : "";
            if (m) g.setData("text/plain", m);
            else if (h && !u.pasteTextOnly) {
                var n = h.items;
                if (n)
                    for (k =
                        0, len = n.length; k < len; k++) {
                        if (n[k].type == "image/png") {
                            l = n[k].getAsFile();
                            break
                        }
                    } else if (h.files) {
                        var p = h.files;
                        for (k = 0, len = p.length; k < len; k++)
                            if (p[k].type.indexOf("image/png") != -1) {
                                l = p[k];
                                break
                            }
                    }
            }
            if (l) {
                var q = new FileReader;
                b.preventDefault();
                q.onloadend = function(b) {
                    if (b.target.readyState == FileReader.DONE) {
                        var d = hi5.Base64.enc(new Uint8Array(b.target.result));
                        g.setData("image/png", d);
                        a(g)
                    }
                };
                q.readAsArrayBuffer(l)
            } else {
                if (bb) {
                    b.preventDefault();
                    g = x.getClipContent();
                    if (g) a(g);
                    return
                }
                if (m)
                    if (!u.pasteTextOnly) {
                        m =
                            h.getData("text/rtf");
                        if (m) g.setData("text/richtext", m);
                        f = h.getData("text/html");
                        if (f) {
                            k = f.lastIndexOf("</html>");
                            if (k) f = f.substring(0, k + 7);
                            g.setData("text/html", f);
                            a(g);
                            return
                        }
                    } else {
                        a(g);
                        return
                    }
                if (J) J.disableTextInput = true;
                if (I) I.disableTextInput = true;
                b.target.innerHTML = "";
                var r = b.target.style.opacity;
                b.target.style.opacity = 0;
                setTimeout(function() {
                    var d = b.target.innerHTML;
                    if (d) {
                        var k = b.target.childNodes;
                        if (e(d))
                            if (k.length == 1 && k[0].nodeName == "IMG" && k[0].src.indexOf("data:image/png;base64,") === 0) g.setData("image/png",
                                k[0].src.substring(22));
                            else g.setData("text/html", "<body>" + d + "</body>");
                        else if (g.types.length === 0) g.setData("text/plain", d);
                        if (J) J.init();
                        else b.target.innerHTML = ""
                    }
                    a(g);
                    b.target.style.opacity = r;
                    if (J) J.disableTextInput = false;
                    if (I) I.disableTextInput = false
                }, 300)
            }
        };
        var g = 0;
        this.onCopy = function(b) {
            if (b.target != n.element || N && b.target != N) return;
            if (!M || !Z) cancelDefault(b);
            if (!Ca) {
                m(true, 29);
                var d = b.type == "copy" ? "67" : 88;
                da(true, d);
                da(false, d);
                m(false, 29)
            }
            if (Rb) {
                var e = Date.now();
                var k = e - g;
                g = e;
                if (k > 500) return
            }
            if (!Z ||
                bb) return;
            lb = p.getClipData();
            a(b, lb);
            x.clipData = null;
            ea = true;
            svGlobal.logger.info("clip synced: true")
        };
        this.onPaste = function(a) {
            if (a.target != n.element && a.target != N) return;
            if (!M || !Z) return cancelDefault(a);
            if (!h.alwaysPaste && ea) {
                var b = true;
                if (h.onclipdata) b = !h.onclipdata(x.clipData, true);
                if (b) setTimeout(jb, 500);
                svGlobal.logger.info("Ctrl+V only");
                return cancelDefault(a)
            }
            ea = true;
            x.paste(mc, a, null);
            return true
        };
        this.parseClipData = function(a) {
            var b = a.indexOf(";");
            var d = a.substring(0, b);
            a = a.substring(b +
                1);
            return {
                type: d,
                value: a
            }
        };
        this.getClipContent = function() {
            if (!document.queryCommandSupported("paste")) return null;
            var a = xb(u.pasteTextOnly ? "textarea" : "div");
            a.focus();
            try {
                if (document.queryCommandEnabled("paste")) {
                    var d = document.execCommand("paste");
                    if (d) {
                        var e = new H;
                        if (!u.pasteTextOnly) e.setData("text/html", "<body>" + a.innerHTML + "</body>");
                        e.setData("text/plain", u.pasteTextOnly ? a.value : a.innerText || b(a.innerHTML));
                        return e
                    }
                }
            } finally {
                a.parentNode.removeChild(a);
                if (n) n.focus()
            }
            return null
        };
        this.getContent =
            function() {
                var a = x.getClipContent();
                if (n) n.element.removeEventListener("click", x.getContent, false);
                if (a && !a.equals(x.clipData)) {
                    x.clipData = a;
                    p.send("880text/plain,text/html\t0");
                    return true
                } else return false
            };
        this.startPasteCmd = function() {
            if (n && document.queryCommandSupported("paste")) n.element.addEventListener("click", x.getContent)
        };
        this.waitingCopyContent = false;
        this.copyContent = null;
        this.waitForCopyContent = function() {
            x.waitingCopyContent = true;
            setTimeout(k, 700)
        };
        this.copyToClipboard = function(a, b) {
            var d =
                a == "text/plain" ? "textarea" : "div";
            var e = xb(d);
            var g = false;
            if (d == "div") {
                e.innerHTML = b;
                e.focus();
                r.selectEditable(e)
            } else {
                e.value = b;
                e.focus();
                e.select()
            }
            try {
                g = document.execCommand("copy", false, null)
            } catch (k) {} finally {
                e.parentNode.removeChild(e);
                if (n) n.focus()
            }
            ea = true;
            if (!g) {
                mb.open(b, __svi18n.info.copy, d);
                return
            }
            return g
        }
    };
    var Ob = r.isMacOS || r.isiOS;
    var V = new function e() {
        this.altUp = this.shiftUp = this.winUp = this.ctrlUp = true;
        this.preKeyCode = 0;
        this.ignoreText = false;
        var a = this;
        this.sendMissKey = function(b) {
            if (!a.shiftUp ||
                b) {
                m(false, 42);
                a.shiftUp = true
            }
            if (!a.altUp || b) {
                if (!a.altUp) {
                    m(false, 56);
                    m(true, 56)
                }
                m(false, 56);
                a.altUp = true
            }
            if (!a.ctrlUp || b) {
                m(false, 29);
                a.ctrlUp = true
            }
            if (!a.winUp || b) {
                m(false, 219);
                a.winUp = true
            }
        };
        this.check = function(b) {
            var e = ja.getKeyCode(b);
            var g = b.type == "keydown";
            switch (e) {
                case 16:
                    if (g && a.shiftUp && !b.altKey && !A && !b.metaKey) a.sendMissKey();
                    a.shiftUp = !g;
                    break;
                case 17:
                    if (g && a.ctrlUp && !b.altKey && !b.shiftKey) a.sendMissKey();
                    a.ctrlUp = !g;
                    A = g;
                    break;
                case 18:
                    if (g && a.altUp && !b.shiftKey && !A && !b.metaKey) a.sendMissKey();
                    a.altUp = !g;
                    break;
                case 91:
                case 92:
                    if (g && a.winUp && !b.shiftKey && !A && !b.metaKey && !b.altKey) a.sendMissKey();
                    a.winUp = !g;
                    break;
                default:
                    if (g && !(A || b.altKey || b.shiftKey || b.metaKey)) a.sendMissKey()
            }
        }
    };
    this.requestCredential = function(e, a) {
        Wa = false;
        var b = __svi18n.template.login;
        if (!b) {
            h.showMessage("No value for login template");
            return
        }
        var k = document.createElement("div");
        k.className = "appdlg";
        k.innerHTML = b;
        document.body.appendChild(k);
        var g = hi5.$("loginDomain");
        if (g && e.nbDomain) g.innerHTML = e.nbDomain;
        var f = new hi5.Lightbox(k,
            .9);
        f.onclose = function() {
            document.body.removeChild(k)
        };
        f.show();
        g = hi5.$("loginUser");
        if (g) g.focus();
        g = hi5.$("frmLogin");
        if (g) g.onsubmit = function() {
            var b = hi5.$("loginUser").value;
            var e = hi5.$("loginPassword").value;
            var g = hi5.$("loginDomain").innerHTML;
            f.dismiss();
            setTimeout(function() {
                a(b, e, g)
            }, 5);
            return false
        }
    };
    var n = null;
    if (L) Ab();
    else {
        var nb = hi5.$("tmContainer");
        if (nb) nb.parentNode.removeChild(nb)
    }
    if (L && r.isSafari) window.addEventListener("scroll", function() {
        setTimeout(function() {
            var e = hi5.$("pc_key");
            if (e) e.style.top = window.pageYOffset + "px";
            if (h.toolbar) h.toolbar.style.top = window.pageYOffset + "px"
        }, 200)
    }, false);
    this.setCaretPos = function(e, a) {
        rc = e;
        sc = a
    };
    this.showMessage = function(e, a) {
        if (e && u.displayMsg) hi5.notifications.notify(typeof e == "string" ? {
            "msg": e,
            "timeout": a || 0
        } : e)
    };
    this.hideWhenClose = "hideWhenClose" in u ? u.hideWhenClose : true;
    this.setReadOnly = function(e) {
        M = !e
    };
    this.setPlayerMode = function() {
        fa = true;
        h.showToolbar = false;
        h.setReadOnly(true);
        h.hideWhenClose = false
    };
    this.setAutoScale = function(e) {
        var a =
            "autoScale" in u;
        if (a) e = u.autoScale;
        if (e) {
            Aa(true);
            Ya("hidden")
        } else if (!a) Aa(false);
        va = e
    };
    if (Va) Ia();
    this.setTouchpad = function(e) {
        na = e;
        var a = hi5.$("touchpadMode");
        if (a) {
            a.checked = e;
            a.onchange = function(a) {
                na = a.target.checked
            }
        }
        if (e) {
            if (!f) Ia()
        } else if (f && f.parentNode) {
            f.parentNode.removeChild(f);
            f = null
        }
    };
    this.setExtKeyboard = function(e) {
        if (L) {
            ob = true;
            n.adjust(true);
            n.setContentEditable(e ? "true" : "false");
            oa = e ? 1 : 0;
            if (r.isChrome) n.setFontSize("2em");
            if (e) n.focus();
            var a = hi5.$("extKBD");
            if (a && a.checked !=
                e) a.checked = e
        }
    };
    this.focus = function() {
        if (n) t(n.element)
    };
    this.getInputElement = function() {
        return n
    };
    this.scaleTo = function(e, a, b) {
        var k = e / U;
        var g = a / Q;
        if (!b) {
            k = Math.min(k, g);
            g = k;
            R = k;
            ca = k
        } else {
            R = k;
            ca = g
        }
        hi5.tool.scale(l.parentNode, k, g)
    };
    this.setSize = function(e, a, b) {
        if (q.isMultiMon) return;
        if (q.right != q.left + e - 1) {
            q.right = q.left + e - 1;
            q.bottom = q.top + a - 1
        }
        U = e;
        Q = a;
        if (!va) Ya(b);
        l.width = U;
        l.height = Q;
        if (p) h.drawText(__svi18n.wait);
        if (va) Aa(true);
        if (L) Ab();
        qb();
        if (aa && aa.visible()) aa.dismiss()
    };
    this.reposition = function() {
        n.adjust()
    };
    this.setController = function(e) {
        p = e;
        Ba = e.draw;
        if (!p.sendInput) p.sendInput = p.send;
        if (L) r.setOrientaionHandler(function() {
            if (va) Aa(true);
            else setTimeout(function() {
                p.onorientationchange({
                    svSurface: h,
                    innerWidth: window.innerWidth,
                    innerHeight: window.innerHeight
                });
                if (!u.disableScoll) window.scrollTo(0, 0)
            }, 300)
        })
    };
    this.setFileHandler = function(e) {
        if (!("FileReader" in window)) e = null;
        if (e) {
            if (!K && !fa) {
                K = e;
                K.addEvent("uploaded", function(a) {
                    if (a) return;
                    if (hi5.$("filecontainer") && Vb & 16) {
                        if (hi5.$("__cancelUpload")) hi5.$("__cancelUpload").style.visibility =
                            "hidden";
                        h.fileProgress.maxValue = 0;
                        h.fileProgress.style.display = "none";
                        h.refreshFiles();
                        h.showMessage(__svi18n.file.uploadDone, 5E3)
                    }
                });
                K.addEvent("uploadstarted", function(a) {
                    if (a) setTimeout(jb, 999)
                });
                if (hi5.$("filecontainer")) {
                    h.fileProgress = new hi5.ProgressBar(hi5.$("total"));
                    var a = hi5.$("__cancelUpload");
                    if (a) a.addEventListener("click", function() {
                        K.cancelAll()
                    }, false);
                    K.addEvent("beforeupload", function(b, e, g) {
                        if (g) return;
                        if (a) a.style.visibility = "visible";
                        h.fileProgress.style.display = "block";
                        h.fileProgress.maxValue +=
                            b.size
                    });
                    K.addEvent("progress", function(a) {
                        h.fileProgress.setProgress(a)
                    })
                } else $a()
            }
        } else {
            K = null;
            h.fileProgress = null;
            $a();
            if (ia) {
                ia.release();
                ia = null
            }
        }
        Eb();
        dc()
    };
    this.setFeature = function(e) {
        Vb = e;
        var a;
        var b = fa || !(e & 16) && !(e & 65536);
        var k = !(e & 16);
        var g = !(e & 65536);
        if (k || fa) $a();
        if (e & 128) {
            a = hi5.$("uploadfile");
            if (a) a.style.visibility = "hidden"
        }
        if (!(e & 256)) {
            a = hi5.$("shadowing");
            if (a) a.parentNode.removeChild(a)
        }
        if (!(e & 1024)) {
            a = hi5.$("ssParent");
            if (a) a.parentNode.removeChild(a)
        }
        if (g && k || fa) h.setFileHandler(null)
    };
    var ab = new function() {
        function e() {
            if (k.length === 0) {
                g = false;
                var a = hi5.$("_sv_pdf_parent");
                if (a && a.visible && a.visible() && a.dismiss) a.dismiss();
                if (a && a.parentNode) a.parentNode.removeChild(a)
            } else b()
        }

        function a(a) {
            var b = hi5.$("_sv_pdf_parent");
            var g = __svi18n.info.printready || "Your document is ready.";
            var k = L || !!u.showPDFLink || r.isEdge;
            var f = k ? '<p style="text-align:center;line-height:4em"><a href="' + a + '" target="_blank">' + g + "</a></p>" : (r.isChromeApp ? "<webview" : "<iframe") + ' src="' + a + '" width="100%" height="100%" id="_iFramePDF">' +
                (r.isChromeApp ? "</webview>" : "</iframe>");
            if (!b) {
                b = document.createElement("div");
                b.style.backgroundColor = "white";
                b.style.width = L ? "30%" : "90%";
                b.style.height = L ? "4elm" : "85%";
                b.id = "_sv_pdf_parent";
                b.innerHTML = f;
                document.body.appendChild(b);
                var h = new hi5.Lightbox(b);
                h.onclose = e;
                h.show()
            } else {
                var l = hi5.$("_iFramePDF");
                if (l) l.src = a;
                else b.innerHTML += f
            }
        }

        function b() {
            var b = k.shift();
            if (b) a(b);
            g = true
        }
        var k = [];
        var g = false;
        this.clearPDF = function() {
            e()
        };
        this.showPDF = function(a) {
            k.push(a);
            if (!g) b()
        }
    };
    this.close =
        function() {
            kb = false;
            if (!p) return;
            svGlobal.logger.info("close ui...");
            M = false;
            if (Na) cancelAnimationFrame(Na);
            Ka();
            ac();
            if (x) {
                x.release();
                x = null
            }
            if (Ma) {
                Ma.release();
                Ma = null
            }
            if (ia) {
                ia.release();
                ia = null
            }
            if (I) {
                I.release();
                I = null
            }
            ja = null;
            V = null;
            ga = null;
            ka = null;
            I = null;
            K = null;
            aa = null, f = null, ta = null, qa = null;
            Ba = null;
            p = null;
            h.fileProgress = null;
            ab.clearPDF();
            if (va) h.setAutoScale(false);
            if (ga) ga.setVisibility(false);
            if (!("clearScreen" in u) || u.clearScreen) B.fillRect(0, 0, l.width, l.height);
            window.svSurface = null;
            yb = true;
            if (!window || fa) return;
            try {
                if (hi5.notifications.notifySize() > 0) {
                    hi5.notifications.onempty = function() {
                        h.close();
                        hi5.notifications.onempty = null
                    };
                    return
                }
                if (Wa) window.close();
                else {
                    this.hide();
                    if (r.isChromeApp) {
                        var e = chrome.app.window.current();
                        if (e && !u.disableMaxFullScn) {
                            e.onMaximized.removeListener(rb);
                            if (e.isFullscreen()) {
                                e.restore();
                                e.restore()
                            }
                        }
                    }
                }
            } catch (a) {}
            h.context = null;
            B = null;
            l = null;
            h = null;
            svGlobal.logger.info("closed ui")
        };
    this.setFastCopy = function(e) {
        Rb = e
    };
    this.drawLicense = function(e) {
        if (u.drawLicense !=
            false) {
            var a = e.charAt(0);
            B.save();
            B.font = "12pt Arial";
            B.fillStyle = a == "W" ? "red" : "black";
            var b = e.substring(1);
            B.fillText(b, 10, Q - 24);
            B.restore()
        }
    };
    this.drawText = function(e) {
        var a = u.text || {};
        B.save();
        if (a.backgroundFillStyle) {
            var b = l.width;
            var k = l.height;
            B.fillStyle = a.backgroundFillStyle;
            B.fillRect(0, 0, b, k)
        }
        var g = 20;
        var f = 50;
        if (a.textAlign == "center") {
            g = b / 2;
            f = k / 2
        }
        B.font = a.font || "18pt Arial";
        B.fillStyle = a.fillStyle || "black";
        if (a.textAlign) B.textAlign = a.textAlign;
        if (a.textBaseline) B.textBaseline = a.textBaseline;
        B.fillText(e, g, f);
        B.restore()
    };
    this.showPDF = function(e) {
        ab.showPDF(e)
    };
    this.hide = function() {
        if (h.hideWhenClose) {
            l.height = 1;
            l.width = 1
        }
        if (n) n.hide()
    };
    var Xa = 0;
    var Wb = false;
    var mb = new function() {
        var e = null;
        var a = null;
        this.createDialog = function(b, k, g) {
            var f = document.createElement("div");
            f.className = "copyDialog";
            var h = document.createElement("div");
            h.innerHTML = k;
            h.className = "hi5_notifer_title";
            f.appendChild(h);
            var l = document.createElement(g);
            if (g == "div") l.innerHTML = b;
            else l.value = b;
            l.style.border = "1px solid #666";
            l.style.width = "100%";
            l.style.minHeight = "80px";
            f.appendChild(l);
            e = l;
            if (Sb) {
                a = document.createElement("input");
                a.className = "btnCopy";
                a.type = "button";
                a.value = __svi18n.info.copylable || "Copy";
                a.onclick = function() {
                    if (g == "div") r.selectEditable(e);
                    else e.select();
                    document.execCommand("copy")
                };
                f.appendChild(a)
            }
            if (b.indexOf('data-sv-img="wmf"') > 0) {
                var m = b.indexOf('src="') + 5;
                var n = b.indexOf('"', m);
                if (n > m && m > 0) {
                    var p = document.createElement("a");
                    p.href = b.substring(m, n);
                    p.target = "_blank";
                    p.innerHTML = "Download image";
                    f.appendChild(p)
                }
            }
            return f
        };
        this.open = function(b, k, g) {
            function f() {
                var l = mb.createDialog(b, k, g);
                document.body.appendChild(l);
                var m = new hi5.Lightbox(l);
                m.show();
                if (e && b.indexOf("<img ") !== 0)
                    if (g == "div") r.selectEditable(e);
                    else e.select();
                zb();
                m.onclose = function() {
                    cb();
                    if (l && l.parentNode) l.parentNode.removeChild(l);
                    if (h.toolbar) h.toolbar.removeButton("_svClipInfo")
                };
                if (!document.queryCommandEnabled("copy")) l.removeChild(a)
            }
            if (!g) g = "div";
            if (h.beforeCopyDialog && h.beforeCopyDialog(b, k, g)) return;
            if (u.clipWarnAlways ||
                !Wb) {
                h.showMessage(__svi18n.info.copyWarning, 5E3);
                Wb = true
            }
            clearTimeout(Xa);
            var l = h.toolbar;
            if (!l) return;
            var m = l.getButton("_svClipInfo");
            if (m) m.onclick = f;
            else {
                m = l.addButton(u.img.copy ? u.img.copy : "copy.png", f);
                m.id = "_svClipInfo";
                m.className = "pulse"
            }
            l.startFade();
            Xa = setTimeout(function() {
                h.toolbar.removeButton("_svClipInfo")
            }, 3E4)
        }
    };
    this.copyToClip = function(e, a) {
        if (!Z) return;
        var b = x.parseClipData(e);
        if (u.copyTextOnly && b.type != "text/plain") return;
        if (C(b)) return;
        if (x.waitingCopyContent) {
            x.copyContent =
                b;
            return
        }
        setTimeout(function() {
            if (!Z || ya && lb == e) return;
            e = b.value;
            var a = e.indexOf("<img ") > 0 || u.copyDialog;
            if (!a || Sb) a = !x.copyToClipboard(b.type, e)
        }, 50)
    };
    this.fullScreen = function() {
        l.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
    };
    ga = new function a() {
        function b(a) {
            oa = Date.now();
            var b = hi5.$("pc_key");
            if (!b) return;
            b.style.display = "block";
            b.style.top = window.pageYOffset + "px";
            if (I) {
                I.setValue("`\t`");
                I.select()
            }
        }

        function f(a) {
            oa = 0;
            var b = hi5.$("pc_key");
            if (!b) return;
            b = hi5.$("shortcuts");
            if (b && b.checked) return;
            u.style.display = "none"
        }

        function g() {
            if (n)
                if (A) hi5.html.addClass(n, "button_selected");
                else hi5.html.removeClass(n, "button_selected");
            if (p)
                if (ra) hi5.html.addClass(p, "button_selected");
                else hi5.html.removeClass(p, "button_selected");
            if (q)
                if (za) hi5.html.addClass(q, "button_selected");
                else hi5.html.removeClass(q, "button_selected")
        }

        function l(a) {
            cancelDefault(a);
            var b = a.target;
            var f = b.innerHTML;
            f = f.replace(/\u2190/g, "left").replace(/\u2191/g, "up").replace(/\u2192/g, "right").replace(/\u2193/g, "down");
            switch (f) {
                case "Ctrl":
                    if (!n) n =
                        b;
                    if (A) m(false, 29);
                    else m(true, 29);
                    A = !A;
                    g();
                    return;
                case "Alt":
                    if (!p) p = b;
                    if (ra) m(false, 56);
                    else m(true, 56);
                    ra = !ra;
                    g();
                    return;
                case "Shift":
                    if (!q) q = b;
                    if (za) m(false, 42);
                    else m(true, 42);
                    za = !za;
                    g();
                    return;
                case "...":
                    var k = hi5.$("pc_key_more");
                    if (k) k.style.display = k.style.display == "block" ? "none" : "block";
                    return;
                case "Start":
                    f = "Ctrl+Esc";
                default:
                    h.writeKeyComb(f);
                    ga.resetModifier()
            }
        }
        var n = null;
        var p = null;
        var q = null;
        this.setVisibility = function(a) {
            if (a) b();
            else f()
        };
        this.resetModifier = function() {
            if (ra) {
                ra = false;
                m(false, 56)
            }
            if (A) {
                A = false;
                m(false, 29)
            }
            if (za) {
                za = false;
                m(false, 42)
            }
            g()
        };
        if (hi5.$("svTouchInput")) {
            hi5.$("svTouchInput").addEventListener("focus", b, false);
            hi5.$("svTouchInput").addEventListener("blur", f, false)
        }
        var u = hi5.$("pc_key");
        if (!u) return;
        var t = u.getElementsByTagName("span");
        var x = t.length;
        var y = r.isFirefox ? "mousedown" : "touchstart";
        if (!("ontouchstart" in window))
            if (navigator.pointerEnabled) y = "pointerdown";
            else if (navigator.msPointerEnabled) y = "MSPointerDown";
        for (var B = 0; B < x; B++) {
            var E = t[B];
            E.className =
                "button";
            E.addEventListener(y, l, false);
            if (y != "mousedown") E.addEventListener("mousedown", l, false)
        }
        u.style.position = "absolute"
    };
    var Xb = hi5.$("shortcuts");
    if (Xb) Xb.addEventListener("change", function(a) {
        ga.setVisibility(a.target.checked)
    });
    this.setKeysVisibility = function(a) {
        if (ga) ga.setVisibility(a)
    };
    this.refreshFiles = function() {
        if (!aa || !aa.visible()) Db(null);
        else wa(".", aa)
    };
    this.processLink = function(a) {
        function b(b) {
            window.open(a);
            b.target.parentNode.removeChild(b.target)
        }
        if (h.beforeOpenLink && h.beforeOpenLink(a)) return;
        clearTimeout(Xa);
        var f = h.toolbar;
        var g = f.getButton("_svLinkInfo");
        if (g) g.onclick = b;
        else {
            g = f.addButton(u.img.link ? u.img.link : "link.png", b);
            g.id = "_svLinkInfo";
            g.className = "pulse"
        }
        g.title = a;
        f.startFade();
        Xa = setTimeout(function() {
            h.toolbar.removeButton("_svLinkInfo")
        }, 1E4)
    };
    this.setUnicode = function(a) {
        if (!n) return;
        if (!a && L && (r.isiOS || r.isChrome && !r.isWindows)) a = true;
        Ua = !a;
        svGlobal.logger.info("Unicode:" + a);
        J.onkeydown = J.onkeyup = a ? Bb : kc;
        if (!a && p && p.sendKeyboardSynchronize) J.onkeypress = jc;
        J.ontextinput =
            Cb
    };
    this.setTouchRemoting = function(a) {
        if (a === true) {
            qa = new ma(h, l);
            svGlobal.logger.info("touch remoting");
            h.showMessage(__svi18n.info.touchremoting)
        } else qa = new sa(h)
    };
    this.setClipboard = function(a) {
        Z = a;
        ya = a ? !r.isChromeApp && !u.copyDialog : false
    };
    this.setJoinMode = function(a) {
        p.setJoinMode(a)
    };
    this.requestControl = function() {
        p.requestControl()
    };
    this.repaint = function(a, b, f, g) {
        if (q.isMultiMon) {
            if (a < q.left) a = q.left;
            if (b < q.top) b = q.top;
            if (f > q.right) f = q.right;
            if (g > q.bottom) g = q.bottom;
            if (a <= q.right && b <= q.bottom) {
                var h =
                    p.refresh(a, b, f, g);
                if (h) B.putImageData(h.imgData, h.left - q.left, h.top - q.top, 0, 0, h.width, h.height)
            }
        } else {
            h = p.refresh(a, b, f, g);
            if (h) B.putImageData(h.imgData, h.left, h.top, 0, 0, h.width, h.height)
        }
    };
    this.running = function() {
        return kb
    };
    this.run = function(a) {
        function b(a) {
            a.target.removeEventListener("click", b, false);
            p.send("884")
        }
        kb = true;
        qb();
        hi5.notifications.clearAll();
        if ((a == 3758162961 || a == 3758162962) && n) n.setContentEditable("false");
        ja.setLayout(a);
        var f = [99997, 99998, 99999].indexOf(a) != -1;
        Ua = !f;
        Lb = (f || [1033,
            3758162961, 3758162962, 1049
        ].indexOf(a) == -1) && r.isMacOS;
        if (typeof u.closeOnDisconn == "boolean") Wa = u.closeOnDisconn;
        else Wa = !!window.opener && !r.isChromeApp;
        if (!u.disableScoll) window.scrollTo(0, 0);
        Eb();
        bc();
        var g = n.element;
        if (L) {
            if (!fa) {
                qa = new sa(h);
                var m = new ha(g);
                m.ontouch = ic;
                m.onmousedown = Fa;
                m.onmousemove = Ga;
                m.onmouseup = Ha;
                Y(g, Qb, false);
                document.addEventListener("paste", x.onPaste, false);
                if (Z)
                    if (ya) {
                        document.addEventListener("copy", x.onCopy, false);
                        document.addEventListener("cut", x.onCopy, false)
                    }
            }
        } else {
            if (!fa) {
                document.addEventListener("mousemove",
                    Ga, false);
                g.addEventListener("mousedown", Fa, false);
                document.addEventListener("mouseup", Ha, false);
                g.addEventListener("mouseleave", Ja, false);
                g.addEventListener("mouseenter", Ja, false);
                Y(g, Qb, false);
                g.addEventListener("paste", x.onPaste, false);
                if (Z)
                    if (ya) {
                        g.addEventListener("copy", x.onCopy, false);
                        g.addEventListener("cut", x.onCopy, false)
                    }
            }
            t(g)
        }
        h.setUnicode(f);
        this.drawText(__svi18n.wait);
        if (h.onstart) h.onstart(l);
        g.addEventListener("click", b, false);
        if (Ba) {
            Na = requestAnimationFrame(Gb);
            if (r.isChrome) document.addEventListener("visibilitychange",
                sb, false)
        }
        n.adjust()
    };
    var Hb = u.animation || 42;
    if (T && !r.isEdge) Hb *= 3;
    var ec = {
        "&euro;": "\ufffd",
        "&nbsp;": " ",
        "&quot;": '"',
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&iexcl;": "\ufffd",
        "&cent;": "\ufffd",
        "&pound;": "\ufffd",
        "&curren;": "\ufffd",
        "&yen;": "\ufffd",
        "&brvbar;": "\ufffd",
        "&sect;": "\ufffd",
        "&uml;": "\ufffd",
        "&copy;": "\ufffd",
        "&ordf;": "\ufffd",
        "&reg;": "\ufffd"
    };
    this.moveCursor = function(a, b, k, g) {
        if (a < 0 || b < 0 || a >= U || b >= Q) return;
        if (!f) Ia();
        if (f.style.visibility == "hidden") f.style.visibility = "visible";
        f.scrX = a;
        f.scrY = b;
        var h = a - f.hotX;
        var l = b - f.hotY;
        f.moveCursor(h + q.offX, l + q.offY, g);
        if (M && !k) p.sendInput("82" + a + "\t" + b);
        q.x = a;
        q.y = b
    };
    this.touchstart = function(a) {
        switch (a.pointes) {
            case 1:
                if (na) {
                    if (!f) Ia();
                    fb("touchstart", a.screenX, a.screenY, !a.flick)
                } else if (!a.flick || la()) {
                    var b = n.element.getBoundingClientRect();
                    var k = a.x - b.left;
                    var g = a.y - b.top;
                    if (h.mouseMoveEmu) {
                        hc(Tb, Ub, k, g);
                        Tb = k;
                        Ub = g
                    }
                    Qa(k, g, 0)
                }
                break;
            case 2:
                Pa = a.screenX;
                xa = a.screenY
        }
    };
    this.touchmove = function(a) {
        var b = n.element.getBoundingClientRect();
        switch (a.pointes) {
            case 1:
                if (na) fb("touchmove",
                    a.screenX, a.screenY, !a.flick);
                else if (!a.flick || la()) Sa(a.x - b.left, a.y - b.top);
                break;
            case 2:
                if (Math.abs(a.screenY - xa) >= 40) {
                    Pb(a.x - b.left, a.y - b.top, a.screenY - xa > 0 ? 0 : 1);
                    Pa = a.screenX;
                    xa = a.screenY
                }
            case 3:
        }
    };
    this.touchend = function(a) {
        var b = a.pointes;
        var k = n.element.getBoundingClientRect();
        switch (b) {
            case 1:
                if (na) fb("touchend", a.screenX, a.screenY, !a.flick);
                else {
                    Oa(a.x, a.y, true);
                    if (!a.flick || la()) Ra(a.x - k.left, a.y - k.top, 0)
                }
                break;
            case 2:
                if (!a.moved) Kb(na ? f.scrX : a.x - k.left, na ? f.scrY : a.y - k.top);
                break;
            case 3:
                if (a.gesture) switch (a.gesture) {
                    case "OPEN":
                        m(true,
                            219);
                        m(true, 200);
                        m(false, 200);
                        m(false, 219);
                        break;
                    case "CLOSE":
                        m(true, 219);
                        m(true, 208);
                        m(false, 208);
                        m(false, 219);
                        break;
                    case "LEFT":
                        m(true, 56);
                        m(true, 1);
                        m(false, 1);
                        m(false, 56);
                        break;
                    case "RIGHT":
                        m(true, 42);
                        m(true, 56);
                        m(true, 1);
                        m(false, 1);
                        m(false, 56);
                        m(false, 42);
                        break;
                    case "UP":
                        m(true, 42);
                        m(true, 219);
                        da(true, 77);
                        da(false, 77);
                        m(false, 219);
                        m(false, 42);
                        break;
                    case "DOWN":
                        m(true, 219);
                        da(true, 77);
                        da(false, 77);
                        m(false, 219)
                } else gc()
        }
    };
    this.flick = function(a) {
        switch (a.from) {
            case 4:
                p.sendInput("84" + "0\t" + 209);
                p.sendInput("84" + "49152\t" + 209);
                break;
            case 2:
                p.sendInput("84" + "0\t" + 201);
                p.sendInput("84" + "49152\t" + 201)
        }
    };
    this.longpress = function(a) {
        if (na) a.pointes = 2;
        var b = n.element.getBoundingClientRect();
        switch (a.pointes) {
            case 1:
                Kb(a.x - b.left, a.y - b.top);
                break;
            case 2:
                if (f) {
                    Qa(f.scrX, f.scrY, 2, 1);
                    Ra(f.scrX, f.scrY, 2, 1)
                }
        }
    };
    this.redirectTouches = function(a) {
        if (!M) return;
        var b = a.length;
        var f;
        var g = "90" + b;
        for (var h = 0; h < b; h++) {
            f = a[h];
            g = g + "\t" + f.contactId + ";" + f.contactFlags + ";" + Math.floor(f.x / R) + ";" + Math.floor(f.y / ca)
        }
        p.send(g)
    };
    var Ta = 0;
    this.setIgnorePaste = function(a) {
        ea = a
    };
    this.processClipReq = function(a) {
        if (!Z) {
            p.send("881ERROR\t");
            return
        }
        var b = x.clipData;
        var f = Date.now();
        if (!b || !ea) b = x.getClipContent();
        var g = b ? b.getData(a) : null;
        if (g && a == "text/plain") {
            var l = 0;
            var m = "";
            for (var n = g.length; l < n; l++) {
                m = g.charAt(l);
                if (m != "\r" && m != "\n") break
            }
            if (l) g = g.substring(l)
        }
        if (g) {
            p.send("881" + a + "\t" + g);
            b.sent = f;
            return true
        } else if (h.onreqpaste) {
            h.onreqpaste(a, function(b) {
                p.send("881" + a + "\t" + b)
            }, function() {
                p.send("881ERROR\t")
            });
            return true
        } else {
            p.send("881" +
                a + "\t" + "");
            return false
        }
    };
    var ua = {};
    var nc = false;
    this.getMousePosition = function() {
        return q
    };
    var oc = {
        29: 197,
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
        if (u.disableCursor ||
            !a) return;
        ta = a;
        if (f) f.setCursor(a);
        if (f && (!Va || a.system)) f.hideCursor();
        if (!fa) {
            if (!a.result) a.result = qc(a);
            if (n) n.element.style.cursor = a.result;
            else l.style.cursor = a.result
        }
    };
    this.setVisible = function(a, b) {
        var f = a ? "visible" : "hidden";
        if (typeof b == "number") setTimeout(function() {
            l.style.visibility = f
        }, b);
        else l.style.visibility = f
    }
}
if (!svGlobal.LocalInterface) svGlobal.LocalInterface = LocalInterface;
svGlobal.rdpFile = {
    loadRdpFile: function(l, E) {
        var t = E.elements;
        var C = l.split("\r\n");
        if (C.length < 2) C = l.split("\n");
        if (C.length < 2) return false;
        var H = hi5.$("gateway");
        var O = H.value;
        E.reset();
        H.value = O;
        var Y = 0;
        for (var ha = C.length; Y < ha; Y++) {
            var la = C[Y];
            var ma = la.indexOf(":");
            var sa = la.substring(0, ma);
            var y = la.substring(ma + 3);
            sa = sa.toLowerCase();
            switch (sa) {
                case "full address":
                    ma = y.indexOf(":");
                    if (ma > 0) {
                        t["server"].value = y.substring(0, ma);
                        t["port"].value = y.substring(ma + 1)
                    } else t["server"].value = y;
                    break;
                case "username":
                    t["user"].value =
                        y;
                    break;
                case "domain":
                    t["domain"].value = y;
                    break;
                case "connect to console":
                    t["useConsole"].checked = y != "0";
                    break;
                case "desktopwidth":
                    t["width"].value = y;
                    break;
                case "desktopheight":
                    t["height"].value = y;
                    break;
                case "session bpp":
                    t["server_bpp"].value = y;
                    break;
                case "audiomode":
                    t["playSound"].value = y;
                    break;
                case "alternate shell":
                    if (y.length > 0) {
                        t["command"].value = y;
                        if (!hi5.$("app").checked) hi5.$("shell").checked = true
                    }
                    break;
                case "shell working directory":
                    t["directory"] = y;
                    break;
                case "redirectclipboard":
                    t["mapClipboard"].checked =
                        y != "0";
                    break;
                case "redirectprinters":
                    t["mapPrinter"].checked = y != "0";
                    break;
                case "server port":
                    if (y.length > 0) t["port"].value = y;
                    break;
                case "disable wallpaper":
                    t["background"].checked = y == "0";
                    break;
                case "disable themes":
                    t["styles"].checked = y == "0";
                    break;
                case "disable menu anims":
                    t["animation"].checked = y == "0";
                    break;
                case "disable full window drag":
                    t["contents"].checked = y == "0";
                    break;
                case "allow font smoothing":
                    t["smoothfont"].checked = y != "0";
                    break;
                case "allow desktop composition":
                    t["composition"].checked = y !=
                        "0";
                    break;
                case "bitmapcachepersistenable":
                    t["bitmap"].checked = y != "0";
                    break;
                case "remoteapplicationprogram":
                    t["exe"].value = y;
                    break;
                case "remoteapplicationcmdline":
                    t["args"].value = y;
                    break;
                case "remoteapplicationmode":
                    hi5.$("app").checked = y == "1";
                    break;
                case "loadbalanceinfo":
                    t["loadBalanceInfo"].value = y
            }
        }
        return true
    },
    handleFiles: function(l, E) {
        if (l.length != 1) {
            hi5.notifications.notify({
                "msg": "Please one file only"
            });
            return
        }
        var t = l[0];
        var C = t.name;
        var H = C.length;
        var O = H > 4 && C.substring(H - 4).toLowerCase() ==
            ".rdp";
        if (!O) {
            hi5.notifications.notify({
                "msg": "Sorry, Please .rdp file only"
            });
            return
        }
        var Y = new FileReader;
        var ha = false;
        Y.onload = function(l) {
            var C = l.target.result;
            if (!C) return;
            var H = svGlobal.rdpFile.loadRdpFile(C, E);
            if (!H && !ha) {
                ha = true;
                Y.readAsText(t)
            }
        };
        Y.readAsText(t, "UTF-16LE")
    }
};

function initDragDrop(l, E) {
    function t(l) {
        svGlobal.rdpFile.handleFiles(l.target.files, E)
    }

    function C(t) {
        cancelDefault(t);
        l.style.backgroundColor = Y;
        var C = t.dataTransfer.files;
        svGlobal.rdpFile.handleFiles(C, E)
    }

    function H(t) {
        cancelDefault(t);
        l.style.backgroundColor = "yellow"
    }

    function O(t) {
        cancelDefault(t);
        l.style.backgroundColor = Y
    }
    if (!("FileReader" in window)) return;
    var Y = l.style.backgroundColor;
    var ha = hi5.$("rdpfile");
    if (ha) ha.addEventListener("change", t, false);
    l.addEventListener("dragover", H, false);
    l.addEventListener("dragleave",
        O, false);
    l.addEventListener("drop", C, false)
}
svGlobal.util.initDragDrop = initDragDrop;
svGlobal.util.initMapDisk = svGlobal.util.MapDisk = function(l, E, t) {
    function C(t) {
        cancelDefault(t);
        if (!E) return;
        if (l.style.opacity != "0.6") l.style.opacity = "0.6";
        l.style.backgroundColor = "yellow"
    }

    function H(t) {
        cancelDefault(t);
        if (!E) return;
        l.style.opacity = l.__oldOpacity;
        l.style.backgroundColor = l.__oldColor
    }

    function O(C) {
        cancelDefault(C);
        if (!E) return;
        l.style.opacity = l.__oldOpacity;
        l.style.backgroundColor = l.__oldColor;
        var H = hi5.file.getEntries(C);
        if (H.length) hi5.file.getFilesFromEntries(H, function(l) {
            if (E.addFiles) E.addFiles(l,
                t);
            else E.addFile(l[0])
        });
        else if (E.addFiles) E.addFiles(C.dataTransfer.files, t);
        else E.addFile(C.dataTransfer.files[0])
    }
    if (!("FileReader" in window)) return;
    l.__oldColor = l.style.backgroundColor;
    l.__oldOpacity = l.style.opacity;
    l.addEventListener("dragover", C, false);
    l.addEventListener("dragleave", H, false);
    l.addEventListener("drop", O, false);
    this.release = function() {
        l.removeEventListener("dragover", C, false);
        l.removeEventListener("dragleave", H, false);
        l.removeEventListener("drop", O, false);
        E = null;
        l = null
    }
};
(function init() {
    function E(t) {
        var C = document.getElementsByClassName("ver");
        var H = C.length;
        for (var O = 0; O < H; O++) C[O].innerHTML = svGlobal.version;
        window.removeEventListener("load", E, false)
    }
    window.addEventListener("load", E, false)
})();
svGlobal.logger.info("ver:" + svGlobal.version);