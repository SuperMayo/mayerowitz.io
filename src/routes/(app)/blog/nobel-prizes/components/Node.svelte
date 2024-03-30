<script lang="ts">
    import {fade} from "svelte/transition";

    import type {Node} from "../utils.ts";
    export let node: Node;
    export let nodesRelation: string;
    export let makeDraggable: Function;
    export let highlightFemale: boolean;
</script>

{#if node.visible}
  {#if node.group === 'laureate'}
    <circle cx={node.x} cy={node.y} r="4"
            class="node"
            transition:fade={{duration: 300}}
            style={highlightFemale && node.tooltip.gender === "male" ? "opacity: 0.2;" : "opacity: 1;"}
            fill={node.tooltip.gender === "male" ? "teal" : "orange"}
            stroke="white" />
  {/if}
  {#if node.group !== 'laureate' && nodesRelation === "network"}
    <g use:makeDraggable={{node}} class="node cursor-grabbing">
      <circle cx={node.x} cy={node.y} r="6" fill="black" />
      <text x={node.x + 10} y={node.y + 5} font-size="15px" fill="firebrick">
        {node.id}
      </text>
    </g>
  {/if}
{/if}
