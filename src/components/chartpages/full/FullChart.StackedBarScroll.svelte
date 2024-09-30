
<script>
    import {getContext, onMount} from 'svelte';
    import * as d3 from "d3";
    import Scrolly from "$components/helpers/Scrolly.svelte";
    import ChartHeader from "$components/chartpages/ChartHeader.svelte";
    import { fade } from 'svelte/transition';
    import { LayerCake, Svg, flatten, stack, Html } from 'layercake';
    import Rank from "$components/Rank.svelte";
    import ColumnStacked from "$components/layercake/ColumnStacked.svelte";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import AxisY from "$components/layercake/AxisY.svg.svelte";
    import data from "$data/CANON/CANON_percentRelType.csv";
    import tableData from "$data/CANON/CANON_topShipRelType.csv";

    const copy = getContext("copy");

    export let id;

    let receivedData = '';

    function handleCustomEvent(event) {
        receivedData = event.detail.data;
    }

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
    const seriesColors = ['#1B2AA6', '#0F8662', '#D03200'];

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

    let scrollIndex;
    let innerWidth;

    function updateScrollSteps(scrollIndex) {
        if (scrollIndex == 0 || scrollIndex == undefined) {
            currData = mmStackedData;
            currSeries = mmSeriesNames;
            currTitle = "Slash (M/M)";
        } else if (scrollIndex == 1) {
            currData = fmStackedData;
            currSeries = fmSeriesNames;
            currTitle = "Straight (F/M)";
        } else if (scrollIndex == 2) {
            currData = ffStackedData;
            currSeries = ffSeriesNames;
            currTitle = "Femslash (F/F)";
        }
    }

    $: updateScrollSteps(scrollIndex);
    $: currData = [...currData];
    $: currSeries = [...currSeries];
    $: currTitle = currTitle;
</script>

<svelte:window bind:innerWidth />

