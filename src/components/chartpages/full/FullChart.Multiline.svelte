
<script>
    import { onMount, getContext } from 'svelte';
    import { tweened } from 'svelte/motion';
	import * as eases from 'svelte/easing';
    import Scrolly from "$components/helpers/Scrolly.svelte";
    import * as d3 from 'd3';
    import ChartHeader from "$components/chartpages/ChartHeader.svelte";
    import { LayerCake, Svg, groupLonger, flatten, Html } from 'layercake';
    import MultiLine from "$components/layercake/todo/MultiLine.svelte";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import AxisY from "$components/layercake/AxisY.svg.svelte";
    import GroupLabel from "$components/layercake/GroupLabel.svelte";

    export let id;

    const copy = getContext("copy");

    // Defaults
    let steps = [0,1,2,3];
    let data;
    let xKey = 'year';
    let yKey = 'fanfics';
    let zKey = 'fandom';
    let seriesNames;
    let groupedData;
    $: innerWidth = 0;
    $: ticks = innerWidth < 600 || innerWidth == undefined
        ? ["2013", "2023"]
        : ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];
    const tweenOptions = {
		duration: 300,
		easing: eases.cubicInOut
	};
    const xDomain = tweened(undefined, tweenOptions);
	const yDomain = tweened(undefined, tweenOptions);

    // Dynamically loads the data based on the id
    onMount(async () => {
        if (id) {
            const dataFolder = id.split("_")[0];
            const dataPath = `./assets/data/${dataFolder}/${id}.csv`
            data = await d3.csv(dataPath);
            // Finds matching keys
            xKey = "year";
            yKey = "fanfics";
            seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
        }

        // Makes sure values are numbers
        data.forEach(d => {
            seriesNames.forEach(name => {
            d[name] = +d[name];
            });
        });

        // Groups the data as needed for layercake
        groupedData = groupLonger(data, seriesNames, {
            groupTo: zKey,
            valueTo: yKey
        });
	});



    let scrollIndex;
    let innerWidth;
    let innerHeight;
    let scrollY;
    let lastScrollY;
    let scrollDir;

    yDomain.set([0, 100000])
    xDomain.set([2013, 2017])

    function updateScrollSteps(scrollIndex) {
        if (scrollIndex == undefined) {
            // d3.selectAll(".content-wrapper .rect-overlay").style("opacity", 0);
        } else if (scrollIndex == 0) {
            yDomain.set([0, 100000]);
            xDomain.set([2013,2017]);
            d3.selectAll(".content-wrapper .rect-overlay").style("opacity", 0);
            d3.selectAll("#bts-path").style("stroke", "#C0B9C6");
            d3.selectAll("#youtube-path").style("stroke", "#C0B9C6");
            d3.selectAll("#onedirection-path").style("stroke", "#D03200");
        } else if (scrollIndex == 1) {
            d3.selectAll(".content-wrapper .rect-overlay").style("opacity", 1);
            d3.selectAll("#bts-path").style("stroke", "#151515");
            d3.selectAll("#youtube-path").style("stroke", "#151515");
            d3.selectAll("#onedirection-path").style("stroke", "#D03200");
            yDomain.set([0, 400000]);
            xDomain.set([2013,2023]);
        } else if (scrollIndex == 2) {
            d3.selectAll(".content-wrapper .rect-overlay").style("opacity", 1);
            d3.selectAll("#bts-path").style("stroke", "#151515");
            d3.selectAll("#youtube-path").style("stroke", "#119C72");
            d3.selectAll("#onedirection-path").style("stroke", "#D03200");
            yDomain.set([0, 400000]);
            xDomain.set([2013,2023]);
        } else if (scrollIndex == 3) {
            d3.selectAll(".content-wrapper .rect-overlay").style("opacity", 1);
            d3.selectAll("#bts-path").style("stroke", "#1B2AA6");
            d3.selectAll("#youtube-path").style("stroke", "#119C72");
            d3.selectAll("#onedirection-path").style("stroke", "#D03200");
            yDomain.set([0, 400000]);
            xDomain.set([2013,2023]);
        } else if (scrollIndex == 4) {
            d3.selectAll(".content-wrapper .rect-overlay").style("opacity", 1);
            d3.selectAll("#bts-path").style("stroke", "#1B2AA6");
            d3.selectAll("#youtube-path").style("stroke", "#119C72");
            d3.selectAll("#onedirection-path").style("stroke", "#D03200");
            yDomain.set([0, 400000]);
            xDomain.set([2013,2023]);
        } 
	}

	$: updateScrollSteps(scrollIndex);
    $: inViewTrigger = scrollIndex >= 0 || scrollIndex == undefined && scrollDir == "up" ? true : false;
    $: inViewLabelA = scrollIndex >= 1 ? true : false;
    $: inViewLabelB = scrollIndex >= 2 ? true : false;
    $: inViewLabelC = scrollIndex >= 3 ? true : false;
    $: {
        if (scrollY > lastScrollY) {
                scrollDir = 'down';
            } else if (scrollY < lastScrollY) {
                scrollDir = 'up';
            }
            lastScrollY = scrollY;
    }
