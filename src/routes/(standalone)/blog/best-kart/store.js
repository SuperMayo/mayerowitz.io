import { writable, readable } from "svelte/store";
import raw_data from "./assets/dataset_flat.json";


export const data = readable(raw_data);

export const margin = writable({
    top: 25,
    bottom: 20,
    left: 90,
    right: 10,
});

export const marginScroll = writable({
    top: 12,
    bottom: 60,
    left: 60,
    right: 12,
  });
 
export const mobile = writable(true);