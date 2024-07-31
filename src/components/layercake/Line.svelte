<script>
	import { getContext } from "svelte";
	import { line, curveLinear, curveStep, curveStepAfter, curveStepBefore } from "d3";

	const { data, xGet, yGet } = getContext("LayerCake");

	export let stroke = "#1B2AA6";

	export let curve = curveStep;

	$: path = line().x($xGet).y($yGet).curve(curve);
	$: pathD = path($data);
</script>

<path d={pathD} {stroke} />

<style>
	path {
		fill: none;
		stroke-width: 4;
	}
</style>
