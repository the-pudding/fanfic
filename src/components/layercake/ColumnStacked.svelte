<script>
	import { getContext } from 'svelte';
	import { noValTooltip, semiValTooltip, yesValTooltip } from "$stores/misc.js";
	import { createEventDispatcher } from 'svelte';

	const { data, xGet, yGet, zGet, xScale } = getContext('LayerCake');
	const dispatch = createEventDispatcher();

	function sendDataToParent(data) {
		dispatch('customEvent', {data});
	}

	function handleMouseOver(e) {
		let xPos = e.clientX;
		let yPos = e.clientY;
		let dataIndex = e.target.dataset.id;
		let dataGroup = e.target.classList[1].split("_")[0];
		let relType = dataGroup.substring(0, 1) + "/" + dataGroup.substring(1);
		let tooltipVisible = true;

		let noValTooltip = Math.round($data[0][dataIndex].data[`${dataGroup}_no`]);
		let semiValTooltip = Math.round($data[0][dataIndex].data[`${dataGroup}_semi`]);
		let yesValTooltip = Math.round($data[0][dataIndex].data[`${dataGroup}_yes`]);
		let yearValTooltip = $data[0][dataIndex].data['year'];

		let tooltipData = [{xPos, yPos, relType, noValTooltip, semiValTooltip, yesValTooltip, yearValTooltip, tooltipVisible}]
		sendDataToParent(tooltipData)
	}

	function handleMouseLeave(e) {
		let tooltipVisible = false;
		let tooltipData = [{tooltipVisible}]
		sendDataToParent(tooltipData)
	}
 </script>

<g class="column-group"
	on:mouseover={handleMouseOver}
	on:mouseleave={handleMouseLeave}
>
	{#each $data as series, i}
		{@const relevantData = $data[i].key}
	  {#each series as d, i}
		{@const yVals = $yGet(d)}
		{@const columnHeight = yVals[0] - yVals[1]}
		<rect
		  class="group-rect {relevantData}"
		  data-id={i}
		  x={$xGet(d)}
		  y={yVals[1]}
		  width={$xScale.bandwidth()}
		  height={columnHeight}
		  fill={$zGet(series)}
		></rect>
	  {/each}
	{/each}
  </g>

<style>
	.column-group {
		cursor: pointer;
	}
</style>
