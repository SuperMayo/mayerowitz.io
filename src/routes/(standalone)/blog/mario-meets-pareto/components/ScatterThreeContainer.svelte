<!--
I do not recommend anyone to use this code as an exemple on how to use svelte 
or Threejs. 
I basically learned threejs with this project, and the code beneath can 
witness this. 
-->
<script lang="ts">
    import { tweened } from "svelte/motion";
    import { derived, get } from "svelte/store";
    import { cubicInOut, expoOut } from "svelte/easing";
    import { fade } from "svelte/transition";
    import Scroller from "@sveltejs/svelte-scroller";
    import { Canvas } from "@threlte/core";
    import { HTML } from "@threlte/extras";
    import DualSlider from "./DualSlider.svelte";
    import WeightBox from "./SVG/WeightBox.svelte";

    import { argMaxU } from "../lib/helpers";

    import {
        combs,
        frontiers,
        hoveredId,
        axisChoices,
        clickedId,
        innerWidth,
        innerHeight,
        gears,
    } from "../store";

    import ScatterThree from "./ScatterThree.svelte";
    import KartCard from "./KartCard.svelte";
    import MK8Progress from "./MK8Progress.svelte";

    import type { AxisName, Combination } from "../lib/types";
    import StepContent from "./StepContent.svelte";
    import Lazy from "./Lazy.svelte";

    let positions: Float32Array;
    let state: Uint8Array;
    let ids: Uint16Array;
    let thisFrontier: number[];
    let scatterComponent: any;
    let hoveredPoint: any = { speed: 0, acceleration: 0, mini_turbo: 0 };
    let clickedPoint: any;
    let zoomFactor = 1;
    let index: number = 0;
    let indexHistory: number[] = [];
    let nPoints: number;
    let offset: number = 0;
    let uniforms: { [key: string]: { value: any } };
    let printBest: boolean = false;
    let bestChoice: Combination;
    let p: [number, number] = [0.3, 0.66];
    let utilityp: [number, number, number] = [0.33, 0.33, 0.33];
    let isViewable = false;
    let mouseInteractivity: boolean;

    //Tweened values
    const acceleration = tweened(0, { duration: 200, easing: expoOut });
    const speed = tweened(0, { duration: 200, easing: expoOut });
    const mini_turbo = tweened(0, { duration: 200, easing: expoOut });
    const weight = tweened(0, { duration: 200, easing: expoOut });
    const handling = tweened(0, { duration: 200, easing: expoOut });
    const off_road = tweened(0, { duration: 200, easing: expoOut });

    let axis: { x: AxisName; y: AxisName; z: AxisName | null } = {
        x: "speed",
        y: "acceleration",
        z: "speed",
    };

    const target2event: {
        [key: number]: () => void;
    } = {
        0: () => {
            scatterComponent.moveCameraTo({ x: 2, y: 2, z: 1500 }, 1000);
            scatterComponent.cameraZoom.set(35 * zoomFactor, { duration: 1000 });
        },
        1: () => {
            scatterComponent.moveCameraTo({ x: 2, y: 2, z: 1500 }, 1000);
            scatterComponent.cameraZoom.set(35 * zoomFactor, { duration: 1000 });
            handleAxisChange({ target: { dataset: { axis: "z" }, value: "speed" } });
        },
        2: () => {
            // Handled with a reactive statement
        },
        3: () => {
            scatterComponent.moveCameraTo({ x: 45, y: 25, z: -10 }, 100);
            scatterComponent.cameraZoom.set(zoomFactor, { duration: 100 });
            if (uniforms.focusFrontier.value == 1) {
                uniforms.focusFrontier.value = 0;
            }
        },
        4: () => {
            uniforms.focusFrontier.value = 1;
            $clickedId = null;
            handleClickedPoint(null);
            $hoveredId = null;
            printBest = false;
        },
        5: () => {
            printBest = true;
            if (bestChoice == null) {
                bestChoice = getBest(thisFrontier, p);
            }
            console.log({ p, bestChoice });
            let bestId = bestChoice.eq_id;
            $clickedId = bestId;
            $hoveredId = bestId;
            handleClickedPoint(bestId);
            handleUpdateStats(bestId);
        },
        6: () => {
            scatterComponent.moveCameraTo({ x: 45, y: 25, z: -10 }, 1000);
            $clickedId = 4265;
            $hoveredId = 4265;
            handleClickedPoint(4265);
            handleUpdateStats(4265);
            // reset axis if needed
            handleAxisChange({ target: { dataset: { axis: "x" }, value: "speed" } });
            handleAxisChange({ target: { dataset: { axis: "y" }, value: "acceleration" } });
            handleAxisChange({ target: { dataset: { axis: "z" }, value: "mini_turbo" } });
        },
        //7: () => {
        //    // Do not reset axis if you come back from (7)
        //    if (indexHistory[1] == 5)
        //        $clickedId = null;
        //        $hoveredId = null;
        //        handleClickedPoint(null);
        //        handleAxisChange({ target: { dataset: { axis: "x" }, value: "handling" } });
        //        handleAxisChange({ target: { dataset: { axis: "z" }, value: "off_road" } });
        //    }
        //    uniforms.focusFrontier.value = 1;
        //},
    };

    const dataLoaded = derived(
        [gears, combs, frontiers],
        ([$gears, $combs, $frontiers]) => {
            return ($gears && $combs && $frontiers) != null;
        },
        false,
    );

    // Reactive Statements
    $: if (p && index == 5 && isViewable) {
        utilityp = [p[0], p[1] - p[0], 1 - p[1]];
        bestChoice = getBest(thisFrontier, utilityp);
        let bestId = bestChoice.eq_id;
        $clickedId = bestId;
        $hoveredId = bestId;
        handleClickedPoint(bestId);
        handleUpdateStats(bestId);
    }
    $: indexHistory = [index, indexHistory[0]];
    $: if ($hoveredId) handleUpdateStats($hoveredId);
    $: if (scatterComponent) handleClickedPoint($clickedId);
    $: zoomFactor = $innerWidth > $innerHeight ? 1 : 0.5;
    $: if (scatterComponent && isViewable) fireEvent(index);
    $: if (offset >= 0.1 && index == 2 && isViewable) {
        const t = cubicInOut((offset - 0.1) / 0.9);
        // adjust these values based on when you want the camera to start and stop moving
        const cameraTarget = { x: 45, y: 25, z: -10 };
        const cameraStart = { x: 2, y: 2, z: 1500 };
        const cameraEnd = cameraTarget;
        const cameraPosition = {
            x: cameraStart.x + (cameraEnd.x - cameraStart.x) * t,
            y: cameraStart.y + (cameraEnd.y - cameraStart.y) * t,
            z: cameraStart.z + (cameraEnd.z - cameraStart.z) * t,
        };
        const zoomStart = 35 * zoomFactor;
        const zoomEnd = zoomFactor;
        const cameraZoom = zoomStart + (zoomEnd - zoomStart) * t;
        if (t > 0.8 && axis.z != "mini_turbo") {
            handleAxisChange({ target: { dataset: { axis: "z" }, value: "mini_turbo" } });
        }
        scatterComponent.moveCameraTo(cameraPosition, 0);
        scatterComponent.cameraZoom.set(cameraZoom, { duration: 0 });
    }
    $: if ($dataLoaded) {
        initGeometryBuffer().then(() => {
            isViewable = true;
            console.log("Loaded 3d plot");
        });
    }

    // Preprocessing
    async function initGeometryBuffer() {
        nPoints = Object.keys($combs).length;
        positions = new Float32Array(nPoints * 3);
        state = new Uint8Array(nPoints * 3);
        ids = new Uint16Array(nPoints);
        Object.values($combs).forEach((d, i) => {
            positions[i * 3] = d[axis.x];
            positions[i * 3 + 1] = d[axis.y];
            positions[i * 3 + 2] = d[axis.z];
            ids[i] = d.eq_id;
        });
        updateFrontier();
    }

    // Event Handlers
    function handleAxisChange(e) {
        const axisName: "x" | "y" | "z" = e.target.dataset.axis;
        const axisValue = e.target.value;
        axis[axisName] = axisValue;
        loadPositions(axisValue, axisName);
        if (scatterComponent) {
            scatterComponent.updateBuffer("state", state);
        }
    }

    function handleClickedPoint(id: number | null): void {
        if (id !== null) {
            clickedPoint = $combs[id];
            updateState(1, id, 1, true);
        } else {
            updateState(1, null, 1, true);
        }
        scatterComponent.updateBuffer("state", state);
    }

    function handleUpdateStats(id: number): void {
        hoveredPoint = $combs[id];
        acceleration.set(hoveredPoint.acceleration);
        speed.set(hoveredPoint.speed);
        mini_turbo.set(hoveredPoint.mini_turbo);
        weight.set(hoveredPoint.weight);
        handling.set(hoveredPoint.handling);
        off_road.set(hoveredPoint.off_road);
    }

    function loadPositions(axis: AxisName, c: "x" | "y" | "z") {
        const ii = c == "x" ? 0 : c == "y" ? 1 : 2;
        Object.values($combs).forEach((d, i) => {
            positions[i * 3 + ii] = d[axis];
        });
        updateFrontier();
    }

    function updateFrontier(): void {
        const uniqueValues = new Set(Object.values(axis));
        const frontierKey = Array.from(uniqueValues).sort().join("_");

        if (frontierKey in $frontiers) {
            thisFrontier = $frontiers[frontierKey];
            Object.values($combs).forEach((d, i) => {
                state[i * 3] = thisFrontier.includes(d.eq_id) ? 1 : 0;
            });
        } else {
            Object.values($combs).forEach((_, i) => {
                state[i * 3] = 0;
            });
        }
    }

    function updateState(
        component: 0 | 1 | 2,
        index: number | null,
        value: number,
        reset: boolean,
    ) {
        if (reset) {
            resetState(component);
        }
        if (index != null) state[index * 3 + component] = value;
    }

    function resetState(component: 0 | 1 | 2, value = 0) {
        for (let i = 0; i < nPoints; i++) {
            state[i * 3 + component] = value;
        }
    }

    // Utility Functions
    function fireEvent(index: number): void {
        if (index in target2event) {
            target2event[index]();
        }
    }

    function getBest(frontierIds: number[], utilityp: number[]): Combination {
        let paretoSet = frontierIds.map((id: number) => $combs[id]);
        let best = argMaxU(
            paretoSet,
            [axis.x, axis.y, axis.z],
            utilityp[0],
            utilityp[1],
            utilityp[2],
        );
        return best;
    }
