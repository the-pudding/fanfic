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
		const rectSelection = d3.selectAll("rect"); // Select all rects
		if (!rectSelection.empty()) {
		// Use D3's .data() to bind the data to rect elements if not already done
		rectSelection
			.data($data) // Bind the data (ensure this is the correct data structure)
			.transition() // Start transition
			.duration(1000)
			.attr("y", d => {
				const yVals = $yGet(d); // Extract the y values from your nested data
				if (yVals && yVals[1] !== undefined) {
					return yVals[1]; // Use the second y-value from your data
				} else {
					return 0; // Fallback value if y is undefined
				}
				})
				.attr("height", d => {
				const yVals = $yGet(d); // Extract the y values from your nested data
				if (yVals && yVals.length === 2) {
					return yVals[0] - yVals[1]; // Calculate the height based on the two y-values
				} else {
					return 0; // Fallback value if height is undefined
				}
			})
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
		{@const yVals = $yGet(d)}
		{@const columnHeight = yVals[0] - yVals[1]}
		{#if d.data.year !== "2018"}
			<rect
			class="group-rect {relevantData} group-rect-{d.data.year}"
			data-id={i}
			x={$xGet(d)}
			y={yVals[1]}
			width={$xScale.bandwidth()}
			height={columnHeight}
			fill={$zGet(series)}
			></rect>
		{:else}
			<rect
				x={$xGet(d)}
				y={0}
				width={$xScale.bandwidth()}
				height={$height}
				fill={"#d9d6d6"}
				class="disabled"
			></rect>
			<text
				x={$width/2}
				y={$height/2}
				transform="rotate(-90,{$width/2},{$height/2-4})"
				class="disabled"
			>
			No data collected in 2018
			</text>
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
