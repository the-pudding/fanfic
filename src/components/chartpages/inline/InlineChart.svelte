<script>
    import InlineChartLine from "$components/chartpages/inline/InlineChart.Line.svelte";
    import InlineChartTable from "$components/chartpages/inline/InlineChart.Table.svelte";
    import InlineChartMultiline from "$components/chartpages/inline/InlineChart.Multiline.svelte";
    import InlineChartNums from "$components/chartpages/inline/InlineChart.Nums.svelte";
    import InlineChartWaffle from "$components/chartpages/inline/InlineChart.Waffle.svelte";
    import InlineChartTreemap from "$components/chartpages/inline/InlineChart.Treemap.svelte";
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
        {#if chartType == "waffle"}
            {#if title}<ChartHeader {title}/>{/if}
            <InlineChartWaffle {id} />
        {/if}
        {#if chartType == "treemap"}
            {#if title}<ChartHeader {title}/>{/if}
            <InlineChartTreemap {id} height={400} />
            <p class="note">Note: Other includes romantic relationships including more than two partners, ungendered original characters, and when the author inserts themselves into the story (XReader).</p>
        {/if}
</div>

<style>
    .chart-wrapper {
        background: #f2f2f2;
        border-width:2px;
        border-color:var(--window-button-stroke);
        border-style:solid;
    }

    .note {
        font-family: var(--sans);
        font-size: 10px;
        font-style: italic;
        line-height: 1.25;
        color: var(--fanfic-black);
        padding: 0 1rem;
    }
</style>