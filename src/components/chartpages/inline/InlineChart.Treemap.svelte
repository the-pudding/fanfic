<script>
	import * as Pancake from '@sveltejs/pancake';
	import * as d3 from "d3";
	import { tweened } from 'svelte/motion';
	import * as eases from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import * as yootils from 'yootils';
    import Treemap from "$components/pancake/Treemap.svelte";
	import slashData from '$data/SLASH/treemapData.js';
	import demo1Data from '$data/SLASH/treemapData_demographics1.js';
	import demo2Data from '$data/SLASH/treemapData_demographics2.js';
	import BTSdata from '$data/RPF/treemapData_BTS.js';
	import YTdata from '$data/RPF/treemapData_YT.js';
	import Icon from "$components/helpers/Icon.svelte";
	

	export let id;
	export let height;

	let data;
	let innerWidth;
	let innerHeight;
	
	if (id == "SLASH_AO3demographics0") { data = demo1Data } 
	else if (id == "SLASH_AO3demographics1") { data = demo2Data } 
	else if (id == "RPF_relTypeByFandom0") { data = BTSdata } 
	else if (id == "RPF_relTypeByFandom1") { data = YTdata } 
	else { data = slashData } 

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

	let tooltipVisible = true;

	function handleMouseOver(e) {
		const mouseX = e.clientX;
  		const mouseY = e.clientY;
		const parentEl = e.currentTarget.closest('.chart');
		const rect = parentEl.getBoundingClientRect();
		const relativeX = mouseX - rect.left;
		const relativeY = mouseY - rect.top;

		const relType = this.children[0].className.split(" ")[1].split("-")[1];
		const percent = this.children[0].children[0].children[0].textContent;
		tooltipVisible = true;
		const tooltip = d3.selectAll("#tree-tooltip");
		tooltip.style("top", `${relativeY}px`).style("left", `${relativeX}px`);

		if (relType == "MM") {
			tooltip.select("p").text("Slash: Same gender relationships between men")
		} else if (relType == "FF") {
			tooltip.select("p").text("Femslash: Same gender relationships between women")
		} else if (relType == "FM") {
			tooltip.select("p").text("Heterosexual relationships")
		} else if (relType == "Gen") {
			tooltip.select("p").text("Friendships (donated by &)")
		} else if (relType == "Other") {
			tooltip.select("p").text("Other relationships, including more than two partners, original characters, and XReader")
		}
	}

	function handleMouseLeave() {
		tooltipVisible = false;
	}
</script>

<svelte:window bind:innerWidth={innerWidth} bind:innerHeight={innerHeight} />

<div class="chart" id={id} style="max-height: {height}px">
	<!-- <div id="tree-tooltip"
		style="opacity: {tooltipVisible ? 1 : 0};">
		<span><Icon name="info" /></span>
		<p></p>
	</div> -->
	<Pancake.Chart x1={$extents.x1} x2={$extents.x2} y1={$extents.y1} y2={$extents.y2}>
		<Treemap {root} let:node>
				<div
					class="node"
					class:leaf={!node.children}
				>
					{#if id == "SLASH_AO3demographics0" || id == "SLASH_AO3demographics1"}
						<div class="contents contents-{(node.data.short)}">
							<p>{node.data.name} <span>{Math.round(yootils.commas(node.value))}%</span></p>
						</div>
					{:else }
						<div class="contents contents-{(node.data.name).replace("/", "")}">
							<p>{node.data.name} <span>{Math.round(yootils.commas(node.value))}%</span></p>
						</div>
					{/if}
				</div>
		</Treemap>
	</Pancake.Chart>
</div>

<style>
	#tree-tooltip {
		position: absolute;
		border: 1px solid var(--fanfic-black);
		background: white;
		z-index: 1000;
		color: var(--fanfic-black);
		font-family: var(--mono);
		font-size: var(--12px);
		padding: 0.5rem;
		max-width: 240px;
		min-width: 160px;
		pointer-events: none;
	}
	#tree-tooltip p, #tree-tooltip span {
		display: inline;
	}
	#tree-tooltip span {
		position: relative;
		top: 1px;
	}
	.chart {
		width: calc(100% - 2rem);
		margin: 1rem auto 1rem auto;
		aspect-ratio: 1;
        background-color: #f2f2f2;
		padding: 1rem;
		border: 2px solid;
		border-color: var(--window-inset-stroke);
		position: relative;
	}
	#RPF_relTypeByFandom0, #RPF_relTypeByFandom1 {
		border: 0;
		margin: 0 auto;
	}

	#SLASH_AO3demographics0, #SLASH_AO3demographics1, #RPF_relTypeByFandom0, #RPF_relTypeByFandom1 {
		padding: 0rem;
	}

	.node {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: visible;
		pointer-events: all;
		border: 1px solid #f2f2f2;
		/* cursor: pointer; */
	}

	.node:hover {
		/* border: 3px solid var(--fanfic-black); */
	}

	.node:not(.leaf) {
		cursor: pointer;
	}

	.contents {
		width: 100%;
		height: 100%;
		padding: 0.3rem 0.4rem;
		background-color: var(--fanfic-window-gray); 
		color: var(--fanfic-black);
        font-family: var(--mono);
	}

    .contents-MM, .contents-no {
        background-color: var(--fanfic-blue); 
		color: white;
    }

    .contents-FM, .contents-yes {
        background-color: var(--fanfic-green); 
		color: white;
    }

    .contents-Gen  {
        background-color: #96AC0B; 
		color: white;
    }

    .contents-FF, .contents-questioning {
        background-color: var(--fanfic-red); 
		color: white;
    }

    .contents-XReader {
        background-color: var(--fanfic-black); 
		color: white;
    }

    .contents-Other {
        background-color: var(--fanfic-window-gray); 
		color: var(--fanfic-black);
    }

    .contents-Original {
        background-color: var(--fanfic-window-gray); 
		color: var(--fanfic-black);
    }

    .contents-Multi {
        background-color: var(--fanfic-window-gray);
		color: var(--fanfic-black); 
    }

	.contents-nr{
        background-color: var(--fanfic-window-gray); 
    }

	p, span {
		font-size: 12px;
		line-height: 1;
		margin: 0;
		font-weight: 500;
	}

	p {
		font-weight: 700;
	}

	@media (max-width: 600px) {
		p, span {
			font-size: 10px;
		}
	}
</style>