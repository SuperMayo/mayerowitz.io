<script>
    import {onMount} from 'svelte';
    let canvas;
    export let height = 300;
    export let width = 300;

    let xcoord, ycoord = 150;

    onMount(() => {
        // point is looping around the canvas
        setInterval(() => {
            xcoord = width/2 + Math.cos(Date.now() / 1000) * width/5;
            ycoord = height/2 + Math.sin(Date.now() / 1000) * height/5;
        }, 10);
    });
</script>

<svg width={300} height={300} bind:this={canvas} class="font-mono m-auto">
    <rect width="80%" height="80%" stroke="black" x="10%" y="10%" stroke-width="0.5%" fill="none" />
    {#each {length: 7} as _, i}
        <line x1={width * (0.1) + (i+1) * (width*0.1)} y1="10%" x2={width * (0.1) + (i+1) * (width*0.1)} y2="90%" stroke="black" stroke-width="0.5%" />
        <line x1="10%" y1={height * (0.1) + (i+1) * (height*0.1)} x2="90%" y2={height * (0.1) + (i+1) * (height*0.1)} stroke="black" stroke-width="0.5%" />
    {/each}
    <text x="0%" y="98%">(0,0)</text>
    <text x="85%" y="98%">(1,0)</text>
    <text x="0%" y="8%">(0,1)</text>
    <text x="85%" y="8%">(1,1)</text>

    <rect x={xcoord} y={ycoord} width="2%" height="2%" r="2%" fill="teal" />
    <text x={xcoord+10} y={ycoord+5} class="text-sm">Shader({(xcoord/width).toFixed(2)},{(ycoord/width).toFixed(2)})</text>

</svg>