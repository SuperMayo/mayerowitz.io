<script lang="ts">
    export let summary : string = "";
    export let open : boolean = false;
    export let enabled : boolean = true;
</script>

{#if enabled}
    <details open={open}>
        <summary class="cursor-pointer font-mono">
            {summary}
        </summary>
        <slot/>
    </details>
{:else}
    <slot/>
{/if}