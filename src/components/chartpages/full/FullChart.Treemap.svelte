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
            {@const hed = i == 0 ? "BTS" : "YouTube"}
            <div class="treemap-inner">
                <h3>{hed}</h3>
                <InlineChartTreemap id={treeId} />
            </div>
        {/each}
    </div>
</div>


<style>
    .chart-container {
        width: calc(100% - 2rem);
        margin: 1rem auto 2rem auto;
        background: #f2f2f2;
        padding: 0;
        border: 2px solid;
        border-color: var(--window-inset-stroke);
    }

    .treemap-wrapper {
		width: 100%;
		height: 500px;
		margin: 0;
        display: flex;
        flex-direction: row;
		overflow: hidden;
        background-color: #f2f2f2;
		padding: 1rem;
        gap: 2rem;
	}

    .treemap-inner {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
    }

    h3 {
        text-align: center;
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--18px);
        margin: 0 0 0.5rem 0;
        padding: 0;
    }
</style>