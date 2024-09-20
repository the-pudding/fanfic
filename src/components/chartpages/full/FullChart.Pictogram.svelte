<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import inView from "$actions/inView.js";
    import Rank from "$components/Rank.svelte";
    import { uTooltipVisible } from "$stores/misc.js";
    import roundCounts from "$utils/roundCounts.js";

    let data;
    const format = d3.format(",");

    onMount(async () => {
        if (id) {
            const dataFolder = id.split("_")[0];
            const dataPath = `./assets/data/${dataFolder}/${id}.csv`
            data = await d3.csv(dataPath);
        }
	});
    
    export let id;

    let inViewTrigger = false;

    function inViewDraw() { inViewTrigger = true; }
    function exitViewDraw() { inViewTrigger = false; }

    function findMatchingPictogram(ship, letter) {
        let gender = letter == "A"
            ? (ship.gender).split("/")[0]
            : (ship.gender).split("/")[1];
            gender = gender == "M"
                ? "man"
                : gender == "F"
                ? "woman"
                : "nonbinary";
        let race = letter == "A"
            ? (ship.raceA).toLowerCase()
            : (ship.raceB).toLowerCase();

        const pic = `${gender}-${race}`;
        return pic
    }

    let expanded = false;
    let btnText = "Show more";
    const raceArray = [
        ["white", 67],
        ["asian",27],
        ["latino",2.5],
        ["ambiguous", 2.5],
        ["black",0.5],
        ["indigenous",0.5]
    ];

    function expandClick() {
        expanded = !expanded
        btnText = btnText == "Show more" ? "Hide" : "Show more"
    }

    function handleMouseOver() {
        uTooltipVisible.set(true)
        let textBlock = d3.select(this).select(".text-wrapper");
        textBlock.style("transform", "translate(0,0)")

        let textArray = textBlock.selectAll("p").nodes().map(node => node.textContent);

        d3.selectAll(".u-tooltip-container")
            .html(
                `<p class="ship">${textArray[0]}</p>
                <p>${textArray[1]}</p>
                <p>${textArray[2]}</p>`
            )
    }

    function handleMouseLeave() {
        uTooltipVisible.set(false)
        let textBlock = d3.selectAll(".list-wrapper .text-wrapper");
        textBlock.style("transform", "translate(0,105%)")
    }
</script>

