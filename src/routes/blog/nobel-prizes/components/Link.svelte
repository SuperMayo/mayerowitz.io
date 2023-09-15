<script lang="ts">
// import link interface
import type {Link} from "../utils.ts";
export let link: Link;
export let nodesRelation: string;
</script>

{#if link.visible && nodesRelation == "network"}
    <line x1={link.source.x} y1={link.source.y}
        x2={link.target.x} y2={link.target.y}
        stroke-width="1" stroke="lightgrey"></line>
{/if}