<script>
    import InlineChartLine from "$components/chartpages/inline/InlineChart.Line.svelte";
    import InlineChartTable from "$components/chartpages/inline/InlineChart.Table.svelte";
    import InlineChartMultiline from "$components/chartpages/inline/InlineChart.Multiline.svelte";
    import InlineChartNums from "$components/chartpages/inline/InlineChart.Nums.svelte";
    import ChartHeader from "$components/chartpages/ChartHeader.svelte";
    
    // These are things that get passed into this component
    export let chartType;
    export let id;
    export let title;
    export let chunk;
</script>

<!-- Changes the type of chart depending on the chartType -->
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
</div>

<style>
    .chart-wrapper {
        background: var(--fanfic-window-gray);
        border-width:2px;
        border-color:#FFFFFF #808080 #808080 #FFFFFF;
        border-style:solid;
    }
</style>