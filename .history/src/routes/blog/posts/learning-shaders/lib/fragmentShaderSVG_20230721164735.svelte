<script>
    let canvas;
</script>

<svg width={300} height={300} bind:this={canvas} class="font-mono [&>p]:text-sm">
    <rect width={300} height={300} fill="black" />
    <text x="50%" y="50%" fill="white" font-size="10px" text-anchor="middle" dominant-baseline="middle">Loading...</text>
</svg>