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
        if (color !== "#C0B9C6") {
            return "#ffffff"
        } else {
            return "#151515"
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
        class="highlight-{highlight} {specialClass}"
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
    {#if scrollIndex >= 0 || scrollIndex == undefined}
        {@const textColor = scrollIndex == 1 && specialClass !== "#C0B9C6" 
            ? "#151515" 
            : scrollIndex == 2 && specialClass !== "#C0B9C6" 
            ? "#ffffff" : "#151515"
        }
        <li class="grid"
            style="background-color: {specialClass}; color: {textColor}"
            on:mouseenter={handleMouseEnter}
            on:mouseleave={handleMouseLeave}
            in:fade={{ delay: index*50, duration: 300 }}
            out:fade={{ delay: 50, duration: 300 }}>
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
{/if}

<style>
    li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-family: var(--mono);
        font-size: var(--12px);
        border: 1px solid var(--fanfic-black);
        margin: 0.25rem 0;
        /* background-color: white; */
        transition: background-color 1s linear;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .grid {
        width: 100%;
        height: 3.5rem;
        cursor: pointer;
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
        text-overflow: ellipsis;
        overflow: hidden;
    }
    
    .left {
        display: flex;
        flex-direction: column;
    }

    .top-item {
        font-weight: 700;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .details {
        padding: 0.25rem 0.25rem 0.25rem 1.5rem;
    }

    .num-item {
        padding: 0.25rem;
    }

    @media(max-width: 700px) {
        .grid {
            height: 1.25rem;
        }

        li {
            font-size: 10px;
        }
    }
</style>