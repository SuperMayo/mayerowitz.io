<script lang="ts">
    import Scroller from "@sveltejs/svelte-scroller";
    import GearScatter from "./GearScatter.svelte";
    import StepContent from "./StepContent.svelte";
    import WeightBox from "./SVG/WeightBox.svelte";
    import { bucket, gearChoices, axisChoices, gears } from "../store";

    import type { AxisName, GearEnhanced, GearName } from "../lib/types.ts";
    import Slider from "./Slider.svelte";

    // Scroll dependent variables
    let showY = false;
    let xAxis: AxisName = "speed";
    let yAxis: AxisName = "acceleration";
    let gearType: GearName = "driver";
    let showStar = false;
    let focus: string[] = [];
    let onlyFrontier = false;
    let showUtility: boolean;

    // Display variables
    let containerWidth: number;
    let scatterWidth: number = 200;
    let maxX = 10;
    let maxY = 10;

    // Misc
    let canDraw = false;
    let hoveredData: GearEnhanced;
    let alpha: number = 0.5; // Alpha parameter for the utility
    let optimalGear: GearEnhanced[] = [];
    let index: number = 0;

    const target2event: {
        [key: number]: () => void;
    } = {
        0: () => {
            // New State
            showY = false;
            showStar = true;
        },
        1: () => {
            // Changed State
            showY = true;
            showStar = false;

            // New State
            yAxis = "acceleration";
            focus = [];
        },
        2: () => {
            // Old State
            showY = true;
            showStar = false;
            yAxis = "acceleration";

            // Changed State
            focus = ["Koopa Troopa"];

            // New State
            gearType = "driver";
            xAxis = "speed";
            hoveredData = false;
        },
        3: () => {
            // Old state
            showY = true;
            showStar = false;
            yAxis = "acceleration";
            gearType = "driver";
            xAxis = "speed";
            hoveredData = false;

            // Changed state
            focus = ["Koopa Troopa", "Cat Peach", "Toadette"];

            // New state
            onlyFrontier = false;
        },
        4: () => {
            // Old state
            showY = true;
            yAxis = "acceleration";
            gearType = "driver";
            xAxis = "speed";
            hoveredData = false;

            // Changed state
            showStar = true;
            onlyFrontier = true;
        },
        5: () => {
            // Old state
            showY = true;
            yAxis = "acceleration";
            gearType = "driver";
            xAxis = "speed";
            hoveredData = false;
            showStar = true;
            onlyFrontier = true;

            // New state
            showUtility = false;
        },
        6: () => {
            // Old state
            showY = true;
            yAxis = "acceleration";
            gearType = "driver";
            xAxis = "speed";
            hoveredData = false;

            // changed state
            onlyFrontier = false;
            showUtility = true;
            showStar = false;
        },
    };

    function fireEvent(index: number): void {
        if (index in target2event) {
            target2event[index]();
        }
    }

    $: if (canDraw) fireEvent(index);
    $: canDraw = $gears != null;
    $: if (containerWidth) scatterWidth = Math.min(containerWidth, 500);
</script>

