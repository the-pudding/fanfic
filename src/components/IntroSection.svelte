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
    import Cursor from "$svg/cursor-pixel.svg";

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
    <div class="byline-wrapper">
        <div class="top-byline">
            <p class="byline">By</p>
            <p class="byline">
                <img src="./assets/images/quote-icons/ashley-cai.png" /><a href="">Ashley Cai</a>
            </p>
            <p class="byline">
                <img src="./assets/images/quote-icons/florina-sutanto.png" /><a href="">Florina Sutanto</a>
            </p>
            <p class="byline">    
                <img src="./assets/images/quote-icons/jan-diehm.png" /><a href="https://pudding.cool/author/jan-diehm/">Jan Diehm</a>
            </p>
            <p class="byline"> 
                <img src="./assets/images/quote-icons/caitlyn-ralph.png" /><a href="https://pudding.cool/author/caitlyn-ralph/">Caitlyn Ralph</a>
            </p>
        </div>
        <p class="with">With data from <a href="https://centrumlumina.tumblr.com/">centreoftheselights</a></p>
    </div>
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
                <!-- <div 
                    transition:fly={{ delay: 250, duration: 500, y: 500, easing: sineInOut }}
                    class="inline-chart inline-chart-sm"
                >
                    <InlineChart chunk={copy.intro[1]} chartType={copy.intro[1].chartType} id={copy.intro[1].id} title={copy.intro[1].title}/>
                </div> -->
                <div 
                    transition:fly={{ delay: 750, duration: 500, y: 500, easing: sineInOut }}
                    class="inline-chart inline-chart-lg"
                >
                    <InlineChart chunk={copy.intro[3]} chartType={copy.intro[3].chartType} id={copy.intro[3].id} title={copy.intro[3].title}/>
                </div>
            </div>
            <div class="fly-box right-fly">
                <!-- <div 
                    transition:fly={{ delay: 500, duration: 500, y: 500, easing: sineInOut }}
                    class="inline-chart inline-chart-sm"
                >
                    <InlineChart chunk={copy.intro[2]} chartType={copy.intro[2].chartType} id={copy.intro[2].id} title={copy.intro[2].title}/>
                </div> -->
                <div 
                    transition:fly={{ delay: 1000, duration: 500, y: 500, opacity: 0.5, easing: sineInOut }}
                    class="inline-chart inline-chart-lg"
                >
                    <InlineChart chunk={copy.intro[4]} chartType={copy.intro[4].chartType} id={copy.intro[4].id} title={copy.intro[4].title}/>
                </div>
            </div>
        {/if}
    </div>
    <div class="prose prose-transition">
        <Prose copy={copy.intro[5].text}/>
    </div>
    <IntroScroll />
    <div class="prose prose-transition">
        <div class="cursor-icon">
            {@html Cursor}
        </div>
        <p>Now let's explore each of these three themes. Use the top tab buttons or the side arrow buttons to switch between chapters.</p>
    </div>
    {#if introW && introH}
        <Sparkles {introW} {introH}/>
    {/if}
</section>

<style>
    section {
        width: 100%;
        opacity: 1;
        padding: 0 1rem 3rem 1rem;
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
        font-family: var(--sans);
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

    .byline-wrapper {
        margin: 0 auto;
        max-width: 700px;
        flex-wrap: wrap;
    }

    .top-byline {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .byline {
        line-height: 1.25;
        padding: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0.25rem 0.75rem 0.25rem 0;
        color: var(--fanfic-highlighter);
        font-family: var(--sans);
        text-transform: uppercase;
        font-weight:700;
    }

    .byline a {
        font-family: var(--sans);
    }

    .byline img {
        width: 32px;
        height: 32px;
        margin-right: 0.25rem;
    }

    .with {
        color: var(--fanfic-highlighter);
        font-family: var(--sans);
        font-style: italic;
        font-size: var(--12px);
    }

    .popups {
        width: 100%;
        position: relative;
        height: 100vh;
        max-width: 1100px;
        margin: 0 auto 0 auto;
        display: flex;
        flex-direction: row;
        z-index: 1000;
        justify-content: center;
        gap: 4rem;
    }

    .prose, .hed, .inline-chart {
        max-width: 700px;
        margin: 0 auto;
        color: var(--color-white);
    }

    :global(.prose-transition p) {
        font-family: var(--sans);
        font-size: var(--22px);
        line-height: 1.25;
        margin: 1rem auto 5rem auto !important;
        text-align: center;
        font-style: italic;
        color: var(--fanfic-highlighter);
        max-width: 500px;
    }

    .cursor-icon {
        width: 2.5rem;
        height: 2.5rem;
        margin: 0 auto;
        animation: shake 1.5s cubic-bezier(.36,.07,.19,.97) infinite;
        transform: translate3d(0, 0, 0);
    }

    :global(.cursor-icon svg polygon) {
        fill: var(--fanfic-highlighter);
    }

    .fly-box {
        width: calc(50% - 2rem);
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .left-fly .inline-chart:nth-of-type(1) {
        top: 20%;
        left: 0;
    }

    .right-fly .inline-chart:nth-of-type(1) {
        top: 25%;
        right: 0;
    }


    .inline-chart {
        position: absolute;
    }

    .inline-chart-sm {
        width: 100%;
        height: 200px;
    }

    .inline-chart-lg {
        width: 100%;
        height: 400px;
    }

    .full-chart {
        margin: 2rem auto;
    }

    @media (max-width: 800px) {
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
        .byline {
            font-size: var(--12px);
            margin: 0.25rem 0.5rem 0.25rem 0;
        }
        :global(.prose-transition p) {
            font-size: var(--18px);
        }
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
</style>