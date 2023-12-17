import { c as create_ssr_component, v as validate_component, e as each, d as escape } from "../../../chunks/ssr.js";
import { T as Title, P as PageTitle } from "../../../chunks/pageTitle.js";
import "../../../chunks/cms.js";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { F as Fa } from "../../../chunks/fa.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: `.loading.svelte-olouxa.svelte-olouxa{display:flex;align-items:center;justify-content:center;font-size:10px;position:absolute;left:50%;transform:translateX(-50%);top:50%}section.svelte-olouxa.svelte-olouxa{display:flex;justify-content:center;height:100vh;padding-top:11rem}.items.svelte-olouxa.svelte-olouxa{margin:0 auto 0;width:35rem}.stats.svelte-olouxa.svelte-olouxa{font-size:11px;border-radius:8px;background:var(--text);color:var(--bg);margin-left:5px}.stats.svelte-olouxa p.svelte-olouxa{margin-inline:8px;margin-block:2px}.titles.svelte-olouxa.svelte-olouxa{display:flex;align-items:center}.title.svelte-olouxa.svelte-olouxa{font-weight:500;border-bottom:1px solid var(--text);margin-bottom:1px}.contents.svelte-olouxa.svelte-olouxa{margin-top:5px}.item.svelte-olouxa.svelte-olouxa{font-family:'Inter', sans-serif;display:block;text-decoration:none;color:var(--text);border-radius:5px;padding-block:10px;transition:all 0.2s;padding-inline:2px;position:relative}.item.svelte-olouxa.svelte-olouxa::before{content:"";position:absolute;left:0;top:0;width:0;height:100%;background:linear-gradient(to right, var(--btn-thin), transparent);border-radius:5px;z-index:-1;transition:all 0.2s ease}.item.svelte-olouxa.svelte-olouxa:hover{padding-inline:13px}.item.svelte-olouxa.svelte-olouxa:hover::before{width:100%}.bio.svelte-olouxa.svelte-olouxa{font-size:14px;color:var(--thin);width:100%}@media(max-width: 700px){.items.svelte-olouxa.svelte-olouxa{width:80%}}`,
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let datas = [];
  $$result.css.add(css);
  return `${validate_component(Title, "Title").$$render($$result, { value: "Works" }, {}, {})} <section class="svelte-olouxa"><div class="items svelte-olouxa">${validate_component(PageTitle, "PageTitle").$$render($$result, { title: "Works" }, {}, {})} <div>${datas.length > 0 ? `<div class="contents svelte-olouxa">${each(datas, (data) => {
    return `<a href="${"/works/" + escape(data.id, true)}" class="item svelte-olouxa"><span class="titles svelte-olouxa"><p class="title svelte-olouxa">${escape(data.title)}</p> <span class="stats svelte-olouxa">${JSON.stringify(data.stats) === JSON.stringify(["None"]) ? `` : `<p class="svelte-olouxa">${escape(data.stats)}</p>`} </span></span> <p class="bio svelte-olouxa">${escape(data.bio)}</p> </a>`;
  })}</div>` : `<div class="loading svelte-olouxa">${validate_component(Fa, "Fa").$$render(
    $$result,
    {
      icon: faCircleNotch,
      size: "3x",
      spin: true
    },
    {},
    {}
  )}</div>`}</div></div> </section>`;
});
export {
  Page as default
};
