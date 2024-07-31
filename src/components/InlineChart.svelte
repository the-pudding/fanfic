<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import InlineChartLine from "$components/InlineChart.Line.svelte";
    import InlineChartTable from "$components/InlineChart.Table.svelte";
    import InlineChartMultiline from "$components/InlineChart.Multiline.svelte";
    
    export let chartType;
    export let id;
    export let title;
</script>

<div class="chart-wrapper">
    {#if title}
        <h3>{title}</h3>
    {/if}
        {#if chartType == "line"}
            <InlineChartLine {id}/>
        {/if}
        {#if chartType == "table"}
            <InlineChartTable {id}/>
        {/if}
        {#if chartType == "multiline"}
            <InlineChartMultiline {id}/>
        {/if}
</div>

<style>
</style>