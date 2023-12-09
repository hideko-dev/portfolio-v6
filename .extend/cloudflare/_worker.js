var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .extend/output/server/chunks/ssr.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a2, b2) {
  return a2 != a2 ? b2 == b2 : a2 !== b2 || a2 && typeof a2 === "object" || typeof a2 === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_current_component(component9) {
  current_component = component9;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function escape2(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i2 = pattern2.lastIndex - 1;
    const ch = str[i2];
    escaped2 += str.substring(last, i2) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i2 + 1;
  }
  return escaped2 + str.substring(last);
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component9, name) {
  if (!component9 || !component9.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component9;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css7) => css7.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape2(value, true)}"`;
  return ` ${name}${assignment}`;
}
var current_component, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_ssr = __esm({
  ".extend/output/server/chunks/ssr.js"() {
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .extend/output/server/chunks/index.js
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var subscriber_queue;
var init_chunks = __esm({
  ".extend/output/server/chunks/index.js"() {
    init_ssr();
    subscriber_queue = [];
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index9 = 0;
      while (index9 < str.length) {
        var eqIdx = str.indexOf("=", index9);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index9);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index9 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index9, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index9 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e3) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e3) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e3
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse3(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .extend/output/server/entries/pages/_layout.js
var layout_exports = {};
__export(layout_exports, {
  ssr: () => ssr
});
var ssr;
var init_layout = __esm({
  ".extend/output/server/entries/pages/_layout.js"() {
    ssr = true;
  }
});

// .extend/output/server/entries/pages/_layout.server.js
var layout_server_exports = {};
__export(layout_server_exports, {
  load: () => load
});
var load;
var init_layout_server = __esm({
  ".extend/output/server/entries/pages/_layout.server.js"() {
    load = async ({ url: { pathname } }) => {
      return { pathname };
    };
  }
});

// node_modules/@fortawesome/free-brands-svg-icons/index.mjs
var faDiscord, faLinkedin, faInstagram, faGithub;
var init_free_brands_svg_icons = __esm({
  "node_modules/@fortawesome/free-brands-svg-icons/index.mjs"() {
    faDiscord = {
      prefix: "fab",
      iconName: "discord",
      icon: [640, 512, [], "f392", "M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"]
    };
    faLinkedin = {
      prefix: "fab",
      iconName: "linkedin",
      icon: [448, 512, [], "f08c", "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"]
    };
    faInstagram = {
      prefix: "fab",
      iconName: "instagram",
      icon: [448, 512, [], "f16d", "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"]
    };
    faGithub = {
      prefix: "fab",
      iconName: "github",
      icon: [496, 512, [], "f09b", "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"]
    };
  }
});

// node_modules/@fortawesome/free-solid-svg-icons/index.mjs
var faSun, faMoon;
var init_free_solid_svg_icons = __esm({
  "node_modules/@fortawesome/free-solid-svg-icons/index.mjs"() {
    faSun = {
      prefix: "fas",
      iconName: "sun",
      icon: [512, 512, [9728], "f185", "M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"]
    };
    faMoon = {
      prefix: "fas",
      iconName: "moon",
      icon: [384, 512, [127769, 9214], "f186", "M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"]
    };
  }
});

// .extend/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
function client_method(key2) {
  {
    if (key2 === "before_navigate" || key2 === "after_navigate" || key2 === "on_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key2] ?? key2}(...) on the server`);
      };
    }
  }
}
function joinCss(obj, separator = ";") {
  let texts;
  if (Array.isArray(obj)) {
    texts = obj.filter((text2) => text2);
  } else {
    texts = [];
    for (const prop in obj) {
      if (obj[prop]) {
        texts.push(`${prop}:${obj[prop]}`);
      }
    }
  }
  return texts.join(separator);
}
function getStyles(style, size, pull, fw) {
  let float;
  let width;
  const height = "1em";
  let lineHeight;
  let fontSize;
  let textAlign;
  let verticalAlign = "-.125em";
  const overflow = "visible";
  if (fw) {
    textAlign = "center";
    width = "1.25em";
  }
  if (pull) {
    float = pull;
  }
  if (size) {
    if (size == "lg") {
      fontSize = "1.33333em";
      lineHeight = ".75em";
      verticalAlign = "-.225em";
    } else if (size == "xs") {
      fontSize = ".75em";
    } else if (size == "sm") {
      fontSize = ".875em";
    } else {
      fontSize = size.replace("x", "em");
    }
  }
  return joinCss([
    joinCss({
      float,
      width,
      height,
      "line-height": lineHeight,
      "font-size": fontSize,
      "text-align": textAlign,
      "vertical-align": verticalAlign,
      "transform-origin": "center",
      overflow
    }),
    style
  ]);
}
function getTransform(scale, translateX, translateY, rotate, flip, translateTimes = 1, translateUnit = "", rotateUnit = "") {
  let flipX = 1;
  let flipY = 1;
  if (flip) {
    if (flip == "horizontal") {
      flipX = -1;
    } else if (flip == "vertical") {
      flipY = -1;
    } else {
      flipX = flipY = -1;
    }
  }
  return joinCss(
    [
      `translate(${parseNumber(translateX) * translateTimes}${translateUnit},${parseNumber(translateY) * translateTimes}${translateUnit})`,
      `scale(${flipX * parseNumber(scale)},${flipY * parseNumber(scale)})`,
      rotate && `rotate(${rotate}${rotateUnit})`
    ],
    " "
  );
}
function applyTheme() {
  console.log("Aa");
}
var onNavigate, css$7, Navigator, parseNumber, css$6, Fa, css$5, Eternals, initialTheme, theme, css$4, Theme, css$3, Header, css$2, Footer, Fonts, Transition, css$1, Loader, css, Layout;
var init_layout_svelte = __esm({
  ".extend/output/server/entries/pages/_layout.svelte.js"() {
    init_ssr();
    init_free_brands_svg_icons();
    init_free_solid_svg_icons();
    init_chunks();
    onNavigate = /* @__PURE__ */ client_method("on_navigate");
    css$7 = {
      code: "main.svelte-shf47b{display:flex;align-items:center;justify-content:center;padding-inline:4px;padding-block:4px;border-radius:8px;font-family:'Inter', sans-serif;position:relative;z-index:1}.box.svelte-shf47b{position:absolute;background:var(--border);height:1.5rem;border-radius:5px;z-index:2;transition:all 0.3s\r\n    }.item.svelte-shf47b{text-decoration:none;border-radius:5px;padding-inline:9px;padding-block:3px;font-size:14px;z-index:3;transition:all 0.3s;color:var(--text-thin);font-weight:400;user-select:none}.item.svelte-shf47b:hover{color:#b0b0b0}",
      map: null
    };
    Navigator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let selected = -1;
      let styles = "opacity: 0";
      const items = [{ title: "Works", link: "/works" }, { title: "Contact", link: "/contact" }];
      onNavigate((callback) => {
        const id = callback.to.route.id;
        if (id === "/") {
          styles = "opacity: 0";
          selected = -1;
        } else if (id === "/works") {
          styles = "left: 4px; width: 3.7rem";
          selected = 0;
        } else if (id === "/contact") {
          styles = "left: 64px; width: 4.3rem";
          selected = 1;
        }
      });
      $$result.css.add(css$7);
      return `<main class="svelte-shf47b"><div class="box svelte-shf47b"${add_attribute("style", styles, 0)}></div> ${each(items, (c3, index22) => {
        return `<a${add_attribute("href", c3.link, 0)} class="item svelte-shf47b"${add_attribute("style", `color: ${selected === index22 ? "var(--subtle)" : null}`, 0)}>${escape2(c3.title)}</a>`;
      })} </main>`;
    });
    parseNumber = parseFloat;
    css$6 = {
      code: ".spin.svelte-1cj2gr0{animation:svelte-1cj2gr0-spin 2s 0s infinite linear}.pulse.svelte-1cj2gr0{animation:svelte-1cj2gr0-spin 1s infinite steps(8)}@keyframes svelte-1cj2gr0-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
      map: null
    };
    Fa = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { class: clazz = "" } = $$props;
      let { id = "" } = $$props;
      let { style = "" } = $$props;
      let { icon } = $$props;
      let { size = "" } = $$props;
      let { color = "" } = $$props;
      let { fw = false } = $$props;
      let { pull = "" } = $$props;
      let { scale = 1 } = $$props;
      let { translateX = 0 } = $$props;
      let { translateY = 0 } = $$props;
      let { rotate = "" } = $$props;
      let { flip = false } = $$props;
      let { spin = false } = $$props;
      let { pulse = false } = $$props;
      let { primaryColor = "" } = $$props;
      let { secondaryColor = "" } = $$props;
      let { primaryOpacity = 1 } = $$props;
      let { secondaryOpacity = 0.4 } = $$props;
      let { swapOpacity = false } = $$props;
      let i2;
      let s4;
      let transform;
      if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
        $$bindings.class(clazz);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.style === void 0 && $$bindings.style && style !== void 0)
        $$bindings.style(style);
      if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
        $$bindings.icon(icon);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.fw === void 0 && $$bindings.fw && fw !== void 0)
        $$bindings.fw(fw);
      if ($$props.pull === void 0 && $$bindings.pull && pull !== void 0)
        $$bindings.pull(pull);
      if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
        $$bindings.scale(scale);
      if ($$props.translateX === void 0 && $$bindings.translateX && translateX !== void 0)
        $$bindings.translateX(translateX);
      if ($$props.translateY === void 0 && $$bindings.translateY && translateY !== void 0)
        $$bindings.translateY(translateY);
      if ($$props.rotate === void 0 && $$bindings.rotate && rotate !== void 0)
        $$bindings.rotate(rotate);
      if ($$props.flip === void 0 && $$bindings.flip && flip !== void 0)
        $$bindings.flip(flip);
      if ($$props.spin === void 0 && $$bindings.spin && spin !== void 0)
        $$bindings.spin(spin);
      if ($$props.pulse === void 0 && $$bindings.pulse && pulse !== void 0)
        $$bindings.pulse(pulse);
      if ($$props.primaryColor === void 0 && $$bindings.primaryColor && primaryColor !== void 0)
        $$bindings.primaryColor(primaryColor);
      if ($$props.secondaryColor === void 0 && $$bindings.secondaryColor && secondaryColor !== void 0)
        $$bindings.secondaryColor(secondaryColor);
      if ($$props.primaryOpacity === void 0 && $$bindings.primaryOpacity && primaryOpacity !== void 0)
        $$bindings.primaryOpacity(primaryOpacity);
      if ($$props.secondaryOpacity === void 0 && $$bindings.secondaryOpacity && secondaryOpacity !== void 0)
        $$bindings.secondaryOpacity(secondaryOpacity);
      if ($$props.swapOpacity === void 0 && $$bindings.swapOpacity && swapOpacity !== void 0)
        $$bindings.swapOpacity(swapOpacity);
      $$result.css.add(css$6);
      i2 = icon && icon.icon || [0, 0, "", [], ""];
      s4 = getStyles(style, size, pull, fw);
      transform = getTransform(scale, translateX, translateY, rotate, flip, 512);
      return `${i2[4] ? `<svg${add_attribute("id", id || void 0, 0)} class="${[
        "svelte-fa " + escape2(clazz, true) + " svelte-1cj2gr0",
        (pulse ? "pulse" : "") + " " + (spin ? "spin" : "")
      ].join(" ").trim()}"${add_attribute("style", s4, 0)} viewBox="${"0 0 " + escape2(i2[0], true) + " " + escape2(i2[1], true)}" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg"><g transform="${"translate(" + escape2(i2[0] / 2, true) + " " + escape2(i2[1] / 2, true) + ")"}" transform-origin="${escape2(i2[0] / 4, true) + " 0"}"><g${add_attribute("transform", transform, 0)}>${typeof i2[4] == "string" ? `<path${add_attribute("d", i2[4], 0)}${add_attribute("fill", color || primaryColor || "currentColor", 0)} transform="${"translate(" + escape2(i2[0] / -2, true) + " " + escape2(i2[1] / -2, true) + ")"}"></path>` : ` <path${add_attribute("d", i2[4][0], 0)}${add_attribute("fill", secondaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? primaryOpacity : secondaryOpacity, 0)} transform="${"translate(" + escape2(i2[0] / -2, true) + " " + escape2(i2[1] / -2, true) + ")"}"></path> <path${add_attribute("d", i2[4][1], 0)}${add_attribute("fill", primaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? secondaryOpacity : primaryOpacity, 0)} transform="${"translate(" + escape2(i2[0] / -2, true) + " " + escape2(i2[1] / -2, true) + ")"}"></path>`}</g></g></svg>` : ``}`;
    });
    css$5 = {
      code: "main.svelte-3822zl{display:flex;align-items:center;justify-content:center;padding-inline:4px;padding-block:4px;border-radius:8px;font-family:'Inter', sans-serif;position:relative;z-index:1}.box.svelte-3822zl{position:absolute;background:var(--border);height:1.5rem;border-radius:5px;z-index:2;transition:all 0.2s}.item.svelte-3822zl{text-decoration:none;border-radius:5px;padding-inline:9px;padding-block:2px;font-size:16px;z-index:3;transition:all 0.2s;color:var(--text-thin);font-weight:400;user-select:none}.item.svelte-3822zl:hover{color:var(--subtle)}",
      map: null
    };
    Eternals = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let boxStyle = "opacity: 0; width: 2.15rem";
      const links = [
        {
          icon: faGithub,
          link: "https://github.com/Hideko-Dev"
        },
        {
          icon: faInstagram,
          link: "https://github.com/Hideko-Dev"
        },
        {
          icon: faDiscord,
          link: "https://github.com/Hideko-Dev"
        },
        {
          icon: faLinkedin,
          link: "https://github.com/Hideko-Dev"
        }
      ];
      $$result.css.add(css$5);
      return `<main class="svelte-3822zl"><div class="box svelte-3822zl"${add_attribute("style", boxStyle, 0)}></div> ${each(links, (l2, index22) => {
        return `<a class="item svelte-3822zl"${add_attribute("href", l2.link, 0)}>${validate_component(Fa, "Fa").$$render($$result, { icon: l2.icon }, {}, {})} </a>`;
      })} </main>`;
    });
    initialTheme = "dark";
    theme = writable(initialTheme);
    applyTheme();
    css$4 = {
      code: "main.svelte-168zpbl{display:flex;align-items:center;justify-content:center;padding-inline:10px;padding-block:8px;border-radius:8px;font-family:'Inter', sans-serif;position:relative;z-index:1;transition:all 0.3s;cursor:pointer;color:var(--text-thin)\r\n    }main.svelte-168zpbl:hover{color:#b0b0b0}",
      map: null
    };
    Theme = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $theme, $$unsubscribe_theme;
      $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
      $$result.css.add(css$4);
      $$unsubscribe_theme();
      return `<main class="svelte-168zpbl">${$theme === "dark" ? `${validate_component(Fa, "Fa").$$render($$result, { icon: faSun }, {}, {})}` : `${$theme === "light" ? `${validate_component(Fa, "Fa").$$render($$result, { icon: faMoon }, {}, {})}` : ``}`} </main>`;
    });
    css$3 = {
      code: ".line.svelte-3jbat2.svelte-3jbat2{width:1px;height:18px;background:var(--thin)}.contents.svelte-3jbat2.svelte-3jbat2{display:flex;align-items:center;justify-content:center;padding-inline:4px;padding-block:2px;border-radius:10px;border:1px solid var(--border);background:var(--translucent);backdrop-filter:blur(30px)}.theme.svelte-3jbat2.svelte-3jbat2{margin-inline:0.2rem}.eternal.svelte-3jbat2.svelte-3jbat2{margin-inline:0.3rem}main.svelte-3jbat2.svelte-3jbat2{display:flex;align-items:center;justify-content:center;margin-top:1rem;width:100%;position:fixed;background:transparent;font-family:'Inter', sans-serif}.logo.svelte-3jbat2.svelte-3jbat2{text-decoration:none;color:white;font-weight:700;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;margin-inline:1rem;transition:all 0.3s}.logo.svelte-3jbat2.svelte-3jbat2:hover{opacity:0.5}.logo.svelte-3jbat2 img.svelte-3jbat2{width:1.7rem}.lefts.svelte-3jbat2.svelte-3jbat2{display:flex;align-items:center;justify-content:center}@media(max-width: 600px){.eternal.svelte-3jbat2.svelte-3jbat2{display:none}}",
      map: null
    };
    Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $theme, $$unsubscribe_theme;
      $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
      $$result.css.add(css$3);
      $$unsubscribe_theme();
      return `<main class="svelte-3jbat2"><div class="contents svelte-3jbat2"><a href="/" class="logo svelte-3jbat2"${add_attribute("style", `filter: invert(${$theme === "dark" ? 0 : 0.9})`, 0)}><img src="icon.svg" alt="logo" class="svelte-3jbat2"></a> <div class="lefts svelte-3jbat2"><div class="line svelte-3jbat2"></div> <div class="navigator">${validate_component(Navigator, "Navigator").$$render($$result, {}, {}, {})}</div> <div class="line svelte-3jbat2"></div> <div class="eternal svelte-3jbat2">${validate_component(Eternals, "Eternals").$$render($$result, {}, {}, {})}</div> <div class="line svelte-3jbat2"></div> <div class="theme svelte-3jbat2">${validate_component(Theme, "Theme").$$render($$result, {}, {}, {})}</div></div></div> </main>`;
    });
    css$2 = {
      code: "section.svelte-1it0gry{height:3.5rem;display:flex;align-items:center;justify-content:center;font-family:'Roboto Mono Variable', sans-serif;font-weight:300;font-size:13px;gap:5px}a.svelte-1it0gry{color:var(--solid);text-decoration:none;transition:all 0.2s}a.svelte-1it0gry:hover{color:var(--text-thin)}@media(max-width: 600px){section.svelte-1it0gry{display:grid;place-content:center;gap:2px;text-align:center;height:4rem}}",
      map: null
    };
    Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$2);
      return `<section class="svelte-1it0gry"><p class="copyright">\xA9 ${escape2((/* @__PURE__ */ new Date()).getFullYear())} Hideko (<a href="https://instagram.com/hideko.cat" class="svelte-1it0gry" data-svelte-h="svelte-tswr3r">@hideko.cat</a>).</p> <p data-svelte-h="svelte-1b254ly">All rights reserved</p> </section>`;
    });
    Fonts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return ``;
    });
    Transition = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { pathname = "" } = $$props;
      if ($$props.pathname === void 0 && $$bindings.pathname && pathname !== void 0)
        $$bindings.pathname(pathname);
      return `<div>${slots.default ? slots.default({}) : ``}</div>`;
    });
    css$1 = {
      code: ".loader.svelte-4o5ap3{background:#575757;width:100%;height:2px;z-index:10;position:fixed;transition:all 0.2s ease}",
      map: null
    };
    Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let style = "width: 50%; opacity: 0; right:0;";
      onNavigate((callback) => {
        load2();
      });
      function load2() {
        style = "width: 100%; opacity: 1; left:0;";
        setTimeout(
          () => {
            style = "width: 50%; opacity: 0;right:0;";
          },
          300
        );
      }
      $$result.css.add(css$1);
      return `<div class="loader svelte-4o5ap3"${add_attribute("style", style, 0)}></div>`;
    });
    css = {
      code: ":root{background:var(--bg);color:var(--text);font-family:'Inter', sans-serif}",
      map: null
    };
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$result.css.add(css);
      return `<div>${validate_component(Fonts, "Fonts").$$render($$result, {}, {}, {})} ${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})} ${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${validate_component(Transition, "PageTransition").$$render($$result, { pathname: data.pathname }, {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })} ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} </div>`;
    });
  }
});

