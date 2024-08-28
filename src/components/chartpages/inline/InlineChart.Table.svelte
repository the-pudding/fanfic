<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import inView from "$actions/inView.js";
    import Rank from "$components/Rank.svelte"

    export let id;

    let data;
    const format = d3.format(",");
    let isEntered = false;

    // Dynamically loads the data based on the id
    onMount(async () => {
        if (id) {
            const dataFolder = id.split("_")[0];
            const dataPath = `./assets/data/${dataFolder}/${id}.csv`
            data = await d3.csv(dataPath);
            console.log(id)
            // data.columns.unshift("rank");
        }
	});

    // Uses inView on table to trigger highlights
    function highlightRow() {
        setTimeout(() => {
            isEntered = true; 
        }, 500)
    }

    function unhighlightRow() {
        setTimeout(() => {
            isEntered = false; 
        }, 500)
    }
</script>

<figure>
    <table use:inView
        on:enter={highlightRow}
        on:exit={unhighlightRow}>
        {#if data}
            <tr>
                {#if id == "CANON_AUtags"}
                    <th style="width: 70%">Tag</th>
                    <th class="right-align">Count</th>
                {:else}
                    <th style="width: 40%">Ship</th>
                    <th class="right-align" style="width: 10%">Fanfics</th>
                {/if}
            </tr>
            {#each data as ship, i}
                {#if id == "CANON_AUtags"}
                <tr class:isHighlight={ship.setting == "mundane" && isEntered}>
                    <td class="with-rank">
                        <Rank rank={i+1} />
                        <div class="deets">
                            <p class="ship-name">{ship.tag}</p>
                        </div>
                    </td>
                        <td class="right-align"><p>{format(ship.count)}</p></td>
                </tr>
                {:else}
                <tr class:isHighlight={ship.category == "boy band" && isEntered}>
                    <td class="with-rank">
                        <Rank rank={i+1} />
                        <div class="deets">
                            <p class="ship-name">{ship.ship}</p>
                            <p>{ship.fandom}</p>
                        </div>
                    </td>
                    <td class="right-align" style="width: 10%"><p>{format(ship.fics)}</p></td>
                </tr>
                {/if}
            {/each}
        {/if}
    </table>
</figure>


<style>
    figure {
        width: 100%;
        height: auto;
        background: white;
        color: var(--fanfic-black);
    }

    table {
        font-family: var(--mono);
        font-size: var(--14px);
        width: 100%;
        padding: 1rem;
        border-collapse: separate;
        border-spacing:0 4px;
        font-size: var(--12px);
    }

    tr {
        transition: background-color 1s linear;
        border: 1px solid var(--fanfic-black);
    }

    th {
        font-size: var(--12px);
        text-transform: uppercase;
        padding: 0 0.5rem;
    }

    td {
        padding: 0;
        border-top: 1px solid var(--fanfic-black);
        border-bottom: 1px solid var(--fanfic-black);
    }

    td:first-of-type {
        border-left: 1px solid var(--fanfic-black); 
    }

    td:last-of-type {
        border-right: 1px solid var(--fanfic-black); 
    }

    td p {
        padding: 0.5rem;
        margin: 0;
    }

    .right-align {
        text-align: right;
    }

    tr.isHighlight {
        background-color: var(--fanfic-highlighter);
        transition: background-color 1s linear;
    }

    .deets {
        padding: 0.5rem 0.5rem 0.5rem 1.5rem;
    }

    .deets p {
        padding: 0;
    }

    .deets p:first-of-type {
        font-weight: 700;
    }

    @media (max-width: 600px) { 
        table {
            font-size: 10px;
        }
    }
</style>