<div class="chart-container" class:isExpanded={expanded}>  
    <div class="key">
        {#each raceArray as race}
            <div class="key-block key-block-{race[0]}">
                <div class="key-text">
                    <p>{race[0]}</p>
                    <p>{race[1]}%</p>
                </div>
                <div class="img-block">
                    <img src="./assets/images/icons/man-{race[0]}.png" alt="character"/>
                    <img src="./assets/images/icons/nonbinary-{race[0]}.png" alt="character"/>
                    <img src="./assets/images/icons/woman-{race[0]}.png" alt="character"/>
                </div>
            </div>
        {/each}
    </div> 
    <div class="list-wrapper">
        {#if data}
        <ul>
            {#each data as ship, i}
                <li 
                    on:mouseover={handleMouseOver}
                    on:mouseleave={handleMouseLeave}

                >
                    <Rank rank={i+1} />    
                    <div class="img-wrapper">
                        {#if ship.gender !== "Multi"}
                            <img src="./assets/images/icons/{findMatchingPictogram(ship, "A")}.png" alt="character"/>
                            <img src="./assets/images/icons/{findMatchingPictogram(ship, "B")}.png" alt="character"/>
                        {:else}
                            <div class="img-inset">
                                <img class="multi-img" src="./assets/images/icons/man-white.png" alt="character"/>
                                <img class="multi-img" src="./assets/images/icons/man-white.png" alt="character"/>
                            </div>
                            <div class="img-inset">
                                <img class="multi-img" src="./assets/images/icons/man-white.png" alt="character"/>
                                <img class="multi-img" src="./assets/images/icons/man-white.png" alt="character"/>
                            </div>
                        {/if}
                    </div>
                    <div class="text-wrapper">
                        <p>{ship.ship}</p>
                        <p>{ship.fandom}</p>
                        <p>{format(roundCounts(ship.works, "ten"))} fics</p>
                    </div>
                </li>
            {/each}
        </ul>
        {/if}
    </div>
    <!-- <button on:click={expandClick} class="expand">{btnText}</button> -->
</div>


<style>
    .chart-container {
        width: calc(100% - 2rem);
        margin: 1rem auto 2rem auto;
        background: #f2f2f2;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        /* max-height: 800px; */
        overflow-y: hidden;
        position: relative;
        transition: max-height 1s linear;
        border: 2px solid;
        border-color: var(--window-inset-stroke);
    }

    .key {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .key-block {
        display: flex;
        flex-direction: row;
        margin: 0 0.75rem 2rem 0.75rem;
        align-items: center;
    }

    .key-text p {
        font-family: var(--mono);
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        margin: 0 0.125rem 0 0;
        text-align: right;
        line-height: 1.125;
    }

    .key-text p:last-of-type {
        font-weight: 400;
    }

    .img-block {
        display: flex;
        flex-direction: row;
    }

    .img-block img {
        width: 24px;
        margin-right: -0.25rem;
    }

    .isExpanded {
        max-height: none;
        overflow-y: visible;
        transition: max-height 1s linear;
    }

    .list-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between; 
    }

    ul {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center; 
        list-style: none;
        flex-wrap: wrap;
        padding: 0;
    }

    li {
        width: 9%;
        min-width: 90px;
        aspect-ratio: 1;
        border: 1px solid var(--fanfic-black);
        display: flex;
        flex-direction: row;
        position: relative;
        margin: 0.25rem;
        padding: 0;
        overflow-y: hidden;
        cursor: pointer;
    }

    li .rank {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
        padding: 0;
        font-family: var(--mono);
        font-size: 10px;
        color: white;
        background: var(--fanfic-black);
        padding: 0 0.125rem;
        z-index: 999;
    }

    li .img-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
    }

    .img-wrapper img {
        width: 40%;
    }

    .img-inset {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: -1rem 0;
    }

    .img-inset .multi-img {
        width: 25%;
    }

    li .text-wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        transform: translate(0, 105%);
        font-family: var(--mono);
        font-size: 10px;
        transition: transform 0.5s linear;
        background-color: rgba(255,255,255,0.85);
        z-index: 700;
        box-shadow: 0 -1px 0 var(--fanfic-black);
        padding: 1rem 0.25rem 0 0.25rem;
    }

    .text-wrapper p {
        margin: 0;
        padding: 0;
        line-height: 1.125;
    }

    .text-wrapper p:first-of-type {
        font-weight: 700;
    }

    .expand {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        background: var(--fanfic-window-gray);
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
        color: var(--fanfic-black);
        transform: translate(-50%, 0);
        z-index: 1000;
        font-family: var(--mono);
        text-transform: uppercase;
        font-weight: 700;
        font-size: var(--12px);
    }

    .expand:hover {
        transform: translate(-50%, 0) scale(0.95);
    }

    @media (max-width: 1000px) {
        .key {
            flex-wrap: wrap;
            margin-left: -2rem;
            margin-bottom: 2rem;
            align-items: center;
        }
        .key-block {
            width: 33%;
            padding: 0 0.5rem;
            margin: 0;
        }

        .key-text {
            padding: 0 0 0 0.5rem;
            width: 100px;
        }
    }

    @media (max-width: 600px) { 
        .chart-container {
            padding: 1rem;
        }
        .key-block {
            width: 50%;
            padding: 0 0.5rem;
            margin: 0;
        }
        .img-block {
            padding: 0 0.25rem 0 0;
        }
        .img-block img {
            width: 20px;
        }

        li {
            min-width: 70px;
        }

        .text-wrapper {
            display: none;
        }
    }
</style>