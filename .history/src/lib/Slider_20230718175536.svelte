<script lang="ts">
    export let min: number = 0;
    export let max: number = 100;
    export let step: number = 1;
    export let value: number = 0;
    export let id : string = "slider";
    export let markers: boolean = false;
</script>

<style lang="postcss">
input[type='range']::-webkit-slider-thumb {
    @apply appearance-none w-4 bg-teal-700 h-one border-2 rounded-full;
}

input[type='range']::-moz-range-thumb {
    @apply appearance-none w-4 bg-teal-700 h-one border-2 rounded-full;
}

input[type='range']::-webkit-slider-runnable-track {
    @apply appearance-none bg-slate-200 rounded-full h-0.5;
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