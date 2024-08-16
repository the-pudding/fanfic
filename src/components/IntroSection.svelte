<script>
    import Prose from "$components/Prose.svelte";
    import InlineChart from "$components/InlineChart.svelte";
    import FullChart from "$components/FullChart.svelte";
    import IntroScroll from "$components/Intro.Scroll.svelte";
    import { fly } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';
    import inView from "$actions/inView.js";

    import copy from "$data/copy.json";

    let inViewTrigger = false;

    function inViewPopup() { inViewTrigger = true; }
    function exitViewPopup() { inViewTrigger = false; }
</script>

<section id="intro">
    <div class="prose">
        <Prose copy={copy.intro[0].text}/>
    </div>
    <div class="popups"
        use:inView={{ bottom: 100 }} 
        on:enter={inViewPopup}
        on:exit={exitViewPopup}
    >
        {#if inViewTrigger == true}
            <div 
                transition:fly={{ delay: 250, duration: 500, y: 500, opacity: 0.5, easing: sineInOut }}
                class="inline-chart inline-chart-sm" style="top:50px; left: 40%;"
            >
                <InlineChart chunk={copy.intro[1]} chartType={copy.intro[1].chartType} id={copy.intro[1].id} title={copy.intro[1].title}/>
            </div>
            <div 
                transition:fly={{ delay: 500, duration: 500, y: 500, opacity: 0.5, easing: sineInOut }}
                class="inline-chart inline-chart-sm" style="top:100px; left: 60%;"
            >
                <InlineChart chunk={copy.intro[2]} chartType={copy.intro[2].chartType} id={copy.intro[2].id} title={copy.intro[2].title}/>
            </div>
            <div 
                transition:fly={{ delay: 750, duration: 500, y: 500, opacity: 0.5, easing: sineInOut }}
                class="inline-chart inline-chart-lg" style="top:250px; left: 35%;"
            >
                <InlineChart chunk={copy.intro[3]} chartType={copy.intro[3].chartType} id={copy.intro[3].id} title={copy.intro[3].title}/>
            </div>
            <div 
                transition:fly={{ delay: 1000, duration: 500, y: 500, opacity: 0.5, easing: sineInOut }}
                class="inline-chart inline-chart-lg" style="top:300px; left: 69%;"
            >
                <InlineChart chunk={copy.intro[4]} chartType={copy.intro[4].chartType} id={copy.intro[4].id} title={copy.intro[4].title}/>
            </div>
        {/if}
    </div>
    <IntroScroll />
</section>

<style>
    section {
        width: 100%;
        opacity: 1;
    }

    #intro-slide {
        width: 100%;;
        opacity: 1;
    }

    .popups {
        width: 100%;
        position: relative;
        height: 100vh;
        padding: 4rem;
    }

    .prose, .hed, .inline-chart {
        max-width: 700px;
        margin: 0 auto;
        color: var(--color-white);
    }

    .inline-chart {
        position: absolute;
        transform: translate(-50%,0);
    }

    .inline-chart-sm {
        width: 360px;
        height: 200px;
    }

    .inline-chart-lg {
        width: 560px;
        height: 400px;
    }

    .full-chart {
        margin: 2rem auto;
    }

    .hed {
        position: relative;
        height: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
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