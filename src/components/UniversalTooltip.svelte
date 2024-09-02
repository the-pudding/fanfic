<script>
    import { uTooltipVisible } from "$stores/misc.js";

    $: innerWidth = 0;

    $: console.log($uTooltipVisible)
</script>

<svelte:window bind:innerWidth />

{#if innerWidth <= 600}
    <div class="u-tooltip-container" class:tooltipVisible={$uTooltipVisible}>
    </div>
{/if}

<style>
    .u-tooltip-container {
        width: 100%;
        background-color: white;
        color: var(--fanfic-black);
        padding: 0.75rem;
        border-top: 1px solid var(--fanfic-black);
        position: fixed;
        bottom: -6rem;
        left: 0;
        font-family: var(--mono);
        font-size: var(--12px);
        z-index: 1000;
        height: 6rem;
        transition: 0.5s bottom ease-in;
    }

    .tooltipVisible {
        bottom: 0rem;
        transition: 0.5s bottom ease-in;
    }

    :global(.u-tooltip-container p) {
        margin: 0;
        padding: 0;
        line-height: 1.25;
        font-size: var(--12px);
    }

    :global(.u-tooltip-container p span) {
        padding: 0.15rem;
    }

    :global(.u-tooltip-container .year, .u-tooltip-container .ship, .u-tooltip-container .fandom) {
        font-weight: 700;
    }

    :global(.u-tooltip-container .ship-text-Yes) {
        background-color: var(--fanfic-blue);
        padding: 0.15rem;
        color: white;
        font-weight: 700;
    }

    :global(.u-tooltip-container .ship-text-No) {
        background-color: var(--fanfic-red);
        padding: 0.15rem;
        color: white;
        font-weight: 700;
    }

    :global(.u-tooltip-container .ship-text-Semi-Canon) {
        background-color: var(--fanfic-green);
        padding: 0.15rem;
        color: white;
        font-weight: 700;
    }

    :global(.u-tooltip-container .canon-block::before, .u-tooltip-container .semi-block::before, .u-tooltip-container .noncanon-block::before){
        display: inline-block;
        position: relative;
        top: 0.05rem;
        content: "";
        width: 0.75rem;
        height: 0.75rem;
        margin: 0 0.25rem 0 0;
    }

    :global(.u-tooltip-container .noncanon-block::before) {
        background: var(--fanfic-blue);
    }

    :global(.u-tooltip-container .semi-block::before) {
        background: var(--fanfic-green);
    }

    :global(.u-tooltip-container .canon-block::before) {
        background: var(--fanfic-red);
    }
</style>