// .extend/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  server: () => layout_server_exports,
  server_id: () => server_id,
  stylesheets: () => stylesheets,
  universal: () => layout_exports,
  universal_id: () => universal_id
});
var index, component_cache, component, universal_id, server_id, imports, stylesheets, fonts;
var init__ = __esm({
  ".extend/output/server/nodes/0.js"() {
    init_layout();
    init_layout_server();
    index = 0;
    component = async () => component_cache ??= (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    universal_id = "src/pages/+layout.js";
    server_id = "src/pages/+layout.server.js";
    imports = ["_app/immutable/nodes/0.b4320f47.js", "_app/immutable/chunks/scheduler.0d2f776c.js", "_app/immutable/chunks/index.e8a83480.js", "_app/immutable/chunks/each.e59479a4.js", "_app/immutable/chunks/singletons.50650c4a.js"];
    stylesheets = ["_app/immutable/assets/0.cae81bfb.css"];
    fonts = ["_app/immutable/assets/inter-latin-100-normal.61cac109.woff2", "_app/immutable/assets/inter-latin-100-normal.59ff1c64.woff", "_app/immutable/assets/inter-latin-200-normal.74885a0c.woff2", "_app/immutable/assets/inter-latin-200-normal.71416c88.woff", "_app/immutable/assets/inter-latin-300-normal.6b2cee46.woff2", "_app/immutable/assets/inter-latin-300-normal.5a4fe5c8.woff", "_app/immutable/assets/inter-latin-400-normal.0364d368.woff2", "_app/immutable/assets/inter-latin-400-normal.e3982e96.woff", "_app/immutable/assets/inter-latin-500-normal.d5333670.woff2", "_app/immutable/assets/inter-latin-500-normal.bf069d84.woff", "_app/immutable/assets/inter-latin-600-normal.048d136d.woff2", "_app/immutable/assets/inter-latin-600-normal.b1aa30b3.woff", "_app/immutable/assets/inter-latin-700-normal.ced2d8e0.woff2", "_app/immutable/assets/inter-latin-700-normal.3edc8440.woff", "_app/immutable/assets/inter-latin-800-normal.a51ac27d.woff2", "_app/immutable/assets/inter-latin-800-normal.02e00891.woff", "_app/immutable/assets/inter-latin-900-normal.f2db7f82.woff2", "_app/immutable/assets/inter-latin-900-normal.0d86a631.woff", "_app/immutable/assets/poppins-latin-100-normal.a9220f99.woff2", "_app/immutable/assets/poppins-latin-100-normal.d1eda978.woff", "_app/immutable/assets/poppins-latin-200-normal.6f0c5725.woff2", "_app/immutable/assets/poppins-latin-200-normal.07512a37.woff", "_app/immutable/assets/poppins-latin-300-normal.78bc3aa7.woff2", "_app/immutable/assets/poppins-latin-300-normal.78a4e0ac.woff", "_app/immutable/assets/poppins-latin-400-normal.7d93459d.woff2", "_app/immutable/assets/poppins-latin-400-normal.2db0a254.woff", "_app/immutable/assets/poppins-latin-500-normal.cd36de20.woff2", "_app/immutable/assets/poppins-latin-500-normal.6f35fc59.woff", "_app/immutable/assets/poppins-latin-600-normal.f4e80d9d.woff2", "_app/immutable/assets/poppins-latin-600-normal.90ae1c77.woff", "_app/immutable/assets/poppins-latin-700-normal.9338e65f.woff2", "_app/immutable/assets/poppins-latin-700-normal.630ac4e1.woff", "_app/immutable/assets/poppins-latin-800-normal.60bf0aba.woff2", "_app/immutable/assets/poppins-latin-800-normal.993bd790.woff", "_app/immutable/assets/poppins-latin-900-normal.17ea1019.woff2", "_app/immutable/assets/poppins-latin-900-normal.940cfac0.woff", "_app/immutable/assets/roboto-mono-cyrillic-ext-wght-normal.d694a640.woff2", "_app/immutable/assets/roboto-mono-cyrillic-wght-normal.f5503b96.woff2", "_app/immutable/assets/roboto-mono-greek-wght-normal.5e78ebd0.woff2", "_app/immutable/assets/roboto-mono-vietnamese-wght-normal.1651b21a.woff2", "_app/immutable/assets/roboto-mono-latin-ext-wght-normal.d3f58cdc.woff2", "_app/immutable/assets/roboto-mono-latin-wght-normal.47388fbc.woff2"];
  }
});

// .extend/output/server/chunks/stores.js
var getStores, page;
var init_stores = __esm({
  ".extend/output/server/chunks/stores.js"() {
    init_ssr();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .extend/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
var Error2;
var init_error_svelte = __esm({
  ".extend/output/server/entries/fallbacks/error.svelte.js"() {
    init_ssr();
    init_stores();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape2($page.status)}</h1> <p>${escape2($page.error?.message)}</p>`;
    });
  }
});

// .extend/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".extend/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ??= (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    imports2 = ["_app/immutable/nodes/1.705582bc.js", "_app/immutable/chunks/scheduler.0d2f776c.js", "_app/immutable/chunks/index.e8a83480.js", "_app/immutable/chunks/stores.3b1731a6.js", "_app/immutable/chunks/singletons.50650c4a.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .extend/output/server/entries/pages/_page.js
var page_exports = {};
__export(page_exports, {
  ssr: () => ssr2
});
var ssr2;
var init_page = __esm({
  ".extend/output/server/entries/pages/_page.js"() {
    ssr2 = true;
  }
});

// .extend/output/server/entries/pages/index/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var catIcon, css$22, About, css$12, Bio, css2, Page;
var init_page_svelte = __esm({
  ".extend/output/server/entries/pages/home/_page.svelte.js"() {
    init_ssr();
    catIcon = "data:image/webp;base64,UklGRloKAABXRUJQVlA4IE4KAADwLwCdASqAAIAAPm0uk0akIqGmqpYcoNANiWVrT1gZ9opYh6fn34+bv5nLoOQ+z4gZdDjC5RiwQeO7237Z6h3SoPEfQvmppS8W9L1DPOtwdQ7hLLf+acZ0/LoedFF72Gi/PnCHk/255z/3h8Exqn61Fhq4mPWHFjyycbgf9qVWFesy84jV9fH/C8Sd0e9QI888p8R4PopxWH/6nK7i72ZWaxCveXwn/nABaZxAGA9fPayoo4ndmYJ4nsekVF260NhOM6UZILtJF95wq7Cjow1TVbAGhGJVPZn/87oHhfHCINximzTOM4/h0udCB5TCdWHCCwC08eGv9e/E2BiY1tcJp8h83x6WsG82Ln1bdAN2USSLGEo98/lzi2Yd+RlJQyqaFKO2JAdecrtHAsQxDoCk2gaOcruTtNBP/o25n1y8li7ksLi48/RhvM8LRJMOvaI/YLKE9rr8xl7QjZ9g3niHLbn+CEC4//xpSCPtyeuqLRhd2pHIH9x7o+qGOupvrjkSt4c2t6Y8AAD+/m4hCrSKt5tPevh/xNvUsozQI+ZzawpPJNwN83HgQcu6yPKu37q6tjgOqdxuPqGo/YZs/kbrB2gHXSABEnWIxX2e/Z7uRwIvRtwLBLasNcjucf4zcgv2JC44rSsGsexDvv7DkFtEw15jUTBcNP1cZstqaJCVWQfwZJC3OULH/N/QMbgyYZLbFBpGsQsyFY5cjygSVJWOJhO/nHEeaQm9hEOy78lrBQniSkNgiAEUot5QS7STIjpTOHqbMQXt2pXgdzJUrOkZ4gWHbPK+zSVtP96m+bh1EgOuODP0Hc597maxIVh+LYSy82OZjf6BE9pReufuWzdJuYaozldGNXDdDQHl0GTJD5+76pYq8Z4Bfp38ceaOp/EQMsAslFTeocl1gGqpNtgxD0cGP59ZKNNBcqgHlnuzSddCYdUfQaqGl/FJM040+GbOoYgX94iQRA6X66ThK09j4SPp8YAeLEBR1OdY0Jx2Y+TqzssalUW79deDseGT3KmfMQFHFjANNUARVpf6tHeR/l81KUnYcX85lgXtqFLVeSWEoHDIJZeuFRx8BbZWR1oNAvcH8ltrJraUPRv6OqYqg5aCmO6SyBzy8hNfElOvxSFx1/kCy4O4f4krl5OV4LndLKEmU3il27/Zb9WyNvol/Pgldk6biLVqE21odTe14gzcFSDs3WrwO2mFxIXQtqXkv1cB95JGXA+julPYrw8Tozh81kocfbjDlElGoXDb2lXeEwvWKm37eFXutkctljmDXQapTDZ4VBeCJoFNqCwSMyLAFLtUCOVSve4zoQtkms2PHYK2pL4y/Q3ryUBXzt4I0zx1jUJjex8qFqThzF5+R5jKwbD3gncpl9DZWqWUhzMLZMLr9M792Nx9zm8vX53mc64Ej1Q+GsIxWvcWFo79GXGvkMAFCGysK/kgp+oIGClytJSA+0GsvPJoXTZJOlcsKLIsOEh3Lefnl/uv97JVhVZed3NYY85EB+UGz/ghIQnET4lgMi0NW6YMWPf9hv5bORoQ9yCuErCiZHCbILH0hYWJpBHQs2fE6crc/DHTHqZm8jZL1rP5osdIElZBnqQhTEk+E3lM6IplekGZ5isOICLwS6GcFXfZTUzVAfiJhWh+2UKmihKI7O5tYOwCcM6f/8LHyNWOVc1AFHLWxnl3N7rPVa8iIwEnfk7hF19YyFNPsCIkaKKbImNhRWmLQAt0wdCnfHy0OdGqeALfBqYkRpAKKEn5HsuhNmTm5fSkxAuZuBjb4mBM17qRlSrVTW07oX/1a2m+Srgr9IuFqu373RqgXLQnFK15QqiHzI2l1sjyPhL3hrHj+PRZUkOYTg7MON6ujzNvo9sDJmWbkEpka0Bx1MQaHAEUhGmF+yGOFdCRYnQzXWuUBzZsJ3W1I1ifqfeg+k9oXeQ5lfX4bzm3bRzIPQvdjZXr5ZZHYn7/P6IxTElOe+xzi8U3/zIA4UgA572xWUfPv2XT828kjSegOSIdRKQ8TwRMj6jLmlY65QFzGSgem5Itz+te1wX7Kv4wITPY90ZA5lQkz1UwpZzBG4lmVFOSIUQluPCl4lnT2rm79/VsKNSw9MdmIjxFZ8wGcyO/17crUEpZu6VmgNTXeesjS7Qo0FAxA0H8NLVMv2qsazRjgOMVvguKbEd3kMh+JyyMoAdHD0W1HeMQkX+hMSCqNTHsR7//SHzU1+CfUxOq/4yMnw4Dm1l9rlxc2h0jzYYELmEbkLfIwrun7zYVmhBb+0c5EW95phXEseqE0X3qxox/oeUcZI4oLFAZDRDP7wJCpaKRoW+u5w159wW7evJcf6PNfdOPyjfCL+VEA33iGXzCzd/nruKLiFMnx9GkZwcefwfQTZrWAzcmdMtHjdn7VaooMlMWJMGHWMuVsb1Y5w/KASkUc2S5qnMIQYxLDMCZQonioKDJALdIpHS17BPwIbevYxMyfB2rtp1ypDNl60v/y1t4IYi2l/BdCqkzncgbwZzLqpBDHxTmeiBo9DyD5hC2sScMQSWRQ9+RKRcFggRSsciUZxjewv/VnK0Du+FcfZoX05lvXyQYmQu0/6BHC9Avq9IDuVVzneAA+mbllingTBfIXRSoX00H8pX3kmCMh5cbuUSj1hfhKRzEEVrceHJJ96+NoJOaZmLMk7+sOlzDNTRnLNmih1cMk2vmKHMOHenL+XKP4FIEOhIJ0S3t4kguF1i+JeY+Tr7SaUB4+PaLQXXhjl+vgTr5XOIj4nxKGVMf2eZ66SGI7zZQUSTi3rtc4g9NmQ5bXaFiJ6O22Z6nj4P4j21qheg4uUbFIU/diyy63Yvr9uTm/xm4x75WpK4H/REitzY9lNAwosCH75Wo+xNOeq3AvelUksClnOAoBtMUhzLdGAUPrhYsbc20w8bSwH2YOBfnffaevhwt74QqMw9cRDR5bqWfCA/qAfcwewln9uVhhW+aQuN4vxFkVydSzB5aZ0bs0VeXsIVr9zONsafXHDdX8wxPej+P1BKb1bZBxUzpFKbBc61vFhtafIoITOdbSN6UM8r152EQiehd/EviXzQChLc9hznLUUzFWRjuX3IsbrKg/MToyrwePR3PISAPQwyRgwgIxQX818Peyll3XocgS3RpqW6GKnA3jbaDEkdc+1QyxVzMtu8oJ2WztGCzo0tDsbcOvvnp76xts0uzWXof4tOFI9rKVOv8jeFRduuXX6pov5tuEw3mjNCnsd5JY3IkmWOoaqBaFOBopqLMF887Se2enfb/GiSO7yDCJobHiVgy+r8yTijxvGgZuLWQMmezPnnS8mJrqm5sIAs6HOhi/EG4LLfmFGwqSPet0KH01GRqtpTUnq19zCmnD6+x8qfVsy4ECDZrkIt3vCV8N0cqZA/ErJi97UyEfb0WoEjPN8yNBc5cwG8OsiQUIdL1KoV8zfCAnGRsgmxD7WlPVvf4cqj8yIkSGaFCDGYq2NtZDssrX1cEpJZO6MZHuyyglRoOGGjvgi/GlpvJBsMMwDIAAAAA";
    css$22 = {
      code: 'section.svelte-1t22gv0{margin-top:7rem}.title.svelte-1t22gv0{font-weight:700;font-size:25px}.bios.svelte-1t22gv0{margin:0 auto;width:30rem}.bio.svelte-1t22gv0{margin-top:15px}img.svelte-1t22gv0{float:right;margin-left:1rem;margin-bottom:1rem;border-radius:100%;outline:1px solid var(--border);aspect-ratio:1 / 1;height:120px;width:120px;object-fit:cover}a.svelte-1t22gv0{text-decoration:none;color:var(--text);position:relative}a.svelte-1t22gv0:after{content:"";position:absolute;left:0;bottom:0;width:100%;height:1px;background:var(--text-thin);transition:all 0.2s}a.svelte-1t22gv0:hover::before{background:var(--text)\r\n    }@media(max-width: 600px){.bios.svelte-1t22gv0{width:20rem}}',
      map: null
    };
    About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$22);
      return `<section class="svelte-1t22gv0" data-svelte-h="svelte-cdlwgo"><p class="title svelte-1t22gv0">About</p> <div class="bios svelte-1t22gv0"><img${add_attribute("src", catIcon, 0)} alt="icon" class="svelte-1t22gv0"> <div class="bio svelte-1t22gv0">I am a front end developer. I can do backend and software as well as frontend. Not only that, I release various projects as open source.
            <br><br>
            When I was very young, I fell in love with Minecraft and wanted to create plug-ins and mods from it. From there I worked hard to buy a computer and suddenly started learning Java.
            <br><br>
            I said I was learning Java out of the blue, and I didn&#39;t do any research to make sure I was doing it right.
            <br><br>
            After that I stopped programming for about two years, and after that I suddenly wanted to do front-end development.
            <br><br>
            In the beginning, we created a simple static site with only HTML, CSS, and JavaScript. From there, I became interested in React and learned about it, and then Next.js.
            <br><br>
            From there, I fell in love with JavaScript and started back-end development with Nodejs, and have done many other things. At first I created a portfolio with React, but I failed many times.
            <br><br>
            That&#39;s when I came across Svelte, which I felt was the framework that best suited me, and from there I created
            <a href="https://v1.hideko.cf" class="svelte-1t22gv0">Portfolio v1</a>. This was also a failure, but from there I went through a lot of trial and error and eventually created <a href="https://hideko.cf" class="svelte-1t22gv0">Portfolio v5</a>.
            <br><br>
            We developed not only the front end but also the back end, including Thundis, discord-cdn-deliver, ModUs and Meteor using Electron. From there, I worked on the front-end development of yukieiji&#39;s ExtremeRoles to learn a great deal about Git, including Branches, Issues, Pull Requests, and Git Command. Docs, etc. I was involved in the development of ExtremeRoles.</div></div> </section>`;
    });
    css$12 = {
      code: "section.svelte-gcbuns{margin-top:3rem;margin-bottom:4rem}.title.svelte-gcbuns{font-weight:700;font-size:25px}.years.svelte-gcbuns{margin-top:15px}.year.svelte-gcbuns{display:flex;align-items:center;margin-block:5px}.main.svelte-gcbuns{font-weight:600;width:40px}.line.svelte-gcbuns{height:10px;width:2px;background:var(--text-thin);margin-inline:6px}",
      map: null
    };
    Bio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const years = [
        {
          year: "2010",
          content: "Born in Miyazaki (\u5BAE\u5D0E), Japan"
        },
        { year: "2018", content: "Hello to world" },
        { year: "2023", content: "Hello to world" },
        { year: "2023", content: "Hello to world" }
      ];
      $$result.css.add(css$12);
      return `<section class="svelte-gcbuns"><p class="title svelte-gcbuns" data-svelte-h="svelte-9j7g05">Bio</p> <div class="years svelte-gcbuns">${each(years, (c3) => {
        return `<div class="year svelte-gcbuns"><p class="main svelte-gcbuns">${escape2(c3.year)}</p> <div class="line svelte-gcbuns"></div> <p class="content">${escape2(c3.content)}</p> </div>`;
      })}</div> </section>`;
    });
    css2 = {
      code: "section.svelte-1d13hta{display:flex;justify-content:center;height:max-content;font-family:'Inter', sans-serif}",
      map: null
    };
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css2);
      return `${$$result.head += `<!-- HEAD_svelte-6nd7t7_START -->${$$result.title = `<title>Home - Hideko Portfolio</title>`, ""}<!-- HEAD_svelte-6nd7t7_END -->`, ""} <section class="svelte-1d13hta"><div>${validate_component(About, "About").$$render($$result, {}, {}, {})} ${validate_component(Bio, "Bio").$$render($$result, {}, {}, {})}</div> </section>`;
    });
  }
});

