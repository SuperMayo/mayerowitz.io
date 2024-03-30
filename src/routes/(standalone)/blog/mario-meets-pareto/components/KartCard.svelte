<script lang="ts">
    import { gears } from "../store";
    import Gear from "./Gear.svelte";

    export let driver_id: number;
    export let body_id: number;
    export let tire_id: number;
    export let glider_id: number;
</script>

{#if $gears}
    <div class="m-auto h-full w-full">
        <div class="m-auto flex h-full w-full flex-col items-center justify-around">
            <div class="flex w-full flex-row justify-around">
                <Gear
                    id={driver_id}
                    borderRadius="rounded-t-full rounded-bl-full"
                    bgDirection="top"
                />
                <Gear
                    id={body_id}
                    borderRadius="rounded-t-full rounded-br-full"
                    bgDirection="top"
                />
            </div>
            <div class="flex w-full flex-row justify-around">
                <Gear
                    id={tire_id}
                    borderRadius="rounded-tl-full rounded-b-full"
                    bgDirection="bottom"
                />
                <Gear
                    id={glider_id}
                    borderRadius="rounded-tr-full rounded-b-full"
                    bgDirection="bottom"
                />
            </div>
        </div>
    </div>
{/if}
