<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import InlineChartLine from "$components/InlineChart.Line.svelte";
    import InlineChartSmallMultLine from "$components/InlineChart.SmallMultLine.svelte";
    import InlineChartTable from "$components/InlineChart.Table.svelte";
    import InlineChartMultiline from "$components/InlineChart.Multiline.svelte";
    import InlineChartNums from "$components/InlineChart.Nums.svelte";
    
    export let chartType;
    export let id;
    export let title;
    export let chunk;
</script>

{#if chartType == "smallmultline"}
    <InlineChartSmallMultLine {id} />
{:else if chartType == "nums"}
    <InlineChartNums {id} {chunk}/>
{:else}
<div class="chart-wrapper">
        {#if chartType == "line"}
            {#if title}<h3>{title}</h3>{/if}
            <InlineChartLine {id}/>
        {/if}
        {#if chartType == "table"}
            {#if title}<h3>{title}</h3>{/if}
            <InlineChartTable {id}/>
        {/if}
        {#if chartType == "multiline"}
            {#if title}<h3>{title}</h3>{/if}
            <InlineChartMultiline {id} />
        {/if}
        {#if chartType == "stackedBarTable"}
            {#if title}<h3>{title}</h3>{/if}
            <InlineChartStackedBarTable {id} />
        {/if}
</div>
{/if}

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