// .extend/output/server/entries/pages/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var Page2;
var init_page_svelte2 = __esm({
  ".extend/output/server/entries/pages/_page.svelte.js"() {
    init_ssr();
    init_page_svelte();
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Page, "Home").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .extend/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3,
  universal: () => page_exports,
  universal_id: () => universal_id2
});
var index3, component_cache3, component3, universal_id2, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".extend/output/server/nodes/2.js"() {
    init_page();
    index3 = 2;
    component3 = async () => component_cache3 ??= (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default;
    universal_id2 = "src/pages/+index.js";
    imports3 = ["_app/immutable/nodes/2.8d806d5f.js", "_app/immutable/chunks/scheduler.0d2f776c.js", "_app/immutable/chunks/index.e8a83480.js", "_app/immutable/nodes/4.519bdf17.js", "_app/immutable/chunks/each.e59479a4.js"];
    stylesheets3 = ["_app/immutable/assets/4.b5e53664.css"];
    fonts3 = [];
  }
});

// .extend/output/server/entries/pages/contact/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page3
});
var css$13, Inputs, css3, Page3;
var init_page_svelte3 = __esm({
  ".extend/output/server/entries/pages/contact/_page.svelte.js"() {
    init_ssr();
    css$13 = {
      code: "section.svelte-jm7zn5{display:flex;flex-direction:column;border:1px solid var(--border);width:20rem;height:max-content;padding:1rem;border-radius:10px;font-family:'Roboto Mono Variable', sans-serif;font-weight:400}span.svelte-jm7zn5{font-size:13px;color:var(--text-thin)}.type.svelte-jm7zn5{margin-top:5px;background:transparent;border:1px solid var(--thin);color:var(--text);padding-inline:10px;resize:none;border-radius:5px;transition:all 0.3s}.req.svelte-jm7zn5{margin-top:1rem}input.svelte-jm7zn5{height:2rem;transition:all 0.3s}textarea.svelte-jm7zn5{height:7rem;padding-block:10px;transition:all 0.3s}.type.svelte-jm7zn5:focus{outline:none;border-color:var(--solid)}.submit.svelte-jm7zn5{font-size:15px;display:flex;align-items:center;justify-content:center;width:100%;height:2rem;border:1px solid var(--thin);border-radius:5px;transition:all 0.3s;color:var(--text-thin);cursor:pointer;margin-top:8px;user-select:none}.submit.svelte-jm7zn5:hover{background:var(--border);color:var(--text)}",
      map: null
    };
    Inputs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let mail;
      $$result.css.add(css$13);
      return `<section class="svelte-jm7zn5"><span class="svelte-jm7zn5" data-svelte-h="svelte-1bg9cgq">Email</span> <input class="type svelte-jm7zn5" type="email"${add_attribute("value", mail, 0)}> <span class="req svelte-jm7zn5" data-svelte-h="svelte-1xd8qgz">What are the requirements?</span> <textarea class="type svelte-jm7zn5">${escape2("")}</textarea> <div class="submit svelte-jm7zn5" data-svelte-h="svelte-1a7few4">Submit</div> </section>`;
    });
    css3 = {
      code: "section.svelte-e0n9er{display:flex;align-items:center;justify-content:center;height:100vh;font-weight:600;font-size:25px}.title.svelte-e0n9er{margin-left:2px;margin-bottom:8px}",
      map: null
    };
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css3);
      return `${$$result.head += `<!-- HEAD_svelte-bf9z80_START -->${$$result.title = `<title>Contact - Hideko Portfolio</title>`, ""}<!-- HEAD_svelte-bf9z80_END -->`, ""} <section class="svelte-e0n9er"><div><p class="title svelte-e0n9er" data-svelte-h="svelte-1cwg6cj">Contact</p> ${validate_component(Inputs, "Inputs").$$render($$result, {}, {}, {})}</div> </section>`;
    });
  }
});

// .extend/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".extend/output/server/nodes/3.js"() {
    index4 = 3;
    component4 = async () => component_cache4 ??= (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default;
    imports4 = ["_app/immutable/nodes/3.658b44a5.js", "_app/immutable/chunks/scheduler.0d2f776c.js", "_app/immutable/chunks/index.e8a83480.js"];
    stylesheets4 = ["_app/immutable/assets/3.0f69a980.css"];
    fonts4 = [];
  }
});

// .extend/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component_cache5, component5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".extend/output/server/nodes/4.js"() {
    index5 = 4;
    component5 = async () => component_cache5 ??= (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    imports5 = ["_app/immutable/nodes/4.519bdf17.js", "_app/immutable/chunks/scheduler.0d2f776c.js", "_app/immutable/chunks/index.e8a83480.js", "_app/immutable/chunks/each.e59479a4.js"];
    stylesheets5 = ["_app/immutable/assets/4.b5e53664.css"];
    fonts5 = [];
  }
});

// .extend/output/server/entries/pages/pg/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => Page4
});
var css4, Page4;
var init_page_svelte4 = __esm({
  ".extend/output/server/entries/pages/pg/_page.svelte.js"() {
    init_ssr();
    css4 = {
      code: "main.svelte-1t992sw{height:100vh;display:flex;align-items:center;justify-content:center}div.svelte-1t992sw{margin-top:1rem}",
      map: null
    };
    Page4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let password = "";
      $$result.css.add(css4);
      return `<main class="svelte-1t992sw"><div class="svelte-1t992sw"><h1 data-svelte-h="svelte-17i6dvv">File Upload</h1> <input type="text"${add_attribute("value", password, 0)}> <input type="file" id="fileInput"> <button data-svelte-h="svelte-1fzyxn4">Upload</button></div> </main>`;
    });
  }
});

// .extend/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  stylesheets: () => stylesheets6
});
var index6, component_cache6, component6, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".extend/output/server/nodes/5.js"() {
    index6 = 5;
    component6 = async () => component_cache6 ??= (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default;
    imports6 = ["_app/immutable/nodes/5.dd45a451.js", "_app/immutable/chunks/scheduler.0d2f776c.js", "_app/immutable/chunks/index.e8a83480.js"];
    stylesheets6 = ["_app/immutable/assets/5.fabadd85.css"];
    fonts6 = [];
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports, module) {
    "use strict";
    module.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports, module) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/has-proto/index.js
var require_has_proto = __commonJS({
  "node_modules/has-proto/index.js"(exports, module) {
    "use strict";
    var test = {
      foo: {}
    };
    var $Object = Object;
    module.exports = function hasProto() {
      return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
    };
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports, module) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a2, b2) {
      var arr = [];
      for (var i2 = 0; i2 < a2.length; i2 += 1) {
        arr[i2] = a2[i2];
      }
      for (var j2 = 0; j2 < b2.length; j2 += 1) {
        arr[j2 + a2.length] = b2[j2];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i2 = offset || 0, j2 = 0; i2 < arrLike.length; i2 += 1, j2 += 1) {
        arr[j2] = arrLike[i2];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i2 = 0; i2 < arr.length; i2 += 1) {
        str += arr[i2];
        if (i2 + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i2 = 0; i2 < boundLength; i2++) {
        boundArgs[i2] = "$" + i2;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports, module) {
    "use strict";
    var implementation = require_implementation();
    module.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/hasown/index.js"(exports, module) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module.exports = bind.call(call, $hasOwn);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports, module) {
    "use strict";
    var undefined2;
    var $SyntaxError = SyntaxError;
    var $Function = Function;
    var $TypeError = TypeError;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e3) {
      }
    };
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e3) {
        $gOPD = null;
      }
    }
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var hasProto = require_has_proto()();
    var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
      return x.__proto__;
    } : null);
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
    };
    if (getProto) {
      try {
        null.error;
      } catch (e3) {
        errorProto = getProto(getProto(e3));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
    var $replace = bind.call(Function.call, String.prototype.replace);
    var $strSlice = bind.call(Function.call, String.prototype.slice);
    var $exec = bind.call(Function.call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i2 = 1, isOwn = true; i2 < parts.length; i2 += 1) {
        var part = parts[i2];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i2 + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/has-property-descriptors/index.js
var require_has_property_descriptors = __commonJS({
  "node_modules/has-property-descriptors/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var hasPropertyDescriptors = function hasPropertyDescriptors2() {
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
          return true;
        } catch (e3) {
          return false;
        }
      }
      return false;
    };
    hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
      if (!hasPropertyDescriptors()) {
        return null;
      }
      try {
        return $defineProperty([], "length", { value: 1 }).length !== 1;
      } catch (e3) {
        return true;
      }
    };
    module.exports = hasPropertyDescriptors;
  }
});

// node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/gopd/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e3) {
        $gOPD = null;
      }
    }
    module.exports = $gOPD;
  }
});

// node_modules/define-data-property/index.js
var require_define_data_property = __commonJS({
  "node_modules/define-data-property/index.js"(exports, module) {
    "use strict";
    var hasPropertyDescriptors = require_has_property_descriptors()();
    var GetIntrinsic = require_get_intrinsic();
    var $defineProperty = hasPropertyDescriptors && GetIntrinsic("%Object.defineProperty%", true);
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e3) {
        $defineProperty = false;
      }
    }
    var $SyntaxError = GetIntrinsic("%SyntaxError%");
    var $TypeError = GetIntrinsic("%TypeError%");
    var gopd = require_gopd();
    module.exports = function defineDataProperty(obj, property, value) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new $TypeError("`obj` must be an object or a function`");
      }
      if (typeof property !== "string" && typeof property !== "symbol") {
        throw new $TypeError("`property` must be a string or a symbol`");
      }
      if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
        throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
        throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
        throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
        throw new $TypeError("`loose`, if provided, must be a boolean");
      }
      var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
      var nonWritable = arguments.length > 4 ? arguments[4] : null;
      var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
      var loose = arguments.length > 6 ? arguments[6] : false;
      var desc = !!gopd && gopd(obj, property);
      if ($defineProperty) {
        $defineProperty(obj, property, {
          configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
          enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
          value,
          writable: nonWritable === null && desc ? desc.writable : !nonWritable
        });
      } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
        obj[property] = value;
      } else {
        throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
      }
    };
  }
});

// node_modules/set-function-length/index.js
var require_set_function_length = __commonJS({
  "node_modules/set-function-length/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var define = require_define_data_property();
    var hasDescriptors = require_has_property_descriptors()();
    var gOPD = require_gopd();
    var $TypeError = GetIntrinsic("%TypeError%");
    var $floor = GetIntrinsic("%Math.floor%");
    module.exports = function setFunctionLength(fn, length) {
      if (typeof fn !== "function") {
        throw new $TypeError("`fn` is not a function");
      }
      if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
        throw new $TypeError("`length` must be a positive 32-bit integer");
      }
      var loose = arguments.length > 2 && !!arguments[2];
      var functionLengthIsConfigurable = true;
      var functionLengthIsWritable = true;
      if ("length" in fn && gOPD) {
        var desc = gOPD(fn, "length");
        if (desc && !desc.configurable) {
          functionLengthIsConfigurable = false;
        }
        if (desc && !desc.writable) {
          functionLengthIsWritable = false;
        }
      }
      if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
        if (hasDescriptors) {
          define(fn, "length", length, true, true);
        } else {
          define(fn, "length", length);
        }
      }
      return fn;
    };
  }
});

