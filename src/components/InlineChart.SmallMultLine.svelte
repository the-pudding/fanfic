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

    let inViewTrigger = false;

    function inViewDraw() { inViewTrigger = true; }
    function exitViewDraw() { inViewTrigger = false; }
</script>

<div class="multiple-wrapper"
    use:inView
    on:enter={inViewDraw}
    on:exit={exitViewDraw}
>
    <div class="chart-container">
        <h3>Unqiue fandoms</h3>
        <div class="chart">
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
                    <Line inViewTrigger={inViewTrigger} />
                </Svg>
            </LayerCake>
        </div>
    </div>
    <div class="chart-container">
        <h3>Unqiue ships</h3>
        <div class="chart">
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
                    <Line inViewTrigger={inViewTrigger} />
                </Svg>
            </LayerCake>
        </div>
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
        padding: 2rem;
    }
    .chart-container {
        width: 50%;
        height: 400px;
        background: var(--fanfic-window-gray);
        border-width:2px;
        border-color:#FFFFFF #808080 #808080 #FFFFFF;
        border-style:solid;
    }
    .chart-container:last-of-type {
        margin: 2rem 0 0 -4rem;
    }
    .chart {
        background: white;
        width: 100%;
        height: calc(100% - 2rem);
        padding: 2rem;
    }
    h3 {
        width: 100%;
        background: var(--fanfic-blue);
        color: var(--fanfic-highlighter);
        font-family: var(--mono);
        text-transform: uppercase;
        text-align: center;
        margin: 0;
        font-size: var(--18px);
        padding: 0.25rem 0;
    }
</style>