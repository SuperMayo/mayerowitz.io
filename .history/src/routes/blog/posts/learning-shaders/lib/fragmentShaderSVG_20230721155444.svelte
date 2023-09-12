<script>
    import { onMount } from "svelte";
    import rough from "roughjs";
    let canvas;

    onMount(() => {
        let rc = rough.svg(canvas);
        let node = rc.rectangle(10, 10, 100, 100);
        canvas.appendChid(node);
    });

</script>

<svg width={300} height={300} bind:this={canvas}>

</svg>