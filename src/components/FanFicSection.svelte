<script>
    export let section;
    import Prose from "$components/Prose.svelte";
    import InlineChart from "$components/InlineChart.svelte";
    import FullChart from "$components/FullChart.svelte";
    import { currSectionSTORE } from "$stores/misc.js";

    import copy from "$data/copy.json";

    let sectionCopy = copy[section];


    $: isActive = $currSectionSTORE == section ? true : false;
</script>

<section id="{section}-slide" class:isActive={isActive}>
    {#if sectionCopy !== undefined}
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
                            <InlineChart chartType={chunk.chartType} id={chunk.id} title={chunk.title}/>
                        </div>
                    {:else if chunk.contentType == "fullChart"}
                        <div class="full-chart">
                            <FullChart />
                        </div>
                {/if}
        {/each} 
    {/if} 
</section>

<style>
    section {
        border: 1px solid red;
        width: 90vw;
        opacity: 0.5;
    }
    section.isActive {
        opacity: 1;
    }
    .prose, .hed, .inline-chart {
        max-width: 700px;
        margin: 0 auto;
    }

    .inline-chart {
        margin: 2rem auto;
    }

    .full-chart {
        width: 100%;
        margin: 0;
        height: 500px;
        background: var(--color-gray-400);
    }
</style>