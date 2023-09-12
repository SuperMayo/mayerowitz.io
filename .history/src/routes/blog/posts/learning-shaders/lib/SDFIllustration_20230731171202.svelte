<script>
    import {onMount} from 'svelte';
    let canvas;
    export let height = 300;
    export let width = 300;

    let xcoord, ycoord = 150;
    let color = "rgba(1.,1.,0,1)";

    let p = {
        c: [180, 120],
        r: 60,
        d: [30+24*4.5, 30+24*5.5]
    }


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
          markerHeight='4' 
          refX='4' 
          refY='2'
        >
          <path d='M 0 0 V 4 L 5 2 Z'/>
        </marker>
    </defs>
    <rect width="80%" height="80%" stroke="black" x="10%" y="10%" stroke-width="0.5%" fill="none" />
    {#each {length: 7} as _, i}
        <line x1={width * (0.1) + (i+1) * (width*0.1)} y1="10%"
            x2={width * (0.1) + (i+1) * (width*0.1)} y2="90%"
            stroke="lightgray" stroke-dasharray="2,4" stroke-width="0.5%" />
        <line x1="10%" y1={height * (0.1) + (i+1) * (height*0.1)}
              x2="90%" y2={height * (0.1) + (i+1) * (height*0.1)}
              stroke="lightgray" stroke-dasharray="2,4" stroke-width="0.5%" />
    {/each}
    <text x="0%" y="98%">(0,0)</text>
    <text x="85%" y="98%">(1,0)</text>
    <text x="0%" y="8%">(0,1)</text>
    <text x="85%" y="8%">(1,1)</text>

    <!-- Circle not filled-->
    <circle cx={p.c[0]} cy={p.c[1]} r={p.r} stroke="teal" stroke-width="1%" fill="none" />
    <!-- Arrow from origin to the center of the circle -->
    <line x1="10%" y1="90%" x2={p.c[0]} y2={p.c[1]} stroke="black" stroke-width="0.5%" marker-end="url(#arrowhead)" />
    <!-- Radius -->
    <line x1={p.c[0]} y1={p.c[1]} x2={p.c[0] + p.r} y2={p.c[1]} stroke="black" stroke-width="0.5%" stroke-dasharray="3,1"/>
    <text x={p.c[0] + p.r/3} y={p.c[1] - 5} class="text-sm">r</text>

    <!-- Arrow from origin to the point on the circle -->
    <line x1="10%" y1="260" x2={p.d[0]-5} y2={p.d[1]-5} stroke="yellow" stroke-width="0.5%"
        stroke-dasharray="3,1"/>
    <text x={p.d[0]/2} y={p.d[1]*1.2} class="text-sm">d</text>
</svg>