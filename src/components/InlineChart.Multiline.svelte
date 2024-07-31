
<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import { LayerCake, Svg, groupLonger, flatten } from 'layercake';
    import MultiLine from "$components/layercake/todo/MultiLine.svelte";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import AxisY from "$components/layercake/AxisY.svg.svelte";

    export let id;

    const xKey = 'year';
    const yKey = 'fanfics';
    const zKey = 'fandom';

    let data;
    let seriesNames;
    let groupedData;

    const seriesColors = ['#cccccc'];

    onMount(async () => {
        if (id) {
            const dataPath = `./src/data/RPF/${id}.csv`
            data = await d3.csv(dataPath);
            seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
        }

        data.forEach(d => {
            seriesNames.forEach(name => {
            d[name] = +d[name];
            });
        });

        groupedData = groupLonger(data, seriesNames, {
            groupTo: zKey,
            valueTo: yKey
        });
	});
</script>

<div class="chart-container">
    {#if groupedData}
        <LayerCake
            padding={{ top: 7, right: 10, bottom: 20, left: 25 }}
            x={xKey}
            y={yKey}
            z={zKey}
            yDomain={[0, null]}
            zScale={d3.scaleOrdinal()}
            zRange={seriesColors}
            flatData={flatten(groupedData, 'values')}
            data={groupedData}
        >
            <Svg>
            <AxisX
                gridlines={false}
                ticks={data.map(d => d[xKey]).sort((a, b) => a - b)}
                snapLabels
            />
            <AxisY ticks={4} />
            <MultiLine />
            </Svg>
        </LayerCake>
    {/if}
</div>

<style>
  /*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
  .chart-container {
    width: 100%;
    height: 400px;
  }
  </style>