<section id="scrolly">
    <div class="sticky" id="sticky-{id}">
        <div class="chart-wrapper">
            {#if receivedData && receivedData[0].tooltipVisible}
                <div class="tooltip"
                    transition:fade={{ duration: 300 }}
                    style="top: {receivedData[0].yPos}px;
                            left: {receivedData[0].xPos}px"
                >   
                    <p class="year">{receivedData[0].yearValTooltip}</p>
                    <p class="yes-text"> Canon: {receivedData[0].yesValTooltip}%</p>
                    <p class="semi-text">Semi-canon: {receivedData[0].semiValTooltip}%</p>
                    <p class="no-text">Non-canon: {receivedData[0].noValTooltip}%</p>
                </div>
            {/if}
            <ChartHeader title={"Canon status by relationship"} />
            <div class="content-wrapper">
                <h5>{currTitle}</h5>
                <div class="key">
                    <p class="key-block key-block-canon">Canon</p>
                    <p class="key-block key-block-semi">Semi-Canon</p>
                    <p class="key-block key-block-non-canon">Non-Canon</p>
                </div>
                <LayerCake
                    padding={{ top: 20, right: 5, bottom: 100, left: 26 }}
                    x={d => d.data[xKey]}
                    y={yKey}
                    z={zKey}
                    xScale={d3.scaleBand().paddingInner(0.1).round(true)}
                    zScale={d3.scaleOrdinal()}
                    zDomain={currSeries}
                    zRange={seriesColors}
                    flatData={flatten(currData)}
                    data={currData}
                >
                    <Svg>
                    <AxisY ticks={4} gridlines={true} baseline={true} snapTicks={true} />
                    <AxisX gridlines={false} />
                    <ColumnStacked on:customEvent={handleCustomEvent} />
                    </Svg>
                </LayerCake>
            </div>
        </div>
    </div>
    <Scrolly bind:value={scrollIndex}>
            {#each copy.canonBarSlides as step, i}
                <div class="step">
                    <p>{@html step.value}</p>
                </div>
            {/each}
    </Scrolly>
    <div class="spacer" />
</section>


<style>
        .tooltip {
        position: absolute;
        overflow: hidden;
        border: 1px solid var(--fanfic-black);
        pointer-events: none;
        z-index: 1000;
        /* opacity: 0; */
        padding: 0.75rem;
        font-family: var(--mono);
        line-height: 1.125;
        background: white;
        transform: translate(-50%, -100%);
        min-width: 9.5rem;
    }
    .tooltip p {
        font-size: var(--12px);
        padding: 0;
        margin: 0;
    }
    .tooltip .year {
        font-weight: 700;
        text-transform: uppercase;
    }

    .no-text::before {
        width: 1rem;
        height: 1rem;
        content: '';
        border: 2px solid;
        border-color: var(--window-inset-stroke);
        display: inline-block;
        position: relative;
        top: 0.2rem;
        margin: 0 0.25rem 0 0;
        background: #1B2AA6;
    }

    .yes-text::before {
        width: 1rem;
        height: 1rem;
        content: '';
        border: 2px solid;
        border-color: var(--window-inset-stroke);
        display: inline-block;
        position: relative;
        top: 0.2rem;
        margin: 0 0.25rem 0 0;
        background: #D03200;
    }
    .semi-text::before {
        width: 1rem;
        height: 1rem;
        content: '';
        border: 2px solid;
        border-color: var(--window-inset-stroke);
        display: inline-block;
        position: relative;
        top: 0.2rem;
        margin: 0 0.25rem 0 0;
        background: #0F8662;
    }

    #scrolly {
        margin: 0;
    }
    .sticky {
        width: 100%;
		position: sticky;
        display: flex;
        flex-direction: column;
        align-items: center;
		top: 4rem;
		transition: all 1s;
		height: 100svh;
        z-index: 1;
        justify-content: center;
	}

    .chart-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        background: #f2f2f2;
        border: 2px solid;
        border-color: var(--window-button-stroke);
        max-width: 1400px;
        margin: 0 auto;
    }

    .content-wrapper {
        width: calc(100% - 2rem);
        height: 500px;
        margin: 1rem auto 2rem auto;
        background-color: #f2f2f2;
        padding: 1rem;
        border: 2px solid;
        border-color: var(--window-inset-stroke);
    }

    h5 {
        text-align: center;
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--18px);
        margin: 0 0 0.5rem 0;
    }

    .key {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        margin: 0;
        font-family: var(--mono);
        font-size: var(--12px);
        flex-wrap: wrap;
        gap: 1rem;
    }
    .key p {
        margin: 0;
        text-transform: uppercase;
        font-weight: 700;
    }
    .key-block {
        position: relative;
        text-transform: uppercase;
        font-weight: 700;
    }
    .key-block::before {
        width: 1rem;
        height: 1rem;
        content: '';
        border: 2px solid;
        border-color: var(--window-inset-stroke);
        display: inline-block;
        position: relative;
        top: 0.25rem;
        margin: 0 0.25rem 0 0;
    }
    .key-block-non-canon::before {
        background: var(--fanfic-blue);
    }
    .key-block-canon::before {
        background: var(--fanfic-red);
    }
    .key-block-semi::before {
        background: var(--fanfic-green);
    }

    .spacer {
		height: 75vh;
	}
	.step {
		height: 80vh;
		text-align: center;
        z-index: 1000;
        max-width: 30rem;
        margin: 0 auto;
        pointer-events: none;
	}

    .step p {
        background: white;
        padding: 2rem 1rem;
        border: 1px solid var(--fanfic-black);
        line-height: 1.85;
        pointer-events: auto;
    }

    :global(.step p .noncanon) {
        font-weight: 700;
		font-family: var(--sans);
	    background-color: var(--fanfic-blue);
		color: white;
		padding: 0.125rem;
    }

    :global(.step p .canon) {
        font-weight: 700;
		font-family: var(--sans);
	    background-color: var(--fanfic-red);
		color: white;
		padding: 0.125rem;
    }

    @media (max-width: 600px) { 
        .tooltip {
            display: none;
        }

        .key {
            font-size: 10px;
            gap: 0.25rem
        }

        .key-block::before {
            width: 0.75rem;
            height: 0.75rem;
        }

        :global(#sticky-CANON_percentRelType .x-axis .tick:nth-child(even) ) {
            display: none;
        }

        .content-wrapper {
            height: 400px;
        }
    }

    @media (max-width: 400px) {
        .step p {
            font-size: var(--14px);
        }
    }
</style>