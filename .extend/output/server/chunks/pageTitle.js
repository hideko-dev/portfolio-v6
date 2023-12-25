import { c as create_ssr_component, e as escape, b as add_attribute } from "./ssr.js";
const Title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `${$$result.head += `<!-- HEAD_svelte-a43fy5_START -->${$$result.title = `<title>${escape(value)} - Hideko</title>`, ""}<!-- HEAD_svelte-a43fy5_END -->`, ""}`;
});
const pageTitle_svelte_svelte_type_style_lang = "";
const css = {
  code: ".title.svelte-1alequ2{display:flex;align-items:center;font-family:'Inter', sans-serif;font-weight:700;font-size:25px;gap:4px}.titles.svelte-1alequ2{transition:all 0.2s}",
  map: null
};
const PageTitle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { customStyle } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.customStyle === void 0 && $$bindings.customStyle && customStyle !== void 0)
    $$bindings.customStyle(customStyle);
  $$result.css.add(css);
  return `<div class="title svelte-1alequ2"${add_attribute("style", customStyle, 0)}><p class="titles svelte-1alequ2">${escape(title)}</p> </div>`;
});
export {
  PageTitle as P,
  Title as T
};
