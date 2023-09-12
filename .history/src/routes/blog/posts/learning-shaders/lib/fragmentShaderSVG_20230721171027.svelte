<script>
    import ImageWrapper from "$lib/ImageWrapper.svelte";
    let canvas;
    export let height = 300;
    export let width = 300;
</script>

<ImageWrapper>
<svg width={300} height={300} bind:this={canvas} class="font-mono">
    <rect width="90%" height="90%" stroke="black" x="5%" y="5%" stroke-width="0.5%" fill="none" />
    {#each {length: 8} as _, i}
        <line x1={width * (0.05) + (i+1) * (width*0.1)} y1="5%" x2={width * (0.05) + (i+1) * (width*0.1)} y2="95%" stroke="black" stroke-width="0.5%" />
        <line x1="5%" y1={height * (0.05) + (i+1) * (height*0.1)} x2="95%" y2={height * (0.05) + (i+1) * (height*0.1)} stroke="black" stroke-width="0.5%" />
    {/each} 
</svg>
</ImageWrapper>