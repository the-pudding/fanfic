<script>
	import * as Pancake from '@sveltejs/pancake';
	import * as d3 from 'd3-hierarchy';
	import { tweened } from 'svelte/motion';
	import * as eases from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import * as yootils from 'yootils';
    import Treemap from "$components/pancake/Treemap.svelte";
	import slashData from '$data/SLASH/treemapData.js';
	import canonData from '$data/CANON/treemapData.js';

	export let id;

	let data = id == "CANON_AUtags" ? canonData : slashData;

	console.log(id, data)

	const treemap = d3.treemap();

	const hierarchy = d3.hierarchy(data)
		.sum(d => d.value)
		.sort((a, b) => b.value - a.value)

	const root = treemap(hierarchy);

	let selected = root;

	const extents = tweened(undefined, {
		easing: eases.cubicOut,
		duration: 600
	});

	$: $extents = {
		x1: selected.x0,
		x2: selected.x1,
		y1: selected.y1,
		y2: selected.y0
	};
</script>

<div class="chart">
	<Pancake.Chart x1={$extents.x1} x2={$extents.x2} y1={$extents.y1} y2={$extents.y2}>
		<Treemap {root} let:node>
				<div
					class="node"
					class:leaf={!node.children}
				>
					{#if id == "CANON_AUtags"}
						<div class="contents contents-{(node.data.setting)}">
							<strong>{node.data.name}</strong>
							<span>{yootils.commas(node.value)}</span>
						</div>
					{:else}
						<div class="contents contents-{(node.data.name).replace("/", "")}">
							<strong>{node.data.name}</strong>
							<span>{yootils.commas(node.value)}</span>
						</div>
					{/if}
				</div>
		</Treemap>
	</Pancake.Chart>
</div>

<style>
	.chart {
		width: 100%;
		height: 600px;
		padding: 1rem;
		margin: 0;
		overflow: hidden;
        background-color: white;
	}

	.node {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: visible;
		pointer-events: all;
	}

	.node:not(.leaf) {
		cursor: pointer;
	}

	.contents {
		width: 100%;
		height: 100%;
		padding: 0.3rem 0.4rem;
		border: 1px solid white;
		background-color: gray;
		color: white;
		box-sizing: border-box;
        font-family: var(--mono);
	}

    .contents-MM {
        background-color: var(--fanfic-red); 
    }

    .contents-FM {
        background-color: var(--fanfic-green); 
    }

    .contents-Gen {
        background-color: var(--fanfic-pink); 
    }

    .contents-FF {
        background-color: var(--fanfic-highlighter); 
    }

    .contents-XReader {
        background-color: gray; 
    }

    .contents-Other {
        background-color: gray; 
    }

    .contents-Original {
        background-color: gray; 
    }

    .contents-Multi {
        background-color: gray; 
    }

	.contents-mudane {
		background-color: var(--fanfic-red); 
	}

	strong, span {
		display: block;
		font-size: 12px;
		white-space: nowrap;
		line-height: 1;
	}
</style>