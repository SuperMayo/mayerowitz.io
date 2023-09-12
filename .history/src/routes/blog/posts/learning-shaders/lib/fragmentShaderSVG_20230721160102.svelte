<script>
    import { onMount } from "svelte";
    import rough from "roughjs";
    let canvas;

    onMount(() => {
        let rs = rough.svg(canvas);
        const line = rs.rectangle(10, 10, 100, 100);
        canvas.appendChild(line);
    });
</script>

<svg width={300} bind:this={canvas}>

</svg>