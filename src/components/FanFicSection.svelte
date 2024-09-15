<script>
    export let section;
    import OpeningShip from "$components/OpeningShip.svelte";
    import Prose from "$components/Prose.svelte";
    import SectionSubhed from "$components/SectionSubhed.svelte";
    import Quote from "$components/Quote.svelte";
    import InlineChart from "$components/chartpages/inline/InlineChart.svelte";
    import FullChart from "$components/chartpages/full/FullChart.svelte";
    import { currSectionSTORE } from "$stores/misc.js";

    import copy from "$data/copy.json";

    let sectionCopy = copy[section];


    $: isActive = $currSectionSTORE == section ? true : false;
</script>


<section id="{section}-slide" class:isActive={isActive}>
    <div class="texture-slide"></div>
    <div class="content-slide">
    {#if sectionCopy !== undefined}
        {#each sectionCopy as chunk, i}
                {#if chunk.contentType == "openingShip"}
                    <div class="opening-ship">
                        <OpeningShip copy={chunk}/>
                    </div>
                    {:else if chunk.contentType == "prose"}
                        <div class="prose">
                            <Prose copy={chunk.text}/>
                        </div>
                    {:else if chunk.contentType == "hed"}
                        <div class="hed">
                            <SectionSubhed copy={chunk.hed} />
                        </div>
                    {:else if chunk.contentType == "quote"}
                        <Quote copy={chunk}/>
                    {:else if chunk.contentType == "inlineChart"}
                        <div class="inline-chart">
                            <InlineChart chunk={chunk} chartType={chunk.chartType} id={chunk.id} title={chunk.title}/>
                        </div>
                    {:else if chunk.contentType == "fullChart"}
                        <div class="full-chart">
                            <FullChart chunk={chunk} chartType={chunk.chartType} id={chunk.id} title={chunk.title} />
                        </div>
                {/if}
        {/each} 
    {/if} 
</div>
</section>

<style>
    section {
        opacity: 1;
    }
    section.isActive {
        opacity: 1;
    }
    #slash-slide {
        background: var(--fanfic-blue);
        z-index: -1;
        padding: 0 2rem 10rem 2rem;
        width: 98vw;
    }

    #slash-slide .texture-slide {
        position: sticky;
		top: 0;
		left: 0;
		width: 96vw;
		height: 100vh;
		pointer-events: none;
		z-index: -1;
		background: url("/assets/images/tree-ascii.png");
		opacity: 0.2;
	}

    .content-slide {
        transform: translate(0, -100vh);
	}

    #noncanon-slide {
        background: var(--fanfic-green);
        padding: 0 2rem 10rem 2rem;
        width: 96vw;
    }

    #noncanon-slide .texture-slide {
        transform: translate(-3vw, 0);
        position: sticky;
		top: 0;
		width: 96vw;
		height: 100vh;
		pointer-events: none;
		background: url("/assets/images/wave-ascii.png");
		opacity: 0.4;
	}

    #realpeople-slide {
        background: var(--fanfic-red);
        padding: 0 2rem 10rem 2rem;
        width: 98vw;
    }

    #realpeople-slide .texture-slide {
        position: sticky;
        transform: translate(-3vw, 0);

		top: 0;
        left: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		background: url("/assets/images/mountain-ascii.png");
		opacity: 0.4;
	}

    .prose, .inline-chart {
        max-width: 700px;
        margin: 0 auto;
        color: var(--color-white);
    }

    :global(.prose-transition p) {
        font-family: var(--sans);
    }

    .opening-ship {
        max-width: 1400px;
        margin: 0 auto; 
    }
    .inline-chart {
        margin: 4rem auto;
    }

    .full-chart {
        margin: 4rem auto;
    }

    .hed {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 6rem auto 0 auto;
    }

    .hed-script, .hed-sans {
        position: absolute;
    }

    .hed-script {
        font-family: var(--script);
        opacity: 0.25;
        font-size: 100px;
    }

    .hed-sans {
        font-family: var(--sans);
    }
</style>