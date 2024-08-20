<!--
	@component
	Generates an SVG multi-series line chart. It expects your data to be an array of objects, each with a `values` key that is an array of data objects.
 -->
<script>
	import { getContext } from 'svelte';
	import { line, curveLinear, curveStep, curveStepAfter, curveStepBefore } from "d3";
	import { draw } from 'svelte/transition';

	export let curve = curveStep;
	export let inViewTrigger; 

	const { data, xGet, yGet, zGet } = getContext('LayerCake');

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

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2px;
	}
</style>
