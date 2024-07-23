<script>
    export let section;
    import Prose from "$components/Prose.svelte";
    import InlineChart from "$components/InlineChart.svelte";
    import FullChart from "$components/FullChart.svelte";

    import copy from "$data/copy.json";

    const sectionCopy = copy[section];

    // console.log(sectionCopy)
</script>

<section id="{section}-slide">
    {#each sectionCopy as chunk, i}
            {#if chunk.contentType == "prose"}
                <div class="prose">
                    <Prose copy={chunk.text}/>
                </div>
                {:else if chunk.contentType == "hed"}
                    <div class="hed">
                        <h3>{chunk.hed}</h3>
                    </div>
                {:else if chunk.contentType == "quote"}
                    <div class="quote">
                        <p>{chunk.text}</p>
                        <p>{chunk.attribution}</p>
                    </div>
                {:else if chunk.contentType == "inlineChart"}
                    <div class="inline-chart">
                        <InlineChart />
                    </div>
                {:else if chunk.contentType == "fullChart"}
                    <div class="full-chart">
                        <FullChart />
                    </div>
            {/if}
    {/each}  
</section>

<style>
    .prose, .hed, .inline-chart {
        max-width: 700px;
        margin: 0 auto;
    }

    .inline-chart {
        height: 500px;
        background: var(--color-gray-400);
        margin: 2rem auto;
    }

    .full-chart {
        width: 100%;
        margin: 0;
        height: 500px;
        background: var(--color-gray-400);
    }
</style>