// node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/call-bind/index.js"(exports, module) {
    "use strict";
    var bind = require_function_bind();
    var GetIntrinsic = require_get_intrinsic();
    var setFunctionLength = require_set_function_length();
    var $TypeError = GetIntrinsic("%TypeError%");
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var $max = GetIntrinsic("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e3) {
        $defineProperty = null;
      }
    }
    module.exports = function callBind(originalFunction) {
      if (typeof originalFunction !== "function") {
        throw new $TypeError("a function is required");
      }
      var func = $reflectApply(bind, $call, arguments);
      return setFunctionLength(
        func,
        1 + $max(0, originalFunction.length - (arguments.length - 1)),
        true
      );
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module.exports, "apply", { value: applyBind });
    } else {
      module.exports.apply = applyBind;
    }
  }
});

// node_modules/call-bind/callBound.js
var require_callBound = __commonJS({
  "node_modules/call-bind/callBound.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
  }
});

// (disabled):node_modules/object-inspect/util.inspect
var require_util = __commonJS({
  "(disabled):node_modules/object-inspect/util.inspect"() {
  }
});

// node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "node_modules/object-inspect/index.js"(exports, module) {
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O2) {
      return O2.__proto__;
    } : null);
    function addNumericSeparator(num, str) {
      if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
        return str;
      }
      var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
      if (typeof num === "number") {
        var int = num < 0 ? -$floor(-num) : $floor(num);
        if (int !== num) {
          var intStr = String(int);
          var dec = $slice.call(str, intStr.length + 1);
          return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
        }
      }
      return $replace.call(str, sepRegex, "$&_");
    }
    var utilInspect = require_util();
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
    module.exports = function inspect_(obj, options2, depth, seen) {
      var opts = options2 || {};
      if (has(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
      }
      var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
      if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
      }
      if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
      }
      if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
      }
      var numericSeparator = opts.numericSeparator;
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
      }
      if (typeof obj === "bigint") {
        var bigIntStr = String(obj) + "n";
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect(value, from, noIndent) {
        if (from) {
          seen = $arrSlice.call(seen);
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      if (typeof obj === "function" && !isRegExp(obj)) {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
      }
      if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
      }
      if (isElement(obj)) {
        var s4 = "<" + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i2 = 0; i2 < attrs.length; i2++) {
          s4 += " " + attrs[i2].name + "=" + wrapQuotes(quote(attrs[i2].value), "double", opts);
        }
        s4 += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s4 += "...";
        }
        s4 += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
        return s4;
      }
      if (isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + $join.call(xs, ", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
          return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
        }
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
          return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
          mapForEach.call(obj, function(value, key2) {
            mapParts.push(inspect(key2, obj, true) + " => " + inspect(value, obj));
          });
        }
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
          setForEach.call(obj, function(value) {
            setParts.push(inspect(value, obj));
          });
        }
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
      }
      if (typeof window !== "undefined" && obj === window) {
        return "{ [object Window] }";
      }
      if (obj === global) {
        return "{ [object globalThis] }";
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
        var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
        var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
        if (ys.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys, indent) + "}";
        }
        return tag + "{ " + $join.call(ys, ", ") + " }";
      }
      return String(obj);
    };
    function wrapQuotes(s4, defaultStyle, opts) {
      var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
      return quoteChar + s4 + quoteChar;
    }
    function quote(s4) {
      return $replace.call(String(s4), /"/g, "&quot;");
    }
    function isArray(obj) {
      return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isError(obj) {
      return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isString(obj) {
      return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e3) {
      }
      return false;
    }
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e3) {
      }
      return false;
    }
    var hasOwn = Object.prototype.hasOwnProperty || function(key2) {
      return key2 in this;
    };
    function has(obj, key2) {
      return hasOwn.call(obj, key2);
    }
    function toStr(obj) {
      return objectToString.call(obj);
    }
    function nameOf(f2) {
      if (f2.name) {
        return f2.name;
      }
      var m2 = $match.call(functionToString.call(f2), /^function\s*([\w$]+)/);
      if (m2) {
        return m2[1];
      }
      return null;
    }
    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }
      for (var i2 = 0, l2 = xs.length; i2 < l2; i2++) {
        if (xs[i2] === x) {
          return i2;
        }
      }
      return -1;
    }
    function isMap(x) {
      if (!mapSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        mapSize.call(x);
        try {
          setSize.call(x);
        } catch (s4) {
          return true;
        }
        return x instanceof Map;
      } catch (e3) {
      }
      return false;
    }
    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x, weakMapHas);
        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s4) {
          return true;
        }
        return x instanceof WeakMap;
      } catch (e3) {
      }
      return false;
    }
    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x);
        return true;
      } catch (e3) {
      }
      return false;
    }
    function isSet(x) {
      if (!setSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        setSize.call(x);
        try {
          mapSize.call(x);
        } catch (m2) {
          return true;
        }
        return x instanceof Set;
      } catch (e3) {
      }
      return false;
    }
    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x, weakSetHas);
        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s4) {
          return true;
        }
        return x instanceof WeakSet;
      } catch (e3) {
      }
      return false;
    }
    function isElement(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
        return true;
      }
      return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
    }
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
      }
      var s4 = $replace.call($replace.call(str, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
      return wrapQuotes(s4, "single", opts);
    }
    function lowbyte(c3) {
      var n3 = c3.charCodeAt(0);
      var x = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
      }[n3];
      if (x) {
        return "\\" + x;
      }
      return "\\x" + (n3 < 16 ? "0" : "") + $toUpperCase.call(n3.toString(16));
    }
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    function singleLineValues(xs) {
      for (var i2 = 0; i2 < xs.length; i2++) {
        if (indexOf(xs[i2], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), " ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
      };
    }
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
    }
    function arrObjKeys(obj, inspect) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i2 = 0; i2 < obj.length; i2++) {
          xs[i2] = has(obj, i2) ? inspect(obj[i2], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
          symMap["$" + syms[k]] = syms[k];
        }
      }
      for (var key2 in obj) {
        if (!has(obj, key2)) {
          continue;
        }
        if (isArr && String(Number(key2)) === key2 && key2 < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key2] instanceof Symbol) {
          continue;
        } else if ($test.call(/[^\w$]/, key2)) {
          xs.push(inspect(key2, obj) + ": " + inspect(obj[key2], obj));
        } else {
          xs.push(key2 + ": " + inspect(obj[key2], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j2 = 0; j2 < syms.length; j2++) {
          if (isEnumerable.call(obj, syms[j2])) {
            xs.push("[" + inspect(syms[j2]) + "]: " + inspect(obj[syms[j2]], obj));
          }
        }
      }
      return xs;
    }
  }
});

// node_modules/side-channel/index.js
var require_side_channel = __commonJS({
  "node_modules/side-channel/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_callBound();
    var inspect = require_object_inspect();
    var $TypeError = GetIntrinsic("%TypeError%");
    var $WeakMap = GetIntrinsic("%WeakMap%", true);
    var $Map = GetIntrinsic("%Map%", true);
    var $weakMapGet = callBound("WeakMap.prototype.get", true);
    var $weakMapSet = callBound("WeakMap.prototype.set", true);
    var $weakMapHas = callBound("WeakMap.prototype.has", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSet = callBound("Map.prototype.set", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var listGetNode = function(list, key2) {
      for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
        if (curr.key === key2) {
          prev.next = curr.next;
          curr.next = list.next;
          list.next = curr;
          return curr;
        }
      }
    };
    var listGet = function(objects, key2) {
      var node = listGetNode(objects, key2);
      return node && node.value;
    };
    var listSet = function(objects, key2, value) {
      var node = listGetNode(objects, key2);
      if (node) {
        node.value = value;
      } else {
        objects.next = {
          // eslint-disable-line no-param-reassign
          key: key2,
          next: objects.next,
          value
        };
      }
    };
    var listHas = function(objects, key2) {
      return !!listGetNode(objects, key2);
    };
    module.exports = function getSideChannel() {
      var $wm;
      var $m;
      var $o;
      var channel = {
        assert: function(key2) {
          if (!channel.has(key2)) {
            throw new $TypeError("Side channel does not contain " + inspect(key2));
          }
        },
        get: function(key2) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if ($wm) {
              return $weakMapGet($wm, key2);
            }
          } else if ($Map) {
            if ($m) {
              return $mapGet($m, key2);
            }
          } else {
            if ($o) {
              return listGet($o, key2);
            }
          }
        },
        has: function(key2) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if ($wm) {
              return $weakMapHas($wm, key2);
            }
          } else if ($Map) {
            if ($m) {
              return $mapHas($m, key2);
            }
          } else {
            if ($o) {
              return listHas($o, key2);
            }
          }
          return false;
        },
        set: function(key2, value) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if (!$wm) {
              $wm = new $WeakMap();
            }
            $weakMapSet($wm, key2, value);
          } else if ($Map) {
            if (!$m) {
              $m = new $Map();
            }
            $mapSet($m, key2, value);
          } else {
            if (!$o) {
              $o = { key: {}, next: null };
            }
            listSet($o, key2, value);
          }
        }
      };
      return channel;
    };
  }
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports, module) {
    "use strict";
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    module.exports = {
      "default": Format.RFC3986,
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };
  }
});

// node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/qs/lib/utils.js"(exports, module) {
    "use strict";
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = function() {
      var array2 = [];
      for (var i2 = 0; i2 < 256; ++i2) {
        array2.push("%" + ((i2 < 16 ? "0" : "") + i2.toString(16)).toUpperCase());
      }
      return array2;
    }();
    var compactQueue = function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j2 = 0; j2 < obj.length; ++j2) {
            if (typeof obj[j2] !== "undefined") {
              compacted.push(obj[j2]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options2) {
      var obj = options2 && options2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      for (var i2 = 0; i2 < source.length; ++i2) {
        if (typeof source[i2] !== "undefined") {
          obj[i2] = source[i2];
        }
      }
      return obj;
    };
    var merge = function merge2(target, source, options2) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object") {
        if (isArray(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (options2 && (options2.plainObjects || options2.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options2);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function(item, i2) {
          if (has.call(target, i2)) {
            var targetItem = target[i2];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i2] = merge2(targetItem, item, options2);
            } else {
              target.push(item);
            }
          } else {
            target[i2] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function(acc, key2) {
        var value = source[key2];
        if (has.call(acc, key2)) {
          acc[key2] = merge2(acc[key2], value, options2);
        } else {
          acc[key2] = value;
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key2) {
        acc[key2] = source[key2];
        return acc;
      }, target);
    };
    var decode = function(str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e3) {
        return strWithoutPlus;
      }
    };
    var encode2 = function encode3(str, defaultEncoder, charset, kind, format) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var i2 = 0; i2 < string.length; ++i2) {
        var c3 = string.charCodeAt(i2);
        if (c3 === 45 || c3 === 46 || c3 === 95 || c3 === 126 || c3 >= 48 && c3 <= 57 || c3 >= 65 && c3 <= 90 || c3 >= 97 && c3 <= 122 || format === formats.RFC1738 && (c3 === 40 || c3 === 41)) {
          out += string.charAt(i2);
          continue;
        }
        if (c3 < 128) {
          out = out + hexTable[c3];
          continue;
        }
        if (c3 < 2048) {
          out = out + (hexTable[192 | c3 >> 6] + hexTable[128 | c3 & 63]);
          continue;
        }
        if (c3 < 55296 || c3 >= 57344) {
          out = out + (hexTable[224 | c3 >> 12] + hexTable[128 | c3 >> 6 & 63] + hexTable[128 | c3 & 63]);
          continue;
        }
        i2 += 1;
        c3 = 65536 + ((c3 & 1023) << 10 | string.charCodeAt(i2) & 1023);
        out += hexTable[240 | c3 >> 18] + hexTable[128 | c3 >> 12 & 63] + hexTable[128 | c3 >> 6 & 63] + hexTable[128 | c3 & 63];
      }
      return out;
    };
    var compact2 = function compact3(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = [];
      for (var i2 = 0; i2 < queue.length; ++i2) {
        var item = queue[i2];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);
        for (var j2 = 0; j2 < keys.length; ++j2) {
          var key2 = keys[j2];
          var val = obj[key2];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue.push({ obj, prop: key2 });
            refs.push(val);
          }
        }
      }
      compactQueue(queue);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer = function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
    var combine = function combine2(a2, b2) {
      return [].concat(a2, b2);
    };
    var maybeMap = function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i2 = 0; i2 < val.length; i2 += 1) {
          mapped.push(fn(val[i2]));
        }
        return mapped;
      }
      return fn(val);
    };
    module.exports = {
      arrayToObject,
      assign,
      combine,
      compact: compact2,
      decode,
      encode: encode2,
      isBuffer,
      isRegExp,
      maybeMap,
      merge
    };
  }
});

// node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports, module) {
    "use strict";
    var getSideChannel = require_side_channel();
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key2) {
        return prefix + "[" + key2 + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      }
    };
    var isArray = Array.isArray;
    var push = Array.prototype.push;
    var pushToArray = function(arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive2(v2) {
      return typeof v2 === "string" || typeof v2 === "number" || typeof v2 === "boolean" || typeof v2 === "symbol" || typeof v2 === "bigint";
    };
    var sentinel = {};
    var stringify2 = function stringify3(object, prefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder2, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
      var obj = object;
      var tmpSc = sideChannel;
      var step = 0;
      var findFlag = false;
      while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== "undefined") {
          if (pos === step) {
            throw new RangeError("Cyclic object value");
          } else {
            findFlag = true;
          }
        }
        if (typeof tmpSc.get(sentinel) === "undefined") {
          step = 0;
        }
      }
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function(value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder2 && !encodeValuesOnly ? encoder2(prefix, defaults.encoder, charset, "key", format) : prefix;
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder2) {
          var keyValue = encodeValuesOnly ? prefix : encoder2(prefix, defaults.encoder, charset, "key", format);
          return [formatter(keyValue) + "=" + formatter(encoder2(obj, defaults.encoder, charset, "value", format))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        if (encodeValuesOnly && encoder2) {
          obj = utils.maybeMap(obj, encoder2);
        }
        objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
      }
      var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? prefix + "[]" : prefix;
      for (var j2 = 0; j2 < objKeys.length; ++j2) {
        var key2 = objKeys[j2];
        var value = typeof key2 === "object" && typeof key2.value !== "undefined" ? key2.value : obj[key2];
        if (skipNulls && value === null) {
          continue;
        }
        var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, key2) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + key2 : "[" + key2 + "]");
        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify3(
          value,
          keyPrefix,
          generateArrayPrefix,
          commaRoundTrip,
          strictNullHandling,
          skipNulls,
          generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj) ? null : encoder2,
          filter,
          sort,
          allowDots,
          serializeDate,
          format,
          formatter,
          encodeValuesOnly,
          charset,
          valueSideChannel
        ));
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module.exports = function(object, opts) {
      var obj = object;
      var options2 = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options2.filter === "function") {
        filter = options2.filter;
        obj = filter("", obj);
      } else if (isArray(options2.filter)) {
        filter = options2.filter;
        objKeys = filter;
      }
      var keys = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if (opts && "indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = "indices";
      }
      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
      if (opts && "commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      }
      var commaRoundTrip = generateArrayPrefix === "comma" && opts && opts.commaRoundTrip;
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options2.sort) {
        objKeys.sort(options2.sort);
      }
      var sideChannel = getSideChannel();
      for (var i2 = 0; i2 < objKeys.length; ++i2) {
        var key2 = objKeys[i2];
        if (options2.skipNulls && obj[key2] === null) {
          continue;
        }
        pushToArray(keys, stringify2(
          obj[key2],
          key2,
          generateArrayPrefix,
          commaRoundTrip,
          options2.strictNullHandling,
          options2.skipNulls,
          options2.encode ? options2.encoder : null,
          options2.filter,
          options2.sort,
          options2.allowDots,
          options2.serializeDate,
          options2.format,
          options2.formatter,
          options2.encodeValuesOnly,
          options2.charset,
          sideChannel
        ));
      }
      var joined = keys.join(options2.delimiter);
      var prefix = options2.addQueryPrefix === true ? "?" : "";
      if (options2.charsetSentinel) {
        if (options2.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  }
});

