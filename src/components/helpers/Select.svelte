<script>
	import { characterPairSTORE, charactersDataLEFT, charactersDataRIGHT } from "$stores/misc.js";
	import charactersData from "$data/characters.csv";
	import { csvFormat } from "d3";
	import filterCharacters from "$utils/filterCharacters";

	export let options = [];
	export let label = "";
	export let disabled = false;
	export let value = options.length ? options[0].value : "";
	export let position;
	export let id;

	function findMatchingID(characterName) {
		const match = charactersData.findIndex(d => d.character == characterName);
		return match
	}

	function onChange() {
		const oppSelect = position == "left" ? "rightSelect" : "leftSelect";
		const oppSelectVal = document.getElementById(oppSelect).value;
		const leftCharacter = position == "left" ? value : oppSelectVal;
		const rightCharacter = position == "right" ? value : oppSelectVal;
		const characterPair = [findMatchingID(leftCharacter), findMatchingID(rightCharacter)];
		characterPairSTORE.set(characterPair)	
	}
</script>

<div class="select">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<select {id} bind:value {disabled} on:change={onChange}>
		{#each options as option}
			<option>{option.character}</option>
		{/each}
	</select>
</div>

<style>
	.select {
		position: relative;
		font-family: var(--sans);
		width: 18rem;
	}

	label {
		display: inline-block;
		font-family: inherit;
		font-weight: inherit;
		font-size: 1em;
		margin-bottom: 0.25em;
	}

	select {
		width: 100%;
		height: 50px;
		font-family: inherit;
		font-size: 1em;
		cursor: pointer;
		background: var(--color-white);
		color: var(--color-gray-900);
		border: 2px solid var(--color-gray-900);
		border-radius: 4px;
		padding: 0.5em;
		appearance: none;
		line-height: 1.4;
	}

	select::-ms-expand {
		display: none;
	}

	.select::after {
		display: block;
		content: "";
		position: absolute;
		bottom: 1.25em;
		right: 0.75em;
		width: 1em;
		height: 1em;
		z-index: 1;
		background: var(--color-gray-900);
		clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
		border-radius: 4px;
		transform-origin: center center;
		transform: rotate(-45deg);
		pointer-events: none;
	}

	select:hover {
		background: var(--color-gray-100);
	}

	select:focus {
		box-shadow: 0 0 4px 0 var(--color-focus);
	}

	.select:disabled {
		cursor: not-allowed;
		background-color: var(--color-gray-300);
	}
</style>
