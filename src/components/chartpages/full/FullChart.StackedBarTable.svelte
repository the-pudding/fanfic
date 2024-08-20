
<script>
    import * as d3 from "d3";
    import { LayerCake, Svg, flatten, stack } from 'layercake';
    import ColumnStacked from "$components/layercake/ColumnStacked.svelte";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import AxisY from "$components/layercake/AxisY.svg.svelte";
    import data from "$data/CANON/CANON_percentRelType.csv";
    import tableData from "$data/CANON/CANON_topShipRelType.csv";

    export let id;

    // Comma formatting
    const format = d3.format(",");

    // Filters the data so that we're only getting columns that start with "mm", "ff", "fm"
    function filterData(data, starter) {
        const filteredData = data.map(d => {
            const props = {};
            for (let key in d) {
                if (key.startsWith(starter) || key == "year") {
                    props[key] = d[key];
                }
            }
            return props;
        })
        return filteredData;
    }

    // Data
    const mmData = filterData(data, "mm");
    const ffData = filterData(data, "ff");
    const fmData = filterData(data, "fm");
    
    // Keys
    const xKey = "year";
    const yKey = [0,1];
    const zKey = "key";

    // Gets the series names aka columns
    const mmSeriesNames = Object.keys(mmData[0]).filter(d => d !== xKey);
    const ffSeriesNames = Object.keys(ffData[0]).filter(d => d !== xKey);
    const fmSeriesNames = Object.keys(fmData[0]).filter(d => d !== xKey);
    const seriesColors = ['#1B2AA6', '#119C72', '#D03200'];

    // Makes sure the data is in number format
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

    // Stacks the data as needed for layercake
    const mmStackedData = stack(mmData, mmSeriesNames);
    const ffStackedData = stack(ffData, ffSeriesNames);
    const fmStackedData = stack(fmData, fmSeriesNames);

    // Creates arrays to loop through below
    const dataArray = [mmStackedData, ffStackedData, fmStackedData];
    const seriesArray = [mmSeriesNames, ffSeriesNames, fmSeriesNames];
    const titleArray = ["M/M", "F/F", "F/M"];
    const canonArray = ["Non-Canon", "Semi-Canon", "Canon"];
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
                    zScale={d3.scaleOrdinal()}
                    zDomain={seriesArray[i]}
                    zRange={seriesColors}
                    flatData={flatten(data)}
                    data={data}
                >
                    <Svg>
                    <AxisX gridlines={false} ticks={2} />
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
        background: white;
        padding: 2rem;
    }

    h3 {
        text-align: center;
        font-family: var(--mono);
        font-size: var(--20px);
    }

    .key-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
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
        height: 240px;
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

    .canon-Yes {
        background: #D03200;
    }
    .canon-Semi-Canon {
        background: #119C72;
    }
    .canon-No {
        background: #1B2AA6;
    }

    .key-wrapper p {
        margin-right: 2rem;
        font-family: var(--mono);
        text-transform: uppercase;
        margin: 0 1rem;
    }

    .key-Non-Canon::before {
        display: inline-block;
        position: relative;
        top: 0.125rem;
        content: "";
        width: 1rem;
        height: 1rem;
        background: #1B2AA6;
        margin: 0 0.125rem 0 0;
    }

    .key-Canon::before {
        display: inline-block;
        position: relative;
        top: 0.125rem;
        content: "";
        width: 1rem;
        height: 1rem;
        background: #D03200;
        margin: 0 0.125rem 0 0;
    }
    .key-Semi-Canon::before {
        display: inline-block;
        position: relative;
        top: 0.125rem;
        content: "";
        width: 1rem;
        height: 1rem;
        background: #119C72;
        margin: 0 0.125rem 0 0;
    }
  </style>