<script>
	import { getContext } from "svelte";
    import top20Data from "$data/INTRO/INTRO_top20.csv";
    import IntroTableChunk from "$components/Intro.Table.Chunk.svelte"
	// import Footer from "$components/Footer.svelte";

	// const copy = getContext("copy");
	// const data = getContext("data");

	export let scrollIndex;

    let innerWidth;


    function calNumChunks(innerWidth) {
        let chunks = innerWidth < 900 ? [0,1] : [0,1,2,3];
        return chunks;
    }

    function calChunksData(numChunks, sets) {
        if (numChunks.length > 1) {
            let chunksData = numChunks.map((d, i) => ({
                ...d,
                start: i*sets,
                end: i*sets + sets,
                sets: sets
            }));
            return chunksData;
        } else {
            return 0;
        }
    }

    function calcSets(numChunks) {
        if (numChunks.length > 1) {
            let sets = 20/numChunks.length;
            return sets
        } else {
            return 0;
        }
    }

    $: numChunks = calNumChunks(innerWidth);
    $: sets = calcSets(numChunks);
    $: chunksData = calChunksData(numChunks, sets);
</script>

<svelte:window bind:innerWidth />

<section id="intro-table">
    <div class="chunk">
        {#if (numChunks.length > 1)}
            {#each chunksData as chunk, i}
                <IntroTableChunk
                    start={chunk.start} 
                    end={chunk.end} 
                    set={i}
                    totalSets={chunk.sets}
                    scrollIndex={scrollIndex}
                />
            {/each}
        {/if}
    </div>
</section>


<style>
    #intro-table {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .chunk {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
</style>
