<script>
	import { getContext } from "svelte";
	import { line, curveStep } from "d3";
	import { draw, fade } from 'svelte/transition';
	import { reducedMotion } from "$stores/reducedMotion.js";

	const { data, xGet, yGet, width, height } = getContext("LayerCake");

	export let stroke = "#1B2AA6";
	export let curve = curveStep;
	export let inViewTrigger; 

	$: path = line().x($xGet).y($yGet).curve(curve);
	$: pathD = path($data);
</script>

{#if inViewTrigger}
	<path in:draw={!$reducedMotion ? { duration: 1000 } : { duration: 0 }} d={pathD} {stroke} />
	<!-- <rect 
		transition:fade={{ delay: 250, duration: 300 }} 

	>
	</rect> -->
{/if}
<g class="rect-overlay">
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
	path {
		fill: none;
		stroke-width: 2px;
	}

	rect {
		fill: #d9d6d6;
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