// node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "node_modules/qs/lib/parse.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowPrototypes: false,
      allowSparse: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
    };
    var interpretNumericEntities = function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var parseArrayValue = function(val, options2) {
      if (val && typeof val === "string" && options2.comma && val.indexOf(",") > -1) {
        return val.split(",");
      }
      return val;
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options2) {
      var obj = { __proto__: null };
      var cleanStr = options2.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      var limit = options2.parameterLimit === Infinity ? void 0 : options2.parameterLimit;
      var parts = cleanStr.split(options2.delimiter, limit);
      var skipIndex = -1;
      var i2;
      var charset = options2.charset;
      if (options2.charsetSentinel) {
        for (i2 = 0; i2 < parts.length; ++i2) {
          if (parts[i2].indexOf("utf8=") === 0) {
            if (parts[i2] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i2] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i2;
            i2 = parts.length;
          }
        }
      }
      for (i2 = 0; i2 < parts.length; ++i2) {
        if (i2 === skipIndex) {
          continue;
        }
        var part = parts[i2];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key2, val;
        if (pos === -1) {
          key2 = options2.decoder(part, defaults.decoder, charset, "key");
          val = options2.strictNullHandling ? null : "";
        } else {
          key2 = options2.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          val = utils.maybeMap(
            parseArrayValue(part.slice(pos + 1), options2),
            function(encodedVal) {
              return options2.decoder(encodedVal, defaults.decoder, charset, "value");
            }
          );
        }
        if (val && options2.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(val);
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        if (has.call(obj, key2)) {
          obj[key2] = utils.combine(obj[key2], val);
        } else {
          obj[key2] = val;
        }
      }
      return obj;
    };
    var parseObject = function(chain, val, options2, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options2);
      for (var i2 = chain.length - 1; i2 >= 0; --i2) {
        var obj;
        var root = chain[i2];
        if (root === "[]" && options2.parseArrays) {
          obj = [].concat(leaf);
        } else {
          obj = options2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
          var index9 = parseInt(cleanRoot, 10);
          if (!options2.parseArrays && cleanRoot === "") {
            obj = { 0: leaf };
          } else if (!isNaN(index9) && root !== cleanRoot && String(index9) === cleanRoot && index9 >= 0 && (options2.parseArrays && index9 <= options2.arrayLimit)) {
            obj = [];
            obj[index9] = leaf;
          } else if (cleanRoot !== "__proto__") {
            obj[cleanRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var parseKeys = function parseQueryStringKeys(givenKey, val, options2, valuesParsed) {
      if (!givenKey) {
        return;
      }
      var key2 = options2.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options2.depth > 0 && brackets.exec(key2);
      var parent = segment ? key2.slice(0, segment.index) : key2;
      var keys = [];
      if (parent) {
        if (!options2.plainObjects && has.call(Object.prototype, parent)) {
          if (!options2.allowPrototypes) {
            return;
          }
        }
        keys.push(parent);
      }
      var i2 = 0;
      while (options2.depth > 0 && (segment = child.exec(key2)) !== null && i2 < options2.depth) {
        i2 += 1;
        if (!options2.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options2.allowPrototypes) {
            return;
          }
        }
        keys.push(segment[1]);
      }
      if (segment) {
        keys.push("[" + key2.slice(segment.index) + "]");
      }
      return parseObject(keys, val, options2, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      return {
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module.exports = function(str, opts) {
      var options2 = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options2) : str;
      var obj = options2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var keys = Object.keys(tempObj);
      for (var i2 = 0; i2 < keys.length; ++i2) {
        var key2 = keys[i2];
        var newObj = parseKeys(key2, tempObj[key2], options2, typeof str === "string");
        obj = utils.merge(obj, newObj, options2);
      }
      if (options2.allowSparse === true) {
        return obj;
      }
      return utils.compact(obj);
    };
  }
});

// node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "node_modules/qs/lib/index.js"(exports, module) {
    "use strict";
    var stringify2 = require_stringify();
    var parse3 = require_parse();
    var formats = require_formats();
    module.exports = {
      formats,
      parse: parse3,
      stringify: stringify2
    };
  }
});

// node_modules/cross-fetch/dist/browser-ponyfill.js
var require_browser_ponyfill = __commonJS({
  "node_modules/cross-fetch/dist/browser-ponyfill.js"(exports, module) {
    var global2 = typeof self !== "undefined" ? self : exports;
    var __self__ = function() {
      function F() {
        this.fetch = false;
        this.DOMException = global2.DOMException;
      }
      F.prototype = global2;
      return new F();
    }();
    (function(self2) {
      var irrelevant = function(exports2) {
        var support = {
          searchParams: "URLSearchParams" in self2,
          iterable: "Symbol" in self2 && "iterator" in Symbol,
          blob: "FileReader" in self2 && "Blob" in self2 && function() {
            try {
              new Blob();
              return true;
            } catch (e3) {
              return false;
            }
          }(),
          formData: "FormData" in self2,
          arrayBuffer: "ArrayBuffer" in self2
        };
        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ];
          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }
        function normalizeName(name) {
          if (typeof name !== "string") {
            name = String(name);
          }
          if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
            throw new TypeError("Invalid character in header field name");
          }
          return name.toLowerCase();
        }
        function normalizeValue(value) {
          if (typeof value !== "string") {
            value = String(value);
          }
          return value;
        }
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return { done: value === void 0, value };
            }
          };
          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }
          return iterator;
        }
        function Headers2(headers) {
          this.map = {};
          if (headers instanceof Headers2) {
            headers.forEach(function(value, name) {
              this.append(name, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name]);
            }, this);
          }
        }
        Headers2.prototype.append = function(name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue + ", " + value : value;
        };
        Headers2.prototype["delete"] = function(name) {
          delete this.map[normalizeName(name)];
        };
        Headers2.prototype.get = function(name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null;
        };
        Headers2.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers2.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value);
        };
        Headers2.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };
        Headers2.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push(name);
          });
          return iteratorFor(items);
        };
        Headers2.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items);
        };
        Headers2.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
          });
          return iteratorFor(items);
        };
        if (support.iterable) {
          Headers2.prototype[Symbol.iterator] = Headers2.prototype.entries;
        }
        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }
          body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }
        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }
        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise;
        }
        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars3 = new Array(view.length);
          for (var i2 = 0; i2 < view.length; i2++) {
            chars3[i2] = String.fromCharCode(view[i2]);
          }
          return chars3.join("");
        }
        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }
        function Body() {
          this.bodyUsed = false;
          this._initBody = function(body) {
            this._bodyInit = body;
            if (!body) {
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }
            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          };
          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };
            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
              } else {
                return this.blob().then(readBlobAsArrayBuffer);
              }
            };
          }
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode);
            };
          }
          this.json = function() {
            return this.text().then(JSON.parse);
          };
          return this;
        }
        var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request2(input, options2) {
          options2 = options2 || {};
          var body = options2.body;
          if (input instanceof Request2) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options2.headers) {
              this.headers = new Headers2(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }
          this.credentials = options2.credentials || this.credentials || "same-origin";
          if (options2.headers || !this.headers) {
            this.headers = new Headers2(options2.headers);
          }
          this.method = normalizeMethod(options2.method || this.method || "GET");
          this.mode = options2.mode || this.mode || null;
          this.signal = options2.signal || this.signal;
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this._initBody(body);
        }
        Request2.prototype.clone = function() {
          return new Request2(this, { body: this._bodyInit });
        };
        function decode(body) {
          var form = new FormData();
          body.trim().split("&").forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split("=");
              var name = split.shift().replace(/\+/g, " ");
              var value = split.join("=").replace(/\+/g, " ");
              form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
          });
          return form;
        }
        function parseHeaders(rawHeaders) {
          var headers = new Headers2();
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(":");
            var key2 = parts.shift().trim();
            if (key2) {
              var value = parts.join(":").trim();
              headers.append(key2, value);
            }
          });
          return headers;
        }
        Body.call(Request2.prototype);
        function Response2(bodyInit, options2) {
          if (!options2) {
            options2 = {};
          }
          this.type = "default";
          this.status = options2.status === void 0 ? 200 : options2.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = "statusText" in options2 ? options2.statusText : "OK";
          this.headers = new Headers2(options2.headers);
          this.url = options2.url || "";
          this._initBody(bodyInit);
        }
        Body.call(Response2.prototype);
        Response2.prototype.clone = function() {
          return new Response2(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers2(this.headers),
            url: this.url
          });
        };
        Response2.error = function() {
          var response = new Response2(null, { status: 0, statusText: "" });
          response.type = "error";
          return response;
        };
        var redirectStatuses = [301, 302, 303, 307, 308];
        Response2.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }
          return new Response2(null, { status, headers: { location: url } });
        };
        exports2.DOMException = self2.DOMException;
        try {
          new exports2.DOMException();
        } catch (err) {
          exports2.DOMException = function(message, name) {
            this.message = message;
            this.name = name;
            var error2 = Error(message);
            this.stack = error2.stack;
          };
          exports2.DOMException.prototype = Object.create(Error.prototype);
          exports2.DOMException.prototype.constructor = exports2.DOMException;
        }
        function fetch2(input, init2) {
          return new Promise(function(resolve, reject) {
            var request = new Request2(input, init2);
            if (request.signal && request.signal.aborted) {
              return reject(new exports2.DOMException("Aborted", "AbortError"));
            }
            var xhr = new XMLHttpRequest();
            function abortXhr() {
              xhr.abort();
            }
            xhr.onload = function() {
              var options2 = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
              };
              options2.url = "responseURL" in xhr ? xhr.responseURL : options2.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              resolve(new Response2(body, options2));
            };
            xhr.onerror = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.ontimeout = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.onabort = function() {
              reject(new exports2.DOMException("Aborted", "AbortError"));
            };
            xhr.open(request.method, request.url, true);
            if (request.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request.credentials === "omit") {
              xhr.withCredentials = false;
            }
            if ("responseType" in xhr && support.blob) {
              xhr.responseType = "blob";
            }
            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value);
            });
            if (request.signal) {
              request.signal.addEventListener("abort", abortXhr);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  request.signal.removeEventListener("abort", abortXhr);
                }
              };
            }
            xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
          });
        }
        fetch2.polyfill = true;
        if (!self2.fetch) {
          self2.fetch = fetch2;
          self2.Headers = Headers2;
          self2.Request = Request2;
          self2.Response = Response2;
        }
        exports2.Headers = Headers2;
        exports2.Request = Request2;
        exports2.Response = Response2;
        exports2.fetch = fetch2;
        Object.defineProperty(exports2, "__esModule", { value: true });
        return exports2;
      }({});
    })(__self__);
    __self__.fetch.ponyfill = true;
    delete __self__.fetch.polyfill;
    var ctx = __self__;
    exports = ctx.fetch;
    exports.default = ctx.fetch;
    exports.fetch = ctx.fetch;
    exports.Headers = ctx.Headers;
    exports.Request = ctx.Request;
    exports.Response = ctx.Response;
    module.exports = exports;
  }
});

// node_modules/retry/lib/retry_operation.js
var require_retry_operation = __commonJS({
  "node_modules/retry/lib/retry_operation.js"(exports, module) {
    function RetryOperation(timeouts, options2) {
      if (typeof options2 === "boolean") {
        options2 = { forever: options2 };
      }
      this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
      this._timeouts = timeouts;
      this._options = options2 || {};
      this._maxRetryTime = options2 && options2.maxRetryTime || Infinity;
      this._fn = null;
      this._errors = [];
      this._attempts = 1;
      this._operationTimeout = null;
      this._operationTimeoutCb = null;
      this._timeout = null;
      this._operationStart = null;
      this._timer = null;
      if (this._options.forever) {
        this._cachedTimeouts = this._timeouts.slice(0);
      }
    }
    module.exports = RetryOperation;
    RetryOperation.prototype.reset = function() {
      this._attempts = 1;
      this._timeouts = this._originalTimeouts.slice(0);
    };
    RetryOperation.prototype.stop = function() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._timeouts = [];
      this._cachedTimeouts = null;
    };
    RetryOperation.prototype.retry = function(err) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (!err) {
        return false;
      }
      var currentTime = (/* @__PURE__ */ new Date()).getTime();
      if (err && currentTime - this._operationStart >= this._maxRetryTime) {
        this._errors.push(err);
        this._errors.unshift(new Error("RetryOperation timeout occurred"));
        return false;
      }
      this._errors.push(err);
      var timeout = this._timeouts.shift();
      if (timeout === void 0) {
        if (this._cachedTimeouts) {
          this._errors.splice(0, this._errors.length - 1);
          timeout = this._cachedTimeouts.slice(-1);
        } else {
          return false;
        }
      }
      var self2 = this;
      this._timer = setTimeout(function() {
        self2._attempts++;
        if (self2._operationTimeoutCb) {
          self2._timeout = setTimeout(function() {
            self2._operationTimeoutCb(self2._attempts);
          }, self2._operationTimeout);
          if (self2._options.unref) {
            self2._timeout.unref();
          }
        }
        self2._fn(self2._attempts);
      }, timeout);
      if (this._options.unref) {
        this._timer.unref();
      }
      return true;
    };
    RetryOperation.prototype.attempt = function(fn, timeoutOps) {
      this._fn = fn;
      if (timeoutOps) {
        if (timeoutOps.timeout) {
          this._operationTimeout = timeoutOps.timeout;
        }
        if (timeoutOps.cb) {
          this._operationTimeoutCb = timeoutOps.cb;
        }
      }
      var self2 = this;
      if (this._operationTimeoutCb) {
        this._timeout = setTimeout(function() {
          self2._operationTimeoutCb();
        }, self2._operationTimeout);
      }
      this._operationStart = (/* @__PURE__ */ new Date()).getTime();
      this._fn(this._attempts);
    };
    RetryOperation.prototype.try = function(fn) {
      console.log("Using RetryOperation.try() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = function(fn) {
      console.log("Using RetryOperation.start() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = RetryOperation.prototype.try;
    RetryOperation.prototype.errors = function() {
      return this._errors;
    };
    RetryOperation.prototype.attempts = function() {
      return this._attempts;
    };
    RetryOperation.prototype.mainError = function() {
      if (this._errors.length === 0) {
        return null;
      }
      var counts = {};
      var mainError = null;
      var mainErrorCount = 0;
      for (var i2 = 0; i2 < this._errors.length; i2++) {
        var error2 = this._errors[i2];
        var message = error2.message;
        var count = (counts[message] || 0) + 1;
        counts[message] = count;
        if (count >= mainErrorCount) {
          mainError = error2;
          mainErrorCount = count;
        }
      }
      return mainError;
    };
  }
});

// node_modules/retry/lib/retry.js
var require_retry = __commonJS({
  "node_modules/retry/lib/retry.js"(exports) {
    var RetryOperation = require_retry_operation();
    exports.operation = function(options2) {
      var timeouts = exports.timeouts(options2);
      return new RetryOperation(timeouts, {
        forever: options2 && (options2.forever || options2.retries === Infinity),
        unref: options2 && options2.unref,
        maxRetryTime: options2 && options2.maxRetryTime
      });
    };
    exports.timeouts = function(options2) {
      if (options2 instanceof Array) {
        return [].concat(options2);
      }
      var opts = {
        retries: 10,
        factor: 2,
        minTimeout: 1 * 1e3,
        maxTimeout: Infinity,
        randomize: false
      };
      for (var key2 in options2) {
        opts[key2] = options2[key2];
      }
      if (opts.minTimeout > opts.maxTimeout) {
        throw new Error("minTimeout is greater than maxTimeout");
      }
      var timeouts = [];
      for (var i2 = 0; i2 < opts.retries; i2++) {
        timeouts.push(this.createTimeout(i2, opts));
      }
      if (options2 && options2.forever && !timeouts.length) {
        timeouts.push(this.createTimeout(i2, opts));
      }
      timeouts.sort(function(a2, b2) {
        return a2 - b2;
      });
      return timeouts;
    };
    exports.createTimeout = function(attempt, opts) {
      var random = opts.randomize ? Math.random() + 1 : 1;
      var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
      timeout = Math.min(timeout, opts.maxTimeout);
      return timeout;
    };
    exports.wrap = function(obj, options2, methods) {
      if (options2 instanceof Array) {
        methods = options2;
        options2 = null;
      }
      if (!methods) {
        methods = [];
        for (var key2 in obj) {
          if (typeof obj[key2] === "function") {
            methods.push(key2);
          }
        }
      }
      for (var i2 = 0; i2 < methods.length; i2++) {
        var method = methods[i2];
        var original = obj[method];
        obj[method] = function retryWrapper(original2) {
          var op = exports.operation(options2);
          var args = Array.prototype.slice.call(arguments, 1);
          var callback = args.pop();
          args.push(function(err) {
            if (op.retry(err)) {
              return;
            }
            if (err) {
              arguments[0] = op.mainError();
            }
            callback.apply(this, arguments);
          });
          op.attempt(function() {
            original2.apply(obj, args);
          });
        }.bind(obj, original);
        obj[method].options = options2;
      }
    };
  }
});

// node_modules/retry/index.js
var require_retry2 = __commonJS({
  "node_modules/retry/index.js"(exports, module) {
    module.exports = require_retry();
  }
});

// node_modules/async-retry/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/async-retry/lib/index.js"(exports, module) {
    var retrier = require_retry2();
    function retry(fn, opts) {
      function run2(resolve, reject) {
        var options2 = opts || {};
        var op;
        if (!("randomize" in options2)) {
          options2.randomize = true;
        }
        op = retrier.operation(options2);
        function bail(err) {
          reject(err || new Error("Aborted"));
        }
        function onError(err, num) {
          if (err.bail) {
            bail(err);
            return;
          }
          if (!op.retry(err)) {
            reject(op.mainError());
          } else if (options2.onRetry) {
            options2.onRetry(err, num);
          }
        }
        function runAttempt(num) {
          var val;
          try {
            val = fn(bail, num);
          } catch (err) {
            onError(err, num);
            return;
          }
          Promise.resolve(val).then(resolve).catch(function catchIt(err) {
            onError(err, num);
          });
        }
        op.attempt(runAttempt);
      }
      return new Promise(run2);
    }
    module.exports = retry;
  }
});

