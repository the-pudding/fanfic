<!--
	@component
	Generates an SVG multi-series line chart. It expects your data to be an array of objects, each with a `values` key that is an array of data objects.
 -->
<script>
	import { getContext } from 'svelte';
	import { line, curveLinear, curveStep, curveStepAfter, curveStepBefore } from "d3";
	import { draw, fade } from 'svelte/transition';

	export let curve = curveStep;
	export let inViewTrigger; 

	const { data, xGet, yGet, zGet, width, height } = getContext('LayerCake');

	$: path = line().x($xGet).y($yGet).curve(curve);
</script>

<g class="line-group">
	{#each $data as group}
		{#if inViewTrigger}
		<path
			in:draw={{ duration: 1000 }}
			class='path-line'
			d='{path(group.values)}'
			stroke="{$zGet(group)}"
		></path>
		{/if}
	{/each}
</g>
<g class="rect-overlay">
	<rect 
		x={$width/2 - $width/20}
		width={$width/10}
		height={$height}
	>
	</rect>
	<text
		x={$width/2 - $width/20 + 20}
		y={$height/2}
		transform="rotate(-90,{$width/2},{$height/2-4})"
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
		fill: #e9e5ed;
	}

	text {
		font-family: var(--mono);
		text-transform: uppercase;
		text-anchor: middle;
		font-size: 12px;
		fill: var(--fanfic-black);
	}
</style>
