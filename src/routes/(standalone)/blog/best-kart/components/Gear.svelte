<script lang="ts">
    import { gears, bucket } from "../store";

    export let id: number;
    export let borderRadius = "rounded-full";
    export let bgDirection: "top" | "bottom" = "top";
    let gear: any;

    $: gear = $gears.find((d) => d.eq_id == id);
    $: equivalences = $gears.filter((d) => d.eq_id == gear.eq_id)[0].equivalences;

    let showTooltip: Boolean = true;
</script>

{#if $gears}
    <div
        class={`m-auto flex h-20 w-20 flex-col
        ${bgDirection == "top" ? "bg-gradient-to-t" : "bg-gradient-to-b"} border-2
        border-yellow-400 bg-sky-900 bg-opacity-70 drop-shadow-xl
        ${borderRadius}
        justify-center`}
    >
        <img
            src={$bucket + "/images/" + gear.image_name}
            alt={gear.name}
            loading="lazy"
            class="mx-auto my-0 drop-shadow-lg"
            width={"70%"}
        />
        {#if equivalences}
            <div class=" flex flex-row flex-wrap justify-center">
                {#each equivalences as other}
                    <img
                        src={$bucket + "/images/" + other.image_name}
                        alt={other.name}
                        width="20%"
                        loading="lazy"
                    />
                {/each}
            </div>
        {/if}
    </div>
{/if}
