<script>
	import * as Pancake from '@sveltejs/pancake';
	import * as d3 from 'd3-hierarchy';
	import { tweened } from 'svelte/motion';
	import * as eases from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import * as yootils from 'yootils';
    import Treemap from "$components/pancake/Treemap.svelte";
	import slashData from '$data/SLASH/treemapData.js';
	import demo1Data from '$data/SLASH/treemapData_demographics1.js';
	import demo2Data from '$data/SLASH/treemapData_demographics2.js';

	export let id;

	console.log(id)

	let data = id == "SLASH_AO3demographics0"
		? demo1Data 
		: id == "SLASH_AO3demographics1"
		? demo2Data 
		: slashData;

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

<div class="chart" id={id}>
	<Pancake.Chart x1={$extents.x1} x2={$extents.x2} y1={$extents.y1} y2={$extents.y2}>
		<Treemap {root} let:node>
				<div
					class="node"
					class:leaf={!node.children}
				>
					{#if id == "SLASH_AO3demographics0" || id == "SLASH_AO3demographics1"}
						<div class="contents contents-{(node.data.short)}">
							<strong>{node.data.name}</strong>
							<span>{yootils.commas(node.value)}%</span>
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
		height: 500px;
		margin: 0;
		overflow: hidden;
        background-color: white;
		padding: 1rem;
	}

	#SLASH_AO3demographics0, #SLASH_AO3demographics1 {
		padding: 0;
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
		background-color: var(--fanfic-window-gray);
		color: white;
		box-sizing: border-box;
        font-family: var(--mono);
	}

    .contents-MM, .contents-no {
        background-color: var(--fanfic-red); 
    }

    .contents-FM, .contents-yes {
        background-color: var(--fanfic-green); 
    }

    .contents-Gen, .contents-questioning {
        background-color: var(--fanfic-pink); 
    }

    .contents-FF {
        background-color: var(--fanfic-highlighter); 
    }

    .contents-XReader {
        background-color: var(--fanfic-window-gray); 
    }

    .contents-Other {
        background-color: var(--fanfic-window-gray); 
    }

    .contents-Original {
        background-color: var(--fanfic-window-gray); 
    }

    .contents-Multi {
        background-color: var(--fanfic-window-gray); 
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