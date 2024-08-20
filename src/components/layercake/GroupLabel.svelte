<!--
  @component
  Generates HTML text labels for a nested data structure. It places the label near the y-value of the highest x-valued data point. This is useful for labeling the final point in a multi-series line chart, for example. It expects your data to be an array of objects where each has `values` field that is an array of data objects. It uses the `z` field accessor to pull the text label.
 -->
<script>
	import { getContext } from 'svelte';
	import { max } from 'd3-array';
  import { fade } from 'svelte/transition'; 
  
	const { data, x, y, xScale, yScale, xRange, yRange, z } = getContext('LayerCake');
  
  export let zRange;
  export let id;
  export let inViewTrigger;

	$: left = values => $xScale(max(values, $x)) / Math.max(...$xRange);
  $: top = function(values) {
      const lastVal = id == "CANON_percentCanon"
        ? values[values.length -1].canon_status
        : values[values.length -1].fanfics;
      const top = ($yScale(lastVal) / Math.max(...$yRange)) - 0.025;
      return top;
  }

  function setLabel(string) {
      if (string == "no_percent") { return "Non-Canon"}
      else if (string == "semi_percent") { return "Semi-Canon"}
      else if (string == "yes_percent") { return "Canon"}
      else {
        return string
      }
  }

  function setColors(id, i, group) {
    if (id == "CANON_percentCanon") {
      return zRange[i]
    } else if (group.fandom == "BTS") {
      return "#1B2AA6"
    } else if (group.fandom == "Youtube") {
      return "#119C72"
    } else {
      return "#cccccc"
    }
  }
</script>
  
{#each $data as group,i}
  {#if inViewTrigger && id == "CANON_percentCanon" || group.fandom == "BTS" || group.fandom == "Youtube"}
      <div
        transition:fade={{ delay: 750, duration: 250 }}
        class="label"
        style="
        top:{top(group.values) * 100}%;
        left:{left(group.values) * 100}%;
        color:{setColors(id, i, group)};
        "
      >
        {setLabel($z(group))}
      </div>
    <!-- {/if} -->
  {/if}
{/each}
  
<style>
  .label {
      position: absolute;
      transform: translate(-100%, -100%) translateY(1px);
      font-size: 13px;
      color: var(--fanfic-black);
      font-weight: 700;
      font-family: var(--mono);
      text-transform: uppercase;
      width: 5rem;
      text-align: right;
  }
</style>