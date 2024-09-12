<script>
   import { onMount } from "svelte";
   import * as d3 from "d3";

   import FullChartStackedBarTable from "$components/chartpages/full/FullChart.StackedBarTable.svelte";
   import FullChartScroll from "$components/chartpages/full/FullChart.Scroll.svelte";
   import FullChartPictogram from "$components/chartpages/full/FullChart.Pictogram.svelte";
   import FullChartDemographics from "$components/chartpages/full/FullChart.Demographics.svelte";
   import FullChartNetwork from "$components/chartpages/full/FullChart.Network.svelte";
   import FullChartMultiline from "$components/chartpages/full/FullChart.Multiline.svelte";
   import FullChartTreemap from "$components/chartpages/full/FullChart.Treemap.svelte";
   import ChartHeader from "$components/chartpages/ChartHeader.svelte";

   export let chartType;
   export let id;
   export let title;
   export let chunk;
</script>

{#if chartType == "scroll"}
    <FullChartScroll {id} />
{:else if chartType == "network"}
    <FullChartNetwork {id} />
{:else if chartType == "multiline"}
    <FullChartMultiline {id} />
{:else}
    <div class="chart-wrapper">
        {#if chartType == "stackedBarTable"}
            {#if title}<ChartHeader {title} />{/if}
            <FullChartStackedBarTable {id} />
        {/if}
        {#if chartType == "pictogram"}
            {#if title}<ChartHeader {title} />{/if}
            <FullChartPictogram {id} />
        {/if}
        {#if chartType == "demographics"}
            {#if title}<ChartHeader {title} />{/if}
            <FullChartDemographics {id} />
        {/if}
        {#if chartType == "treemap"}
            {#if title}<ChartHeader {title} />{/if}
            <FullChartTreemap {id} />
        {/if}
    </div>
{/if}

<style>
    .chart-wrapper {
        background: #f2f2f2;
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
    }

    h3 {
        width: 100%;
        background: var(--fanfic-blue);
        color: var(--fanfic-highlighter);
        font-family: var(--mono);
        text-transform: uppercase;
        text-align: center;
        margin: 0;
        font-size: var(--18px);
        padding: 0.25rem 0;
    }
</style>