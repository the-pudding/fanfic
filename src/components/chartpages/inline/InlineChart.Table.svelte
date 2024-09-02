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
            
            if (id == "SLASH_topTagsByRelType") {
                data = d3.groups(data, d => d.relType);
            }
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
    {#if data && id !== "SLASH_topTagsByRelType"}
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
                {:else if id == "CANON_AUtags"}
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
    {:else if data && id == "SLASH_topTagsByRelType" }
        <div class="set-wrapper"
            use:inView
            on:enter={highlightRow}
            on:exit={unhighlightRow}>
            {#each data as relType, i}
            {@const relCount = relType[1].filter(d => d.type_relationship === 'y').length}
            {@const sexualCount = relType[1].filter(d => d.type_sexual === 'y').length}
                <div class="list-wrapper">
                    <h5>{relType[0]}</h5>
                    <div class="summary">
                        <p class="key-sexual"><span>{sexualCount}</span> Sexual tags</p>
                        <p class="key-relationship"><span>{relCount}</span> Relationship tags</p>
                    </div>
                    <ul>
                        {#each relType[1].slice(0,20) as tag, i}
                            <ListBlock
                                topItem={tag.tag}
                                index={i}
                                highlight={tag.type_relationship == "y" && isEntered || tag.type_sexual == "y" && isEntered}
                                specialClass={`item-sexual-${tag.type_sexual} item-relationship-${tag.type_relationship}`}
                                width={"100%"}
                                height={"2.5rem"}
                            />
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>
    {/if}
</figure>


<style>
    figure {
        width: 100%;
        height: auto;
        background: white;
        color: var(--fanfic-black);
    }

    .header-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;  
        padding: 1rem 1rem 0 1rem;
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
        padding: 0 1rem 1rem 1rem;
    }

    .set-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0 1rem;
    }

    .set-wrapper ul {
        padding: 0 0.5rem;
    }

    .list-wrapper {
        width: 25%;
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
        margin: 1rem 0 0 0;
        padding: 0;
    }

    .summary {
        width:100%;
        display: flex;
        flex-direction: column;
        padding: 0.5rem 0.5rem;
    }

    .summary p {
        font-family: var(--mono);
        font-size: 10px;
        font-weight: 700;
        padding: 0.125rem 0;
        margin: 0;
        text-transform: uppercase;
    }

    .key-relationship span {
        background-color: var(--fanfic-highlighter);
        padding: 0.25rem;
    }  
    
    .key-sexual span {
        background-color: var(--fanfic-pink);
        padding: 0.25rem;
    }   

    @media (max-width: 600px) { 
       .list-wrapper {
            width: 50%;
        }
    }
</style>