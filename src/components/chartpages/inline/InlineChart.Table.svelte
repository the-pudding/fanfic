<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import inView from "$actions/inView.js";
    import Rank from "$components/Rank.svelte";
    import ListBlock from "$components/ListBlock.svelte";

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
    {#if data}
        <div class="header-row">
            {#if id == "RPF_top20"}
                <p>Ship</p>
                <p>Fanfics</p>
            {:else}
                <p>Tag</p>
                <p>Count</p>
            {/if}
        </div>
        <ul use:inView
            on:enter={highlightRow}
            on:exit={unhighlightRow}>
            {#each data as ship, i}
                {#if id == "RPF_top20"}
                    <ListBlock
                        topItem={ship.ship}
                        secondaryItem={ship.fandom}
                        numItem={format(ship.fics)}
                        index={i}
                        highlight={ship.category == "boy band" && isEntered}
                        specialClass={""}
                        height={"3rem"}
                        width={"100%"}
                    />
                {:else if id == "CANON_AUtags" || id == "SLASH_topTagsTotal"}
                    <ListBlock
                        topItem={ship.tag}
                        numItem={format(ship.count)}
                        index={i}
                        highlight={ship.setting == "mundane" && isEntered}
                        specialClass={""}
                        width={"100%"}
                    />
                {/if}
            {/each}
        </ul>
    {/if}
</figure>


<style>
    figure {
        width: calc(100% - 2rem);
        height: auto;
        background: #f2f2f2;
        color: var(--fanfic-black);
        padding: 1rem;
        border: 2px solid;
        margin: 1rem auto 2rem auto;
        border-color: var(--window-inset-stroke);
    }

    .header-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;  
        padding: 0;
    }

    .header-row p {
        font-family: var(--mono);
        font-size: var(--12px);
        font-weight: 700;
        text-transform: uppercase;
        padding: 0;
        margin: 0;
    }

    ul {
        width: 100%;
        padding: 0;
    }

    .set-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0;
        gap: 1rem;
    }

    .set-wrapper ul {
        padding: 0;
    }

    .list-wrapper {
        width: calc(25% - 0.75rem);
        display: flex;
        flex-direction: column;
        margin: 0;
    }

    h5 {
        font-family: var(--mono);
        font-weight: 700;
        text-align: center;
        font-size: var(--18px);
        text-transform: uppercase;
        margin: 0;
        padding: 0;
    }

    .summary {
        width:100%;
        display: flex;
        flex-direction: column;
        padding: 0.5rem 0;
    }

    .summary p {
        font-family: var(--mono);
        font-size: 10px;
        font-weight: 700;
        padding: 0;
        margin: 0;
        text-transform: uppercase;
    }

    .key-relationship span {
        background-color: var(--fanfic-blue);
        color: white;
        padding: 0 0.25rem;
        width: 1.25rem;
        height: 1.25rem;
        display: inline-block;
        border: 2px solid;
        border-color: var(--window-inset-stroke);
    }  
    
    .key-sexual span {
        background-color: var(--fanfic-red);
        color: white;
        padding: 0 0.25rem;
        width: 1.25rem;
        height: 1.25rem;
        display: inline-block;
        border: 2px solid;
        border-color: var(--window-inset-stroke);
    }   

    @media (max-width: 600px) { 
        h5 {
            font-size: var(--14px);
        }
       .list-wrapper {
            width: calc(50% - 0.75rem);
        }
    }
</style>