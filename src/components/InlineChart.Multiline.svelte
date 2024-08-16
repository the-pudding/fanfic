
<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import { LayerCake, Svg, groupLonger, flatten, Html } from 'layercake';
    import MultiLine from "$components/layercake/todo/MultiLine.svelte";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import AxisY from "$components/layercake/AxisY.svg.svelte";
    import GroupLabel from "$components/layercake/GroupLabel.svelte";
    import inView from "$actions/inView.js";

    export let id;

    let data;
    let xKey = 'year';
    let yKey = 'fanfics';
    let zKey = 'fandom';

    let axisKeys = [
        {
            id: "CANON_percentCanon",
            xKey: "year",
            yKey: "canon_status",
        },
        {
            id: "RPF_topFandomsTime",
            xKey: "year",
            yKey: "fanfics"
        }
    ];

    let seriesNames;
    let groupedData;

    const seriesColors = id == "CANON_percentCanon"
        ? ['#1B2AA6', '#119C72', '#D03200']
        : ['#1B2AA6', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#119C72'];

    onMount(async () => {
        if (id) {
            const dataFolder = id.split("_")[0];
            const dataPath = `./assets/data/${dataFolder}/${id}.csv`
            data = await d3.csv(dataPath);
            xKey = findKeyMatch(id, "x");
            yKey = findKeyMatch(id, "y");
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

    function findKeyMatch(id, axis) {
        if (axis == "x") {
            let match = axisKeys.find(element => element.id === id).xKey;
            return match
        } else if (axis == "y") {
            let match = axisKeys.find(element => element.id === id).yKey;
            return match
        }
    }

    let inViewTrigger = false;

    function inViewDraw() { inViewTrigger = true; }
    function exitViewDraw() { inViewTrigger = false; }
</script>

<div class="chart-container"
    use:inView
    on:enter={inViewDraw}
    on:exit={exitViewDraw}
>
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
                <AxisY ticks={4} {id} />
                <MultiLine inViewTrigger={inViewTrigger} />
            </Svg>
            <Html>
                <GroupLabel {id} zRange={seriesColors} inViewTrigger={inViewTrigger} />
            </Html>
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
    background: var(--color-white);
    padding: 2rem;
  }
  </style>