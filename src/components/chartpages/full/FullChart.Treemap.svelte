<script>
    import { onMount } from "svelte";
    import * as Pancake from '@sveltejs/pancake';
	import * as d3 from 'd3-hierarchy';
	import { tweened } from 'svelte/motion';
	import * as eases from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import * as yootils from 'yootils';
    import Treemap from "$components/pancake/Treemap.svelte";
    import dataBTS from "$data/RPF/treemapData_BTS.js";
    import dataYT from "$data/RPF/treemapData_YT.js";
    import InlineChartTreemap from "$components/chartpages/inline/InlineChart.Treemap.svelte";
    
    export let id;

    const treemapArray = [0, 1];
</script>

<div class="chart-container"> 
    <div class="treemap-wrapper">
        {#each treemapArray as treemap, i}
            {@const treeId = id + i}
            {@const hed = i == 0 ? "BTS" : "YouTube RPF"}
            <div class="treemap-inner">
                <h5>{hed}</h5>
                <InlineChartTreemap id={treeId} height={300} />
            </div>
        {/each}
    </div>
    <p class="note">Note: Other includes romantic relationships including more than two partners or undgendered original characters.</p>
</div>


<style>
    .chart-container {
        width: calc(100% - 2rem);
        margin: 1rem auto 2rem auto;
        background: #f2f2f2;
        padding: 0;
        display: flex;
        flex-direction: column;
    }

    .treemap-wrapper {
		width: 100%;
		margin: 0;
        display: flex;
        flex-direction: row;
		overflow: hidden;
        background-color: #f2f2f2;
        gap: 1rem;
	}

    .treemap-inner {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        border: 2px solid;
        border-color: var(--window-inset-stroke);
        padding: 1rem 0;
    }

    :global(.treemap-inner .chart) {
        border: none;
        width: 100%;
        margin: 0;
    }

    h5 {
        text-align: center;
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--18px);
        margin: 0 0 0.5rem 0;
        padding: 0;
    }

    .note {
        font-family: var(--sans);
        font-size: 10px;
        font-style: italic;
        line-height: 1.25;
    }

    @media (max-width: 600px) {
        .treemap-wrapper {
            flex-direction: column;
        }
    }
</style>