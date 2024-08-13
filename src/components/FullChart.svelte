<script>
   import { onMount } from "svelte";
   import * as d3 from "d3";

   import FullChartStackedBarTable from "$components/FullChart.StackedBarTable.svelte";
   import FullChartScroll from "$components/FullChart.Scroll.svelte";

   export let chartType;
   export let id;
   export let title;
   export let chunk;
</script>

<div class="chart-wrapper">
    {#if chartType == "stackedBarTable"}
        {#if title}<h3>{title}</h3>{/if}
        <FullChartStackedBarTable {id} />
    {/if}
    {#if chartType == "scroll"}
        {#if title}<h3>{title}</h3>{/if}
        <FullChartScroll {id} />
    {/if}
</div>