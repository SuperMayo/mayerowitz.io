<script lang="ts">
    import {onMount, createEventDispatcher} from "svelte";

    let container : HTMLDivElement;
    let intersecting : Boolean = false;

    let dispatch = createEventDispatcher();

    onMount(() => {
        const observer = new IntersectionObserver(entries => {
            intersecting = entries[0].isIntersecting;
            dispatch("intersecting", intersecting);
        })
        observer.observe(container);
    });

    $: console.log(intersecting);
</script>

<div bind:this={container}>
    <slot/>
</div>