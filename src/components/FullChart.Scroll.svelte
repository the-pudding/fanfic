
<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import Scrolly from "$components/helpers/Scrolly.svelte";

    import data from "$data/SLASH/SLASH_topFandoms.csv";

    export let id;

    let scrollIndex;
    let steps = [0,1,2,3,4,5];
</script>

<section id="scrolly">
    <div class="sticky">
        <div class="chart-wrapper">
            {#each data as fandom}
                <div class="fandom-block"></div>
            {/each}
        </div>
    </div>
    <Scrolly bind:value={scrollIndex}>
        {#if steps}
            {#each steps as text, i}
                <div class="step">
                    <p>{@html i}</p>
                </div>
            {/each}
        {/if}
    </Scrolly>
    <div class="spacer" />
</section>

<style>
    .sticky {
		position: sticky;
        display: flex;
        justify-content: center;
        align-items: center;
		top: 6rem;
		transition: all 1s;
		height: 100vh;
        z-index: 1;
        overflow-x: hidden;
		pointer-events: none;
	}
    .chart-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        /* align-items: start;
        justify-content: flex-start; */
    }
    .fandom-block {
        width: 4%;
        height: 4%;
        aspect-ratio: 1;
        background: black;
        margin: 0.25rem;
    }
    .spacer {
		height: 75vh;
	}
	.step {
		height: 80vh;
		text-align: center;
        z-index: 1000;
        max-width: 30rem;
        margin: 0 auto;
		pointer-events: none;
	}
</style>