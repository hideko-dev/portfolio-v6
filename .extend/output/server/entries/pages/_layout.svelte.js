import { c as create_ssr_component, a as subscribe, b as add_attribute, d as each, v as validate_component, e as escape, o as onDestroy, j as add_styles, m as missing_component, k as spread, l as escape_object, p as merge_ssr_styles } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { F as Fa } from "../../chunks/fa.js";
import { u as useToasterStore, t as toast, s as startPause, e as endPause, a as update, p as prefersReducedMotion } from "../../chunks/Toaster.svelte_svelte_type_style_lang.js";
const theme$1 = "";
const theme = writable("system");
const themeMenu = writable(false);
const size = 17;
const ThemeIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { mode } = $$props;
  const dark = `<svg xmlns="http://www.w3.org/2000/svg" width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"><path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;
  const light = `<svg xmlns="http://www.w3.org/2000/svg" width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`;
  const system = `<svg fill="none" height=${size} shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color: currentcolor; width: 16px; height: 16px;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><path d="M8 21h8"></path><path d="M12 17v4"></path></svg>`;
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  $$unsubscribe_theme();
  return `${mode === void 0 ? `${$theme === "dark" ? `<!-- HTML_TAG_START -->${dark}<!-- HTML_TAG_END -->` : `${$theme === "light" ? `<!-- HTML_TAG_START -->${light}<!-- HTML_TAG_END -->` : ``}`}` : `${mode === "dark" ? `<!-- HTML_TAG_START -->${dark}<!-- HTML_TAG_END -->` : `${mode === "light" ? `<!-- HTML_TAG_START -->${light}<!-- HTML_TAG_END -->` : `${mode === "system" ? `<!-- HTML_TAG_START -->${system}<!-- HTML_TAG_END -->` : ``}`}`}`}`;
});
const themeMenu_svelte_svelte_type_style_lang = "";
const css$b = {
  code: "section.svelte-196840g{width:5.7rem;height:5.5rem;padding-block:5px;padding-inline:5px;position:absolute;right:0;top:2rem;background:var(--bg);border:1px solid var(--border);transform-origin:right top;transition:all 0.15s;-webkit-user-select:none;-moz-user-select:none;user-select:none;border-radius:10px;display:grid;box-shadow:0 0 10px 0 rgba(0, 0, 0, 0.1)}.btn.svelte-196840g{font-size:12px;padding-inline:7px;display:flex;align-items:center;gap:3px;border-radius:5px;transition:all 0.2s;cursor:pointer}.btn.svelte-196840g:hover{background:var(--border)}",
  map: null
};
const ThemeMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $themeMenu, $$unsubscribe_themeMenu;
  $$unsubscribe_themeMenu = subscribe(themeMenu, (value) => $themeMenu = value);
  let sectionRef;
  let style = "scale: 0.9; opacity: 0; pointer-events: none";
  const styles = [
    { theme: "dark", name: "Dark" },
    { theme: "light", name: "Light" },
    { theme: "system", name: "System" }
  ];
  $$result.css.add(css$b);
  {
    {
      if ($themeMenu) {
        style = "scale: 1; opacity: 1; pointer-events: all";
      } else {
        style = "scale: 0.9; opacity: 0; pointer-events: none";
      }
    }
  }
  $$unsubscribe_themeMenu();
  return `<section${add_attribute("style", style, 0)} class="svelte-196840g"${add_attribute("this", sectionRef, 0)}>${each(styles, (s) => {
    return `<div class="btn svelte-196840g">${validate_component(ThemeIcon, "ThemeIcon").$$render($$result, { mode: s.theme }, {}, {})} <p>${escape(s.name)}</p> </div>`;
  })} </section>`;
});
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate" || key === "on_navigate" || key === "push_state" || key === "replace_state") {
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
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const onNavigate = /* @__PURE__ */ client_method("on_navigate");
const headerNav_svelte_svelte_type_style_lang = "";
const css$a = {
  code: ".navtext.svelte-sdiwuj{z-index:2}.navs.svelte-sdiwuj{border-radius:100px;margin-top:10px;display:flex;align-items:center;border:1px solid var(--border);background:rgba(var(--bg-rgb), 0.2);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);position:relative;width:8.5rem;box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.05)}.box.svelte-sdiwuj{position:absolute;height:1.6rem;z-index:-1;border-radius:100px;background:var(--text);opacity:1;transition:all 0.3s}.nav.svelte-sdiwuj{display:flex;align-items:center;justify-content:center;text-decoration:none;font-size:15px;color:var(--btn-text);transition:all 0.2s;padding-block:3px;border-radius:100px;position:relative}.nav.svelte-sdiwuj:hover{color:var(--thin)}.works.svelte-sdiwuj{width:4rem}.contact.svelte-sdiwuj{width:4rem}",
  map: null
};
let worksStyle = "width: 4rem; left: 0; opacity: 1";
let contactStyle = "width: 4.7rem; left: 59px; opacity: 1";
const navStyle = "color: var(--bg);";
const HeaderNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let boxStyle = "opacity: 0";
  let route = "/";
  onNavigate((c) => {
    route = c.to.route.id;
  });
  $$result.css.add(css$a);
  {
    {
      if (route === "/works") {
        boxStyle = worksStyle;
      } else if (route === "/contact") {
        boxStyle = contactStyle;
      } else {
        boxStyle = "opacity: 0";
      }
    }
  }
  return `<div class="navs svelte-sdiwuj"><div class="box svelte-sdiwuj"${add_attribute("style", boxStyle, 0)}></div> <a class="nav works svelte-sdiwuj" href="/works"${add_attribute("style", `${route === "/works" ? navStyle : null}`, 0)}><p class="navtext svelte-sdiwuj" data-svelte-h="svelte-ky40d9">works</p></a> <a class="nav contact svelte-sdiwuj" href="/contact"${add_attribute("style", `${route === "/contact" ? navStyle : null}`, 0)}><p class="navtext svelte-sdiwuj" data-svelte-h="svelte-18oqy4j">contact</p></a> </div>`;
});
const header_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: ".container.svelte-1g5qcdz{width:35.2rem;display:block}.title.svelte-1g5qcdz{text-decoration:none;color:var(--text);font-family:'Inter', sans-serif;margin:0 auto 0 0}.name.svelte-1g5qcdz{font-weight:700;font-size:20px}.sub.svelte-1g5qcdz{margin-top:2px;font-size:14px}.right.svelte-1g5qcdz{display:flex;align-items:center;margin:0 0 0 auto}section.svelte-1g5qcdz{display:flex;justify-content:center;align-items:center;height:11rem;position:fixed;width:100%;padding:2rem;background:rgba(var(--bg-rgb), 0.75);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);z-index:100}.content.svelte-1g5qcdz{display:flex;align-items:center;justify-content:center}@media(max-width: 700px){section.svelte-1g5qcdz{padding:0;width:100%}.container.svelte-1g5qcdz{width:81%}}.theme.svelte-1g5qcdz{width:1.9rem;height:1.9rem;display:flex;align-items:center;justify-content:center;border-radius:7px;border:1px solid transparent;position:relative;margin-left:12px;transition:all 0.2s}.theme-icon.svelte-1g5qcdz{width:100%;height:100%;border-radius:7px;display:flex;align-items:center;justify-content:center;transition:all 0.2s}.theme-icon.svelte-1g5qcdz:hover{background:var(--outline)}.links.svelte-1g5qcdz{display:flex;align-items:center;justify-content:center;gap:20px}.link.svelte-1g5qcdz{text-decoration:none;color:var(--text);font-size:20px;transition:all 0.2s}.link.svelte-1g5qcdz:hover{opacity:0.6}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const links = [
    {
      icon: faGithub,
      href: "https://github.com/hideko-dev"
    },
    {
      icon: faInstagram,
      href: "https://instagram.com/hideko.cat"
    }
  ];
  $$result.css.add(css$9);
  return `<section class="svelte-1g5qcdz"><div class="container svelte-1g5qcdz"><div class="content svelte-1g5qcdz"><div class="left"><a class="title svelte-1g5qcdz" href="/" data-svelte-h="svelte-l8z930"><p class="name svelte-1g5qcdz">hideko</p> <p class="sub svelte-1g5qcdz">● fullstack engineer</p></a> ${validate_component(HeaderNav, "HeaderNav").$$render($$result, {}, {}, {})}</div> <div class="right svelte-1g5qcdz"><div class="links svelte-1g5qcdz">${each(links, (link) => {
    return `<a${add_attribute("href", link.href, 0)} class="link svelte-1g5qcdz">${validate_component(Fa, "Fa").$$render($$result, { icon: link.icon }, {}, {})}</a>`;
  })}</div> <div class="theme svelte-1g5qcdz"><div class="theme-icon svelte-1g5qcdz">${validate_component(ThemeIcon, "ThemeIcon").$$render($$result, {}, {}, {})}</div> ${validate_component(ThemeMenu, "ThemeMenu").$$render($$result, {}, {}, {})}</div></div></div></div> </section>`;
});
const footer_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: "section.svelte-1hoqv4v{height:4rem;display:flex;align-items:center;justify-content:center;font-size:14px}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$8);
  return `<section class="svelte-1hoqv4v"><p>© ${escape((/* @__PURE__ */ new Date()).getFullYear())} Hideko. All Rights Reserved.</p> </section>`;
});
const PageTransition = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { pathname = "" } = $$props;
  if ($$props.pathname === void 0 && $$bindings.pathname && pathname !== void 0)
    $$bindings.pathname(pathname);
  return `<div>${slots.default ? slots.default({}) : ``}</div>`;
});
function calculateOffset(toast2, $toasts, opts) {
  const { reverseOrder, gutter = 8, defaultPosition } = opts || {};
  const relevantToasts = $toasts.filter((t) => (t.position || defaultPosition) === (toast2.position || defaultPosition) && t.height);
  const toastIndex = relevantToasts.findIndex((t) => t.id === toast2.id);
  const toastsBefore = relevantToasts.filter((toast3, i) => i < toastIndex && toast3.visible).length;
  const offset = relevantToasts.filter((t) => t.visible).slice(...reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]).reduce((acc, t) => acc + (t.height || 0) + gutter, 0);
  return offset;
}
const handlers = {
  startPause() {
    startPause(Date.now());
  },
  endPause() {
    endPause(Date.now());
  },
  updateHeight: (toastId, height) => {
    update({ id: toastId, height });
  },
  calculateOffset
};
function useToaster(toastOptions) {
  const { toasts, pausedAt } = useToasterStore(toastOptions);
  const timeouts = /* @__PURE__ */ new Map();
  let _pausedAt;
  const unsubscribes = [
    pausedAt.subscribe(($pausedAt) => {
      if ($pausedAt) {
        for (const [, timeoutId] of timeouts) {
          clearTimeout(timeoutId);
        }
        timeouts.clear();
      }
      _pausedAt = $pausedAt;
    }),
    toasts.subscribe(($toasts) => {
      if (_pausedAt) {
        return;
      }
      const now = Date.now();
      for (const t of $toasts) {
        if (timeouts.has(t.id)) {
          continue;
        }
        if (t.duration === Infinity) {
          continue;
        }
        const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt);
        if (durationLeft < 0) {
          if (t.visible) {
            toast.dismiss(t.id);
          }
          return null;
        }
        timeouts.set(t.id, setTimeout(() => toast.dismiss(t.id), durationLeft));
      }
    })
  ];
  onDestroy(() => {
    for (const unsubscribe of unsubscribes) {
      unsubscribe();
    }
  });
  return { toasts, handlers };
}
const css$7 = {
  code: "div.svelte-lzwg39{width:20px;opacity:0;height:20px;border-radius:10px;background:var(--primary, #61d345);position:relative;transform:rotate(45deg);animation:svelte-lzwg39-circleAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;animation-delay:100ms}div.svelte-lzwg39::after{content:'';box-sizing:border-box;animation:svelte-lzwg39-checkmarkAnimation 0.2s ease-out forwards;opacity:0;animation-delay:200ms;position:absolute;border-right:2px solid;border-bottom:2px solid;border-color:var(--secondary, #fff);bottom:6px;left:6px;height:10px;width:6px}@keyframes svelte-lzwg39-circleAnimation{from{transform:scale(0) rotate(45deg);opacity:0}to{transform:scale(1) rotate(45deg);opacity:1}}@keyframes svelte-lzwg39-checkmarkAnimation{0%{height:0;width:0;opacity:0}40%{height:0;width:6px;opacity:1}100%{opacity:1;height:10px}}",
  map: null
};
const CheckmarkIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { primary = "#61d345" } = $$props;
  let { secondary = "#fff" } = $$props;
  if ($$props.primary === void 0 && $$bindings.primary && primary !== void 0)
    $$bindings.primary(primary);
  if ($$props.secondary === void 0 && $$bindings.secondary && secondary !== void 0)
    $$bindings.secondary(secondary);
  $$result.css.add(css$7);
  return `  <div class="svelte-lzwg39"${add_styles({
    "--primary": primary,
    "--secondary": secondary
  })}></div>`;
});
const css$6 = {
  code: "div.svelte-10jnndo{width:20px;opacity:0;height:20px;border-radius:10px;background:var(--primary, #ff4b4b);position:relative;transform:rotate(45deg);animation:svelte-10jnndo-circleAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;animation-delay:100ms}div.svelte-10jnndo::after,div.svelte-10jnndo::before{content:'';animation:svelte-10jnndo-firstLineAnimation 0.15s ease-out forwards;animation-delay:150ms;position:absolute;border-radius:3px;opacity:0;background:var(--secondary, #fff);bottom:9px;left:4px;height:2px;width:12px}div.svelte-10jnndo:before{animation:svelte-10jnndo-secondLineAnimation 0.15s ease-out forwards;animation-delay:180ms;transform:rotate(90deg)}@keyframes svelte-10jnndo-circleAnimation{from{transform:scale(0) rotate(45deg);opacity:0}to{transform:scale(1) rotate(45deg);opacity:1}}@keyframes svelte-10jnndo-firstLineAnimation{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}@keyframes svelte-10jnndo-secondLineAnimation{from{transform:scale(0) rotate(90deg);opacity:0}to{transform:scale(1) rotate(90deg);opacity:1}}",
  map: null
};
const ErrorIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { primary = "#ff4b4b" } = $$props;
  let { secondary = "#fff" } = $$props;
  if ($$props.primary === void 0 && $$bindings.primary && primary !== void 0)
    $$bindings.primary(primary);
  if ($$props.secondary === void 0 && $$bindings.secondary && secondary !== void 0)
    $$bindings.secondary(secondary);
  $$result.css.add(css$6);
  return `  <div class="svelte-10jnndo"${add_styles({
    "--primary": primary,
    "--secondary": secondary
  })}></div>`;
});
const css$5 = {
  code: "div.svelte-bj4lu8{width:12px;height:12px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--secondary, #e0e0e0);border-right-color:var(--primary, #616161);animation:svelte-bj4lu8-rotate 1s linear infinite}@keyframes svelte-bj4lu8-rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
  map: null
};
const LoaderIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { primary = "#616161" } = $$props;
  let { secondary = "#e0e0e0" } = $$props;
  if ($$props.primary === void 0 && $$bindings.primary && primary !== void 0)
    $$bindings.primary(primary);
  if ($$props.secondary === void 0 && $$bindings.secondary && secondary !== void 0)
    $$bindings.secondary(secondary);
  $$result.css.add(css$5);
  return `  <div class="svelte-bj4lu8"${add_styles({
    "--primary": primary,
    "--secondary": secondary
  })}></div>`;
});
const css$4 = {
  code: ".indicator.svelte-1c92bpz{position:relative;display:flex;justify-content:center;align-items:center;min-width:20px;min-height:20px}.status.svelte-1c92bpz{position:absolute}.animated.svelte-1c92bpz{position:relative;transform:scale(0.6);opacity:0.4;min-width:20px;animation:svelte-1c92bpz-enter 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards}@keyframes svelte-1c92bpz-enter{from{transform:scale(0.6);opacity:0.4}to{transform:scale(1);opacity:1}}",
  map: null
};
const ToastIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let type;
  let icon;
  let iconTheme;
  let { toast: toast2 } = $$props;
  if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0)
    $$bindings.toast(toast2);
  $$result.css.add(css$4);
  ({ type, icon, iconTheme } = toast2);
  return `${typeof icon === "string" ? `<div class="animated svelte-1c92bpz">${escape(icon)}</div>` : `${typeof icon !== "undefined" ? `${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}` : `${type !== "blank" ? `<div class="indicator svelte-1c92bpz">${validate_component(LoaderIcon, "LoaderIcon").$$render($$result, Object.assign({}, iconTheme), {}, {})} ${type !== "loading" ? `<div class="status svelte-1c92bpz">${type === "error" ? `${validate_component(ErrorIcon, "ErrorIcon").$$render($$result, Object.assign({}, iconTheme), {}, {})}` : `${validate_component(CheckmarkIcon, "CheckmarkIcon").$$render($$result, Object.assign({}, iconTheme), {}, {})}`}</div>` : ``}</div>` : ``}`}`}`;
});
const css$3 = {
  code: ".message.svelte-o805t1{display:flex;justify-content:center;margin:4px 10px;color:inherit;flex:1 1 auto;white-space:pre-line}",
  map: null
};
const ToastMessage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { toast: toast2 } = $$props;
  if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0)
    $$bindings.toast(toast2);
  $$result.css.add(css$3);
  return `<div${spread([{ class: "message" }, escape_object(toast2.ariaProps)], { classes: "svelte-o805t1" })}>${typeof toast2.message === "string" ? `${escape(toast2.message)}` : `${validate_component(toast2.message || missing_component, "svelte:component").$$render($$result, { toast: toast2 }, {}, {})}`} </div>`;
});
const css$2 = {
  code: "@keyframes svelte-15lyehg-enterAnimation{0%{transform:translate3d(0, calc(var(--factor) * -200%), 0) scale(0.6);opacity:0.5}100%{transform:translate3d(0, 0, 0) scale(1);opacity:1}}@keyframes svelte-15lyehg-exitAnimation{0%{transform:translate3d(0, 0, -1px) scale(1);opacity:1}100%{transform:translate3d(0, calc(var(--factor) * -150%), -1px) scale(0.6);opacity:0}}@keyframes svelte-15lyehg-fadeInAnimation{0%{opacity:0}100%{opacity:1}}@keyframes svelte-15lyehg-fadeOutAnimation{0%{opacity:1}100%{opacity:0}}.base.svelte-15lyehg{display:flex;align-items:center;background:#fff;color:#363636;line-height:1.3;will-change:transform;box-shadow:0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);max-width:350px;pointer-events:auto;padding:8px 10px;border-radius:8px}.transparent.svelte-15lyehg{opacity:0}.enter.svelte-15lyehg{animation:svelte-15lyehg-enterAnimation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards}.exit.svelte-15lyehg{animation:svelte-15lyehg-exitAnimation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards}.fadeIn.svelte-15lyehg{animation:svelte-15lyehg-fadeInAnimation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards}.fadeOut.svelte-15lyehg{animation:svelte-15lyehg-fadeOutAnimation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards}",
  map: null
};
const ToastBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { toast: toast2 } = $$props;
  let { position = void 0 } = $$props;
  let { style = "" } = $$props;
  let { Component = void 0 } = $$props;
  let factor;
  let animation;
  if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0)
    $$bindings.toast(toast2);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.Component === void 0 && $$bindings.Component && Component !== void 0)
    $$bindings.Component(Component);
  $$result.css.add(css$2);
  {
    {
      const top = (toast2.position || position || "top-center").includes("top");
      factor = top ? 1 : -1;
      const [enter, exit] = prefersReducedMotion() ? ["fadeIn", "fadeOut"] : ["enter", "exit"];
      animation = toast2.visible ? enter : exit;
    }
  }
  return `<div class="${"base " + escape(toast2.height ? animation : "transparent", true) + " " + escape(toast2.className || "", true) + " svelte-15lyehg"}"${add_styles(merge_ssr_styles(escape(style, true) + "; " + escape(toast2.style, true), { "--factor": factor }))}>${Component ? `${validate_component(Component || missing_component, "svelte:component").$$render($$result, {}, {}, {
    message: () => {
      return `${validate_component(ToastMessage, "ToastMessage").$$render($$result, { toast: toast2, slot: "message" }, {}, {})}`;
    },
    icon: () => {
      return `${validate_component(ToastIcon, "ToastIcon").$$render($$result, { toast: toast2, slot: "icon" }, {}, {})}`;
    }
  })}` : `${slots.default ? slots.default({ ToastIcon, ToastMessage, toast: toast2 }) : ` ${validate_component(ToastIcon, "ToastIcon").$$render($$result, { toast: toast2 }, {}, {})} ${validate_component(ToastMessage, "ToastMessage").$$render($$result, { toast: toast2 }, {}, {})} `}`} </div>`;
});
const css$1 = {
  code: ".wrapper.svelte-1pakgpd{left:0;right:0;display:flex;position:absolute;transform:translateY(calc(var(--offset, 16px) * var(--factor) * 1px))}.transition.svelte-1pakgpd{transition:all 230ms cubic-bezier(0.21, 1.02, 0.73, 1)}.active.svelte-1pakgpd{z-index:9999}.active.svelte-1pakgpd>*{pointer-events:auto}",
  map: null
};
const ToastWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let top;
  let bottom;
  let factor;
  let justifyContent;
  let { toast: toast2 } = $$props;
  let { setHeight } = $$props;
  let wrapperEl;
  if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0)
    $$bindings.toast(toast2);
  if ($$props.setHeight === void 0 && $$bindings.setHeight && setHeight !== void 0)
    $$bindings.setHeight(setHeight);
  $$result.css.add(css$1);
  top = toast2.position?.includes("top") ? 0 : null;
  bottom = toast2.position?.includes("bottom") ? 0 : null;
  factor = toast2.position?.includes("top") ? 1 : -1;
  justifyContent = toast2.position?.includes("center") && "center" || (toast2.position?.includes("right") || toast2.position?.includes("end")) && "flex-end" || null;
  return `<div class="${[
    "wrapper svelte-1pakgpd",
    (toast2.visible ? "active" : "") + " " + (!prefersReducedMotion() ? "transition" : "")
  ].join(" ").trim()}"${add_styles({
    "--factor": factor,
    "--offset": toast2.offset,
    top,
    bottom,
    "justify-content": justifyContent
  })}${add_attribute("this", wrapperEl, 0)}>${toast2.type === "custom" ? `${validate_component(ToastMessage, "ToastMessage").$$render($$result, { toast: toast2 }, {}, {})}` : `${slots.default ? slots.default({ toast: toast2 }) : ` ${validate_component(ToastBar, "ToastBar").$$render($$result, { toast: toast2, position: toast2.position }, {}, {})} `}`} </div>`;
});
const css = {
  code: ".toaster.svelte-jyff3d{--default-offset:16px;position:fixed;z-index:9999;top:var(--default-offset);left:var(--default-offset);right:var(--default-offset);bottom:var(--default-offset);pointer-events:none}",
  map: null
};
const Toaster = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toasts, $$unsubscribe_toasts;
  let { reverseOrder = false } = $$props;
  let { position = "top-center" } = $$props;
  let { toastOptions = void 0 } = $$props;
  let { gutter = 8 } = $$props;
  let { containerStyle = void 0 } = $$props;
  let { containerClassName = void 0 } = $$props;
  const { toasts, handlers: handlers2 } = useToaster(toastOptions);
  $$unsubscribe_toasts = subscribe(toasts, (value) => $toasts = value);
  let _toasts;
  if ($$props.reverseOrder === void 0 && $$bindings.reverseOrder && reverseOrder !== void 0)
    $$bindings.reverseOrder(reverseOrder);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.toastOptions === void 0 && $$bindings.toastOptions && toastOptions !== void 0)
    $$bindings.toastOptions(toastOptions);
  if ($$props.gutter === void 0 && $$bindings.gutter && gutter !== void 0)
    $$bindings.gutter(gutter);
  if ($$props.containerStyle === void 0 && $$bindings.containerStyle && containerStyle !== void 0)
    $$bindings.containerStyle(containerStyle);
  if ($$props.containerClassName === void 0 && $$bindings.containerClassName && containerClassName !== void 0)
    $$bindings.containerClassName(containerClassName);
  $$result.css.add(css);
  _toasts = $toasts.map((toast2) => ({
    ...toast2,
    position: toast2.position || position,
    offset: handlers2.calculateOffset(toast2, $toasts, {
      reverseOrder,
      gutter,
      defaultPosition: position
    })
  }));
  $$unsubscribe_toasts();
  return `<div class="${"toaster " + escape(containerClassName || "", true) + " svelte-jyff3d"}"${add_attribute("style", containerStyle, 0)} role="alert">${each(_toasts, (toast2) => {
    return `${validate_component(ToastWrapper, "ToastWrapper").$$render(
      $$result,
      {
        toast: toast2,
        setHeight: (height) => handlers2.updateHeight(toast2.id, height)
      },
      {},
      {}
    )}`;
  })} </div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<section>${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${validate_component(PageTransition, "PageTransition").$$render($$result, { pathname: data.pathname }, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })} ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(Toaster, "Toaster").$$render($$result, {}, {}, {})}</section>`;
});
export {
  Layout as default
};
