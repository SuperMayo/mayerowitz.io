<script lang="ts">
    import {onMount} from "svelte";
    import * as d3 from "d3";
    import {
        stepIndex,
        mobile,
        marginScroll,
        nodesRelation,
        links,
        nodes,
        linkType,
        nodeType,
        highlightFemale
    } from "../store";
    import Node from "./Node.svelte";
    import Link from "./Link.svelte";
    import {fade, draw, slide} from "svelte/transition";
    import MatrixQuarterTitle from "./MatrixQuarterTitle.svelte";
    let width = 1000;
    let height = 700;

    // d3 simulation mutates the data, so we create a local copy
    let localLinks = $links.map(d => ({...d}));
    let localNodes = $nodes.map(d => ({...d}));

    // Keep USA in the center
    localNodes = localNodes.map(node => {
        if(node.id === "USA" && node.group === "country") {
            return {
                ...node,
                fx: 0,
                fy: 0
            }}
        else {
                return node;
            }
        }
    );
    let simLinks = [];
    let simNodes = [];

    // Updates the visibility of links based on the selected link type
    function updateLinks(linkType) {
        localLinks = localLinks.map(link => ({
            ...link,  // spread the existing link properties
            visible: linkType.includes(link.type)  // update the visible property
        }));
    }

    // Updates the visibility and matrix positions of nodes based on the selected node type and links
    function updateNodes(nodeType, links) {
        localNodes = localNodes.map(node => ({
            ...node,  // spread the existing node properties
            visible: nodeType.includes(node.group),  // update the visible property
        }));
        // Assign matrix positions to laureate nodes
        localNodes = localNodes.map(node => {
                if(node.group == "laureate") {
                    const {x, y} = matrixPosition(node.tooltip.birthCountry, node.tooltip.affiliationCountry);
                    return {
                        ...node,
                        matrixX: x,
                        matrixY: y
                    }}
                else {
                        return node;
                    }
                });
        // Hide nodes with no link
    }

    let simulation;

    function initSimulation() {
        console.log("init Simulation")
        updateLinks($linkType);
        updateNodes($nodeType, localLinks);
        // Filter visible nodes and links for simulation
        simNodes = localNodes.filter((node) => node.visible);
        simLinks = localLinks.filter((link) => link.visible);
        // Create simulation
        simulation = d3.forceSimulation(simNodes)
          .force('link', d3.forceLink(simLinks).id(d => d.id))
          .force('charge', d3.forceManyBody())
          .force('x', d3.forceX().strength(0.2))
          .force('y', d3.forceY().strength(0.2))
          .force('collision', d3.forceCollide().radius(5));
        // Update data on each tick
        simulation.on('tick', () => {
            simLinks = simLinks;
            simNodes = simNodes;
        });
    };

    function updateSimulation() {
        if(!simulation) return;
        console.log({$linkType})
        updateLinks($linkType);
        updateNodes($nodeType, localLinks);
        // Filter visible nodes and links for simulation
        //simNodes = localNodes.filter((node) => node.visible);
        simLinks = localLinks.filter((link) => link.visible);
        // Restart simulation with updated nodes and links
        if($nodesRelation == "network"){
        simulation.stop()
            .nodes(simNodes)
            .velocityDecay(0.9)
            .force('link', d3.forceLink(simLinks).id(d => d.id))
            .force('x', d3.forceX().strength(0.2))
            .force('y', d3.forceY().strength(0.2))
            .alpha(1)
            .restart();
        } else {
            simulation.stop()
            .nodes(simNodes.filter(node => node.group === "laureate"))
            //use matriX position as x force
            // remove link force
            .force('link', null)
            .force('x', d3.forceX().x(d => d.matrixX).strength(0.8))
            .force('y', d3.forceY().y(d => d.matrixY).strength(0.8))
            .alpha(1)
            .restart();
        }
        simulation.on('tick', () => {
            simNodes = simNodes;
            simLinks = simLinks;
        });
    };

    $: $linkType, $nodeType, updateSimulation();

    onMount(() => {
        initSimulation();
    });

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    function makeDraggable(nodeElement, { node }) {
        d3.select(nodeElement)
        .datum(node)  // Associate the Svelte node data with this DOM element
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );
    }

    function matrixPosition(birthCountry: string, affiliationCountry: string) : {x: number, y: number} {
        const y = birthCountry === "USA" ? -height/4 : height/4;
        const x = affiliationCountry ==="USA" ? width/4 : -width/4;
        return {x, y};  
    }

    $: console.log($nodesRelation)

</script>

<div id="network-chart" class="">
    <svg {width} {height} viewBox={`${-width/2} ${-height/2} ${width} ${height}`}>

        <rect width={width} height={height} style="fill:rgba(0,80,80,0.04)"
            x={-width/2} y={-height/2}/>

        {#if $nodesRelation == "matrix"}
            <line x1={-width/2} x2={width/2} y1={0} y2={0}
            stroke-width="3" stroke="black" transition:draw/>
            <line x1={0} x2={0} y1={-height/2} y2={height/2}
            stroke-width="3" stroke="black" transition:draw/>
            <g transition:fade>
                <MatrixQuarterTitle
                    x={-width/2 + width/8} y={-height/2+10} width={width/5} height={30} color="orange">
                    Do not work in the US
                </MatrixQuarterTitle>
                <MatrixQuarterTitle
                    x={width/6} y={-height/2+10} width={width/5} height={30} color="orange">
                    Work in the US
                </MatrixQuarterTitle>
                <MatrixQuarterTitle
                    x={-width/1.8} y={-height/4} width={height/4} height={30} color="orange"
                    rotate={-90}>
                    Born in the US
                </MatrixQuarterTitle>
                <MatrixQuarterTitle
                x={-width/1.8} y={height/4} width={height/4} height={30} color="orange"
                rotate={-90}>
                Born outside the US
            </MatrixQuarterTitle>
            </g>
        {/if}

        {#each simLinks as link}
            <Link {link} nodesRelation={$nodesRelation} />
        {/each}
      
        {#each simNodes as node}
            <Node {node}
                nodesRelation={$nodesRelation}
                {makeDraggable} 
                highlightFemale={$highlightFemale} />
        {/each}
    </svg>
</div>

<style>
    svg text::selection {
        background: none;
    }
</style>