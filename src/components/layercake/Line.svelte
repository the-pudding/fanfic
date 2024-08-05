<script>
	import { getContext } from "svelte";
	import { line, curveLinear, curveStep, curveStepAfter, curveStepBefore } from "d3";
	import { draw } from 'svelte/transition';

	const { data, xGet, yGet } = getContext("LayerCake");

	export let stroke = "#1B2AA6";

	export let curve = curveStep;

	$: path = line().x($xGet).y($yGet).curve(curve);
	$: pathD = path($data);
</script>

<path in:draw={{ duration: 1000 }} d={pathD} {stroke} />

<style>
	path {
		fill: none;
		stroke-width: 4;
	}
</style>
