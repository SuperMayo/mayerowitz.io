import { c as create_ssr_component, e as escape, n as null_to_empty, a as add_attribute, v as validate_component, b as each } from "../../chunks/index3.js";
const app = "";
const Burger_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".burger.svelte-1ojdqwy{position:absolute;top:50%;left:0px;height:0.25rem;width:2rem;--tw-bg-opacity:1;background-color:rgb(0 0 0 / var(--tw-bg-opacity));transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:500ms}.burger.svelte-1ojdqwy::before,.burger.svelte-1ojdqwy::after{position:absolute;left:0px;height:0.25rem;width:2rem;--tw-rotate:0deg;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-bg-opacity:1;background-color:rgb(0 0 0 / var(--tw-bg-opacity));transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;content:''}.burger.svelte-1ojdqwy::before{top:-10px}.burger.svelte-1ojdqwy::after{bottom:-10px}.burger.active.svelte-1ojdqwy{width:0px}.burger.active.svelte-1ojdqwy::before{top:0px;--tw-rotate:45deg;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transition-delay:200ms}.burger.active.svelte-1ojdqwy::after{bottom:0px;--tw-rotate:-45deg;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transition-delay:100ms}",
  map: null
};
const Burger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { click = false } = $$props;
  if ($$props.click === void 0 && $$bindings.click && click !== void 0)
    $$bindings.click(click);
  $$result.css.add(css$1);
  return `<div role="button" class="flex flex-col justify-between w-8 h-two overflow-hidden relative" tabindex="-1"><div class="${escape(null_to_empty(`burger ${click ? "active" : ""}`), true) + " svelte-1ojdqwy"}"></div></div>`;
});
const Header_svelte_svelte_type_style_lang = "";
const css = {
  code: ".nav-bar.burger-on.svelte-1jjbl21.svelte-1jjbl21{display:block;max-height:100vh;--tw-translate-y:1.5rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1;transition-property:all;transition-duration:500ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)\n}.nav-bar.burger-on.svelte-1jjbl21 .menu-item.svelte-1jjbl21{margin-top:0.75rem;transition-property:all;transition-duration:500ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)\n}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let burgerOn = false;
  let { siteTitle: siteTitle2 } = $$props;
  let { menuLinks: menuLinks2 = [] } = $$props;
  if ($$props.siteTitle === void 0 && $$bindings.siteTitle && siteTitle2 !== void 0)
    $$bindings.siteTitle(siteTitle2);
  if ($$props.menuLinks === void 0 && $$bindings.menuLinks && menuLinks2 !== void 0)
    $$bindings.menuLinks(menuLinks2);
  $$result.css.add(css);
  return `<header class="mb-two w-full"><div class="flex flex-col justify-between items-center p-one max-w-screen-lg sm:flex-row"><div class="flex justify-between items-center w-full"><h1 class="m-0 font-medium"><a href="/" class="text-black no-underline">${escape(siteTitle2)}</a></h1>
      <button class="sm:hidden"${add_attribute("tabindex", 0, 0)}>${validate_component(Burger, "Burger").$$render($$result, { click: burgerOn }, {}, {})}</button></div>
      <div class="${escape(
    null_to_empty(`nav-bar w-full max-h-0 opacity-0 -mt-one transition-all duration-500 ease-in-out sm:max-h-screen sm:opacity-100 sm:mt-0
      ${"sm:pointer-events-auto pointer-events-none"}`),
    true
  ) + " svelte-1jjbl21"}"><nav><ul class="text-right m-0 sm:flex sm:justify-end sm:items-center sm:text-left">${each(menuLinks2, (link) => {
    return `<li class="menu-item px-2 m-0 svelte-1jjbl21">/<a${add_attribute("href", link.link, 0)} class="mt-quarter transition-all duration-500 ease-in-out lowercase">${escape(link.name)}</a>
              </li>`;
  })}</ul></nav></div></div></header>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let year = (/* @__PURE__ */ new Date()).getFullYear();
  return `<footer class="text-center shrink-0 p-one mt-auto">© ${escape(year)}${escape(` `)}Antoine Mayerowitz
</footer>`;
});
const siteTitle = "Antoine Mayerowitz";
const menuLinks = [
  { name: "Home", link: "/" },
  {
    name: "Research",
    link: "/research"
  },
  {
    name: "Teaching",
    link: "/teaching"
  },
  {
    name: "Blog",
    link: "/blog"
  },
  {
    name: "Projects",
    link: "/projects"
  },
  {
    name: "Gallery",
    link: "/gallery"
  }
];
const description = `My personal site`;
const author = `Antoine Mayerowitz a.mayerowitz@gmail.com`;
const externalLinks = {
  github: `https://github.com/SuperMayo`,
  linkedin: `https://www.linkedin.com/in/antoinemayerowitz/`,
  twitter: `https://twitter.com/AntoineMyrwtz`,
  instagram: `https://www.instagram.com/super_mayo/`
};
const metadata = {
  siteTitle,
  menuLinks,
  description,
  author,
  externalLinks
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-8czv8s_START --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&family=Source+Sans+3:wght@400;700&family=Source+Serif+4&display=swap" rel="stylesheet"><!-- HEAD_svelte-8czv8s_END -->`, ""}

<div class="flex flex-col min-h-screen max-w-5xl mx-auto w-11/12">${validate_component(Header, "Header").$$render(
    $$result,
    {
      siteTitle: metadata.siteTitle,
      menuLinks: metadata.menuLinks
    },
    {},
    {}
  )}
        
        ${slots.default ? slots.default({}) : ``}
    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Layout as default
};
