<script>
    import { fly } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';
    import CharacterSwap from "$components/CharacterSwap.svelte";
    import Prose from "$components/Prose.svelte";
    import InlineChart from "$components/chartpages/inline/InlineChart.svelte";
    import IntroScroll from "$components/Intro.Scroll.svelte";
    import Sparkles from "$components/Sparkles.svelte";
    import inView from "$actions/inView.js";
    import copy from "$data/copy.json";

    let inViewTrigger = false;
    let introW;
    let introH;

    // Uses inView on "popup" to trigger flying window divs	
    function inViewPopup() { inViewTrigger = true; }
    function exitViewPopup() { inViewTrigger = false; }
</script>

<section id="intro" 
    bind:clientWidth={introW}
    bind:clientHeight={introH}
>
    <CharacterSwap />
    <div class="headline-container">
        <h1>Who Gets</h1>
        <h1>Shipped</h1>
        <h1>And Why?</h1>
    </div>
    <p class="byline">
        By Ashley Cai, Florina Sutanto, Jan Diehm, & Caitlyn Ralph
    </p>
    <div class="prose">
        <Prose copy={copy.intro[0].text}/>
    </div>
    <div class="popups"
        use:inView={{ bottom: 100 }} 
        on:enter={inViewPopup}
        on:exit={exitViewPopup}
    >
        {#if inViewTrigger == true}
            <div class="fly-box left-fly">
                <div 
                    transition:fly={{ delay: 250, duration: 500, y: 500, easing: sineInOut }}
                    class="inline-chart inline-chart-sm"
                >
                    <InlineChart chunk={copy.intro[1]} chartType={copy.intro[1].chartType} id={copy.intro[1].id} title={copy.intro[1].title}/>
                </div>
                <div 
                    transition:fly={{ delay: 750, duration: 500, y: 500, easing: sineInOut }}
                    class="inline-chart inline-chart-lg"
                >
                    <InlineChart chunk={copy.intro[3]} chartType={copy.intro[3].chartType} id={copy.intro[3].id} title={copy.intro[3].title}/>
                </div>
            </div>
            <div class="fly-box right-fly">
                <div 
                    transition:fly={{ delay: 500, duration: 500, y: 500, easing: sineInOut }}
                    class="inline-chart inline-chart-sm"
                >
                    <InlineChart chunk={copy.intro[2]} chartType={copy.intro[2].chartType} id={copy.intro[2].id} title={copy.intro[2].title}/>
                </div>
                <div 
                    transition:fly={{ delay: 1000, duration: 500, y: 500, opacity: 0.5, easing: sineInOut }}
                    class="inline-chart inline-chart-lg"
                >
                    <InlineChart chunk={copy.intro[4]} chartType={copy.intro[4].chartType} id={copy.intro[4].id} title={copy.intro[4].title}/>
                </div>
            </div>
        {/if}
    </div>
    <IntroScroll />
    {#if introW && introH}
        <Sparkles {introW} {introH}/>
    {/if}
</section>

<style>
    section {
        width: 100%;
        opacity: 1;
        padding: 0 1rem;
    }

    #intro-slide {
        width: 100%;;
        opacity: 1;
    }
    
    .headline-container {
        width: 100%;
        padding: 1rem;
        margin: 4rem auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        color: var(--fanfic-pink);
        text-transform: uppercase;
        font-family: var(--mono);
        font-weight: 300;
        margin: 0;
        padding: 0;
        font-size: 100px;
        line-height: 0.85;
    }

    h1:first-of-type {
        margin-right: 30%;
    }

    h1:last-of-type {
        margin-left: 30%;
        color: var(--fanfic-highlighter);
        font-family: var(--script);
        text-transform: none;
        font-size: 150px
    }

    .byline {
        color: var(--fanfic-highlighter);
        font-family: var(--mono);
        text-transform: uppercase;
        font-weight:700;
        margin: 0 auto;
        max-width: 700px;
    }

    .popups {
        width: 100%;
        position: relative;
        height: 100vh;
        max-width: 1100px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
    }

    .prose, .hed, .inline-chart {
        max-width: 700px;
        margin: 0 auto;
        color: var(--color-white);
    }

    .fly-box {
        width: 50%;
        position: relative;
    }

    .left-fly .inline-chart:nth-of-type(1) {
        top: 0;
        left: 0;
    }

    .left-fly .inline-chart:nth-of-type(2) {
        top: 20%;
        left: 5%;
    }

    .right-fly .inline-chart:nth-of-type(1) {
        top: 5%;
        right: 10%;
    }

    .right-fly .inline-chart:nth-of-type(2) {
        top: 25%;
        right: 5%;
    }


    .inline-chart {
        position: absolute;
    }

    .inline-chart-sm {
        width: 90%;
        max-width: 500px;
        height: 200px;
    }

    .inline-chart-lg {
        width: 90%;
        max-width: 500px;
        height: 400px;
    }

    .full-chart {
        margin: 2rem auto;
    }

    @media (max-width: 600px) {
        h1:first-of-type {
            margin-right: 0%;
        }
        h1, h1:last-of-type {
            font-size: 58px;
        } 
        h1:last-of-type {
            margin-left: 0%;
        }
        .popups {
            padding: 0;
            flex-direction: column;
            height: auto;
        }
        .fly-box {
            width: 100%;
        }
        .inline-chart {
            width: 100%;
            position: relative;
            height: auto;
            margin: 2rem 0;
        }
        .left-fly .inline-chart:nth-of-type(1), .left-fly .inline-chart:nth-of-type(2),
        .right-fly .inline-chart:nth-of-type(1), .right-fly .inline-chart:nth-of-type(2) {
            top: auto;
            left: auto;
            right: auto;
        }
    }
</style>