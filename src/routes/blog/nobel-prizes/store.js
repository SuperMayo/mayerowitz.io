import { writable, derived, readable } from "svelte/store";
import { tweened } from "svelte/motion";
import { linear } from "svelte/easing";
import { processLaureates } from "./utils";
import { laureates } from "./data/laureates.json";

const cleanData = processLaureates(laureates);
export const nodes = readable(cleanData.nodes);
export const links = readable(cleanData.links);
export const cleanLaureates = readable(cleanData.laureates);
export const margin = writable({
    top: 3,
    bottom: 3,
    left: 3,
    right: 3,
  });
  export const marginScroll = writable({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
export const mobile = writable(true);
export const stepIndex = writable(0);

// Network
export let linkType = writable(["birthCountry"]);
export let nodeType = writable(["laureate", "country"]);
export let highlightFemale = writable(false);
export let nodesRelation = writable("network"); // Network or matrix