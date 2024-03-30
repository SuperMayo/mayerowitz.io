<script lang="ts">
    export let width : number;
    export let height : number;
    export let x : number;
    export let y : number;
    export let color : string;
    export let rotate : number = 0;
</script>

<g transform={`rotate(${rotate} ${x+width/2} ${y+height/2})`}>
<rect width={width} height={height} text-anchor="middle"
    x={x} y={y}
    stroke={color} fill="white" stroke-width="4px"/>
<text x={x+width/2} y={y+height/2}
    dominant-baseline="middle" text-anchor="middle"><slot/></text>
</g>