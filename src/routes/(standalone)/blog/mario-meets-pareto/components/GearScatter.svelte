<script lang="ts">
    import * as d3 from "d3";
    import { fade, draw, slide } from "svelte/transition";
    import { tweened, type Tweened } from "svelte/motion";
    import { quartOut } from "svelte/easing";

    import { marginScroll, gears as data, bucket, axisChoices } from "../store";
    import fastParetoFilter from "../lib/pareto";
    import Tooltip from "./Tooltip.svelte";

    import type { AxisName, GearName, GearEnhanced } from "../lib/types";
    import { derived } from "svelte/store";

    export let size: number = 200;
    export let showY: boolean = false;
    export let xAxis: AxisName = "speed";
    export let yAxis: AxisName = "acceleration";
    export let gearType: GearName = "driver";
    export let showStar = false;
    export let focus: string[] = [];
    export let onlyFrontier = false;
    export let maxX = 10;
    export let maxY = 10;
    export let hoveredData: GearEnhanced | null;
    export let showUtility = false;
    export let alpha = 0.5;
    export let ubar = 0.3;
    export let optimalGear: GearEnhanced[];
    export let frontierSize = 100;

    // Sizes
    let width: number = size;
    let height: number = size;
    let imgSize: number = 20;
    let leftMarginReactive: number = $marginScroll.right;

    // d3 utilities
    let xScale = d3.scaleLinear().range([0, 1]);
    let yScale = d3.scaleLinear().range([1, 0]);

    // Utility Curve
    let utilityCurveX: number[] = [...Array.from(Array(15).keys()).map((d) => d / 1.5), 10.5];
    let utilityCurveY: number[] = utilityCurveX;
    let utilitySvgLine: string;

    // Misc
    let dataset = loadStore(xAxis);
    let isAnimating = false;
    let focusArray = new Array($data.length);
    let mouse = { x: 0, y: 0 };
    let frontier = derived(dataset, ($dataset) => $dataset.filter((d) => d.frontier > 0.9));

    $: frontierSize = $frontier.length;
    $: leftMarginReactive = showY ? $marginScroll.left : $marginScroll.right;
    $: width = height = size;
    $: imgSize = size / 13;
    $: setAxis(xAxis, yAxis, gearType);
    $: setFocusWithWait(focus);
    $: if (onlyFrontier) {
        focusOnFrontier();
    }
    $: if ((alpha || xAxis || yAxis || $dataset) && showUtility) {
        const result = maxUtility(alpha);
        ubar = result.ustar;
        optimalGear = result.set;
        focus = optimalGear.map((d) => d.name) as string[];
    }
    $: xScale = d3
        .scaleLinear()
        .domain([-0.5, maxX + 0.5])
        .range([leftMarginReactive, width - $marginScroll.right]);

    $: yScale = d3
        .scaleLinear()
        .domain([-0.5, maxY + 0.5])
        .range([height - $marginScroll.bottom, $marginScroll.top]);

    $: if (showUtility) {
        utilityCurveY = utilityCurveX.map((d) => isoUtility(ubar, d, alpha));
        utilitySvgLine = pointsToPolyline(utilityCurveX, utilityCurveY);
    }
    function pointsToPolyline(X: number[], Y: number[], ylim: number = 10.5) {
        let polyLine = "";
        // First, find the xval where y = 10
        let xinit = isoUtility(ubar, ylim, 1 - alpha);
        polyLine = "M" + xScale(xinit) + " " + yScale(ylim);

        for (let i = 0; i < X.length; i++) {
            if (Y[i] > ylim) {
                continue;
            }
            polyLine = polyLine + " L" + xScale(X[i]) + " " + yScale(Y[i]);
        }

        return polyLine;
    }

    function loadStore(xAxis: AxisName): Tweened<GearEnhanced[]> {
        return tweened<GearEnhanced[]>(
            $data.map((d) => {
                return { ...d, cx: d[xAxis], cy: 1, x: 5, y: 5, frontier: 0, opacity: 0.75 };
            }) as GearEnhanced[],
            {
                duration: 500,
                easing: quartOut,
            },
        );
    }

    function logUtility(x1: number, x2: number, alpha: number): number {
        return alpha * Math.log(x1) + (1 - alpha) * Math.log(x2);
    }

    function isoUtility(Ubar: number, x1: number, alpha: number): number {
        return Math.exp((Ubar - alpha * Math.log(x1)) / (1 - alpha));
    }

    function maxUtility(alpha: number): { ustar: number; set: GearEnhanced[] } {
        let ustar: number;
        let set: GearEnhanced[];

        let utilities = $dataset
            .filter((d) => d.type == gearType)
            .map((d) => {
                return { utility: logUtility(d[xAxis], d[yAxis], alpha), gear: d };
            });

        ustar = Math.max(...utilities.map((u) => u.utility));
        set = utilities.filter((u) => u.utility === ustar).map((u) => u.gear);

        return { ustar, set };
    }

    function axisLabel(axis: string) {
        return $axisChoices.find((d) => d.value == axis).name;
    }

    function sim(xAxis: AxisName, yAxis: AxisName, callback: () => void) {
        isAnimating = false;
        const simulation = d3
            .forceSimulation($dataset.filter((d) => d.type == gearType))
            .force("x", d3.forceX((d: GearEnhanced) => d[xAxis]).strength(0.9))
            .force("y", d3.forceY((d: GearEnhanced) => d[yAxis]).strength(0.9))
            .force("collide", d3.forceCollide().radius(0.3))
            .on("end", callback);

        simulation.tick(30);

        return simulation;
    }

    function setAxis(xAxis: AxisName, yAxis: AxisName, gearType: GearName): void {
        $dataset = fastParetoFilter($dataset, xAxis, yAxis, gearType);
        // Update correct positions in the data store
        sim(xAxis, yAxis, () => (isAnimating = false));
        $dataset = $dataset.map((d) => {
            return { ...d, cx: d.x, cy: d.y };
        });
        updateStore($dataset);
    }

    async function setFocusWithWait(focus: string[]): Promise<void> {
        while (isAnimating) {
            await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms before checking again
        }
        setFocus(focus);
    }

    function setFocus(focus: string[]): void {
        if (focus.length == 0) {
            focusArray = new Array($dataset.length);
        } else {
            focusArray = $dataset.map((d) => {
                return focus.includes(d.name) ? 1 : 0.2;
            });
        }
    }

    function focusOnFrontier(): void {
        const newFrontier = $frontier.map((d) => d.name);
        setFocusWithWait(newFrontier);
    }

    function updateStore(newdataset: GearEnhanced[]) {
        dataset.set(newdataset);
    }

    function getMousePosition(e: MouseEvent) {
        (mouse.x = e.clientX), (mouse.y = e.clientY);
    }