</script>

<svelte:window bind:innerWidth bind:innerHeight bind:scrollY />

<section id="scrolly">
    <div class="sticky">
        <div class="chart-wrapper">
            <ChartHeader title={"Biggest RPF Fandoms"} />
            <div class="content-wrapper">
                {#if groupedData}
                    <LayerCake
                        padding={{ top: 16, right: 16, bottom: 32, left: 16 }}
                        x={xKey}
                        y={yKey}
                        z={zKey}
                        yDomain={$yDomain}
                        xDomain={$xDomain}
                        zScale={d3.scaleOrdinal()}
                        zRange={["#C0B9C6"]}
                        flatData={flatten(groupedData, 'values')}
                        data={groupedData}
                    >
                        <Svg>
                            <AxisX
                                gridlines={false}
                                ticks={ticks}
                                snapLabels
                            />
                            <AxisY ticks={4} {id} />
                            <MultiLine inViewTrigger={inViewTrigger} {id} />
                        </Svg>
                        <Html>
                            <GroupLabel {id} inViewLabelA={inViewLabelA} inViewLabelB={inViewLabelB} inViewLabelC={inViewLabelC} delay={0} />
                        </Html>
                    </LayerCake>
                {/if}
            </div>
        </div>
    </div>
    <Scrolly bind:value={scrollIndex}>
        {#each copy.rpfMultilineSlides as step, i}
            <div class="step">
                <p>{@html step.value}</p>
            </div>
        {/each}
    </Scrolly>
    <div class="spacer" />
</section>

<style>
    .sticky {
        width: 100%;
		position: sticky;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
		top: 0;
		transition: all 1s;
		height: 100vh;
        z-index: 1;
        overflow-x: hidden;
	}
    .chart-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        background: #f2f2f2;
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
        overflow: hidden;
    }
    .content-wrapper {
        width: calc(100% - 2rem);
        margin: 1rem auto 2rem auto;
        height: 50vh;
        padding: 1rem;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        background-color: #f2f2f2;
        border: 2px solid;
        border-color: var(--window-inset-stroke);
    }
    .fandom-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 0 auto;
        padding: 1rem;
        align-items: center;
        justify-content: center;
        background-color: #f2f2f2;
    }

    ul {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap; 
        align-items: center;
        justify-content: center;
        padding: 0;
        list-style: none;
        gap: 0.25rem;
    }

    li {
        width: 9%;
        min-width: 100px;
        aspect-ratio: 1;  
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
		padding: 1.25rem;
		border: 1px solid var(--fanfic-black);
		pointer-events: auto;
        line-height: 1.85;
        text-align: left;
	}

    :global(#onedirection-path) {
        stroke: var(--fanfic-red);
    }

    :global(.onedirection-span) {
        background-color: var(--fanfic-red);
        font-weight: 700;
        font-family: var(--sans);
        padding: 0.125rem;
        color: white;
    }

    :global(.youtube-span) {
        background-color: var(--fanfic-green);
        font-weight: 700;
        font-family: var(--sans);
        padding: 0.125rem;
        color: white;
    }

    :global(.bts-span) {
        background-color: var(--fanfic-blue);
        font-weight: 700;
        font-family: var(--sans);
        padding: 0.125rem;
        color: white;
    }

    @media (max-width: 600px) {
        .sticky {
            justify-content: start;
            top: 5rem;
        }
        .key p {
            font-size: 10px;
        }
        .key-box-gender {
            height: 1rem;
            width: 6rem;
            margin: 0 0.25rem;
        }
	}
</style>