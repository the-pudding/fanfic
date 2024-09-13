<script>
    import { onMount } from "svelte";
	import * as d3 from 'd3-hierarchy';
    import copy from "$data/copy.json";
	
    console.log(copy.rpfBlocks);
    
    export let id;

</script>

<div class="chart-container"> 
    {#each copy.rpfBlocks as block, i}
    <div class="block">
        <p class="kicker">The {block.category}</p>
        <h5>{block.ship}</h5>
        <div class="img-wrapper">
            {#if i == 0}
                <img src="./assets/images/quote-icons/james-rallison.png" />
            {:else if i == 1}
                <img src="./assets/images/quote-icons/harry-styles.png" />
                <img src="./assets/images/quote-icons/louis-tomlinson.png" />
            {:else}
                <img src="./assets/images/quote-icons/dj-qualls.png" />
                <img src="./assets/images/quote-icons/ty-olsson.png" />
            {/if}
        </div>
        {#each block.text as text, i}
            <p>{@html text.value}</p>
        {/each}
    </div>
    {/each}
</div>


<style>
    .chart-container {
        width: calc(100% - 2rem);
        margin: 1rem auto 2rem auto;
        background: #f2f2f2;
        padding: 0;
        display: flex;
        gap: 1rem;
    }

    .block {
        width: 33%;
        border: 2px solid;
        border-color: var(--window-inset-stroke);
        padding: 1rem;
        background-color: var(--fanfic-highlighter);
    }

    .kicker {
        text-align: center; 
        font-family: var(--mono);
        text-transform: uppercase;
        font-weight: 700;
        font-size: var(--12px);
        margin: 0;
        padding: 0;
    }

    h5 {
        font-family: var(--mono);
        font-weight: 700;
        text-align: center;
        font-size: var(--20px);
        padding: 0;
        margin: 0.25rem 0 1rem 0;
    }

    .img-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    img {
        width: 4rem;
        aspect-ratio: 1;
    }

    :global(.block a) {
        color: var(--fanfic-black);
    }

    p {
        font-family: var(--sans);
        line-height: 1.65;
    }

    @media (max-width: 800px) {
        .chart-container {
            flex-direction: column;
        }

        .block {
            width: 100%;
        }
    }
</style>