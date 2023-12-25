import { c as create_ssr_component, v as validate_component, b as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { T as Title, P as PageTitle } from "../../../chunks/pageTitle.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-1yzxvxd{display:flex;align-items:center;justify-content:center;height:100vh;font-family:'Inter', sans-serif;font-weight:500}.box.svelte-1yzxvxd{display:grid}.inputs.svelte-1yzxvxd{background:var(--bg);border:1px solid var(--outline);border-radius:8px;padding:1rem;transition:all 0.2s;margin-block:3px;font-family:'Inter', sans-serif;font-weight:500;outline:none}.inputs.svelte-1yzxvxd:hover{border-color:var(--thin)}.inputs.svelte-1yzxvxd:focus{border-color:var(--text)}input.svelte-1yzxvxd{height:2.5rem}textarea.svelte-1yzxvxd{width:20rem;height:12rem;resize:none}span.svelte-1yzxvxd{margin-top:5px;color:var(--thin);font-size:14px}.btn.svelte-1yzxvxd{height:2.5rem;display:flex;align-items:center;justify-content:center;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none}.btn.svelte-1yzxvxd:active{outline-color:var(--text)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mail;
  $$result.css.add(css);
  return `${validate_component(Title, "Title").$$render($$result, { value: "Contact" }, {}, {})} <section class="svelte-1yzxvxd"><div class="box svelte-1yzxvxd">${validate_component(PageTitle, "PageTitle").$$render(
    $$result,
    {
      title: "Contact",
      customStyle: "margin: 0 auto 5px"
    },
    {},
    {}
  )} <span class="span-input svelte-1yzxvxd" data-svelte-h="svelte-1x3ckqq">Email</span> <input type="email" class="inputs svelte-1yzxvxd"${add_attribute("value", mail, 0)}> <span class="span-textarea svelte-1yzxvxd" data-svelte-h="svelte-1uth1qm">What are the requirements?</span> <textarea class="inputs svelte-1yzxvxd">${escape("")}</textarea> <div class="btn inputs svelte-1yzxvxd" data-svelte-h="svelte-18pm20m">Submit</div></div> </section>`;
});
export {
  Page as default
};
