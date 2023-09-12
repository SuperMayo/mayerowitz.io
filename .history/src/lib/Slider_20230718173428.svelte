<script lang="ts">
    export let min: number = 0;
    export let max: number = 100;
    export let step: number = 1;
    export let value: number = 0;
    export let id : string = "slider";
    export let markers: boolean = false;
</script>


<input type="range" min={min} max={max} bind:value={value} class="slider" id={id} step={step} list="thisSlider">
{#if markers}
    <datalist id="thisSlider">
        <option value={min} label={min}></option>
        <option value={max} label={max}></option>
    </datalist>
{/if}