</script>

<div class="pointer-events-none min-h-full w-full overflow-x-clip">
    <Scroller top={0} bottom={0.5} threshold={0} bind:index bind:offset>
        <div
            slot="background"
            class="bg-purple-900ign-middle pointer-events-none sticky flex
            h-[100vh] min-h-32 w-full items-center md:[pointer-events:all]"
        >
            {#if isViewable}
                <Lazy>
                    <Canvas>
                        <ScatterThree
                            {positions}
                            {state}
                            bufferSize={nPoints}
                            {axis}
                            {zoomFactor}
                            {ids}
                            bind:mouseInteractivity
                            bind:this={scatterComponent}
                            bind:uniforms
                        />
                        <!-- Stats Tooltip -->
                        <HTML
                            renderOrder={0}
                            position.x={0.2}
                            position.z={5}
                            position.y={10}
                            zIndexRange={[0, 1]}
                            center={true}
                            transform={true}
                            rotation.y={Math.PI / 2}
                            pointerEvents="none"
                        >
                            {#if $hoveredId}
                                <div
                                    transition:fade={{ duration: 200 }}
                                    class="w-[300px] rounded-lg border-4 border-yellow-400 bg-sky-900
            bg-opacity-70 p-one shadow-lg"
                                >
                                    <MK8Progress name="Speed" value={$speed} max={21} />
                                    <MK8Progress
                                        name="Acceleration"
                                        value={$acceleration}
                                        max={21}
                                    />
                                    <MK8Progress name="Weight" value={$weight} max={21} />
                                    <MK8Progress name="Handling" value={$handling} max={21} />
                                    <MK8Progress name="Off Road" value={$off_road} max={21} />
                                    <MK8Progress name="Mini Turbo" value={$mini_turbo} max={21} />
                                </div>
                            {/if}
                        </HTML>
                        <!-- Gears Tooltip -->
                        {#if $clickedId && clickedPoint}
                            <HTML
                                position.x={clickedPoint[axis.x]}
                                position.z={clickedPoint[axis.z]}
                                position.y={clickedPoint[axis.y]}
                                center={true}
                                sprite={true}
                                zIndexRange={[-10, -1]}
                                pointerEvents="none"
                            >
                                <div class="m-auto h-[180px] w-[180px]">
                                    <KartCard
                                        driver_id={$combs[$clickedId].driver}
                                        body_id={$combs[$clickedId].body}
                                        tire_id={$combs[$clickedId].tire}
                                        glider_id={$combs[$clickedId].glider}
                                    />
                                </div>
                            </HTML>
                        {/if}
                    </Canvas>
                </Lazy>
            {/if}
        </div>
        <div slot="foreground">
            <section>
                <StepContent>
                    <p>
                        585 builds with unique speed and acceleration properties are available
                        &mdash; tough decision for a player to make. But we can apply the same
                        method as before. See, the Pareto front &mdash; in yellow &mdash; narrows it
                        down to 14 efficient options!
                    </p>
                </StepContent>
            </section>
            <section>
                <StepContent>
                    <p>
                        Now, if you're a skilled player, you need a build that optimizes more than
                        just
                        <select on:change={handleAxisChange} data-axis="x" bind:value={axis.x}>
                            {#each $axisChoices as choice}
                                <option value={choice.value}>{choice.name.toLowerCase()}</option>
                            {/each}
                        </select>
                        and
                        <select on:change={handleAxisChange} data-axis="y" bind:value={axis.y}>
                            {#each $axisChoices as choice}
                                <option value={choice.value}>{choice.name.toLowerCase()}</option>
                            {/each}
                        </select>. There is a third crucial statistic: the
                        <i>mini turbo</i> that provides a speed boost after drifting.
                    </p>
                </StepContent>
            </section>
            <section class="h-[150vh]">
                <!-- Empty section for animation -->
            </section>
            <section>
                <StepContent>
                    <p>
                        Good news: the Pareto frontier concept can be generalized to more than two
                        dimensions. See, I added the <i>mini turbo</i> as a third one!
                    </p>
                </StepContent>
            </section>
            <section>
                <StepContent>
                    <p>
                        Sadly, it comes at a cost. As a rule of thumb, the size of the Pareto front
                        expands exponentially with the number of (potentialy infinite) dimensions,
                        making your choice harder.
                    </p>
                </StepContent>
            </section>
            <section>
                <StepContent>
                    <p>
                        As in the 2D case, you have to put weights on each dimensions to reveal the
                        optimal build. Open the dialogue below and find the best build for you!
                        <details>
                            <summary class="cursor-pointer underline hover:brightness-110"
                                >Customize</summary
                            >
                            <p class="text-center">
                                <WeightBox perc={utilityp[0]} size={20} color={"#e4000f"} />
                                <select
                                    on:change={handleAxisChange}
                                    data-axis="x"
                                    bind:value={axis.x}
                                >
                                    {#each $axisChoices as choice}
                                        <option value={choice.value}
                                            >{choice.name.toLowerCase()}</option
                                        >
                                    {/each}
                                </select>
                                <br />
                                <WeightBox perc={utilityp[1]} size={20} color={"DarkSlateBlue"} />

                                <select
                                    on:change={handleAxisChange}
                                    data-axis="y"
                                    bind:value={axis.y}
                                >
                                    {#each $axisChoices as choice}
                                        <option value={choice.value}
                                            >{choice.name.toLowerCase()}</option
                                        >
                                    {/each}
                                </select>
                                <WeightBox perc={utilityp[2]} size={20} color={"ForestGreen"} />

                                <select
                                    on:change={handleAxisChange}
                                    data-axis="z"
                                    bind:value={axis.z}
                                >
                                    {#each $axisChoices as choice}
                                        <option value={choice.value}
                                            >{choice.name.toLowerCase()}</option
                                        >
                                    {/each}
                                </select>
                            </p>
                            <DualSlider bind:x1={p[0]} bind:x2={p[1]} />
                        </details>
                    </p>
                </StepContent>
            </section>
            <section>
                <StepContent>
                    <p>
                        Let's look at the build currently favored by top players. Unsurprisingly,
                        the build sits right on our frontier when optimizing speed, acceleration,
                        and mini turbo.
                    </p>
                </StepContent>
            </section>
            <!-- <section>
                <StepContent>
                    <p>
                        If you are a new player however, optimizing on <select
                            on:change={handleAxisChange}
                            data-axis="x"
                            bind:value={axis.x}
                        >
                            {#each $axisChoices as choice}
                                <option value={choice.value}>{choice.name.toLowerCase()}</option>
                            {/each}
                        </select>
                        <select on:change={handleAxisChange} data-axis="y" bind:value={axis.y}>
                            {#each $axisChoices as choice}
                                <option value={choice.value}>{choice.name.toLowerCase()}</option>
                            {/each}
                        </select>
                        and
                        <select on:change={handleAxisChange} data-axis="z" bind:value={axis.z}>
                            {#each $axisChoices as choice}
                                <option value={choice.value}>{choice.name.toLowerCase()}</option>
                            {/each}
                        </select>
                        may turn more useful.
                    </p>
                </StepContent>
            </section> -->
        </div>
    </Scroller>
</div>

<style lang="postcss">
    section {
        @apply m-auto flex h-[100svh] w-full flex-col justify-end;
    }
</style>
