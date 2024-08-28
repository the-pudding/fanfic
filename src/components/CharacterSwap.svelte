<script>
    import Character from "$components/Character.svelte";
    import charactersData from "$data/INTRO/INTRO_characters.csv";
    import Icon from "$components/helpers/Icon.svelte";
    import Select from "$components/helpers/Select.svelte";
    import { characterPairSTORE } from "$stores/misc.js";
    import ChartHeader from "$components/chartpages/ChartHeader.svelte";
    import { fit, parent_style } from "@leveluptuts/svelte-fit";

    const leftData = charactersData.filter(d => d.position == "left");
    const rightData = charactersData.filter(d => d.position == "right");

    characterPairSTORE.set(generateRandom());

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

    function randomClick() {
        // When the random button is clicked, generate a new pair of random characters and set the store to them
        characterPairSTORE.set(generateRandom());
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
        <Character characterID={$characterPairSTORE[0]} position={"left"} />
        <Character characterID={$characterPairSTORE[1]} position={"right"} />
    </div>
	<div class="controls">
        <Select id="leftSelect" options={leftData} value={leftData[$characterPairSTORE[0]].character} position={"left"}/>
        <button on:click={randomClick} id="random-characters">
            <span>Random</span>
            <Icon name="shuffle" />
        </button>
        <Select id="rightSelect" options={rightData} value={rightData[$characterPairSTORE[1]].character} position={"right"}/>
    </div>
</section>

<style>
	#character-swap {
        width: 100%;
        aspect-ratio: 2 / 1;
        display: flex;
        max-width: 70rem;
        padding: 0.25rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: var(--fanfic-window-gray);
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
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
        gap: 1.5rem;
        justify-content: center;
        align-items: center;
    }

    button {
        display: flex;
        gap: 0.5rem;
        flex-direction: row;
        align-items: center;
        height: 50px;
        font-family: var(--mono);
    }

    #random-characters {
        background: var(--fanfic-blue);
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
        color: white;
    }

    :global(button svg) {
        margin-top: 0.25rem;
    }

    @media (max-width: 600px) {
        .instructions {
            font-size: 10px;
        }
        .controls {
            gap: 0.5rem;
        }
        button {
            height: 40px;
            font-size: var(--12px);
        }
    }
</style>
