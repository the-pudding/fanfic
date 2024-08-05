<script>
    import Character from "$components/Character.svelte";
    import charactersData from "$data/INTRO/INTRO_characters.csv";
    import Icon from "$components/helpers/Icon.svelte";
    import Select from "$components/helpers/Select.svelte";
    import { characterPairSTORE, charactersDataLEFT, charactersDataRIGHT } from "$stores/misc.js";
    import filterCharacters from "$utils/filterCharacters";

    characterPairSTORE.set(generateRandom());

    function generateRandom() {
        const min = 1;
        const max = charactersData.length - 1;
        // Generates a random integer between min (included) and max (included)
        const leftCharacter = Math.floor(Math.random() * (max - min + 1)) + min;
        let rightCharacter = Math.floor(Math.random() * (max - min + 1)) + min;

        // Only if the characters need to be different
        rightCharacter = leftCharacter == rightCharacter ? (rightCharacter % max) + 1 : rightCharacter;
        return [leftCharacter, rightCharacter]
    }

    function randomClick() {
        // When the random button is clicked, generate a new pair of random characters and set the store to them
        characterPairSTORE.set(generateRandom());

        // Filter dropdown!!
        dropdownOptionsLEFT = filterCharacters(charactersData, $characterPairSTORE, "left");
        dropdownOptionsRIGHT = filterCharacters(charactersData, $characterPairSTORE, "right");

        charactersDataLEFT.set(dropdownOptionsLEFT);
        charactersDataRIGHT.set(dropdownOptionsRIGHT);
    }
    // Every the character pair changes
    // Filter the dropdowns
    $: dropdownOptionsLEFT = filterCharacters(charactersData, $characterPairSTORE, "left");
    $: dropdownOptionsRIGHT = filterCharacters(charactersData, $characterPairSTORE, "right");
    // Set the pair stores
    $: characterPairSTORE.set(generateRandom());
    // Set the dropdown stores
    $: charactersDataLEFT.set(dropdownOptionsLEFT);
    $: charactersDataRIGHT.set(dropdownOptionsRIGHT);
</script>

<section id="character-swap">
    <div class="stage">
        <Character characterID={$characterPairSTORE[0]} position={"left"} />
        <Character characterID={$characterPairSTORE[1]} position={"right"} />
    </div>
	<div class="controls">
        <Select id="leftSelect" options={$charactersDataLEFT} value={charactersData[$characterPairSTORE[0]].character} position={"left"}/>
        <button on:click={randomClick} id="random-characters">
            <span>Random</span>
            <Icon name="shuffle" />
        </button>
        <Select id="rightSelect" options={$charactersDataRIGHT} value={charactersData[$characterPairSTORE[1]].character} position={"right"}/>
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
