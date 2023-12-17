import { c as create_ssr_component, v as validate_component, b as add_attribute, d as escape } from "../../../chunks/ssr.js";
import { T as Title, P as PageTitle } from "../../../chunks/pageTitle.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-mtnrnl{display:flex;align-items:center;justify-content:center;height:100vh;font-family:'Inter', sans-serif;font-weight:500}.box.svelte-mtnrnl{display:grid}.inputs.svelte-mtnrnl{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:1rem;transition:all 0.2s;outline:1px solid transparent;margin-block:3px;font-family:'Inter', sans-serif;font-weight:500}.inputs.svelte-mtnrnl:hover{border-color:var(--text)}.inputs.svelte-mtnrnl:focus{outline-color:var(--text)}input.svelte-mtnrnl{height:2.5rem}textarea.svelte-mtnrnl{width:20rem;height:12rem;resize:none}span.svelte-mtnrnl{margin-top:5px;color:var(--thin);font-size:14px}.btn.svelte-mtnrnl{height:2.5rem;display:flex;align-items:center;justify-content:center;cursor:pointer;user-select:none}.btn.svelte-mtnrnl:active{outline-color:var(--text)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mail;
  $$result.css.add(css);
  return `${validate_component(Title, "Title").$$render($$result, { value: "Contact" }, {}, {})} <section class="svelte-mtnrnl"><div class="box svelte-mtnrnl">${validate_component(PageTitle, "PageTitle").$$render(
    $$result,
    {
      title: "Contact",
      customStyle: "margin: 0 auto 5px"
    },
    {},
    {}
  )} <span class="span-input svelte-mtnrnl" data-svelte-h="svelte-1x3ckqq">Email</span> <input type="email" class="inputs svelte-mtnrnl"${add_attribute("value", mail, 0)}> <span class="span-textarea svelte-mtnrnl" data-svelte-h="svelte-1uth1qm">What are the requirements?</span> <textarea class="inputs svelte-mtnrnl">${escape("")}</textarea> <div class="btn inputs svelte-mtnrnl" data-svelte-h="svelte-18pm20m">Submit</div></div> </section>`;
});
export {
  Page as default
};
