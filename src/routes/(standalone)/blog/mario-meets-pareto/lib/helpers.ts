import type { Combination, AxisName } from "./types";

export function numberWithCommas(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function U(x: number, y: number, z: number, a: number, b: number, g: number): number {
    //I consider a simple (log) cobb douglas utility
    return a * Math.log(x) + b * Math.log(y) + g * Math.log(z);
}

export function argMaxU(
    set: Combination[],
    axes: [AxisName, AxisName, AxisName],
    alpha: number,
    beta: number,
    gamma: number,
): Combination {
    let utilities = set.map((c) => U(c[axes[0]], c[axes[1]], c[axes[2]], alpha, beta, gamma));

    let maxIndex = utilities.reduce(
        (maxId, current, id, array) => (current > array[maxId] ? id : maxId),
        0,
    );

    return set[maxIndex];
}