<div class="pointer-events-none w-full">
    <Scroller top={0.2} bottom={0.8} threshold={0.5} bind:index>
        <div slot="foreground" class="bg-opacity-50 md:w-1/2">
            <section>
                <StepContent>
                    Finding the driver with the most speed is not challenging.
                </StepContent>
            </section>
            <section>
                <StepContent>
                    But if you want to consider more than one dimension, you cannot pick the <i
                        >best</i
                    >
                    <select bind:value={gearType}>
                        {#each $gearChoices as choice}
                            <option value={choice.value}>{choice.name.toLocaleLowerCase()}</option>
                        {/each}
                    </select>
                    anymore, trades-off between
                    <select bind:value={xAxis}>
                        {#each $axisChoices as choice}
                            <option value={choice.value}>{choice.name.toLowerCase()}</option>
                        {/each}
                    </select>
                    and
                    <select bind:value={yAxis}>
                        {#each $axisChoices as choice}
                            <option value={choice.value}>{choice.name.toLocaleLowerCase()}</option>
                        {/each}
                    </select>
                    are inevitable.
                    <br />
                    <button
                        on:click={() => {
                            gearType = "driver";
                            xAxis = "speed";
                            yAxis = "acceleration";
                        }}>reset</button
                    >
                </StepContent>
            </section>
            <section>
                <StepContent>
                    If you look closely though, you'll begin to see that some options are always <i
                        >dominated</i
                    >. Let's look at this poor Koopa
                    <img
                        src={$bucket + "/images/" + "64px-MK8_Koopa_Icon.png"}
                        alt="Koopa Troopa"
                        loading="lazy"
                        class="mx-auto my-0 inline h-5 w-5 drop-shadow-lg"
                    />
                    for instance.
                </StepContent>
            </section>
            <section>
                <StepContent>
                    Cat Peach
                    <img
                        src={$bucket + "/images/" + "64px-MK8_Cat_Peach_Icon.png"}
                        alt="Cat Peach"
                        loading="lazy"
                        class="mx-auto my-0 inline h-5 w-5 drop-shadow-lg"
                    />
                    brings more speed for the same acceleration, and Toadette

                    <img
                        src={$bucket + "/images/" + "64px-MK8_Toadette_Icon.png"}
                        alt="Toadette"
                        loading="lazy"
                        class="mx-auto my-0 inline h-5 w-5 drop-shadow-lg"
                    />
                    has more acceleration for the same speed. In any case, if you only care about acceleration
                    and speed, you should never let Koopa sit in your kart
                    <img
                        src={$bucket + "/images/" + "64px-MK8_Koopa_Icon.png"}
                        alt="Koopa Troopa"
                        loading="lazy"
                        class="mx-auto my-0 inline h-5 w-5 drop-shadow-lg"
                    />.
                </StepContent>
            </section>
            <section>
                <StepContent>
                    You can identify all drivers that, contrary to Koopa, are never dominated on
                    both speed and acceleration. Together, they form what is called the Pareto front
                    (or frontier).
                </StepContent>
            </section>
            <section>
                <StepContent>
                    Mind you: all elements on the frontier are not equally good. You probably won't
                    pick a driver sitting on the edge of the frontier because they are not balanced
                    enough in real conditions. The Pareto front is an objective criteria to filter
                    out bad choices, but it won't reveal the best solution.
                </StepContent>
            </section>
            <section>
                <StepContent>
                    Yet, if you know the
                    <span class="bg-amber-400 px-1 text-white"> relative utility </span>
                    of each stats (based on taste, or known constraints), you can determine which

                    <select bind:value={gearType}>
                        {#each $gearChoices as choice}
                            <option value={choice.value}>{choice.name.toLocaleLowerCase()}</option>
                        {/each}
                    </select>
                    on the frontier is the best
                    <p class="text-center">
                        <WeightBox perc={1 - alpha} size={20} />
                        <select bind:value={yAxis}>
                            {#each $axisChoices as choice}
                                <option value={choice.value}>{choice.name.toLowerCase()}</option>
                            {/each}
                        </select>&nbsp;
                        <WeightBox perc={alpha} size={20} />
                        <select bind:value={xAxis}>
                            {#each $axisChoices as choice}
                                <option value={choice.value}>{choice.name.toLowerCase()}</option>
                            {/each}
                        </select>
                    </p>
                    <div class="pt-1">
                        <Slider
                            min={0.01}
                            max={0.99}
                            step={0.01}
                            bind:value={alpha}
                            class="w-7/12"
                        />
                    </div>
                    <p class="text-center">
                        Best Pick(s) : &#123;{#each optimalGear as gear, i}
                            {#if i > 0},
                            {/if}
                            <img
                                alt={gear.name}
                                class="inline"
                                loading="lazy"
                                src={$bucket + "/images/" + gear.image_name}
                                width="20"
                                height="20"
                            />
                        {/each}&#125;<br />
                    </p>
                </StepContent>
            </section>
        </div>
        <div
            slot="background"
            class="m-auto h-[100svh] min-h-32 w-11/12
            md:mr-0 md:w-1/2"
            bind:clientWidth={containerWidth}
        >
            {#if canDraw}
                <GearScatter
                    bind:showY
                    bind:xAxis
                    bind:yAxis
                    bind:gearType
                    bind:showStar
                    bind:hoveredData
                    bind:onlyFrontier
                    bind:focus
                    bind:maxX
                    bind:maxY
                    bind:alpha
                    bind:optimalGear
                    bind:size={scatterWidth}
                    bind:showUtility
                />
            {/if}
        </div>
    </Scroller>
</div>

<style lang="postcss">
    section {
        @apply m-auto grid h-[100svh] w-full;
    }

    [slot="background"] {
        pointer-events: all;
    }
</style>
