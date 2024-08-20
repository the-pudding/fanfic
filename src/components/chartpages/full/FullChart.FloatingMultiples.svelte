<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import { LayerCake, Svg, Html } from 'layercake';
    import Line from "$components/layercake/Line.svelte";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import AxisY from "$components/layercake/AxisY.svg.svelte";
    import inView from "$actions/inView.js";

    let data;
    const xKey = "year";
    const yKeyFandoms = "uniqueFandoms";
    const yKeyShips = "uniqueShips";
    const yKeyFics = "totalFics";

    let axisKeys = [
        {
            id: "INTRO_topStats",
            xKey: "year",
            yKey: "uniqueFandoms"
        }
    ];

    onMount(async () => {
        if (id) {
            const dataFolder = id.split("_")[0];
            const dataPath = `./assets/data/${dataFolder}/${id}.csv`
            data = await d3.csv(dataPath);
        }

        data.forEach(d => {
            d[xKey] = +d[xKey];
            d[yKeyFandoms] = +d[yKeyFandoms];
            d[yKeyShips] = +d[yKeyShips];
            d[yKeyFics] = +d[yKeyFics];
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
    
    export let id;

    let inViewTrigger = false;

    function inViewDraw() { inViewTrigger = true; }
    function exitViewDraw() { inViewTrigger = false; }
</script>

<div class="chart-container"
    use:inView
    on:enter={inViewDraw}
    on:exit={exitViewDraw}
>
    <LayerCake
        padding={{ top: 0, right: 0, bottom: 0, left: 0 }}
        x={xKey}
        y={yKeyFandoms}
        yDomain={[0, null]}
        data={data}
    >
        <Svg>
            <AxisX gridlines={false} />
            <AxisY snapBaselineLabel gridlines={true}/>
            <Line inViewTrigger={inViewTrigger} />
        </Svg>
    </LayerCake>
</div>
<div class="chart-container"
    use:inView
    on:enter={inViewDraw}
    on:exit={exitViewDraw}
>
    <LayerCake
        padding={{ top: 0, right: 0, bottom: 0, left: 0 }}
        x={xKey}
        y={yKeyShips}
        yDomain={[0, null]}
        data={data}
    >
        <Svg>
            <AxisX gridlines={false} />
            <AxisY snapBaselineLabel gridlines={true}/>
            <Line inViewTrigger={inViewTrigger} />
        </Svg>
    </LayerCake>
</div>


<style>
    .chart-container {
        width: 100%;
        height: 400px;
        background: var(--color-white);
        padding: 2rem;
    }
</style>