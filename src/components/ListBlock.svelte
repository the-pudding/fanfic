<script>
    import Rank from "$components/Rank.svelte";
    import { fade } from 'svelte/transition';
    import { uTooltipVisible } from "$stores/misc.js";
    import * as d3 from "d3";

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

    const genderColorScale = d3.scaleDiverging()
      .domain([0, 50, 100])
      .interpolator(d3.interpolateRgb("#FFAAB9", "#E2FF8E"));

    function handleMouseEnter() {
        uTooltipVisible.set(true);

        d3.selectAll(".u-tooltip-container")
            .html(
                `<p class="fandom">${data.fandom}</p>
                <p><span style="background-color:${genderColorScale(data.menPercent)}">${Math.round(data.womenPercent)}% women / ${Math.round(data.menPercent)}% men</span></p>
                <p>${data.genre}</p>`
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
                <p class="num-item">{numItem}</p>
            </div>
        {/if}
    </li>
{:else}
    {#if scrollIndex >= 0 || scrollIndex == undefined}
        <li class="grid"
            style="background-color: {specialClass}"
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
                <p class="num-item">{numItem}</p>
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
        transition: background-color 1s linear;
        overflow: hidden;
    }

    .grid {
        width: calc(20% - 0.5rem);
        height: 2.5rem;
        overflow: hidden;
        margin: 0.25rem;
    }

    .item-relationship-y.highlight-true {
        background-color: var(--fanfic-blue);
        transition: background-color 1s linear;
    }

    .item-sexual-y.highlight-true {
        background-color: var(--fanfic-red);
        transition: background-color 1s linear;
    }

    .highlight-true {
        background-color: var(--fanfic-red);
    }

    .canon-No {
        background-color: var(--fanfic-blue); 
    }

    .canon-Yes {
        background-color: var(--fanfic-red); 
    }

    .canon-Semi-Canon {
        background-color: var(--fanfic-green); 
    }

    li p {
        padding: 0;
        margin: 0;
        line-height: 1.25;
    }
    
    .left {
        display: flex;
        flex-direction: column;
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

    @media (max-width: 600px) { 
        li {
            font-size: 10px;
        }
    }
</style>