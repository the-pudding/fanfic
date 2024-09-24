<script>
    export let section;
    import OpeningShip from "$components/OpeningShip.svelte";
    import Prose from "$components/Prose.svelte";
    import SectionSubhed from "$components/SectionSubhed.svelte";
    import Quote from "$components/Quote.svelte";
    import InlineChart from "$components/chartpages/inline/InlineChart.svelte";
    import FullChart from "$components/chartpages/full/FullChart.svelte";
    import { currSectionSTORE } from "$stores/misc.js";
    import Cursor from "$svg/cursor-pixel.svg";

    import copy from "$data/copy.json";

    let sectionCopy = copy[section];


    $: isActive = $currSectionSTORE == section ? true : false;
</script>

<section id="{section}-slide" class:isActive={isActive}>
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
    <div class="bottom-hint">
        <div class="cursor-icon">
            {@html Cursor}
        </div>
        <p>You've reached the end of this chapter. Use the top tab buttons or the side arrow buttons to switch between chapters.</p>
    </div>
</section>

<style>
    section {
        opacity: 1;
        background-image: url("/assets/images/cloud-ascii-opacity.png");
    }
    section.isActive {
        opacity: 1;
    }
    #slash-slide {
        background-color: var(--fanfic-blue);
        padding: 0 2rem 10rem 2rem;
        width: 98vw;
    }

    #noncanon-slide {
        background-color: var(--fanfic-green);
        padding: 0 2rem 10rem 2rem;
        width: 96vw;
    }

    #realpeople-slide {
        background-color: var(--fanfic-red);
        padding: 0 2rem 10rem 2rem;
        width: 98vw;
    }

    .prose, .inline-chart {
        max-width: 700px;
        margin: 0 auto;
        color: var(--color-white);
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
        flex-direction: column;
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

    .cursor-icon {
        width: 2.5rem;
        height: 2.5rem;
        margin: 0 auto;
        animation: shake 1.5s cubic-bezier(.36,.07,.19,.97) infinite;
        transform: translate3d(0, 0, 0);
    }

    .bottom-hint {
        margin-top: 4rem;
    }

    .bottom-hint p {
        font-family: var(--sans);
        font-size: var(--22px);
        line-height: 1.25;
        margin: 1rem auto;
        text-align: center;
        font-style: italic;
        color: var(--fanfic-highlighter);
        max-width: 500px;
    }

    @keyframes shake {
        10%, 90% {
            transform: translate3d(-1px, 0, 0);
        }
        
        20%, 80% {
            transform: translate3d(1px, 0, 0);
        }

        30%, 50%, 70% {
            transform: translate3d(-2px, 0, 0);
        }

        40%, 60% {
            transform: translate3d(2px, 0, 0);
        }
    }

    @media (max-width: 600px) {
        #slash-slide, #noncanon-slide, #realpeople-slide {
            padding: 0 1.25rem 10rem 1.25rem;
        }
        .hed {
            margin: 2rem auto 0 auto;
        }
	}
</style>