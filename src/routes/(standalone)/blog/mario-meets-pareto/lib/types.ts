import type { Writable } from "svelte/store";

export type AxisName =
    | "speed"
    | "acceleration"
    | "mini_turbo"
    | "handling"
    | "weight"
    | "off_road"
    | "one";

export type GearName = "driver" | "body" | "tire" | "glider";

type GearNameToEquivalenceId = {
    [K in GearName]: EquivalenceId;
};

type AxisnameToValue = {
    [K in AxisName]: number;
};

export type EquivalentGear = { name: string; image_name: string };

type EquivalenceId = number;

export type Gear = AxisnameToValue & {
    name: string;
    type: GearName;
    eq_id: EquivalenceId;
    equivalences: EquivalentGear[];
    image_name: string;
    one: 1;
};

export type GearEnhanced = Gear & {
    x: number;
    y: number;
    cx: number;
    cy: number;
    frontier: number; // 1 for frontier, 0 otherwise
    opacity: number;
};

export type Combination = GearNameToEquivalenceId & AxisnameToValue & { eq_id: number };

type FrontierKey = string;

export type frontier = Record<FrontierKey, EquivalenceId[]>;

export type fetchableStore<T> = Writable<T> & { fetch: () => Promise<void> };
