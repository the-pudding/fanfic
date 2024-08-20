<script>
    import inView from "$actions/inView.js";
    import { fly } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';

    export let copy;

    let inViewTrigger = false;

    // Uses inView on "quote" to trigger flying window divs	
    function inViewQuote() { inViewTrigger = true; }
    function exitViewQuote() { inViewTrigger = false; }
</script>

<div class="quote"
    use:inView={{ bottom: 100 }} 
    on:enter={inViewQuote}
    on:exit={exitViewQuote}
>
    {#if inViewTrigger == true}
        <div class="bg" transition:fly={{ delay: 750, duration: 250, y: 100, opacity: 0, easing: sineInOut }}></div>
        <div class="bg" transition:fly={{ delay: 500, duration: 250, y: 100, opacity: 0, easing: sineInOut }}></div>
        <div class="real"
        transition:fly={{ delay: 250, duration: 250, y: 100, opacity: 0, easing: sineInOut }}
        >
            <div class="attribution">
                <img src="" />
                <div class="credit">
                    <p class="name">{copy.attribute}</p>
                    <p class="title">{copy.title}</p>
                </div>
            </div>
            <p class="text">{copy.text}</p>
        </div>
    {/if}
</div>

<style>
    .quote {
        position: relative;
        max-width: 550px;
        margin: 0 auto;
        height: 300px;
    }

    .real, .bg {
        border-width:2px;
        border-color:#FFFFFF #808080 #808080 #FFFFFF;
        border-style:solid;
        width: 100%;
        margin: 0;
        background: var(--fanfic-highlighter);
        padding: 1rem;
        position: absolute;
        height: 300px;
    }

    .bg{
        top: 0.5rem;
        left: -0.5rem;
    }

    .bg:first-of-type  {
        top: 1rem;
        left: -1rem;
    }

    .attribution {
        display: flex;
        flex-direction: row;
    }

    .attribution img {
        width: 5rem;
        height: 5rem;
        background: var(--fanfic-window-gray);
        margin: 0 1rem 0 0;
    }

    .credit {
        width: calc(100% - 6rem);
    }

    .name {
        margin: 0;
        font-family: var(--mono);
        font-weight: 700;
        text-transform: uppercase;
    }

    .title {
        margin: 0;
        font-family: var(--mono);
        font-size: var(--14px);
    }

    .text {
        font-family: var(--sans);
        font-size: var(--18px);
        font-weight: 700;
    }
</style>