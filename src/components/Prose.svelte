<script>
    import inView from "$actions/inView.js";
    import { annotationVisible } from "$stores/misc.js";

    export let copy;

    function showAnno(annoID) {
        annotationVisible.set([true, +annoID]);
    }

    function hideAnno(annoID) {
        annotationVisible.set([false, +annoID]);
    }
</script>

{#each copy as text, i}
    {#if text.value.includes("annotrigger")}
    {@const annoID = text.value.split("annotrigger")[1].split(">")[0]}
    <p
        use:inView={{ bottom: 0 }}
        on:enter={() => showAnno(annoID)}
        on:exit={() => hideAnno(annoID)}
    >
        {@html text.value}</p>
    {:else}
        <p>{@html text.value}</p>
    {/if}
{/each}

<style>
    p {
        font-size: var(--18px);
        line-height: 1.85;
        margin: 2rem 0;
        font-weight: 500;
    }

    :global(.strong) {
        color: var(--fanfic-highlighter);
        font-weight: 700;
        font-family: var(--sans);
    }

    :global(a, .strong a) {
        color: var(--fanfic-highlighter);
        font-weight: 700;
        font-family: var(--sans);
    }

    :global(a:hover, .strong a:hover) {
        color: white;
    }

    :global(.quote a) {
        color: var(--fanfic-black);
    }

    :global(.ao3 a) {
        color: var(--fanfic-black);
        font-weight: 700;
        font-size: var(--14px);
        font-family: var(--mono);
        background-image: url("/assets/images/Archive_of_Our_Own_logo.png");
        background-size: 24px;
        background-repeat: no-repeat;
        background-position: 0 0.25rem;
        background-color: var(--fanfic-window-gray);
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
        padding: 0.35rem 0.35rem 0.35rem 2rem;
        white-space: nowrap;
    }

    :global(.ao3 a:hover) {
        background-color: var(--fanfic-blue);
        color: white;
        transform: scale(0.98);
    }

    :global(span.ship a) {
        color: var(--fanfic-black);
        font-weight: 700;
        font-size: var(--14px);
        font-family: var(--mono);
        background-color: var(--fanfic-window-gray);
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
        padding: 0.35rem;
        white-space: nowrap;
    }

    :global(#slash-slide span.ship a:hover) {
        background-color: var(--fanfic-blue);
        color: white;
    }

    :global(#noncanon-slide span.ship a:hover) {
        background-color: var(--fanfic-green);
        color: white;
    }

    :global(#realpeople-slide span.ship a:hover) {
        background-color: var(--fanfic-red);
        color: white;
    }

    :global(.span-black) {
        background-color: var(--fanfic-black);
        color: white;
        font-weight: 700;
        font-family: var(--sans);
        padding: 0.25rem;
    }

    :global(.span-blue) {
        background-color: var(--fanfic-blue);
        color: white;
        font-weight: 700;
        font-family: var(--sans);
        padding: 0.25rem;
    }

    :global(#slash-slide .span-blue) {
        border: 1px solid white;
    }

    :global(.span-red) {
        background-color: var(--fanfic-red);
        color: white;
        font-weight: 700;
        font-family: var(--sans);
        padding: 0.25rem;
    }

    :global(#realpeople-slide .span-red) {
        border: 1px solid white;
    }

    :global(.span-green) {
        background-color: var(--fanfic-green);
        color: white;
        font-weight: 700;
        font-family: var(--sans);
        padding: 0.25rem;
    }

    :global(.span-moss) {
        background-color: #96AC0B;
        color: var(--fanfic-black);
        font-weight: 700;
        font-family: var(--sans);
        padding: 0.25rem;
    }

    :global(.span-gray) {
        background-color: var(--fanfic-window-gray);
        color: var(--fanfic-black);
        font-weight: 700;
        font-family: var(--sans);
        padding: 0.25rem;
    }

    @media (max-width: 600px) {
        p {
            font-size: var(--16px);
            line-height: 1.65;
            margin: 1.5rem 0;
        }

        :global(span.ship a) {
            padding: 0.25rem;
        }
    }

    @media (max-width: 400px) {
        :global(span.ship a) {
            font-size: var(--12px);
        }
    }
</style>