import { c as create_ssr_component, v as validate_component, b as add_attribute, a as subscribe, d as escape, e as each } from "../../../chunks/ssr.js";
import { P as PageTitle, T as Title } from "../../../chunks/pageTitle.js";
import { w as writable } from "../../../chunks/index.js";
import { F as Fa } from "../../../chunks/fa.js";
import { faPlug, faMeteor, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode";
import "../../../chunks/cms.js";
const catIcon = "/_svelte/immutable/assets/cat.dd7b11e1.webp";
const about_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: '.bios.svelte-16zd51t{margin:0 auto;width:35rem}.bio.svelte-16zd51t{margin-top:15px}.img.svelte-16zd51t{border-radius:100%}img.svelte-16zd51t{float:right;margin-left:2rem;margin-bottom:1rem;border-radius:100%;border:1px solid var(--border);aspect-ratio:1 / 1;height:130px;width:130px;-o-object-fit:cover;object-fit:cover}a.svelte-16zd51t{text-decoration:none;color:var(--text);position:relative}a.svelte-16zd51t:after{content:"";position:absolute;left:0;bottom:-1px;width:100%;height:1px;background:var(--little);transition:all 0.2s}a.svelte-16zd51t:hover::after{background:var(--text)}@media(max-width: 700px){.title.svelte-16zd51t{margin-left:10%}.bios.svelte-16zd51t{width:80%}img.svelte-16zd51t{float:none;height:180px;width:180px}.img.svelte-16zd51t{margin-top:1rem;display:flex;align-items:center;justify-content:center}}',
  map: null
};
const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$5);
  return `<section><div class="title svelte-16zd51t">${validate_component(PageTitle, "PageTitle").$$render($$result, { title: "About" }, {}, {})}</div> <div class="bios svelte-16zd51t" data-svelte-h="svelte-19qlliy"><div class="img svelte-16zd51t"><img${add_attribute("src", catIcon, 0)} alt="icon" class="svelte-16zd51t"></div> <div class="bio svelte-16zd51t">I am a front end developer. I can do backend and software as well as frontend. Not only that, I release various projects as open source.
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
            <a href="https://v1.hideko.cf" class="svelte-16zd51t">Portfolio v1</a>. This was also a failure, but from there I went through a lot of trial and error and eventually created <a href="https://hideko.cf" class="svelte-16zd51t">Portfolio v5</a>.
            <br><br>
            We developed not only the front end but also the back end, including <a href="https://github.com/hideko-dev/thundis" class="svelte-16zd51t">Thundis</a>, <a href="https://github.com/hideko-dev/discord-cdn-deliver" class="svelte-16zd51t">discord-cdn-deliver</a>, <a href="https://github.com/hideko-dev/Mod-Us" class="svelte-16zd51t">ModUs</a> and <a href="https://github.com/hideko-dev/meteor" class="svelte-16zd51t">Meteor</a> using Electron. From there, I worked on the front-end development of
            <a href="https://github.com/yukieiji/ExtremeRoles" class="svelte-16zd51t">yukieiji&#39;s ExtremeRoles</a> to learn a great deal about Git, including Branches, Issues, Pull Requests, and Git Command. Docs, etc. I was involved in the development of ExtremeRoles.
            <br><br>
            Other projects we have developed include <a href="https://github.com/yukieiji/ExtremeRoles.Docs" class="svelte-16zd51t">ExtremeRoles.Docs</a>,
            <a href="https://github.com/hideko-dev/ExtremeRoles.Web" class="svelte-16zd51t">ExtremeRoles.Web</a> and a dedicated server match system in ExtremeRoles.</div></div> </section>`;
});
const techState = writable(0);
const techOverlay = writable({
  status: false,
  text: "",
  web: "",
  state: ""
});
const techBar_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: "section.svelte-cjgpg2{display:flex;align-items:center;justify-content:center;width:9rem;height:1.95rem;border:1px solid var(--border);border-radius:6px;padding:2px;cursor:pointer;font-size:15px;font-family:'Inter', sans-serif}.titles.svelte-cjgpg2{display:flex;align-items:center;justify-content:center;width:100%;height:100%;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none}.menuBox.svelte-cjgpg2{display:flex;align-items:center;color:var(--thin);gap:4px;height:1.7rem;width:8.2rem;font-size:14px;padding:5px;border-radius:3px;transition:all 0.2s}.menuBox.svelte-cjgpg2:hover{background:var(--btn-thin)\r\n    }.menu.svelte-cjgpg2{position:absolute;left:-2px;top:30px;background:rgba(var(--bg-rgb), 0.8);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid var(--border);width:9rem;height:8em;border-radius:6px;z-index:100;transform-origin:center top;transition:all 0.15s;padding-block:5px;display:grid;place-items:center;box-shadow:0 0 10px 0 rgba(0, 0, 0, 0.1)}.title.svelte-cjgpg2{font-size:14px;display:flex;align-items:center;gap:5px;margin-left:8px;color:var(--thin);width:100%;height:100%}svg.svelte-cjgpg2{margin:0 10px 0 auto;transition:all 0.3s}",
  map: null
};
const TechBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $techState, $$unsubscribe_techState;
  $$unsubscribe_techState = subscribe(techState, (value) => $techState = value);
  let menuStyle = "scale: 0.92; opacity: 0; pointer-events: none";
  let sectionRef;
  const checkMark = `<svg style="margin: 0 2px 0 auto" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-auto h-4 w-4 opacity-100"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;
  const menus = [
    { icon: faCode, text: "Language", state: 0 },
    { icon: faPlug, text: "Library", state: 1 },
    {
      icon: faMeteor,
      text: "Framework",
      state: 2
    },
    {
      icon: faMicrochip,
      text: "Technology",
      state: 3
    }
  ];
  $$result.css.add(css$4);
  $$unsubscribe_techState();
  return `<section class="svelte-cjgpg2"${add_attribute("this", sectionRef, 0)}><div class="titles svelte-cjgpg2"><div class="title svelte-cjgpg2">${validate_component(Fa, "Fa").$$render(
    $$result,
    {
      icon: menus[$techState].icon,
      color: "var(--thin)",
      fw: true
    },
    {},
    {}
  )} <p>${escape(menus[$techState].text)}</p></div> <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-auto h-4 w-4 shrink-0 opacity-50 svelte-cjgpg2"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg> <div class="menu svelte-cjgpg2"${add_attribute("style", menuStyle, 0)}>${each(menus, (menu) => {
    return `<div class="menuBox svelte-cjgpg2">${validate_component(Fa, "Fa").$$render($$result, { icon: menu.icon, fw: true }, {}, {})} <p>${escape(menu.text)}</p> ${$techState === menu.state ? `<!-- HTML_TAG_START -->${checkMark}<!-- HTML_TAG_END -->` : ``} </div>`;
  })}</div></div> </section>`;
});
const techOverlay_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "section.svelte-1fnak7q{position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(var(--bg-rgb), 0.7);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);z-index:999;display:flex;align-items:center;justify-content:center;transition:all 0.2s}.box.svelte-1fnak7q{width:20rem;height:7rem;border-radius:10px;border:1px solid var(--outline);box-shadow:0 0 15px 0 rgba(0, 0, 0, 0.05);background:var(--bg);transform-origin:bottom center;transition:all 0.3s;padding:1rem;font-family:'Inter', sans-serif}.title.svelte-1fnak7q{font-size:18px;font-weight:600;margin-bottom:12px}.line.svelte-1fnak7q{display:flex;align-items:center;gap:8px;margin-block:5px}.name.svelte-1fnak7q{background:var(--outline);padding-inline:5px;padding-block:1px;border-radius:4px;font-size:12px}.context.svelte-1fnak7q{overflow:hidden;width:100%;white-space:nowrap;text-overflow:ellipsis;font-size:15px;text-decoration:none;color:var(--text);transition:all 0.2s}.context.svelte-1fnak7q:hover{color:var(--thin)\r\n    }",
  map: null
};
const TechOverlay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $techOverlay, $$unsubscribe_techOverlay;
  $$unsubscribe_techOverlay = subscribe(techOverlay, (value) => $techOverlay = value);
  let style = "opacity: 0; pointer-events: none";
  let boxStyle = "scale: 0.95";
  let lines = [];
  $$result.css.add(css$3);
  {
    {
      if ($techOverlay.status) {
        style = "opacity: 1; pointer-events: all";
        boxStyle = "opacity: 1; scale: 1";
      } else {
        style = "opacity: 0; pointer-events: none";
        boxStyle = "opacity: 0; scale: 0.95";
      }
      lines = [
        {
          name: "Ability",
          context: $techOverlay.state
        },
        {
          name: "Web",
          context: $techOverlay.web,
          href: $techOverlay.web
        }
      ];
    }
  }
  $$unsubscribe_techOverlay();
  return `<section${add_attribute("style", style, 0)} class="svelte-1fnak7q"><div class="box svelte-1fnak7q"${add_attribute("style", boxStyle, 0)}><p class="title svelte-1fnak7q">${escape($techOverlay.text)}</p> ${each(lines, (c) => {
    return `<div class="line svelte-1fnak7q"><p class="name svelte-1fnak7q">${escape(c.name)}</p> <a class="context svelte-1fnak7q"${add_attribute("href", c.href, 0)}>${escape(c.context)}</a> </div>`;
  })}</div> </section>`;
});
const techItems_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "section.svelte-987s6n{width:35rem;position:relative;transition:height 0.2s}.contents.svelte-987s6n{position:absolute;display:inline-flex;box-sizing:border-box;align-items:center;line-height:1.1876em;letter-spacing:0.00938em;flex-wrap:wrap;gap:6px;width:100%}@media(max-width: 700px){section.svelte-987s6n{width:80%}}.box.svelte-987s6n{width:-moz-max-content;width:max-content;padding-inline:12px;padding-block:3px;border-radius:100px;font-size:15px;border:1px solid var(--border);transition:all 0.2s;-webkit-user-select:none;-moz-user-select:none;user-select:none}.box.svelte-987s6n:hover{background:var(--text);color:var(--bg)}",
  map: null
};
const TechItems = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $techState, $$unsubscribe_techState;
  $$unsubscribe_techState = subscribe(techState, (value) => $techState = value);
  let language = [], library = [], framework = [], technology = [];
  $$result.css.add(css$2);
  $$unsubscribe_techState();
  return `${validate_component(TechOverlay, "TechOverlay").$$render($$result, {}, {}, {})} <section${add_attribute("style", `height: 10rem; transition-delay: ${$techState === 0 ? 0.3 : 0}s;`, 0)} class="svelte-987s6n"><div class="contents svelte-987s6n">${$techState === 0 ? `${each(language, (c) => {
    return `<div class="box svelte-987s6n"><p>${escape(c.text)}</p> </div>`;
  })}` : `${$techState === 1 ? `${each(library, (c) => {
    return `<div class="box svelte-987s6n"><p>${escape(c.text)}</p> </div>`;
  })}` : `${$techState === 2 ? `${each(framework, (c) => {
    return `<div class="box svelte-987s6n"><p>${escape(c.text)}</p> </div>`;
  })}` : `${$techState === 3 ? `${each(technology, (c) => {
    return `<div class="box svelte-987s6n"><p>${escape(c.text)}</p> </div>`;
  })}` : ``}`}`}`}</div> </section>`;
});
const tech_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".titles.svelte-14j2u7w{display:flex;align-items:center;gap:15px}section.svelte-14j2u7w{margin-top:4rem}.items.svelte-14j2u7w{margin-top:12px;display:flex;align-items:center;justify-content:center;cursor:pointer}@media(max-width: 700px){.titles.svelte-14j2u7w{margin-left:10%}.bar.svelte-14j2u7w{margin-top:8px}}",
  map: null
};
const Tech = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<section class="svelte-14j2u7w"><div class="titles svelte-14j2u7w">${validate_component(PageTitle, "PageTitle").$$render($$result, { title: "Technology" }, {}, {})} <div class="bar svelte-14j2u7w">${validate_component(TechBar, "TechBar").$$render($$result, {}, {}, {})}</div></div> <div class="items svelte-14j2u7w">${validate_component(TechItems, "TechItems").$$render($$result, {}, {}, {})}</div> </section>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-wi3nqw{display:flex;justify-content:center;padding-top:11rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Title, "Title").$$render($$result, { value: "Home" }, {}, {})} <section class="svelte-wi3nqw"><div>${validate_component(About, "About").$$render($$result, {}, {}, {})} ${validate_component(Tech, "Tech").$$render($$result, {}, {}, {})}</div> </section>`;
});
export {
  Page as default
};
