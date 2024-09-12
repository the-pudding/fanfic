<script>
	import { characterPairSTORE, charactersDataLEFT, charactersDataRIGHT } from "$stores/misc.js";
	import charactersData from "$data/INTRO/INTRO_characters.csv";
	import { csvFormat } from "d3";
	import filterCharacters from "$utils/filterCharacters";

	const leftData = charactersData.filter(d => d.position == "left");
    const rightData = charactersData.filter(d => d.position == "right");

	export let options = [];
	export let label = "";
	export let disabled = false;
	export let value = options.length ? options[0].value : "";
	export let position;
	export let id;

	function findMatchingID(characterName, position) {
		let match;
		if (position == "left") {
			match = leftData.findIndex(d => d.character == characterName);
		} else if (position == "right") {
			match = rightData.findIndex(d => d.character == characterName);
		}
		return match
	}

	function onChange() {
		const oppSelect = position == "left" ? "rightSelect" : "leftSelect";
		const oppSelectVal = document.getElementById(oppSelect).value;
		const leftCharacter = position == "left" ? value : oppSelectVal;
		const rightCharacter = position == "right" ? value : oppSelectVal;
		const characterPair = [findMatchingID(leftCharacter, "left"), findMatchingID(rightCharacter, "right")];
		characterPairSTORE.set(characterPair)	
	}
</script>

<div class="select">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<select class="select-{position}" {id} bind:value {disabled} on:change={onChange}>
		{#each options as option}
			<option>{option.character}</option>
		{/each}
	</select>
</div>

<style>
	.select {
		position: relative;
		font-family: var(--mono);
		width: 50%;
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
		border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
		padding: 0.5em;
		appearance: none;
		line-height: 1.4;
		color: var(--fanfic-black);
	}

	.select-left {
		background: var(--fanfic-pink);
	}

	.select-right {
		background: var(--fanfic-highlighter);
	}

	select::-ms-expand {
		display: none;
	}

	.select::after {
		display: block;
		content: "";
		position: absolute;
		bottom: 1.35em;
		right: 1.25em;
		width: 0.75em;
		height: 0.75em;
		z-index: 1;
		background: var(--fanfic-black);
		clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
		transform-origin: center center;
		transform: rotate(-45deg);
		pointer-events: none;
	}

	select:hover {
		transform: scale(0.98);
	}

	select:focus {
		box-shadow: 0 0 4px 0 var(--color-focus);
	}

	.select:disabled {
		cursor: not-allowed;
		background-color: var(--color-gray-300);
	}

	@media (max-width: 600px) {
       select {
			font-size: var(--12px);
			height: 40px;
	   }

	   .select::after {
			display: block;
			content: "";
			position: absolute;
			bottom: 1.125em;
			right: 0.75em;
			width: 0.75em;
			height: 0.75em;
			z-index: 1;
			background: var(--fanfic-black);
			clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
			transform-origin: center center;
			transform: rotate(-45deg);
			pointer-events: none;
		}
    }
</style>
