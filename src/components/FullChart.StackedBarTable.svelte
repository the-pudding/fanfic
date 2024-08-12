
<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import { LayerCake, Svg, flatten, stack } from 'layercake';
    import ColumnStacked from "$components/layercake/ColumnStacked.svelte";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import AxisY from "$components/layercake/AxisY.svg.svelte";

    import data from "$data/CANON/CANON_percentRelType.csv";
    import tableData from "$data/CANON/CANON_topShipRelType.csv";

    const format = d3.format(",");

    function filterData(data, starter) {
        const mmProps = {};
        const filteredData = data.map(d => {
            const mmProps = {};
            for (let key in d) {
                if (key.startsWith(starter) || key == "year") {
                    mmProps[key] = d[key];
                }
            }
            return mmProps;
        })
        return filteredData;
    }

    const mmData = filterData(data, "mm");
    const ffData = filterData(data, "ff");
    const fmData = filterData(data, "fm");
    
    const xKey = "year";
    const yKey = [0,1];
    const zKey = "key";

    const mmSeriesNames = Object.keys(mmData[0]).filter(d => d !== xKey);
    const ffSeriesNames = Object.keys(ffData[0]).filter(d => d !== xKey);
    const fmSeriesNames = Object.keys(fmData[0]).filter(d => d !== xKey);
    const seriesColors = ['#C7FF25', '#cccccc', '#FFACBD'];


    mmData.forEach(d => {
        mmSeriesNames.forEach(name => {
        d[name] = +d[name];
        });
    });
    ffData.forEach(d => {
        ffSeriesNames.forEach(name => {
        d[name] = +d[name];
        });
    });
    fmData.forEach(d => {
        fmSeriesNames.forEach(name => {
        d[name] = +d[name];
        });
    });

    const mmStackedData = stack(mmData, mmSeriesNames);
    const ffStackedData = stack(ffData, ffSeriesNames);
    const fmStackedData = stack(fmData, fmSeriesNames);

    const dataArray = [mmStackedData, ffStackedData, fmStackedData];
    const seriesArray = [mmSeriesNames, ffSeriesNames, fmSeriesNames];
    const titleArray = ["M/M", "F/F", "F/M"];
    const canonArray = ["Non-Canon", "Semi-Canon", "Canon"];

    export let id;
</script>

<div class="viz-wrapper">
    <div class="key-wrapper">
        {#each canonArray as canon}
            <p class="key-{canon}">{canon}</p>
        {/each}
    </div>
    <div class="chart-wrapper">
        {#each dataArray as data, i}
        <div class="group-wrapper">
            <h3>{titleArray[i]}</h3>
            <div class="chart-container">
                <LayerCake
                    padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
                    x={d => d.data[xKey]}
                    y={yKey}
                    z={zKey}
                    xScale={d3.scaleBand().paddingInner(0.05).round(true)}
                    xDomainSort={false}
                    zScale={d3.scaleOrdinal()}
                    zDomain={seriesArray[i]}
                    zRange={seriesColors}
                    flatData={flatten(data)}
                    data={data}
                >
                    <Svg>
                    <AxisX gridlines={false} />
                    <AxisY ticks={4} gridlines={false} />
                    <ColumnStacked />
                    </Svg>
                </LayerCake>
            </div>
            <table>
                <tr>
                    <th style="width: 77%">Ship</th>
                    <th class="right-align" style="width: 23%">Fanfics</th>
                </tr>
                {#each tableData.filter(d => d.relType == titleArray[i]) as ship, i}
                    <tr class="canon-{ship.isCanon}">
                        <td style="width: 77%">{ship.ship}</td>
                        <td class="right-align" style="width: 23%">{format(ship.totalWorks)}</td>
                    </tr>
                {/each}
        </table>
        </div>
        {/each}
    </div>
</div>

<style>
  /*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
    .viz-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .key-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .chart-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .group-wrapper {
        width: calc(33.33% - 1rem);
        margin: 0 0.5rem;
    }

    .chart-container {
        width: 100%;
        height: 400px;
    }

    table {
        font-family: var(--sans);
        font-size: var(--14px);
        width: 100%;
    }

    tr {
        transition: background-color 1s linear;
    }

    th, td {
        padding: 0.5rem;
    }

    .right-align {
        text-align: right;
    }

    .canon-Semi-Canon {
        background: #cccccc;
    }
    .canon-Yes {
        background: #FFACBD;
    }
    .canon-No {
        background: #C7FF25;
    }

    .key-wrapper p {
        margin-right: 2rem;
    }

    .key-Non-Canon::before {
        display: inline-block;
        content: "";
        width: 1rem;
        height: 1rem;
        background: #C7FF25;
        margin: 0 0.25rem 0 0;
    }

    .key-Canon::before {
        display: inline-block;
        content: "";
        width: 1rem;
        height: 1rem;
        background: #FFACBD;
        margin: 0 0.25rem 0 0;
    }
    .key-Semi-Canon::before {
        display: inline-block;
        content: "";
        width: 1rem;
        height: 1rem;
        background: #cccccc;
        margin: 0 0.25rem 0 0;
    }
  </style>