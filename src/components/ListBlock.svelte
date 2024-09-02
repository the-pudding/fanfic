<script>
    import Rank from "$components/Rank.svelte";
    import { fade } from 'svelte/transition';

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
        width: 9%;
        min-width: 100px;
        aspect-ratio: 1;
        overflow: hidden;
    }

    .item-relationship-y.highlight-true {
        background-color: var(--fanfic-highlighter);
        transition: background-color 1s linear;
    }

    .item-sexual-y.highlight-true {
        background-color: var(--fanfic-pink);
        transition: background-color 1s linear;
    }

    .highlight-true {
        background-color: var(--fanfic-highlighter);
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