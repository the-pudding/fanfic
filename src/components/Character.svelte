<script>
	export let characterID;
    export let position;

    import { fly } from 'svelte/transition';
    import { characterPairSTORE } from "$stores/misc.js";

    let forceFlyLeft = false;
    let forceFlyRight = false;
    const flyDir = position == "left" ? -200 : 200;

    // If the left character changes reset animation
    function storeChangeLeft() {
        forceFlyLeft = false;
        setTimeout(() => {
            forceFlyLeft = true;
        }, 500);
    }

     // If the right character changes reset animation
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
    <div class="fly-container fly-container_{position}" class:forceFlyLeft={forceFlyLeft} class:forceFlyRight={forceFlyRight}>
        <img transition:fly={{ delay: 250, duration: 300, x: flyDir}} src="./assets/images/characters/character{characterID}_{position}.png" alt="character"/>
    </div>
</div>

<style>
	.character {
        width: calc(50% - 2rem);
        height: 100%;
    }

    .fly-container_left {
        height: 100%;
        transform: translateX(-100%);
        transition: transform 0.25s;
    }

    .fly-container_right {
        height: 100%;
        transform: translateX(100%);
        transition: transform 0.25s;
    }

    .fly-container_left.forceFlyLeft, .fly-container_right.forceFly {
        transform: translateX(62%);
    }

    .fly-container_right.forceFlyRight {
        transform: translateX(-18%);
    }

    img {
        height: 150%;
    }
</style>
