<script lang="ts">
    export let min = 0.01;
    export let max = 0.99;
    export let step = 0.05;
    export let x1 = 0.33;
    export let x2 = 0.66;
    export let palette = ["#e4000f", "DarkSlateBlue", "ForestGreen"];

    let minthumb: number;
    let maxthumb: number;

    function handleInputChange(e: Event, handle: "x1" | "x2"): void {
        if (x1 >= x2 - step) {
            if (handle == "x1") {
                x1 = x2 - step;
            }
            if (handle == "x2") {
                x2 = x1 + step;
            }
        }
    }

    $: minthumb = ((x1 - min) / (max - min)) * 100;
    $: maxthumb = ((x2 - min) / (max - min)) * 100;
</script>

<div class="multi-range relative h-14 w-11/12 max-w-md">
    <div>
        <input
            type="range"
            {step}
            {min}
            {max}
            bind:value={x1}
            on:input={(e) => handleInputChange(e, "x1")}
        />
        <input
            type="range"
            {step}
            {min}
            {max}
            bind:value={x2}
            on:input={(e) => handleInputChange(e, "x2")}
        />
    </div>
    <div class="relative top-3 -z-10 w-11/12">
        <div class="absolute h-1" style="width:{x1 * 100}%; background-color: {palette[0]}"></div>
        <div
            class="absolute h-1"
            style="width:{(x2 - x1) * 100}%; left:{x1 * 100}%; background-color: {palette[1]}"
        ></div>
        <div
            class="absolute h-1"
            style="width:{(1 - x2) * 100}%; left:{x2 * 100}% ; background-color: {palette[2]}"
        ></div>
    </div>
</div>

<style lang="postcss">
    /*********** Baseline, reset styles ***********/
    input[type="range"] {
        @apply pointer-events-none absolute m-0 box-border w-11/12 appearance-none overflow-hidden rounded-s border-none px-0 py-1 outline-none;
        background: none;
        /* Use a linear gradient to generate only the 2px height background */
        background-size: 100% 6px;
    }

    /******** Chrome, Safari, Opera and Edge Chromium styles ********/
    /* slider thumb */
    input[type="range"]::-webkit-slider-thumb {
        @apply pointer-events-auto cursor-pointer;
        @apply h-6 w-6 appearance-none rounded-full bg-amber-400;
    }
    input[type="range"]::-webkit-slider-thumb:hover {
        @apply brightness-105;
    }

    /*********** Firefox styles ***********/
    /* slider track */
    /* slider thumb */
    input[type="range"]::-moz-range-thumb {
        @apply pointer-events-auto cursor-pointer;
        @apply h-6 w-6 appearance-none rounded-full bg-amber-400;
    }
    input[type="range"]::-moz-range-thumb:hover {
        @apply brightness-105;
    }
    /* Remove the background that goes over the thumb */
    .multi-range {
        input[type="range"] {
            &:nth-child(2) {
                background: none;
            }
        }
    }
</style>