</script>

<svelte:window on:mousemove={(e) => getMousePosition(e)} />

<div class="m-auto">
    <svg {width} {height} class="m-auto">
        <!-- Y axis -->
        {#if showY}
            <!-- Y ticks -->
            {#each yScale.ticks() as tick, i}
                <g
                    in:fade={{ delay: 1000 + i * 100, duration: 100 }}
                    transform={`translate(${$marginScroll.left - 20} ${yScale(tick + 0.3)})`}
                >
                    <text
                        in:fade={{ duration: 500, delay: 1000 }}
                        class="axis-text"
                        y="15"
                        text-anchor="end"
                    >
                        {tick}
                    </text>
                </g>
                <line
                    in:draw={{ duration: 1000 }}
                    class="axis-line"
                    x1={$marginScroll.left}
                    y1={yScale(tick + 0.5)}
                    x2={width - $marginScroll.right}
                    y2={yScale(tick + 0.5)}
                    stroke="black"
                    stroke-width="1"
                    stroke-dasharray="2"
                />
            {/each}
            <!-- Y axis label -->
            <text
                in:fade={{ duration: 500, delay: 1000 }}
                class="axis-label"
                y={$marginScroll.left / 3}
                x={-(height / 2)}
                text-anchor="middle"
                transform="rotate(-90)">{axisLabel(yAxis)}</text
            >
            <line
                in:draw={{ duration: 1000 }}
                class="axis-line"
                x1={$marginScroll.left}
                y1={$marginScroll.top}
                x2={$marginScroll.left}
                y2={height - $marginScroll.bottom}
                stroke="black"
                stroke-width="1"
                stroke-dasharray="2"
            />
        {/if}
        <!-- X axis -->
        <line
            in:draw={{ duration: 1000 }}
            class="axis-line"
            x1={leftMarginReactive}
            y1={height - $marginScroll.bottom}
            x2={width - $marginScroll.right}
            y2={height - $marginScroll.bottom}
            stroke="black"
            stroke-width="1"
            stroke-dasharray="2"
        />
        <!-- x-ticks -->
        {#each xScale.ticks() as tick}
            <g transform={`translate(${xScale(tick) + 0} ${height - $marginScroll.bottom + 10})`}>
                <text class="axis-text" y="15" text-anchor="middle">{tick}</text>
            </g>
            <!-- vertical lines -->
            {#if showY}
                <line
                    in:draw={{ duration: 1000 }}
                    class="axis-line"
                    x1={xScale(tick + 0.5)}
                    y1={$marginScroll.top}
                    x2={xScale(tick + 0.5)}
                    y2={height - $marginScroll.bottom}
                    stroke="black"
                    stroke-width="1"
                    stroke-dasharray="2"
                />
            {/if}
        {/each}
        <!-- axis labels -->
        <text
            class="axis-label"
            y={height - $marginScroll.bottom / 4}
            x={(width + leftMarginReactive) / 2}
            text-anchor="middle">{axisLabel(xAxis)}</text
        >

        <!-- Iso Utility Curve -->
        {#if showUtility && !isAnimating}
            <path
                in:draw={{ duration: 1000 }}
                id="isoutility"
                d={utilitySvgLine}
                stroke="#e4000f"
                fill="transparent"
                stroke-width="2"
            />
            <text width="500" fill="white" dx="-10" dy="-10">
                <textPath href="#isoutility" startOffset="10%" fill="lightgray">
                    Max Utility
                </textPath>
            </text>
        {/if}

        <!-- data points -->
        {#each $dataset as d, i}
            {#if d.type == gearType}
                <image
                    role="img"
                    aria-label={d.name}
                    transition:slide={{ duration: 700 }}
                    on:mouseover={() => {
                        hoveredData = d;
                    }}
                    on:mouseleave={() => {
                        hoveredData = null;
                    }}
                    on:focus={() => {
                        hoveredData = d;
                    }}
                    on:touchstart={() => {
                        hoveredData = d;
                    }}
                    on:touchend={() => {
                        hoveredData = null;
                    }}
                    xlink:href={$bucket + "/images/" + d.image_name}
                    width="{imgSize}px"
                    height="{imgSize}px"
                    opacity={focusArray[i]}
                    x={xScale(d.cx) - imgSize / 2}
                    y={yScale(d.cy) - imgSize / 2}
                    class="[will-change: filter] transform-gpu"
                    class:highlight={showStar && d.frontier > 0.9}
                    filter={showStar && d.frontier > 0.9 ? "url(#colored-drop-shadow)" : ""}
                />
            {/if}
        {/each}

        <!-- svg filter -->
        <defs>
            <filter id="colored-drop-shadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                <feOffset dx="0" dy="0" result="offsetblur" />
                <feFlood flood-color="gold" />
                <feComposite in2="offsetblur" operator="in" />
                <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    </svg>
    {#if hoveredData && !isAnimating}
        <Tooltip data={hoveredData} x={mouse.x} y={mouse.y} />
    {/if}
</div>

<style lang="postcss">
    .highlight {
        animation: opacityLoop 1s infinite;
    }

    @keyframes opacityLoop {
        0% {
            opacity: 0.9; /* Starting opacity */
        }
        50% {
            opacity: 1; /* Maximum opacity */
        }
        100% {
            opacity: 0.9; /* Starting opacity */
        }
    }

    line {
        stroke: floralwhite;
    }

    text {
        fill: oldlace;
    }
</style>
