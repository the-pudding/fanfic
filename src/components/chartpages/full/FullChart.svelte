<script>
   import { onMount } from "svelte";
   import * as d3 from "d3";

   import FullChartStackedBarTable from "$components/chartpages/full/FullChart.StackedBarTable.svelte";
   import FullChartScroll from "$components/chartpages/full/FullChart.Scroll.svelte";
   import FullChartPictogram from "$components/chartpages/full/FullChart.Pictogram.svelte";
   import ChartHeader from "$components/chartpages/ChartHeader.svelte";

   export let chartType;
   export let id;
   export let title;
   export let chunk;
</script>

<div class="chart-wrapper">
    {#if chartType == "stackedBarTable"}
        {#if title}<ChartHeader {title} />{/if}
        <FullChartStackedBarTable {id} />
    {/if}
    {#if chartType == "scroll"}
        {#if title}<ChartHeader {title} />{/if}
        <FullChartScroll {id} />
    {/if}
    {#if chartType == "pictogram"}
        {#if title}<ChartHeader {title} />{/if}
        <FullChartPictogram {id} />
    {/if}
</div>

<style>
    .chart-wrapper {
        background: var(--fanfic-window-gray);
        border-width:2px;
        border-color:#FFFFFF #808080 #808080 #FFFFFF;
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