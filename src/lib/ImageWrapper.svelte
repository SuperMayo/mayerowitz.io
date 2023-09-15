<script lang="ts">
    export let left_label: string = "";
    export let right_label: string = "";
    export let maxWidth: string = "xl";
</script>

<div class="flex center">
<div class = "max-w-{maxWidth} m-auto my-one italic text-gray-500">
    <slot/>
    {#if left_label || right_label}
        <div class = "flex justify-between flex-row">
            <span class = "font-mono text-left">{left_label}</span>
            <span class = "font-mono text-right">{right_label}</span>
        </div>
    {/if}
</div>
</div>