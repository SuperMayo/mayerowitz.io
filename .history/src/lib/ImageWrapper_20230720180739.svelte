<script lang="ts">
    export let left_label: string = "";
    export let right_label: string = "";
</script>

<div class = "max-w-[500px] m-auto">
    <slot/>
    {#if left_label || right_label}
        <div class = "flex justify-between flex-row">
            <span class = "font-mono">{left_label}</span>
            <span class = "font-mono text-right">{right_label}</span>
        </div>
    {/if}
</div>