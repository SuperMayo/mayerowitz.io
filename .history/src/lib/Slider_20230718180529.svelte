<script lang="ts">
    export let min: number = 0;
    export let max: number = 100;
    export let step: number = 1;
    export let value: number = 0;
    export let id : string = "slider";
    export let markers: boolean = false;
</script>

<style lang="postcss">
/*********** Baseline, reset styles ***********/
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 90%;
}

/* Removes default focus */
input[type="range"]:focus {
  outline: none;
}

/******** Chrome, Safari, Opera and Edge Chromium styles ********/
/* slider track */
input[type="range"]::-webkit-slider-runnable-track {
  background-color: #add8e6;
  border-radius: 0.5rem;
  height: 0.5rem;
}

/* slider thumb */
input[type="range"]::-webkit-slider-thumb {
  @apply bg-teal-700 border-none rounded-full h-6 w-6;
}

input[type="range"]:focus::-webkit-slider-thumb {
    @apply outline-teal-700 outline-dashed outline-offset-2;
}

/*********** Firefox styles ***********/
/* slider track */
input[type="range"]::-moz-range-track {
  background-color: #add8e6;
  border-radius: 0.5rem;
  height: 0.5rem;
}

/* slider thumb */
input[type="range"]::-moz-range-thumb {
  @apply bg-teal-700 border-none rounded-full h-6 w-6;
}

input[type="range"]:focus::-moz-range-thumb{
  @apply outline-teal-700 outline-dashed outline-offset-2;
}
</style>


<input type="range" min={min} max={max} bind:value={value} id={id} step={step} list="thisSlider"
    class = "w-full">
{#if markers}
    <datalist id="thisSlider">
        <option value={min} label={String(min)}></option>
        <option value={max} label={String(max)}></option>
    </datalist>
{/if}