<script>
	import { getContext, onMount, afterUpdate } from 'svelte';
	import * as d3 from "d3";
	import { createEventDispatcher } from 'svelte';
	import { uTooltipVisible } from "$stores/misc.js";
	import roundCounts from "$utils/roundCounts.js";

	const { data, xGet, yGet, zGet, xScale, width, height } = getContext('LayerCake');
	const dispatch = createEventDispatcher();

	function sendDataToParent(data) {
		dispatch('customEvent', {data});
	}

	// Ensure transitions apply when data changes
	function applyTransitions() {
		const rectSelection = d3.selectAll(".group-rect rect");
		if (!rectSelection.empty()) {
			rectSelection
				.data($data)
				.transition()
				.duration(1000)
				.attr("y", d => {
					const yVals = $yGet(d) || [0, 0];
					return normalizeSmallValues(yVals[1]);  // Normalize small values to 0
				})
				.attr("height", d => {
					const yVals = $yGet(d) || [0, 0];
					let yHeight = yVals[0] - yVals[1];
					return yHeight > 0 ? normalizeSmallValues(yHeight) : 0;  // Ensure height is never negative
				});
		}
	}

	function handleMouseOver(e) {
		let xPos = e.clientX;
		let yPos = e.clientY;
		let parentEl = e.currentTarget.closest('.content-wrapper');
		let rect = parentEl.getBoundingClientRect();
		let relativeX = xPos - rect.left;
		let relativeY = yPos - rect.top;
		let dataIndex = e.target.dataset.id;
		let dataGroup = e.target.classList[1].split("_")[0];
		let relType = dataGroup.substring(0, 1) + "/" + dataGroup.substring(1);
		let tooltipVisible = false;

		let noValTooltip = roundCounts($data[0][dataIndex].data[`${dataGroup}_no`], "whole");
		let semiValTooltip = roundCounts($data[0][dataIndex].data[`${dataGroup}_semi`], "whole");
		let yesValTooltip = roundCounts($data[0][dataIndex].data[`${dataGroup}_yes`], "whole");
		let yearValTooltip = $data[0][dataIndex].data['year'];

		if (yearValTooltip !== "2018") {
			uTooltipVisible.set(true)
			tooltipVisible = true;
		}

		let tooltipData = [{xPos, yPos, relType, dataGroup, noValTooltip, semiValTooltip, yesValTooltip, yearValTooltip, tooltipVisible}]
		sendDataToParent(tooltipData)

		d3.selectAll(".u-tooltip-container")
            .html(
                `<p class="year">${yearValTooltip} ${relType.toUpperCase()}</p>
				<p class="canon-block">Canon: ${roundCounts(yesValTooltip, "whole")}%</p>
				<p class="semi-block">Semi-canon: ${roundCounts(semiValTooltip, "whole")}%</p>
				<p class="noncanon-block">Non-canon: ${roundCounts(noValTooltip, "whole")}%</p>`
            )
		d3.selectAll(`.group-rect`).style("opacity", 0.5)
		d3.selectAll(`.group-rect-${yearValTooltip}`).style("opacity", 1);
	}

	function handleMouseLeave(e) {
		uTooltipVisible.set(false)
		let tooltipVisible = false;
		let tooltipData = [{tooltipVisible}]
		sendDataToParent(tooltipData)
		d3.selectAll(`.group-rect`).style("opacity", 1)
	}

	function normalizeSmallValues(value, threshold = 1e-6) {
		return Math.abs(value) < threshold ? 0 : value;
	}

	afterUpdate(() => {
		applyTransitions();
	});
 </script>

<g class="column-group"
	on:mouseover={handleMouseOver}
	on:mouseleave={handleMouseLeave}
>
	{#each $data as series, i}
	  {@const relevantData = $data[i].key}
	  {#each series as d, i}
	  {@const yVals = $yGet(d) || [0, 0]}  // Fallback to [0, 0] if yVals is undefined
	  {@const columnHeight = yVals[0] > yVals[1] ? normalizeSmallValues(yVals[0] - yVals[1]) : 0}  // Ensure height is never negative
		{#if d.data.year !== "2018"}
			<rect
			class="group-rect {relevantData} group-rect-{d.data.year}"
			data-id={i}
			x={$xGet(d)}
			y={yVals[1]}
			width={$xScale.bandwidth()}
			height={columnHeight || 0}
			fill={$zGet(series)}
			></rect>
		{:else}
 			{#if $height > 0}
				<rect
					x={$xGet(d)}
					y={0}
					width={$xScale.bandwidth()}
					height={$height}
					fill={"#d9d6d6"}
					class="disabled"
				></rect>
				<text
					x={$width/2 - $width/12}
					y={$height/2+4}
					transform="rotate(-90,{$width/2 - $width/20},{$height/2.08})"
				>
				No data collected in 2018
				</text>
			{/if}
		{/if}
	  {/each}
	{/each}
  </g>
  

<style>
	.column-group {
		cursor: pointer;
	}

	rect {
		transition: y 1s ease, height 1s ease;
	}

	.disabled {
		pointer-events: none;
	}

	text {
		font-family: var(--mono);
		text-transform: uppercase;
		text-anchor: middle;
		font-size: 12px;
		fill: var(--fanfic-black);
	}

	@media (max-width: 600px) { 
       text {
          font-size: 10px;
        }
  	}
</style>
