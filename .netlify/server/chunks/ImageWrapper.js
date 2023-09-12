import { c as create_ssr_component, e as escape } from "./index3.js";
const ImageWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { left_label = "" } = $$props;
  let { right_label = "" } = $$props;
  let { maxWidth = "500" } = $$props;
  if ($$props.left_label === void 0 && $$bindings.left_label && left_label !== void 0)
    $$bindings.left_label(left_label);
  if ($$props.right_label === void 0 && $$bindings.right_label && right_label !== void 0)
    $$bindings.right_label(right_label);
  if ($$props.maxWidth === void 0 && $$bindings.maxWidth && maxWidth !== void 0)
    $$bindings.maxWidth(maxWidth);
  return `<div class="${"max-w-[" + escape(maxWidth, true) + "px] m-auto"}">${slots.default ? slots.default({}) : ``}
    ${left_label || right_label ? `<div class="flex justify-between flex-row"><span class="font-mono text-left">${escape(left_label)}</span>
            <span class="font-mono text-right">${escape(right_label)}</span></div>` : ``}</div>`;
});
export {
  ImageWrapper as I
};
