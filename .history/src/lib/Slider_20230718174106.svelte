<script lang="ts">
    export let min: number = 0;
    export let max: number = 100;
    export let step: number = 1;
    export let value: number = 0;
    export let id : string = "slider";
    export let markers: boolean = false;
</script>


<input type="range" min={min} max={max} bind:value={value} id={id} step={step} list="thisSlider"
    class = "w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700">
{#if markers}
    <datalist id="thisSlider">
        <option value={min} label={String(min)}></option>
        <option value={max} label={String(max)}></option>
    </datalist>
{/if}