// node_modules/microcms-js-sdk/dist/esm/microcms-js-sdk.js
function e(e3, t3) {
  if (t3 == null || t3 > e3.length)
    t3 = e3.length;
  for (var n3 = 0, r3 = new Array(t3); n3 < t3; n3++)
    r3[n3] = e3[n3];
  return r3;
}
function t(t3) {
  if (Array.isArray(t3))
    return e(t3);
}
function n(e3, t3, n3, r3, i2, o3, u2) {
  try {
    var s4 = e3[o3](u2);
    var c3 = s4.value;
  } catch (e4) {
    n3(e4);
    return;
  }
  if (s4.done) {
    t3(c3);
  } else {
    Promise.resolve(c3).then(r3, i2);
  }
}
function r(e3) {
  return function() {
    var t3 = this, r3 = arguments;
    return new Promise(function(i2, o3) {
      var u2 = e3.apply(t3, r3);
      function s4(e4) {
        n(u2, i2, o3, s4, c3, "next", e4);
      }
      function c3(e4) {
        n(u2, i2, o3, s4, c3, "throw", e4);
      }
      s4(void 0);
    });
  };
}
function i(e3, t3, n3) {
  if (t3 in e3) {
    Object.defineProperty(e3, t3, { value: n3, enumerable: true, configurable: true, writable: true });
  } else {
    e3[t3] = n3;
  }
  return e3;
}
function o(e3) {
  if (typeof Symbol !== "undefined" && e3[Symbol.iterator] != null || e3["@@iterator"] != null)
    return Array.from(e3);
}
function u() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function s2(e3) {
  for (var t3 = 1; t3 < arguments.length; t3++) {
    var n3 = arguments[t3] != null ? arguments[t3] : {};
    var r3 = Object.keys(n3);
    if (typeof Object.getOwnPropertySymbols === "function") {
      r3 = r3.concat(Object.getOwnPropertySymbols(n3).filter(function(e4) {
        return Object.getOwnPropertyDescriptor(n3, e4).enumerable;
      }));
    }
    r3.forEach(function(t4) {
      i(e3, t4, n3[t4]);
    });
  }
  return e3;
}
function c(e3, t3) {
  var n3 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var r3 = Object.getOwnPropertySymbols(e3);
    if (t3) {
      r3 = r3.filter(function(t4) {
        return Object.getOwnPropertyDescriptor(e3, t4).enumerable;
      });
    }
    n3.push.apply(n3, r3);
  }
  return n3;
}
function a(e3, t3) {
  t3 = t3 != null ? t3 : {};
  if (Object.getOwnPropertyDescriptors) {
    Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t3));
  } else {
    c(Object(t3)).forEach(function(n3) {
      Object.defineProperty(e3, n3, Object.getOwnPropertyDescriptor(t3, n3));
    });
  }
  return e3;
}
function f(e3) {
  return t(e3) || o(e3) || d(e3) || u();
}
function l(e3) {
  "@swc/helpers - typeof";
  return e3 && typeof Symbol !== "undefined" && e3.constructor === Symbol ? "symbol" : typeof e3;
}
function d(t3, n3) {
  if (!t3)
    return;
  if (typeof t3 === "string")
    return e(t3, n3);
  var r3 = Object.prototype.toString.call(t3).slice(8, -1);
  if (r3 === "Object" && t3.constructor)
    r3 = t3.constructor.name;
  if (r3 === "Map" || r3 === "Set")
    return Array.from(r3);
  if (r3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r3))
    return e(t3, n3);
}
function p(e3, t3) {
  var n3, r3, i2, o3, u2 = { label: 0, sent: function() {
    if (i2[0] & 1)
      throw i2[1];
    return i2[1];
  }, trys: [], ops: [] };
  return o3 = { next: s4(0), "throw": s4(1), "return": s4(2) }, typeof Symbol === "function" && (o3[Symbol.iterator] = function() {
    return this;
  }), o3;
  function s4(e4) {
    return function(t4) {
      return c3([e4, t4]);
    };
  }
  function c3(o4) {
    if (n3)
      throw new TypeError("Generator is already executing.");
    while (u2)
      try {
        if (n3 = 1, r3 && (i2 = o4[0] & 2 ? r3["return"] : o4[0] ? r3["throw"] || ((i2 = r3["return"]) && i2.call(r3), 0) : r3.next) && !(i2 = i2.call(r3, o4[1])).done)
          return i2;
        if (r3 = 0, i2)
          o4 = [o4[0] & 2, i2.value];
        switch (o4[0]) {
          case 0:
          case 1:
            i2 = o4;
            break;
          case 4:
            u2.label++;
            return { value: o4[1], done: false };
          case 5:
            u2.label++;
            r3 = o4[1];
            o4 = [0];
            continue;
          case 7:
            o4 = u2.ops.pop();
            u2.trys.pop();
            continue;
          default:
            if (!(i2 = u2.trys, i2 = i2.length > 0 && i2[i2.length - 1]) && (o4[0] === 6 || o4[0] === 2)) {
              u2 = 0;
              continue;
            }
            if (o4[0] === 3 && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
              u2.label = o4[1];
              break;
            }
            if (o4[0] === 6 && u2.label < i2[1]) {
              u2.label = i2[1];
              i2 = o4;
              break;
            }
            if (i2 && u2.label < i2[2]) {
              u2.label = i2[2];
              u2.ops.push(o4);
              break;
            }
            if (i2[2])
              u2.ops.pop();
            u2.trys.pop();
            continue;
        }
        o4 = t3.call(e3, u2);
      } catch (e4) {
        o4 = [6, e4];
        r3 = 0;
      } finally {
        n3 = i2 = 0;
      }
    if (o4[0] & 5)
      throw o4[1];
    return { value: o4[0] ? o4[1] : void 0, done: true };
  }
}
var import_qs, import_cross_fetch, import_async_retry, y, v, m, b, w, I, j, P, E;
var init_microcms_js_sdk = __esm({
  "node_modules/microcms-js-sdk/dist/esm/microcms-js-sdk.js"() {
    import_qs = __toESM(require_lib());
    import_cross_fetch = __toESM(require_browser_ponyfill());
    import_async_retry = __toESM(require_lib2());
    y = function(e3) {
      return e3 !== null && typeof e3 == "object";
    };
    v = function(e3) {
      return typeof e3 == "string";
    };
    m = function(e3) {
      if (!y(e3))
        throw new Error("queries is not object");
      return import_qs.default.stringify(e3, { arrayFormat: "comma" });
    };
    b = "microcms.io";
    w = "v1";
    I = function(e3) {
      var t3;
      return e3 ? t3 = e3 : (typeof fetch === "undefined" ? "undefined" : l(fetch)) > "u" ? t3 = import_cross_fetch.default : t3 = fetch, function() {
        for (var e4 = arguments.length, n3 = new Array(e4), r3 = 0; r3 < e4; r3++) {
          n3[r3] = arguments[r3];
        }
        return t3.apply(void 0, f(n3));
      };
    };
    j = function() {
      return (typeof Headers === "undefined" ? "undefined" : l(Headers)) > "u" ? import_cross_fetch.Headers : Headers;
    };
    P = function(e3, t3) {
      var n3 = I(t3), i2 = j();
      return function() {
        var t4 = r(function(t5, r3) {
          var o3, u2;
          return p(this, function(c3) {
            u2 = new i2((o3 = r3) === null || o3 === void 0 ? void 0 : o3.headers);
            return [2, (u2.has("X-MICROCMS-API-KEY") || u2.set("X-MICROCMS-API-KEY", e3), n3(t5, a(s2({}, r3), { headers: u2 })))];
          });
        });
        return function(e4, n4) {
          return t4.apply(this, arguments);
        };
      }();
    };
    E = function(e3) {
      var t3 = e3.serviceDomain, n3 = e3.apiKey, i2 = e3.customFetch, o3 = e3.retry;
      if (!t3 || !n3)
        throw new Error("parameter is required (check serviceDomain and apiKey)");
      if (!v(t3) || !v(n3))
        throw new Error("parameter is not string");
      var u2 = "https://".concat(t3, ".").concat(b, "/api/").concat(w), c3 = function() {
        var e4 = r(function(e5) {
          var t4, c4, f2, l2, d2, h2, y2, v2, b2;
          return p(this, function(w2) {
            switch (w2.label) {
              case 0:
                t4 = e5.endpoint, c4 = e5.contentId, f2 = e5.queries, l2 = f2 === void 0 ? {} : f2, d2 = e5.requestInit;
                h2 = P(n3, i2), y2 = m(l2), v2 = "".concat(u2, "/").concat(t4).concat(c4 ? "/".concat(c4) : "").concat(y2 ? "?".concat(y2) : ""), b2 = function() {
                  var e6 = r(function(e7) {
                    var t5, n4, r3;
                    return p(this, function(i3) {
                      switch (i3.label) {
                        case 0:
                          i3.trys.push([0, 2, , 3]);
                          return [4, e7.json()];
                        case 1:
                          t5 = i3.sent(), n4 = t5.message;
                          return [2, n4 !== null && n4 !== void 0 ? n4 : null];
                        case 2:
                          r3 = i3.sent();
                          return [2, null];
                        case 3:
                          return [2];
                      }
                    });
                  });
                  return function t5(t5) {
                    return e6.apply(this, arguments);
                  };
                }();
                return [4, (0, import_async_retry.default)(function() {
                  var e6 = r(function(e7) {
                    var t5, n4, r3, i3, o4, u3, c5, f3;
                    return p(this, function(l3) {
                      switch (l3.label) {
                        case 0:
                          l3.trys.push([0, 6, , 7]);
                          return [4, h2(v2, a(s2({}, d2), { method: (r3 = (t5 = d2) === null || t5 === void 0 ? void 0 : t5.method) !== null && r3 !== void 0 ? r3 : "GET" }))];
                        case 1:
                          i3 = l3.sent();
                          if (!(i3.status !== 429 && i3.status >= 400 && i3.status < 500))
                            return [3, 3];
                          return [4, b2(i3)];
                        case 2:
                          o4 = l3.sent();
                          return [2, e7(new Error("fetch API response status: ".concat(i3.status).concat(o4 ? "\n  message is `".concat(o4, "`") : "")))];
                        case 3:
                          if (!!i3.ok)
                            return [3, 5];
                          return [4, b2(i3)];
                        case 4:
                          u3 = l3.sent();
                          return [2, Promise.reject(new Error("fetch API response status: ".concat(i3.status).concat(u3 ? "\n  message is `".concat(u3, "`") : "")))];
                        case 5:
                          return [2, ((n4 = d2) === null || n4 === void 0 ? void 0 : n4.method) === "DELETE" ? void 0 : i3.json()];
                        case 6:
                          c5 = l3.sent();
                          if (c5.data)
                            throw c5.data;
                          if ((f3 = c5.response) === null || f3 === void 0 ? void 0 : f3.data)
                            throw c5.response.data;
                          return [2, Promise.reject(new Error("Network Error.\n  Details: ".concat(c5)))];
                        case 7:
                          return [2];
                      }
                    });
                  });
                  return function(t5) {
                    return e6.apply(this, arguments);
                  };
                }(), { retries: o3 ? 2 : 0, onRetry: function(e6, t5) {
                  console.log(e6), console.log("Waiting for retry (".concat(t5, "/", 2, ")"));
                }, minTimeout: 5e3 })];
              case 1:
                return [2, w2.sent()];
            }
          });
        });
        return function t4(t4) {
          return e4.apply(this, arguments);
        };
      }();
      return { get: function() {
        var e4 = r(function(e5) {
          var t4, n4, r3, i3, o4, u3;
          return p(this, function(s4) {
            switch (s4.label) {
              case 0:
                t4 = e5.endpoint, n4 = e5.contentId, r3 = e5.queries, i3 = r3 === void 0 ? {} : r3, o4 = e5.customRequestInit;
                if (!t4)
                  return [3, 2];
                return [4, c3({ endpoint: t4, contentId: n4, queries: i3, requestInit: o4 })];
              case 1:
                u3 = s4.sent();
                return [3, 3];
              case 2:
                u3 = Promise.reject(new Error("endpoint is required"));
                s4.label = 3;
              case 3:
                return [2, u3];
            }
          });
        });
        return function(t4) {
          return e4.apply(this, arguments);
        };
      }(), getList: function() {
        var e4 = r(function(e5) {
          var t4, n4, r3, i3, o4;
          return p(this, function(u3) {
            switch (u3.label) {
              case 0:
                t4 = e5.endpoint, n4 = e5.queries, r3 = n4 === void 0 ? {} : n4, i3 = e5.customRequestInit;
                if (!t4)
                  return [3, 2];
                return [4, c3({ endpoint: t4, queries: r3, requestInit: i3 })];
              case 1:
                o4 = u3.sent();
                return [3, 3];
              case 2:
                o4 = Promise.reject(new Error("endpoint is required"));
                u3.label = 3;
              case 3:
                return [2, o4];
            }
          });
        });
        return function(t4) {
          return e4.apply(this, arguments);
        };
      }(), getListDetail: function() {
        var e4 = r(function(e5) {
          var t4, n4, r3, i3, o4, u3;
          return p(this, function(s4) {
            switch (s4.label) {
              case 0:
                t4 = e5.endpoint, n4 = e5.contentId, r3 = e5.queries, i3 = r3 === void 0 ? {} : r3, o4 = e5.customRequestInit;
                if (!t4)
                  return [3, 2];
                return [4, c3({ endpoint: t4, contentId: n4, queries: i3, requestInit: o4 })];
              case 1:
                u3 = s4.sent();
                return [3, 3];
              case 2:
                u3 = Promise.reject(new Error("endpoint is required"));
                s4.label = 3;
              case 3:
                return [2, u3];
            }
          });
        });
        return function(t4) {
          return e4.apply(this, arguments);
        };
      }(), getObject: function() {
        var e4 = r(function(e5) {
          var t4, n4, r3, i3, o4;
          return p(this, function(u3) {
            switch (u3.label) {
              case 0:
                t4 = e5.endpoint, n4 = e5.queries, r3 = n4 === void 0 ? {} : n4, i3 = e5.customRequestInit;
                if (!t4)
                  return [3, 2];
                return [4, c3({ endpoint: t4, queries: r3, requestInit: i3 })];
              case 1:
                o4 = u3.sent();
                return [3, 3];
              case 2:
                o4 = Promise.reject(new Error("endpoint is required"));
                u3.label = 3;
              case 3:
                return [2, o4];
            }
          });
        });
        return function(t4) {
          return e4.apply(this, arguments);
        };
      }(), getAllContentIds: function() {
        var e4 = r(function(e5) {
          var t4, n4, r3, i3, o4, u3, l2, d2, h2, y2, v2, m2, b2, w2, q2, g2, I2;
          return p(this, function(p2) {
            switch (p2.label) {
              case 0:
                t4 = e5.endpoint, n4 = e5.alternateField, r3 = e5.draftKey, i3 = e5.filters, o4 = e5.orders, u3 = e5.customRequestInit;
                l2 = { draftKey: r3, filters: i3, orders: o4, limit: 100, fields: n4 !== null && n4 !== void 0 ? n4 : "id", depth: 0 };
                return [4, c3({ endpoint: t4, queries: a(s2({}, l2), { limit: 0 }), requestInit: u3 })];
              case 1:
                d2 = p2.sent(), h2 = d2.totalCount, y2 = [], v2 = 0, m2 = function(e6) {
                  return new Promise(function(t5) {
                    return setTimeout(t5, e6);
                  });
                }, b2 = function(e6) {
                  return e6.every(function(e7) {
                    return typeof e7 == "string";
                  });
                };
                p2.label = 2;
              case 2:
                if (!(y2.length < h2))
                  return [3, 7];
                return [4, c3({ endpoint: t4, queries: a(s2({}, l2), { offset: v2 }), requestInit: u3 })];
              case 3:
                w2 = p2.sent(), q2 = w2.contents, g2 = q2.map(function(e6) {
                  return e6[n4 !== null && n4 !== void 0 ? n4 : "id"];
                });
                if (!b2(g2))
                  throw new Error("The value of the field specified by `alternateField` is not a string.");
                y2 = f(y2).concat(f(g2)), v2 += 100;
                I2 = y2.length < h2;
                if (!I2)
                  return [3, 5];
                return [4, m2(1e3)];
              case 4:
                I2 = p2.sent();
                p2.label = 5;
              case 5:
                I2;
                p2.label = 6;
              case 6:
                return [3, 2];
              case 7:
                return [2, y2];
            }
          });
        });
        return function(t4) {
          return e4.apply(this, arguments);
        };
      }(), getAllContents: function() {
        var e4 = r(function(e5) {
          var t4, n4, r3, i3, o4, u3, f2, l2, d2, h2, y2, v2;
          return p(this, function(p2) {
            switch (p2.label) {
              case 0:
                t4 = e5.endpoint, n4 = e5.queries, r3 = n4 === void 0 ? {} : n4, i3 = e5.customRequestInit;
                return [4, c3({ endpoint: t4, queries: a(s2({}, r3), { limit: 0 }), requestInit: i3 })];
              case 1:
                o4 = p2.sent(), u3 = o4.totalCount, f2 = [], l2 = 0, d2 = function(e6) {
                  return new Promise(function(t5) {
                    return setTimeout(t5, e6);
                  });
                };
                p2.label = 2;
              case 2:
                if (!(f2.length < u3))
                  return [3, 7];
                return [4, c3({ endpoint: t4, queries: a(s2({}, r3), { limit: 100, offset: l2 }), requestInit: i3 })];
              case 3:
                h2 = p2.sent(), y2 = h2.contents;
                f2 = f2.concat(y2), l2 += 100;
                v2 = f2.length < u3;
                if (!v2)
                  return [3, 5];
                return [4, d2(1e3)];
              case 4:
                v2 = p2.sent();
                p2.label = 5;
              case 5:
                v2;
                p2.label = 6;
              case 6:
                return [3, 2];
              case 7:
                return [2, f2];
            }
          });
        });
        return function(t4) {
          return e4.apply(this, arguments);
        };
      }(), create: function() {
        var e4 = r(function(e5) {
          var t4, n4, r3, i3, o4, u3, f2, l2;
          return p(this, function(d2) {
            t4 = e5.endpoint, n4 = e5.contentId, r3 = e5.content, i3 = e5.isDraft, o4 = i3 === void 0 ? false : i3, u3 = e5.customRequestInit;
            if (!t4)
              return [2, Promise.reject(new Error("endpoint is required"))];
            f2 = o4 ? { status: "draft" } : {}, l2 = a(s2({}, u3), { method: n4 ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r3) });
            return [2, c3({ endpoint: t4, contentId: n4, queries: f2, requestInit: l2 })];
          });
        });
        return function(t4) {
          return e4.apply(this, arguments);
        };
      }(), update: function() {
        var e4 = r(function(e5) {
          var t4, n4, r3, i3, o4;
          return p(this, function(u3) {
            t4 = e5.endpoint, n4 = e5.contentId, r3 = e5.content, i3 = e5.customRequestInit;
            if (!t4)
              return [2, Promise.reject(new Error("endpoint is required"))];
            o4 = a(s2({}, i3), { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r3) });
            return [2, c3({ endpoint: t4, contentId: n4, requestInit: o4 })];
          });
        });
        return function(t4) {
          return e4.apply(this, arguments);
        };
      }(), delete: function() {
        var e4 = r(function(e5) {
          var t4, n4, r3, i3;
          return p(this, function(o4) {
            switch (o4.label) {
              case 0:
                t4 = e5.endpoint, n4 = e5.contentId, r3 = e5.customRequestInit;
                if (!t4)
                  return [2, Promise.reject(new Error("endpoint is required"))];
                if (!n4)
                  return [2, Promise.reject(new Error("contentId is required"))];
                i3 = a(s2({}, r3), { method: "DELETE", headers: {}, body: void 0 });
                return [4, c3({ endpoint: t4, contentId: n4, requestInit: i3 })];
              case 1:
                o4.sent();
                return [2];
            }
          });
        });
        return function(t4) {
          return e4.apply(this, arguments);
        };
      }() };
    };
  }
});

