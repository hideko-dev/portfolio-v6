import { c as create_ssr_component, a as subscribe, d as add_attribute, f as each, v as validate_component, e as escape } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
const theme$1 = "";
const theme = writable("light");
const themeMenu = writable(false);
const size = 16;
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
const css$1 = {
  code: "section.svelte-6p5xke{width:5.7rem;height:5.5rem;padding-block:5px;padding-inline:5px;position:absolute;right:0;top:2rem;background:var(--bg);border:1px solid var(--border);transform-origin:right top;transition:all 0.15s;user-select:none;border-radius:10px;display:grid}.btn.svelte-6p5xke{font-size:12px;padding-inline:7px;display:flex;align-items:center;gap:3px;border-radius:5px;transition:all 0.2s;cursor:pointer}.btn.svelte-6p5xke:hover{background:var(--border)}",
  map: null
};
const ThemeMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $themeMenu, $$unsubscribe_themeMenu;
  $$unsubscribe_themeMenu = subscribe(themeMenu, (value) => $themeMenu = value);
  let style = "scale: 0.96; opacity: 0";
  const styles = [
    { theme: "dark", name: "Dark" },
    { theme: "light", name: "Light" },
    { theme: "system", name: "System" }
  ];
  $$result.css.add(css$1);
  {
    {
      if ($themeMenu) {
        style = "scale: 1; opacity: 1";
      } else {
        style = "scale: 0.96; opacity: 0";
      }
    }
  }
  $$unsubscribe_themeMenu();
  return `<section${add_attribute("style", style, 0)} class="svelte-6p5xke">${each(styles, (s) => {
    return `<div class="btn svelte-6p5xke">${validate_component(ThemeIcon, "ThemeIcon").$$render($$result, { mode: s.theme }, {}, {})} <p>${escape(s.name)}</p> </div>`;
  })} </section>`;
});
const header_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-10k5jkx{display:flex;align-items:center;justify-content:center}.theme-icon.svelte-10k5jkx{width:2rem;height:2rem;display:flex;align-items:center;justify-content:center;border-radius:7px;border:1px solid transparent;position:relative}.name.svelte-10k5jkx{font-weight:700}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<section class="svelte-10k5jkx"><p class="name svelte-10k5jkx" data-svelte-h="svelte-13am8xc">hideko</p> <div class="theme-icon svelte-10k5jkx">${validate_component(ThemeIcon, "ThemeIcon").$$render($$result, {}, {}, {})} ${validate_component(ThemeMenu, "ThemeMenu").$$render($$result, {}, {}, {})}</div> </section>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_theme();
  return `<section${add_attribute("class", `${$theme ? "theme-dark" : "theme-light"}`, 0)}>${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}</section>`;
});
export {
  Layout as default
};
