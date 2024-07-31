<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import { LayerCake, Svg, flatten } from 'layercake';
    import MultiLine from "$components/layercake/todo/MultiLine.svelte";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import AxisY from "$components/layercake/AxisY.svg.svelte";

    let data;
    let dataLong;
    let seriesNames;

    const xKey = "year";
    const yKey = "fics";
    const zKey = "fandom";
    const seriesColors = ["#cccccc", "#cccccc"];
    const parseDate = d3.timeParse('%Y');
    const formatTick = d3.timeFormat('%Y');
    

    onMount(async () => {
        if (id) {
            console.log(id)
            const dataPath = `./src/data/RPF/${id}.csv`
            data = await d3.csv(dataPath);
            
            seriesNames = Object.keys(data[0]).filter(d => d !== xKey);

            dataLong = seriesNames.map(key => {
                return {
                    [zKey]: key,
                    values: data.map(d => {
                        // Put this in a conditional so that we don't recast the data on second render
                        d[xKey] = typeof d[xKey] === 'string' ? parseDate(d[xKey]) : d[xKey];
                        return {
                            [yKey]: +d[key],
                            [xKey]: d[xKey]
                        };
                    })
                };
            });
        }
	});
    
    export let id;
</script>

<figure>
    {#if dataLong}
        <LayerCake
        ssr
        percentRange
        padding={{ top: 0, right: 0, bottom: 0, left: 0 }}
        x={xKey}
        y={yKey}
        z={zKey}
        yDomain={[0, null]}
        zScale={d3.scaleOrdinal()}
        zDomain={seriesNames}
        zRange={seriesColors}
        flatData={flatten(dataLong, 'values')}
        data={dataLong}
    >

        <Svg>
            <AxisX gridlines={false}
                ticks={data.map(d => d[xKey]).sort((a, b) => a - b)}
                formatTick={formatTick}
                snapLabels />
            <AxisY gridlines={true}/>
            <MultiLine />
        </Svg>
    </LayerCake>
    {/if}
</figure>

<style>
    figure {
        width: 100%;
        height: 400px;
        padding: 0; 
    }
</style>