<script lang="ts">
    import {onMount} from "svelte";

    let container : HTMLDivElement;
    let intersecting : Boolean = false;

    onMount(() => {
        const observer = new IntersectionObserver(entries => {
            intersecting = entries[0].isIntersecting;
        })
        observer.observe(container);
    });

    $: console.log(intersecting);
</script>

<div bind:this={container}>
    <slot/>
</div>