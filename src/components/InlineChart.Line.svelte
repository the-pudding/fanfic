<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import { LayerCake, Svg, Html } from 'layercake';
    import Line from "$components/layercake/Line.svelte";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import AxisY from "$components/layercake/AxisY.svg.svelte";

    export let inview;

    let data;
    let xKey = "year";
    let yKey = "yes_percent";

    let axisKeys = [
        {
            id: "RPF_percentRPF",
            xKey: "year",
            yKey: "yes_percent"
        },
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
            xKey = findKeyMatch(id, "x");
            yKey = findKeyMatch(id, "y");
        }

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
    
    export let id;
</script>

<div class="chart-container">
    <LayerCake
        padding={{ top: 0, right: 0, bottom: 0, left: 0 }}
        x={xKey}
        y={yKey}
        yDomain={[0, null]}
        data={data}
    >
        <Svg>
            <AxisX gridlines={false} />
            <AxisY snapBaselineLabel gridlines={true}/>
            <Line />
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