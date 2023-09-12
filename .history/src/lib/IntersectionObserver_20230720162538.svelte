<script lang="ts">
    import {onMount, createEventDispatcher} from "svelte";

    let container : HTMLDivElement;
    let intersecting : Boolean = false;

    let dispatch = createEventDispatcher();

    onMount(() => {
        const observer = new IntersectionObserver(entries => {
            intersecting = entries[0].isIntersecting;
            dispatch("intersection", intersecting);
        })
        observer.observe(container);
    });
</script>

<div bind:this={container}>
    <slot/>
</div>