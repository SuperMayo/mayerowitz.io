<script lang="ts">
    import {onMount, createEventDispatcher} from "svelte";

    let container : HTMLDivElement;
    let intersecting : Boolean = false;

    onMount(() => {
        const observer = new IntersectionObserver(entries => {
            intersecting = entries[0].isIntersecting;
            createEventDispatcher().dispatch("intersecting", intersecting);
        })
        observer.observe(container);
    });

    $: console.log(intersecting);
</script>

<div bind:this={container}>
    <slot/>
</div>