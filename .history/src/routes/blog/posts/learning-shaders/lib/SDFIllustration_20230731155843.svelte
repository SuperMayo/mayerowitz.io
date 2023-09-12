<script>
    import {onMount} from 'svelte';
    let canvas;
    export let height = 300;
    export let width = 300;

    let xcoord, ycoord = 150;
    let color = "rgba(1.,1.,0,1)";

    let p = [150, 150]

    onMount(() => {
        // point is looping around the canvas
        setInterval(() => {
            p[0] = width/2.8 + Math.cos(Date.now() / 1000) * width/4;
            p[1] = height/2 + Math.sin(Date.now() / 1000) * height/3;
        }, 10);
    });

    // normalize coordinates to represent the position in the svg rectangle rather
    // than the position in the canvas
    const normCoords = (coord) => {
        return ((coord - width*0.1) // shift to the left/top
                / (width*0.8))
    }
</script>

<svg width={300} height={300} bind:this={canvas} class="font-mono m-auto">
    <defs>
        <marker 
          id='arrowhead' 
          orient="auto" 
          markerWidth='5' 
          markerHeight='5' 
          refX='0' 
          refY='2'
        >
          <path d='M 0 0 V 4 L 5 2 Z' fill="black" />
        </marker>
    </defs>
    <rect width="80%" height="80%" stroke="black" x="10%" y="10%" stroke-width="0.5%" fill="none" />
    {#each {length: 7} as _, i}
        <line x1={width * (0.1) + (i+1) * (width*0.1)} y1="10%"
            x2={width * (0.1) + (i+1) * (width*0.1)} y2="90%"
            stroke="gray" stroke-dasharray="2,4" stroke-width="0.5%" />
        <line x1="10%" y1={height * (0.1) + (i+1) * (height*0.1)}
              x2="90%" y2={height * (0.1) + (i+1) * (height*0.1)}
              stroke="gray" stroke-dasharray="2,4" stroke-width="0.5%" />
    {/each}
    <text x="0%" y="98%">(0,0)</text>
    <text x="85%" y="98%">(1,0)</text>
    <text x="0%" y="8%">(0,1)</text>
    <text x="85%" y="8%">(1,1)</text>

    <!-- Circle not filled-->
    <circle cx={200} cy={100} r="15%" stroke="teal" stroke-width="1%" fill="none" />
    <!-- Arrow from origin to the center of the circle -->
    <line x1="10%" y1="90%" x2="200" y2="100" stroke="teal" stroke-width="1%" marker-end="url(#arrowhead)" />
</svg>