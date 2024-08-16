<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import InlineChartLine from "$components/InlineChart.Line.svelte";
    import InlineChartSmallMultLine from "$components/InlineChart.SmallMultLine.svelte";
    import InlineChartTable from "$components/InlineChart.Table.svelte";
    import InlineChartMultiline from "$components/InlineChart.Multiline.svelte";
    import InlineChartNums from "$components/InlineChart.Nums.svelte";
    import ChartHeader from "$components/ChartHeader.svelte";
    
    export let chartType;
    export let id;
    export let title;
    export let chunk;
</script>

<div class="chart-wrapper">
        {#if chartType == "nums"}
            {#if title}<ChartHeader {title}/>{/if}
            <InlineChartNums {id} {chunk}/>
        {/if}
        {#if chartType == "line"}
            {#if title}<ChartHeader {title}/>{/if}
            <InlineChartLine {id}/>
        {/if}
        {#if chartType == "table"}
            {#if title}<ChartHeader {title}/>{/if}
            <InlineChartTable {id}/>
        {/if}
        {#if chartType == "multiline"}
            {#if title}<ChartHeader {title}/>{/if}
            <InlineChartMultiline {id} />
        {/if}
        {#if chartType == "stackedBarTable"}
            {#if title}<ChartHeader {title}/>{/if}
            <InlineChartStackedBarTable {id} />
        {/if}
</div>

<style>
    .chart-wrapper {
        background: var(--fanfic-window-gray);
        border-width:2px;
        border-color:#FFFFFF #808080 #808080 #FFFFFF;
        border-style:solid;
    }
</style>