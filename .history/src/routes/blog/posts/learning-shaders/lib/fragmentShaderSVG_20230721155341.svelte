<script>
    import { onMount } from "svelte";
    import rough from "roughjs";
    let canvas;

    onMount(() => {
        let rc = rough.svg(canvas);
        rc.rectangle(10, 10, 100, 100);
    });

</script>

<svg bind:this={canvas}>

</svg>