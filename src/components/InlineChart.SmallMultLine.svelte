<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import { LayerCake, Svg, Html } from 'layercake';
    import Line from "$components/layercake/Line.svelte";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import AxisY from "$components/layercake/AxisY.svg.svelte";

    let data;
    const xKey = "year";
    const yKeyFandoms = "uniqueFandoms";
    const yKeyShips = "uniqueShips";
    const yKeyFics = "totalFics";

    onMount(async () => {
        if (id) {
            const dataFolder = id.split("_")[0]
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
    
    export let id;
</script>

<div class="multiple-wrapper">
    <div class="chart-container">
        <h3>Unqiue fandoms</h3>
        <LayerCake
            padding={{ top: 0, right: 0, bottom: 0, left: 0 }}
            x={xKey}
            y={yKeyFandoms}
            yDomain={[0, null]}
            data={data}
        >
            <Svg>
                <AxisX gridlines={false} ticks={["2013", "2023"]}/>
                <AxisY snapBaselineLabel gridlines={true} ticks={5}/>
                <Line />
            </Svg>
        </LayerCake>
    </div>
    <div class="chart-container">
        <h3>Unqiue ships</h3>
        <LayerCake
            padding={{ top: 0, right: 0, bottom: 0, left: 0 }}
            x={xKey}
            y={yKeyShips}
            yDomain={[0, 2500]}
            data={data}
        >
            <Svg>
                <AxisX gridlines={false} ticks={["2013", "2023"]}/>
                <AxisY snapBaselineLabel gridlines={true} ticks={5}/>
                <Line />
            </Svg>
        </LayerCake>
    </div>
    <!-- <div class="chart-container">
        <h3>Total works from unqiue fandoms and ships</h3>
        <LayerCake
            padding={{ top: 0, right: 0, bottom: 0, left: 0 }}
            x={xKey}
            y={yKeyFics}
            yDomain={[0, 8000000]}
            data={data}
        >
            <Svg>
                <AxisX gridlines={false} ticks={["2013", "2023"]}/>
                <AxisY snapBaselineLabel gridlines={true} ticks={5}/>
                <Line />
            </Svg>
        </LayerCake>
    </div> -->
</div>


<style>
    .multiple-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .chart-container {
        width: calc(50% - 2rem);
        height: 300px;
    }
</style>