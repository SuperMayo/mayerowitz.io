<script lang="ts">
    import { fade } from "svelte/transition";
    import { bucket } from "../store";
    import type { Gear } from "../lib/types";
    export let data: Gear;
    export let x: number;
    export let y: number;

    let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

<div
    class="fixed m-0 block max-w-[200px] rounded-md
    bg-beige bg-opacity-50 p-2 text-slate-800 backdrop-blur-sm"
    style="left: {x > innerWidth / 2 ? x - 210 : x + 10}px; top: {y - 300}px"
    transition:fade={{ duration: 100 }}
>
    <h3 class="m-0 text-center">{data.name}</h3>

    {#if data.equivalences}
        Equivalent to:
        <div>
            {#each data.equivalences as equivalence}
                <div>
                    <img
                        src={$bucket + "/images/" + equivalence.image_name}
                        width="30px"
                        alt={equivalence.name}
                        loading="lazy"
                        class="inline-block"
                    />
                    {equivalence.name}
                </div>
            {/each}
        </div>
    {/if}
</div>
