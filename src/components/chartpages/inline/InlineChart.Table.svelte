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
        <div class="key">
            {#if id == "RPF_top20"}
                <p class="key-block key-block-highlight">Boy bands</p>
            {:else}
                <p class="key-block key-block-highlight">Everyday settings</p>
            {/if}
        </div>
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
                        numItem={ship.fics}
                        index={i}
                        highlight={ship.category == "boy band" && isEntered}
                        specialClass={""}
                        blockType={"inline-layer"}
                        width={"100%"}
                    />
                {:else if id == "CANON_AUtags" || id == "SLASH_topTagsTotal"}
                    <ListBlock
                        topItem={ship.tag}
                        numItem={ship.count}
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

    .key {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        margin: 0rem 0 0.5rem 0;
        font-family: var(--mono);
        font-size: var(--12px);
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    .key p {
        margin: 0;
        text-transform: uppercase;
        font-weight: 700;
    }
    .key-block {
        position: relative;
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
        background-color: var(--fanfic-blue);
    }

    ul {
        width: 100%;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .set-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0;
        gap: 2rem;
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
        ul {
            gap: 0.125rem;
        }
        h5 {
            font-size: var(--14px);
        }
       .list-wrapper {
            width: calc(50% - 0.75rem);
        }

        .key {
            font-size: 10px;
        }

        .key-block::before {
            width: 0.75rem;
            height: 0.75rem;
            margin: 0 0.125rem 0 0;
        }

        .header-row p {
            font-size: 10px;
        }
    }
</style>