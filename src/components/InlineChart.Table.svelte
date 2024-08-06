<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import inView from "$actions/inView.js";

    let data;
    let dataColumns;
    const format = d3.format(",");
    let isEntered = false;

    onMount(async () => {
        if (id) {
            const dataPath = `/src/data/RPF/${id}.csv`
            data = await d3.csv(dataPath);
            data.columns.unshift("rank");
        }
	});

    function highlightBoyBands() {
        setTimeout(() => {
            isEntered = true; 
        }, 500)
    }

    function unhighlightBoyBands() {
        setTimeout(() => {
            isEntered = false; 
        }, 500)
    }
    
    export let id;
</script>

<figure>
    <table use:inView
        on:enter={highlightBoyBands}
        on:exit={unhighlightBoyBands}>
        {#if data}
            <tr>
                <th class="right-align" style="width: 7%">No.</th>
                <th style="width: 40%">Ship</th>
                <th style="width: 20%">Fandom</th>
                <th style="width: 10%">Category</th>
                <th class="right-align" style="width: 10%">Fanfics</th>
            </tr>
            {#each data as ship, i}
                <tr class:isHighlight={ship.category == "boy band" && isEntered}>
                    <td class="right-align" style="width: 7%">{i+1}</td>
                    <td style="width: 35%">{ship.ship}</td>
                    <td style="width: 25%">{ship.fandom}</td>
                    <td style="width: 10%">{ship.category}</td>
                    <td class="right-align" style="width: 10%">{format(ship.fics)}</td>
                </tr>
            {/each}
        {/if}
    </table>
</figure>


<style>
    figure {
        width: 100%;
        height: auto;
    }

    table {
        font-family: var(--sans);
        font-size: var(--14px);
        width: 100%;
    }

    tr {
        transition: background-color 1s linear;
    }

    th, td {
        padding: 0.5rem;
    }

    .right-align {
        text-align: right;
    }

    tr.isHighlight {
        background-color: var(--color-gray-300);
        transition: background-color 1s linear;
    }
</style>