// .extend/output/server/chunks/works.js
var cms_domain, cms_key;
var init_works = __esm({
  ".extend/output/server/chunks/works.js"() {
    init_microcms_js_sdk();
    cms_domain = "hideko-portfolio";
    cms_key = "kPoCoA2uzNa4uQOSUgjOfvf2SCsxCwlej5MJ";
    E({
      serviceDomain: cms_domain,
      apiKey: cms_key
    });
  }
});

// .extend/output/server/entries/pages/works/_page.svelte.js
var page_svelte_exports5 = {};
__export(page_svelte_exports5, {
  default: () => Page5
});
function getYear(dateString) {
  const date = new Date(dateString);
  return date.getFullYear();
}
function getYearDifference(dateString, createdDateString) {
  const date = new Date(dateString);
  const createdDate = new Date(createdDateString);
  const timeDifference = date - createdDate;
  const daysDifference = Math.floor(timeDifference / (1e3 * 60 * 60 * 24));
  const yearsDifference = Math.floor(daysDifference / 365);
  if (yearsDifference < 1) {
    return daysDifference + "d ago";
  } else {
    return yearsDifference + "y ago";
  }
}
var css5, Page5;
var init_page_svelte5 = __esm({
  ".extend/output/server/entries/pages/works/_page.svelte.js"() {
    init_ssr();
    init_works();
    css5 = {
      code: "section.svelte-1rrgy8n{display:flex;align-items:center;justify-content:center}.contents.svelte-1rrgy8n{width:30rem;min-height:100vh;margin-top:7rem}.titles.svelte-1rrgy8n{display:flex;align-items:center;color:var(--text-thin);padding-inline:0.6rem;margin-bottom:0.3rem;font-family:'Roboto Mono Variable', sans-serif;font-size:14px\r\n    }.date.svelte-1rrgy8n{padding-right:1.8rem\r\n    }.ago.svelte-1rrgy8n{margin:0 0 0 auto}.content.svelte-1rrgy8n{display:flex;align-items:center;height:2.3rem;padding-inline:0.6rem;border-top:1px solid var(--little);font-family:'Roboto Mono Variable', sans-serif;font-weight:400;font-size:14px;transition:all 0.2s;cursor:pointer;text-decoration:none;color:var(--text)\r\n    }.y.svelte-1rrgy8n{padding-right:1.9rem}.t.svelte-1rrgy8n{width:10rem;white-space:nowrap;overflow:hidden}.a.svelte-1rrgy8n{margin:0 0 0 auto}.content.svelte-1rrgy8n:hover{background:var(--border)}@media(max-width: 600px){.contents.svelte-1rrgy8n{width:20rem}}",
      map: null
    };
    Page5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let data = [];
      $$result.css.add(css5);
      return `${$$result.head += `<!-- HEAD_svelte-h4ubwq_START -->${$$result.title = `<title>Works - Hideko Portfolio</title>`, ""}<!-- HEAD_svelte-h4ubwq_END -->`, ""} <section class="svelte-1rrgy8n"><div class="contents svelte-1rrgy8n"><div class="titles svelte-1rrgy8n" data-svelte-h="svelte-1teptle"><p class="date svelte-1rrgy8n">date</p> <p class="title">title</p> <p class="ago svelte-1rrgy8n">ago</p></div> ${each(data, (c3) => {
        return `<a class="content svelte-1rrgy8n" href="${"works/" + escape2(c3.id, true)}"><p class="y svelte-1rrgy8n">${escape2(getYear(c3.publishedAt))}</p> <p class="t svelte-1rrgy8n">${escape2(c3.title)}</p> <p class="a svelte-1rrgy8n">${escape2(getYearDifference(/* @__PURE__ */ new Date(), c3.publishedAt))}</p> </a>`;
      })}</div> </section>`;
    });
  }
});

// .extend/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  stylesheets: () => stylesheets7
});
var index7, component_cache7, component7, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  ".extend/output/server/nodes/6.js"() {
    index7 = 6;
    component7 = async () => component_cache7 ??= (await Promise.resolve().then(() => (init_page_svelte5(), page_svelte_exports5))).default;
    imports7 = ["_app/immutable/nodes/6.5ec2bc39.js", "_app/immutable/chunks/scheduler.0d2f776c.js", "_app/immutable/chunks/index.e8a83480.js", "_app/immutable/chunks/each.e59479a4.js", "_app/immutable/chunks/works.daa1dc1c.js"];
    stylesheets7 = ["_app/immutable/assets/6.801780bf.css"];
    fonts7 = [];
  }
});

// .extend/output/server/entries/pages/works/_id_/_page.svelte.js
var page_svelte_exports6 = {};
__export(page_svelte_exports6, {
  default: () => Page6
});
var css6, Page6;
var init_page_svelte6 = __esm({
  ".extend/output/server/entries/pages/works/_id_/_page.svelte.js"() {
    init_ssr();
    init_stores();
    init_works();
    css6 = {
      code: `section.svelte-r17fbq.svelte-r17fbq{display:flex;align-items:center;justify-content:center}.contents.svelte-r17fbq.svelte-r17fbq{width:30rem;margin-top:7rem;min-height:100vh}.title.svelte-r17fbq.svelte-r17fbq{font-size:25px;font-weight:700;color:var(--solid)}.dates.svelte-r17fbq.svelte-r17fbq{margin-top:5px;font-family:'Roboto Mono Variable', sans-serif;font-weight:300;font-size:14px}.mds.svelte-r17fbq.svelte-r17fbq{width:99%;margin:1rem auto 0}.stacks.svelte-r17fbq.svelte-r17fbq{margin-top:1.2rem;padding-top:1rem;padding-bottom:0.8rem;padding-inline:0.9rem;border-radius:8px;border:1px solid var(--border);position:relative;display:inline-flex;font-size:11px;box-sizing:border-box;align-items:center;font-family:"Roboto Mono Variable", sans-serif;font-weight:400;line-height:1.1876em;letter-spacing:0.00938em;flex-wrap:wrap;gap:6px;width:100%}.stacks.svelte-r17fbq span.svelte-r17fbq{position:absolute;left:18px;background:var(--bg);padding-inline:0.5rem;top:-7px;color:var(--text-thin);font-size:12px}.stacks.svelte-r17fbq .item.svelte-r17fbq{border:1px solid var(--border);width:max-content;padding-inline:10px;padding-block:4px;border-radius:100px;font-size:13px;grid-column:span 1\r
    }.links.svelte-r17fbq.svelte-r17fbq{display:flex;align-items:center;font-family:'Roboto Mono Variable', sans-serif;gap:6px;margin-top:8px}.links.svelte-r17fbq p.svelte-r17fbq{padding-inline:10px;padding-block:2px;border:1px solid var(--border);color:var(--text-thin);font-size:13px;border-radius:100px}.links.svelte-r17fbq a.svelte-r17fbq{font-size:13px;text-decoration:none;color:var(--text-thin);margin-bottom:2px;transition:all 0.2s;cursor:pointer}.links.svelte-r17fbq a.svelte-r17fbq:hover{color:var(--solid)}@media(max-width: 600px){.contents.svelte-r17fbq.svelte-r17fbq{width:20rem}}`,
      map: null
    };
    Page6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $page.params.id;
      let data = {};
      $$result.css.add(css6);
      $$unsubscribe_page();
      return `${$$result.head += `<!-- HEAD_svelte-yfsl1l_START -->${$$result.title = `<title>Works / ${escape2(data.title)} - Hideko Portfolio</title>`, ""}<!-- HEAD_svelte-yfsl1l_END -->`, ""} <section class="svelte-r17fbq">${``} </section>`;
    });
  }
});

// .extend/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  component: () => component8,
  fonts: () => fonts8,
  imports: () => imports8,
  index: () => index8,
  stylesheets: () => stylesheets8
});
var index8, component_cache8, component8, imports8, stylesheets8, fonts8;
var init__8 = __esm({
  ".extend/output/server/nodes/7.js"() {
    index8 = 7;
    component8 = async () => component_cache8 ??= (await Promise.resolve().then(() => (init_page_svelte6(), page_svelte_exports6))).default;
    imports8 = ["_app/immutable/nodes/7.1a7f930f.js", "_app/immutable/chunks/scheduler.0d2f776c.js", "_app/immutable/chunks/index.e8a83480.js", "_app/immutable/chunks/each.e59479a4.js", "_app/immutable/chunks/stores.3b1731a6.js", "_app/immutable/chunks/singletons.50650c4a.js", "_app/immutable/chunks/works.daa1dc1c.js"];
    stylesheets8 = ["_app/immutable/assets/7.791404b6.css"];
    fonts8 = [];
  }
});

// .extend/output/server/chunks/internal.js
init_ssr();
var base = "";
var assets = base;
var initial = { base, assets };
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  track_server_fetches: false,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/icon.svg" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "1d1b37b"
};
function get_hooks() {
  return {};
}

// node_modules/devalue/src/utils.js
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i2 = 0; i2 < len; i2 += 1) {
    const char = str[i2];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i2) + replacement;
      last_pos = i2 + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}

