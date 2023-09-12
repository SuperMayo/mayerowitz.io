<script>
    import { onMount } from "svelte";
    import rough from "roughjs";
    let canvas;

    onMount(() => {
        let rc = rough.canvas(canvas);
        rc.rectangle(10, 10, 200, 200);
    });

</script>

<canvas bind:this={canvas}>

</canvas>