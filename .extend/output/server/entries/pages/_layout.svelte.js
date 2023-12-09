import { c as create_ssr_component, s as subscribe, b as add_attribute } from "../../chunks/ssr.js";
import { t as theme$1 } from "../../chunks/theme.js";
const theme = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme$1, (value) => $theme = value);
  $$unsubscribe_theme();
  return `<section${add_attribute("class", `${$theme ? "theme-dark" : "theme-light"}`, 0)}>${slots.default ? slots.default({}) : ``}</section>`;
});
export {
  Layout as default
};
