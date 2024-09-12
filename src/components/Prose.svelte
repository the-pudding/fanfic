<script>
    export let copy;
</script>

{#each copy as text, i}
    <p>{@html text.value}</p>
{/each}

<style>
    p {
        font-size: var(--18px);
        line-height: 1.85;
        margin: 2rem 0;
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

    :global(span.ship a:hover) {
        background-color: var(--fanfic-blue);
        color: white;
    }

    @media (max-width: 600px) {
        p {
            font-size: var(--16px);
            line-height: 1.65;
            margin: 1.5rem 0;
        }
    }
</style>