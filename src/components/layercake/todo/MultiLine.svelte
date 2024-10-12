<!--
	@component
	Generates an SVG multi-series line chart. It expects your data to be an array of objects, each with a `values` key that is an array of data objects.
 -->
<script>
	import { getContext } from 'svelte';
	import { line, curveLinear, curveStep, curveStepAfter, curveStepBefore } from "d3";
	import { draw, fade } from 'svelte/transition';
	import { reducedMotion } from "$stores/reducedMotion.js";

	export let curve = curveStep;
	export let inViewTrigger; 
	export let id;
	export let scrollIndex;

	const { data, xGet, yGet, zGet, width, height } = getContext('LayerCake');

	$: path = line().x($xGet).y($yGet).curve(curve);

	function cleanText(str) {
		let cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '');
		cleanedStr = cleanedStr.replace(/\s+/g, ' ').trim();
		cleanedStr = cleanedStr.toLowerCase();
		return cleanedStr
	}
</script>

<g class="line-group">
	{#each $data as group}
		<!-- {@debug group} -->
		{#if inViewTrigger || scrollIndex == "exit"}
		<path
			in:draw={!$reducedMotion ? { duration: 1000 } : { duration: 0 }}
			class='path-line'
			id='{cleanText(group.fandom)}-path'
			d='{path(group.values)}'
			stroke="{$zGet(group)}"
		></path>
		{/if}
	{/each}
</g>
<g class="rect-overlay" class:scrollyRect={id == "RPF_topFandomsTime"}>
	<rect 
		x={$width/2 - $width/12}
		y={-4}
		width={$width/12}
		height={$height+4}
	>
	</rect>
	<text
		x={$width / 2}
		y={$height / 2}
		transform="rotate(-90, {$width / 2}, {$height / 2})"
		text-anchor="middle"
		dy={-$width/12/2 + 4}
	>
	No data collected in 2018
	</text>
</g>

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2px;
	}

	rect {
		fill: #d9d6d6;
	}

	.scrollyRect {
		opacity: 0;
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
