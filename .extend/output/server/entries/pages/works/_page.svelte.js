import { c as create_ssr_component, v as validate_component, d as each, b as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { T as Title, P as PageTitle } from "../../../chunks/pageTitle.js";
import "../../../chunks/cms.js";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { F as Fa } from "../../../chunks/fa.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: `.loading.svelte-ph71x9.svelte-ph71x9{display:flex;align-items:center;justify-content:center;font-size:10px;position:absolute;left:50%;transform:translateX(-50%);top:50%}section.svelte-ph71x9.svelte-ph71x9{display:flex;justify-content:center;min-height:100vh;height:-moz-max-content;height:max-content;padding-block:2rem;padding-top:11rem}.items.svelte-ph71x9.svelte-ph71x9{margin:0 auto 0;width:35rem}.stats.svelte-ph71x9.svelte-ph71x9{font-size:11px;border-radius:8px;background:var(--text);color:var(--bg);margin-left:5px}.stats.svelte-ph71x9 p.svelte-ph71x9{margin-inline:8px;margin-block:2px}.titles.svelte-ph71x9.svelte-ph71x9{display:flex;align-items:center}.title.svelte-ph71x9.svelte-ph71x9{font-weight:500;border-bottom:1px solid var(--text);margin-bottom:1px}.contents.svelte-ph71x9.svelte-ph71x9{margin-top:5px}.item.svelte-ph71x9.svelte-ph71x9{font-family:'Inter', sans-serif;display:block;text-decoration:none;color:var(--text);border-radius:10px;padding-block:10px;transition:all 0.2s;padding-inline:2px;position:relative}.item.svelte-ph71x9.svelte-ph71x9::before{content:"";position:absolute;left:0;top:0;width:100%;opacity:0;height:100%;background:linear-gradient(to right, var(--bg-thin), transparent);border-radius:10px;z-index:-1;transition:all 0.2s ease}.item.svelte-ph71x9.svelte-ph71x9:hover{padding-inline:13px}.item.svelte-ph71x9.svelte-ph71x9:hover::before{opacity:1}.bio.svelte-ph71x9.svelte-ph71x9{font-size:14px;color:var(--thin);width:100%}@media(max-width: 700px){.items.svelte-ph71x9.svelte-ph71x9{width:80%}}`,
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let datas = [];
  $$result.css.add(css);
  return `${validate_component(Title, "Title").$$render($$result, { value: "Works" }, {}, {})} <section class="svelte-ph71x9"><div class="items svelte-ph71x9">${validate_component(PageTitle, "PageTitle").$$render($$result, { title: "Works" }, {}, {})} <div>${datas.length > 0 ? `<div class="contents svelte-ph71x9">${each(datas, (data) => {
    return `<a${add_attribute("href", data.website, 0)} class="item svelte-ph71x9"><span class="titles svelte-ph71x9"><p class="title svelte-ph71x9">${escape(data.title)}</p> <span class="stats svelte-ph71x9">${JSON.stringify(data.stats) === JSON.stringify(["None"]) ? `` : `<p class="svelte-ph71x9">${escape(data.stats)}</p>`} </span></span> <p class="bio svelte-ph71x9">${escape(data.bio)}</p> </a>`;
  })}</div>` : `<div class="loading svelte-ph71x9">${validate_component(Fa, "Fa").$$render(
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
