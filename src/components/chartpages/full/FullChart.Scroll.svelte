
<script>
    import { onMount } from 'svelte';
    import Scrolly from "$components/helpers/Scrolly.svelte";
    import data from "$data/SLASH/SLASH_topFandoms.csv";
    import { fade } from 'svelte/transition';
    import * as d3 from 'd3';
    import ChartHeader from "$components/chartpages/ChartHeader.svelte";
    import ListBlock from "$components/ListBlock.svelte";
    import Rank from "$components/Rank.svelte";

    export let id;

    let rows = 10;
    let cols = 5;

    const genres = [...new Set(data.map(item => item.genre))];

    const genderColorScale = d3.scaleDiverging()
      .domain([0, 50, 100])
      .interpolator(d3.interpolateRgb("#FFAAB9", "#E2FF8E"));
    
    const genreColorScale = d3.scaleOrdinal()
        .domain(genres)
        .range([
        "#1B2AA6", // Fantasy
        "#D03200", // Superhero
        "#C0B9C6", // Sports
        "#119C72",  // Video Game
        "#C0B9C6", // Crime
        "#FFAAB9", // Thriller
        "#E2FF8E", // Science Fiction
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

    // To replace with copy once copy is set
    let steps = [0,1,2,3];

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
            <ChartHeader title={"TKTK"} />
            <div class="content-wrapper">
                <div class="key">
                    {#if scrollIndex == 1}
                    <p>More men</p>
                    <div class="key-box-gender"></div>
                    <p>More women</p>
                    {:else if scrollIndex == 2}
                        {#each genres as genre}
                            <p style="background-color: {genreColorScale(genre)}">{genre}</p>
                        {/each}
                    {/if}
                </div>
                <div class="fandom-wrapper">
                    {#if grid}
                        <div class="grid" style="--rows: {grid[0]}; --cols: {grid[1]};">
                            {#each data as fandom, i}
                            <div class="item">
                                <ListBlock
                                    data={fandom}
                                    topItem={fandom.fandom}
                                    index={i}
                                    blockType={"grid"}
                                    scrollIndex={scrollIndex}
                                    specialClass={setColorScale(scrollIndex, fandom)}
                                />
                            </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
    <Scrolly bind:value={scrollIndex}>
        {#if steps}
            {#each steps as text, i}
                <div class="step">
                    <p>{@html i}</p>
                </div>
            {/each}
        {/if}
    </Scrolly>
    <div class="spacer" />
</section>

<style>
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
        overflow-x: hidden;
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
    }
    .key p {
        margin: 0;
    }
    .key-box-gender {
        background-image: linear-gradient(to right, #E2FF8E, #FFAAB9);
        height: 1.5rem;
        width: 10rem;
        border: 1px solid var(--fanfic-black);
        margin: 0 0.5rem;
    }
    .chart-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        background: var(--fanfic-window-gray);
        border-width:2px;
        border-color:#FFFFFF #808080 #808080 #FFFFFF;
        border-style:solid;
        overflow: hidden;
    }
    .content-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        background-color: white;
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
        background-color: white;
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