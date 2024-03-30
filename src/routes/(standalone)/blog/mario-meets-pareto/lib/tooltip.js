import tippy from 'tippy.js';

export default function tooltip(node, params = {}) {
  // Determine the title to show. We want to prefer
  // the custom content passed in first, then the
  // HTML title attribute then the aria-label
  // in that order.
  const custom = params.name;
  const title = node.title;
  const label = node.getAttribute("aria-label");
  const content = custom || title || label;

  // Support any of the Tippy props by forwarding all "params":
  // https://atomiks.github.io/tippyjs/v6/all-props/
  const tip = tippy(node, { content, allowHTML: true});

  return {
    // If the props change, let's update the Tippy instance:
    update: (newParams) => tip.setProps({content}),

    // Clean up the Tippy instance on unmount:
    destroy: () => tip.destroy(),
  };
}
