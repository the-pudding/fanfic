<script>
	import { getContext } from "svelte";
	import { line, curveStep } from "d3";
	import { draw, fade } from 'svelte/transition';

	const { data, xGet, yGet, width, height } = getContext("LayerCake");

	export let stroke = "#1B2AA6";
	export let curve = curveStep;
	export let inViewTrigger; 

	$: path = line().x($xGet).y($yGet).curve(curve);
	$: pathD = path($data);
</script>

{#if inViewTrigger}
	<path in:draw={{ duration: 1000 }} d={pathD} {stroke} />
	<!-- <rect 
		transition:fade={{ delay: 250, duration: 300 }} 

	>
	</rect> -->
{/if}
<g class="rect-overlay">
	<rect 
		x={$width/2 - $width/20 + 10}
		y={-4}
		width={$width/10 - 20}
		height={$height+4}
	>
	</rect>
	<text
		x={$width/2 - $width/20 + 10}
		y={$height/2}
		transform="rotate(-90,{$width/2},{$height/2-4})"
	>
		Missing data
	</text>
</g>

<style>
	path {
		fill: none;
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
