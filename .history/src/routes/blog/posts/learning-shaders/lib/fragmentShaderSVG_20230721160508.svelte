<script>
    import { onMount } from "svelte";
    import rough from "roughjs";
    let canvas;

    onMount(() => {
        let rs = rough.svg(canvas);
        const uv = rs.rectangle(10, 10, 280, 280);
        
        canvas.appendChild(uv);
    });
</script>

<svg width={300} height={300} bind:this={canvas}>

</svg>