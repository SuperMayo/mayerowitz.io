<script>
    import ImageWrapper from "$lib/ImageWrapper.svelte";
    let canvas;
    export let height = 300;
    export let width = 300;
</script>

<svg width={300} height={300} bind:this={canvas} class="font-mono m-auto">
    <rect width="80%" height="80%" stroke="black" x="10%" y="10%" stroke-width="0.5%" fill="none" />
    {#each {length: 8} as _, i}
        <line x1={width * (0.09) + (i+1) * (width*0.1)} y1="1%" x2={width * (0.09) + (i+1) * (width*0.1)} y2="91%" stroke="black" stroke-width="0.5%" />
        <line x1="9%" y1={height * (0.01) + (i+1) * (height*0.1)} x2="99%" y2={height * (0.01) + (i+1) * (height*0.1)} stroke="black" stroke-width="0.5%" />
    {/each}
    <text x="0%" y="98%">(0,0)</text>
</svg>