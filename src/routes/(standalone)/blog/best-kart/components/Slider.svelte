<script lang="ts">
    export let min: number = 0;
    export let max: number = 100;
    export let step: number = 1;
    export let value: number = 0;
    export let id: string = "slider";
</script>

<div class="text-center">
    <input
        type="range"
        {min}
        {max}
        bind:value
        {id}
        {step}
        list="thisSlider"
        class={$$restProps.class || ""}
    />
</div>

<style lang="postcss">
    /*********** Baseline, reset styles ***********/
    input[type="range"] {
        @apply cursor-pointer touch-pan-y appearance-none bg-transparent;
    }

    /* Removes default focus */
    input[type="range"]:focus {
        @apply outline-none;
    }

    /******** Chrome, Safari, Opera and Edge Chromium styles ********/
    /* slider track */
    input[type="range"]::-webkit-slider-runnable-track {
        @apply h-2 rounded-sm bg-gray-300;
    }

    /* slider thumb */
    input[type="range"]::-webkit-slider-thumb {
        @apply -mt-2 h-6 w-6 appearance-none rounded-full bg-amber-400;
    }

    /*********** Firefox styles ***********/
    /* slider track */
    input[type="range"]::-moz-range-track {
        @apply h-2 rounded-sm bg-gray-300;
    }

    /* slider thumb */
    input[type="range"]::-moz-range-thumb {
        @apply h-6 w-6 rounded-full border-none bg-amber-400;
    }
</style>
