<script>
    import {onMount} from 'svelte';
    let canvas;
    export let height = 300;
    export let width = 300;

    let pointCoords = {x: 0, y: 0};

    $: xcoord = 0.5 - pointCoords.x/100 * width;
    $: ycoord = 0.5 - pointCoords.y/100 * height;

    onMount(() => {
        // point is looping around the canvas
        const interval = setInterval(() => {
            pointCoords.x = (pointCoords.x + 1) / 100;
            pointCoords.y = (pointCoords.y + 1) / 100;
        }, 100);
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

    <text x="32%" y="57%" class="text-sm">Shader(x,y)</text>
</svg>