<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import inView from "$actions/inView.js";

    let data;

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
            ? (ship.relType).split("/")[0]
            : (ship.relType).split("/")[1];
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
    <div class="table-wrapper">
        <table>
            {#if data}
                <tr>
                    <th class="right-align" style="width: 10%">No.</th>
                    <th style="width: 73%">Ship</th>
                    <th style="width: 50px">Demographics</th>
                </tr>
                {#each data.slice(0,50) as ship, i}
                    <tr>
                        <td class="right-align" style="width: 10%">{ship.rank}</td>
                        <td style="width: 73%">
                            <p>{ship.ship}</p>
                            <p>{ship.fandom}</p>
                        </td>
                        <td class="pictogram" style="width: 50px">
                            <img src="./assets/images/icons/{findMatchingPictogram(ship, "A")}.png" alt="character"/>
                            <img src="./assets/images/icons/man-white.png" alt="character"/>
                        </td>
                    </tr>
                {/each}
            {/if}
        </table>
        <table>
            {#if data}
                <tr>
                    <th class="right-align" style="width: 10%">No.</th>
                    <th style="width: 73%">Ship</th>
                    <th style="width: 50px">Demographics</th>
                </tr>
                {#each data.slice(50,100) as ship, i}
                    <tr>
                        <td class="right-align" style="width: 10%">{ship.rank}</td>
                        <td style="width: 73%">
                            <p>{ship.ship}</p>
                            <p>{ship.fandom}</p>
                        </td>
                        <td class="pictogram" style="width: 50px">
                            <img src="./assets/images/icons/{findMatchingPictogram(ship, "A")}.png" alt="character"/>
                            <img src="./assets/images/icons/{findMatchingPictogram(ship, "B")}.png" alt="character"/>
                        </td>
                    </tr>
                {/each}
            {/if}
        </table>      
    </div>
    <button on:click={expandClick} class="expand">{btnText}</button>
</div>


<style>
    .chart-container {
        width: 100%;
        background: var(--color-white);
        padding: 2rem;
        display: flex;
        flex-direction: column;
        max-height: 1050px;
        overflow-y: hidden;
        position: relative;
        transition: max-height 1s linear;
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
        margin: 0 1rem 2rem 1rem;
        align-items: center;
    }

    .key-text p {
        font-family: var(--mono);
        font-size: var(--12px);
        font-weight: 700;
        text-transform: uppercase;
        margin: 0 0.25rem 0 0;
        text-align: right;
    }

    .key-text p:last-of-type {
        font-weight: 400;
    }

    .img-block {
        display: flex;
        flex-direction: row;
    }

    .img-block img {
        width: 28px;
        margin-right: -0.25rem;
    }

    .isExpanded {
        max-height: none;
        overflow-y: visible;
        transition: max-height 1s linear;
    }

    .table-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    table {
        width: calc(50% - 1.25rem);
    }

    tr {
        border-bottom: 1px solid var(--fanfic-black);
    }

    th {
        font-family: var(--mono);
        text-transform: uppercase;
        font-size: var(--12px);
    }

    td {
        font-family: var(--sans); 
        padding: 0.5rem;
    }

    td p {
        padding: 0;
        margin: 0;
    }

    td p:first-of-type {
        font-weight: 700;
        font-size: var(--18px);
    }

    .pictogram {
        display: flex;
        flex-direction: row;
        padding: 0;
    }

    .pictogram img {
        width: 36px;
    }

    .pictogram img:last-of-type {
        margin-left: -0.75rem;
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
    }
</style>