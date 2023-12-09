import { c as create_ssr_component, s as subscribe, e as escape } from "../../../chunks/ssr.js";
import { t as theme } from "../../../chunks/theme.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_theme();
  return `<section><p>${escape($theme)}</p> <p data-svelte-h="svelte-1tk9lo">Fullstack engineer ■</p> </section>`;
});
export {
  Page as default
};
