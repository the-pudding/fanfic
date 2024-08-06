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

<div class="chart-wrapper">
        {#if chartType == "line"}
            {#if title}<h3>{title}</h3>{/if}
            <InlineChartLine {id}/>
        {/if}
        {#if chartType == "smallmultline"}
            <InlineChartSmallMultLine {id} />
        {/if}
        {#if chartType == "nums"}
            <InlineChartNums {id} {chunk}/>
        {/if}
        {#if chartType == "table"}
            {#if title}<h3>{title}</h3>{/if}
            <InlineChartTable {id}/>
        {/if}
        {#if chartType == "multiline"}
            {#if title}<h3>{title}</h3>{/if}
            <InlineChartMultiline {id} />
        {/if}
</div>

<style>
</style>