// node_modules/devalue/src/uneval.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i2) => {
            keys.push(`[${i2}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a2, b2) => b2[1] - a2[1]).forEach((entry, i2) => {
    names.set(entry[0], get_name(i2));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v2, i2) => i2 in thing ? stringify2(v2) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v2, i2) => {
            statements.push(`${name}[${i2}]=${stringify2(v2)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v2) => `add(${stringify2(v2)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v2]) => `set(${stringify2(k)}, ${stringify2(v2)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c3) {
  return escaped[c3] || c3;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}

// node_modules/devalue/src/constants.js
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p2 = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index10 = p2++;
    indexes.set(thing, index10);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index10] = `["${key2}",${flatten(value2)}]`;
        return index10;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i2 = 0; i2 < thing.length; i2 += 1) {
            if (i2 > 0)
              str += ",";
            if (i2 in thing) {
              keys.push(`[${i2}]`);
              str += flatten(thing[i2]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index10] = str;
    return index10;
  }
  const index9 = flatten(value);
  if (index9 < 0)
    return `${index9}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}

// .extend/output/server/index.js
init_chunks();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var DEV = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD"
]);
var PAGE_METHODS = /* @__PURE__ */ new Set(["GET", "POST", "HEAD"]);
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i2) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q2 = "1"] = match;
      parts.push({ type, subtype, q: +q2, i: i2 });
    }
  });
  parts.sort((a2, b2) => {
    if (a2.q !== b2.q) {
      return b2.q - a2.q;
    }
    if (a2.subtype === "*" !== (b2.subtype === "*")) {
      return a2.subtype === "*" ? 1 : -1;
    }
    if (a2.type === "*" !== (b2.type === "*")) {
      return a2.type === "*" ? 1 : -1;
    }
    return a2.i - b2.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
var HttpError = class {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body) {
    this.status = status;
    if (typeof body === "string") {
      this.body = { message: body };
    } else if (body) {
      this.body = body;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
};
var ActionFailure = class {
  /**
   * @param {number} status
   * @param {T} [data]
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i2 = 0; i2 < params.length; i2 += 1) {
    const param = params[i2];
    let value = values[i2 - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i2 - buffered, i2 + 1).filter((s22) => s22).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i2 + 1];
      const next_value = values[i2 + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function error(status, body) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  return new HttpError(status, body);
}
function json(data, init2) {
  const body = JSON.stringify(data);
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder$3.encode(body).byteLength.toString());
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
var encoder$3 = new TextEncoder();
function text(body, init2) {
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    const encoded = encoder$3.encode(body);
    headers.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers
    });
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {import('../runtime/control.js').Redirect | import('../runtime/control.js').HttpError | Error} */
    error2
  );
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = Array.from(ENDPOINT_METHODS).filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options2, error2);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body, {
      status
    });
  }
  return static_error_page(options2, status, body.message);
}
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return await options2.hooks.handleError({ error: error2, event }) ?? {
      message: event.route.id != null ? "Internal Error" : "Not Found"
    };
  }
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e3) {
    if (e3 instanceof Redirect) {
      return new Response(void 0, {
        status: e3.status,
        headers: { location: e3.location }
      });
    }
    throw e3;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (ENDPOINT_METHODS.has(method) && !PAGE_METHODS.has(method)) {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
var tracked_url_properties = (
  /** @type {const} */
  [
    "href",
    "pathname",
    "search",
    "searchParams",
    "toString",
    "toJSON"
  ]
);
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$index.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
var DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = error(405, "POST method not allowed. No actions exist for this index");
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e3) {
    const err = normalize_error(e3);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: err instanceof HttpError ? err.status : 500
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error2;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this index")
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e3) {
    const err = normalize_error(e3);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new Error(`No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")})`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e3) {
    const error2 = (
      /** @type {any} */
      e3
    );
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object) {
  for (const key2 in object) {
    if (typeof object[key2]?.then === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
async function load_server_data({
  event,
  state,
  node,
  parent,
  // TODO 2.0: Remove this
  track_server_fetches
}) {
  if (!node?.server)
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      const url2 = new URL(info instanceof Request ? info.url : info, event.url);
      if (track_server_fetches) {
        uses.dependencies.add(url2.href);
      }
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        uses.route = true;
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url
  });
  const data = result ? await unwrap_promises(result) : null;
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  });
  const data = result ? await unwrap_promises(result) : null;
  return data;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  return async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function text2() {
          const body = await response2.text();
          if (!body || typeof body === "string") {
            const status_number = Number(response2.status);
            if (isNaN(status_number)) {
              throw new Error(
                `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
              );
            }
            fetched.push({
              url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
              method: event.request.method,
              request_body: (
                /** @type {string | ArrayBufferView | undefined} */
                input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
              ),
              request_headers: cloned_headers,
              response_body: body,
              response: response2
            });
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            return buffer;
          };
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i2 = value.length;
      while (i2)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i2 = buffer.length;
      while (i2)
        hash2 = hash2 * 33 ^ buffer[--i2];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    else if (key2 === "age")
      age = value;
    else if (key2 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i2 = 0; i2 < array2.length; i2 += 16) {
    const w2 = array2.subarray(i2, i2 + 16);
    let tmp;
    let a2;
    let b2;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w2[i22];
      } else {
        a2 = w2[i22 + 1 & 15];
        b2 = w2[i22 + 14 & 15];
        tmp = w2[i22 & 15] = (a2 >>> 7 ^ a2 >>> 18 ^ a2 >>> 3 ^ a2 << 25 ^ a2 << 14) + (b2 >>> 17 ^ b2 >>> 19 ^ b2 >>> 10 ^ b2 << 15 ^ b2 << 13) + w2[i22 & 15] + w2[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a2 = bytes[i2 + 0];
    const b2 = bytes[i2 + 1];
    const c3 = bytes[i2 + 2];
    const d2 = bytes[i2 + 3];
    bytes[i2 + 0] = d2;
    bytes[i2 + 1] = c3;
    bytes[i2 + 2] = b2;
    bytes[i2 + 3] = a2;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l2 = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l2; i2 += 3) {
    result += chars2[bytes[i2 - 2] >> 2];
    result += chars2[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars2[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars2[bytes[i2] & 63];
  }
  if (i2 === l2 + 1) {
    result += chars2[bytes[i2 - 2] >> 2];
    result += chars2[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l2) {
    result += chars2[bytes[i2 - 2] >> 2];
    result += chars2[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars2[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var BaseProvider = class {
  /** @type {boolean} */
  #use_hashes;
  /** @type {boolean} */
  #script_needs_csp;
  /** @type {boolean} */
  #style_needs_csp;
  /** @type {import('types').CspDirectives} */
  #directives;
  /** @type {import('types').Csp.Source[]} */
  #script_src;
  /** @type {import('types').Csp.Source[]} */
  #style_src;
  /** @type {string} */
  #nonce;
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    this.#use_hashes = use_hashes;
    this.#directives = directives;
    const d2 = this.#directives;
    this.#script_src = [];
    this.#style_src = [];
    const effective_script_src = d2["script-src"] || d2["default-src"];
    const effective_style_src = d2["style-src"] || d2["default-src"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    this.#nonce = nonce;
  }
  /** @param {string} content */
  add_script(content) {
    if (this.#script_needs_csp) {
      if (this.#use_hashes) {
        this.#script_src.push(`sha256-${sha256(content)}`);
      } else if (this.#script_src.length === 0) {
        this.#script_src.push(`nonce-${this.#nonce}`);
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (this.#style_needs_csp) {
      if (this.#use_hashes) {
        this.#style_src.push(`sha256-${sha256(content)}`);
      } else if (this.#style_src.length === 0) {
        this.#style_src.push(`nonce-${this.#nonce}`);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v2) => !!v2).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /** @readonly */
  nonce = generate_nonce();
  /** @type {CspProvider} */
  csp_provider;
  /** @type {CspReportOnlyProvider} */
  report_only_provider;
  /**
   * @param {import('./types').CspConfig} config
   * @param {import('./types').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f2, r3) => {
    fulfil = f2;
    reject = r3;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if index template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets9 = new Set(client.stylesheets);
  const fonts9 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      data2 = { ...data2, ...branch[i2].data };
      props[`data_${i2}`] = data2;
    }
    props.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value
    };
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets9.add(url);
      for (const url of node.fonts)
        fonts9.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v2]) => inline_styles.set(k, v2));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets9) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts9) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global2 = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b2) => b2.server_data),
    global2
  );
  if (page_config.ssr && page_config.csr) {
    body += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const properties = [
      assets && `assets: ${s(assets)}`,
      `base: ${base_expression}`,
      `env: ${s(public_env)}`
    ].filter(Boolean);
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global2} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error2) {
        serialized.error = uneval(error2);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      args.push(`{
							${hydrate.join(",\n							")}
						}`);
    }
    blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global2) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options2, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error: error2 }, replacer);
          } catch (e3) {
            error2 = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error: error2 }, replacer);
          }
          push(`<script>${global2}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global2}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e3) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e3
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error: error2,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error2.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr3 = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr3) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({}),
        track_server_fetches: options2.track_server_fetches
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr: ssr3,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e3) {
    if (e3 instanceof Redirect) {
      return redirect_response(e3.status, e3.location);
    }
    return static_error_page(
      options2,
      e3 instanceof HttpError ? e3.status : 500,
      (await handle_error_and_jsonify(event, options2, e3)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n3, i2) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n3 == void 0 ? n3 : await manifest2._.nodes[n3]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j2 = 0; j2 < i2; j2 += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j2]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e3) {
          aborted = true;
          throw e3;
        }
      });
    });
    const promises = functions.map(async (fn, i2) => {
      if (!invalidated[i2]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p2, i2) => p2.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i2 + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError ? error2.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e3) {
    const error2 = normalize_error(e3);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error2), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e3) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e3
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch (e3) {
              const error2 = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error2, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e3) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e3
    ));
  }
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await Promise.all([
      // we use == here rather than === because [undefined] serializes as "[null]"
      ...page2.layouts.map((n3) => n3 == void 0 ? n3 : manifest2._.nodes[n3]()),
      manifest2._.nodes[page2.leaf]()
    ]);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i2) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j2 = 0; j2 < i2; j2 += 1) {
                const parent = await server_promises[j2];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e3) {
          load_error = /** @type {Error} */
          e3;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i2) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j2 = 0; j2 < i2; j2 += 1) {
                Object.assign(data, await load_promises[j2]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i2],
            state,
            csr
          });
        } catch (e3) {
          load_error = /** @type {Error} */
          e3;
          throw load_error;
        }
      });
    });
    for (const p2 of server_promises)
      p2.catch(() => {
      });
    for (const p2 of load_promises)
      p2.catch(() => {
      });
    for (let i2 = 0; i2 < nodes.length; i2 += 1) {
      const node = nodes[i2];
      if (node) {
        try {
          const server_data = await server_promises[i2];
          const data = await load_promises[i2];
          branch.push({ node, server_data, data });
        } catch (e3) {
          const err = normalize_error(e3);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i2--) {
            if (page2.errors[i2]) {
              const index9 = (
                /** @type {number} */
                page2.errors[i2]
              );
              const node2 = await manifest2._.nodes[index9]();
              let j2 = i2;
              while (!branch[j2])
                j2 -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j2 + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (e3) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e3,
      resolve_opts
    });
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c3 = new_cookies[name];
      if (c3 && domain_matches(url.hostname, c3.options.domain) && path_matches(url.pathname, c3.options.path)) {
        return c3.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie.parse)(header, { decode: decoder });
      for (const c3 of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c3.options.domain) && path_matches(url.pathname, c3.options.path)) {
          cookies2[c3.name] = c3.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    set(name, value, opts = {}) {
      set_internal(name, value, { ...defaults, ...opts });
    },
    /**
     * @param {string} name
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    delete(name, opts = {}) {
      cookies.set(name, "", {
        ...opts,
        maxAge: 0
      });
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    serialize(name, value, opts) {
      return (0, import_cookie.serialize)(name, value, {
        ...defaults,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  function set_internal(name, value, opts) {
    const path = opts.path ?? default_path;
    new_cookies[name] = {
      name,
      value,
      options: {
        ...opts,
        path
      }
    };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers.append("set-cookie", (0, import_cookie.serialize)(name, value, options2));
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  return async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return await options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str);
            set_internal(
              name,
              value,
              /** @type {import('cookie').CookieSerializeOptions} */
              options3
            );
          }
        }
        return response;
      }
    });
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var valid_layout_exports = /* @__PURE__ */ new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config"
]);
var valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
var valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
var valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
var valid_server_exports = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "fallback",
  "prerender",
  "trailingSlash",
  "config",
  "entries"
]);
var validate_layout_exports = validator(valid_layout_exports);
var validate_page_exports = validator(valid_page_exports);
var validate_layout_server_exports = validator(valid_layout_server_exports);
var validate_page_server_exports = validator(valid_page_server_exports);
var validate_server_exports = validator(valid_server_exports);
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-cloudflare"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await Promise.all([
          // we use == here rather than === because [undefined] serializes as "[null]"
          ...route.page.layouts.map((n3) => n3 == void 0 ? n3 : manifest2._.nodes[n3]()),
          manifest2._.nodes[route.page.leaf]()
        ]);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        for (const key2 in headers) {
          const value = headers[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers2.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e3) {
    if (e3 instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e3) : route?.page && is_action_json_request(event) ? action_json_redirect(e3) : redirect_response(e3.status, e3.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e3);
  }
  async function resolve(event2, opts) {
    try {
      if (opts) {
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v2) => v2.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e3) {
      return await handle_fatal_error(event2, options2, e3);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var Server = class {
  /** @type {import('types').SSROptions} */
  #options;
  /** @type {import('@sveltejs/kit').SSRManifest} */
  #manifest;
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    this.#options = options;
    this.#manifest = manifest2;
  }
  /**
   * @param {{
   *   env: Record<string, string>
   * }} opts
   */
  async init({ env }) {
    set_private_env(
      filter_private_env(env, {
        public_prefix: this.#options.env_public_prefix,
        private_prefix: this.#options.env_private_prefix
      })
    );
    set_public_env(
      filter_public_env(env, {
        public_prefix: this.#options.env_public_prefix,
        private_prefix: this.#options.env_private_prefix
      })
    );
    if (!this.#options.hooks) {
      try {
        const module = await get_hooks();
        this.#options.hooks = {
          handle: module.handle || (({ event, resolve }) => resolve(event)),
          handleError: module.handleError || (({ error: error2 }) => console.error(error2)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
        };
      } catch (error2) {
        {
          throw error2;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    if (!(request instanceof Request)) {
      throw new Error(
        "The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details"
      );
    }
    return respond(request, this.#options, this.#manifest, {
      ...options2,
      error: false,
      depth: 0
    });
  }
};

// .extend/cloudflare-tmp/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ??= value = fn();
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["icon.svg", "robots.txt"]),
    mimeTypes: { ".svg": "image/svg+xml", ".txt": "text/plain" },
    _: {
      client: { "start": "_app/immutable/entry/start.772c388b.js", "app": "_app/immutable/entry/app.69a2ed23.js", "imports": ["_app/immutable/entry/start.772c388b.js", "_app/immutable/chunks/scheduler.0d2f776c.js", "_app/immutable/chunks/singletons.50650c4a.js", "_app/immutable/entry/app.69a2ed23.js", "_app/immutable/chunks/scheduler.0d2f776c.js", "_app/immutable/chunks/index.e8a83480.js"], "stylesheets": [], "fonts": [] },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6))),
        __memo(() => Promise.resolve().then(() => (init__7(), __exports7))),
        __memo(() => Promise.resolve().then(() => (init__8(), __exports8)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null
        },
        {
          id: "/contact",
          pattern: /^\/contact\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 3 },
          endpoint: null
        },
        {
          id: "/home",
          pattern: /^\/home\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 4 },
          endpoint: null
        },
        {
          id: "/pg",
          pattern: /^\/pg\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 5 },
          endpoint: null
        },
        {
          id: "/works",
          pattern: /^\/works\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 6 },
          endpoint: null
        },
        {
          id: "/works/[id]",
          pattern: /^\/works\/([^/]+?)\/?$/,
          params: [{ "name": "id", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0], errors: [1], leaf: 7 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      }
    }
  };
})();
var prerendered = /* @__PURE__ */ new Set([]);

// .extend/cloudflare-tmp/_worker.js
async function e2(e3, t22) {
  let n22 = "string" != typeof t22 && "HEAD" === t22.method;
  n22 && (t22 = new Request(t22, { method: "GET" }));
  let r3 = await e3.match(t22);
  return n22 && r3 && (r3 = new Response(null, r3)), r3;
}
function t2(e3, t22, n22, o22) {
  return ("string" == typeof t22 || "GET" === t22.method) && r2(n22) && (n22.headers.has("Set-Cookie") && (n22 = new Response(n22.body, n22)).headers.append("Cache-Control", "private=Set-Cookie"), o22.waitUntil(e3.put(t22, n22.clone()))), n22;
}
var n2 = /* @__PURE__ */ new Set([200, 203, 204, 300, 301, 404, 405, 410, 414, 501]);
function r2(e3) {
  if (!n2.has(e3.status))
    return false;
  if (~(e3.headers.get("Vary") || "").indexOf("*"))
    return false;
  let t22 = e3.headers.get("Cache-Control") || "";
  return !/(private|no-cache|no-store)/i.test(t22);
}
function o2(n22) {
  return async function(r3, o22) {
    let a2 = await e2(n22, r3);
    if (a2)
      return a2;
    o22.defer((e3) => {
      t2(n22, r3, e3, o22);
    });
  };
}
var s3 = caches.default;
var c2 = t2.bind(0, s3);
var r22 = e2.bind(0, s3);
var e22 = o2.bind(0, s3);
var server = new Server(manifest);
var worker = {
  async fetch(req, env, context) {
    await server.init({ env });
    let pragma = req.headers.get("cache-control") || "";
    let res = !pragma.includes("no-cache") && await r22(req);
    if (res)
      return res;
    let { pathname } = new URL(req.url);
    try {
      pathname = decodeURIComponent(pathname);
    } catch {
    }
    const stripped_pathname = pathname.replace(/\/$/, "");
    let is_static_asset = false;
    const filename = stripped_pathname.substring(1);
    if (filename) {
      is_static_asset = manifest.assets.has(filename) || manifest.assets.has(filename + "/index.html");
    }
    const location = pathname.at(-1) === "/" ? stripped_pathname : pathname + "/";
    if (is_static_asset || prerendered.has(pathname)) {
      res = await env.ASSETS.fetch(req);
    } else if (location && prerendered.has(location)) {
      res = new Response("", {
        status: 308,
        headers: {
          location
        }
      });
    } else {
      res = await server.respond(req, {
        // @ts-ignore
        platform: { env, context, caches, cf: req.cf },
        getClientAddress() {
          return req.headers.get("cf-connecting-ip");
        }
      });
    }
    pragma = res.headers.get("cache-control") || "";
    return pragma && res.status < 400 ? c2(req, res, context) : res;
  }
};
var worker_default = worker;
export {
  worker_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=_worker.js.map
