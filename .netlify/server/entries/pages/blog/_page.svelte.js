import { c as create_ssr_component, b as each, a as add_attribute, e as escape } from "../../../chunks/index3.js";
function formatDate(date, dateStyle = "medium", locales = "en") {
  const dateToFormat = new Date(date.replaceAll("-", "/"));
  const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
  return dateFormatter.format(dateToFormat);
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-hfp9t8_START -->${$$result.title = `<title>Blog</title>`, ""}<!-- HEAD_svelte-hfp9t8_END -->`, ""}


<h1 class="my-one font-serif">Writings</h1>
<section>${each(data.posts, (post) => {
    return `<a${add_attribute("href", `blog/${post.slug}`, 0)} class="text-black hover:opacity-80 hover:text-teal-700 transition-all duration-300 ease-in-out"><article><div class="flex items-top"><span class="text-right pr-one md:pr-two font-serif font-bold text-md md:text-xl text-gray-500">${escape(formatDate(post.date))}</span>
            <div><h2 class="font-bold my-0 text-md md:text-xl">${escape(post.title)}</h2>
            <p>${escape(post.subtitle)}</p></div>
        </div></article>
</a>`;
  })}</section>`;
});
export {
  Page as default
};
