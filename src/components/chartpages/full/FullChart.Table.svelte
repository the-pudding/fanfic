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
            
            data = d3.groups(data, d => d.relType);
        }
	});

    function setRelTypeText(relType) {
        if (relType == "m/m" || relType == "M/M") {
            return "Slash (M/M)"
        } else if (relType == "f/m" || relType == "F/M") {
            return "Straight (F/M)"
        } else if (relType == "f/f" || relType == "F/F") {
            return "Femslash (F/F)"
        } else if (relType == "all" || relType == "ALL") {
            return "All"
        }
    }

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
    {#if id !== "SLASH_topTagsByRelType"}
    <div class="key">
        <p class="key-block key-block-canon">Canon</p>
        <p class="key-block key-block-semi">Semi-Canon</p>
        <p class="key-block key-block-non-canon">Non-Canon</p>
    </div>
    {/if}
    <div class="set-wrapper"
        use:inView
        on:enter={highlightRow}
        on:exit={unhighlightRow}>
        {#each data as relType, i}
        {@const relCount = relType[1].filter(d => d.type_relationship === 'y').length}
        {@const sexualCount = relType[1].filter(d => d.type_sexual === 'y').length}
        {#if id == "SLASH_topTagsByRelType"}    
            <div class="list-wrapper-4">
                <h5>{setRelTypeText(relType[0])}</h5>
                <div class="summary">
                    <p class="key-sexual"><span>{sexualCount}</span> Sexual</p>
                    <p class="key-relationship"><span>{relCount}</span> Relationship</p>
                </div>
                <ul>
                    {#each relType[1].slice(0,20) as tag, i}
                        <ListBlock
                            topItem={tag.tag}
                            index={i}
                            blockType={"full-4"}
                            highlight={tag.type_relationship == "y" && isEntered || tag.type_sexual == "y" && isEntered}
                            specialClass={`item-sexual-${tag.type_sexual} item-relationship-${tag.type_relationship}`}
                            width={"100%"}
                        />
                    {/each}
                </ul>
            </div>
            {:else}
                <div class="list-wrapper-3">
                    <h5>{setRelTypeText(relType[0])}</h5>
                    <ul>
                        {#each relType[1] as ship, i}
                            <ListBlock
                                topItem={ship.ship}
                                numItem={ship.totalWorks}
                                highlight={true}
                                index={i}
                                blockType={"full-3"}
                                specialClass={`item-canon-${ship.isCanon}`}
                                width={"100%"}
                            />
                        {/each}
                    </ul>
                </div>
            {/if}
        {/each}
    </div>
    {/if}
</figure>


<style>
    figure {
        width: calc(100% - 2rem);
        height: auto;
        background: #f2f2f2;
        color: var(--fanfic-black);
        margin: 1rem auto 2rem auto;
        border-width: 2px;
        border-color: var(--window-inset-stroke);
        border-style: solid;
        padding: 1rem;
    }

    .key {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        margin: 0rem 0 1.5rem 0;
        font-family: var(--mono);
        font-size: var(--12px);
        flex-wrap: wrap;
    }
    .key p {
        margin: 0;
        text-transform: uppercase;
        font-weight: 700;
    }
    .key-block {
        position: relative;
        padding: 0 1rem;
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
    }
    .key-block-non-canon::before {
        background: var(--fanfic-blue);
    }
    .key-block-canon::before {
        background: var(--fanfic-red);
    }
    .key-block-semi::before {
        background: var(--fanfic-green);
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
        gap: 2rem;
    }

    .set-wrapper ul {
        padding: 0;
        margin-top: 0.5rem;
    }

    .list-wrapper-4 {
        width: calc(25% - 1.5rem);
        display: flex;
        flex-direction: column;
        margin: 0;
    }

    .list-wrapper-3 {
        width: calc(33% - 1.55rem);
        display: flex;
        flex-direction: column;
        margin: 0;
    }

    h5 {
        font-family: var(--mono);
        font-weight: 700;
        text-align: center;
        font-size: var(--18px);
        margin: 0;
        padding: 0;
    }

    .summary {
        width:100%;
        display: flex;
        flex-direction: row;
        padding: 0.5rem 0;
        gap: 0.5rem;
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
        margin-right: -0.125rem;
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
        margin-right: -0.125rem;
    }  

    @media (max-width: 1200px) { 
        .summary {
            flex-direction: column;
            gap: 0.125rem;
        }
    }
    
    @media (max-width: 900px) { 
        .list-wrapper-4 {
            width: calc(50% - 1rem);
        }
        .summary {
            flex-direction: row;
            gap: 1rem;
            padding: 0.5rem 0 0 0;
        }
    }

    @media (max-width: 800px) { 
        h5 {
            font-size: var(--18px);
        }
    }

    @media(max-width: 700px) {
        .list-wrapper-3 {
            width: 100%;
        }
    }

    @media (max-width: 600px) { 
       .list-wrapper-4 {
            width: 100%;
       }

        .key {
            font-size: 10px;
        }

        .key-block {
            padding: 0 0.5rem;
        }

        .key-block::before {
            width: 0.75rem;
            height: 0.75rem;
        }
    }
</style>