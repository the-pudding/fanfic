<script>
	export let characterID;
    export let position;

    import { fly } from 'svelte/transition';
    import { characterPairSTORE } from "$stores/misc.js";

    let forceFlyLeft = false;
    let forceFlyRight = false;
    const flyDir = position == "left" ? -200 : 200;

    function storeChangeLeft() {
        forceFlyLeft = false;
        setTimeout(() => {
            forceFlyLeft = true;
        }, 500);
    }

    function storeChangeRight() {
        forceFlyRight = false;
        setTimeout(() => {
            forceFlyRight = true;
        }, 500);
    }

    $: leftSTORE = $characterPairSTORE[0];
    $: rightSTORE = $characterPairSTORE[1];

    $: leftSTORE, storeChangeLeft();
    $: rightSTORE, storeChangeRight();
</script>

<div class="character character_{position}">
    <!-- {#if forceFly} -->
        <div class="fly-container fly-container_{position}" class:forceFlyLeft={forceFlyLeft} class:forceFlyRight={forceFlyRight}>
            <img transition:fly={{ delay: 250, duration: 300, x: flyDir}} src="/assets/images/characters/character{characterID}_{position}.png" alt="character"/>
        </div>
    <!-- {/if} -->
</div>

<style>
	.character {
        width: calc(50% - 2rem);
        height: 100%;
        overflow-y: hidden;
    }

    .fly-container_left {
        transform: translateX(-100%);
        transition: transform 0.25s;
    }

    .fly-container_right {
        transform: translateX(100%);
        transition: transform 0.25s;
    }

    .fly-container_left.forceFlyLeft, .fly-container_right.forceFly {
        transform: translateX(0%);
    }

    .fly-container_right.forceFlyRight {
        transform: translateX(0%);
    }
</style>
