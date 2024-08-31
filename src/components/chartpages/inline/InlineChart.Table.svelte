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
    {#if id !== "SLASH_topTagsByRelType"}
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
            {#if id == "CANON_AUtags"}
                {#each data as ship, i}
                <tr class:isHighlight={ship.setting == "mundane" && isEntered}>
                    <td class="with-rank">
                        <Rank rank={i+1} />
                        <div class="deets">
                            <p class="ship-name">{ship.tag}</p>
                        </div>
                    </td>
                        <td class="right-align"><p>{format(ship.count)}</p></td>
                </tr>
                {/each}
            {:else}
                {#each data as ship, i}
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
                {/each}
            {/if}
        {/if}
    </table>
    {:else}
    <div class="tag-wrapper"
        use:inView
        on:enter={highlightRow}
        on:exit={unhighlightRow}>
        <div class="set-wrapper">
            {#if data}
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
                            <li class="item-sexual-{tag.type_sexual} item-relationship-{tag.type_relationship}" 
                                class:isHighlight={tag.type_relationship == "y" && isEntered || tag.type_sexual == "y" && isEntered}>
                                <Rank rank={i+1} />
                                <p>{tag.tag}</p>
                            </li>
                        {/each}
                    </ul>
                </div>
                {/each}
            {/if}
        </div>
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

    .tag-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .summary {
        width:100%;
        display: flex;
        flex-direction: column;
        padding: 00.5rem;
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

    .set-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row; 
    }

    .list-wrapper {
        width: 25%;
        display: flex;
        flex-direction: column;
        margin: 1rem 0;
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

    ul {
        width: 100%;
        list-style: none;
        padding: 0 0.5rem;
    }

    li {
        border: 1px solid var(--fanfic-black);
        font-family: var(--mono);
        font-size: 10px;
        margin: 0.5rem 0;
        padding: 0;
        height: 2.5rem;
        position: relative;
        transition: background-color 1s linear;
    }

    .item-relationship-y.isHighlight {
        background-color: var(--fanfic-pink);
        transition: background-color 1s linear;
    }

    .item-sexual-y.isHighlight {
        background-color: var(--fanfic-highlighter);
        transition: background-color 1s linear;
    }

    li p {
        padding: 0.25rem 0.25rem 0.25rem 1.5rem;
        margin: 0;
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
        font-size: 10px;
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