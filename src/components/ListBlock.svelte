<script>
    import Rank from "$components/Rank.svelte";
    import { fade } from 'svelte/transition';
    import { uTooltipVisible } from "$stores/misc.js";
    import * as d3 from "d3";
    import roundCounts from "$utils/roundCounts.js";

    export let topItem;
    export let secondaryItem;
    export let numItem;
    export let blockType;
    export let index;
    export let highlight;
    export let specialClass;
    export let height;
    export let width;
    export let scrollIndex;
    export let data;

    const format = d3.format(",");

    const genderColorScale = d3.scaleDiverging()
      .domain([0, 50, 100])
      .interpolator(d3.interpolateRgb("#E2FF8E","#7380D0"));

    const genres = ['Superhero', 'Fantasy', 'Science Fiction', 'Sports', 'Video Game', 'Crime', 'Slice of Life', 'Thriller', 'Romance', 'Historical'];
    
    const genreColorScale = d3.scaleOrdinal()
        .domain(genres)
        .range([
        "#D03200", // Superhero
        "#1B2AA6", // Fantasy
        "#119C72", // Science Fiction
        "#C0B9C6", // Sports
        "#96AC0B",  // Video Game
        "#C0B9C6", // Crime
        "#C0B9C6", // Thriller
        "#C0B9C6", // Thriller
        "#C0B9C6", // Slice of Life
        "#C0B9C6", // Romance
        "#C0B9C6", // Historical
    ]);

    function setTextColor(color) {
        if (color == "#C0B9C6" || color == "#96AC0B") {
            return "#151515"
        } else {
            return "#ffffff"
        }

    }

    function handleMouseEnter() {
        uTooltipVisible.set(true);

        d3.selectAll(".u-tooltip-container")
            .html(
                `<p class="fandom">${data.fandom}</p>
                <p><span style="background-color:${genderColorScale(data.menPercent)}">${Math.round(data.womenPercent)}% women / ${Math.round(data.menPercent)}% men</span></p>
                <p><span style="color:${setTextColor(genreColorScale(data.genre))}; background-color:${genreColorScale(data.genre)}">${data.genre}</span></p>`
            )
    }

    function handleMouseLeave() {
        uTooltipVisible.set(false);
    }
</script>

{#if blockType !== "grid"}
    <li 
        style="height: {height}; width: {width}"
        class="highlight-{highlight} {specialClass} single-line-ellipsis {blockType}"
    >
        <div class="left">
            <Rank rank={index+1} />
            <div class="details">
                <p class="top-item">{topItem}</p>
                {#if secondaryItem}
                    <p class="secondary-item">{secondaryItem}</p>
                {/if}
            </div>
        </div>
        {#if numItem}
            <div class="right">
                <p class="num-item">{format(roundCounts(numItem, "ten"))}</p>
            </div>
        {/if}
    </li>
{:else}
        <!-- {@const textColor = scrollIndex <= 1 && specialClass !== "#C0B9C6" 
            ? "#151515" 
            : scrollIndex == 2 && specialClass !== "#C0B9C6" || scrollIndex == 2 && specialClass !== "#96AC0B"
            ? "#ffffff" : "#151515"
        } -->
        {@const textColor = scrollIndex == undefined && specialClass || scrollIndex <= 1 && specialClass !== "#C0B9C6"
            ? "#151515"
            : scrollIndex == 2 && specialClass == "#C0B9C6" || scrollIndex == 2 && specialClass == "#96AC0B" || scrollIndex == "exit" && specialClass == "#C0B9C6" || scrollIndex == "exit" && specialClass == "#96AC0B"
            ? "#151515"
            : "#ffffff"}
        <!-- {@const opacity = scrollIndex !== undefined ? 1 : 0}
        {@const opacityTransition = scrollIndex !== undefined ? 0.125 : 0} -->
        <li class="grid"
            style="background-color:{specialClass}; color:{textColor};"
            on:mouseenter={handleMouseEnter}
            on:mouseleave={handleMouseLeave}>
        <div class="left">
            <Rank rank={index+1} />
            <div class="details">
                <p class="top-item">{topItem}</p>
                {#if secondaryItem}
                    <p class="secondary-item">{secondaryItem}</p>
                {/if}
            </div>
        </div>
        {#if numItem}
            <div class="right">
                <p class="num-item">{format(roundCounts(numItem, "ten"))}</p>
            </div>
        {/if}
        </li>
    {/if}

<style>
    li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-family: var(--mono);
        font-size: var(--12px);
        border: 1px solid var(--fanfic-black);
        overflow: hidden;
        transition: all 0.5s linear 0s;
    }

    .grid {
        width: 100%;
        height: 3rem;
        cursor: pointer;
        margin: 0;
    }

    .full-3 {
        height: 3rem;
    }

    .inline-layer {
        height: 2.5rem;
    }

    .item-relationship-y.highlight-true {
        background-color: var(--fanfic-blue);
        color: white;
        transition: background-color 1s linear;
    }

    .item-sexual-y.highlight-true {
        background-color: var(--fanfic-red);
        color: white;
        transition: background-color 1s linear;
    }

    .highlight-true {
        background-color: var(--fanfic-blue);
        color: white;
        transition: background-color 1s linear;
    }

    .canon-No, .item-canon-No  {
        background-color: var(--fanfic-blue); 
    }

    .canon-Yes, .item-canon-Yes {
        background-color: var(--fanfic-red); 
    }

    .canon-Semi-Canon, .item-canon-Semi-Canon {
        background-color: var(--fanfic-green); 
    }

    li p {
        padding: 0;
        margin: 0;
        line-height: 1;
    }

    .grid .left {
        width: 100%;
    }
    
    .left {
        width: calc(100% - 4rem);
        display: flex;
        flex-direction: column;
        overflow-wrap: break-word;
    }

    .right {
        width: 4rem;
        text-align: right;
    }

    .top-item {
        font-weight: 700;
    }

    .details {
        padding: 0.25rem 0.25rem 0.25rem 1.5rem;
    }

    .num-item {
        padding: 0.25rem;
    }

    @media (max-width: 1200px) { 
        .full-4 .top-item {
            text-overflow: ellipsis;
            overflow: hidden;
            width: 20ch;      
            white-space: nowrap; 
        }
    }

    @media(max-width: 900px) {
        .full-4 .top-item {
            text-overflow: ellipsis;
            overflow: hidden;
            width: 40ch;      
            white-space: nowrap; 
        }
    }

    @media(max-width: 800px) {
        .grid {
            height: 2.5rem;
        }
        li {
            font-size: 10px;
        }
        .full-3 {
            height: 3.5rem;
        }
        .left {
            width: calc(100% - 3.5rem);
        }

        .right {
            width: 3rem;
        }
    }

    @media(max-width: 700px) {
        .grid {
            height:1.25rem;
        }

        .grid .top-item {
            text-overflow: ellipsis;
            overflow: hidden;
            width: 30ch;      
            white-space: nowrap; 
        }
        .full-3 {
            height: 2.5rem;
        }
    }

    @media(max-width: 550px) {
        .grid .top-item {
            text-overflow: ellipsis;
            overflow: hidden;
            width: 25ch;      
            white-space: nowrap; 
        }
    }

    @media(max-width: 500px) {
        .grid .top-item {
            width: 15ch;      
        }
    }

    @media(max-width: 400px) {
        .grid .top-item {
            width: 12ch;      
        }
    }
</style>