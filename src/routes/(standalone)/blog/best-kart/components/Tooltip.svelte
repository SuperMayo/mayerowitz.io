<script>
    import { fade } from "svelte/transition";
    import { marginScroll } from "../store";
    export let data;
    export let xScale;
    export let yScale;
</script>

<div class="tooltip" style="position: absolute;
    top: {yScale(10.5)}px;
    left: {xScale(4.5)}px;
    height: {yScale(7.7)}px;
    width: {xScale(10)-xScale(4)}px"
    transition:fade={{ duration: 100 }}
    >
    <h3>{data.name}</h3>
    S:{data.Speed}|W:{data.Weight}|A:{data.Acceleration}<br/>
    {#if data.equivalences}
        This {data.type} is strictly equivalent to:
        <div>
                {#each data.equivalences as equivalence}
                    <img src="{equivalence.img_url}" width="30px" alt="{equivalence.name}">
                {/each}
        </div>
    {/if}
</div>

<style>
    .tooltip {
        background-color: rgba(255, 255, 255, 0.913);
        border: 0px solid black;
        padding: 1px;
        font-size: 11px;
        margin: 0;
    }
    .tooltip h3 {
        margin: 0;
        padding: 0;
    }
</style>