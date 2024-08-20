<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import { LayerCake, Svg, Html } from 'layercake';
    import Line from "$components/layercake/Line.svelte";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import AxisY from "$components/layercake/AxisY.svg.svelte";
    import inView from "$actions/inView.js";

    export let id;

    // Defaults
    let data;
    let xKey = "year";
    let yKey = "yes_percent";
    let inViewTrigger = false;

    // Used to match the data to its keys
    const axisKeys = [
        {
            id: "RPF_percentRPF",
            xKey: "year",
            yKey: "yes_percent"
        },
        {
            id: "INTRO_topStats_fandoms",
            xKey: "year",
            yKey: "uniqueFandoms"
        },
        {
            id: "INTRO_topStats_ships",
            xKey: "year",
            yKey: "uniqueShips"
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
        }

        // Makes sure values are numbers
        data.forEach(d => {
            d[yKey] = +d[yKey];
            d[yKey] = +d[yKey];
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

    // Uses inView on "chart-container" and then passes this info to the Line component to draw	
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
        y={yKey}
        yDomain={[0, null]}
        data={data}
    >
        <Svg>
            <AxisX gridlines={false} />
            <AxisY snapBaselineLabel gridlines={true} {id}/>
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