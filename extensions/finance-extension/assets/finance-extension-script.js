function Tf(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const i in r)
        if (i !== "default" && !(i in e)) {
          const l = Object.getOwnPropertyDescriptor(r, i);
          l &&
            Object.defineProperty(
              e,
              i,
              l.get ? l : { enumerable: !0, get: () => r[i] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const l of i)
      if (l.type === "childList")
        for (const o of l.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const l = {};
    return (
      i.integrity && (l.integrity = i.integrity),
      i.referrerPolicy && (l.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (l.credentials = "omit")
          : (l.credentials = "same-origin"),
      l
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const l = n(i);
    fetch(i.href, l);
  }
})();
function Pf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Vu = { exports: {} },
  Cl = {},
  Zu = { exports: {} },
  V = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var oi = Symbol.for("react.element"),
  jf = Symbol.for("react.portal"),
  Of = Symbol.for("react.fragment"),
  Rf = Symbol.for("react.strict_mode"),
  zf = Symbol.for("react.profiler"),
  If = Symbol.for("react.provider"),
  Lf = Symbol.for("react.context"),
  Mf = Symbol.for("react.forward_ref"),
  Df = Symbol.for("react.suspense"),
  $f = Symbol.for("react.memo"),
  Uf = Symbol.for("react.lazy"),
  ya = Symbol.iterator;
function Ff(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ya && e[ya]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Bu = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Wu = Object.assign,
  Hu = {};
function bn(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Hu),
    (this.updater = n || Bu);
}
bn.prototype.isReactComponent = {};
bn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
bn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Qu() {}
Qu.prototype = bn.prototype;
function ws(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Hu),
    (this.updater = n || Bu);
}
var ks = (ws.prototype = new Qu());
ks.constructor = ws;
Wu(ks, bn.prototype);
ks.isPureReactComponent = !0;
var ga = Array.isArray,
  Ku = Object.prototype.hasOwnProperty,
  Ss = { current: null },
  Yu = { key: !0, ref: !0, __self: !0, __source: !0 };
function Gu(e, t, n) {
  var r,
    i = {},
    l = null,
    o = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (o = t.ref),
    t.key !== void 0 && (l = "" + t.key),
    t))
      Ku.call(t, r) && !Yu.hasOwnProperty(r) && (i[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) i.children = n;
  else if (1 < s) {
    for (var a = Array(s), u = 0; u < s; u++) a[u] = arguments[u + 2];
    i.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((s = e.defaultProps), s)) i[r] === void 0 && (i[r] = s[r]);
  return {
    $$typeof: oi,
    type: e,
    key: l,
    ref: o,
    props: i,
    _owner: Ss.current,
  };
}
function Af(e, t) {
  return {
    $$typeof: oi,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Cs(e) {
  return typeof e == "object" && e !== null && e.$$typeof === oi;
}
function Vf(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var xa = /\/+/g;
function Ql(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Vf("" + e.key)
    : t.toString(36);
}
function zi(e, t, n, r, i) {
  var l = typeof e;
  (l === "undefined" || l === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else
    switch (l) {
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case oi:
          case jf:
            o = !0;
        }
    }
  if (o)
    return (
      (o = e),
      (i = i(o)),
      (e = r === "" ? "." + Ql(o, 0) : r),
      ga(i)
        ? ((n = ""),
          e != null && (n = e.replace(xa, "$&/") + "/"),
          zi(i, t, n, "", function (u) {
            return u;
          }))
        : i != null &&
          (Cs(i) &&
            (i = Af(
              i,
              n +
                (!i.key || (o && o.key === i.key)
                  ? ""
                  : ("" + i.key).replace(xa, "$&/") + "/") +
                e,
            )),
          t.push(i)),
      1
    );
  if (((o = 0), (r = r === "" ? "." : r + ":"), ga(e)))
    for (var s = 0; s < e.length; s++) {
      l = e[s];
      var a = r + Ql(l, s);
      o += zi(l, t, n, a, i);
    }
  else if (((a = Ff(e)), typeof a == "function"))
    for (e = a.call(e), s = 0; !(l = e.next()).done; )
      (l = l.value), (a = r + Ql(l, s++)), (o += zi(l, t, n, a, i));
  else if (l === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      ))
    );
  return o;
}
function mi(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    zi(e, r, "", "", function (l) {
      return t.call(n, l, i++);
    }),
    r
  );
}
function Zf(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ee = { current: null },
  Ii = { transition: null },
  Bf = {
    ReactCurrentDispatcher: Ee,
    ReactCurrentBatchConfig: Ii,
    ReactCurrentOwner: Ss,
  };
function Xu() {
  throw Error("act(...) is not supported in production builds of React.");
}
V.Children = {
  map: mi,
  forEach: function (e, t, n) {
    mi(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      mi(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      mi(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Cs(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
V.Component = bn;
V.Fragment = Of;
V.Profiler = zf;
V.PureComponent = ws;
V.StrictMode = Rf;
V.Suspense = Df;
V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bf;
V.act = Xu;
V.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var r = Wu({}, e.props),
    i = e.key,
    l = e.ref,
    o = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((l = t.ref), (o = Ss.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (a in t)
      Ku.call(t, a) &&
        !Yu.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    s = Array(a);
    for (var u = 0; u < a; u++) s[u] = arguments[u + 2];
    r.children = s;
  }
  return { $$typeof: oi, type: e.type, key: i, ref: l, props: r, _owner: o };
};
V.createContext = function (e) {
  return (
    (e = {
      $$typeof: Lf,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: If, _context: e }),
    (e.Consumer = e)
  );
};
V.createElement = Gu;
V.createFactory = function (e) {
  var t = Gu.bind(null, e);
  return (t.type = e), t;
};
V.createRef = function () {
  return { current: null };
};
V.forwardRef = function (e) {
  return { $$typeof: Mf, render: e };
};
V.isValidElement = Cs;
V.lazy = function (e) {
  return { $$typeof: Uf, _payload: { _status: -1, _result: e }, _init: Zf };
};
V.memo = function (e, t) {
  return { $$typeof: $f, type: e, compare: t === void 0 ? null : t };
};
V.startTransition = function (e) {
  var t = Ii.transition;
  Ii.transition = {};
  try {
    e();
  } finally {
    Ii.transition = t;
  }
};
V.unstable_act = Xu;
V.useCallback = function (e, t) {
  return Ee.current.useCallback(e, t);
};
V.useContext = function (e) {
  return Ee.current.useContext(e);
};
V.useDebugValue = function () {};
V.useDeferredValue = function (e) {
  return Ee.current.useDeferredValue(e);
};
V.useEffect = function (e, t) {
  return Ee.current.useEffect(e, t);
};
V.useId = function () {
  return Ee.current.useId();
};
V.useImperativeHandle = function (e, t, n) {
  return Ee.current.useImperativeHandle(e, t, n);
};
V.useInsertionEffect = function (e, t) {
  return Ee.current.useInsertionEffect(e, t);
};
V.useLayoutEffect = function (e, t) {
  return Ee.current.useLayoutEffect(e, t);
};
V.useMemo = function (e, t) {
  return Ee.current.useMemo(e, t);
};
V.useReducer = function (e, t, n) {
  return Ee.current.useReducer(e, t, n);
};
V.useRef = function (e) {
  return Ee.current.useRef(e);
};
V.useState = function (e) {
  return Ee.current.useState(e);
};
V.useSyncExternalStore = function (e, t, n) {
  return Ee.current.useSyncExternalStore(e, t, n);
};
V.useTransition = function () {
  return Ee.current.useTransition();
};
V.version = "18.3.1";
Zu.exports = V;
var E = Zu.exports;
const vt = Pf(E),
  Wf = Tf({ __proto__: null, default: vt }, [E]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Hf = E,
  Qf = Symbol.for("react.element"),
  Kf = Symbol.for("react.fragment"),
  Yf = Object.prototype.hasOwnProperty,
  Gf = Hf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Xf = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ju(e, t, n) {
  var r,
    i = {},
    l = null,
    o = null;
  n !== void 0 && (l = "" + n),
    t.key !== void 0 && (l = "" + t.key),
    t.ref !== void 0 && (o = t.ref);
  for (r in t) Yf.call(t, r) && !Xf.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: Qf,
    type: e,
    key: l,
    ref: o,
    props: i,
    _owner: Gf.current,
  };
}
Cl.Fragment = Kf;
Cl.jsx = Ju;
Cl.jsxs = Ju;
Vu.exports = Cl;
var v = Vu.exports,
  wo = {},
  qu = { exports: {} },
  Ue = {},
  bu = { exports: {} },
  ec = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(j, $) {
    var F = j.length;
    j.push($);
    e: for (; 0 < F; ) {
      var ie = (F - 1) >>> 1,
        ce = j[ie];
      if (0 < i(ce, $)) (j[ie] = $), (j[F] = ce), (F = ie);
      else break e;
    }
  }
  function n(j) {
    return j.length === 0 ? null : j[0];
  }
  function r(j) {
    if (j.length === 0) return null;
    var $ = j[0],
      F = j.pop();
    if (F !== $) {
      j[0] = F;
      e: for (var ie = 0, ce = j.length, pi = ce >>> 1; ie < pi; ) {
        var bt = 2 * (ie + 1) - 1,
          Hl = j[bt],
          en = bt + 1,
          hi = j[en];
        if (0 > i(Hl, F))
          en < ce && 0 > i(hi, Hl)
            ? ((j[ie] = hi), (j[en] = F), (ie = en))
            : ((j[ie] = Hl), (j[bt] = F), (ie = bt));
        else if (en < ce && 0 > i(hi, F)) (j[ie] = hi), (j[en] = F), (ie = en);
        else break e;
      }
    }
    return $;
  }
  function i(j, $) {
    var F = j.sortIndex - $.sortIndex;
    return F !== 0 ? F : j.id - $.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var l = performance;
    e.unstable_now = function () {
      return l.now();
    };
  } else {
    var o = Date,
      s = o.now();
    e.unstable_now = function () {
      return o.now() - s;
    };
  }
  var a = [],
    u = [],
    d = 1,
    p = null,
    m = 3,
    y = !1,
    _ = !1,
    x = !1,
    S = typeof setTimeout == "function" ? setTimeout : null,
    f = typeof clearTimeout == "function" ? clearTimeout : null,
    c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function h(j) {
    for (var $ = n(u); $ !== null; ) {
      if ($.callback === null) r(u);
      else if ($.startTime <= j)
        r(u), ($.sortIndex = $.expirationTime), t(a, $);
      else break;
      $ = n(u);
    }
  }
  function g(j) {
    if (((x = !1), h(j), !_))
      if (n(a) !== null) (_ = !0), qt(N);
      else {
        var $ = n(u);
        $ !== null && _n(g, $.startTime - j);
      }
  }
  function N(j, $) {
    (_ = !1), x && ((x = !1), f(I), (I = -1)), (y = !0);
    var F = m;
    try {
      for (
        h($), p = n(a);
        p !== null && (!(p.expirationTime > $) || (j && !ze()));

      ) {
        var ie = p.callback;
        if (typeof ie == "function") {
          (p.callback = null), (m = p.priorityLevel);
          var ce = ie(p.expirationTime <= $);
          ($ = e.unstable_now()),
            typeof ce == "function" ? (p.callback = ce) : p === n(a) && r(a),
            h($);
        } else r(a);
        p = n(a);
      }
      if (p !== null) var pi = !0;
      else {
        var bt = n(u);
        bt !== null && _n(g, bt.startTime - $), (pi = !1);
      }
      return pi;
    } finally {
      (p = null), (m = F), (y = !1);
    }
  }
  var O = !1,
    R = null,
    I = -1,
    X = 5,
    A = -1;
  function ze() {
    return !(e.unstable_now() - A < X);
  }
  function Ct() {
    if (R !== null) {
      var j = e.unstable_now();
      A = j;
      var $ = !0;
      try {
        $ = R(!0, j);
      } finally {
        $ ? te() : ((O = !1), (R = null));
      }
    } else O = !1;
  }
  var te;
  if (typeof c == "function")
    te = function () {
      c(Ct);
    };
  else if (typeof MessageChannel < "u") {
    var re = new MessageChannel(),
      pe = re.port2;
    (re.port1.onmessage = Ct),
      (te = function () {
        pe.postMessage(null);
      });
  } else
    te = function () {
      S(Ct, 0);
    };
  function qt(j) {
    (R = j), O || ((O = !0), te());
  }
  function _n(j, $) {
    I = S(function () {
      j(e.unstable_now());
    }, $);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (j) {
      j.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      _ || y || ((_ = !0), qt(N));
    }),
    (e.unstable_forceFrameRate = function (j) {
      0 > j || 125 < j
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (X = 0 < j ? Math.floor(1e3 / j) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return m;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (j) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var $ = 3;
          break;
        default:
          $ = m;
      }
      var F = m;
      m = $;
      try {
        return j();
      } finally {
        m = F;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (j, $) {
      switch (j) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          j = 3;
      }
      var F = m;
      m = j;
      try {
        return $();
      } finally {
        m = F;
      }
    }),
    (e.unstable_scheduleCallback = function (j, $, F) {
      var ie = e.unstable_now();
      switch (
        (typeof F == "object" && F !== null
          ? ((F = F.delay), (F = typeof F == "number" && 0 < F ? ie + F : ie))
          : (F = ie),
        j)
      ) {
        case 1:
          var ce = -1;
          break;
        case 2:
          ce = 250;
          break;
        case 5:
          ce = 1073741823;
          break;
        case 4:
          ce = 1e4;
          break;
        default:
          ce = 5e3;
      }
      return (
        (ce = F + ce),
        (j = {
          id: d++,
          callback: $,
          priorityLevel: j,
          startTime: F,
          expirationTime: ce,
          sortIndex: -1,
        }),
        F > ie
          ? ((j.sortIndex = F),
            t(u, j),
            n(a) === null &&
              j === n(u) &&
              (x ? (f(I), (I = -1)) : (x = !0), _n(g, F - ie)))
          : ((j.sortIndex = ce), t(a, j), _ || y || ((_ = !0), qt(N))),
        j
      );
    }),
    (e.unstable_shouldYield = ze),
    (e.unstable_wrapCallback = function (j) {
      var $ = m;
      return function () {
        var F = m;
        m = $;
        try {
          return j.apply(this, arguments);
        } finally {
          m = F;
        }
      };
    });
})(ec);
bu.exports = ec;
var Jf = bu.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qf = E,
  $e = Jf;
function w(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var tc = new Set(),
  Tr = {};
function gn(e, t) {
  Bn(e, t), Bn(e + "Capture", t);
}
function Bn(e, t) {
  for (Tr[e] = t, e = 0; e < t.length; e++) tc.add(t[e]);
}
var gt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  ko = Object.prototype.hasOwnProperty,
  bf =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  _a = {},
  wa = {};
function ep(e) {
  return ko.call(wa, e)
    ? !0
    : ko.call(_a, e)
      ? !1
      : bf.test(e)
        ? (wa[e] = !0)
        : ((_a[e] = !0), !1);
}
function tp(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function np(e, t, n, r) {
  if (t === null || typeof t > "u" || tp(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Ne(e, t, n, r, i, l, o) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = l),
    (this.removeEmptyString = o);
}
var ve = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    ve[e] = new Ne(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  ve[t] = new Ne(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  ve[e] = new Ne(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  ve[e] = new Ne(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    ve[e] = new Ne(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  ve[e] = new Ne(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  ve[e] = new Ne(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  ve[e] = new Ne(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  ve[e] = new Ne(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Es = /[\-:]([a-z])/g;
function Ns(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Es, Ns);
    ve[t] = new Ne(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Es, Ns);
    ve[t] = new Ne(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Es, Ns);
  ve[t] = new Ne(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  ve[e] = new Ne(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ve.xlinkHref = new Ne(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  ve[e] = new Ne(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ts(e, t, n, r) {
  var i = ve.hasOwnProperty(t) ? ve[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (np(t, n, i, r) && (n = null),
    r || i === null
      ? ep(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
        ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
        : ((t = i.attributeName),
          (r = i.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((i = i.type),
              (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var St = qf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  vi = Symbol.for("react.element"),
  Sn = Symbol.for("react.portal"),
  Cn = Symbol.for("react.fragment"),
  Ps = Symbol.for("react.strict_mode"),
  So = Symbol.for("react.profiler"),
  nc = Symbol.for("react.provider"),
  rc = Symbol.for("react.context"),
  js = Symbol.for("react.forward_ref"),
  Co = Symbol.for("react.suspense"),
  Eo = Symbol.for("react.suspense_list"),
  Os = Symbol.for("react.memo"),
  Tt = Symbol.for("react.lazy"),
  ic = Symbol.for("react.offscreen"),
  ka = Symbol.iterator;
function ir(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ka && e[ka]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ee = Object.assign,
  Kl;
function fr(e) {
  if (Kl === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Kl = (t && t[1]) || "";
    }
  return (
    `
` +
    Kl +
    e
  );
}
var Yl = !1;
function Gl(e, t) {
  if (!e || Yl) return "";
  Yl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var i = u.stack.split(`
`),
          l = r.stack.split(`
`),
          o = i.length - 1,
          s = l.length - 1;
        1 <= o && 0 <= s && i[o] !== l[s];

      )
        s--;
      for (; 1 <= o && 0 <= s; o--, s--)
        if (i[o] !== l[s]) {
          if (o !== 1 || s !== 1)
            do
              if ((o--, s--, 0 > s || i[o] !== l[s])) {
                var a =
                  `
` + i[o].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= o && 0 <= s);
          break;
        }
    }
  } finally {
    (Yl = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? fr(e) : "";
}
function rp(e) {
  switch (e.tag) {
    case 5:
      return fr(e.type);
    case 16:
      return fr("Lazy");
    case 13:
      return fr("Suspense");
    case 19:
      return fr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Gl(e.type, !1)), e;
    case 11:
      return (e = Gl(e.type.render, !1)), e;
    case 1:
      return (e = Gl(e.type, !0)), e;
    default:
      return "";
  }
}
function No(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Cn:
      return "Fragment";
    case Sn:
      return "Portal";
    case So:
      return "Profiler";
    case Ps:
      return "StrictMode";
    case Co:
      return "Suspense";
    case Eo:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case rc:
        return (e.displayName || "Context") + ".Consumer";
      case nc:
        return (e._context.displayName || "Context") + ".Provider";
      case js:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Os:
        return (
          (t = e.displayName || null), t !== null ? t : No(e.type) || "Memo"
        );
      case Tt:
        (t = e._payload), (e = e._init);
        try {
          return No(e(t));
        } catch {}
    }
  return null;
}
function ip(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return No(t);
    case 8:
      return t === Ps ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Bt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function lc(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function lp(e) {
  var t = lc(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      l = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (o) {
          (r = "" + o), l.call(this, o);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = "" + o;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function yi(e) {
  e._valueTracker || (e._valueTracker = lp(e));
}
function oc(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = lc(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Wi(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function To(e, t) {
  var n = t.checked;
  return ee({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Sa(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = Bt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function sc(e, t) {
  (t = t.checked), t != null && Ts(e, "checked", t, !1);
}
function Po(e, t) {
  sc(e, t);
  var n = Bt(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? jo(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && jo(e, t.type, Bt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Ca(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function jo(e, t, n) {
  (t !== "number" || Wi(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var pr = Array.isArray;
function Dn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Bt(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function Oo(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(w(91));
  return ee({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Ea(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(w(92));
      if (pr(n)) {
        if (1 < n.length) throw Error(w(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: Bt(n) };
}
function ac(e, t) {
  var n = Bt(t.value),
    r = Bt(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function Na(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function uc(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ro(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? uc(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var gi,
  cc = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        gi = gi || document.createElement("div"),
          gi.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = gi.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Pr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var gr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  op = ["Webkit", "ms", "Moz", "O"];
Object.keys(gr).forEach(function (e) {
  op.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (gr[t] = gr[e]);
  });
});
function dc(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (gr.hasOwnProperty(e) && gr[e])
      ? ("" + t).trim()
      : t + "px";
}
function fc(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = dc(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var sp = ee(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function zo(e, t) {
  if (t) {
    if (sp[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(w(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(w(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(w(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(w(62));
  }
}
function Io(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Lo = null;
function Rs(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Mo = null,
  $n = null,
  Un = null;
function Ta(e) {
  if ((e = ui(e))) {
    if (typeof Mo != "function") throw Error(w(280));
    var t = e.stateNode;
    t && ((t = jl(t)), Mo(e.stateNode, e.type, t));
  }
}
function pc(e) {
  $n ? (Un ? Un.push(e) : (Un = [e])) : ($n = e);
}
function hc() {
  if ($n) {
    var e = $n,
      t = Un;
    if (((Un = $n = null), Ta(e), t)) for (e = 0; e < t.length; e++) Ta(t[e]);
  }
}
function mc(e, t) {
  return e(t);
}
function vc() {}
var Xl = !1;
function yc(e, t, n) {
  if (Xl) return e(t, n);
  Xl = !0;
  try {
    return mc(e, t, n);
  } finally {
    (Xl = !1), ($n !== null || Un !== null) && (vc(), hc());
  }
}
function jr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = jl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(w(231, t, typeof n));
  return n;
}
var Do = !1;
if (gt)
  try {
    var lr = {};
    Object.defineProperty(lr, "passive", {
      get: function () {
        Do = !0;
      },
    }),
      window.addEventListener("test", lr, lr),
      window.removeEventListener("test", lr, lr);
  } catch {
    Do = !1;
  }
function ap(e, t, n, r, i, l, o, s, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (d) {
    this.onError(d);
  }
}
var xr = !1,
  Hi = null,
  Qi = !1,
  $o = null,
  up = {
    onError: function (e) {
      (xr = !0), (Hi = e);
    },
  };
function cp(e, t, n, r, i, l, o, s, a) {
  (xr = !1), (Hi = null), ap.apply(up, arguments);
}
function dp(e, t, n, r, i, l, o, s, a) {
  if ((cp.apply(this, arguments), xr)) {
    if (xr) {
      var u = Hi;
      (xr = !1), (Hi = null);
    } else throw Error(w(198));
    Qi || ((Qi = !0), ($o = u));
  }
}
function xn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function gc(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Pa(e) {
  if (xn(e) !== e) throw Error(w(188));
}
function fp(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = xn(e)), t === null)) throw Error(w(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var l = i.alternate;
    if (l === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === l.child) {
      for (l = i.child; l; ) {
        if (l === n) return Pa(i), e;
        if (l === r) return Pa(i), t;
        l = l.sibling;
      }
      throw Error(w(188));
    }
    if (n.return !== r.return) (n = i), (r = l);
    else {
      for (var o = !1, s = i.child; s; ) {
        if (s === n) {
          (o = !0), (n = i), (r = l);
          break;
        }
        if (s === r) {
          (o = !0), (r = i), (n = l);
          break;
        }
        s = s.sibling;
      }
      if (!o) {
        for (s = l.child; s; ) {
          if (s === n) {
            (o = !0), (n = l), (r = i);
            break;
          }
          if (s === r) {
            (o = !0), (r = l), (n = i);
            break;
          }
          s = s.sibling;
        }
        if (!o) throw Error(w(189));
      }
    }
    if (n.alternate !== r) throw Error(w(190));
  }
  if (n.tag !== 3) throw Error(w(188));
  return n.stateNode.current === n ? e : t;
}
function xc(e) {
  return (e = fp(e)), e !== null ? _c(e) : null;
}
function _c(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = _c(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var wc = $e.unstable_scheduleCallback,
  ja = $e.unstable_cancelCallback,
  pp = $e.unstable_shouldYield,
  hp = $e.unstable_requestPaint,
  le = $e.unstable_now,
  mp = $e.unstable_getCurrentPriorityLevel,
  zs = $e.unstable_ImmediatePriority,
  kc = $e.unstable_UserBlockingPriority,
  Ki = $e.unstable_NormalPriority,
  vp = $e.unstable_LowPriority,
  Sc = $e.unstable_IdlePriority,
  El = null,
  lt = null;
function yp(e) {
  if (lt && typeof lt.onCommitFiberRoot == "function")
    try {
      lt.onCommitFiberRoot(El, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Je = Math.clz32 ? Math.clz32 : _p,
  gp = Math.log,
  xp = Math.LN2;
function _p(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((gp(e) / xp) | 0)) | 0;
}
var xi = 64,
  _i = 4194304;
function hr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Yi(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    l = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var s = o & ~i;
    s !== 0 ? (r = hr(s)) : ((l &= o), l !== 0 && (r = hr(l)));
  } else (o = n & ~i), o !== 0 ? (r = hr(o)) : l !== 0 && (r = hr(l));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (l = t & -t), i >= l || (i === 16 && (l & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Je(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function wp(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function kp(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      l = e.pendingLanes;
    0 < l;

  ) {
    var o = 31 - Je(l),
      s = 1 << o,
      a = i[o];
    a === -1
      ? (!(s & n) || s & r) && (i[o] = wp(s, t))
      : a <= t && (e.expiredLanes |= s),
      (l &= ~s);
  }
}
function Uo(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Cc() {
  var e = xi;
  return (xi <<= 1), !(xi & 4194240) && (xi = 64), e;
}
function Jl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function si(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Je(t)),
    (e[t] = n);
}
function Sp(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - Je(n),
      l = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~l);
  }
}
function Is(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Je(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var H = 0;
function Ec(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Nc,
  Ls,
  Tc,
  Pc,
  jc,
  Fo = !1,
  wi = [],
  Mt = null,
  Dt = null,
  $t = null,
  Or = new Map(),
  Rr = new Map(),
  jt = [],
  Cp =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function Oa(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Mt = null;
      break;
    case "dragenter":
    case "dragleave":
      Dt = null;
      break;
    case "mouseover":
    case "mouseout":
      $t = null;
      break;
    case "pointerover":
    case "pointerout":
      Or.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Rr.delete(t.pointerId);
  }
}
function or(e, t, n, r, i, l) {
  return e === null || e.nativeEvent !== l
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: l,
        targetContainers: [i],
      }),
      t !== null && ((t = ui(t)), t !== null && Ls(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function Ep(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return (Mt = or(Mt, e, t, n, r, i)), !0;
    case "dragenter":
      return (Dt = or(Dt, e, t, n, r, i)), !0;
    case "mouseover":
      return ($t = or($t, e, t, n, r, i)), !0;
    case "pointerover":
      var l = i.pointerId;
      return Or.set(l, or(Or.get(l) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return (
        (l = i.pointerId), Rr.set(l, or(Rr.get(l) || null, e, t, n, r, i)), !0
      );
  }
  return !1;
}
function Oc(e) {
  var t = rn(e.target);
  if (t !== null) {
    var n = xn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = gc(n)), t !== null)) {
          (e.blockedOn = t),
            jc(e.priority, function () {
              Tc(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Li(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ao(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (Lo = r), n.target.dispatchEvent(r), (Lo = null);
    } else return (t = ui(n)), t !== null && Ls(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Ra(e, t, n) {
  Li(e) && n.delete(t);
}
function Np() {
  (Fo = !1),
    Mt !== null && Li(Mt) && (Mt = null),
    Dt !== null && Li(Dt) && (Dt = null),
    $t !== null && Li($t) && ($t = null),
    Or.forEach(Ra),
    Rr.forEach(Ra);
}
function sr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Fo ||
      ((Fo = !0),
      $e.unstable_scheduleCallback($e.unstable_NormalPriority, Np)));
}
function zr(e) {
  function t(i) {
    return sr(i, e);
  }
  if (0 < wi.length) {
    sr(wi[0], e);
    for (var n = 1; n < wi.length; n++) {
      var r = wi[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Mt !== null && sr(Mt, e),
      Dt !== null && sr(Dt, e),
      $t !== null && sr($t, e),
      Or.forEach(t),
      Rr.forEach(t),
      n = 0;
    n < jt.length;
    n++
  )
    (r = jt[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < jt.length && ((n = jt[0]), n.blockedOn === null); )
    Oc(n), n.blockedOn === null && jt.shift();
}
var Fn = St.ReactCurrentBatchConfig,
  Gi = !0;
function Tp(e, t, n, r) {
  var i = H,
    l = Fn.transition;
  Fn.transition = null;
  try {
    (H = 1), Ms(e, t, n, r);
  } finally {
    (H = i), (Fn.transition = l);
  }
}
function Pp(e, t, n, r) {
  var i = H,
    l = Fn.transition;
  Fn.transition = null;
  try {
    (H = 4), Ms(e, t, n, r);
  } finally {
    (H = i), (Fn.transition = l);
  }
}
function Ms(e, t, n, r) {
  if (Gi) {
    var i = Ao(e, t, n, r);
    if (i === null) so(e, t, r, Xi, n), Oa(e, r);
    else if (Ep(i, e, t, n, r)) r.stopPropagation();
    else if ((Oa(e, r), t & 4 && -1 < Cp.indexOf(e))) {
      for (; i !== null; ) {
        var l = ui(i);
        if (
          (l !== null && Nc(l),
          (l = Ao(e, t, n, r)),
          l === null && so(e, t, r, Xi, n),
          l === i)
        )
          break;
        i = l;
      }
      i !== null && r.stopPropagation();
    } else so(e, t, r, null, n);
  }
}
var Xi = null;
function Ao(e, t, n, r) {
  if (((Xi = null), (e = Rs(r)), (e = rn(e)), e !== null))
    if (((t = xn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = gc(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Xi = e), null;
}
function Rc(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (mp()) {
        case zs:
          return 1;
        case kc:
          return 4;
        case Ki:
        case vp:
          return 16;
        case Sc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var zt = null,
  Ds = null,
  Mi = null;
function zc() {
  if (Mi) return Mi;
  var e,
    t = Ds,
    n = t.length,
    r,
    i = "value" in zt ? zt.value : zt.textContent,
    l = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === i[l - r]; r++);
  return (Mi = i.slice(e, 1 < r ? 1 - r : void 0));
}
function Di(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function ki() {
  return !0;
}
function za() {
  return !1;
}
function Fe(e) {
  function t(n, r, i, l, o) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = l),
      (this.target = o),
      (this.currentTarget = null);
    for (var s in e)
      e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(l) : l[s]));
    return (
      (this.isDefaultPrevented = (
        l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1
      )
        ? ki
        : za),
      (this.isPropagationStopped = za),
      this
    );
  }
  return (
    ee(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = ki));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = ki));
      },
      persist: function () {},
      isPersistent: ki,
    }),
    t
  );
}
var er = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  $s = Fe(er),
  ai = ee({}, er, { view: 0, detail: 0 }),
  jp = Fe(ai),
  ql,
  bl,
  ar,
  Nl = ee({}, ai, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Us,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== ar &&
            (ar && e.type === "mousemove"
              ? ((ql = e.screenX - ar.screenX), (bl = e.screenY - ar.screenY))
              : (bl = ql = 0),
            (ar = e)),
          ql);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : bl;
    },
  }),
  Ia = Fe(Nl),
  Op = ee({}, Nl, { dataTransfer: 0 }),
  Rp = Fe(Op),
  zp = ee({}, ai, { relatedTarget: 0 }),
  eo = Fe(zp),
  Ip = ee({}, er, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Lp = Fe(Ip),
  Mp = ee({}, er, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Dp = Fe(Mp),
  $p = ee({}, er, { data: 0 }),
  La = Fe($p),
  Up = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Fp = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Ap = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Vp(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Ap[e]) ? !!t[e] : !1;
}
function Us() {
  return Vp;
}
var Zp = ee({}, ai, {
    key: function (e) {
      if (e.key) {
        var t = Up[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Di(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Fp[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Us,
    charCode: function (e) {
      return e.type === "keypress" ? Di(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Di(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  Bp = Fe(Zp),
  Wp = ee({}, Nl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Ma = Fe(Wp),
  Hp = ee({}, ai, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Us,
  }),
  Qp = Fe(Hp),
  Kp = ee({}, er, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Yp = Fe(Kp),
  Gp = ee({}, Nl, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Xp = Fe(Gp),
  Jp = [9, 13, 27, 32],
  Fs = gt && "CompositionEvent" in window,
  _r = null;
gt && "documentMode" in document && (_r = document.documentMode);
var qp = gt && "TextEvent" in window && !_r,
  Ic = gt && (!Fs || (_r && 8 < _r && 11 >= _r)),
  Da = " ",
  $a = !1;
function Lc(e, t) {
  switch (e) {
    case "keyup":
      return Jp.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Mc(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var En = !1;
function bp(e, t) {
  switch (e) {
    case "compositionend":
      return Mc(t);
    case "keypress":
      return t.which !== 32 ? null : (($a = !0), Da);
    case "textInput":
      return (e = t.data), e === Da && $a ? null : e;
    default:
      return null;
  }
}
function eh(e, t) {
  if (En)
    return e === "compositionend" || (!Fs && Lc(e, t))
      ? ((e = zc()), (Mi = Ds = zt = null), (En = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Ic && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var th = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Ua(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!th[e.type] : t === "textarea";
}
function Dc(e, t, n, r) {
  pc(r),
    (t = Ji(t, "onChange")),
    0 < t.length &&
      ((n = new $s("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var wr = null,
  Ir = null;
function nh(e) {
  Kc(e, 0);
}
function Tl(e) {
  var t = Pn(e);
  if (oc(t)) return e;
}
function rh(e, t) {
  if (e === "change") return t;
}
var $c = !1;
if (gt) {
  var to;
  if (gt) {
    var no = "oninput" in document;
    if (!no) {
      var Fa = document.createElement("div");
      Fa.setAttribute("oninput", "return;"),
        (no = typeof Fa.oninput == "function");
    }
    to = no;
  } else to = !1;
  $c = to && (!document.documentMode || 9 < document.documentMode);
}
function Aa() {
  wr && (wr.detachEvent("onpropertychange", Uc), (Ir = wr = null));
}
function Uc(e) {
  if (e.propertyName === "value" && Tl(Ir)) {
    var t = [];
    Dc(t, Ir, e, Rs(e)), yc(nh, t);
  }
}
function ih(e, t, n) {
  e === "focusin"
    ? (Aa(), (wr = t), (Ir = n), wr.attachEvent("onpropertychange", Uc))
    : e === "focusout" && Aa();
}
function lh(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Tl(Ir);
}
function oh(e, t) {
  if (e === "click") return Tl(t);
}
function sh(e, t) {
  if (e === "input" || e === "change") return Tl(t);
}
function ah(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var et = typeof Object.is == "function" ? Object.is : ah;
function Lr(e, t) {
  if (et(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!ko.call(t, i) || !et(e[i], t[i])) return !1;
  }
  return !0;
}
function Va(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Za(e, t) {
  var n = Va(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Va(n);
  }
}
function Fc(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Fc(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Ac() {
  for (var e = window, t = Wi(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Wi(e.document);
  }
  return t;
}
function As(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function uh(e) {
  var t = Ac(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Fc(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && As(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          l = Math.min(r.start, i);
        (r = r.end === void 0 ? l : Math.min(r.end, i)),
          !e.extend && l > r && ((i = r), (r = l), (l = i)),
          (i = Za(n, l));
        var o = Za(n, r);
        i &&
          o &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          l > r
            ? (e.addRange(t), e.extend(o.node, o.offset))
            : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var ch = gt && "documentMode" in document && 11 >= document.documentMode,
  Nn = null,
  Vo = null,
  kr = null,
  Zo = !1;
function Ba(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Zo ||
    Nn == null ||
    Nn !== Wi(r) ||
    ((r = Nn),
    "selectionStart" in r && As(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (kr && Lr(kr, r)) ||
      ((kr = r),
      (r = Ji(Vo, "onSelect")),
      0 < r.length &&
        ((t = new $s("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Nn))));
}
function Si(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Tn = {
    animationend: Si("Animation", "AnimationEnd"),
    animationiteration: Si("Animation", "AnimationIteration"),
    animationstart: Si("Animation", "AnimationStart"),
    transitionend: Si("Transition", "TransitionEnd"),
  },
  ro = {},
  Vc = {};
gt &&
  ((Vc = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Tn.animationend.animation,
    delete Tn.animationiteration.animation,
    delete Tn.animationstart.animation),
  "TransitionEvent" in window || delete Tn.transitionend.transition);
function Pl(e) {
  if (ro[e]) return ro[e];
  if (!Tn[e]) return e;
  var t = Tn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Vc) return (ro[e] = t[n]);
  return e;
}
var Zc = Pl("animationend"),
  Bc = Pl("animationiteration"),
  Wc = Pl("animationstart"),
  Hc = Pl("transitionend"),
  Qc = new Map(),
  Wa =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function Gt(e, t) {
  Qc.set(e, t), gn(t, [e]);
}
for (var io = 0; io < Wa.length; io++) {
  var lo = Wa[io],
    dh = lo.toLowerCase(),
    fh = lo[0].toUpperCase() + lo.slice(1);
  Gt(dh, "on" + fh);
}
Gt(Zc, "onAnimationEnd");
Gt(Bc, "onAnimationIteration");
Gt(Wc, "onAnimationStart");
Gt("dblclick", "onDoubleClick");
Gt("focusin", "onFocus");
Gt("focusout", "onBlur");
Gt(Hc, "onTransitionEnd");
Bn("onMouseEnter", ["mouseout", "mouseover"]);
Bn("onMouseLeave", ["mouseout", "mouseover"]);
Bn("onPointerEnter", ["pointerout", "pointerover"]);
Bn("onPointerLeave", ["pointerout", "pointerover"]);
gn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
gn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
gn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
gn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
gn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
gn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var mr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  ph = new Set("cancel close invalid load scroll toggle".split(" ").concat(mr));
function Ha(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), dp(r, t, void 0, e), (e.currentTarget = null);
}
function Kc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var l = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var s = r[o],
            a = s.instance,
            u = s.currentTarget;
          if (((s = s.listener), a !== l && i.isPropagationStopped())) break e;
          Ha(i, s, u), (l = a);
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((s = r[o]),
            (a = s.instance),
            (u = s.currentTarget),
            (s = s.listener),
            a !== l && i.isPropagationStopped())
          )
            break e;
          Ha(i, s, u), (l = a);
        }
    }
  }
  if (Qi) throw ((e = $o), (Qi = !1), ($o = null), e);
}
function K(e, t) {
  var n = t[Ko];
  n === void 0 && (n = t[Ko] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Yc(t, e, 2, !1), n.add(r));
}
function oo(e, t, n) {
  var r = 0;
  t && (r |= 4), Yc(n, e, r, t);
}
var Ci = "_reactListening" + Math.random().toString(36).slice(2);
function Mr(e) {
  if (!e[Ci]) {
    (e[Ci] = !0),
      tc.forEach(function (n) {
        n !== "selectionchange" && (ph.has(n) || oo(n, !1, e), oo(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Ci] || ((t[Ci] = !0), oo("selectionchange", !1, t));
  }
}
function Yc(e, t, n, r) {
  switch (Rc(t)) {
    case 1:
      var i = Tp;
      break;
    case 4:
      i = Pp;
      break;
    default:
      i = Ms;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !Do ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
        ? e.addEventListener(t, n, { passive: i })
        : e.addEventListener(t, n, !1);
}
function so(e, t, n, r, i) {
  var l = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var s = r.stateNode.containerInfo;
        if (s === i || (s.nodeType === 8 && s.parentNode === i)) break;
        if (o === 4)
          for (o = r.return; o !== null; ) {
            var a = o.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = o.stateNode.containerInfo),
              a === i || (a.nodeType === 8 && a.parentNode === i))
            )
              return;
            o = o.return;
          }
        for (; s !== null; ) {
          if (((o = rn(s)), o === null)) return;
          if (((a = o.tag), a === 5 || a === 6)) {
            r = l = o;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  yc(function () {
    var u = l,
      d = Rs(n),
      p = [];
    e: {
      var m = Qc.get(e);
      if (m !== void 0) {
        var y = $s,
          _ = e;
        switch (e) {
          case "keypress":
            if (Di(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = Bp;
            break;
          case "focusin":
            (_ = "focus"), (y = eo);
            break;
          case "focusout":
            (_ = "blur"), (y = eo);
            break;
          case "beforeblur":
          case "afterblur":
            y = eo;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = Ia;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Rp;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Qp;
            break;
          case Zc:
          case Bc:
          case Wc:
            y = Lp;
            break;
          case Hc:
            y = Yp;
            break;
          case "scroll":
            y = jp;
            break;
          case "wheel":
            y = Xp;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Dp;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Ma;
        }
        var x = (t & 4) !== 0,
          S = !x && e === "scroll",
          f = x ? (m !== null ? m + "Capture" : null) : m;
        x = [];
        for (var c = u, h; c !== null; ) {
          h = c;
          var g = h.stateNode;
          if (
            (h.tag === 5 &&
              g !== null &&
              ((h = g),
              f !== null && ((g = jr(c, f)), g != null && x.push(Dr(c, g, h)))),
            S)
          )
            break;
          c = c.return;
        }
        0 < x.length &&
          ((m = new y(m, _, null, n, d)), p.push({ event: m, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((m = e === "mouseover" || e === "pointerover"),
          (y = e === "mouseout" || e === "pointerout"),
          m &&
            n !== Lo &&
            (_ = n.relatedTarget || n.fromElement) &&
            (rn(_) || _[xt]))
        )
          break e;
        if (
          (y || m) &&
          ((m =
            d.window === d
              ? d
              : (m = d.ownerDocument)
                ? m.defaultView || m.parentWindow
                : window),
          y
            ? ((_ = n.relatedTarget || n.toElement),
              (y = u),
              (_ = _ ? rn(_) : null),
              _ !== null &&
                ((S = xn(_)), _ !== S || (_.tag !== 5 && _.tag !== 6)) &&
                (_ = null))
            : ((y = null), (_ = u)),
          y !== _)
        ) {
          if (
            ((x = Ia),
            (g = "onMouseLeave"),
            (f = "onMouseEnter"),
            (c = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((x = Ma),
              (g = "onPointerLeave"),
              (f = "onPointerEnter"),
              (c = "pointer")),
            (S = y == null ? m : Pn(y)),
            (h = _ == null ? m : Pn(_)),
            (m = new x(g, c + "leave", y, n, d)),
            (m.target = S),
            (m.relatedTarget = h),
            (g = null),
            rn(d) === u &&
              ((x = new x(f, c + "enter", _, n, d)),
              (x.target = h),
              (x.relatedTarget = S),
              (g = x)),
            (S = g),
            y && _)
          )
            t: {
              for (x = y, f = _, c = 0, h = x; h; h = wn(h)) c++;
              for (h = 0, g = f; g; g = wn(g)) h++;
              for (; 0 < c - h; ) (x = wn(x)), c--;
              for (; 0 < h - c; ) (f = wn(f)), h--;
              for (; c--; ) {
                if (x === f || (f !== null && x === f.alternate)) break t;
                (x = wn(x)), (f = wn(f));
              }
              x = null;
            }
          else x = null;
          y !== null && Qa(p, m, y, x, !1),
            _ !== null && S !== null && Qa(p, S, _, x, !0);
        }
      }
      e: {
        if (
          ((m = u ? Pn(u) : window),
          (y = m.nodeName && m.nodeName.toLowerCase()),
          y === "select" || (y === "input" && m.type === "file"))
        )
          var N = rh;
        else if (Ua(m))
          if ($c) N = sh;
          else {
            N = lh;
            var O = ih;
          }
        else
          (y = m.nodeName) &&
            y.toLowerCase() === "input" &&
            (m.type === "checkbox" || m.type === "radio") &&
            (N = oh);
        if (N && (N = N(e, u))) {
          Dc(p, N, n, d);
          break e;
        }
        O && O(e, m, u),
          e === "focusout" &&
            (O = m._wrapperState) &&
            O.controlled &&
            m.type === "number" &&
            jo(m, "number", m.value);
      }
      switch (((O = u ? Pn(u) : window), e)) {
        case "focusin":
          (Ua(O) || O.contentEditable === "true") &&
            ((Nn = O), (Vo = u), (kr = null));
          break;
        case "focusout":
          kr = Vo = Nn = null;
          break;
        case "mousedown":
          Zo = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Zo = !1), Ba(p, n, d);
          break;
        case "selectionchange":
          if (ch) break;
        case "keydown":
        case "keyup":
          Ba(p, n, d);
      }
      var R;
      if (Fs)
        e: {
          switch (e) {
            case "compositionstart":
              var I = "onCompositionStart";
              break e;
            case "compositionend":
              I = "onCompositionEnd";
              break e;
            case "compositionupdate":
              I = "onCompositionUpdate";
              break e;
          }
          I = void 0;
        }
      else
        En
          ? Lc(e, n) && (I = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (I = "onCompositionStart");
      I &&
        (Ic &&
          n.locale !== "ko" &&
          (En || I !== "onCompositionStart"
            ? I === "onCompositionEnd" && En && (R = zc())
            : ((zt = d),
              (Ds = "value" in zt ? zt.value : zt.textContent),
              (En = !0))),
        (O = Ji(u, I)),
        0 < O.length &&
          ((I = new La(I, e, null, n, d)),
          p.push({ event: I, listeners: O }),
          R ? (I.data = R) : ((R = Mc(n)), R !== null && (I.data = R)))),
        (R = qp ? bp(e, n) : eh(e, n)) &&
          ((u = Ji(u, "onBeforeInput")),
          0 < u.length &&
            ((d = new La("onBeforeInput", "beforeinput", null, n, d)),
            p.push({ event: d, listeners: u }),
            (d.data = R)));
    }
    Kc(p, t);
  });
}
function Dr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ji(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      l = i.stateNode;
    i.tag === 5 &&
      l !== null &&
      ((i = l),
      (l = jr(e, n)),
      l != null && r.unshift(Dr(e, l, i)),
      (l = jr(e, t)),
      l != null && r.push(Dr(e, l, i))),
      (e = e.return);
  }
  return r;
}
function wn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Qa(e, t, n, r, i) {
  for (var l = t._reactName, o = []; n !== null && n !== r; ) {
    var s = n,
      a = s.alternate,
      u = s.stateNode;
    if (a !== null && a === r) break;
    s.tag === 5 &&
      u !== null &&
      ((s = u),
      i
        ? ((a = jr(n, l)), a != null && o.unshift(Dr(n, a, s)))
        : i || ((a = jr(n, l)), a != null && o.push(Dr(n, a, s)))),
      (n = n.return);
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var hh = /\r\n?/g,
  mh = /\u0000|\uFFFD/g;
function Ka(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      hh,
      `
`,
    )
    .replace(mh, "");
}
function Ei(e, t, n) {
  if (((t = Ka(t)), Ka(e) !== t && n)) throw Error(w(425));
}
function qi() {}
var Bo = null,
  Wo = null;
function Ho(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Qo = typeof setTimeout == "function" ? setTimeout : void 0,
  vh = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Ya = typeof Promise == "function" ? Promise : void 0,
  yh =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Ya < "u"
        ? function (e) {
            return Ya.resolve(null).then(e).catch(gh);
          }
        : Qo;
function gh(e) {
  setTimeout(function () {
    throw e;
  });
}
function ao(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(i), zr(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  zr(t);
}
function Ut(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Ga(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var tr = Math.random().toString(36).slice(2),
  it = "__reactFiber$" + tr,
  $r = "__reactProps$" + tr,
  xt = "__reactContainer$" + tr,
  Ko = "__reactEvents$" + tr,
  xh = "__reactListeners$" + tr,
  _h = "__reactHandles$" + tr;
function rn(e) {
  var t = e[it];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[xt] || n[it])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Ga(e); e !== null; ) {
          if ((n = e[it])) return n;
          e = Ga(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function ui(e) {
  return (
    (e = e[it] || e[xt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Pn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(w(33));
}
function jl(e) {
  return e[$r] || null;
}
var Yo = [],
  jn = -1;
function Xt(e) {
  return { current: e };
}
function Y(e) {
  0 > jn || ((e.current = Yo[jn]), (Yo[jn] = null), jn--);
}
function Q(e, t) {
  jn++, (Yo[jn] = e.current), (e.current = t);
}
var Wt = {},
  _e = Xt(Wt),
  je = Xt(!1),
  dn = Wt;
function Wn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Wt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    l;
  for (l in n) i[l] = t[l];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function Oe(e) {
  return (e = e.childContextTypes), e != null;
}
function bi() {
  Y(je), Y(_e);
}
function Xa(e, t, n) {
  if (_e.current !== Wt) throw Error(w(168));
  Q(_e, t), Q(je, n);
}
function Gc(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(w(108, ip(e) || "Unknown", i));
  return ee({}, n, r);
}
function el(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Wt),
    (dn = _e.current),
    Q(_e, e),
    Q(je, je.current),
    !0
  );
}
function Ja(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(w(169));
  n
    ? ((e = Gc(e, t, dn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      Y(je),
      Y(_e),
      Q(_e, e))
    : Y(je),
    Q(je, n);
}
var ft = null,
  Ol = !1,
  uo = !1;
function Xc(e) {
  ft === null ? (ft = [e]) : ft.push(e);
}
function wh(e) {
  (Ol = !0), Xc(e);
}
function Jt() {
  if (!uo && ft !== null) {
    uo = !0;
    var e = 0,
      t = H;
    try {
      var n = ft;
      for (H = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (ft = null), (Ol = !1);
    } catch (i) {
      throw (ft !== null && (ft = ft.slice(e + 1)), wc(zs, Jt), i);
    } finally {
      (H = t), (uo = !1);
    }
  }
  return null;
}
var On = [],
  Rn = 0,
  tl = null,
  nl = 0,
  Ae = [],
  Ve = 0,
  fn = null,
  ht = 1,
  mt = "";
function tn(e, t) {
  (On[Rn++] = nl), (On[Rn++] = tl), (tl = e), (nl = t);
}
function Jc(e, t, n) {
  (Ae[Ve++] = ht), (Ae[Ve++] = mt), (Ae[Ve++] = fn), (fn = e);
  var r = ht;
  e = mt;
  var i = 32 - Je(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var l = 32 - Je(t) + i;
  if (30 < l) {
    var o = i - (i % 5);
    (l = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (i -= o),
      (ht = (1 << (32 - Je(t) + i)) | (n << i) | r),
      (mt = l + e);
  } else (ht = (1 << l) | (n << i) | r), (mt = e);
}
function Vs(e) {
  e.return !== null && (tn(e, 1), Jc(e, 1, 0));
}
function Zs(e) {
  for (; e === tl; )
    (tl = On[--Rn]), (On[Rn] = null), (nl = On[--Rn]), (On[Rn] = null);
  for (; e === fn; )
    (fn = Ae[--Ve]),
      (Ae[Ve] = null),
      (mt = Ae[--Ve]),
      (Ae[Ve] = null),
      (ht = Ae[--Ve]),
      (Ae[Ve] = null);
}
var Me = null,
  Le = null,
  G = !1,
  Ge = null;
function qc(e, t) {
  var n = Ze(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function qa(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Me = e), (Le = Ut(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Me = e), (Le = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = fn !== null ? { id: ht, overflow: mt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Ze(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Me = e),
            (Le = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Go(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Xo(e) {
  if (G) {
    var t = Le;
    if (t) {
      var n = t;
      if (!qa(e, t)) {
        if (Go(e)) throw Error(w(418));
        t = Ut(n.nextSibling);
        var r = Me;
        t && qa(e, t)
          ? qc(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (G = !1), (Me = e));
      }
    } else {
      if (Go(e)) throw Error(w(418));
      (e.flags = (e.flags & -4097) | 2), (G = !1), (Me = e);
    }
  }
}
function ba(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Me = e;
}
function Ni(e) {
  if (e !== Me) return !1;
  if (!G) return ba(e), (G = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Ho(e.type, e.memoizedProps))),
    t && (t = Le))
  ) {
    if (Go(e)) throw (bc(), Error(w(418)));
    for (; t; ) qc(e, t), (t = Ut(t.nextSibling));
  }
  if ((ba(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(w(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Le = Ut(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Le = null;
    }
  } else Le = Me ? Ut(e.stateNode.nextSibling) : null;
  return !0;
}
function bc() {
  for (var e = Le; e; ) e = Ut(e.nextSibling);
}
function Hn() {
  (Le = Me = null), (G = !1);
}
function Bs(e) {
  Ge === null ? (Ge = [e]) : Ge.push(e);
}
var kh = St.ReactCurrentBatchConfig;
function ur(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(w(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(w(147, e));
      var i = r,
        l = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === l
        ? t.ref
        : ((t = function (o) {
            var s = i.refs;
            o === null ? delete s[l] : (s[l] = o);
          }),
          (t._stringRef = l),
          t);
    }
    if (typeof e != "string") throw Error(w(284));
    if (!n._owner) throw Error(w(290, e));
  }
  return e;
}
function Ti(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      w(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    ))
  );
}
function eu(e) {
  var t = e._init;
  return t(e._payload);
}
function ed(e) {
  function t(f, c) {
    if (e) {
      var h = f.deletions;
      h === null ? ((f.deletions = [c]), (f.flags |= 16)) : h.push(c);
    }
  }
  function n(f, c) {
    if (!e) return null;
    for (; c !== null; ) t(f, c), (c = c.sibling);
    return null;
  }
  function r(f, c) {
    for (f = new Map(); c !== null; )
      c.key !== null ? f.set(c.key, c) : f.set(c.index, c), (c = c.sibling);
    return f;
  }
  function i(f, c) {
    return (f = Zt(f, c)), (f.index = 0), (f.sibling = null), f;
  }
  function l(f, c, h) {
    return (
      (f.index = h),
      e
        ? ((h = f.alternate),
          h !== null
            ? ((h = h.index), h < c ? ((f.flags |= 2), c) : h)
            : ((f.flags |= 2), c))
        : ((f.flags |= 1048576), c)
    );
  }
  function o(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function s(f, c, h, g) {
    return c === null || c.tag !== 6
      ? ((c = yo(h, f.mode, g)), (c.return = f), c)
      : ((c = i(c, h)), (c.return = f), c);
  }
  function a(f, c, h, g) {
    var N = h.type;
    return N === Cn
      ? d(f, c, h.props.children, g, h.key)
      : c !== null &&
          (c.elementType === N ||
            (typeof N == "object" &&
              N !== null &&
              N.$$typeof === Tt &&
              eu(N) === c.type))
        ? ((g = i(c, h.props)), (g.ref = ur(f, c, h)), (g.return = f), g)
        : ((g = Bi(h.type, h.key, h.props, null, f.mode, g)),
          (g.ref = ur(f, c, h)),
          (g.return = f),
          g);
  }
  function u(f, c, h, g) {
    return c === null ||
      c.tag !== 4 ||
      c.stateNode.containerInfo !== h.containerInfo ||
      c.stateNode.implementation !== h.implementation
      ? ((c = go(h, f.mode, g)), (c.return = f), c)
      : ((c = i(c, h.children || [])), (c.return = f), c);
  }
  function d(f, c, h, g, N) {
    return c === null || c.tag !== 7
      ? ((c = an(h, f.mode, g, N)), (c.return = f), c)
      : ((c = i(c, h)), (c.return = f), c);
  }
  function p(f, c, h) {
    if ((typeof c == "string" && c !== "") || typeof c == "number")
      return (c = yo("" + c, f.mode, h)), (c.return = f), c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case vi:
          return (
            (h = Bi(c.type, c.key, c.props, null, f.mode, h)),
            (h.ref = ur(f, null, c)),
            (h.return = f),
            h
          );
        case Sn:
          return (c = go(c, f.mode, h)), (c.return = f), c;
        case Tt:
          var g = c._init;
          return p(f, g(c._payload), h);
      }
      if (pr(c) || ir(c))
        return (c = an(c, f.mode, h, null)), (c.return = f), c;
      Ti(f, c);
    }
    return null;
  }
  function m(f, c, h, g) {
    var N = c !== null ? c.key : null;
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return N !== null ? null : s(f, c, "" + h, g);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case vi:
          return h.key === N ? a(f, c, h, g) : null;
        case Sn:
          return h.key === N ? u(f, c, h, g) : null;
        case Tt:
          return (N = h._init), m(f, c, N(h._payload), g);
      }
      if (pr(h) || ir(h)) return N !== null ? null : d(f, c, h, g, null);
      Ti(f, h);
    }
    return null;
  }
  function y(f, c, h, g, N) {
    if ((typeof g == "string" && g !== "") || typeof g == "number")
      return (f = f.get(h) || null), s(c, f, "" + g, N);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case vi:
          return (f = f.get(g.key === null ? h : g.key) || null), a(c, f, g, N);
        case Sn:
          return (f = f.get(g.key === null ? h : g.key) || null), u(c, f, g, N);
        case Tt:
          var O = g._init;
          return y(f, c, h, O(g._payload), N);
      }
      if (pr(g) || ir(g)) return (f = f.get(h) || null), d(c, f, g, N, null);
      Ti(c, g);
    }
    return null;
  }
  function _(f, c, h, g) {
    for (
      var N = null, O = null, R = c, I = (c = 0), X = null;
      R !== null && I < h.length;
      I++
    ) {
      R.index > I ? ((X = R), (R = null)) : (X = R.sibling);
      var A = m(f, R, h[I], g);
      if (A === null) {
        R === null && (R = X);
        break;
      }
      e && R && A.alternate === null && t(f, R),
        (c = l(A, c, I)),
        O === null ? (N = A) : (O.sibling = A),
        (O = A),
        (R = X);
    }
    if (I === h.length) return n(f, R), G && tn(f, I), N;
    if (R === null) {
      for (; I < h.length; I++)
        (R = p(f, h[I], g)),
          R !== null &&
            ((c = l(R, c, I)), O === null ? (N = R) : (O.sibling = R), (O = R));
      return G && tn(f, I), N;
    }
    for (R = r(f, R); I < h.length; I++)
      (X = y(R, f, I, h[I], g)),
        X !== null &&
          (e && X.alternate !== null && R.delete(X.key === null ? I : X.key),
          (c = l(X, c, I)),
          O === null ? (N = X) : (O.sibling = X),
          (O = X));
    return (
      e &&
        R.forEach(function (ze) {
          return t(f, ze);
        }),
      G && tn(f, I),
      N
    );
  }
  function x(f, c, h, g) {
    var N = ir(h);
    if (typeof N != "function") throw Error(w(150));
    if (((h = N.call(h)), h == null)) throw Error(w(151));
    for (
      var O = (N = null), R = c, I = (c = 0), X = null, A = h.next();
      R !== null && !A.done;
      I++, A = h.next()
    ) {
      R.index > I ? ((X = R), (R = null)) : (X = R.sibling);
      var ze = m(f, R, A.value, g);
      if (ze === null) {
        R === null && (R = X);
        break;
      }
      e && R && ze.alternate === null && t(f, R),
        (c = l(ze, c, I)),
        O === null ? (N = ze) : (O.sibling = ze),
        (O = ze),
        (R = X);
    }
    if (A.done) return n(f, R), G && tn(f, I), N;
    if (R === null) {
      for (; !A.done; I++, A = h.next())
        (A = p(f, A.value, g)),
          A !== null &&
            ((c = l(A, c, I)), O === null ? (N = A) : (O.sibling = A), (O = A));
      return G && tn(f, I), N;
    }
    for (R = r(f, R); !A.done; I++, A = h.next())
      (A = y(R, f, I, A.value, g)),
        A !== null &&
          (e && A.alternate !== null && R.delete(A.key === null ? I : A.key),
          (c = l(A, c, I)),
          O === null ? (N = A) : (O.sibling = A),
          (O = A));
    return (
      e &&
        R.forEach(function (Ct) {
          return t(f, Ct);
        }),
      G && tn(f, I),
      N
    );
  }
  function S(f, c, h, g) {
    if (
      (typeof h == "object" &&
        h !== null &&
        h.type === Cn &&
        h.key === null &&
        (h = h.props.children),
      typeof h == "object" && h !== null)
    ) {
      switch (h.$$typeof) {
        case vi:
          e: {
            for (var N = h.key, O = c; O !== null; ) {
              if (O.key === N) {
                if (((N = h.type), N === Cn)) {
                  if (O.tag === 7) {
                    n(f, O.sibling),
                      (c = i(O, h.props.children)),
                      (c.return = f),
                      (f = c);
                    break e;
                  }
                } else if (
                  O.elementType === N ||
                  (typeof N == "object" &&
                    N !== null &&
                    N.$$typeof === Tt &&
                    eu(N) === O.type)
                ) {
                  n(f, O.sibling),
                    (c = i(O, h.props)),
                    (c.ref = ur(f, O, h)),
                    (c.return = f),
                    (f = c);
                  break e;
                }
                n(f, O);
                break;
              } else t(f, O);
              O = O.sibling;
            }
            h.type === Cn
              ? ((c = an(h.props.children, f.mode, g, h.key)),
                (c.return = f),
                (f = c))
              : ((g = Bi(h.type, h.key, h.props, null, f.mode, g)),
                (g.ref = ur(f, c, h)),
                (g.return = f),
                (f = g));
          }
          return o(f);
        case Sn:
          e: {
            for (O = h.key; c !== null; ) {
              if (c.key === O)
                if (
                  c.tag === 4 &&
                  c.stateNode.containerInfo === h.containerInfo &&
                  c.stateNode.implementation === h.implementation
                ) {
                  n(f, c.sibling),
                    (c = i(c, h.children || [])),
                    (c.return = f),
                    (f = c);
                  break e;
                } else {
                  n(f, c);
                  break;
                }
              else t(f, c);
              c = c.sibling;
            }
            (c = go(h, f.mode, g)), (c.return = f), (f = c);
          }
          return o(f);
        case Tt:
          return (O = h._init), S(f, c, O(h._payload), g);
      }
      if (pr(h)) return _(f, c, h, g);
      if (ir(h)) return x(f, c, h, g);
      Ti(f, h);
    }
    return (typeof h == "string" && h !== "") || typeof h == "number"
      ? ((h = "" + h),
        c !== null && c.tag === 6
          ? (n(f, c.sibling), (c = i(c, h)), (c.return = f), (f = c))
          : (n(f, c), (c = yo(h, f.mode, g)), (c.return = f), (f = c)),
        o(f))
      : n(f, c);
  }
  return S;
}
var Qn = ed(!0),
  td = ed(!1),
  rl = Xt(null),
  il = null,
  zn = null,
  Ws = null;
function Hs() {
  Ws = zn = il = null;
}
function Qs(e) {
  var t = rl.current;
  Y(rl), (e._currentValue = t);
}
function Jo(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function An(e, t) {
  (il = e),
    (Ws = zn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Pe = !0), (e.firstContext = null));
}
function We(e) {
  var t = e._currentValue;
  if (Ws !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), zn === null)) {
      if (il === null) throw Error(w(308));
      (zn = e), (il.dependencies = { lanes: 0, firstContext: e });
    } else zn = zn.next = e;
  return t;
}
var ln = null;
function Ks(e) {
  ln === null ? (ln = [e]) : ln.push(e);
}
function nd(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), Ks(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    _t(e, r)
  );
}
function _t(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Pt = !1;
function Ys(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function rd(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function yt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Ft(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), W & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      _t(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), Ks(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    _t(e, n)
  );
}
function $i(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Is(e, n);
  }
}
function tu(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      l = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        l === null ? (i = l = o) : (l = l.next = o), (n = n.next);
      } while (n !== null);
      l === null ? (i = l = t) : (l = l.next = t);
    } else i = l = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: l,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function ll(e, t, n, r) {
  var i = e.updateQueue;
  Pt = !1;
  var l = i.firstBaseUpdate,
    o = i.lastBaseUpdate,
    s = i.shared.pending;
  if (s !== null) {
    i.shared.pending = null;
    var a = s,
      u = a.next;
    (a.next = null), o === null ? (l = u) : (o.next = u), (o = a);
    var d = e.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (s = d.lastBaseUpdate),
      s !== o &&
        (s === null ? (d.firstBaseUpdate = u) : (s.next = u),
        (d.lastBaseUpdate = a)));
  }
  if (l !== null) {
    var p = i.baseState;
    (o = 0), (d = u = a = null), (s = l);
    do {
      var m = s.lane,
        y = s.eventTime;
      if ((r & m) === m) {
        d !== null &&
          (d = d.next =
            {
              eventTime: y,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var _ = e,
            x = s;
          switch (((m = t), (y = n), x.tag)) {
            case 1:
              if (((_ = x.payload), typeof _ == "function")) {
                p = _.call(y, p, m);
                break e;
              }
              p = _;
              break e;
            case 3:
              _.flags = (_.flags & -65537) | 128;
            case 0:
              if (
                ((_ = x.payload),
                (m = typeof _ == "function" ? _.call(y, p, m) : _),
                m == null)
              )
                break e;
              p = ee({}, p, m);
              break e;
            case 2:
              Pt = !0;
          }
        }
        s.callback !== null &&
          s.lane !== 0 &&
          ((e.flags |= 64),
          (m = i.effects),
          m === null ? (i.effects = [s]) : m.push(s));
      } else
        (y = {
          eventTime: y,
          lane: m,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          d === null ? ((u = d = y), (a = p)) : (d = d.next = y),
          (o |= m);
      if (((s = s.next), s === null)) {
        if (((s = i.shared.pending), s === null)) break;
        (m = s),
          (s = m.next),
          (m.next = null),
          (i.lastBaseUpdate = m),
          (i.shared.pending = null);
      }
    } while (!0);
    if (
      (d === null && (a = p),
      (i.baseState = a),
      (i.firstBaseUpdate = u),
      (i.lastBaseUpdate = d),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (o |= i.lane), (i = i.next);
      while (i !== t);
    } else l === null && (i.shared.lanes = 0);
    (hn |= o), (e.lanes = o), (e.memoizedState = p);
  }
}
function nu(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(w(191, i));
        i.call(r);
      }
    }
}
var ci = {},
  ot = Xt(ci),
  Ur = Xt(ci),
  Fr = Xt(ci);
function on(e) {
  if (e === ci) throw Error(w(174));
  return e;
}
function Gs(e, t) {
  switch ((Q(Fr, t), Q(Ur, e), Q(ot, ci), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ro(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Ro(t, e));
  }
  Y(ot), Q(ot, t);
}
function Kn() {
  Y(ot), Y(Ur), Y(Fr);
}
function id(e) {
  on(Fr.current);
  var t = on(ot.current),
    n = Ro(t, e.type);
  t !== n && (Q(Ur, e), Q(ot, n));
}
function Xs(e) {
  Ur.current === e && (Y(ot), Y(Ur));
}
var q = Xt(0);
function ol(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var co = [];
function Js() {
  for (var e = 0; e < co.length; e++)
    co[e]._workInProgressVersionPrimary = null;
  co.length = 0;
}
var Ui = St.ReactCurrentDispatcher,
  fo = St.ReactCurrentBatchConfig,
  pn = 0,
  b = null,
  se = null,
  de = null,
  sl = !1,
  Sr = !1,
  Ar = 0,
  Sh = 0;
function ye() {
  throw Error(w(321));
}
function qs(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!et(e[n], t[n])) return !1;
  return !0;
}
function bs(e, t, n, r, i, l) {
  if (
    ((pn = l),
    (b = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ui.current = e === null || e.memoizedState === null ? Th : Ph),
    (e = n(r, i)),
    Sr)
  ) {
    l = 0;
    do {
      if (((Sr = !1), (Ar = 0), 25 <= l)) throw Error(w(301));
      (l += 1),
        (de = se = null),
        (t.updateQueue = null),
        (Ui.current = jh),
        (e = n(r, i));
    } while (Sr);
  }
  if (
    ((Ui.current = al),
    (t = se !== null && se.next !== null),
    (pn = 0),
    (de = se = b = null),
    (sl = !1),
    t)
  )
    throw Error(w(300));
  return e;
}
function ea() {
  var e = Ar !== 0;
  return (Ar = 0), e;
}
function rt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return de === null ? (b.memoizedState = de = e) : (de = de.next = e), de;
}
function He() {
  if (se === null) {
    var e = b.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = se.next;
  var t = de === null ? b.memoizedState : de.next;
  if (t !== null) (de = t), (se = e);
  else {
    if (e === null) throw Error(w(310));
    (se = e),
      (e = {
        memoizedState: se.memoizedState,
        baseState: se.baseState,
        baseQueue: se.baseQueue,
        queue: se.queue,
        next: null,
      }),
      de === null ? (b.memoizedState = de = e) : (de = de.next = e);
  }
  return de;
}
function Vr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function po(e) {
  var t = He(),
    n = t.queue;
  if (n === null) throw Error(w(311));
  n.lastRenderedReducer = e;
  var r = se,
    i = r.baseQueue,
    l = n.pending;
  if (l !== null) {
    if (i !== null) {
      var o = i.next;
      (i.next = l.next), (l.next = o);
    }
    (r.baseQueue = i = l), (n.pending = null);
  }
  if (i !== null) {
    (l = i.next), (r = r.baseState);
    var s = (o = null),
      a = null,
      u = l;
    do {
      var d = u.lane;
      if ((pn & d) === d)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var p = {
          lane: d,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        a === null ? ((s = a = p), (o = r)) : (a = a.next = p),
          (b.lanes |= d),
          (hn |= d);
      }
      u = u.next;
    } while (u !== null && u !== l);
    a === null ? (o = r) : (a.next = s),
      et(r, t.memoizedState) || (Pe = !0),
      (t.memoizedState = r),
      (t.baseState = o),
      (t.baseQueue = a),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (l = i.lane), (b.lanes |= l), (hn |= l), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ho(e) {
  var t = He(),
    n = t.queue;
  if (n === null) throw Error(w(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    l = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var o = (i = i.next);
    do (l = e(l, o.action)), (o = o.next);
    while (o !== i);
    et(l, t.memoizedState) || (Pe = !0),
      (t.memoizedState = l),
      t.baseQueue === null && (t.baseState = l),
      (n.lastRenderedState = l);
  }
  return [l, r];
}
function ld() {}
function od(e, t) {
  var n = b,
    r = He(),
    i = t(),
    l = !et(r.memoizedState, i);
  if (
    (l && ((r.memoizedState = i), (Pe = !0)),
    (r = r.queue),
    ta(ud.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || l || (de !== null && de.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Zr(9, ad.bind(null, n, r, i, t), void 0, null),
      fe === null)
    )
      throw Error(w(349));
    pn & 30 || sd(n, t, i);
  }
  return i;
}
function sd(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = b.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (b.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function ad(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), cd(t) && dd(e);
}
function ud(e, t, n) {
  return n(function () {
    cd(t) && dd(e);
  });
}
function cd(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !et(e, n);
  } catch {
    return !0;
  }
}
function dd(e) {
  var t = _t(e, 1);
  t !== null && qe(t, e, 1, -1);
}
function ru(e) {
  var t = rt();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Vr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Nh.bind(null, b, e)),
    [t.memoizedState, e]
  );
}
function Zr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = b.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (b.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function fd() {
  return He().memoizedState;
}
function Fi(e, t, n, r) {
  var i = rt();
  (b.flags |= e),
    (i.memoizedState = Zr(1 | t, n, void 0, r === void 0 ? null : r));
}
function Rl(e, t, n, r) {
  var i = He();
  r = r === void 0 ? null : r;
  var l = void 0;
  if (se !== null) {
    var o = se.memoizedState;
    if (((l = o.destroy), r !== null && qs(r, o.deps))) {
      i.memoizedState = Zr(t, n, l, r);
      return;
    }
  }
  (b.flags |= e), (i.memoizedState = Zr(1 | t, n, l, r));
}
function iu(e, t) {
  return Fi(8390656, 8, e, t);
}
function ta(e, t) {
  return Rl(2048, 8, e, t);
}
function pd(e, t) {
  return Rl(4, 2, e, t);
}
function hd(e, t) {
  return Rl(4, 4, e, t);
}
function md(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function vd(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Rl(4, 4, md.bind(null, t, e), n)
  );
}
function na() {}
function yd(e, t) {
  var n = He();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && qs(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function gd(e, t) {
  var n = He();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && qs(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function xd(e, t, n) {
  return pn & 21
    ? (et(n, t) || ((n = Cc()), (b.lanes |= n), (hn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Pe = !0)), (e.memoizedState = n));
}
function Ch(e, t) {
  var n = H;
  (H = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = fo.transition;
  fo.transition = {};
  try {
    e(!1), t();
  } finally {
    (H = n), (fo.transition = r);
  }
}
function _d() {
  return He().memoizedState;
}
function Eh(e, t, n) {
  var r = Vt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    wd(e))
  )
    kd(t, n);
  else if (((n = nd(e, t, n, r)), n !== null)) {
    var i = Se();
    qe(n, e, r, i), Sd(n, t, r);
  }
}
function Nh(e, t, n) {
  var r = Vt(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (wd(e)) kd(t, i);
  else {
    var l = e.alternate;
    if (
      e.lanes === 0 &&
      (l === null || l.lanes === 0) &&
      ((l = t.lastRenderedReducer), l !== null)
    )
      try {
        var o = t.lastRenderedState,
          s = l(o, n);
        if (((i.hasEagerState = !0), (i.eagerState = s), et(s, o))) {
          var a = t.interleaved;
          a === null
            ? ((i.next = i), Ks(t))
            : ((i.next = a.next), (a.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = nd(e, t, i, r)),
      n !== null && ((i = Se()), qe(n, e, r, i), Sd(n, t, r));
  }
}
function wd(e) {
  var t = e.alternate;
  return e === b || (t !== null && t === b);
}
function kd(e, t) {
  Sr = sl = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function Sd(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Is(e, n);
  }
}
var al = {
    readContext: We,
    useCallback: ye,
    useContext: ye,
    useEffect: ye,
    useImperativeHandle: ye,
    useInsertionEffect: ye,
    useLayoutEffect: ye,
    useMemo: ye,
    useReducer: ye,
    useRef: ye,
    useState: ye,
    useDebugValue: ye,
    useDeferredValue: ye,
    useTransition: ye,
    useMutableSource: ye,
    useSyncExternalStore: ye,
    useId: ye,
    unstable_isNewReconciler: !1,
  },
  Th = {
    readContext: We,
    useCallback: function (e, t) {
      return (rt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: We,
    useEffect: iu,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Fi(4194308, 4, md.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Fi(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Fi(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = rt();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = rt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Eh.bind(null, b, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = rt();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: ru,
    useDebugValue: na,
    useDeferredValue: function (e) {
      return (rt().memoizedState = e);
    },
    useTransition: function () {
      var e = ru(!1),
        t = e[0];
      return (e = Ch.bind(null, e[1])), (rt().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = b,
        i = rt();
      if (G) {
        if (n === void 0) throw Error(w(407));
        n = n();
      } else {
        if (((n = t()), fe === null)) throw Error(w(349));
        pn & 30 || sd(r, t, n);
      }
      i.memoizedState = n;
      var l = { value: n, getSnapshot: t };
      return (
        (i.queue = l),
        iu(ud.bind(null, r, l, e), [e]),
        (r.flags |= 2048),
        Zr(9, ad.bind(null, r, l, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = rt(),
        t = fe.identifierPrefix;
      if (G) {
        var n = mt,
          r = ht;
        (n = (r & ~(1 << (32 - Je(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Ar++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = Sh++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Ph = {
    readContext: We,
    useCallback: yd,
    useContext: We,
    useEffect: ta,
    useImperativeHandle: vd,
    useInsertionEffect: pd,
    useLayoutEffect: hd,
    useMemo: gd,
    useReducer: po,
    useRef: fd,
    useState: function () {
      return po(Vr);
    },
    useDebugValue: na,
    useDeferredValue: function (e) {
      var t = He();
      return xd(t, se.memoizedState, e);
    },
    useTransition: function () {
      var e = po(Vr)[0],
        t = He().memoizedState;
      return [e, t];
    },
    useMutableSource: ld,
    useSyncExternalStore: od,
    useId: _d,
    unstable_isNewReconciler: !1,
  },
  jh = {
    readContext: We,
    useCallback: yd,
    useContext: We,
    useEffect: ta,
    useImperativeHandle: vd,
    useInsertionEffect: pd,
    useLayoutEffect: hd,
    useMemo: gd,
    useReducer: ho,
    useRef: fd,
    useState: function () {
      return ho(Vr);
    },
    useDebugValue: na,
    useDeferredValue: function (e) {
      var t = He();
      return se === null ? (t.memoizedState = e) : xd(t, se.memoizedState, e);
    },
    useTransition: function () {
      var e = ho(Vr)[0],
        t = He().memoizedState;
      return [e, t];
    },
    useMutableSource: ld,
    useSyncExternalStore: od,
    useId: _d,
    unstable_isNewReconciler: !1,
  };
function Ke(e, t) {
  if (e && e.defaultProps) {
    (t = ee({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function qo(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : ee({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var zl = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? xn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Se(),
      i = Vt(e),
      l = yt(r, i);
    (l.payload = t),
      n != null && (l.callback = n),
      (t = Ft(e, l, i)),
      t !== null && (qe(t, e, i, r), $i(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Se(),
      i = Vt(e),
      l = yt(r, i);
    (l.tag = 1),
      (l.payload = t),
      n != null && (l.callback = n),
      (t = Ft(e, l, i)),
      t !== null && (qe(t, e, i, r), $i(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Se(),
      r = Vt(e),
      i = yt(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = Ft(e, i, r)),
      t !== null && (qe(t, e, r, n), $i(t, e, r));
  },
};
function lu(e, t, n, r, i, l, o) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, l, o)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Lr(n, r) || !Lr(i, l)
        : !0
  );
}
function Cd(e, t, n) {
  var r = !1,
    i = Wt,
    l = t.contextType;
  return (
    typeof l == "object" && l !== null
      ? (l = We(l))
      : ((i = Oe(t) ? dn : _e.current),
        (r = t.contextTypes),
        (l = (r = r != null) ? Wn(e, i) : Wt)),
    (t = new t(n, l)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = zl),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    t
  );
}
function ou(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && zl.enqueueReplaceState(t, t.state, null);
}
function bo(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = {}), Ys(e);
  var l = t.contextType;
  typeof l == "object" && l !== null
    ? (i.context = We(l))
    : ((l = Oe(t) ? dn : _e.current), (i.context = Wn(e, l))),
    (i.state = e.memoizedState),
    (l = t.getDerivedStateFromProps),
    typeof l == "function" && (qo(e, t, l, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && zl.enqueueReplaceState(i, i.state, null),
      ll(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function Yn(e, t) {
  try {
    var n = "",
      r = t;
    do (n += rp(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (l) {
    i =
      `
Error generating stack: ` +
      l.message +
      `
` +
      l.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function mo(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function es(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Oh = typeof WeakMap == "function" ? WeakMap : Map;
function Ed(e, t, n) {
  (n = yt(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      cl || ((cl = !0), (cs = r)), es(e, t);
    }),
    n
  );
}
function Nd(e, t, n) {
  (n = yt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        es(e, t);
      });
  }
  var l = e.stateNode;
  return (
    l !== null &&
      typeof l.componentDidCatch == "function" &&
      (n.callback = function () {
        es(e, t),
          typeof r != "function" &&
            (At === null ? (At = new Set([this])) : At.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    n
  );
}
function su(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Oh();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = Wh.bind(null, e, t, n)), t.then(e, e));
}
function au(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function uu(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = yt(-1, 1)), (t.tag = 2), Ft(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Rh = St.ReactCurrentOwner,
  Pe = !1;
function ke(e, t, n, r) {
  t.child = e === null ? td(t, null, n, r) : Qn(t, e.child, n, r);
}
function cu(e, t, n, r, i) {
  n = n.render;
  var l = t.ref;
  return (
    An(t, i),
    (r = bs(e, t, n, r, l, i)),
    (n = ea()),
    e !== null && !Pe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        wt(e, t, i))
      : (G && n && Vs(t), (t.flags |= 1), ke(e, t, r, i), t.child)
  );
}
function du(e, t, n, r, i) {
  if (e === null) {
    var l = n.type;
    return typeof l == "function" &&
      !ca(l) &&
      l.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = l), Td(e, t, l, r, i))
      : ((e = Bi(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((l = e.child), !(e.lanes & i))) {
    var o = l.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Lr), n(o, r) && e.ref === t.ref)
    )
      return wt(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = Zt(l, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Td(e, t, n, r, i) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (Lr(l, r) && e.ref === t.ref)
      if (((Pe = !1), (t.pendingProps = r = l), (e.lanes & i) !== 0))
        e.flags & 131072 && (Pe = !0);
      else return (t.lanes = e.lanes), wt(e, t, i);
  }
  return ts(e, t, n, r, i);
}
function Pd(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    l = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        Q(Ln, Ie),
        (Ie |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = l !== null ? l.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          Q(Ln, Ie),
          (Ie |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = l !== null ? l.baseLanes : n),
        Q(Ln, Ie),
        (Ie |= r);
    }
  else
    l !== null ? ((r = l.baseLanes | n), (t.memoizedState = null)) : (r = n),
      Q(Ln, Ie),
      (Ie |= r);
  return ke(e, t, i, n), t.child;
}
function jd(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function ts(e, t, n, r, i) {
  var l = Oe(n) ? dn : _e.current;
  return (
    (l = Wn(t, l)),
    An(t, i),
    (n = bs(e, t, n, r, l, i)),
    (r = ea()),
    e !== null && !Pe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        wt(e, t, i))
      : (G && r && Vs(t), (t.flags |= 1), ke(e, t, n, i), t.child)
  );
}
function fu(e, t, n, r, i) {
  if (Oe(n)) {
    var l = !0;
    el(t);
  } else l = !1;
  if ((An(t, i), t.stateNode === null))
    Ai(e, t), Cd(t, n, r), bo(t, n, r, i), (r = !0);
  else if (e === null) {
    var o = t.stateNode,
      s = t.memoizedProps;
    o.props = s;
    var a = o.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = We(u))
      : ((u = Oe(n) ? dn : _e.current), (u = Wn(t, u)));
    var d = n.getDerivedStateFromProps,
      p =
        typeof d == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function";
    p ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((s !== r || a !== u) && ou(t, o, r, u)),
      (Pt = !1);
    var m = t.memoizedState;
    (o.state = m),
      ll(t, r, o, i),
      (a = t.memoizedState),
      s !== r || m !== a || je.current || Pt
        ? (typeof d == "function" && (qo(t, n, d, r), (a = t.memoizedState)),
          (s = Pt || lu(t, n, s, r, m, a, u))
            ? (p ||
                (typeof o.UNSAFE_componentWillMount != "function" &&
                  typeof o.componentWillMount != "function") ||
                (typeof o.componentWillMount == "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (o.props = r),
          (o.state = a),
          (o.context = u),
          (r = s))
        : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (o = t.stateNode),
      rd(e, t),
      (s = t.memoizedProps),
      (u = t.type === t.elementType ? s : Ke(t.type, s)),
      (o.props = u),
      (p = t.pendingProps),
      (m = o.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = We(a))
        : ((a = Oe(n) ? dn : _e.current), (a = Wn(t, a)));
    var y = n.getDerivedStateFromProps;
    (d =
      typeof y == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((s !== p || m !== a) && ou(t, o, r, a)),
      (Pt = !1),
      (m = t.memoizedState),
      (o.state = m),
      ll(t, r, o, i);
    var _ = t.memoizedState;
    s !== p || m !== _ || je.current || Pt
      ? (typeof y == "function" && (qo(t, n, y, r), (_ = t.memoizedState)),
        (u = Pt || lu(t, n, u, r, m, _, a) || !1)
          ? (d ||
              (typeof o.UNSAFE_componentWillUpdate != "function" &&
                typeof o.componentWillUpdate != "function") ||
              (typeof o.componentWillUpdate == "function" &&
                o.componentWillUpdate(r, _, a),
              typeof o.UNSAFE_componentWillUpdate == "function" &&
                o.UNSAFE_componentWillUpdate(r, _, a)),
            typeof o.componentDidUpdate == "function" && (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof o.componentDidUpdate != "function" ||
              (s === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = _)),
        (o.props = r),
        (o.state = _),
        (o.context = a),
        (r = u))
      : (typeof o.componentDidUpdate != "function" ||
          (s === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return ns(e, t, n, r, l, i);
}
function ns(e, t, n, r, i, l) {
  jd(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return i && Ja(t, n, !1), wt(e, t, l);
  (r = t.stateNode), (Rh.current = t);
  var s =
    o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && o
      ? ((t.child = Qn(t, e.child, null, l)), (t.child = Qn(t, null, s, l)))
      : ke(e, t, s, l),
    (t.memoizedState = r.state),
    i && Ja(t, n, !0),
    t.child
  );
}
function Od(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Xa(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Xa(e, t.context, !1),
    Gs(e, t.containerInfo);
}
function pu(e, t, n, r, i) {
  return Hn(), Bs(i), (t.flags |= 256), ke(e, t, n, r), t.child;
}
var rs = { dehydrated: null, treeContext: null, retryLane: 0 };
function is(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Rd(e, t, n) {
  var r = t.pendingProps,
    i = q.current,
    l = !1,
    o = (t.flags & 128) !== 0,
    s;
  if (
    ((s = o) ||
      (s = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    s
      ? ((l = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    Q(q, i & 1),
    e === null)
  )
    return (
      Xo(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((o = r.children),
          (e = r.fallback),
          l
            ? ((r = t.mode),
              (l = t.child),
              (o = { mode: "hidden", children: o }),
              !(r & 1) && l !== null
                ? ((l.childLanes = 0), (l.pendingProps = o))
                : (l = Ml(o, r, 0, null)),
              (e = an(e, r, n, null)),
              (l.return = t),
              (e.return = t),
              (l.sibling = e),
              (t.child = l),
              (t.child.memoizedState = is(n)),
              (t.memoizedState = rs),
              e)
            : ra(t, o))
    );
  if (((i = e.memoizedState), i !== null && ((s = i.dehydrated), s !== null)))
    return zh(e, t, o, r, s, i, n);
  if (l) {
    (l = r.fallback), (o = t.mode), (i = e.child), (s = i.sibling);
    var a = { mode: "hidden", children: r.children };
    return (
      !(o & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = Zt(i, a)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      s !== null ? (l = Zt(s, l)) : ((l = an(l, o, n, null)), (l.flags |= 2)),
      (l.return = t),
      (r.return = t),
      (r.sibling = l),
      (t.child = r),
      (r = l),
      (l = t.child),
      (o = e.child.memoizedState),
      (o =
        o === null
          ? is(n)
          : {
              baseLanes: o.baseLanes | n,
              cachePool: null,
              transitions: o.transitions,
            }),
      (l.memoizedState = o),
      (l.childLanes = e.childLanes & ~n),
      (t.memoizedState = rs),
      r
    );
  }
  return (
    (l = e.child),
    (e = l.sibling),
    (r = Zt(l, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function ra(e, t) {
  return (
    (t = Ml({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Pi(e, t, n, r) {
  return (
    r !== null && Bs(r),
    Qn(t, e.child, null, n),
    (e = ra(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function zh(e, t, n, r, i, l, o) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = mo(Error(w(422)))), Pi(e, t, o, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((l = r.fallback),
          (i = t.mode),
          (r = Ml({ mode: "visible", children: r.children }, i, 0, null)),
          (l = an(l, i, o, null)),
          (l.flags |= 2),
          (r.return = t),
          (l.return = t),
          (r.sibling = l),
          (t.child = r),
          t.mode & 1 && Qn(t, e.child, null, o),
          (t.child.memoizedState = is(o)),
          (t.memoizedState = rs),
          l);
  if (!(t.mode & 1)) return Pi(e, t, o, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var s = r.dgst;
    return (r = s), (l = Error(w(419))), (r = mo(l, r, void 0)), Pi(e, t, o, r);
  }
  if (((s = (o & e.childLanes) !== 0), Pe || s)) {
    if (((r = fe), r !== null)) {
      switch (o & -o) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | o) ? 0 : i),
        i !== 0 &&
          i !== l.retryLane &&
          ((l.retryLane = i), _t(e, i), qe(r, e, i, -1));
    }
    return ua(), (r = mo(Error(w(421)))), Pi(e, t, o, r);
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Hh.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = l.treeContext),
      (Le = Ut(i.nextSibling)),
      (Me = t),
      (G = !0),
      (Ge = null),
      e !== null &&
        ((Ae[Ve++] = ht),
        (Ae[Ve++] = mt),
        (Ae[Ve++] = fn),
        (ht = e.id),
        (mt = e.overflow),
        (fn = t)),
      (t = ra(t, r.children)),
      (t.flags |= 4096),
      t);
}
function hu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Jo(e.return, t, n);
}
function vo(e, t, n, r, i) {
  var l = e.memoizedState;
  l === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((l.isBackwards = t),
      (l.rendering = null),
      (l.renderingStartTime = 0),
      (l.last = r),
      (l.tail = n),
      (l.tailMode = i));
}
function zd(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    l = r.tail;
  if ((ke(e, t, r.children, n), (r = q.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && hu(e, n, t);
        else if (e.tag === 19) hu(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((Q(q, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate),
            e !== null && ol(e) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          vo(t, !1, i, n, l);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && ol(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        vo(t, !0, n, null, l);
        break;
      case "together":
        vo(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Ai(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function wt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (hn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(w(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Zt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = Zt(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Ih(e, t, n) {
  switch (t.tag) {
    case 3:
      Od(t), Hn();
      break;
    case 5:
      id(t);
      break;
    case 1:
      Oe(t.type) && el(t);
      break;
    case 4:
      Gs(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      Q(rl, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (Q(q, q.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? Rd(e, t, n)
            : (Q(q, q.current & 1),
              (e = wt(e, t, n)),
              e !== null ? e.sibling : null);
      Q(q, q.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return zd(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        Q(q, q.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Pd(e, t, n);
  }
  return wt(e, t, n);
}
var Id, ls, Ld, Md;
Id = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
ls = function () {};
Ld = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), on(ot.current);
    var l = null;
    switch (n) {
      case "input":
        (i = To(e, i)), (r = To(e, r)), (l = []);
        break;
      case "select":
        (i = ee({}, i, { value: void 0 })),
          (r = ee({}, r, { value: void 0 })),
          (l = []);
        break;
      case "textarea":
        (i = Oo(e, i)), (r = Oo(e, r)), (l = []);
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = qi);
    }
    zo(n, r);
    var o;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === "style") {
          var s = i[u];
          for (o in s) s.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (Tr.hasOwnProperty(u)
              ? l || (l = [])
              : (l = l || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (
        ((s = i != null ? i[u] : void 0),
        r.hasOwnProperty(u) && a !== s && (a != null || s != null))
      )
        if (u === "style")
          if (s) {
            for (o in s)
              !s.hasOwnProperty(o) ||
                (a && a.hasOwnProperty(o)) ||
                (n || (n = {}), (n[o] = ""));
            for (o in a)
              a.hasOwnProperty(o) &&
                s[o] !== a[o] &&
                (n || (n = {}), (n[o] = a[o]));
          } else n || (l || (l = []), l.push(u, n)), (n = a);
        else
          u === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (s = s ? s.__html : void 0),
              a != null && s !== a && (l = l || []).push(u, a))
            : u === "children"
              ? (typeof a != "string" && typeof a != "number") ||
                (l = l || []).push(u, "" + a)
              : u !== "suppressContentEditableWarning" &&
                u !== "suppressHydrationWarning" &&
                (Tr.hasOwnProperty(u)
                  ? (a != null && u === "onScroll" && K("scroll", e),
                    l || s === a || (l = []))
                  : (l = l || []).push(u, a));
    }
    n && (l = l || []).push("style", n);
    var u = l;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Md = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function cr(e, t) {
  if (!G)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ge(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Lh(e, t, n) {
  var r = t.pendingProps;
  switch ((Zs(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ge(t), null;
    case 1:
      return Oe(t.type) && bi(), ge(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Kn(),
        Y(je),
        Y(_e),
        Js(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Ni(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Ge !== null && (ps(Ge), (Ge = null)))),
        ls(e, t),
        ge(t),
        null
      );
    case 5:
      Xs(t);
      var i = on(Fr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Ld(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(w(166));
          return ge(t), null;
        }
        if (((e = on(ot.current)), Ni(t))) {
          (r = t.stateNode), (n = t.type);
          var l = t.memoizedProps;
          switch (((r[it] = t), (r[$r] = l), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              K("cancel", r), K("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              K("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < mr.length; i++) K(mr[i], r);
              break;
            case "source":
              K("error", r);
              break;
            case "img":
            case "image":
            case "link":
              K("error", r), K("load", r);
              break;
            case "details":
              K("toggle", r);
              break;
            case "input":
              Sa(r, l), K("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!l.multiple }),
                K("invalid", r);
              break;
            case "textarea":
              Ea(r, l), K("invalid", r);
          }
          zo(n, l), (i = null);
          for (var o in l)
            if (l.hasOwnProperty(o)) {
              var s = l[o];
              o === "children"
                ? typeof s == "string"
                  ? r.textContent !== s &&
                    (l.suppressHydrationWarning !== !0 &&
                      Ei(r.textContent, s, e),
                    (i = ["children", s]))
                  : typeof s == "number" &&
                    r.textContent !== "" + s &&
                    (l.suppressHydrationWarning !== !0 &&
                      Ei(r.textContent, s, e),
                    (i = ["children", "" + s]))
                : Tr.hasOwnProperty(o) &&
                  s != null &&
                  o === "onScroll" &&
                  K("scroll", r);
            }
          switch (n) {
            case "input":
              yi(r), Ca(r, l, !0);
              break;
            case "textarea":
              yi(r), Na(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof l.onClick == "function" && (r.onclick = qi);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (o = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = uc(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = o.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = o.createElement(n, { is: r.is }))
                  : ((e = o.createElement(n)),
                    n === "select" &&
                      ((o = e),
                      r.multiple
                        ? (o.multiple = !0)
                        : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, n)),
            (e[it] = t),
            (e[$r] = r),
            Id(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((o = Io(n, r)), n)) {
              case "dialog":
                K("cancel", e), K("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                K("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < mr.length; i++) K(mr[i], e);
                i = r;
                break;
              case "source":
                K("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                K("error", e), K("load", e), (i = r);
                break;
              case "details":
                K("toggle", e), (i = r);
                break;
              case "input":
                Sa(e, r), (i = To(e, r)), K("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = ee({}, r, { value: void 0 })),
                  K("invalid", e);
                break;
              case "textarea":
                Ea(e, r), (i = Oo(e, r)), K("invalid", e);
                break;
              default:
                i = r;
            }
            zo(n, i), (s = i);
            for (l in s)
              if (s.hasOwnProperty(l)) {
                var a = s[l];
                l === "style"
                  ? fc(e, a)
                  : l === "dangerouslySetInnerHTML"
                    ? ((a = a ? a.__html : void 0), a != null && cc(e, a))
                    : l === "children"
                      ? typeof a == "string"
                        ? (n !== "textarea" || a !== "") && Pr(e, a)
                        : typeof a == "number" && Pr(e, "" + a)
                      : l !== "suppressContentEditableWarning" &&
                        l !== "suppressHydrationWarning" &&
                        l !== "autoFocus" &&
                        (Tr.hasOwnProperty(l)
                          ? a != null && l === "onScroll" && K("scroll", e)
                          : a != null && Ts(e, l, a, o));
              }
            switch (n) {
              case "input":
                yi(e), Ca(e, r, !1);
                break;
              case "textarea":
                yi(e), Na(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Bt(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (l = r.value),
                  l != null
                    ? Dn(e, !!r.multiple, l, !1)
                    : r.defaultValue != null &&
                      Dn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = qi);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return ge(t), null;
    case 6:
      if (e && t.stateNode != null) Md(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(w(166));
        if (((n = on(Fr.current)), on(ot.current), Ni(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[it] = t),
            (l = r.nodeValue !== n) && ((e = Me), e !== null))
          )
            switch (e.tag) {
              case 3:
                Ei(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Ei(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          l && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[it] = t),
            (t.stateNode = r);
      }
      return ge(t), null;
    case 13:
      if (
        (Y(q),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (G && Le !== null && t.mode & 1 && !(t.flags & 128))
          bc(), Hn(), (t.flags |= 98560), (l = !1);
        else if (((l = Ni(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!l) throw Error(w(318));
            if (
              ((l = t.memoizedState),
              (l = l !== null ? l.dehydrated : null),
              !l)
            )
              throw Error(w(317));
            l[it] = t;
          } else
            Hn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          ge(t), (l = !1);
        } else Ge !== null && (ps(Ge), (Ge = null)), (l = !0);
        if (!l) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || q.current & 1 ? ae === 0 && (ae = 3) : ua())),
          t.updateQueue !== null && (t.flags |= 4),
          ge(t),
          null);
    case 4:
      return (
        Kn(), ls(e, t), e === null && Mr(t.stateNode.containerInfo), ge(t), null
      );
    case 10:
      return Qs(t.type._context), ge(t), null;
    case 17:
      return Oe(t.type) && bi(), ge(t), null;
    case 19:
      if ((Y(q), (l = t.memoizedState), l === null)) return ge(t), null;
      if (((r = (t.flags & 128) !== 0), (o = l.rendering), o === null))
        if (r) cr(l, !1);
        else {
          if (ae !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((o = ol(e)), o !== null)) {
                for (
                  t.flags |= 128,
                    cr(l, !1),
                    r = o.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (l = n),
                    (e = r),
                    (l.flags &= 14680066),
                    (o = l.alternate),
                    o === null
                      ? ((l.childLanes = 0),
                        (l.lanes = e),
                        (l.child = null),
                        (l.subtreeFlags = 0),
                        (l.memoizedProps = null),
                        (l.memoizedState = null),
                        (l.updateQueue = null),
                        (l.dependencies = null),
                        (l.stateNode = null))
                      : ((l.childLanes = o.childLanes),
                        (l.lanes = o.lanes),
                        (l.child = o.child),
                        (l.subtreeFlags = 0),
                        (l.deletions = null),
                        (l.memoizedProps = o.memoizedProps),
                        (l.memoizedState = o.memoizedState),
                        (l.updateQueue = o.updateQueue),
                        (l.type = o.type),
                        (e = o.dependencies),
                        (l.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return Q(q, (q.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          l.tail !== null &&
            le() > Gn &&
            ((t.flags |= 128), (r = !0), cr(l, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = ol(o)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              cr(l, !0),
              l.tail === null && l.tailMode === "hidden" && !o.alternate && !G)
            )
              return ge(t), null;
          } else
            2 * le() - l.renderingStartTime > Gn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), cr(l, !1), (t.lanes = 4194304));
        l.isBackwards
          ? ((o.sibling = t.child), (t.child = o))
          : ((n = l.last),
            n !== null ? (n.sibling = o) : (t.child = o),
            (l.last = o));
      }
      return l.tail !== null
        ? ((t = l.tail),
          (l.rendering = t),
          (l.tail = t.sibling),
          (l.renderingStartTime = le()),
          (t.sibling = null),
          (n = q.current),
          Q(q, r ? (n & 1) | 2 : n & 1),
          t)
        : (ge(t), null);
    case 22:
    case 23:
      return (
        aa(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ie & 1073741824 && (ge(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ge(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(w(156, t.tag));
}
function Mh(e, t) {
  switch ((Zs(t), t.tag)) {
    case 1:
      return (
        Oe(t.type) && bi(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Kn(),
        Y(je),
        Y(_e),
        Js(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Xs(t), null;
    case 13:
      if ((Y(q), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(w(340));
        Hn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return Y(q), null;
    case 4:
      return Kn(), null;
    case 10:
      return Qs(t.type._context), null;
    case 22:
    case 23:
      return aa(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var ji = !1,
  xe = !1,
  Dh = typeof WeakSet == "function" ? WeakSet : Set,
  P = null;
function In(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ne(e, t, r);
      }
    else n.current = null;
}
function os(e, t, n) {
  try {
    n();
  } catch (r) {
    ne(e, t, r);
  }
}
var mu = !1;
function $h(e, t) {
  if (((Bo = Gi), (e = Ac()), As(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            l = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, l.nodeType;
          } catch {
            n = null;
            break e;
          }
          var o = 0,
            s = -1,
            a = -1,
            u = 0,
            d = 0,
            p = e,
            m = null;
          t: for (;;) {
            for (
              var y;
              p !== n || (i !== 0 && p.nodeType !== 3) || (s = o + i),
                p !== l || (r !== 0 && p.nodeType !== 3) || (a = o + r),
                p.nodeType === 3 && (o += p.nodeValue.length),
                (y = p.firstChild) !== null;

            )
              (m = p), (p = y);
            for (;;) {
              if (p === e) break t;
              if (
                (m === n && ++u === i && (s = o),
                m === l && ++d === r && (a = o),
                (y = p.nextSibling) !== null)
              )
                break;
              (p = m), (m = p.parentNode);
            }
            p = y;
          }
          n = s === -1 || a === -1 ? null : { start: s, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Wo = { focusedElem: e, selectionRange: n }, Gi = !1, P = t; P !== null; )
    if (((t = P), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (P = e);
    else
      for (; P !== null; ) {
        t = P;
        try {
          var _ = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (_ !== null) {
                  var x = _.memoizedProps,
                    S = _.memoizedState,
                    f = t.stateNode,
                    c = f.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? x : Ke(t.type, x),
                      S,
                    );
                  f.__reactInternalSnapshotBeforeUpdate = c;
                }
                break;
              case 3:
                var h = t.stateNode.containerInfo;
                h.nodeType === 1
                  ? (h.textContent = "")
                  : h.nodeType === 9 &&
                    h.documentElement &&
                    h.removeChild(h.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(w(163));
            }
        } catch (g) {
          ne(t, t.return, g);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (P = e);
          break;
        }
        P = t.return;
      }
  return (_ = mu), (mu = !1), _;
}
function Cr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var l = i.destroy;
        (i.destroy = void 0), l !== void 0 && os(t, n, l);
      }
      i = i.next;
    } while (i !== r);
  }
}
function Il(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function ss(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Dd(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Dd(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[it], delete t[$r], delete t[Ko], delete t[xh], delete t[_h])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function $d(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function vu(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || $d(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function as(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = qi));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (as(e, t, n), e = e.sibling; e !== null; ) as(e, t, n), (e = e.sibling);
}
function us(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (us(e, t, n), e = e.sibling; e !== null; ) us(e, t, n), (e = e.sibling);
}
var he = null,
  Ye = !1;
function Et(e, t, n) {
  for (n = n.child; n !== null; ) Ud(e, t, n), (n = n.sibling);
}
function Ud(e, t, n) {
  if (lt && typeof lt.onCommitFiberUnmount == "function")
    try {
      lt.onCommitFiberUnmount(El, n);
    } catch {}
  switch (n.tag) {
    case 5:
      xe || In(n, t);
    case 6:
      var r = he,
        i = Ye;
      (he = null),
        Et(e, t, n),
        (he = r),
        (Ye = i),
        he !== null &&
          (Ye
            ? ((e = he),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : he.removeChild(n.stateNode));
      break;
    case 18:
      he !== null &&
        (Ye
          ? ((e = he),
            (n = n.stateNode),
            e.nodeType === 8
              ? ao(e.parentNode, n)
              : e.nodeType === 1 && ao(e, n),
            zr(e))
          : ao(he, n.stateNode));
      break;
    case 4:
      (r = he),
        (i = Ye),
        (he = n.stateNode.containerInfo),
        (Ye = !0),
        Et(e, t, n),
        (he = r),
        (Ye = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !xe &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var l = i,
            o = l.destroy;
          (l = l.tag),
            o !== void 0 && (l & 2 || l & 4) && os(n, t, o),
            (i = i.next);
        } while (i !== r);
      }
      Et(e, t, n);
      break;
    case 1:
      if (
        !xe &&
        (In(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (s) {
          ne(n, t, s);
        }
      Et(e, t, n);
      break;
    case 21:
      Et(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((xe = (r = xe) || n.memoizedState !== null), Et(e, t, n), (xe = r))
        : Et(e, t, n);
      break;
    default:
      Et(e, t, n);
  }
}
function yu(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Dh()),
      t.forEach(function (r) {
        var i = Qh.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function Qe(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var l = e,
          o = t,
          s = o;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 5:
              (he = s.stateNode), (Ye = !1);
              break e;
            case 3:
              (he = s.stateNode.containerInfo), (Ye = !0);
              break e;
            case 4:
              (he = s.stateNode.containerInfo), (Ye = !0);
              break e;
          }
          s = s.return;
        }
        if (he === null) throw Error(w(160));
        Ud(l, o, i), (he = null), (Ye = !1);
        var a = i.alternate;
        a !== null && (a.return = null), (i.return = null);
      } catch (u) {
        ne(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Fd(t, e), (t = t.sibling);
}
function Fd(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Qe(t, e), nt(e), r & 4)) {
        try {
          Cr(3, e, e.return), Il(3, e);
        } catch (x) {
          ne(e, e.return, x);
        }
        try {
          Cr(5, e, e.return);
        } catch (x) {
          ne(e, e.return, x);
        }
      }
      break;
    case 1:
      Qe(t, e), nt(e), r & 512 && n !== null && In(n, n.return);
      break;
    case 5:
      if (
        (Qe(t, e),
        nt(e),
        r & 512 && n !== null && In(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          Pr(i, "");
        } catch (x) {
          ne(e, e.return, x);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var l = e.memoizedProps,
          o = n !== null ? n.memoizedProps : l,
          s = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            s === "input" && l.type === "radio" && l.name != null && sc(i, l),
              Io(s, o);
            var u = Io(s, l);
            for (o = 0; o < a.length; o += 2) {
              var d = a[o],
                p = a[o + 1];
              d === "style"
                ? fc(i, p)
                : d === "dangerouslySetInnerHTML"
                  ? cc(i, p)
                  : d === "children"
                    ? Pr(i, p)
                    : Ts(i, d, p, u);
            }
            switch (s) {
              case "input":
                Po(i, l);
                break;
              case "textarea":
                ac(i, l);
                break;
              case "select":
                var m = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!l.multiple;
                var y = l.value;
                y != null
                  ? Dn(i, !!l.multiple, y, !1)
                  : m !== !!l.multiple &&
                    (l.defaultValue != null
                      ? Dn(i, !!l.multiple, l.defaultValue, !0)
                      : Dn(i, !!l.multiple, l.multiple ? [] : "", !1));
            }
            i[$r] = l;
          } catch (x) {
            ne(e, e.return, x);
          }
      }
      break;
    case 6:
      if ((Qe(t, e), nt(e), r & 4)) {
        if (e.stateNode === null) throw Error(w(162));
        (i = e.stateNode), (l = e.memoizedProps);
        try {
          i.nodeValue = l;
        } catch (x) {
          ne(e, e.return, x);
        }
      }
      break;
    case 3:
      if (
        (Qe(t, e), nt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          zr(t.containerInfo);
        } catch (x) {
          ne(e, e.return, x);
        }
      break;
    case 4:
      Qe(t, e), nt(e);
      break;
    case 13:
      Qe(t, e),
        nt(e),
        (i = e.child),
        i.flags & 8192 &&
          ((l = i.memoizedState !== null),
          (i.stateNode.isHidden = l),
          !l ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (oa = le())),
        r & 4 && yu(e);
      break;
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((xe = (u = xe) || d), Qe(t, e), (xe = u)) : Qe(t, e),
        nt(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !d && e.mode & 1)
        )
          for (P = e, d = e.child; d !== null; ) {
            for (p = P = d; P !== null; ) {
              switch (((m = P), (y = m.child), m.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Cr(4, m, m.return);
                  break;
                case 1:
                  In(m, m.return);
                  var _ = m.stateNode;
                  if (typeof _.componentWillUnmount == "function") {
                    (r = m), (n = m.return);
                    try {
                      (t = r),
                        (_.props = t.memoizedProps),
                        (_.state = t.memoizedState),
                        _.componentWillUnmount();
                    } catch (x) {
                      ne(r, n, x);
                    }
                  }
                  break;
                case 5:
                  In(m, m.return);
                  break;
                case 22:
                  if (m.memoizedState !== null) {
                    xu(p);
                    continue;
                  }
              }
              y !== null ? ((y.return = m), (P = y)) : xu(p);
            }
            d = d.sibling;
          }
        e: for (d = null, p = e; ; ) {
          if (p.tag === 5) {
            if (d === null) {
              d = p;
              try {
                (i = p.stateNode),
                  u
                    ? ((l = i.style),
                      typeof l.setProperty == "function"
                        ? l.setProperty("display", "none", "important")
                        : (l.display = "none"))
                    : ((s = p.stateNode),
                      (a = p.memoizedProps.style),
                      (o =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (s.style.display = dc("display", o)));
              } catch (x) {
                ne(e, e.return, x);
              }
            }
          } else if (p.tag === 6) {
            if (d === null)
              try {
                p.stateNode.nodeValue = u ? "" : p.memoizedProps;
              } catch (x) {
                ne(e, e.return, x);
              }
          } else if (
            ((p.tag !== 22 && p.tag !== 23) ||
              p.memoizedState === null ||
              p === e) &&
            p.child !== null
          ) {
            (p.child.return = p), (p = p.child);
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            d === p && (d = null), (p = p.return);
          }
          d === p && (d = null), (p.sibling.return = p.return), (p = p.sibling);
        }
      }
      break;
    case 19:
      Qe(t, e), nt(e), r & 4 && yu(e);
      break;
    case 21:
      break;
    default:
      Qe(t, e), nt(e);
  }
}
function nt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if ($d(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(w(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Pr(i, ""), (r.flags &= -33));
          var l = vu(e);
          us(e, l, i);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            s = vu(e);
          as(e, s, o);
          break;
        default:
          throw Error(w(161));
      }
    } catch (a) {
      ne(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Uh(e, t, n) {
  (P = e), Ad(e);
}
function Ad(e, t, n) {
  for (var r = (e.mode & 1) !== 0; P !== null; ) {
    var i = P,
      l = i.child;
    if (i.tag === 22 && r) {
      var o = i.memoizedState !== null || ji;
      if (!o) {
        var s = i.alternate,
          a = (s !== null && s.memoizedState !== null) || xe;
        s = ji;
        var u = xe;
        if (((ji = o), (xe = a) && !u))
          for (P = i; P !== null; )
            (o = P),
              (a = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? _u(i)
                : a !== null
                  ? ((a.return = o), (P = a))
                  : _u(i);
        for (; l !== null; ) (P = l), Ad(l), (l = l.sibling);
        (P = i), (ji = s), (xe = u);
      }
      gu(e);
    } else
      i.subtreeFlags & 8772 && l !== null ? ((l.return = i), (P = l)) : gu(e);
  }
}
function gu(e) {
  for (; P !== null; ) {
    var t = P;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              xe || Il(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !xe)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Ke(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var l = t.updateQueue;
              l !== null && nu(t, l, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (o !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                nu(t, o, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var d = u.memoizedState;
                  if (d !== null) {
                    var p = d.dehydrated;
                    p !== null && zr(p);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(w(163));
          }
        xe || (t.flags & 512 && ss(t));
      } catch (m) {
        ne(t, t.return, m);
      }
    }
    if (t === e) {
      P = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (P = n);
      break;
    }
    P = t.return;
  }
}
function xu(e) {
  for (; P !== null; ) {
    var t = P;
    if (t === e) {
      P = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (P = n);
      break;
    }
    P = t.return;
  }
}
function _u(e) {
  for (; P !== null; ) {
    var t = P;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Il(4, t);
          } catch (a) {
            ne(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              ne(t, i, a);
            }
          }
          var l = t.return;
          try {
            ss(t);
          } catch (a) {
            ne(t, l, a);
          }
          break;
        case 5:
          var o = t.return;
          try {
            ss(t);
          } catch (a) {
            ne(t, o, a);
          }
      }
    } catch (a) {
      ne(t, t.return, a);
    }
    if (t === e) {
      P = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      (s.return = t.return), (P = s);
      break;
    }
    P = t.return;
  }
}
var Fh = Math.ceil,
  ul = St.ReactCurrentDispatcher,
  ia = St.ReactCurrentOwner,
  Be = St.ReactCurrentBatchConfig,
  W = 0,
  fe = null,
  oe = null,
  me = 0,
  Ie = 0,
  Ln = Xt(0),
  ae = 0,
  Br = null,
  hn = 0,
  Ll = 0,
  la = 0,
  Er = null,
  Te = null,
  oa = 0,
  Gn = 1 / 0,
  dt = null,
  cl = !1,
  cs = null,
  At = null,
  Oi = !1,
  It = null,
  dl = 0,
  Nr = 0,
  ds = null,
  Vi = -1,
  Zi = 0;
function Se() {
  return W & 6 ? le() : Vi !== -1 ? Vi : (Vi = le());
}
function Vt(e) {
  return e.mode & 1
    ? W & 2 && me !== 0
      ? me & -me
      : kh.transition !== null
        ? (Zi === 0 && (Zi = Cc()), Zi)
        : ((e = H),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Rc(e.type))),
          e)
    : 1;
}
function qe(e, t, n, r) {
  if (50 < Nr) throw ((Nr = 0), (ds = null), Error(w(185)));
  si(e, n, r),
    (!(W & 2) || e !== fe) &&
      (e === fe && (!(W & 2) && (Ll |= n), ae === 4 && Ot(e, me)),
      Re(e, r),
      n === 1 && W === 0 && !(t.mode & 1) && ((Gn = le() + 500), Ol && Jt()));
}
function Re(e, t) {
  var n = e.callbackNode;
  kp(e, t);
  var r = Yi(e, e === fe ? me : 0);
  if (r === 0)
    n !== null && ja(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && ja(n), t === 1))
      e.tag === 0 ? wh(wu.bind(null, e)) : Xc(wu.bind(null, e)),
        yh(function () {
          !(W & 6) && Jt();
        }),
        (n = null);
    else {
      switch (Ec(r)) {
        case 1:
          n = zs;
          break;
        case 4:
          n = kc;
          break;
        case 16:
          n = Ki;
          break;
        case 536870912:
          n = Sc;
          break;
        default:
          n = Ki;
      }
      n = Yd(n, Vd.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Vd(e, t) {
  if (((Vi = -1), (Zi = 0), W & 6)) throw Error(w(327));
  var n = e.callbackNode;
  if (Vn() && e.callbackNode !== n) return null;
  var r = Yi(e, e === fe ? me : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = fl(e, r);
  else {
    t = r;
    var i = W;
    W |= 2;
    var l = Bd();
    (fe !== e || me !== t) && ((dt = null), (Gn = le() + 500), sn(e, t));
    do
      try {
        Zh();
        break;
      } catch (s) {
        Zd(e, s);
      }
    while (!0);
    Hs(),
      (ul.current = l),
      (W = i),
      oe !== null ? (t = 0) : ((fe = null), (me = 0), (t = ae));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = Uo(e)), i !== 0 && ((r = i), (t = fs(e, i)))), t === 1)
    )
      throw ((n = Br), sn(e, 0), Ot(e, r), Re(e, le()), n);
    if (t === 6) Ot(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !Ah(i) &&
          ((t = fl(e, r)),
          t === 2 && ((l = Uo(e)), l !== 0 && ((r = l), (t = fs(e, l)))),
          t === 1))
      )
        throw ((n = Br), sn(e, 0), Ot(e, r), Re(e, le()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(w(345));
        case 2:
          nn(e, Te, dt);
          break;
        case 3:
          if (
            (Ot(e, r), (r & 130023424) === r && ((t = oa + 500 - le()), 10 < t))
          ) {
            if (Yi(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              Se(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = Qo(nn.bind(null, e, Te, dt), t);
            break;
          }
          nn(e, Te, dt);
          break;
        case 4:
          if ((Ot(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var o = 31 - Je(r);
            (l = 1 << o), (o = t[o]), o > i && (i = o), (r &= ~l);
          }
          if (
            ((r = i),
            (r = le() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Fh(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Qo(nn.bind(null, e, Te, dt), r);
            break;
          }
          nn(e, Te, dt);
          break;
        case 5:
          nn(e, Te, dt);
          break;
        default:
          throw Error(w(329));
      }
    }
  }
  return Re(e, le()), e.callbackNode === n ? Vd.bind(null, e) : null;
}
function fs(e, t) {
  var n = Er;
  return (
    e.current.memoizedState.isDehydrated && (sn(e, t).flags |= 256),
    (e = fl(e, t)),
    e !== 2 && ((t = Te), (Te = n), t !== null && ps(t)),
    e
  );
}
function ps(e) {
  Te === null ? (Te = e) : Te.push.apply(Te, e);
}
function Ah(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            l = i.getSnapshot;
          i = i.value;
          try {
            if (!et(l(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Ot(e, t) {
  for (
    t &= ~la,
      t &= ~Ll,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Je(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function wu(e) {
  if (W & 6) throw Error(w(327));
  Vn();
  var t = Yi(e, 0);
  if (!(t & 1)) return Re(e, le()), null;
  var n = fl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Uo(e);
    r !== 0 && ((t = r), (n = fs(e, r)));
  }
  if (n === 1) throw ((n = Br), sn(e, 0), Ot(e, t), Re(e, le()), n);
  if (n === 6) throw Error(w(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    nn(e, Te, dt),
    Re(e, le()),
    null
  );
}
function sa(e, t) {
  var n = W;
  W |= 1;
  try {
    return e(t);
  } finally {
    (W = n), W === 0 && ((Gn = le() + 500), Ol && Jt());
  }
}
function mn(e) {
  It !== null && It.tag === 0 && !(W & 6) && Vn();
  var t = W;
  W |= 1;
  var n = Be.transition,
    r = H;
  try {
    if (((Be.transition = null), (H = 1), e)) return e();
  } finally {
    (H = r), (Be.transition = n), (W = t), !(W & 6) && Jt();
  }
}
function aa() {
  (Ie = Ln.current), Y(Ln);
}
function sn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), vh(n)), oe !== null))
    for (n = oe.return; n !== null; ) {
      var r = n;
      switch ((Zs(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && bi();
          break;
        case 3:
          Kn(), Y(je), Y(_e), Js();
          break;
        case 5:
          Xs(r);
          break;
        case 4:
          Kn();
          break;
        case 13:
          Y(q);
          break;
        case 19:
          Y(q);
          break;
        case 10:
          Qs(r.type._context);
          break;
        case 22:
        case 23:
          aa();
      }
      n = n.return;
    }
  if (
    ((fe = e),
    (oe = e = Zt(e.current, null)),
    (me = Ie = t),
    (ae = 0),
    (Br = null),
    (la = Ll = hn = 0),
    (Te = Er = null),
    ln !== null)
  ) {
    for (t = 0; t < ln.length; t++)
      if (((n = ln[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          l = n.pending;
        if (l !== null) {
          var o = l.next;
          (l.next = i), (r.next = o);
        }
        n.pending = r;
      }
    ln = null;
  }
  return e;
}
function Zd(e, t) {
  do {
    var n = oe;
    try {
      if ((Hs(), (Ui.current = al), sl)) {
        for (var r = b.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        sl = !1;
      }
      if (
        ((pn = 0),
        (de = se = b = null),
        (Sr = !1),
        (Ar = 0),
        (ia.current = null),
        n === null || n.return === null)
      ) {
        (ae = 1), (Br = t), (oe = null);
        break;
      }
      e: {
        var l = e,
          o = n.return,
          s = n,
          a = t;
        if (
          ((t = me),
          (s.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var u = a,
            d = s,
            p = d.tag;
          if (!(d.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var m = d.alternate;
            m
              ? ((d.updateQueue = m.updateQueue),
                (d.memoizedState = m.memoizedState),
                (d.lanes = m.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var y = au(o);
          if (y !== null) {
            (y.flags &= -257),
              uu(y, o, s, l, t),
              y.mode & 1 && su(l, u, t),
              (t = y),
              (a = u);
            var _ = t.updateQueue;
            if (_ === null) {
              var x = new Set();
              x.add(a), (t.updateQueue = x);
            } else _.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              su(l, u, t), ua();
              break e;
            }
            a = Error(w(426));
          }
        } else if (G && s.mode & 1) {
          var S = au(o);
          if (S !== null) {
            !(S.flags & 65536) && (S.flags |= 256),
              uu(S, o, s, l, t),
              Bs(Yn(a, s));
            break e;
          }
        }
        (l = a = Yn(a, s)),
          ae !== 4 && (ae = 2),
          Er === null ? (Er = [l]) : Er.push(l),
          (l = o);
        do {
          switch (l.tag) {
            case 3:
              (l.flags |= 65536), (t &= -t), (l.lanes |= t);
              var f = Ed(l, a, t);
              tu(l, f);
              break e;
            case 1:
              s = a;
              var c = l.type,
                h = l.stateNode;
              if (
                !(l.flags & 128) &&
                (typeof c.getDerivedStateFromError == "function" ||
                  (h !== null &&
                    typeof h.componentDidCatch == "function" &&
                    (At === null || !At.has(h))))
              ) {
                (l.flags |= 65536), (t &= -t), (l.lanes |= t);
                var g = Nd(l, s, t);
                tu(l, g);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      Hd(n);
    } catch (N) {
      (t = N), oe === n && n !== null && (oe = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Bd() {
  var e = ul.current;
  return (ul.current = al), e === null ? al : e;
}
function ua() {
  (ae === 0 || ae === 3 || ae === 2) && (ae = 4),
    fe === null || (!(hn & 268435455) && !(Ll & 268435455)) || Ot(fe, me);
}
function fl(e, t) {
  var n = W;
  W |= 2;
  var r = Bd();
  (fe !== e || me !== t) && ((dt = null), sn(e, t));
  do
    try {
      Vh();
      break;
    } catch (i) {
      Zd(e, i);
    }
  while (!0);
  if ((Hs(), (W = n), (ul.current = r), oe !== null)) throw Error(w(261));
  return (fe = null), (me = 0), ae;
}
function Vh() {
  for (; oe !== null; ) Wd(oe);
}
function Zh() {
  for (; oe !== null && !pp(); ) Wd(oe);
}
function Wd(e) {
  var t = Kd(e.alternate, e, Ie);
  (e.memoizedProps = e.pendingProps),
    t === null ? Hd(e) : (oe = t),
    (ia.current = null);
}
function Hd(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Mh(n, t)), n !== null)) {
        (n.flags &= 32767), (oe = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (ae = 6), (oe = null);
        return;
      }
    } else if (((n = Lh(n, t, Ie)), n !== null)) {
      oe = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      oe = t;
      return;
    }
    oe = t = e;
  } while (t !== null);
  ae === 0 && (ae = 5);
}
function nn(e, t, n) {
  var r = H,
    i = Be.transition;
  try {
    (Be.transition = null), (H = 1), Bh(e, t, n, r);
  } finally {
    (Be.transition = i), (H = r);
  }
  return null;
}
function Bh(e, t, n, r) {
  do Vn();
  while (It !== null);
  if (W & 6) throw Error(w(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(w(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var l = n.lanes | n.childLanes;
  if (
    (Sp(e, l),
    e === fe && ((oe = fe = null), (me = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Oi ||
      ((Oi = !0),
      Yd(Ki, function () {
        return Vn(), null;
      })),
    (l = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || l)
  ) {
    (l = Be.transition), (Be.transition = null);
    var o = H;
    H = 1;
    var s = W;
    (W |= 4),
      (ia.current = null),
      $h(e, n),
      Fd(n, e),
      uh(Wo),
      (Gi = !!Bo),
      (Wo = Bo = null),
      (e.current = n),
      Uh(n),
      hp(),
      (W = s),
      (H = o),
      (Be.transition = l);
  } else e.current = n;
  if (
    (Oi && ((Oi = !1), (It = e), (dl = i)),
    (l = e.pendingLanes),
    l === 0 && (At = null),
    yp(n.stateNode),
    Re(e, le()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (cl) throw ((cl = !1), (e = cs), (cs = null), e);
  return (
    dl & 1 && e.tag !== 0 && Vn(),
    (l = e.pendingLanes),
    l & 1 ? (e === ds ? Nr++ : ((Nr = 0), (ds = e))) : (Nr = 0),
    Jt(),
    null
  );
}
function Vn() {
  if (It !== null) {
    var e = Ec(dl),
      t = Be.transition,
      n = H;
    try {
      if (((Be.transition = null), (H = 16 > e ? 16 : e), It === null))
        var r = !1;
      else {
        if (((e = It), (It = null), (dl = 0), W & 6)) throw Error(w(331));
        var i = W;
        for (W |= 4, P = e.current; P !== null; ) {
          var l = P,
            o = l.child;
          if (P.flags & 16) {
            var s = l.deletions;
            if (s !== null) {
              for (var a = 0; a < s.length; a++) {
                var u = s[a];
                for (P = u; P !== null; ) {
                  var d = P;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Cr(8, d, l);
                  }
                  var p = d.child;
                  if (p !== null) (p.return = d), (P = p);
                  else
                    for (; P !== null; ) {
                      d = P;
                      var m = d.sibling,
                        y = d.return;
                      if ((Dd(d), d === u)) {
                        P = null;
                        break;
                      }
                      if (m !== null) {
                        (m.return = y), (P = m);
                        break;
                      }
                      P = y;
                    }
                }
              }
              var _ = l.alternate;
              if (_ !== null) {
                var x = _.child;
                if (x !== null) {
                  _.child = null;
                  do {
                    var S = x.sibling;
                    (x.sibling = null), (x = S);
                  } while (x !== null);
                }
              }
              P = l;
            }
          }
          if (l.subtreeFlags & 2064 && o !== null) (o.return = l), (P = o);
          else
            e: for (; P !== null; ) {
              if (((l = P), l.flags & 2048))
                switch (l.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Cr(9, l, l.return);
                }
              var f = l.sibling;
              if (f !== null) {
                (f.return = l.return), (P = f);
                break e;
              }
              P = l.return;
            }
        }
        var c = e.current;
        for (P = c; P !== null; ) {
          o = P;
          var h = o.child;
          if (o.subtreeFlags & 2064 && h !== null) (h.return = o), (P = h);
          else
            e: for (o = c; P !== null; ) {
              if (((s = P), s.flags & 2048))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Il(9, s);
                  }
                } catch (N) {
                  ne(s, s.return, N);
                }
              if (s === o) {
                P = null;
                break e;
              }
              var g = s.sibling;
              if (g !== null) {
                (g.return = s.return), (P = g);
                break e;
              }
              P = s.return;
            }
        }
        if (
          ((W = i), Jt(), lt && typeof lt.onPostCommitFiberRoot == "function")
        )
          try {
            lt.onPostCommitFiberRoot(El, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (H = n), (Be.transition = t);
    }
  }
  return !1;
}
function ku(e, t, n) {
  (t = Yn(n, t)),
    (t = Ed(e, t, 1)),
    (e = Ft(e, t, 1)),
    (t = Se()),
    e !== null && (si(e, 1, t), Re(e, t));
}
function ne(e, t, n) {
  if (e.tag === 3) ku(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        ku(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (At === null || !At.has(r)))
        ) {
          (e = Yn(n, e)),
            (e = Nd(t, e, 1)),
            (t = Ft(t, e, 1)),
            (e = Se()),
            t !== null && (si(t, 1, e), Re(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Wh(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Se()),
    (e.pingedLanes |= e.suspendedLanes & n),
    fe === e &&
      (me & n) === n &&
      (ae === 4 || (ae === 3 && (me & 130023424) === me && 500 > le() - oa)
        ? sn(e, 0)
        : (la |= n)),
    Re(e, t);
}
function Qd(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = _i), (_i <<= 1), !(_i & 130023424) && (_i = 4194304))
      : (t = 1));
  var n = Se();
  (e = _t(e, t)), e !== null && (si(e, t, n), Re(e, n));
}
function Hh(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Qd(e, n);
}
function Qh(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(w(314));
  }
  r !== null && r.delete(t), Qd(e, n);
}
var Kd;
Kd = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || je.current) Pe = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Pe = !1), Ih(e, t, n);
      Pe = !!(e.flags & 131072);
    }
  else (Pe = !1), G && t.flags & 1048576 && Jc(t, nl, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Ai(e, t), (e = t.pendingProps);
      var i = Wn(t, _e.current);
      An(t, n), (i = bs(null, t, r, e, i, n));
      var l = ea();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Oe(r) ? ((l = !0), el(t)) : (l = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            Ys(t),
            (i.updater = zl),
            (t.stateNode = i),
            (i._reactInternals = t),
            bo(t, r, e, n),
            (t = ns(null, t, r, !0, l, n)))
          : ((t.tag = 0), G && l && Vs(t), ke(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Ai(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = Yh(r)),
          (e = Ke(r, e)),
          i)
        ) {
          case 0:
            t = ts(null, t, r, e, n);
            break e;
          case 1:
            t = fu(null, t, r, e, n);
            break e;
          case 11:
            t = cu(null, t, r, e, n);
            break e;
          case 14:
            t = du(null, t, r, Ke(r.type, e), n);
            break e;
        }
        throw Error(w(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ke(r, i)),
        ts(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ke(r, i)),
        fu(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((Od(t), e === null)) throw Error(w(387));
        (r = t.pendingProps),
          (l = t.memoizedState),
          (i = l.element),
          rd(e, t),
          ll(t, r, null, n);
        var o = t.memoizedState;
        if (((r = o.element), l.isDehydrated))
          if (
            ((l = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (t.updateQueue.baseState = l),
            (t.memoizedState = l),
            t.flags & 256)
          ) {
            (i = Yn(Error(w(423)), t)), (t = pu(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = Yn(Error(w(424)), t)), (t = pu(e, t, r, n, i));
            break e;
          } else
            for (
              Le = Ut(t.stateNode.containerInfo.firstChild),
                Me = t,
                G = !0,
                Ge = null,
                n = td(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Hn(), r === i)) {
            t = wt(e, t, n);
            break e;
          }
          ke(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        id(t),
        e === null && Xo(t),
        (r = t.type),
        (i = t.pendingProps),
        (l = e !== null ? e.memoizedProps : null),
        (o = i.children),
        Ho(r, i) ? (o = null) : l !== null && Ho(r, l) && (t.flags |= 32),
        jd(e, t),
        ke(e, t, o, n),
        t.child
      );
    case 6:
      return e === null && Xo(t), null;
    case 13:
      return Rd(e, t, n);
    case 4:
      return (
        Gs(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Qn(t, null, r, n)) : ke(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ke(r, i)),
        cu(e, t, r, i, n)
      );
    case 7:
      return ke(e, t, t.pendingProps, n), t.child;
    case 8:
      return ke(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ke(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (l = t.memoizedProps),
          (o = i.value),
          Q(rl, r._currentValue),
          (r._currentValue = o),
          l !== null)
        )
          if (et(l.value, o)) {
            if (l.children === i.children && !je.current) {
              t = wt(e, t, n);
              break e;
            }
          } else
            for (l = t.child, l !== null && (l.return = t); l !== null; ) {
              var s = l.dependencies;
              if (s !== null) {
                o = l.child;
                for (var a = s.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (l.tag === 1) {
                      (a = yt(-1, n & -n)), (a.tag = 2);
                      var u = l.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var d = u.pending;
                        d === null
                          ? (a.next = a)
                          : ((a.next = d.next), (d.next = a)),
                          (u.pending = a);
                      }
                    }
                    (l.lanes |= n),
                      (a = l.alternate),
                      a !== null && (a.lanes |= n),
                      Jo(l.return, n, t),
                      (s.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (l.tag === 10) o = l.type === t.type ? null : l.child;
              else if (l.tag === 18) {
                if (((o = l.return), o === null)) throw Error(w(341));
                (o.lanes |= n),
                  (s = o.alternate),
                  s !== null && (s.lanes |= n),
                  Jo(o, n, t),
                  (o = l.sibling);
              } else o = l.child;
              if (o !== null) o.return = l;
              else
                for (o = l; o !== null; ) {
                  if (o === t) {
                    o = null;
                    break;
                  }
                  if (((l = o.sibling), l !== null)) {
                    (l.return = o.return), (o = l);
                    break;
                  }
                  o = o.return;
                }
              l = o;
            }
        ke(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        An(t, n),
        (i = We(i)),
        (r = r(i)),
        (t.flags |= 1),
        ke(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = Ke(r, t.pendingProps)),
        (i = Ke(r.type, i)),
        du(e, t, r, i, n)
      );
    case 15:
      return Td(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ke(r, i)),
        Ai(e, t),
        (t.tag = 1),
        Oe(r) ? ((e = !0), el(t)) : (e = !1),
        An(t, n),
        Cd(t, r, i),
        bo(t, r, i, n),
        ns(null, t, r, !0, e, n)
      );
    case 19:
      return zd(e, t, n);
    case 22:
      return Pd(e, t, n);
  }
  throw Error(w(156, t.tag));
};
function Yd(e, t) {
  return wc(e, t);
}
function Kh(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Ze(e, t, n, r) {
  return new Kh(e, t, n, r);
}
function ca(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Yh(e) {
  if (typeof e == "function") return ca(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === js)) return 11;
    if (e === Os) return 14;
  }
  return 2;
}
function Zt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Ze(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Bi(e, t, n, r, i, l) {
  var o = 2;
  if (((r = e), typeof e == "function")) ca(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else
    e: switch (e) {
      case Cn:
        return an(n.children, i, l, t);
      case Ps:
        (o = 8), (i |= 8);
        break;
      case So:
        return (
          (e = Ze(12, n, t, i | 2)), (e.elementType = So), (e.lanes = l), e
        );
      case Co:
        return (e = Ze(13, n, t, i)), (e.elementType = Co), (e.lanes = l), e;
      case Eo:
        return (e = Ze(19, n, t, i)), (e.elementType = Eo), (e.lanes = l), e;
      case ic:
        return Ml(n, i, l, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case nc:
              o = 10;
              break e;
            case rc:
              o = 9;
              break e;
            case js:
              o = 11;
              break e;
            case Os:
              o = 14;
              break e;
            case Tt:
              (o = 16), (r = null);
              break e;
          }
        throw Error(w(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Ze(o, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = l), t
  );
}
function an(e, t, n, r) {
  return (e = Ze(7, e, r, t)), (e.lanes = n), e;
}
function Ml(e, t, n, r) {
  return (
    (e = Ze(22, e, r, t)),
    (e.elementType = ic),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function yo(e, t, n) {
  return (e = Ze(6, e, null, t)), (e.lanes = n), e;
}
function go(e, t, n) {
  return (
    (t = Ze(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Gh(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Jl(0)),
    (this.expirationTimes = Jl(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Jl(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function da(e, t, n, r, i, l, o, s, a) {
  return (
    (e = new Gh(e, t, n, s, a)),
    t === 1 ? ((t = 1), l === !0 && (t |= 8)) : (t = 0),
    (l = Ze(3, null, null, t)),
    (e.current = l),
    (l.stateNode = e),
    (l.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Ys(l),
    e
  );
}
function Xh(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Sn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Gd(e) {
  if (!e) return Wt;
  e = e._reactInternals;
  e: {
    if (xn(e) !== e || e.tag !== 1) throw Error(w(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Oe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(w(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Oe(n)) return Gc(e, n, t);
  }
  return t;
}
function Xd(e, t, n, r, i, l, o, s, a) {
  return (
    (e = da(n, r, !0, e, i, l, o, s, a)),
    (e.context = Gd(null)),
    (n = e.current),
    (r = Se()),
    (i = Vt(n)),
    (l = yt(r, i)),
    (l.callback = t ?? null),
    Ft(n, l, i),
    (e.current.lanes = i),
    si(e, i, r),
    Re(e, r),
    e
  );
}
function Dl(e, t, n, r) {
  var i = t.current,
    l = Se(),
    o = Vt(i);
  return (
    (n = Gd(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = yt(l, o)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Ft(i, t, o)),
    e !== null && (qe(e, i, o, l), $i(e, i, o)),
    o
  );
}
function pl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Su(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function fa(e, t) {
  Su(e, t), (e = e.alternate) && Su(e, t);
}
function Jh() {
  return null;
}
var Jd =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function pa(e) {
  this._internalRoot = e;
}
$l.prototype.render = pa.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(w(409));
  Dl(e, t, null, null);
};
$l.prototype.unmount = pa.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    mn(function () {
      Dl(null, e, null, null);
    }),
      (t[xt] = null);
  }
};
function $l(e) {
  this._internalRoot = e;
}
$l.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Pc();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < jt.length && t !== 0 && t < jt[n].priority; n++);
    jt.splice(n, 0, e), n === 0 && Oc(e);
  }
};
function ha(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Ul(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Cu() {}
function qh(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var l = r;
      r = function () {
        var u = pl(o);
        l.call(u);
      };
    }
    var o = Xd(t, r, e, 0, null, !1, !1, "", Cu);
    return (
      (e._reactRootContainer = o),
      (e[xt] = o.current),
      Mr(e.nodeType === 8 ? e.parentNode : e),
      mn(),
      o
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var s = r;
    r = function () {
      var u = pl(a);
      s.call(u);
    };
  }
  var a = da(e, 0, !1, null, null, !1, !1, "", Cu);
  return (
    (e._reactRootContainer = a),
    (e[xt] = a.current),
    Mr(e.nodeType === 8 ? e.parentNode : e),
    mn(function () {
      Dl(t, a, n, r);
    }),
    a
  );
}
function Fl(e, t, n, r, i) {
  var l = n._reactRootContainer;
  if (l) {
    var o = l;
    if (typeof i == "function") {
      var s = i;
      i = function () {
        var a = pl(o);
        s.call(a);
      };
    }
    Dl(t, o, e, i);
  } else o = qh(n, t, e, i, r);
  return pl(o);
}
Nc = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = hr(t.pendingLanes);
        n !== 0 &&
          (Is(t, n | 1), Re(t, le()), !(W & 6) && ((Gn = le() + 500), Jt()));
      }
      break;
    case 13:
      mn(function () {
        var r = _t(e, 1);
        if (r !== null) {
          var i = Se();
          qe(r, e, 1, i);
        }
      }),
        fa(e, 1);
  }
};
Ls = function (e) {
  if (e.tag === 13) {
    var t = _t(e, 134217728);
    if (t !== null) {
      var n = Se();
      qe(t, e, 134217728, n);
    }
    fa(e, 134217728);
  }
};
Tc = function (e) {
  if (e.tag === 13) {
    var t = Vt(e),
      n = _t(e, t);
    if (n !== null) {
      var r = Se();
      qe(n, e, t, r);
    }
    fa(e, t);
  }
};
Pc = function () {
  return H;
};
jc = function (e, t) {
  var n = H;
  try {
    return (H = e), t();
  } finally {
    H = n;
  }
};
Mo = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Po(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = jl(r);
            if (!i) throw Error(w(90));
            oc(r), Po(r, i);
          }
        }
      }
      break;
    case "textarea":
      ac(e, n);
      break;
    case "select":
      (t = n.value), t != null && Dn(e, !!n.multiple, t, !1);
  }
};
mc = sa;
vc = mn;
var bh = { usingClientEntryPoint: !1, Events: [ui, Pn, jl, pc, hc, sa] },
  dr = {
    findFiberByHostInstance: rn,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  em = {
    bundleType: dr.bundleType,
    version: dr.version,
    rendererPackageName: dr.rendererPackageName,
    rendererConfig: dr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: St.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = xc(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: dr.findFiberByHostInstance || Jh,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Ri = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ri.isDisabled && Ri.supportsFiber)
    try {
      (El = Ri.inject(em)), (lt = Ri);
    } catch {}
}
Ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = bh;
Ue.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ha(t)) throw Error(w(200));
  return Xh(e, t, null, n);
};
Ue.createRoot = function (e, t) {
  if (!ha(e)) throw Error(w(299));
  var n = !1,
    r = "",
    i = Jd;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = da(e, 1, !1, null, null, n, !1, r, i)),
    (e[xt] = t.current),
    Mr(e.nodeType === 8 ? e.parentNode : e),
    new pa(t)
  );
};
Ue.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(w(188))
      : ((e = Object.keys(e).join(",")), Error(w(268, e)));
  return (e = xc(t)), (e = e === null ? null : e.stateNode), e;
};
Ue.flushSync = function (e) {
  return mn(e);
};
Ue.hydrate = function (e, t, n) {
  if (!Ul(t)) throw Error(w(200));
  return Fl(null, e, t, !0, n);
};
Ue.hydrateRoot = function (e, t, n) {
  if (!ha(e)) throw Error(w(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    l = "",
    o = Jd;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (l = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    (t = Xd(t, null, e, 1, n ?? null, i, !1, l, o)),
    (e[xt] = t.current),
    Mr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new $l(t);
};
Ue.render = function (e, t, n) {
  if (!Ul(t)) throw Error(w(200));
  return Fl(null, e, t, !1, n);
};
Ue.unmountComponentAtNode = function (e) {
  if (!Ul(e)) throw Error(w(40));
  return e._reactRootContainer
    ? (mn(function () {
        Fl(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[xt] = null);
        });
      }),
      !0)
    : !1;
};
Ue.unstable_batchedUpdates = sa;
Ue.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Ul(n)) throw Error(w(200));
  if (e == null || e._reactInternals === void 0) throw Error(w(38));
  return Fl(e, t, n, !1, r);
};
Ue.version = "18.3.1-next-f1338f8080-20240426";
function qd() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(qd);
    } catch (e) {
      console.error(e);
    }
}
qd(), (qu.exports = Ue);
var tm = qu.exports,
  Eu = tm;
(wo.createRoot = Eu.createRoot), (wo.hydrateRoot = Eu.hydrateRoot);
/**
 * @remix-run/router v1.16.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Wr() {
  return (
    (Wr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Wr.apply(this, arguments)
  );
}
var Lt;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(Lt || (Lt = {}));
const Nu = "popstate";
function nm(e) {
  e === void 0 && (e = {});
  function t(r, i) {
    let { pathname: l, search: o, hash: s } = r.location;
    return hs(
      "",
      { pathname: l, search: o, hash: s },
      (i.state && i.state.usr) || null,
      (i.state && i.state.key) || "default",
    );
  }
  function n(r, i) {
    return typeof i == "string" ? i : ef(i);
  }
  return im(t, n, null, e);
}
function ue(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function bd(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function rm() {
  return Math.random().toString(36).substr(2, 8);
}
function Tu(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function hs(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    Wr(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? nr(t) : t,
      { state: n, key: (t && t.key) || r || rm() },
    )
  );
}
function ef(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function nr(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function im(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: i = document.defaultView, v5Compat: l = !1 } = r,
    o = i.history,
    s = Lt.Pop,
    a = null,
    u = d();
  u == null && ((u = 0), o.replaceState(Wr({}, o.state, { idx: u }), ""));
  function d() {
    return (o.state || { idx: null }).idx;
  }
  function p() {
    s = Lt.Pop;
    let S = d(),
      f = S == null ? null : S - u;
    (u = S), a && a({ action: s, location: x.location, delta: f });
  }
  function m(S, f) {
    s = Lt.Push;
    let c = hs(x.location, S, f);
    u = d() + 1;
    let h = Tu(c, u),
      g = x.createHref(c);
    try {
      o.pushState(h, "", g);
    } catch (N) {
      if (N instanceof DOMException && N.name === "DataCloneError") throw N;
      i.location.assign(g);
    }
    l && a && a({ action: s, location: x.location, delta: 1 });
  }
  function y(S, f) {
    s = Lt.Replace;
    let c = hs(x.location, S, f);
    u = d();
    let h = Tu(c, u),
      g = x.createHref(c);
    o.replaceState(h, "", g),
      l && a && a({ action: s, location: x.location, delta: 0 });
  }
  function _(S) {
    let f = i.location.origin !== "null" ? i.location.origin : i.location.href,
      c = typeof S == "string" ? S : ef(S);
    return (
      (c = c.replace(/ $/, "%20")),
      ue(
        f,
        "No window.location.(origin|href) available to create URL for href: " +
          c,
      ),
      new URL(c, f)
    );
  }
  let x = {
    get action() {
      return s;
    },
    get location() {
      return e(i, o);
    },
    listen(S) {
      if (a) throw new Error("A history only accepts one active listener");
      return (
        i.addEventListener(Nu, p),
        (a = S),
        () => {
          i.removeEventListener(Nu, p), (a = null);
        }
      );
    },
    createHref(S) {
      return t(i, S);
    },
    createURL: _,
    encodeLocation(S) {
      let f = _(S);
      return { pathname: f.pathname, search: f.search, hash: f.hash };
    },
    push: m,
    replace: y,
    go(S) {
      return o.go(S);
    },
  };
  return x;
}
var Pu;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(Pu || (Pu = {}));
function lm(e, t, n) {
  n === void 0 && (n = "/");
  let r = typeof t == "string" ? nr(t) : t,
    i = rf(r.pathname || "/", n);
  if (i == null) return null;
  let l = tf(e);
  om(l);
  let o = null;
  for (let s = 0; o == null && s < l.length; ++s) {
    let a = gm(i);
    o = mm(l[s], a);
  }
  return o;
}
function tf(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let i = (l, o, s) => {
    let a = {
      relativePath: s === void 0 ? l.path || "" : s,
      caseSensitive: l.caseSensitive === !0,
      childrenIndex: o,
      route: l,
    };
    a.relativePath.startsWith("/") &&
      (ue(
        a.relativePath.startsWith(r),
        'Absolute route path "' +
          a.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (a.relativePath = a.relativePath.slice(r.length)));
    let u = un([r, a.relativePath]),
      d = n.concat(a);
    l.children &&
      l.children.length > 0 &&
      (ue(
        l.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + u + '".'),
      ),
      tf(l.children, t, d, u)),
      !(l.path == null && !l.index) &&
        t.push({ path: u, score: pm(u, l.index), routesMeta: d });
  };
  return (
    e.forEach((l, o) => {
      var s;
      if (l.path === "" || !((s = l.path) != null && s.includes("?"))) i(l, o);
      else for (let a of nf(l.path)) i(l, o, a);
    }),
    t
  );
}
function nf(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith("?"),
    l = n.replace(/\?$/, "");
  if (r.length === 0) return i ? [l, ""] : [l];
  let o = nf(r.join("/")),
    s = [];
  return (
    s.push(...o.map((a) => (a === "" ? l : [l, a].join("/")))),
    i && s.push(...o),
    s.map((a) => (e.startsWith("/") && a === "" ? "/" : a))
  );
}
function om(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : hm(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
const sm = /^:[\w-]+$/,
  am = 3,
  um = 2,
  cm = 1,
  dm = 10,
  fm = -2,
  ju = (e) => e === "*";
function pm(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(ju) && (r += fm),
    t && (r += um),
    n
      .filter((i) => !ju(i))
      .reduce((i, l) => i + (sm.test(l) ? am : l === "" ? cm : dm), r)
  );
}
function hm(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function mm(e, t) {
  let { routesMeta: n } = e,
    r = {},
    i = "/",
    l = [];
  for (let o = 0; o < n.length; ++o) {
    let s = n[o],
      a = o === n.length - 1,
      u = i === "/" ? t : t.slice(i.length) || "/",
      d = vm(
        { path: s.relativePath, caseSensitive: s.caseSensitive, end: a },
        u,
      );
    if (!d) return null;
    Object.assign(r, d.params);
    let p = s.route;
    l.push({
      params: r,
      pathname: un([i, d.pathname]),
      pathnameBase: Cm(un([i, d.pathnameBase])),
      route: p,
    }),
      d.pathnameBase !== "/" && (i = un([i, d.pathnameBase]));
  }
  return l;
}
function vm(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = ym(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let l = i[0],
    o = l.replace(/(.)\/+$/, "$1"),
    s = i.slice(1);
  return {
    params: r.reduce((u, d, p) => {
      let { paramName: m, isOptional: y } = d;
      if (m === "*") {
        let x = s[p] || "";
        o = l.slice(0, l.length - x.length).replace(/(.)\/+$/, "$1");
      }
      const _ = s[p];
      return (
        y && !_ ? (u[m] = void 0) : (u[m] = (_ || "").replace(/%2F/g, "/")), u
      );
    }, {}),
    pathname: l,
    pathnameBase: o,
    pattern: e,
  };
}
function ym(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    bd(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'),
    );
  let r = [],
    i =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (o, s, a) => (
            r.push({ paramName: s, isOptional: a != null }),
            a ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
        ? (i += "\\/*$")
        : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"),
    [new RegExp(i, t ? void 0 : "i"), r]
  );
}
function gm(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      bd(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ")."),
      ),
      e
    );
  }
}
function rf(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function xm(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: i = "",
  } = typeof e == "string" ? nr(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : _m(n, t)) : t,
    search: Em(r),
    hash: Nm(i),
  };
}
function _m(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((i) => {
      i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function xo(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function wm(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function km(e, t) {
  let n = wm(e);
  return t
    ? n.map((r, i) => (i === e.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function Sm(e, t, n, r) {
  r === void 0 && (r = !1);
  let i;
  typeof e == "string"
    ? (i = nr(e))
    : ((i = Wr({}, e)),
      ue(
        !i.pathname || !i.pathname.includes("?"),
        xo("?", "pathname", "search", i),
      ),
      ue(
        !i.pathname || !i.pathname.includes("#"),
        xo("#", "pathname", "hash", i),
      ),
      ue(!i.search || !i.search.includes("#"), xo("#", "search", "hash", i)));
  let l = e === "" || i.pathname === "",
    o = l ? "/" : i.pathname,
    s;
  if (o == null) s = n;
  else {
    let p = t.length - 1;
    if (!r && o.startsWith("..")) {
      let m = o.split("/");
      for (; m[0] === ".."; ) m.shift(), (p -= 1);
      i.pathname = m.join("/");
    }
    s = p >= 0 ? t[p] : "/";
  }
  let a = xm(i, s),
    u = o && o !== "/" && o.endsWith("/"),
    d = (l || o === ".") && n.endsWith("/");
  return !a.pathname.endsWith("/") && (u || d) && (a.pathname += "/"), a;
}
const un = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Cm = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Em = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  Nm = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function Tm(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const lf = ["post", "put", "patch", "delete"];
new Set(lf);
const Pm = ["get", ...lf];
new Set(Pm);
/**
 * React Router v6.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Hr() {
  return (
    (Hr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Hr.apply(this, arguments)
  );
}
const ma = E.createContext(null),
  jm = E.createContext(null),
  Al = E.createContext(null),
  Vl = E.createContext(null),
  rr = E.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  of = E.createContext(null);
function Zl() {
  return E.useContext(Vl) != null;
}
function sf() {
  return Zl() || ue(!1), E.useContext(Vl).location;
}
function af(e) {
  E.useContext(Al).static || E.useLayoutEffect(e);
}
function Om() {
  let { isDataRoute: e } = E.useContext(rr);
  return e ? Bm() : Rm();
}
function Rm() {
  Zl() || ue(!1);
  let e = E.useContext(ma),
    { basename: t, future: n, navigator: r } = E.useContext(Al),
    { matches: i } = E.useContext(rr),
    { pathname: l } = sf(),
    o = JSON.stringify(km(i, n.v7_relativeSplatPath)),
    s = E.useRef(!1);
  return (
    af(() => {
      s.current = !0;
    }),
    E.useCallback(
      function (u, d) {
        if ((d === void 0 && (d = {}), !s.current)) return;
        if (typeof u == "number") {
          r.go(u);
          return;
        }
        let p = Sm(u, JSON.parse(o), l, d.relative === "path");
        e == null &&
          t !== "/" &&
          (p.pathname = p.pathname === "/" ? t : un([t, p.pathname])),
          (d.replace ? r.replace : r.push)(p, d.state, d);
      },
      [t, r, o, l, e],
    )
  );
}
function zm(e, t) {
  return Im(e, t);
}
function Im(e, t, n, r) {
  Zl() || ue(!1);
  let { navigator: i } = E.useContext(Al),
    { matches: l } = E.useContext(rr),
    o = l[l.length - 1],
    s = o ? o.params : {};
  o && o.pathname;
  let a = o ? o.pathnameBase : "/";
  o && o.route;
  let u = sf(),
    d;
  if (t) {
    var p;
    let S = typeof t == "string" ? nr(t) : t;
    a === "/" || ((p = S.pathname) != null && p.startsWith(a)) || ue(!1),
      (d = S);
  } else d = u;
  let m = d.pathname || "/",
    y = m;
  if (a !== "/") {
    let S = a.replace(/^\//, "").split("/");
    y = "/" + m.replace(/^\//, "").split("/").slice(S.length).join("/");
  }
  let _ = lm(e, { pathname: y }),
    x = Um(
      _ &&
        _.map((S) =>
          Object.assign({}, S, {
            params: Object.assign({}, s, S.params),
            pathname: un([
              a,
              i.encodeLocation
                ? i.encodeLocation(S.pathname).pathname
                : S.pathname,
            ]),
            pathnameBase:
              S.pathnameBase === "/"
                ? a
                : un([
                    a,
                    i.encodeLocation
                      ? i.encodeLocation(S.pathnameBase).pathname
                      : S.pathnameBase,
                  ]),
          }),
        ),
      l,
      n,
      r,
    );
  return t && x
    ? E.createElement(
        Vl.Provider,
        {
          value: {
            location: Hr(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              d,
            ),
            navigationType: Lt.Pop,
          },
        },
        x,
      )
    : x;
}
function Lm() {
  let e = Zm(),
    t = Tm(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    i = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return E.createElement(
    E.Fragment,
    null,
    E.createElement("h2", null, "Unexpected Application Error!"),
    E.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? E.createElement("pre", { style: i }, n) : null,
    null,
  );
}
const Mm = E.createElement(Lm, null);
class Dm extends E.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n,
    );
  }
  render() {
    return this.state.error !== void 0
      ? E.createElement(
          rr.Provider,
          { value: this.props.routeContext },
          E.createElement(of.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function $m(e) {
  let { routeContext: t, match: n, children: r } = e,
    i = E.useContext(ma);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = n.route.id),
    E.createElement(rr.Provider, { value: t }, r)
  );
}
function Um(e, t, n, r) {
  var i;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var l;
    if ((l = n) != null && l.errors) e = n.matches;
    else return null;
  }
  let o = e,
    s = (i = n) == null ? void 0 : i.errors;
  if (s != null) {
    let d = o.findIndex(
      (p) => p.route.id && (s == null ? void 0 : s[p.route.id]) !== void 0,
    );
    d >= 0 || ue(!1), (o = o.slice(0, Math.min(o.length, d + 1)));
  }
  let a = !1,
    u = -1;
  if (n && r && r.v7_partialHydration)
    for (let d = 0; d < o.length; d++) {
      let p = o[d];
      if (
        ((p.route.HydrateFallback || p.route.hydrateFallbackElement) && (u = d),
        p.route.id)
      ) {
        let { loaderData: m, errors: y } = n,
          _ =
            p.route.loader &&
            m[p.route.id] === void 0 &&
            (!y || y[p.route.id] === void 0);
        if (p.route.lazy || _) {
          (a = !0), u >= 0 ? (o = o.slice(0, u + 1)) : (o = [o[0]]);
          break;
        }
      }
    }
  return o.reduceRight((d, p, m) => {
    let y,
      _ = !1,
      x = null,
      S = null;
    n &&
      ((y = s && p.route.id ? s[p.route.id] : void 0),
      (x = p.route.errorElement || Mm),
      a &&
        (u < 0 && m === 0
          ? ((_ = !0), (S = null))
          : u === m &&
            ((_ = !0), (S = p.route.hydrateFallbackElement || null))));
    let f = t.concat(o.slice(0, m + 1)),
      c = () => {
        let h;
        return (
          y
            ? (h = x)
            : _
              ? (h = S)
              : p.route.Component
                ? (h = E.createElement(p.route.Component, null))
                : p.route.element
                  ? (h = p.route.element)
                  : (h = d),
          E.createElement($m, {
            match: p,
            routeContext: { outlet: d, matches: f, isDataRoute: n != null },
            children: h,
          })
        );
      };
    return n && (p.route.ErrorBoundary || p.route.errorElement || m === 0)
      ? E.createElement(Dm, {
          location: n.location,
          revalidation: n.revalidation,
          component: x,
          error: y,
          children: c(),
          routeContext: { outlet: null, matches: f, isDataRoute: !0 },
        })
      : c();
  }, null);
}
var uf = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(uf || {}),
  hl = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(hl || {});
function Fm(e) {
  let t = E.useContext(ma);
  return t || ue(!1), t;
}
function Am(e) {
  let t = E.useContext(jm);
  return t || ue(!1), t;
}
function Vm(e) {
  let t = E.useContext(rr);
  return t || ue(!1), t;
}
function cf(e) {
  let t = Vm(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || ue(!1), n.route.id;
}
function Zm() {
  var e;
  let t = E.useContext(of),
    n = Am(hl.UseRouteError),
    r = cf(hl.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function Bm() {
  let { router: e } = Fm(uf.UseNavigateStable),
    t = cf(hl.UseNavigateStable),
    n = E.useRef(!1);
  return (
    af(() => {
      n.current = !0;
    }),
    E.useCallback(
      function (i, l) {
        l === void 0 && (l = {}),
          n.current &&
            (typeof i == "number"
              ? e.navigate(i)
              : e.navigate(i, Hr({ fromRouteId: t }, l)));
      },
      [e, t],
    )
  );
}
function ms(e) {
  ue(!1);
}
function Wm(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: i = Lt.Pop,
    navigator: l,
    static: o = !1,
    future: s,
  } = e;
  Zl() && ue(!1);
  let a = t.replace(/^\/*/, "/"),
    u = E.useMemo(
      () => ({
        basename: a,
        navigator: l,
        static: o,
        future: Hr({ v7_relativeSplatPath: !1 }, s),
      }),
      [a, s, l, o],
    );
  typeof r == "string" && (r = nr(r));
  let {
      pathname: d = "/",
      search: p = "",
      hash: m = "",
      state: y = null,
      key: _ = "default",
    } = r,
    x = E.useMemo(() => {
      let S = rf(d, a);
      return S == null
        ? null
        : {
            location: { pathname: S, search: p, hash: m, state: y, key: _ },
            navigationType: i,
          };
    }, [a, d, p, m, y, _, i]);
  return x == null
    ? null
    : E.createElement(
        Al.Provider,
        { value: u },
        E.createElement(Vl.Provider, { children: n, value: x }),
      );
}
function Hm(e) {
  let { children: t, location: n } = e;
  return zm(vs(t), n);
}
new Promise(() => {});
function vs(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    E.Children.forEach(e, (r, i) => {
      if (!E.isValidElement(r)) return;
      let l = [...t, i];
      if (r.type === E.Fragment) {
        n.push.apply(n, vs(r.props.children, l));
        return;
      }
      r.type !== ms && ue(!1), !r.props.index || !r.props.children || ue(!1);
      let o = {
        id: r.props.id || l.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (o.children = vs(r.props.children, l)), n.push(o);
    }),
    n
  );
}
/**
 * React Router DOM v6.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const Qm = "6";
try {
  window.__reactRouterVersion = Qm;
} catch {}
const Km = "startTransition",
  Ou = Wf[Km];
function Ym(e) {
  let { basename: t, children: n, future: r, window: i } = e,
    l = E.useRef();
  l.current == null && (l.current = nm({ window: i, v5Compat: !0 }));
  let o = l.current,
    [s, a] = E.useState({ action: o.action, location: o.location }),
    { v7_startTransition: u } = r || {},
    d = E.useCallback(
      (p) => {
        u && Ou ? Ou(() => a(p)) : a(p);
      },
      [a, u],
    );
  return (
    E.useLayoutEffect(() => o.listen(d), [o, d]),
    E.createElement(Wm, {
      basename: t,
      children: n,
      location: s.location,
      navigationType: s.action,
      navigator: o,
      future: r,
    })
  );
}
var Ru;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(Ru || (Ru = {}));
var zu;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(zu || (zu = {}));
const Gm = () =>
  v.jsx(v.Fragment, {
    children: v.jsx("div", {
      className: "flex justify-center items-center h-screen bg-gray-100",
      children: v.jsxs("div", {
        className: "text-center",
        children: [
          v.jsx("div", {
            className:
              "animate-spin rounded-full h-[128px] w-[128px] border-t-4 border-b-4 border-blue-500",
          }),
          v.jsx("div", {
            className: "mt-[16px] text-lg font-semibold",
            children: "Loading...",
          }),
        ],
      }),
    }),
  });
var Z;
(function (e) {
  e.assertEqual = (i) => i;
  function t(i) {}
  e.assertIs = t;
  function n(i) {
    throw new Error();
  }
  (e.assertNever = n),
    (e.arrayToEnum = (i) => {
      const l = {};
      for (const o of i) l[o] = o;
      return l;
    }),
    (e.getValidEnumValues = (i) => {
      const l = e.objectKeys(i).filter((s) => typeof i[i[s]] != "number"),
        o = {};
      for (const s of l) o[s] = i[s];
      return e.objectValues(o);
    }),
    (e.objectValues = (i) =>
      e.objectKeys(i).map(function (l) {
        return i[l];
      })),
    (e.objectKeys =
      typeof Object.keys == "function"
        ? (i) => Object.keys(i)
        : (i) => {
            const l = [];
            for (const o in i)
              Object.prototype.hasOwnProperty.call(i, o) && l.push(o);
            return l;
          }),
    (e.find = (i, l) => {
      for (const o of i) if (l(o)) return o;
    }),
    (e.isInteger =
      typeof Number.isInteger == "function"
        ? (i) => Number.isInteger(i)
        : (i) => typeof i == "number" && isFinite(i) && Math.floor(i) === i);
  function r(i, l = " | ") {
    return i.map((o) => (typeof o == "string" ? `'${o}'` : o)).join(l);
  }
  (e.joinValues = r),
    (e.jsonStringifyReplacer = (i, l) =>
      typeof l == "bigint" ? l.toString() : l);
})(Z || (Z = {}));
var ys;
(function (e) {
  e.mergeShapes = (t, n) => ({ ...t, ...n });
})(ys || (ys = {}));
const T = Z.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
  ]),
  Rt = (e) => {
    switch (typeof e) {
      case "undefined":
        return T.undefined;
      case "string":
        return T.string;
      case "number":
        return isNaN(e) ? T.nan : T.number;
      case "boolean":
        return T.boolean;
      case "function":
        return T.function;
      case "bigint":
        return T.bigint;
      case "symbol":
        return T.symbol;
      case "object":
        return Array.isArray(e)
          ? T.array
          : e === null
            ? T.null
            : e.then &&
                typeof e.then == "function" &&
                e.catch &&
                typeof e.catch == "function"
              ? T.promise
              : typeof Map < "u" && e instanceof Map
                ? T.map
                : typeof Set < "u" && e instanceof Set
                  ? T.set
                  : typeof Date < "u" && e instanceof Date
                    ? T.date
                    : T.object;
      default:
        return T.unknown;
    }
  },
  k = Z.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
  ]),
  Xm = (e) => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:");
class De extends Error {
  constructor(t) {
    super(),
      (this.issues = []),
      (this.addIssue = (r) => {
        this.issues = [...this.issues, r];
      }),
      (this.addIssues = (r = []) => {
        this.issues = [...this.issues, ...r];
      });
    const n = new.target.prototype;
    Object.setPrototypeOf
      ? Object.setPrototypeOf(this, n)
      : (this.__proto__ = n),
      (this.name = "ZodError"),
      (this.issues = t);
  }
  get errors() {
    return this.issues;
  }
  format(t) {
    const n =
        t ||
        function (l) {
          return l.message;
        },
      r = { _errors: [] },
      i = (l) => {
        for (const o of l.issues)
          if (o.code === "invalid_union") o.unionErrors.map(i);
          else if (o.code === "invalid_return_type") i(o.returnTypeError);
          else if (o.code === "invalid_arguments") i(o.argumentsError);
          else if (o.path.length === 0) r._errors.push(n(o));
          else {
            let s = r,
              a = 0;
            for (; a < o.path.length; ) {
              const u = o.path[a];
              a === o.path.length - 1
                ? ((s[u] = s[u] || { _errors: [] }), s[u]._errors.push(n(o)))
                : (s[u] = s[u] || { _errors: [] }),
                (s = s[u]),
                a++;
            }
          }
      };
    return i(this), r;
  }
  static assert(t) {
    if (!(t instanceof De)) throw new Error(`Not a ZodError: ${t}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, Z.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(t = (n) => n.message) {
    const n = {},
      r = [];
    for (const i of this.issues)
      i.path.length > 0
        ? ((n[i.path[0]] = n[i.path[0]] || []), n[i.path[0]].push(t(i)))
        : r.push(t(i));
    return { formErrors: r, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
De.create = (e) => new De(e);
const Xn = (e, t) => {
  let n;
  switch (e.code) {
    case k.invalid_type:
      e.received === T.undefined
        ? (n = "Required")
        : (n = `Expected ${e.expected}, received ${e.received}`);
      break;
    case k.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(e.expected, Z.jsonStringifyReplacer)}`;
      break;
    case k.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${Z.joinValues(e.keys, ", ")}`;
      break;
    case k.invalid_union:
      n = "Invalid input";
      break;
    case k.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${Z.joinValues(e.options)}`;
      break;
    case k.invalid_enum_value:
      n = `Invalid enum value. Expected ${Z.joinValues(e.options)}, received '${e.received}'`;
      break;
    case k.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case k.invalid_return_type:
      n = "Invalid function return type";
      break;
    case k.invalid_date:
      n = "Invalid date";
      break;
    case k.invalid_string:
      typeof e.validation == "object"
        ? "includes" in e.validation
          ? ((n = `Invalid input: must include "${e.validation.includes}"`),
            typeof e.validation.position == "number" &&
              (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`))
          : "startsWith" in e.validation
            ? (n = `Invalid input: must start with "${e.validation.startsWith}"`)
            : "endsWith" in e.validation
              ? (n = `Invalid input: must end with "${e.validation.endsWith}"`)
              : Z.assertNever(e.validation)
        : e.validation !== "regex"
          ? (n = `Invalid ${e.validation}`)
          : (n = "Invalid");
      break;
    case k.too_small:
      e.type === "array"
        ? (n = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)`)
        : e.type === "string"
          ? (n = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)`)
          : e.type === "number"
            ? (n = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}`)
            : e.type === "date"
              ? (n = `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}`)
              : (n = "Invalid input");
      break;
    case k.too_big:
      e.type === "array"
        ? (n = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)`)
        : e.type === "string"
          ? (n = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)`)
          : e.type === "number"
            ? (n = `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`)
            : e.type === "bigint"
              ? (n = `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`)
              : e.type === "date"
                ? (n = `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}`)
                : (n = "Invalid input");
      break;
    case k.custom:
      n = "Invalid input";
      break;
    case k.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case k.not_multiple_of:
      n = `Number must be a multiple of ${e.multipleOf}`;
      break;
    case k.not_finite:
      n = "Number must be finite";
      break;
    default:
      (n = t.defaultError), Z.assertNever(e);
  }
  return { message: n };
};
let df = Xn;
function Jm(e) {
  df = e;
}
function ml() {
  return df;
}
const vl = (e) => {
    const { data: t, path: n, errorMaps: r, issueData: i } = e,
      l = [...n, ...(i.path || [])],
      o = { ...i, path: l };
    if (i.message !== void 0) return { ...i, path: l, message: i.message };
    let s = "";
    const a = r
      .filter((u) => !!u)
      .slice()
      .reverse();
    for (const u of a) s = u(o, { data: t, defaultError: s }).message;
    return { ...i, path: l, message: s };
  },
  qm = [];
function C(e, t) {
  const n = ml(),
    r = vl({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [
        e.common.contextualErrorMap,
        e.schemaErrorMap,
        n,
        n === Xn ? void 0 : Xn,
      ].filter((i) => !!i),
    });
  e.common.issues.push(r);
}
class we {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(t, n) {
    const r = [];
    for (const i of n) {
      if (i.status === "aborted") return M;
      i.status === "dirty" && t.dirty(), r.push(i.value);
    }
    return { status: t.value, value: r };
  }
  static async mergeObjectAsync(t, n) {
    const r = [];
    for (const i of n) {
      const l = await i.key,
        o = await i.value;
      r.push({ key: l, value: o });
    }
    return we.mergeObjectSync(t, r);
  }
  static mergeObjectSync(t, n) {
    const r = {};
    for (const i of n) {
      const { key: l, value: o } = i;
      if (l.status === "aborted" || o.status === "aborted") return M;
      l.status === "dirty" && t.dirty(),
        o.status === "dirty" && t.dirty(),
        l.value !== "__proto__" &&
          (typeof o.value < "u" || i.alwaysSet) &&
          (r[l.value] = o.value);
    }
    return { status: t.value, value: r };
  }
}
const M = Object.freeze({ status: "aborted" }),
  Mn = (e) => ({ status: "dirty", value: e }),
  Ce = (e) => ({ status: "valid", value: e }),
  gs = (e) => e.status === "aborted",
  xs = (e) => e.status === "dirty",
  Qr = (e) => e.status === "valid",
  Kr = (e) => typeof Promise < "u" && e instanceof Promise;
function yl(e, t, n, r) {
  if (typeof t == "function" ? e !== t || !r : !t.has(e))
    throw new TypeError(
      "Cannot read private member from an object whose class did not declare it",
    );
  return t.get(e);
}
function ff(e, t, n, r, i) {
  if (typeof t == "function" ? e !== t || !i : !t.has(e))
    throw new TypeError(
      "Cannot write private member to an object whose class did not declare it",
    );
  return t.set(e, n), n;
}
var z;
(function (e) {
  (e.errToObj = (t) => (typeof t == "string" ? { message: t } : t || {})),
    (e.toString = (t) =>
      typeof t == "string" ? t : t == null ? void 0 : t.message);
})(z || (z = {}));
var vr, yr;
class at {
  constructor(t, n, r, i) {
    (this._cachedPath = []),
      (this.parent = t),
      (this.data = n),
      (this._path = r),
      (this._key = i);
  }
  get path() {
    return (
      this._cachedPath.length ||
        (this._key instanceof Array
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
    );
  }
}
const Iu = (e, t) => {
  if (Qr(t)) return { success: !0, data: t.value };
  if (!e.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const n = new De(e.common.issues);
      return (this._error = n), this._error;
    },
  };
};
function D(e) {
  if (!e) return {};
  const {
    errorMap: t,
    invalid_type_error: n,
    required_error: r,
    description: i,
  } = e;
  if (t && (n || r))
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
    );
  return t
    ? { errorMap: t, description: i }
    : {
        errorMap: (o, s) => {
          var a, u;
          const { message: d } = e;
          return o.code === "invalid_enum_value"
            ? { message: d ?? s.defaultError }
            : typeof s.data > "u"
              ? {
                  message:
                    (a = d ?? r) !== null && a !== void 0 ? a : s.defaultError,
                }
              : o.code !== "invalid_type"
                ? { message: s.defaultError }
                : {
                    message:
                      (u = d ?? n) !== null && u !== void 0
                        ? u
                        : s.defaultError,
                  };
        },
        description: i,
      };
}
class U {
  constructor(t) {
    (this.spa = this.safeParseAsync),
      (this._def = t),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this));
  }
  get description() {
    return this._def.description;
  }
  _getType(t) {
    return Rt(t.data);
  }
  _getOrReturnCtx(t, n) {
    return (
      n || {
        common: t.parent.common,
        data: t.data,
        parsedType: Rt(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent,
      }
    );
  }
  _processInputParams(t) {
    return {
      status: new we(),
      ctx: {
        common: t.parent.common,
        data: t.data,
        parsedType: Rt(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent,
      },
    };
  }
  _parseSync(t) {
    const n = this._parse(t);
    if (Kr(n)) throw new Error("Synchronous parse encountered promise.");
    return n;
  }
  _parseAsync(t) {
    const n = this._parse(t);
    return Promise.resolve(n);
  }
  parse(t, n) {
    const r = this.safeParse(t, n);
    if (r.success) return r.data;
    throw r.error;
  }
  safeParse(t, n) {
    var r;
    const i = {
        common: {
          issues: [],
          async:
            (r = n == null ? void 0 : n.async) !== null && r !== void 0
              ? r
              : !1,
          contextualErrorMap: n == null ? void 0 : n.errorMap,
        },
        path: (n == null ? void 0 : n.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: Rt(t),
      },
      l = this._parseSync({ data: t, path: i.path, parent: i });
    return Iu(i, l);
  }
  async parseAsync(t, n) {
    const r = await this.safeParseAsync(t, n);
    if (r.success) return r.data;
    throw r.error;
  }
  async safeParseAsync(t, n) {
    const r = {
        common: {
          issues: [],
          contextualErrorMap: n == null ? void 0 : n.errorMap,
          async: !0,
        },
        path: (n == null ? void 0 : n.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: Rt(t),
      },
      i = this._parse({ data: t, path: r.path, parent: r }),
      l = await (Kr(i) ? i : Promise.resolve(i));
    return Iu(r, l);
  }
  refine(t, n) {
    const r = (i) =>
      typeof n == "string" || typeof n > "u"
        ? { message: n }
        : typeof n == "function"
          ? n(i)
          : n;
    return this._refinement((i, l) => {
      const o = t(i),
        s = () => l.addIssue({ code: k.custom, ...r(i) });
      return typeof Promise < "u" && o instanceof Promise
        ? o.then((a) => (a ? !0 : (s(), !1)))
        : o
          ? !0
          : (s(), !1);
    });
  }
  refinement(t, n) {
    return this._refinement((r, i) =>
      t(r) ? !0 : (i.addIssue(typeof n == "function" ? n(r, i) : n), !1),
    );
  }
  _refinement(t) {
    return new tt({
      schema: this,
      typeName: L.ZodEffects,
      effect: { type: "refinement", refinement: t },
    });
  }
  superRefine(t) {
    return this._refinement(t);
  }
  optional() {
    return st.create(this, this._def);
  }
  nullable() {
    return Yt.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return be.create(this, this._def);
  }
  promise() {
    return qn.create(this, this._def);
  }
  or(t) {
    return Jr.create([this, t], this._def);
  }
  and(t) {
    return qr.create(this, t, this._def);
  }
  transform(t) {
    return new tt({
      ...D(this._def),
      schema: this,
      typeName: L.ZodEffects,
      effect: { type: "transform", transform: t },
    });
  }
  default(t) {
    const n = typeof t == "function" ? t : () => t;
    return new ri({
      ...D(this._def),
      innerType: this,
      defaultValue: n,
      typeName: L.ZodDefault,
    });
  }
  brand() {
    return new va({ typeName: L.ZodBranded, type: this, ...D(this._def) });
  }
  catch(t) {
    const n = typeof t == "function" ? t : () => t;
    return new ii({
      ...D(this._def),
      innerType: this,
      catchValue: n,
      typeName: L.ZodCatch,
    });
  }
  describe(t) {
    const n = this.constructor;
    return new n({ ...this._def, description: t });
  }
  pipe(t) {
    return di.create(this, t);
  }
  readonly() {
    return li.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const bm = /^c[^\s-]{8,}$/i,
  ev = /^[0-9a-z]+$/,
  tv = /^[0-9A-HJKMNP-TV-Z]{26}$/,
  nv =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  rv = /^[a-z0-9_-]{21}$/i,
  iv =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  lv =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  ov = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let _o;
const sv =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  av =
    /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  uv = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  pf =
    "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
  cv = new RegExp(`^${pf}$`);
function hf(e) {
  let t = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return (
    e.precision
      ? (t = `${t}\\.\\d{${e.precision}}`)
      : e.precision == null && (t = `${t}(\\.\\d+)?`),
    t
  );
}
function dv(e) {
  return new RegExp(`^${hf(e)}$`);
}
function mf(e) {
  let t = `${pf}T${hf(e)}`;
  const n = [];
  return (
    n.push(e.local ? "Z?" : "Z"),
    e.offset && n.push("([+-]\\d{2}:?\\d{2})"),
    (t = `${t}(${n.join("|")})`),
    new RegExp(`^${t}$`)
  );
}
function fv(e, t) {
  return !!(
    ((t === "v4" || !t) && sv.test(e)) ||
    ((t === "v6" || !t) && av.test(e))
  );
}
class Xe extends U {
  _parse(t) {
    if (
      (this._def.coerce && (t.data = String(t.data)),
      this._getType(t) !== T.string)
    ) {
      const l = this._getOrReturnCtx(t);
      return (
        C(l, {
          code: k.invalid_type,
          expected: T.string,
          received: l.parsedType,
        }),
        M
      );
    }
    const r = new we();
    let i;
    for (const l of this._def.checks)
      if (l.kind === "min")
        t.data.length < l.value &&
          ((i = this._getOrReturnCtx(t, i)),
          C(i, {
            code: k.too_small,
            minimum: l.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: l.message,
          }),
          r.dirty());
      else if (l.kind === "max")
        t.data.length > l.value &&
          ((i = this._getOrReturnCtx(t, i)),
          C(i, {
            code: k.too_big,
            maximum: l.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: l.message,
          }),
          r.dirty());
      else if (l.kind === "length") {
        const o = t.data.length > l.value,
          s = t.data.length < l.value;
        (o || s) &&
          ((i = this._getOrReturnCtx(t, i)),
          o
            ? C(i, {
                code: k.too_big,
                maximum: l.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: l.message,
              })
            : s &&
              C(i, {
                code: k.too_small,
                minimum: l.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: l.message,
              }),
          r.dirty());
      } else if (l.kind === "email")
        lv.test(t.data) ||
          ((i = this._getOrReturnCtx(t, i)),
          C(i, {
            validation: "email",
            code: k.invalid_string,
            message: l.message,
          }),
          r.dirty());
      else if (l.kind === "emoji")
        _o || (_o = new RegExp(ov, "u")),
          _o.test(t.data) ||
            ((i = this._getOrReturnCtx(t, i)),
            C(i, {
              validation: "emoji",
              code: k.invalid_string,
              message: l.message,
            }),
            r.dirty());
      else if (l.kind === "uuid")
        nv.test(t.data) ||
          ((i = this._getOrReturnCtx(t, i)),
          C(i, {
            validation: "uuid",
            code: k.invalid_string,
            message: l.message,
          }),
          r.dirty());
      else if (l.kind === "nanoid")
        rv.test(t.data) ||
          ((i = this._getOrReturnCtx(t, i)),
          C(i, {
            validation: "nanoid",
            code: k.invalid_string,
            message: l.message,
          }),
          r.dirty());
      else if (l.kind === "cuid")
        bm.test(t.data) ||
          ((i = this._getOrReturnCtx(t, i)),
          C(i, {
            validation: "cuid",
            code: k.invalid_string,
            message: l.message,
          }),
          r.dirty());
      else if (l.kind === "cuid2")
        ev.test(t.data) ||
          ((i = this._getOrReturnCtx(t, i)),
          C(i, {
            validation: "cuid2",
            code: k.invalid_string,
            message: l.message,
          }),
          r.dirty());
      else if (l.kind === "ulid")
        tv.test(t.data) ||
          ((i = this._getOrReturnCtx(t, i)),
          C(i, {
            validation: "ulid",
            code: k.invalid_string,
            message: l.message,
          }),
          r.dirty());
      else if (l.kind === "url")
        try {
          new URL(t.data);
        } catch {
          (i = this._getOrReturnCtx(t, i)),
            C(i, {
              validation: "url",
              code: k.invalid_string,
              message: l.message,
            }),
            r.dirty();
        }
      else
        l.kind === "regex"
          ? ((l.regex.lastIndex = 0),
            l.regex.test(t.data) ||
              ((i = this._getOrReturnCtx(t, i)),
              C(i, {
                validation: "regex",
                code: k.invalid_string,
                message: l.message,
              }),
              r.dirty()))
          : l.kind === "trim"
            ? (t.data = t.data.trim())
            : l.kind === "includes"
              ? t.data.includes(l.value, l.position) ||
                ((i = this._getOrReturnCtx(t, i)),
                C(i, {
                  code: k.invalid_string,
                  validation: { includes: l.value, position: l.position },
                  message: l.message,
                }),
                r.dirty())
              : l.kind === "toLowerCase"
                ? (t.data = t.data.toLowerCase())
                : l.kind === "toUpperCase"
                  ? (t.data = t.data.toUpperCase())
                  : l.kind === "startsWith"
                    ? t.data.startsWith(l.value) ||
                      ((i = this._getOrReturnCtx(t, i)),
                      C(i, {
                        code: k.invalid_string,
                        validation: { startsWith: l.value },
                        message: l.message,
                      }),
                      r.dirty())
                    : l.kind === "endsWith"
                      ? t.data.endsWith(l.value) ||
                        ((i = this._getOrReturnCtx(t, i)),
                        C(i, {
                          code: k.invalid_string,
                          validation: { endsWith: l.value },
                          message: l.message,
                        }),
                        r.dirty())
                      : l.kind === "datetime"
                        ? mf(l).test(t.data) ||
                          ((i = this._getOrReturnCtx(t, i)),
                          C(i, {
                            code: k.invalid_string,
                            validation: "datetime",
                            message: l.message,
                          }),
                          r.dirty())
                        : l.kind === "date"
                          ? cv.test(t.data) ||
                            ((i = this._getOrReturnCtx(t, i)),
                            C(i, {
                              code: k.invalid_string,
                              validation: "date",
                              message: l.message,
                            }),
                            r.dirty())
                          : l.kind === "time"
                            ? dv(l).test(t.data) ||
                              ((i = this._getOrReturnCtx(t, i)),
                              C(i, {
                                code: k.invalid_string,
                                validation: "time",
                                message: l.message,
                              }),
                              r.dirty())
                            : l.kind === "duration"
                              ? iv.test(t.data) ||
                                ((i = this._getOrReturnCtx(t, i)),
                                C(i, {
                                  validation: "duration",
                                  code: k.invalid_string,
                                  message: l.message,
                                }),
                                r.dirty())
                              : l.kind === "ip"
                                ? fv(t.data, l.version) ||
                                  ((i = this._getOrReturnCtx(t, i)),
                                  C(i, {
                                    validation: "ip",
                                    code: k.invalid_string,
                                    message: l.message,
                                  }),
                                  r.dirty())
                                : l.kind === "base64"
                                  ? uv.test(t.data) ||
                                    ((i = this._getOrReturnCtx(t, i)),
                                    C(i, {
                                      validation: "base64",
                                      code: k.invalid_string,
                                      message: l.message,
                                    }),
                                    r.dirty())
                                  : Z.assertNever(l);
    return { status: r.value, value: t.data };
  }
  _regex(t, n, r) {
    return this.refinement((i) => t.test(i), {
      validation: n,
      code: k.invalid_string,
      ...z.errToObj(r),
    });
  }
  _addCheck(t) {
    return new Xe({ ...this._def, checks: [...this._def.checks, t] });
  }
  email(t) {
    return this._addCheck({ kind: "email", ...z.errToObj(t) });
  }
  url(t) {
    return this._addCheck({ kind: "url", ...z.errToObj(t) });
  }
  emoji(t) {
    return this._addCheck({ kind: "emoji", ...z.errToObj(t) });
  }
  uuid(t) {
    return this._addCheck({ kind: "uuid", ...z.errToObj(t) });
  }
  nanoid(t) {
    return this._addCheck({ kind: "nanoid", ...z.errToObj(t) });
  }
  cuid(t) {
    return this._addCheck({ kind: "cuid", ...z.errToObj(t) });
  }
  cuid2(t) {
    return this._addCheck({ kind: "cuid2", ...z.errToObj(t) });
  }
  ulid(t) {
    return this._addCheck({ kind: "ulid", ...z.errToObj(t) });
  }
  base64(t) {
    return this._addCheck({ kind: "base64", ...z.errToObj(t) });
  }
  ip(t) {
    return this._addCheck({ kind: "ip", ...z.errToObj(t) });
  }
  datetime(t) {
    var n, r;
    return typeof t == "string"
      ? this._addCheck({
          kind: "datetime",
          precision: null,
          offset: !1,
          local: !1,
          message: t,
        })
      : this._addCheck({
          kind: "datetime",
          precision:
            typeof (t == null ? void 0 : t.precision) > "u"
              ? null
              : t == null
                ? void 0
                : t.precision,
          offset:
            (n = t == null ? void 0 : t.offset) !== null && n !== void 0
              ? n
              : !1,
          local:
            (r = t == null ? void 0 : t.local) !== null && r !== void 0
              ? r
              : !1,
          ...z.errToObj(t == null ? void 0 : t.message),
        });
  }
  date(t) {
    return this._addCheck({ kind: "date", message: t });
  }
  time(t) {
    return typeof t == "string"
      ? this._addCheck({ kind: "time", precision: null, message: t })
      : this._addCheck({
          kind: "time",
          precision:
            typeof (t == null ? void 0 : t.precision) > "u"
              ? null
              : t == null
                ? void 0
                : t.precision,
          ...z.errToObj(t == null ? void 0 : t.message),
        });
  }
  duration(t) {
    return this._addCheck({ kind: "duration", ...z.errToObj(t) });
  }
  regex(t, n) {
    return this._addCheck({ kind: "regex", regex: t, ...z.errToObj(n) });
  }
  includes(t, n) {
    return this._addCheck({
      kind: "includes",
      value: t,
      position: n == null ? void 0 : n.position,
      ...z.errToObj(n == null ? void 0 : n.message),
    });
  }
  startsWith(t, n) {
    return this._addCheck({ kind: "startsWith", value: t, ...z.errToObj(n) });
  }
  endsWith(t, n) {
    return this._addCheck({ kind: "endsWith", value: t, ...z.errToObj(n) });
  }
  min(t, n) {
    return this._addCheck({ kind: "min", value: t, ...z.errToObj(n) });
  }
  max(t, n) {
    return this._addCheck({ kind: "max", value: t, ...z.errToObj(n) });
  }
  length(t, n) {
    return this._addCheck({ kind: "length", value: t, ...z.errToObj(n) });
  }
  nonempty(t) {
    return this.min(1, z.errToObj(t));
  }
  trim() {
    return new Xe({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }],
    });
  }
  toLowerCase() {
    return new Xe({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }],
    });
  }
  toUpperCase() {
    return new Xe({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((t) => t.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((t) => t.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((t) => t.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((t) => t.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((t) => t.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((t) => t.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((t) => t.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((t) => t.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((t) => t.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((t) => t.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((t) => t.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((t) => t.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((t) => t.kind === "ip");
  }
  get isBase64() {
    return !!this._def.checks.find((t) => t.kind === "base64");
  }
  get minLength() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxLength() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
}
Xe.create = (e) => {
  var t;
  return new Xe({
    checks: [],
    typeName: L.ZodString,
    coerce:
      (t = e == null ? void 0 : e.coerce) !== null && t !== void 0 ? t : !1,
    ...D(e),
  });
};
function pv(e, t) {
  const n = (e.toString().split(".")[1] || "").length,
    r = (t.toString().split(".")[1] || "").length,
    i = n > r ? n : r,
    l = parseInt(e.toFixed(i).replace(".", "")),
    o = parseInt(t.toFixed(i).replace(".", ""));
  return (l % o) / Math.pow(10, i);
}
class Ht extends U {
  constructor() {
    super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf);
  }
  _parse(t) {
    if (
      (this._def.coerce && (t.data = Number(t.data)),
      this._getType(t) !== T.number)
    ) {
      const l = this._getOrReturnCtx(t);
      return (
        C(l, {
          code: k.invalid_type,
          expected: T.number,
          received: l.parsedType,
        }),
        M
      );
    }
    let r;
    const i = new we();
    for (const l of this._def.checks)
      l.kind === "int"
        ? Z.isInteger(t.data) ||
          ((r = this._getOrReturnCtx(t, r)),
          C(r, {
            code: k.invalid_type,
            expected: "integer",
            received: "float",
            message: l.message,
          }),
          i.dirty())
        : l.kind === "min"
          ? (l.inclusive ? t.data < l.value : t.data <= l.value) &&
            ((r = this._getOrReturnCtx(t, r)),
            C(r, {
              code: k.too_small,
              minimum: l.value,
              type: "number",
              inclusive: l.inclusive,
              exact: !1,
              message: l.message,
            }),
            i.dirty())
          : l.kind === "max"
            ? (l.inclusive ? t.data > l.value : t.data >= l.value) &&
              ((r = this._getOrReturnCtx(t, r)),
              C(r, {
                code: k.too_big,
                maximum: l.value,
                type: "number",
                inclusive: l.inclusive,
                exact: !1,
                message: l.message,
              }),
              i.dirty())
            : l.kind === "multipleOf"
              ? pv(t.data, l.value) !== 0 &&
                ((r = this._getOrReturnCtx(t, r)),
                C(r, {
                  code: k.not_multiple_of,
                  multipleOf: l.value,
                  message: l.message,
                }),
                i.dirty())
              : l.kind === "finite"
                ? Number.isFinite(t.data) ||
                  ((r = this._getOrReturnCtx(t, r)),
                  C(r, { code: k.not_finite, message: l.message }),
                  i.dirty())
                : Z.assertNever(l);
    return { status: i.value, value: t.data };
  }
  gte(t, n) {
    return this.setLimit("min", t, !0, z.toString(n));
  }
  gt(t, n) {
    return this.setLimit("min", t, !1, z.toString(n));
  }
  lte(t, n) {
    return this.setLimit("max", t, !0, z.toString(n));
  }
  lt(t, n) {
    return this.setLimit("max", t, !1, z.toString(n));
  }
  setLimit(t, n, r, i) {
    return new Ht({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: t, value: n, inclusive: r, message: z.toString(i) },
      ],
    });
  }
  _addCheck(t) {
    return new Ht({ ...this._def, checks: [...this._def.checks, t] });
  }
  int(t) {
    return this._addCheck({ kind: "int", message: z.toString(t) });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: z.toString(t),
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: z.toString(t),
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: z.toString(t),
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: z.toString(t),
    });
  }
  multipleOf(t, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: z.toString(n),
    });
  }
  finite(t) {
    return this._addCheck({ kind: "finite", message: z.toString(t) });
  }
  safe(t) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: z.toString(t),
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: z.toString(t),
    });
  }
  get minValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
  get isInt() {
    return !!this._def.checks.find(
      (t) =>
        t.kind === "int" || (t.kind === "multipleOf" && Z.isInteger(t.value)),
    );
  }
  get isFinite() {
    let t = null,
      n = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min"
        ? (n === null || r.value > n) && (n = r.value)
        : r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    }
    return Number.isFinite(n) && Number.isFinite(t);
  }
}
Ht.create = (e) =>
  new Ht({
    checks: [],
    typeName: L.ZodNumber,
    coerce: (e == null ? void 0 : e.coerce) || !1,
    ...D(e),
  });
class Qt extends U {
  constructor() {
    super(...arguments), (this.min = this.gte), (this.max = this.lte);
  }
  _parse(t) {
    if (
      (this._def.coerce && (t.data = BigInt(t.data)),
      this._getType(t) !== T.bigint)
    ) {
      const l = this._getOrReturnCtx(t);
      return (
        C(l, {
          code: k.invalid_type,
          expected: T.bigint,
          received: l.parsedType,
        }),
        M
      );
    }
    let r;
    const i = new we();
    for (const l of this._def.checks)
      l.kind === "min"
        ? (l.inclusive ? t.data < l.value : t.data <= l.value) &&
          ((r = this._getOrReturnCtx(t, r)),
          C(r, {
            code: k.too_small,
            type: "bigint",
            minimum: l.value,
            inclusive: l.inclusive,
            message: l.message,
          }),
          i.dirty())
        : l.kind === "max"
          ? (l.inclusive ? t.data > l.value : t.data >= l.value) &&
            ((r = this._getOrReturnCtx(t, r)),
            C(r, {
              code: k.too_big,
              type: "bigint",
              maximum: l.value,
              inclusive: l.inclusive,
              message: l.message,
            }),
            i.dirty())
          : l.kind === "multipleOf"
            ? t.data % l.value !== BigInt(0) &&
              ((r = this._getOrReturnCtx(t, r)),
              C(r, {
                code: k.not_multiple_of,
                multipleOf: l.value,
                message: l.message,
              }),
              i.dirty())
            : Z.assertNever(l);
    return { status: i.value, value: t.data };
  }
  gte(t, n) {
    return this.setLimit("min", t, !0, z.toString(n));
  }
  gt(t, n) {
    return this.setLimit("min", t, !1, z.toString(n));
  }
  lte(t, n) {
    return this.setLimit("max", t, !0, z.toString(n));
  }
  lt(t, n) {
    return this.setLimit("max", t, !1, z.toString(n));
  }
  setLimit(t, n, r, i) {
    return new Qt({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: t, value: n, inclusive: r, message: z.toString(i) },
      ],
    });
  }
  _addCheck(t) {
    return new Qt({ ...this._def, checks: [...this._def.checks, t] });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: z.toString(t),
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: z.toString(t),
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: z.toString(t),
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: z.toString(t),
    });
  }
  multipleOf(t, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: z.toString(n),
    });
  }
  get minValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
}
Qt.create = (e) => {
  var t;
  return new Qt({
    checks: [],
    typeName: L.ZodBigInt,
    coerce:
      (t = e == null ? void 0 : e.coerce) !== null && t !== void 0 ? t : !1,
    ...D(e),
  });
};
class Yr extends U {
  _parse(t) {
    if (
      (this._def.coerce && (t.data = !!t.data), this._getType(t) !== T.boolean)
    ) {
      const r = this._getOrReturnCtx(t);
      return (
        C(r, {
          code: k.invalid_type,
          expected: T.boolean,
          received: r.parsedType,
        }),
        M
      );
    }
    return Ce(t.data);
  }
}
Yr.create = (e) =>
  new Yr({
    typeName: L.ZodBoolean,
    coerce: (e == null ? void 0 : e.coerce) || !1,
    ...D(e),
  });
class vn extends U {
  _parse(t) {
    if (
      (this._def.coerce && (t.data = new Date(t.data)),
      this._getType(t) !== T.date)
    ) {
      const l = this._getOrReturnCtx(t);
      return (
        C(l, {
          code: k.invalid_type,
          expected: T.date,
          received: l.parsedType,
        }),
        M
      );
    }
    if (isNaN(t.data.getTime())) {
      const l = this._getOrReturnCtx(t);
      return C(l, { code: k.invalid_date }), M;
    }
    const r = new we();
    let i;
    for (const l of this._def.checks)
      l.kind === "min"
        ? t.data.getTime() < l.value &&
          ((i = this._getOrReturnCtx(t, i)),
          C(i, {
            code: k.too_small,
            message: l.message,
            inclusive: !0,
            exact: !1,
            minimum: l.value,
            type: "date",
          }),
          r.dirty())
        : l.kind === "max"
          ? t.data.getTime() > l.value &&
            ((i = this._getOrReturnCtx(t, i)),
            C(i, {
              code: k.too_big,
              message: l.message,
              inclusive: !0,
              exact: !1,
              maximum: l.value,
              type: "date",
            }),
            r.dirty())
          : Z.assertNever(l);
    return { status: r.value, value: new Date(t.data.getTime()) };
  }
  _addCheck(t) {
    return new vn({ ...this._def, checks: [...this._def.checks, t] });
  }
  min(t, n) {
    return this._addCheck({
      kind: "min",
      value: t.getTime(),
      message: z.toString(n),
    });
  }
  max(t, n) {
    return this._addCheck({
      kind: "max",
      value: t.getTime(),
      message: z.toString(n),
    });
  }
  get minDate() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t != null ? new Date(t) : null;
  }
  get maxDate() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t != null ? new Date(t) : null;
  }
}
vn.create = (e) =>
  new vn({
    checks: [],
    coerce: (e == null ? void 0 : e.coerce) || !1,
    typeName: L.ZodDate,
    ...D(e),
  });
class gl extends U {
  _parse(t) {
    if (this._getType(t) !== T.symbol) {
      const r = this._getOrReturnCtx(t);
      return (
        C(r, {
          code: k.invalid_type,
          expected: T.symbol,
          received: r.parsedType,
        }),
        M
      );
    }
    return Ce(t.data);
  }
}
gl.create = (e) => new gl({ typeName: L.ZodSymbol, ...D(e) });
class Gr extends U {
  _parse(t) {
    if (this._getType(t) !== T.undefined) {
      const r = this._getOrReturnCtx(t);
      return (
        C(r, {
          code: k.invalid_type,
          expected: T.undefined,
          received: r.parsedType,
        }),
        M
      );
    }
    return Ce(t.data);
  }
}
Gr.create = (e) => new Gr({ typeName: L.ZodUndefined, ...D(e) });
class Xr extends U {
  _parse(t) {
    if (this._getType(t) !== T.null) {
      const r = this._getOrReturnCtx(t);
      return (
        C(r, {
          code: k.invalid_type,
          expected: T.null,
          received: r.parsedType,
        }),
        M
      );
    }
    return Ce(t.data);
  }
}
Xr.create = (e) => new Xr({ typeName: L.ZodNull, ...D(e) });
class Jn extends U {
  constructor() {
    super(...arguments), (this._any = !0);
  }
  _parse(t) {
    return Ce(t.data);
  }
}
Jn.create = (e) => new Jn({ typeName: L.ZodAny, ...D(e) });
class cn extends U {
  constructor() {
    super(...arguments), (this._unknown = !0);
  }
  _parse(t) {
    return Ce(t.data);
  }
}
cn.create = (e) => new cn({ typeName: L.ZodUnknown, ...D(e) });
class kt extends U {
  _parse(t) {
    const n = this._getOrReturnCtx(t);
    return (
      C(n, { code: k.invalid_type, expected: T.never, received: n.parsedType }),
      M
    );
  }
}
kt.create = (e) => new kt({ typeName: L.ZodNever, ...D(e) });
class xl extends U {
  _parse(t) {
    if (this._getType(t) !== T.undefined) {
      const r = this._getOrReturnCtx(t);
      return (
        C(r, {
          code: k.invalid_type,
          expected: T.void,
          received: r.parsedType,
        }),
        M
      );
    }
    return Ce(t.data);
  }
}
xl.create = (e) => new xl({ typeName: L.ZodVoid, ...D(e) });
class be extends U {
  _parse(t) {
    const { ctx: n, status: r } = this._processInputParams(t),
      i = this._def;
    if (n.parsedType !== T.array)
      return (
        C(n, {
          code: k.invalid_type,
          expected: T.array,
          received: n.parsedType,
        }),
        M
      );
    if (i.exactLength !== null) {
      const o = n.data.length > i.exactLength.value,
        s = n.data.length < i.exactLength.value;
      (o || s) &&
        (C(n, {
          code: o ? k.too_big : k.too_small,
          minimum: s ? i.exactLength.value : void 0,
          maximum: o ? i.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: i.exactLength.message,
        }),
        r.dirty());
    }
    if (
      (i.minLength !== null &&
        n.data.length < i.minLength.value &&
        (C(n, {
          code: k.too_small,
          minimum: i.minLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: i.minLength.message,
        }),
        r.dirty()),
      i.maxLength !== null &&
        n.data.length > i.maxLength.value &&
        (C(n, {
          code: k.too_big,
          maximum: i.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: i.maxLength.message,
        }),
        r.dirty()),
      n.common.async)
    )
      return Promise.all(
        [...n.data].map((o, s) => i.type._parseAsync(new at(n, o, n.path, s))),
      ).then((o) => we.mergeArray(r, o));
    const l = [...n.data].map((o, s) =>
      i.type._parseSync(new at(n, o, n.path, s)),
    );
    return we.mergeArray(r, l);
  }
  get element() {
    return this._def.type;
  }
  min(t, n) {
    return new be({
      ...this._def,
      minLength: { value: t, message: z.toString(n) },
    });
  }
  max(t, n) {
    return new be({
      ...this._def,
      maxLength: { value: t, message: z.toString(n) },
    });
  }
  length(t, n) {
    return new be({
      ...this._def,
      exactLength: { value: t, message: z.toString(n) },
    });
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
be.create = (e, t) =>
  new be({
    type: e,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: L.ZodArray,
    ...D(t),
  });
function kn(e) {
  if (e instanceof J) {
    const t = {};
    for (const n in e.shape) {
      const r = e.shape[n];
      t[n] = st.create(kn(r));
    }
    return new J({ ...e._def, shape: () => t });
  } else
    return e instanceof be
      ? new be({ ...e._def, type: kn(e.element) })
      : e instanceof st
        ? st.create(kn(e.unwrap()))
        : e instanceof Yt
          ? Yt.create(kn(e.unwrap()))
          : e instanceof ut
            ? ut.create(e.items.map((t) => kn(t)))
            : e;
}
class J extends U {
  constructor() {
    super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend);
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const t = this._def.shape(),
      n = Z.objectKeys(t);
    return (this._cached = { shape: t, keys: n });
  }
  _parse(t) {
    if (this._getType(t) !== T.object) {
      const u = this._getOrReturnCtx(t);
      return (
        C(u, {
          code: k.invalid_type,
          expected: T.object,
          received: u.parsedType,
        }),
        M
      );
    }
    const { status: r, ctx: i } = this._processInputParams(t),
      { shape: l, keys: o } = this._getCached(),
      s = [];
    if (
      !(this._def.catchall instanceof kt && this._def.unknownKeys === "strip")
    )
      for (const u in i.data) o.includes(u) || s.push(u);
    const a = [];
    for (const u of o) {
      const d = l[u],
        p = i.data[u];
      a.push({
        key: { status: "valid", value: u },
        value: d._parse(new at(i, p, i.path, u)),
        alwaysSet: u in i.data,
      });
    }
    if (this._def.catchall instanceof kt) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const d of s)
          a.push({
            key: { status: "valid", value: d },
            value: { status: "valid", value: i.data[d] },
          });
      else if (u === "strict")
        s.length > 0 &&
          (C(i, { code: k.unrecognized_keys, keys: s }), r.dirty());
      else if (u !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const d of s) {
        const p = i.data[d];
        a.push({
          key: { status: "valid", value: d },
          value: u._parse(new at(i, p, i.path, d)),
          alwaysSet: d in i.data,
        });
      }
    }
    return i.common.async
      ? Promise.resolve()
          .then(async () => {
            const u = [];
            for (const d of a) {
              const p = await d.key,
                m = await d.value;
              u.push({ key: p, value: m, alwaysSet: d.alwaysSet });
            }
            return u;
          })
          .then((u) => we.mergeObjectSync(r, u))
      : we.mergeObjectSync(r, a);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return (
      z.errToObj,
      new J({
        ...this._def,
        unknownKeys: "strict",
        ...(t !== void 0
          ? {
              errorMap: (n, r) => {
                var i, l, o, s;
                const a =
                  (o =
                    (l = (i = this._def).errorMap) === null || l === void 0
                      ? void 0
                      : l.call(i, n, r).message) !== null && o !== void 0
                    ? o
                    : r.defaultError;
                return n.code === "unrecognized_keys"
                  ? {
                      message:
                        (s = z.errToObj(t).message) !== null && s !== void 0
                          ? s
                          : a,
                    }
                  : { message: a };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new J({ ...this._def, unknownKeys: "strip" });
  }
  passthrough() {
    return new J({ ...this._def, unknownKeys: "passthrough" });
  }
  extend(t) {
    return new J({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...t }),
    });
  }
  merge(t) {
    return new J({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({ ...this._def.shape(), ...t._def.shape() }),
      typeName: L.ZodObject,
    });
  }
  setKey(t, n) {
    return this.augment({ [t]: n });
  }
  catchall(t) {
    return new J({ ...this._def, catchall: t });
  }
  pick(t) {
    const n = {};
    return (
      Z.objectKeys(t).forEach((r) => {
        t[r] && this.shape[r] && (n[r] = this.shape[r]);
      }),
      new J({ ...this._def, shape: () => n })
    );
  }
  omit(t) {
    const n = {};
    return (
      Z.objectKeys(this.shape).forEach((r) => {
        t[r] || (n[r] = this.shape[r]);
      }),
      new J({ ...this._def, shape: () => n })
    );
  }
  deepPartial() {
    return kn(this);
  }
  partial(t) {
    const n = {};
    return (
      Z.objectKeys(this.shape).forEach((r) => {
        const i = this.shape[r];
        t && !t[r] ? (n[r] = i) : (n[r] = i.optional());
      }),
      new J({ ...this._def, shape: () => n })
    );
  }
  required(t) {
    const n = {};
    return (
      Z.objectKeys(this.shape).forEach((r) => {
        if (t && !t[r]) n[r] = this.shape[r];
        else {
          let l = this.shape[r];
          for (; l instanceof st; ) l = l._def.innerType;
          n[r] = l;
        }
      }),
      new J({ ...this._def, shape: () => n })
    );
  }
  keyof() {
    return vf(Z.objectKeys(this.shape));
  }
}
J.create = (e, t) =>
  new J({
    shape: () => e,
    unknownKeys: "strip",
    catchall: kt.create(),
    typeName: L.ZodObject,
    ...D(t),
  });
J.strictCreate = (e, t) =>
  new J({
    shape: () => e,
    unknownKeys: "strict",
    catchall: kt.create(),
    typeName: L.ZodObject,
    ...D(t),
  });
J.lazycreate = (e, t) =>
  new J({
    shape: e,
    unknownKeys: "strip",
    catchall: kt.create(),
    typeName: L.ZodObject,
    ...D(t),
  });
class Jr extends U {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t),
      r = this._def.options;
    function i(l) {
      for (const s of l) if (s.result.status === "valid") return s.result;
      for (const s of l)
        if (s.result.status === "dirty")
          return n.common.issues.push(...s.ctx.common.issues), s.result;
      const o = l.map((s) => new De(s.ctx.common.issues));
      return C(n, { code: k.invalid_union, unionErrors: o }), M;
    }
    if (n.common.async)
      return Promise.all(
        r.map(async (l) => {
          const o = { ...n, common: { ...n.common, issues: [] }, parent: null };
          return {
            result: await l._parseAsync({
              data: n.data,
              path: n.path,
              parent: o,
            }),
            ctx: o,
          };
        }),
      ).then(i);
    {
      let l;
      const o = [];
      for (const a of r) {
        const u = { ...n, common: { ...n.common, issues: [] }, parent: null },
          d = a._parseSync({ data: n.data, path: n.path, parent: u });
        if (d.status === "valid") return d;
        d.status === "dirty" && !l && (l = { result: d, ctx: u }),
          u.common.issues.length && o.push(u.common.issues);
      }
      if (l) return n.common.issues.push(...l.ctx.common.issues), l.result;
      const s = o.map((a) => new De(a));
      return C(n, { code: k.invalid_union, unionErrors: s }), M;
    }
  }
  get options() {
    return this._def.options;
  }
}
Jr.create = (e, t) => new Jr({ options: e, typeName: L.ZodUnion, ...D(t) });
const ct = (e) =>
  e instanceof ei
    ? ct(e.schema)
    : e instanceof tt
      ? ct(e.innerType())
      : e instanceof ti
        ? [e.value]
        : e instanceof Kt
          ? e.options
          : e instanceof ni
            ? Z.objectValues(e.enum)
            : e instanceof ri
              ? ct(e._def.innerType)
              : e instanceof Gr
                ? [void 0]
                : e instanceof Xr
                  ? [null]
                  : e instanceof st
                    ? [void 0, ...ct(e.unwrap())]
                    : e instanceof Yt
                      ? [null, ...ct(e.unwrap())]
                      : e instanceof va || e instanceof li
                        ? ct(e.unwrap())
                        : e instanceof ii
                          ? ct(e._def.innerType)
                          : [];
class Bl extends U {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== T.object)
      return (
        C(n, {
          code: k.invalid_type,
          expected: T.object,
          received: n.parsedType,
        }),
        M
      );
    const r = this.discriminator,
      i = n.data[r],
      l = this.optionsMap.get(i);
    return l
      ? n.common.async
        ? l._parseAsync({ data: n.data, path: n.path, parent: n })
        : l._parseSync({ data: n.data, path: n.path, parent: n })
      : (C(n, {
          code: k.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [r],
        }),
        M);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(t, n, r) {
    const i = new Map();
    for (const l of n) {
      const o = ct(l.shape[t]);
      if (!o.length)
        throw new Error(
          `A discriminator value for key \`${t}\` could not be extracted from all schema options`,
        );
      for (const s of o) {
        if (i.has(s))
          throw new Error(
            `Discriminator property ${String(t)} has duplicate value ${String(s)}`,
          );
        i.set(s, l);
      }
    }
    return new Bl({
      typeName: L.ZodDiscriminatedUnion,
      discriminator: t,
      options: n,
      optionsMap: i,
      ...D(r),
    });
  }
}
function _s(e, t) {
  const n = Rt(e),
    r = Rt(t);
  if (e === t) return { valid: !0, data: e };
  if (n === T.object && r === T.object) {
    const i = Z.objectKeys(t),
      l = Z.objectKeys(e).filter((s) => i.indexOf(s) !== -1),
      o = { ...e, ...t };
    for (const s of l) {
      const a = _s(e[s], t[s]);
      if (!a.valid) return { valid: !1 };
      o[s] = a.data;
    }
    return { valid: !0, data: o };
  } else if (n === T.array && r === T.array) {
    if (e.length !== t.length) return { valid: !1 };
    const i = [];
    for (let l = 0; l < e.length; l++) {
      const o = e[l],
        s = t[l],
        a = _s(o, s);
      if (!a.valid) return { valid: !1 };
      i.push(a.data);
    }
    return { valid: !0, data: i };
  } else
    return n === T.date && r === T.date && +e == +t
      ? { valid: !0, data: e }
      : { valid: !1 };
}
class qr extends U {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t),
      i = (l, o) => {
        if (gs(l) || gs(o)) return M;
        const s = _s(l.value, o.value);
        return s.valid
          ? ((xs(l) || xs(o)) && n.dirty(), { status: n.value, value: s.data })
          : (C(r, { code: k.invalid_intersection_types }), M);
      };
    return r.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseAsync({
            data: r.data,
            path: r.path,
            parent: r,
          }),
        ]).then(([l, o]) => i(l, o))
      : i(
          this._def.left._parseSync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseSync({ data: r.data, path: r.path, parent: r }),
        );
  }
}
qr.create = (e, t, n) =>
  new qr({ left: e, right: t, typeName: L.ZodIntersection, ...D(n) });
class ut extends U {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== T.array)
      return (
        C(r, {
          code: k.invalid_type,
          expected: T.array,
          received: r.parsedType,
        }),
        M
      );
    if (r.data.length < this._def.items.length)
      return (
        C(r, {
          code: k.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array",
        }),
        M
      );
    !this._def.rest &&
      r.data.length > this._def.items.length &&
      (C(r, {
        code: k.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array",
      }),
      n.dirty());
    const l = [...r.data]
      .map((o, s) => {
        const a = this._def.items[s] || this._def.rest;
        return a ? a._parse(new at(r, o, r.path, s)) : null;
      })
      .filter((o) => !!o);
    return r.common.async
      ? Promise.all(l).then((o) => we.mergeArray(n, o))
      : we.mergeArray(n, l);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new ut({ ...this._def, rest: t });
  }
}
ut.create = (e, t) => {
  if (!Array.isArray(e))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new ut({ items: e, typeName: L.ZodTuple, rest: null, ...D(t) });
};
class br extends U {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== T.object)
      return (
        C(r, {
          code: k.invalid_type,
          expected: T.object,
          received: r.parsedType,
        }),
        M
      );
    const i = [],
      l = this._def.keyType,
      o = this._def.valueType;
    for (const s in r.data)
      i.push({
        key: l._parse(new at(r, s, r.path, s)),
        value: o._parse(new at(r, r.data[s], r.path, s)),
        alwaysSet: s in r.data,
      });
    return r.common.async
      ? we.mergeObjectAsync(n, i)
      : we.mergeObjectSync(n, i);
  }
  get element() {
    return this._def.valueType;
  }
  static create(t, n, r) {
    return n instanceof U
      ? new br({ keyType: t, valueType: n, typeName: L.ZodRecord, ...D(r) })
      : new br({
          keyType: Xe.create(),
          valueType: t,
          typeName: L.ZodRecord,
          ...D(n),
        });
  }
}
class _l extends U {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== T.map)
      return (
        C(r, { code: k.invalid_type, expected: T.map, received: r.parsedType }),
        M
      );
    const i = this._def.keyType,
      l = this._def.valueType,
      o = [...r.data.entries()].map(([s, a], u) => ({
        key: i._parse(new at(r, s, r.path, [u, "key"])),
        value: l._parse(new at(r, a, r.path, [u, "value"])),
      }));
    if (r.common.async) {
      const s = new Map();
      return Promise.resolve().then(async () => {
        for (const a of o) {
          const u = await a.key,
            d = await a.value;
          if (u.status === "aborted" || d.status === "aborted") return M;
          (u.status === "dirty" || d.status === "dirty") && n.dirty(),
            s.set(u.value, d.value);
        }
        return { status: n.value, value: s };
      });
    } else {
      const s = new Map();
      for (const a of o) {
        const u = a.key,
          d = a.value;
        if (u.status === "aborted" || d.status === "aborted") return M;
        (u.status === "dirty" || d.status === "dirty") && n.dirty(),
          s.set(u.value, d.value);
      }
      return { status: n.value, value: s };
    }
  }
}
_l.create = (e, t, n) =>
  new _l({ valueType: t, keyType: e, typeName: L.ZodMap, ...D(n) });
class yn extends U {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== T.set)
      return (
        C(r, { code: k.invalid_type, expected: T.set, received: r.parsedType }),
        M
      );
    const i = this._def;
    i.minSize !== null &&
      r.data.size < i.minSize.value &&
      (C(r, {
        code: k.too_small,
        minimum: i.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: i.minSize.message,
      }),
      n.dirty()),
      i.maxSize !== null &&
        r.data.size > i.maxSize.value &&
        (C(r, {
          code: k.too_big,
          maximum: i.maxSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: i.maxSize.message,
        }),
        n.dirty());
    const l = this._def.valueType;
    function o(a) {
      const u = new Set();
      for (const d of a) {
        if (d.status === "aborted") return M;
        d.status === "dirty" && n.dirty(), u.add(d.value);
      }
      return { status: n.value, value: u };
    }
    const s = [...r.data.values()].map((a, u) =>
      l._parse(new at(r, a, r.path, u)),
    );
    return r.common.async ? Promise.all(s).then((a) => o(a)) : o(s);
  }
  min(t, n) {
    return new yn({
      ...this._def,
      minSize: { value: t, message: z.toString(n) },
    });
  }
  max(t, n) {
    return new yn({
      ...this._def,
      maxSize: { value: t, message: z.toString(n) },
    });
  }
  size(t, n) {
    return this.min(t, n).max(t, n);
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
yn.create = (e, t) =>
  new yn({
    valueType: e,
    minSize: null,
    maxSize: null,
    typeName: L.ZodSet,
    ...D(t),
  });
class Zn extends U {
  constructor() {
    super(...arguments), (this.validate = this.implement);
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== T.function)
      return (
        C(n, {
          code: k.invalid_type,
          expected: T.function,
          received: n.parsedType,
        }),
        M
      );
    function r(s, a) {
      return vl({
        data: s,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          ml(),
          Xn,
        ].filter((u) => !!u),
        issueData: { code: k.invalid_arguments, argumentsError: a },
      });
    }
    function i(s, a) {
      return vl({
        data: s,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          ml(),
          Xn,
        ].filter((u) => !!u),
        issueData: { code: k.invalid_return_type, returnTypeError: a },
      });
    }
    const l = { errorMap: n.common.contextualErrorMap },
      o = n.data;
    if (this._def.returns instanceof qn) {
      const s = this;
      return Ce(async function (...a) {
        const u = new De([]),
          d = await s._def.args.parseAsync(a, l).catch((y) => {
            throw (u.addIssue(r(a, y)), u);
          }),
          p = await Reflect.apply(o, this, d);
        return await s._def.returns._def.type.parseAsync(p, l).catch((y) => {
          throw (u.addIssue(i(p, y)), u);
        });
      });
    } else {
      const s = this;
      return Ce(function (...a) {
        const u = s._def.args.safeParse(a, l);
        if (!u.success) throw new De([r(a, u.error)]);
        const d = Reflect.apply(o, this, u.data),
          p = s._def.returns.safeParse(d, l);
        if (!p.success) throw new De([i(d, p.error)]);
        return p.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...t) {
    return new Zn({ ...this._def, args: ut.create(t).rest(cn.create()) });
  }
  returns(t) {
    return new Zn({ ...this._def, returns: t });
  }
  implement(t) {
    return this.parse(t);
  }
  strictImplement(t) {
    return this.parse(t);
  }
  static create(t, n, r) {
    return new Zn({
      args: t || ut.create([]).rest(cn.create()),
      returns: n || cn.create(),
      typeName: L.ZodFunction,
      ...D(r),
    });
  }
}
class ei extends U {
  get schema() {
    return this._def.getter();
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
ei.create = (e, t) => new ei({ getter: e, typeName: L.ZodLazy, ...D(t) });
class ti extends U {
  _parse(t) {
    if (t.data !== this._def.value) {
      const n = this._getOrReturnCtx(t);
      return (
        C(n, {
          received: n.data,
          code: k.invalid_literal,
          expected: this._def.value,
        }),
        M
      );
    }
    return { status: "valid", value: t.data };
  }
  get value() {
    return this._def.value;
  }
}
ti.create = (e, t) => new ti({ value: e, typeName: L.ZodLiteral, ...D(t) });
function vf(e, t) {
  return new Kt({ values: e, typeName: L.ZodEnum, ...D(t) });
}
class Kt extends U {
  constructor() {
    super(...arguments), vr.set(this, void 0);
  }
  _parse(t) {
    if (typeof t.data != "string") {
      const n = this._getOrReturnCtx(t),
        r = this._def.values;
      return (
        C(n, {
          expected: Z.joinValues(r),
          received: n.parsedType,
          code: k.invalid_type,
        }),
        M
      );
    }
    if (
      (yl(this, vr) || ff(this, vr, new Set(this._def.values)),
      !yl(this, vr).has(t.data))
    ) {
      const n = this._getOrReturnCtx(t),
        r = this._def.values;
      return (
        C(n, { received: n.data, code: k.invalid_enum_value, options: r }), M
      );
    }
    return Ce(t.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  get Values() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  get Enum() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  extract(t, n = this._def) {
    return Kt.create(t, { ...this._def, ...n });
  }
  exclude(t, n = this._def) {
    return Kt.create(
      this.options.filter((r) => !t.includes(r)),
      { ...this._def, ...n },
    );
  }
}
vr = new WeakMap();
Kt.create = vf;
class ni extends U {
  constructor() {
    super(...arguments), yr.set(this, void 0);
  }
  _parse(t) {
    const n = Z.getValidEnumValues(this._def.values),
      r = this._getOrReturnCtx(t);
    if (r.parsedType !== T.string && r.parsedType !== T.number) {
      const i = Z.objectValues(n);
      return (
        C(r, {
          expected: Z.joinValues(i),
          received: r.parsedType,
          code: k.invalid_type,
        }),
        M
      );
    }
    if (
      (yl(this, yr) ||
        ff(this, yr, new Set(Z.getValidEnumValues(this._def.values))),
      !yl(this, yr).has(t.data))
    ) {
      const i = Z.objectValues(n);
      return (
        C(r, { received: r.data, code: k.invalid_enum_value, options: i }), M
      );
    }
    return Ce(t.data);
  }
  get enum() {
    return this._def.values;
  }
}
yr = new WeakMap();
ni.create = (e, t) => new ni({ values: e, typeName: L.ZodNativeEnum, ...D(t) });
class qn extends U {
  unwrap() {
    return this._def.type;
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== T.promise && n.common.async === !1)
      return (
        C(n, {
          code: k.invalid_type,
          expected: T.promise,
          received: n.parsedType,
        }),
        M
      );
    const r = n.parsedType === T.promise ? n.data : Promise.resolve(n.data);
    return Ce(
      r.then((i) =>
        this._def.type.parseAsync(i, {
          path: n.path,
          errorMap: n.common.contextualErrorMap,
        }),
      ),
    );
  }
}
qn.create = (e, t) => new qn({ type: e, typeName: L.ZodPromise, ...D(t) });
class tt extends U {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === L.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t),
      i = this._def.effect || null,
      l = {
        addIssue: (o) => {
          C(r, o), o.fatal ? n.abort() : n.dirty();
        },
        get path() {
          return r.path;
        },
      };
    if (((l.addIssue = l.addIssue.bind(l)), i.type === "preprocess")) {
      const o = i.transform(r.data, l);
      if (r.common.async)
        return Promise.resolve(o).then(async (s) => {
          if (n.value === "aborted") return M;
          const a = await this._def.schema._parseAsync({
            data: s,
            path: r.path,
            parent: r,
          });
          return a.status === "aborted"
            ? M
            : a.status === "dirty" || n.value === "dirty"
              ? Mn(a.value)
              : a;
        });
      {
        if (n.value === "aborted") return M;
        const s = this._def.schema._parseSync({
          data: o,
          path: r.path,
          parent: r,
        });
        return s.status === "aborted"
          ? M
          : s.status === "dirty" || n.value === "dirty"
            ? Mn(s.value)
            : s;
      }
    }
    if (i.type === "refinement") {
      const o = (s) => {
        const a = i.refinement(s, l);
        if (r.common.async) return Promise.resolve(a);
        if (a instanceof Promise)
          throw new Error(
            "Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        return s;
      };
      if (r.common.async === !1) {
        const s = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r,
        });
        return s.status === "aborted"
          ? M
          : (s.status === "dirty" && n.dirty(),
            o(s.value),
            { status: n.value, value: s.value });
      } else
        return this._def.schema
          ._parseAsync({ data: r.data, path: r.path, parent: r })
          .then((s) =>
            s.status === "aborted"
              ? M
              : (s.status === "dirty" && n.dirty(),
                o(s.value).then(() => ({ status: n.value, value: s.value }))),
          );
    }
    if (i.type === "transform")
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r,
        });
        if (!Qr(o)) return o;
        const s = i.transform(o.value, l);
        if (s instanceof Promise)
          throw new Error(
            "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        return { status: n.value, value: s };
      } else
        return this._def.schema
          ._parseAsync({ data: r.data, path: r.path, parent: r })
          .then((o) =>
            Qr(o)
              ? Promise.resolve(i.transform(o.value, l)).then((s) => ({
                  status: n.value,
                  value: s,
                }))
              : o,
          );
    Z.assertNever(i);
  }
}
tt.create = (e, t, n) =>
  new tt({ schema: e, typeName: L.ZodEffects, effect: t, ...D(n) });
tt.createWithPreprocess = (e, t, n) =>
  new tt({
    schema: t,
    effect: { type: "preprocess", transform: e },
    typeName: L.ZodEffects,
    ...D(n),
  });
class st extends U {
  _parse(t) {
    return this._getType(t) === T.undefined
      ? Ce(void 0)
      : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
st.create = (e, t) =>
  new st({ innerType: e, typeName: L.ZodOptional, ...D(t) });
class Yt extends U {
  _parse(t) {
    return this._getType(t) === T.null
      ? Ce(null)
      : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Yt.create = (e, t) =>
  new Yt({ innerType: e, typeName: L.ZodNullable, ...D(t) });
class ri extends U {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    let r = n.data;
    return (
      n.parsedType === T.undefined && (r = this._def.defaultValue()),
      this._def.innerType._parse({ data: r, path: n.path, parent: n })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ri.create = (e, t) =>
  new ri({
    innerType: e,
    typeName: L.ZodDefault,
    defaultValue: typeof t.default == "function" ? t.default : () => t.default,
    ...D(t),
  });
class ii extends U {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t),
      r = { ...n, common: { ...n.common, issues: [] } },
      i = this._def.innerType._parse({
        data: r.data,
        path: r.path,
        parent: { ...r },
      });
    return Kr(i)
      ? i.then((l) => ({
          status: "valid",
          value:
            l.status === "valid"
              ? l.value
              : this._def.catchValue({
                  get error() {
                    return new De(r.common.issues);
                  },
                  input: r.data,
                }),
        }))
      : {
          status: "valid",
          value:
            i.status === "valid"
              ? i.value
              : this._def.catchValue({
                  get error() {
                    return new De(r.common.issues);
                  },
                  input: r.data,
                }),
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ii.create = (e, t) =>
  new ii({
    innerType: e,
    typeName: L.ZodCatch,
    catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
    ...D(t),
  });
class wl extends U {
  _parse(t) {
    if (this._getType(t) !== T.nan) {
      const r = this._getOrReturnCtx(t);
      return (
        C(r, { code: k.invalid_type, expected: T.nan, received: r.parsedType }),
        M
      );
    }
    return { status: "valid", value: t.data };
  }
}
wl.create = (e) => new wl({ typeName: L.ZodNaN, ...D(e) });
const hv = Symbol("zod_brand");
class va extends U {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t),
      r = n.data;
    return this._def.type._parse({ data: r, path: n.path, parent: n });
  }
  unwrap() {
    return this._def.type;
  }
}
class di extends U {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.common.async)
      return (async () => {
        const l = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r,
        });
        return l.status === "aborted"
          ? M
          : l.status === "dirty"
            ? (n.dirty(), Mn(l.value))
            : this._def.out._parseAsync({
                data: l.value,
                path: r.path,
                parent: r,
              });
      })();
    {
      const i = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r,
      });
      return i.status === "aborted"
        ? M
        : i.status === "dirty"
          ? (n.dirty(), { status: "dirty", value: i.value })
          : this._def.out._parseSync({
              data: i.value,
              path: r.path,
              parent: r,
            });
    }
  }
  static create(t, n) {
    return new di({ in: t, out: n, typeName: L.ZodPipeline });
  }
}
class li extends U {
  _parse(t) {
    const n = this._def.innerType._parse(t),
      r = (i) => (Qr(i) && (i.value = Object.freeze(i.value)), i);
    return Kr(n) ? n.then((i) => r(i)) : r(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
li.create = (e, t) =>
  new li({ innerType: e, typeName: L.ZodReadonly, ...D(t) });
function yf(e, t = {}, n) {
  return e
    ? Jn.create().superRefine((r, i) => {
        var l, o;
        if (!e(r)) {
          const s =
              typeof t == "function"
                ? t(r)
                : typeof t == "string"
                  ? { message: t }
                  : t,
            a =
              (o = (l = s.fatal) !== null && l !== void 0 ? l : n) !== null &&
              o !== void 0
                ? o
                : !0,
            u = typeof s == "string" ? { message: s } : s;
          i.addIssue({ code: "custom", ...u, fatal: a });
        }
      })
    : Jn.create();
}
const mv = { object: J.lazycreate };
var L;
(function (e) {
  (e.ZodString = "ZodString"),
    (e.ZodNumber = "ZodNumber"),
    (e.ZodNaN = "ZodNaN"),
    (e.ZodBigInt = "ZodBigInt"),
    (e.ZodBoolean = "ZodBoolean"),
    (e.ZodDate = "ZodDate"),
    (e.ZodSymbol = "ZodSymbol"),
    (e.ZodUndefined = "ZodUndefined"),
    (e.ZodNull = "ZodNull"),
    (e.ZodAny = "ZodAny"),
    (e.ZodUnknown = "ZodUnknown"),
    (e.ZodNever = "ZodNever"),
    (e.ZodVoid = "ZodVoid"),
    (e.ZodArray = "ZodArray"),
    (e.ZodObject = "ZodObject"),
    (e.ZodUnion = "ZodUnion"),
    (e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
    (e.ZodIntersection = "ZodIntersection"),
    (e.ZodTuple = "ZodTuple"),
    (e.ZodRecord = "ZodRecord"),
    (e.ZodMap = "ZodMap"),
    (e.ZodSet = "ZodSet"),
    (e.ZodFunction = "ZodFunction"),
    (e.ZodLazy = "ZodLazy"),
    (e.ZodLiteral = "ZodLiteral"),
    (e.ZodEnum = "ZodEnum"),
    (e.ZodEffects = "ZodEffects"),
    (e.ZodNativeEnum = "ZodNativeEnum"),
    (e.ZodOptional = "ZodOptional"),
    (e.ZodNullable = "ZodNullable"),
    (e.ZodDefault = "ZodDefault"),
    (e.ZodCatch = "ZodCatch"),
    (e.ZodPromise = "ZodPromise"),
    (e.ZodBranded = "ZodBranded"),
    (e.ZodPipeline = "ZodPipeline"),
    (e.ZodReadonly = "ZodReadonly");
})(L || (L = {}));
const vv = (e, t = { message: `Input not instance of ${e.name}` }) =>
    yf((n) => n instanceof e, t),
  gf = Xe.create,
  xf = Ht.create,
  yv = wl.create,
  gv = Qt.create,
  _f = Yr.create,
  xv = vn.create,
  _v = gl.create,
  wv = Gr.create,
  kv = Xr.create,
  Sv = Jn.create,
  Cv = cn.create,
  Ev = kt.create,
  Nv = xl.create,
  Tv = be.create,
  Pv = J.create,
  jv = J.strictCreate,
  Ov = Jr.create,
  Rv = Bl.create,
  zv = qr.create,
  Iv = ut.create,
  Lv = br.create,
  Mv = _l.create,
  Dv = yn.create,
  $v = Zn.create,
  Uv = ei.create,
  Fv = ti.create,
  Av = Kt.create,
  Vv = ni.create,
  Zv = qn.create,
  Lu = tt.create,
  Bv = st.create,
  Wv = Yt.create,
  Hv = tt.createWithPreprocess,
  Qv = di.create,
  Kv = () => gf().optional(),
  Yv = () => xf().optional(),
  Gv = () => _f().optional(),
  Xv = {
    string: (e) => Xe.create({ ...e, coerce: !0 }),
    number: (e) => Ht.create({ ...e, coerce: !0 }),
    boolean: (e) => Yr.create({ ...e, coerce: !0 }),
    bigint: (e) => Qt.create({ ...e, coerce: !0 }),
    date: (e) => vn.create({ ...e, coerce: !0 }),
  },
  Jv = M;
var B = Object.freeze({
  __proto__: null,
  defaultErrorMap: Xn,
  setErrorMap: Jm,
  getErrorMap: ml,
  makeIssue: vl,
  EMPTY_PATH: qm,
  addIssueToContext: C,
  ParseStatus: we,
  INVALID: M,
  DIRTY: Mn,
  OK: Ce,
  isAborted: gs,
  isDirty: xs,
  isValid: Qr,
  isAsync: Kr,
  get util() {
    return Z;
  },
  get objectUtil() {
    return ys;
  },
  ZodParsedType: T,
  getParsedType: Rt,
  ZodType: U,
  datetimeRegex: mf,
  ZodString: Xe,
  ZodNumber: Ht,
  ZodBigInt: Qt,
  ZodBoolean: Yr,
  ZodDate: vn,
  ZodSymbol: gl,
  ZodUndefined: Gr,
  ZodNull: Xr,
  ZodAny: Jn,
  ZodUnknown: cn,
  ZodNever: kt,
  ZodVoid: xl,
  ZodArray: be,
  ZodObject: J,
  ZodUnion: Jr,
  ZodDiscriminatedUnion: Bl,
  ZodIntersection: qr,
  ZodTuple: ut,
  ZodRecord: br,
  ZodMap: _l,
  ZodSet: yn,
  ZodFunction: Zn,
  ZodLazy: ei,
  ZodLiteral: ti,
  ZodEnum: Kt,
  ZodNativeEnum: ni,
  ZodPromise: qn,
  ZodEffects: tt,
  ZodTransformer: tt,
  ZodOptional: st,
  ZodNullable: Yt,
  ZodDefault: ri,
  ZodCatch: ii,
  ZodNaN: wl,
  BRAND: hv,
  ZodBranded: va,
  ZodPipeline: di,
  ZodReadonly: li,
  custom: yf,
  Schema: U,
  ZodSchema: U,
  late: mv,
  get ZodFirstPartyTypeKind() {
    return L;
  },
  coerce: Xv,
  any: Sv,
  array: Tv,
  bigint: gv,
  boolean: _f,
  date: xv,
  discriminatedUnion: Rv,
  effect: Lu,
  enum: Av,
  function: $v,
  instanceof: vv,
  intersection: zv,
  lazy: Uv,
  literal: Fv,
  map: Mv,
  nan: yv,
  nativeEnum: Vv,
  never: Ev,
  null: kv,
  nullable: Wv,
  number: xf,
  object: Pv,
  oboolean: Gv,
  onumber: Yv,
  optional: Bv,
  ostring: Kv,
  pipeline: Qv,
  preprocess: Hv,
  promise: Zv,
  record: Lv,
  set: Dv,
  strictObject: jv,
  string: gf,
  symbol: _v,
  transformer: Lu,
  tuple: Iv,
  undefined: wv,
  union: Ov,
  unknown: Cv,
  void: Nv,
  NEVER: Jv,
  ZodIssueCode: k,
  quotelessJson: Xm,
  ZodError: De,
});
const qv = B.object({
    discounted_price: B.number(),
    final_price: B.number(),
    handle: B.string(),
    id: B.number(),
    image: B.string(),
    key: B.string(),
    line_price: B.number(),
    product_id: B.number(),
    product_title: B.string(),
    quantity: B.number(),
    title: B.string(),
    url: B.string(),
    variant_id: B.number(),
  }),
  bv = B.object({
    token: B.string(),
    currency: B.string(),
    item_count: B.number(),
    total_price: B.number(),
    items: B.array(qv),
  }),
  ey = () => {
    const [e, t] = E.useState();
    return (
      E.useEffect(() => {
        fetch("/cart.js")
          .then((n) => n.json())
          .then((n) => {
            const r = bv.parse(n);
            t(r);
          })
          .catch((n) => console.error("Error fetching cart data:", n));
      }, []),
      e
    );
  };
function fi() {
  return "https://financenonplus.cpro-server.de";
}
function ty() {
  return `${fi()}/notify/efiNonPlus`;
}
const Mu = (e, t, n, r, i) => {
    const {
        city: l,
        email: o,
        firstName: s,
        housenumber: a,
        lastName: u,
        street: d,
        zipCode: p,
        mobile: m,
        salutation: y,
      } = e,
      { pluginCredentials: _, pluginConfigurator: x } = r,
      { campaign: S, campaignDuration: f } = x,
      c = {
        vendorid: _.vendorId,
        order_id: n,
        order_amount: (t / 100).toFixed(2).replace(".", ","),
        salutation: y,
        firstname: s,
        lastname: u,
        mobile: m,
        email: o,
        zip: p,
        city: l,
        street: d,
        housenumber: a,
        shopbrandname: i,
        notifyURL: ty(),
      },
      h =
        S && f
          ? new URLSearchParams({ ...c, campaign: S, campaignduration: f })
          : new URLSearchParams({ ...c });
    return console.log("https://finanzieren..", h.toString()), h;
  },
  ny = B.object({
    vendorId: B.string(),
    appMode: B.boolean(),
    shop: B.string(),
  }),
  ry = B.object({
    shop: B.string().nullable(),
    appMode: B.boolean(),
    minOrderValue: B.string().nullable(),
    terms: B.string().nullable(),
    campaign: B.string().nullable(),
    interestRate: B.string().nullable(),
    campaignDuration: B.string().nullable(),
  }),
  iy = B.object({ pluginCredentials: ny, pluginConfigurator: ry }),
  ly = ({ shop: e }) => {
    const [t, n] = E.useState();
    return (
      E.useEffect(() => {
        if (!e) return;
        (async () => {
          try {
            const i = new URLSearchParams({ shop: e }),
              l = `${fi()}/api/getPluginConfData?${i}`,
              o = await fetch(l, { method: "GET" });
            if (!o.ok) throw new Error(`HTTP error! Status: ${o.status}`);
            const s = await o.json(),
              a = iy.parse(s);
            return n(a), a;
          } catch (i) {
            console.error("Error fetching AppConfig:", i);
          }
        })();
      }, []),
      t
    );
  };
var wf = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  Du = vt.createContext && vt.createContext(wf),
  oy = ["attr", "size", "title"];
function sy(e, t) {
  if (e == null) return {};
  var n = ay(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e);
    for (i = 0; i < l.length; i++)
      (r = l[i]),
        !(t.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (n[r] = e[r]);
  }
  return n;
}
function ay(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function kl() {
  return (
    (kl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    kl.apply(this, arguments)
  );
}
function $u(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Sl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? $u(Object(n), !0).forEach(function (r) {
          uy(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : $u(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function uy(e, t, n) {
  return (
    (t = cy(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function cy(e) {
  var t = dy(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function dy(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function kf(e) {
  return (
    e &&
    e.map((t, n) =>
      vt.createElement(t.tag, Sl({ key: n }, t.attr), kf(t.child)),
    )
  );
}
function Wl(e) {
  return (t) =>
    vt.createElement(fy, kl({ attr: Sl({}, e.attr) }, t), kf(e.child));
}
function fy(e) {
  var t = (n) => {
    var { attr: r, size: i, title: l } = e,
      o = sy(e, oy),
      s = i || n.size || "1em",
      a;
    return (
      n.className && (a = n.className),
      e.className && (a = (a ? a + " " : "") + e.className),
      vt.createElement(
        "svg",
        kl(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          n.attr,
          r,
          o,
          {
            className: a,
            style: Sl(Sl({ color: e.color || n.color }, n.style), e.style),
            height: s,
            width: s,
            xmlns: "http://www.w3.org/2000/svg",
          },
        ),
        l && vt.createElement("title", null, l),
        e.children,
      )
    );
  };
  return Du !== void 0
    ? vt.createElement(Du.Consumer, null, (n) => t(n))
    : t(wf);
}
function py(e) {
  return Wl({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z",
        },
        child: [],
      },
    ],
  })(e);
}
function hy(e) {
  return Wl({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z",
        },
        child: [],
      },
    ],
  })(e);
}
function my(e) {
  return Wl({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z",
        },
        child: [],
      },
    ],
  })(e);
}
function Sf(e) {
  return Wl({
    tag: "svg",
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M235.4 172.2c0-11.4 9.3-19.9 20.5-19.9 11.4 0 20.7 8.5 20.7 19.9s-9.3 20-20.7 20c-11.2 0-20.5-8.6-20.5-20zm1.4 35.7H275V352h-38.2V207.9z",
        },
        child: [],
      },
      {
        tag: "path",
        attr: {
          d: "M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z",
        },
        child: [],
      },
    ],
  })(e);
}
const Cf = ({ text: e }) =>
    v.jsx(v.Fragment, {
      children: v.jsx("div", {
        style: { visibility: "hidden" },
        className:
          "absolute bottom-full mb-[8px] w-max max-w-[320px] p-[12px] text-[14px] text-left text-white bg-gray-900 rounded-[8px] shadow-md transition-opacity duration-200 group-hover:!visible dark:bg-gray-700",
        children: e,
      }),
    }),
  Ef = ({ children: e, title: t, toolTipContent: n, fill: r }) =>
    v.jsxs("div", {
      className: `w-full flex flex-col ${r ? "h-full" : ""}`,
      children: [
        t &&
          v.jsxs("div", {
            className:
              "bg-[#2cb484] p-[16px] flex items-center justify-center rounded-t-lg",
            children: [
              v.jsx("h2", {
                className:
                  "text-white font-semibold text-[16px] text-center w-full",
                children: t,
              }),
              n &&
                v.jsxs("div", {
                  className: "ml-auto",
                  "data-tooltip-placement": "left",
                  "data-tooltip-target": "tooltip-left",
                  "data-tooltip-trigger": "hover",
                  children: [v.jsx(Sf, { size: 22 }), v.jsx(Cf, { text: n })],
                }),
            ],
          }),
        e,
      ],
    }),
  Nf = ({ size: e = "24" }) =>
    v.jsx("div", {
      className:
        "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
      style: { height: `${e}px`, width: `${e}px` },
      role: "status",
      children: v.jsx("span", {
        className:
          "!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]",
        children: "Loading...",
      }),
    }),
  vy = ({
    cartData: e,
    handleUpdateItemQuantity: t,
    handleDeleteCartItem: n,
    shippingPrice: r,
  }) => {
    const i = ["Image", "Quantity", "TItle", "Price", "Actions"];
    return v.jsx(Ef, {
      title: "Artikel aus dem Warenkorb",
      children: v.jsx("div", {
        className: "overflow-x-auto shadow-md sm:rounded-[8px]",
        children: v.jsxs("table", {
          className: "min-w-full text-[14px] divide-y divide-gray-200",
          children: [
            v.jsx("thead", {
              className: "bg-gray-50",
              children: v.jsx("tr", {
                children: i.map((l, o) =>
                  v.jsx(
                    "th",
                    {
                      scope: "col",
                      className:
                        "px-[24px] py-[12px] text-left font-medium text-gray-500 uppercase tracking-wider",
                      children: l,
                    },
                    `${o}-${l}`,
                  ),
                ),
              }),
            }),
            v.jsxs("tbody", {
              className: "bg-white divide-y divide-gray-200",
              children: [
                e.items.map((l, o) =>
                  v.jsxs(
                    "tr",
                    {
                      children: [
                        v.jsx("td", {
                          className: "px-[24px] py-[16px] whitespace-nowrap",
                          children: v.jsx("img", {
                            src: l.image,
                            alt: l.title,
                            className: "h-[40px] w-[40px] rounded-full",
                          }),
                        }),
                        v.jsx("td", {
                          className:
                            "px-[24px] py-[16px] whitespace-nowrap text-gray-900",
                          children: v.jsxs("div", {
                            className: "flex items-center",
                            children: [
                              v.jsx("button", {
                                onClick: () => t(l),
                                className: `p-[4px] mr-[8px] rounded-full border-0 ${l.quantity <= 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:text-gray-700"}`,
                                disabled: l.quantity <= 1,
                                children: v.jsx(py, {}),
                              }),
                              v.jsx("span", { children: l.quantity }),
                              v.jsx("button", {
                                onClick: () => t(l, "plus"),
                                className:
                                  "p-[4px] ml-[8px] rounded-full border-0 text-gray-500 hover:text-gray-700",
                                children: v.jsx(hy, {}),
                              }),
                            ],
                          }),
                        }),
                        v.jsx("td", {
                          className:
                            "px-[24px] py-[16px] font-medium text-gray-900 break-words",
                          children: l.title,
                        }),
                        v.jsxs("td", {
                          className:
                            "px-[24px] py-[16px] whitespace-nowrap text-gray-500",
                          children: ["€", (l.line_price / 100).toFixed(2)],
                        }),
                        v.jsx("td", {
                          className:
                            "px-[24px] py-[16px] whitespace-nowrap text-gray-500",
                          children: v.jsx("button", {
                            onClick: () => n(l),
                            className:
                              "p-[4px] rounded-full border-0 text-red-500 hover:text-red-700",
                            children: v.jsx(my, {}),
                          }),
                        }),
                      ],
                    },
                    o,
                  ),
                ),
                v.jsxs("tr", {
                  children: [
                    v.jsx("td", {
                      colSpan: 3,
                      className:
                        "px-[24px] py-[16px] text-right font-medium text-gray-900",
                      children: v.jsxs("div", {
                        className: "flex gap-[2px] items-center justify-end",
                        children: [
                          v.jsxs("div", {
                            className: "group relative",
                            children: [
                              v.jsx(Sf, { size: 16 }),
                              v.jsx(Cf, {
                                text: "Please provide the street, city, and zip code in order to calculate the shipping cost.",
                              }),
                            ],
                          }),
                          v.jsx("span", { children: "Shipping Cost" }),
                        ],
                      }),
                    }),
                    v.jsx("td", {
                      className:
                        "px-[24px] py-[16px] text-gray-500 flex items-center",
                      children: r
                        ? `€${Number(r).toFixed(2)}`
                        : v.jsx(Nf, { size: "18" }),
                    }),
                    v.jsx("td", { className: "px-[24px] py-[16px]" }),
                    " ",
                  ],
                }),
                v.jsxs("tr", {
                  children: [
                    v.jsx("td", {
                      colSpan: 3,
                      className:
                        "px-[24px] py-[16px] text-right font-medium text-gray-900",
                      children: "Total",
                    }),
                    v.jsxs("td", {
                      className: "px-[24px] py-[16px] text-gray-500",
                      children: [
                        "€",
                        (Number(e.total_price) / 100 + Number(r)).toFixed(2),
                      ],
                    }),
                    v.jsx("td", { className: "px-[24px] py-[16px]" }),
                    " ",
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    });
  },
  yy = ({
    handleChange: e,
    name: t,
    options: n,
    defaultText: r,
    label: i,
    selectedValue: l,
    disabled: o = !1,
    hidden: s = !1,
    required: a = !1,
  }) =>
    v.jsxs("div", {
      className: "flex flex-col gap-[2px]",
      children: [
        i && v.jsx("label", { className: "", children: i }),
        v.jsxs("select", {
          name: t,
          id: t,
          onChange: (u) => e(u),
          value: l,
          disabled: o,
          required: a,
          className: `h-[40px] block w-full p-[6px] text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${s ? "hidden" : "visible"}`,
          children: [
            v.jsx("option", { disabled: !0, children: r }, 0),
            n.map((u) =>
              v.jsx(
                "option",
                {
                  value: u.id,
                  children: u.bezeichnung ? u.bezeichnung : u.text,
                },
                u.id,
              ),
            ),
          ],
        }),
      ],
    }),
  Nt = ({
    label: e,
    pattern: t,
    name: n,
    type: r = "text",
    hidden: i = !1,
    max: l,
    min: o,
    textFieldValue: s,
    required: a = !1,
    disabled: u = !1,
    handleOnChange: d,
    handleOnBlur: p,
    handleKeyDown: m,
  }) =>
    v.jsxs("div", {
      className: "flex flex-col gap-[2px]",
      children: [
        e && v.jsx("label", { className: "", children: e }),
        v.jsx("input", {
          id: n,
          name: n,
          type: r,
          max: l,
          min: o,
          pattern: t,
          className: `h-[40px] w-full p-[6px] border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 ${i ? "hidden" : "visible"}`,
          onChange: d,
          onBlur: p,
          onKeyDown: (y) => y.key === "Enter" && m && m(),
          value: s,
          required: a,
          disabled: u,
        }),
      ],
    }),
  gy = ({ clientFormData: e, handleInputChange: t, handleSelectChange: n }) =>
    v.jsx(v.Fragment, {
      children: v.jsx(Ef, {
        title: "Angaben zum Geschäftsführer",
        children: v.jsxs("div", {
          className:
            "overflow-x-auto shadow-md sm:rounded-lg p-[12px] flex flex-col gap-[16px]",
          children: [
            v.jsx(yy, {
              handleChange: n,
              name: "salutation",
              label: "Anrede",
              selectedValue: e.salutation,
              options: [
                { id: "HERR", bezeichnung: "Herr" },
                { id: "FRAU", bezeichnung: "Frau" },
              ],
              required: !0,
            }),
            v.jsxs("div", {
              className: "grid grid-cols-2 gap-[8px]",
              children: [
                v.jsx(Nt, {
                  name: "firstName",
                  label: "Vorname",
                  type: "text",
                  handleOnChange: t,
                  textFieldValue: e.firstName,
                  required: !0,
                }),
                v.jsx(Nt, {
                  name: "lastName",
                  label: "Familienname",
                  type: "text",
                  handleOnChange: t,
                  textFieldValue: e.lastName,
                  required: !0,
                }),
              ],
            }),
            v.jsxs("div", {
              className: "grid grid-cols-2 gap-[8px]",
              children: [
                v.jsx(Nt, {
                  name: "email",
                  label: "E-Mail",
                  type: "email",
                  handleOnChange: t,
                  textFieldValue: e.email,
                  required: !0,
                }),
                v.jsx(Nt, {
                  name: "mobile",
                  label: "Telefonnummer",
                  type: "tel",
                  handleOnChange: t,
                  textFieldValue: e.mobile,
                  required: !0,
                }),
              ],
            }),
            v.jsxs("div", {
              className: "grid grid-cols-2 gap-[8px]",
              children: [
                v.jsx(Nt, {
                  name: "street",
                  label: "Street",
                  type: "text",
                  handleOnChange: t,
                  textFieldValue: e.street,
                  required: !0,
                }),
                v.jsx(Nt, {
                  name: "housenumber",
                  label: "Hausnummer",
                  type: "text",
                  handleOnChange: t,
                  textFieldValue: e.housenumber,
                  required: !0,
                }),
              ],
            }),
            v.jsxs("div", {
              className: "grid grid-cols-2 gap-[8px]",
              children: [
                v.jsx(Nt, {
                  name: "zipCode",
                  label: "Postleitzahl",
                  type: "number",
                  min: 0,
                  pattern: "[0-9]{5}",
                  handleOnChange: t,
                  textFieldValue: e.zipCode,
                  required: !0,
                }),
                v.jsx(Nt, {
                  name: "city",
                  label: "Stadt",
                  type: "text",
                  handleOnChange: t,
                  textFieldValue: e.city,
                  required: !0,
                }),
              ],
            }),
          ],
        }),
      }),
    }),
  xy = ({ onSubmit: e, onClose: t, isLoading: n = !1 }) => {
    const r = document.getElementById("fowardShadowModal"),
      i = document.getElementById("fowardClientModal");
    return (
      console.log("shadowModal, modalContainer", i, r),
      r && i && (document.body.appendChild(r), document.body.appendChild(i)),
      v.jsx("div", {
        id: "fowardShadowModal",
        className:
          "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
        children: v.jsxs("div", {
          id: "fowardClientModal",
          className:
            "bg-gray-700 rounded-lg shadow p-[24px] w-full max-w-[512px]",
          children: [
            v.jsx("div", {
              className:
                "flex justify-between items-center border-b border-gray-600 pb-[16px] mb-[16px]",
              children: v.jsx("h3", {
                className: "text-[20px] font-semibold text-white",
                children: "Consors EFI Request",
              }),
            }),
            v.jsx("div", {
              className: "mb-[16px] text-left text-gray-200",
              children: n
                ? v.jsx("p", {
                    children:
                      "We are redirecting you to the Consors Finance webpage. Please wait.",
                  })
                : v.jsx("p", {
                    children:
                      'By clicking on "Senden" you will be redirected to the Consors Finance webpage, where you can submit a request for financing',
                  }),
            }),
            v.jsxs("div", {
              className: "flex justify-end gap-[16px]",
              children: [
                v.jsx("button", {
                  onClick: t,
                  disabled: n,
                  className:
                    "h-[48px] px-[16px] text-[14px] font-medium text-gray-200 bg-gray-800 border border-gray-600 rounded-[8px] hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 disabled:bg-gray-600",
                  children: "Abbrechen",
                }),
                v.jsx("button", {
                  onClick: (l) => {
                    e(l);
                  },
                  disabled: n,
                  className:
                    "h-[48px] px-[16px] text-[14px] font-medium text-white bg-[#2cb484] rounded-[8px] hover:bg-[#559880] focus:outline-none focus:ring-4 focus:bg-[#468871] disabled:bg-gray-600",
                  children: n ? v.jsx(Nf, {}) : "Senden",
                }),
              ],
            }),
          ],
        }),
      })
    );
  },
  _y = (e, t = 500) => {
    const n = E.useRef(void 0);
    return (...i) => {
      window.clearTimeout(n.current),
        (n.current = window.setTimeout(() => {
          e(...i);
        }, t));
    };
  },
  wy = ({ shippingAddress: e, cartData: t, shopDomain: n }) => {
    const [r, i] = E.useState({ city: "", street: "", zipCode: "" }),
      [l, o] = E.useState(""),
      s = E.useCallback(async () => {
        if (!e.city || !e.zipCode || !e.street || !t) return "";
        const a = t.items.map((y) => ({
            variantId: `gid://shopify/ProductVariant/${y.id}`,
            quantity: y.quantity,
          })),
          u = JSON.stringify({
            shop: n,
            shippingAddress: { ...e, countryCode: "DE" },
            lineItems: a,
          }),
          d = await fetch(`${fi()}/api/calculateShipping`, {
            method: "POST",
            body: u,
          });
        if (!d.ok) throw new Error(`HTTP error! Status: ${d.status}`);
        const p = await d.json(),
          { amount: m } =
            p.data.draftOrderCalculate.calculatedDraftOrder
              .availableShippingRates[0].price;
        o(m);
      }, [e, t]);
    return (
      E.useEffect(() => {
        if (
          e.city !== r.city ||
          e.street !== r.street ||
          e.zipCode !== r.zipCode
        ) {
          const a = setTimeout(() => {
            i({ city: e.city, street: e.street, zipCode: e.zipCode }), s();
          }, 500);
          return () => clearTimeout(a);
        }
      }, [e, s]),
      l
    );
  },
  ky = async (e, t, n, r, i) => {
    try {
      const l = Number(i) ? Number(i) : 0,
        o = JSON.stringify({
          shop: n,
          draftOrderData: { ...e, customerid: r, shippingPrice: l },
          lineItems: t,
        }),
        s = await fetch(`${fi()}/api/createDraftOrder`, {
          method: "POST",
          body: o,
        });
      if (!s.ok) throw new Error(`HTTP error! Status: ${s.status}`);
      return await s.json();
    } catch (l) {
      console.error("Error fetching AppConfig:", l);
    }
  },
  Sy = async (e, t, n) => {
    try {
      const r = new URLSearchParams({ shop: e, page: t, size: n }),
        i = `${fi()}/api/getSubscriptions?${r}`,
        l = await fetch(i, { method: "GET" });
      if (!l.ok) throw new Error(`HTTP error! Status: ${l.status}`);
      const o = await l.json();
      return console.log("subscriptonsResponse", o), o;
    } catch (r) {
      console.error("Error fetching AppConfig:", r);
    }
  },
  Cy = async () =>
    await (
      await fetch("/cart/clear.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    ).json(),
  Ey = async (e) =>
    await (
      await fetch("/cart/update.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates: e }),
      })
    ).json(),
  Ny = async (e) =>
    await (
      await fetch("/cart/update.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates: e }),
      })
    ).json();
var Uu, Fu;
const pt =
  ((Fu =
    (Uu = document.getElementById("cf-customer")) == null
      ? void 0
      : Uu.textContent) == null
    ? void 0
    : Fu.split(",")) ?? [];
var Au;
const Ty = {
    salutation: "HERR",
    firstName: pt[1] ?? "",
    lastName: pt[2] ?? "",
    housenumber: ((Au = pt[3]) == null ? void 0 : Au.replace(/\D/g, "")) ?? "",
    mobile: pt[6] ?? "",
    email: pt[7] ?? "",
  },
  Py = ({ cartData: e, pluginConfData: t, shopDomain: n }) => {
    var Ct;
    const r = Om(),
      [i, l] = E.useState(Ty),
      [o, s] = E.useState(
        ((Ct = pt[3]) == null ? void 0 : Ct.replace(/\d+/g, "")) ?? "",
      ),
      [a, u] = E.useState(pt[4] ?? ""),
      [d, p] = E.useState(pt[5] ?? ""),
      [m, y] = E.useState(!1),
      [_, x] = E.useState(!1),
      S = wy({
        cartData: e,
        shippingAddress: { city: d, street: o, zipCode: a },
        shopDomain: n,
      }),
      [f, c] = E.useState(e),
      h = _y((te, re) => {
        l((pe) => ({ ...pe, [te]: re }));
      }, 500),
      g = () => Object.values({ ...i }).every((re) => re.trim() !== ""),
      N = (te) => {
        const { name: re, value: pe } = te.target;
        re === "street"
          ? s(pe)
          : re === "zipCode"
            ? u(pe)
            : re === "city" && p(pe),
          ["street", "zipCode", "city"].includes(re)
            ? h(re, pe)
            : l({ ...i, [re]: pe });
      },
      O = (te) => {
        const { name: re, value: pe } = te.target;
        l({ ...i, [re]: pe });
      },
      R = async (te, re) => {
        const pe = { [te.id]: re ? te.quantity + 1 : te.quantity - 1 },
          qt = await Ey(pe);
        c(qt);
      },
      I = async (te) => {
        const re = { [te.id]: 0 },
          pe = await Ny(re);
        c(pe);
      },
      X = async () => {
        try {
          x(!0);
          const te = e.items.map((_n) => ({
              variantId: `gid://shopify/ProductVariant/${_n.id}`,
              quantity: _n.quantity,
            })),
            re = await ky(
              { ...i, city: d, street: o, zipCode: a },
              te,
              n,
              pt[0],
              S,
            ),
            { consorsOrderId: pe } = re,
            qt = Mu(
              { ...i, city: d, street: o, zipCode: a },
              e.total_price + Number(S) * 100,
              pe,
              t,
              n,
            );
          window.location.href = `https://finanzieren.consorsfinanz.de/web/ecommerce/gewuenschte-rate?${qt}`;
        } catch (te) {
          console.error(te);
        } finally {
          y(!1), await Cy(), x(!1);
        }
      },
      A = Mu(
        { ...i, city: d, street: o, zipCode: a },
        e.total_price + Number(S) * 100,
        "consorsOrderId",
        t,
        n,
      );
    console.log("https://finanzieren..", A.toString());
    const ze = async () => {
      await Sy(n, "102", "25");
    };
    return v.jsx(v.Fragment, {
      children: v.jsxs("div", {
        className: "max-w-[1280px] mx-auto px-[16px] pb-[20px]",
        children: [
          v.jsx(vy, {
            cartData: f,
            handleUpdateItemQuantity: R,
            handleDeleteCartItem: I,
            shippingPrice: S,
          }),
          v.jsx("div", {
            className: "mt-[20px]",
            children: v.jsx(gy, {
              clientFormData: { ...i, city: d, street: o, zipCode: a },
              handleInputChange: N,
              handleSelectChange: O,
            }),
          }),
          v.jsx("div", {
            className: "mt-[20px]",
            children: v.jsxs("div", {
              className: "flex items-center justify-between",
              children: [
                v.jsx("button", {
                  onClick: () => r(-1),
                  type: "button",
                  "data-modal-target": "static-modal",
                  id: "modal-button",
                  "data-modal-toggle": "static-modal",
                  className:
                    "text-white font-bold bg-orange-400 rounded-md p-[12px] w-[250px] hover:bg-orange-300 disabled:bg-gray-300 disabled:pointer-events-none",
                  children: "Zurück",
                }),
                v.jsx("button", {
                  onClick: () => y(!0),
                  type: "button",
                  disabled: !g(),
                  "data-modal-target": "static-modal",
                  id: "modal-button",
                  "data-modal-toggle": "static-modal",
                  className:
                    "text-white font-bold bg-[#2cb484] rounded-md p-[12px] w-[250px] hover:bg-[#5bb394] disabled:bg-gray-300 disabled:pointer-events-none",
                  children: "Senden",
                }),
                v.jsx("button", { onClick: ze, children: "FAKE" }),
              ],
            }),
          }),
          m && v.jsx(xy, { onClose: () => y(!1), onSubmit: X, isLoading: _ }),
        ],
      }),
    });
  };
function jy() {
  var r;
  const e =
      (r = document.getElementById("shopDomain")) == null
        ? void 0
        : r.textContent,
    t = ey(),
    n = ly({ shop: e ?? "" });
  return v.jsx(Ym, {
    children: v.jsx(Hm, {
      children: v.jsx(v.Fragment, {
        children:
          e && t && n
            ? v.jsx(ms, {
                path: "/pages/consors-efi",
                element: v.jsx(Py, {
                  cartData: t,
                  pluginConfData: n,
                  shopDomain: e,
                }),
              })
            : v.jsx(ms, {
                path: "/pages/albis-leasing",
                element: v.jsx(Gm, {}),
              }),
      }),
    }),
  });
}
wo.createRoot(document.getElementById("root")).render(
  v.jsx(vt.StrictMode, { children: v.jsx(jy, {}) }),
);
