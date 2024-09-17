
<script>
    import {getContext, onMount} from 'svelte';
    import Scrolly from "$components/helpers/Scrolly.svelte";
    import data from "$data/SLASH/SLASH_topFandoms.csv";
    import { fade } from 'svelte/transition';
    import * as d3 from 'd3';
    import ChartHeader from "$components/chartpages/ChartHeader.svelte";
    import ListBlock from "$components/ListBlock.svelte";
    import Rank from "$components/Rank.svelte";

    const copy = getContext("copy");

    export let id;

    let rows = 10;
    let cols = 5;

    const genres = [...new Set(data.map(item => item.genre))];

    const genderColorScale = d3.scaleDiverging()
      .domain([0, 50, 100])
      .interpolator(d3.interpolateRgb("#D03E00", "#1B2AA6"));
    
    const genreColorScale = d3.scaleOrdinal()
        .domain(genres)
        .range([
        "#1B2AA6", // Fantasy
        "#D03200", // Superhero
        "#C0B9C6", // Sports
        "#C0B9C6",  // Video Game
        "#C0B9C6", // Crime
        "#C0B9C6", // Thriller
        "#0F8662", // Science Fiction
        "#C0B9C6", // Slice of Life
        "#C0B9C6", // Romance
        "#C0B9C6", // Historical
    ]);

    function setColorScale(scrollIndex, fandom) {
        if (scrollIndex == 0 || scrollIndex == undefined) {
            return "transparent"
        } else if (scrollIndex == 1) {
            return genderColorScale(fandom.menPercent); 
        } else if (scrollIndex == 2) {
            return genreColorScale(fandom.genre); 
        } else {
            return "transparent"
        }
    }

    let scrollIndex;

    function calculateBestGrid(innerWidth, innerHeight) {
        let ratio = innerWidth/innerHeight;
        
        grid = ratio > 1 ? [5, 10] : [10, 5];
    }

    let innerWidth;
    let innerHeight;
    let grid = [];
    $: calculateBestGrid(innerWidth, innerHeight);
</script>

<svelte:window bind:innerWidth bind:innerHeight/>

<section id="scrolly">
    <div class="sticky">
        <div class="chart-wrapper">
            <ChartHeader title={"Top 50 fandoms"} />
            <div class="content-wrapper">
                <div class="key">
                    {#if scrollIndex == 1}
                    <p>More men</p>
                    <div class="key-box-gender"></div>
                    <p>More women</p>
                    {:else if scrollIndex == 2}
                        <p class="key-block key-block-fantasy">Fantasy</p>
                        <p class="key-block key-block-superhero">Superhero</p>
                        <p class="key-block key-block-scifi">Sci-Fi</p>
                        <p class="key-block key-block-other">Other</p>
                    {/if}
                </div>
                <div class="fandom-wrapper">
                    {#each data as fandom, i}
                        <ListBlock
                            data={fandom}
                            topItem={fandom.fandom}
                            index={i}
                            blockType={"grid"}
                            scrollIndex={scrollIndex}
                            specialClass={setColorScale(scrollIndex, fandom)}
                        />
                    {/each}
                </div>
            </div>
        </div>
    </div>
    <Scrolly bind:value={scrollIndex}>
            {#each copy.slashFandomSlides as step, i}
                <div class="step">
                    <p>{@html step.value}</p>
                </div>
            {/each}
    </Scrolly>
    <div class="spacer" />
</section>

<style>
    #scrolly {
        margin: 0;
    }
    .grid {
        display: grid;
        grid-template-rows: repeat(var(--rows), 1fr);
        grid-template-columns: repeat(var(--cols), 1fr);
        gap: 10px;
        width: 100%;
        height: 100%;
        justify-content: center; 
        align-content: center;
        box-sizing: border-box;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    aspect-ratio: 1 / 1;
    max-width: 100px;
    max-height: 100px;
    min-width: 40px;
    min-height: 40px;
    box-sizing: border-box;
  }

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
        overflow: hidden;
	}
    .key {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        margin: 1.5rem 0 0.5rem 0;
        font-family: var(--mono);
        font-size: var(--12px);
        flex-wrap: wrap;
    }
    .key p {
        margin: 0;
        text-transform: uppercase;
        font-weight: 700;
    }
    .key-box-gender {
        background-image: linear-gradient(to right, #1B2AA6, #D03E00);
        height: 1.5rem;
        width: 10rem;
        border: 2px solid;
        border-color: var(--window-inset-stroke);
        margin: 0 0.5rem;
    }
    .key-block {
        position: relative;
        padding: 0 1rem;
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
    .key-block-fantasy::before {
        background: var(--fanfic-blue);
    }
    .key-block-superhero::before {
        background: var(--fanfic-red);
    }
    .key-block-scifi::before {
        background: var(--fanfic-green);
    }
    .key-block-other::before {
        background: var(--fanfic-window-gray);
    }
    .chart-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        background: #f2f2f2;
        border: 2px solid;
        border-color: var(--window-button-stroke);
        overflow-y: hidden;
    }
    .content-wrapper {
        width: calc(100% - 2rem);
        margin: 1rem auto 2rem auto;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        background-color: #f2f2f2;
        border: 2px solid;
        border-color: var(--window-inset-stroke);
        overflow: hidden;
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
        overflow: hidden;
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
	}

    .step p {
        background: white;
        padding: 2rem 1rem;
        border: 1px solid var(--fanfic-black);
    }

    @media (max-width: 600px) {
        .sticky {
            justify-content: start;
            top: 3.5rem;
        }
        .key {
            margin: 0.5rem 0;
        }
        .key p {
            font-size: 10px;
        }
        .key-box-gender {
            height: 1rem;
            width: 6rem;
            margin: 0 0.25rem;
        }
        .key-block {
            width: 100px;
            padding: 0;
        }
	}
</style>