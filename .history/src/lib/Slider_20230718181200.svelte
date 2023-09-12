<script lang="ts">
    export let min: number = 0;
    export let max: number = 100;
    export let step: number = 1;
    export let value: number = 0;
    export let id : string = "slider";
    export let markers: boolean = false;
    export let title : string;
</script>

<style lang="postcss">
/*********** Baseline, reset styles ***********/
input[type="range"] {
  @apply appearance-none bg-transparent cursor-pointer w-11/12;
}

/* Removes default focus */
input[type="range"]:focus {
  @apply outline-none;
}

/******** Chrome, Safari, Opera and Edge Chromium styles ********/
/* slider track */
input[type="range"]::-webkit-slider-runnable-track {
  @apply bg-gray-300 rounded-sm h-2;
}

/* slider thumb */
input[type="range"]::-webkit-slider-thumb {
  @apply appearance-none -mt-2 bg-teal-700 rounded-full h-6 w-6;
}

input[type="range"]:focus::-webkit-slider-thumb {
    @apply outline-teal-700 outline-dashed outline-offset-2;
}

/*********** Firefox styles ***********/
/* slider track */
input[type="range"]::-moz-range-track {
  @apply bg-gray-300 rounded-sm h-2;
}

/* slider thumb */
input[type="range"]::-moz-range-thumb {
  @apply bg-teal-700 border-none rounded-full h-6 w-6;
}

input[type="range"]:focus::-moz-range-thumb{
  @apply outline-teal-700 outline-dashed outline-offset-2;
}
</style>

{#if title}
<h4 class = "text-mono ">{title}</h4>
{/if}
<input type="range" min={min} max={max} bind:value={value} id={id} step={step} list="thisSlider"
    class = "w-full mx-auto">
{#if markers}
    <datalist id="thisSlider">
        <option value={min} label={String(min)}></option>
        <option value={max} label={String(max)}></option>
    </datalist>
{/if}