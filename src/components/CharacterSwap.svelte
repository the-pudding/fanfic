<script>
    import Character from "$components/Character.svelte";
    import charactersData from "$data/characters.csv";
    import Icon from "$components/helpers/Icon.svelte";
    import Select from "$components/helpers/Select.svelte";
    import { characterPairSTORE } from "$stores/misc.js";

    characterPairSTORE.set(generateRandom());

    function generateRandom() {
        const min = 1;
        const max = charactersData.length - 1;
        const leftCharacter = Math.floor(Math.random() * (max - min + 1)) + min;
        let rightCharacter = Math.floor(Math.random() * (max - min + 1)) + min;

        // Only if the characters need to be different
        rightCharacter = leftCharacter == rightCharacter ? (rightCharacter % max) + 1 : rightCharacter;

        return [leftCharacter, rightCharacter]
    }

    // Only if the characters need to be different
    function filterDropDownData(charactersData, position) {
        const currLeftCharacter = charactersData[$characterPairSTORE[0]].character;
        const currRightCharacter = charactersData[$characterPairSTORE[1]].character;
        
        const leftFilteredData = charactersData.filter(d => d.character !== currRightCharacter);
        const rightFilteredData = charactersData.filter(d => d.character !== currLeftCharacter);

        if (position == "left") {
            return leftFilteredData
        } else {
            return rightFilteredData
        }
    }

    function randomClick() {
        characterPairSTORE.set(generateRandom());
    }
    // $: console.log($characterPairSTORE)
</script>

<section id="character-swap">
    <div class="stage">
        <Character characterID={$characterPairSTORE[0]} position={"left"} />
        <Character characterID={$characterPairSTORE[1]} position={"right"} />
    </div>
	<div class="controls">
        <Select id="leftSelect" options={filterDropDownData(charactersData, "left")} value={charactersData[$characterPairSTORE[0]].character} position={"left"}/>
        <button on:click={randomClick} id="random-characters">
            <span>Random</span>
            <Icon name="shuffle" />
        </button>
        <Select id="rightSelect" options={filterDropDownData(charactersData, "right")} value={charactersData[$characterPairSTORE[1]].character} position={"right"}/>
    </div>
</section>

<style>
	#character-swap {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .stage {
        width: calc(100% - 2rem);
        height: 50vh;
        border: 1px solid black;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .controls {
        margin: 1rem auto;
        display: flex;
        flex-direction: row;
        gap: 2rem;
        justify-content: center;
        align-items: center;
    }

    button {
        display: flex;
        gap: 0.5rem;
        flex-direction: row;
        align-items: center;
    }

    :global(button svg) {
        margin-top: 0.25rem;
    }
</style>
