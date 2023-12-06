<script>
  import { tweened } from "svelte/motion";
  import { quartOut } from "svelte/easing";
  import { marginScroll } from "../store";
  import { fade, draw, slide } from "svelte/transition";
  import data from "../assets/dataset_flat.json";
  import Tooltip from "./Tooltip.svelte";
  import * as d3 from "d3";
  import fastParetoFilter from "../lib/pareto";

  // initialize scatter size
  let width = 500;
  let height = 500;
  const maxX = 10;
  const maxY = 10;

  // initialize axis
  export let showY = false;
  export let xAxis = "Speed";
  export let yAxis = "one";
  export let gearType = "driver";
  $: yAxis = showY ? "Acceleration" : "one";

  // initialize pareto info
  export let showStar = false;
  export let focus = [];
  export let onlyFrontier = false;

  // initialize hovered data
  export let hoveredData;

  // Load data with the right gear type changes
  function loadStore(xAxis) {
    return tweened(
      data.map((d) => {
        return { ...d, cx: d[xAxis], cy: 1, x: 5, y: 5, frontier: 0, opacity: 0.75};
      }),
      {
        duration: 1000,
        easing: quartOut,
      }
    );
  }

  function smartOpacity(focus, name){
      return(focus.includes(name) ? 1 : 0.3);
  }

  // Initialize store
  let dataset = loadStore(xAxis);

  function sim(xAxis, yAxis){
    return(d3
      .forceSimulation($dataset)
      .force("x", d3.forceX((d) => d.type == gearType ? d[xAxis] : -5).strength(5))
      .force("y", d3.forceY((d) => d[yAxis]).strength(5))
      .force("collide", d3.forceCollide().radius(0.3))
      .tick(100))
  }

  // Update store when axis changes
  function setAxis(xAxis, yAxis, gearType) {
    console.log("Update starts")
    // Simulation returns the non-overlapping new positions in x and y
    sim(xAxis, yAxis);  
    // Compute the pareto front
    $dataset = fastParetoFilter($dataset, xAxis, yAxis, gearType);
    // Update correct positions in the data store
    $dataset = $dataset.map((d) => {
        return { ...d, cx: d.x, cy: d.y};
      })
    // update store
    updateStore($dataset);
  }

  function setFocus(focus){
    if (focus.length == 0) {
      $dataset = $dataset.map((d) => {
          return { ...d, opacity: 0.75};
        })
    } else {
      $dataset = $dataset.map((d) => {
          return { ...d, opacity: focus.includes(d.name) ? 1 : 0.2};
        })
    }
    updateStore($dataset);
  }

  function focusOnFrontier(){
    const newFrontier = $dataset.filter((d) => d.frontier > 0.9).map((d) => d.name);
    setFocus(newFrontier);
  }

  function updateStore(newdataset) {
    dataset.set(newdataset)
  }

  // Update store on changes
  $: setAxis(xAxis, yAxis, gearType);
  $: setFocus(focus);
  $: {
    if (onlyFrontier) {
      focusOnFrontier()
    }
  }

  // Initialize scales
  $: xScale = d3.scaleLinear()
    .domain([-0.5, maxX+0.5])
    .range([$marginScroll.left, width - $marginScroll.right]);

  $: yScale = d3.scaleLinear()
    .domain([-0.5, maxY+0.5])
    .range([height - $marginScroll.bottom, $marginScroll.top]);
</script>

<div id="scatter-chart" bind:offsetWidth={width} bind:offsetHeight={height}>
  <svg {width} {height}>
    <!-- Y axis -->
    {#if showY}
      <!-- Y ticks -->
      {#each yScale.ticks() as tick, i}
          <g
            in:fade={{ delay: 1000 + i * 100, duration: 100 }}
            transform={`translate(${$marginScroll.left - 20} ${
              yScale(tick+0.3)
            })`}
          >
            <text
              in:fade={{ duration: 500, delay: 1000 }}
              class="axis-text"
              y="15"
              text-anchor="end"
            >
              {tick}
            </text>
          </g>
        <line
          in:draw={{ duration: 1000 }}
          class="axis-line"
          x1={$marginScroll.left}
          y1={yScale(tick + 0.5)}
          x2={width-$marginScroll.right}
          y2={yScale(tick + 0.5)}
          stroke="black"
          stroke-width="1"
          stroke-dasharray="2"
        />
      {/each}
      <!-- Y axis label -->
      <text
        in:fade={{ duration: 500, delay: 1000 }}
        class="axis-label"
        y={$marginScroll.left / 3}
        x={-(height / 2)}
        text-anchor="middle"
        transform="rotate(-90)">{yAxis}</text
      >
      <line
        in:draw={{ duration: 1000 }}
        class="axis-line"
        x1={$marginScroll.left}
        y1={$marginScroll.top}
        x2={$marginScroll.left}
        y2={height - $marginScroll.bottom}
        stroke="black"
        stroke-width="1"
        stroke-dasharray="2"
      />
    {/if}
    <!-- X axis -->
    <line
      in:draw={{ duration: 1000 }}
      class="axis-line"
      x1={$marginScroll.left}
      y1={height - $marginScroll.bottom}
      x2={width-$marginScroll.right}
      y2={height - $marginScroll.bottom}
      stroke="black"
      stroke-width="1"
      stroke-dasharray="2"
    />
    <!-- x-ticks -->
    {#each xScale.ticks() as tick, i}
      <g
        transform={`translate(${xScale(tick) + 0} ${
          height - $marginScroll.bottom + 10
        })`}
      >
        <text class="axis-text" y="15" text-anchor="middle">{tick}</text>
      </g>
      <!-- vertical lines -->
      {#if showY}
      <line
        in:draw={{ duration: 1000 }}
        class="axis-line"
        x1={xScale(tick + 0.5)}
        y1={$marginScroll.top}
        x2={xScale(tick + 0.5)}
        y2={height - $marginScroll.bottom}
        stroke="black"
        stroke-width="1"
        stroke-dasharray="2"
      />
      {/if}
    {/each}
    <!-- axis labels -->
    <text
      class="axis-label"
      y={height - $marginScroll.bottom / 4}
      x={(width + $marginScroll.left) / 2}
      text-anchor="middle">{xAxis}</text
    >

    <!-- data points -->
    {#each $dataset as d, i}
      {#if d.type == gearType}
        <image
          transition:slide={{ duration: 700 }}
          on:mouseover={() => {
            hoveredData = d;
          }}
          on:mouseleave={() => {
            hoveredData = false;
          }}
          on:focus={() => {
            hoveredData = d;
          }}
          on:touchstart={() => {
            hoveredData = d;
          }}
          xlink:href={d.img_url}
          width="30px"
          height="30px"
          opacity={d.opacity}
          x={xScale(d.cx)}
          y={yScale(d.cy)}
          class={showStar ? "frontier" : ""}
          transform="translate(-15,-15)"
        />
      {/if}
    {/each}
  </svg>
  {#if hoveredData}
    <Tooltip data={hoveredData} {xScale} {yScale}/>
  {/if}
</div>

<style>
  #scatter-chart {
    z-index: 0;
    width: 100%;
    max-height: 100%;
  }

  .frontier {
    filter: drop-shadow(2px 1px 0 gold)
      drop-shadow(-2px -1px 0 gold)
      brightness(110%);
  }

  line {
    stroke: #a3a3a3;
  }
</style>
