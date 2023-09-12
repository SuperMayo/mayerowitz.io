<script lang="ts">
    export let left_label: string = "";
    export let right_label: string = "";
</script>

<div class = "max-w-[500px] m-auto">
    <slot/>
    {#if left_label || right_label}
        <div class = "w-full bg-red-50 justify-end">
            <span class = "font-mono">{left_label}</span>
            <span class = "font-mono">{right_label}</span>
        </div>
    {/if}
</div>