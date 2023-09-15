import { c as create_ssr_component, b as each, v as validate_component, a as add_attribute } from "../../../chunks/index3.js";
import { I as ImageWrapper } from "../../../chunks/ImageWrapper.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let imageData = data.imageData;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main>${each(imageData, (image) => {
    return `${validate_component(ImageWrapper, "ImageWrapper").$$render(
      $$result,
      {
        left_label: image.date,
        right_label: image.name,
        maxWidth: "xl"
      },
      {},
      {
        default: () => {
          return `<img class="w-full m-auto drop-shadow-xl rounded-sm hover:scale-[1.05] hover:drop-shadow-2xl transition-all duration-500" loading="lazy"${add_attribute("src", image.src, 0)}${add_attribute("alt", image.name, 0)}>
            `;
        }
      }
    )}`;
  })}</main>`;
});
export {
  Page as default
};
