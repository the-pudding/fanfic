<script>
    import Character from "$components/Character.svelte";
    import charactersData from "$data/INTRO/INTRO_characters.csv";
    import Icon from "$components/helpers/Icon.svelte";
    import Select from "$components/helpers/Select.svelte";
    import { characterPairSTORE, charactersDataLEFT, charactersDataRIGHT } from "$stores/misc.js";
    import filterCharacters from "$utils/filterCharacters";

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

        // Filter dropdown!!
        // dropdownOptionsLEFT = filterCharacters(leftData, $characterPairSTORE, "left");
        // dropdownOptionsRIGHT = filterCharacters(rightData, $characterPairSTORE, "right");

        // charactersDataLEFT.set(leftData);
        // charactersDataRIGHT.set(rightData);
    }
    // Every the character pair changes
    // Filter the dropdowns
    // $: dropdownOptionsLEFT = filterCharacters(leftData, $characterPairSTORE, "left");
    // $: dropdownOptionsRIGHT = filterCharacters(rightData, $characterPairSTORE, "right");
    // Set the pair stores
    $: characterPairSTORE.set(generateRandom());
    // Set the dropdown stores
    // $: charactersDataLEFT.set(leftData);
    // $: charactersDataRIGHT.set(rightData);
</script>

<section id="character-swap">
    <h3>Build your own ship</h3>
    <p class="instructions">Press the buttons below to switch out the characters</p>
    <div class="stage">
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
        display: flex;
        margin: 0 auto;
        max-width: 70rem;
        padding: 0.25rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: var(--fanfic-window-gray);
        border-width:2px;
        border-color:#FFFFFF #808080 #808080 #FFFFFF;
        border-style:solid;
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
        height: 50vh;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background: var(--color-white);
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

    #random-characters {
        background: var(--fanfic-blue);
        border-width:2px;
        border-color:#FFFFFF #151515 #151515 #FFFFFF;
        border-style:solid;
        color: white;
    }

    :global(button svg) {
        margin-top: 0.25rem;
    }
</style>
