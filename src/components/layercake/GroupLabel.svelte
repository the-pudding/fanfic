<!--
  @component
  Generates HTML text labels for a nested data structure. It places the label near the y-value of the highest x-valued data point. This is useful for labeling the final point in a multi-series line chart, for example. It expects your data to be an array of objects where each has `values` field that is an array of data objects. It uses the `z` field accessor to pull the text label.
 -->
 <script>
	import { getContext } from 'svelte';
	import { max } from 'd3-array';
  
	const { data, x, y, xScale, yScale, xRange, yRange, z } = getContext('LayerCake');
  
	/* --------------------------------------------
	 * Title case the first letter
	 */
  
	/* --------------------------------------------
	 * Put the label on the highest value
	 */

    export let zRange;

	$: left = values => $xScale(max(values, $x)) / Math.max(...$xRange);
    $: top = function(values) {
        const lastVal = values[values.length -1].canon_status;
        const top = ($yScale(lastVal) / Math.max(...$yRange)) - 0.025;
        return top;
    }

    function setLabel(string) {
        if (string == "no_percent") { return "Non-Canon"}
        else if (string == "semi_percent") { return "Semi-Canon"}
        else if (string == "yes_percent") { return "Canon"}
    }
	// $: top = values => $yScale(values.length) / Math.max(...$yRange);
  </script>
  
  {#each $data as group,i}
	<div
	  class="label"
	  style="
		top:{top(group.values) * 100}%;
		left:{left(group.values) * 100}%;
        color:{zRange[i]};
	  "
	>
	  {setLabel($z(group))}
	</div>
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