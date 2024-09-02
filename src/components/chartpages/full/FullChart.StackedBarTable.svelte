
<script>
    import { onMount } from 'svelte';
    import * as d3 from "d3";
    import { fade } from 'svelte/transition';
    import { LayerCake, Svg, flatten, stack, Html } from 'layercake';
    import ListBlock from "$components/ListBlock.svelte";
    import UniversalTooltip from "$components/UniversalTooltip.svelte";
    import ColumnStacked from "$components/layercake/ColumnStacked.svelte";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import AxisY from "$components/layercake/AxisY.svg.svelte";
    import data from "$data/CANON/CANON_percentRelType.csv";
    import tableData from "$data/CANON/CANON_topShipRelType.csv";

    export let id;

    let receivedData;
    let tooltipX;
    let tooltipY;
    let tooltipContainer;
    let tooltipVisible = false;

    function handleCustomEvent(event) {
        receivedData = event.detail.data;
        tooltipY = innerWidth > 600 ? receivedData[0].yPos : 0;
        tooltipX = innerWidth > 600 ? receivedData[0].xPos : 0;

        tooltipVisible = !tooltipVisible;
    }

    onMount(() => {
        document.body.appendChild(tooltipContainer);
    });

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
    const canonArray = ["Canon", "Semi-Canon", "Non-Canon"];

    // $: console.log(receivedData)
    $: innerWidth = 0;
    $: bottomPos = tooltipVisible ? 0 : "-6rem";
    $: console.log(tooltipVisible)
</script>

<svelte:window bind:innerWidth />

<div bind:this={tooltipContainer} class="tooltip-container" style="bottom: {bottomPos}">
    <UniversalTooltip posX={tooltipX} posY={tooltipY}>
        <div slot="tooltip">
                {#if receivedData}
                <p class="year">{receivedData[0].yearValTooltip} {receivedData[0].relType}</p>
                <p class="yes-text"> Canon: {receivedData[0].yesValTooltip}%</p>
                <p class="semi-text">Semi-canon: {receivedData[0].semiValTooltip}%</p>
                <p class="no-text">Non-canon: {receivedData[0].noValTooltip}%</p>
                {/if}
        </div>
    </UniversalTooltip>
</div>

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
                    padding={{ top: 0, right: 0, bottom: 0, left: 24 }}
                    x={d => d.data[xKey]}
                    y={yKey}
                    z={zKey}
                    xScale={d3.scaleBand().paddingInner(0.1).round(true)}
                    zScale={d3.scaleOrdinal()}
                    zDomain={seriesArray[i]}
                    zRange={seriesColors}
                    flatData={flatten(data)}
                    data={data}
                >
                    <Svg>
                    {#if i == 0 || innerWidth < 600}
                        <AxisY ticks={2} gridlines={false} textAnchor={"end"} />
                    {/if}
                    <AxisX ticks={["2013","2023"]} baseline={true} gridlines={false} snapTicks={true} />
                    <ColumnStacked on:customEvent={handleCustomEvent} />
                    </Svg>
                </LayerCake>
            </div>
            <div class="header-row">
                    <p>Ship</p>
                    <p>Fanfics</p>
            </div>
            <ul>
                {#each tableData.filter(d => d.relType == titleArray[i]) as ship, i}
                    <ListBlock 
                        topItem={(ship.ship).replace("/", " / ")}
                        numItem={format(ship.totalWorks)}
                        index={i}
                        specialClass={`canon-${ship.isCanon}`}
                        height={"2.5rem"}
                    />
                {/each}
            </ul>
        </div>
        {/each}
    </div>
</div>

<style>
    .tooltip-container {
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 0;
        height: 6rem;
        transition: 0.5s bottom ease-in;
    }
    .tooltip {
        position: absolute;
        overflow: hidden;
        border: 1px solid var(--fanfic-black);
        pointer-events: none;
        z-index: 1000;
        /* opacity: 0; */
        padding: 0.75rem;
        font-family: var(--mono);
        font-size: var(--12px);
        line-height: 1.125;
        background: white;
        min-width: 9.5rem;
        width: 100%;
    }
    .tooltip p {
        padding: 0;
        margin: 0;
    }
    .tooltip .year {
        font-weight: 700;
        text-transform: uppercase;
    }
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
        position: relative;
    }

    h3 {
        text-align: center;
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--18px);
        margin: 0 0 0.5rem 24px;
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
        margin: 2rem 0 0 0;
    }

    .group-wrapper {
        width: 33.33%;
        padding: 0 1.5rem 0 0;
    }

    .group-wrapper:nth-of-type(2) {
        border-left: 1px solid var(--fanfic-black);
        border-right: 1px solid var(--fanfic-black);
        margin: 0 0.5rem;
    }

    .chart-container {
        width: 100%;
        height: 240px;
    }

    .html-axis {
        width: calc(100% - 29px);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 0 0 26px;
        border-top: 1px solid var(--fanfic-black);
    }

    .html-axis p {
        margin: 0;
        padding: 0.125rem 0;
        font-size: 12px;
        font-family: var(--mono);
    }

    ul {
        width: 100%;
        margin: 0;
    }

    .header-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;  
        padding: 1rem 1rem 0 1rem;
        margin-top: 2rem;
    }

    .header-row p {
        font-family: var(--mono);
        font-size: var(--12px);
        font-weight: 700;
        text-transform: uppercase;
        padding: 0;
        margin: 0;
    }

    .key-wrapper p {
        margin-right: 2rem;
        font-family: var(--mono);
        font-size: var(--14px);
        text-transform: uppercase;
        margin: 0 1rem;
    }

    .key-Non-Canon::before, .no-text::before {
        display: inline-block;
        position: relative;
        top: 0.05rem;
        content: "";
        width: 0.75rem;
        height: 0.75rem;
        background: #1B2AA6;
        margin: 0 0.25rem 0 0;
    }

    .key-Canon::before, .yes-text::before {
        display: inline-block;
        position: relative;
        top: 0.05rem;
        content: "";
        width: 0.75rem;
        height: 0.75rem;
        background: #D03200;
        margin: 0 0.25rem 0 0;
    }
    .key-Semi-Canon::before, .semi-text::before {
        display: inline-block;
        position: relative;
        top: 0.05rem;
        content: "";
        width: 0.75rem;
        height: 0.75rem;
        background: #119C72;
        margin: 0 0.25rem 0 0;
    }

    @media (max-width: 600px) { 
        .viz-wrapper {
            padding: 1rem;
        }
        .key-wrapper p {
            font-size: var(--12px);
            margin: 0 0.5rem;
        }
        .chart-wrapper {
            flex-direction: column;
        }
        .group-wrapper {
            width: 100%;
            margin-bottom: 3.5rem;
        }
        .group-wrapper:nth-of-type(2) {
            border: none;
            margin: 0;
            margin-bottom: 3.5rem;
        }
        .key-Canon::before, .key-Semi-Canon::before, .key-Non-Canon::before {
            width: 0.65rem;
            height: 0.65rem;
            margin: 0 0.125rem 0 0;
        }
        table {
            margin: 2.5rem 0 0 24px;
        }
        td {
            height: 2.5rem;
        }
        .ship-name p, .right-align p {
            font-size: 10px;
        }
    }
  </style>