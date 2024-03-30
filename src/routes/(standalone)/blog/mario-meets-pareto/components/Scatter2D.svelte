<script>
    export let showY
</script>


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