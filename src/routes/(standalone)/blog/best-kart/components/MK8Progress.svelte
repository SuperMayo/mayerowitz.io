<script lang="ts">
    export let name = "Speed";
    export let value = 0;
    export let max = 21;

    let progress: number;

    $: progress = value / max;
</script>

<div class="w-full">
    <h2 class="m-0 italic text-yellow-300">{name}</h2>
    <div class="mx-auto mb-5 w-full">
        <!-- Progress Bar Container -->
        <div class="top-shadow bottom-light h-8 w-full -skew-x-12 rounded-md bg-slate-500">
            <!-- Progress Bar Fill -->
            <div
                class="bottom-light h-8 rounded-md bg-yellow-300 shadow-inner"
                style="width: {progress * 100}%"
            ></div>
            <div class="striped absolute left-0 top-0 h-full w-full rounded-md"></div>
        </div>
    </div>
</div>

<style lang="postcss">
    .striped {
        background-image: repeating-linear-gradient(
            -89deg,
            transparent,
            transparent 18%,
            rgba(100, 100, 100, 1) 20%,
            rgba(0, 0, 0, 0.8) 19%
        );
    }

    .top-shadow {
        box-shadow: inset 3px 4px 6px 5px rgba(0, 0, 0.8, 0.3);
    }

    .bottom-light {
        @apply border-b-2 border-gray-200;
    }
</style>

