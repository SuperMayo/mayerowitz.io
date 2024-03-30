import { type Readable, type Writable, writable, readable, derived } from "svelte/store";
import type {
    AxisName,
    GearName,
    Gear,
    Combination,
    Frontiers,
    fetchableStore,
} from "./lib/types.ts";

import { PUBLIC_BUCKET_MK8_URL } from "$env/static/public";

const endpoint = PUBLIC_BUCKET_MK8_URL;

export const bucket = readable(endpoint);
export const innerWidth = writable(500);
export const innerHeight = writable(500);
export const margin = writable({
    top: 25,
    bottom: 20,
    left: 90,
    right: 10,
});

export const axisChoices: Readable<{ name: string; value: AxisName }[]> = readable([
    { name: "Speed", value: "speed" },
    { name: "Acceleration", value: "acceleration" },
    { name: "Handling", value: "handling" },
    { name: "Weight", value: "weight" },
    { name: "Offroad", value: "off_road" },
    { name: "Mini Turbo", value: "mini_turbo" },
]);

export const gearChoices: Readable<{ name: string; value: GearName }[]> = readable([
    { name: "Driver", value: "driver" },
    { name: "Body", value: "body" },
    { name: "Tire", value: "tire" },
    { name: "Glider", value: "glider" },
]);

export const palette = readable({
    red: "",
    blue: "",
    yellow: "",
    grey: "#e5e7eb",
});

export const hoveredId: Writable<number | null> = writable(null);
export const clickedId: Writable<number | null> = writable(null);

export const axis3d = writable({
    x: "acceleration",
    y: "speed",
    z: "mini_turbo",
});

export const marginScroll = writable({
    top: 12,
    bottom: 60,
    left: 60,
    right: 12,
});

export const mobile = writable(true);

export const scatterThreeConfig = readable({
    raycaster: {
        threshold: 0.1,
    },
    camera: {
        position: [25, 15, 30],
        zoom: 30,
    },
});

async function getArray(url: string) {
    const response: Response = await fetch(url);
    if (!response.ok) throw new Error(`Bad response trying to retrieve from ${url}.`);
    return await response.json();
}

function createFetchableStore<T>(url: string): fetchableStore<T> {
    const { subscribe, set, update } = writable<T>(undefined);

    return {
        subscribe,
        set,
        update,
        fetch: async () => getArray(url).then(set),
    };
}

export const combs: fetchableStore<Combination[]> = createFetchableStore(
    `${endpoint}/combinations.json`,
);
export const frontiers: fetchableStore<Frontiers> = createFetchableStore(
    `${endpoint}/frontiers.json`,
);
export const gears: fetchableStore<Gear[]> = createFetchableStore(`${endpoint}/data.json`);
