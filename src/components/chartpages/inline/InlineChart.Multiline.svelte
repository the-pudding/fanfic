
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

    // Defaults
    let data;
    let xKey = 'year';
    let yKey = 'fanfics';
    let zKey = 'fandom';
    let seriesNames;
    let groupedData;
    let inViewTrigger = false;
    $: innerWidth = 0;
    $: ticks = innerWidth < 600 || innerWidth == undefined
        ? ["2013", "2024"] :
        innerWidth < 1000 || innerWidth == undefined
        ? ["2013", "2015", "2017", "2019", "2021", "2023"]
        : ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];

    const seriesColors = id == "CANON_percentCanon"
        ? ['#1B2AA6', '#0F8662', '#D03200']
        : ['#1B2AA6', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#0F8662'];

    // Used to match the data to its keys
    const axisKeys = [
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
    
    // Dynamically loads the data based on the id
    onMount(async () => {
        if (id) {
            const dataFolder = id.split("_")[0];
            const dataPath = `./assets/data/${dataFolder}/${id}.csv`
            data = await d3.csv(dataPath);
            // Finds matching keys
            xKey = findKeyMatch(id, "x");
            yKey = findKeyMatch(id, "y");
            seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
        }

        // Makes sure values are numbers
        data.forEach(d => {
            seriesNames.forEach(name => {
            d[name] = +d[name];
            });
        });

        // Groups the data as needed for layercake
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

    // Uses inView on "chart-container" and then passes this info to the MultiLine component to draw	
    function inViewDraw() { inViewTrigger = true; }
    function exitViewDraw() { inViewTrigger = false; }
</script>

<svelte:window bind:innerWidth />

<div class="chart-container"
    use:inView
    on:enter={inViewDraw}
    on:exit={exitViewDraw}
>
    {#if groupedData}
        <LayerCake
            padding={{ top: 16, right: 16, bottom: 32, left: 16 }}
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
                    ticks={ticks}
                    snapLabels
                />
                <AxisY ticks={4} {id} />
                <MultiLine inViewTrigger={inViewTrigger} />
            </Svg>
            <Html>
                <GroupLabel {id} zRange={seriesColors} inViewTrigger={inViewTrigger} delay={750} />
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
    width: calc(100% - 2rem);
    height: 400px;
    margin: 1rem auto 2rem auto;
    background: #f2f2f2;
    padding: 1rem;
    border: 2px solid;
    border-color: var(--window-inset-stroke);
  }
  </style>