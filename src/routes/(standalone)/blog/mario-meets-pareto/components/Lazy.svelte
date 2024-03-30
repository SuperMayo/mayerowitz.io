<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    export let rootMargin = "0%";
    let observer: IntersectionObserver;
    let loaded = false;
    let root;

    onMount(() => {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        loaded = true;
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: rootMargin },
        );
        observer.observe(root);
    });

    onDestroy(() => {
        if (observer) {
            observer.disconnect();
        }
    });
</script>

<div bind:this={root} class="h-full w-full">
    {#if loaded}
        <slot />
    {/if}
</div>
