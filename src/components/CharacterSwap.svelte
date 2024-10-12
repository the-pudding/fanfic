<script>
    import Character from "$components/Character.svelte";
    import charactersData from "$data/INTRO/INTRO_characters.csv";
    import Icon from "$components/helpers/Icon.svelte";
    import Select from "$components/helpers/Select.svelte";
    import { characterPairSTORE, forceFlyLeft, forceFlyRight } from "$stores/misc.js";
    import { tick, onDestroy, onMount } from 'svelte';
    import ChartHeader from "$components/chartpages/ChartHeader.svelte";
    import { fit, parent_style } from "@leveluptuts/svelte-fit";
    import Shuffle from "$svg/shuffle-pixel.svg";

    const leftData = charactersData.filter(d => d.position == "left");
    const rightData = charactersData.filter(d => d.position == "right");
    let shake = true; 

    onMount(() => {
        setTimeout(() => {
            forceFlyLeft.set(true);
            forceFlyRight.set(true);
        }, 400); 
    })

    function generateRandom() {
        const min = 1;
        const max = leftData.length - 1;
        // Generates a random integer between min (included) and max (included)
        const leftCharacter = Math.floor(Math.random() * (max - min + 1)) + min;
        const rightCharacter = Math.floor(Math.random() * (max - min + 1)) + min;

        // Only if the characters need to be different
        // rightCharacter = leftCharacter == rightCharacter ? (rightCharacter % max) + 1 : rightCharacter;
        return [leftCharacter, rightCharacter]
    }

    async function randomClick() {
        await tick();

        let prevChars = $characterPairSTORE;
        let currChars = generateRandom();

        if (prevChars[0] !== currChars[0] && prevChars[1] !== currChars[1]) {
            forceFlyLeft.set(false);
            forceFlyRight.set(false);
            setTimeout(() => {
                characterPairSTORE.set(currChars);
                forceFlyLeft.set(true);
                forceFlyRight.set(true);
            }, 400);
        } else if (prevChars[0] !== currChars[0] && prevChars[1] == currChars[1]){
            forceFlyLeft.set(false);
            setTimeout(() => {
                characterPairSTORE.set([currChars[0], prevChars[1]]);
                forceFlyLeft.set(true);
            }, 400);
        } else if (prevChars[0] == currChars[0] && prevChars[1] !== currChars[1]) {
            forceFlyRight.set(false);
            setTimeout(() => {
                characterPairSTORE.set([prevChars[0], currChars[1]]);
                forceFlyRight.set(true);
            }, 400);
        } else {
            forceFlyLeft.set(true);
            forceFlyRight.set(true);
        }
        shake = false;
    }

    // If the left character changes reset animation
    async function storeChangeLeft() {
        await tick();
        forceFlyLeft = false;
        setTimeout(() => {
            forceFlyLeft = true;
        }, 500);
    }

    // Everytime the character pair changes
    $: characterPairSTORE.set(generateRandom());
</script>

<section id="character-swap">
    <ChartHeader title={"Build your own ship"}/>
    <p class="instructions">Press the buttons below to swap the characters</p>
    <div class="stage">
        <div class="text-fit-wrapper" style={parent_style}>
            <p use:fit={{min_size: 12, max_size:400 }} class="stage-bg">The Pudding</p>
        </div>
        <Character characterID={$characterPairSTORE[0]} position={"left"}/>
        <Character characterID={$characterPairSTORE[1]} position={"right"}/>
    </div>
	<div class="controls">
        <Select id="leftSelect" label="left character select" options={leftData} value={leftData[$characterPairSTORE[0]].character} position={"left"}/>
        <button on:click={randomClick} id="random-characters" class:shake={shake}>
            <span>Random</span>
            {@html Shuffle}
        </button>
        <Select id="rightSelect" label="right character select" options={rightData} value={rightData[$characterPairSTORE[1]].character} position={"right"}/>
    </div>
</section>

<style>
	#character-swap {
        width: 100%;
        aspect-ratio: 2 / 0.9;
        display: flex;
        margin: 0 auto;
        max-width: 60rem;
        padding: 0.25rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: var(--fanfic-window-gray);
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
        z-index: 1000;
        position: relative;
    }

    .text-fit-wrapper {
        position: absolute;
    }

    h3 {
        width: 100%;
        background: var(--fanfic-blue);
        color: var(--fanfic-highlighter);
        font-family: var(--mono);
        text-transform: uppercase;
        text-align: center;
        margin: 0;
        font-size: var(--18px);
        padding: 0.25rem 0;
    }

    .instructions {
        width: 100%;
        background: var(--fanfic-highlighter);
        color: var(--fanfic-black);
        font-family: var(--mono);
        text-transform: uppercase;
        text-align: center;
        margin: 0;
        font-size: var(--14px);
        padding: 0.25rem 0;
    }

    .stage {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background: var(--color-white);
        overflow: hidden;
        position: relative;
    }

    .stage-bg {
        position: absolute;
        margin: 0;
        font-family: var(--script);
        color: var(--fanfic-blue);
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 200px;
        pointer-events: none;
        text-wrap: nowrap;

    }
    .controls {
        margin: 1rem auto;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0 2rem;
    }

    button {
        display: flex;
        gap: 0.5rem;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 50px;
        font-family: var(--mono);
        font-size: var(--14px);
    }

    .shake {
        animation: shake 1.5s cubic-bezier(.36,.07,.19,.97) infinite;
        transform: translate3d(0, 0, 0);
    }

    #random-characters {
        background: var(--fanfic-blue);
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
        color: white;
    }

    #random-characters:hover {
        transform: scale(0.98);
    }

    :global(#random-characters svg) {
        width: 1.25rem;
        margin-top: 0;
    }

    :global(#random-characters svg rect, #random-characters svg polygon) {
        fill: white;
    }

    @media (max-width: 600px) {
        .instructions {
            font-size: 10px;
        }
        .controls {
            gap: 0.5rem;
            padding: 0;
        }
        button {
            height: 40px;
            width: 60px;
            font-size: var(--12px);
        }
        :global(#random-characters svg) {
            width: 0.75rem;
            margin-top: 0;
        }
        #random-characters span {
            display: none;
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

    @media (prefers-reduced-motion: reduce) {
        .shake {
            animation: none;
        } 
    }
</style>
