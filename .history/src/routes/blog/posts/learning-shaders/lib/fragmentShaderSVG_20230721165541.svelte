<script>
    let canvas;
</script>

<svg width={300} height={300} bind:this={canvas} class="font-mono">
    <rect width="90%" height="90%" stroke="black" x="5%" y="5%" stroke-width="0.5%" fill="none" />
    {#each {length: 10} as _, i}
        <line x1={`5`} y1="5%" x2={10 + i * 30} y2="95%" stroke="black" stroke-width="0.5%" />
    {/each} 
</svg>