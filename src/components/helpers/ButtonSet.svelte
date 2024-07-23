<script>
	import { currSectionSTORE } from "$stores/misc.js";

	export let options = [];
	export let legend = "";
	export let legendPosition = "top";
	export let labelClass = "";
	export let disabled = false;
	export let value = options.length ? options[0] : "";
	export let sliderEl;

	const id = `legend-${Math.floor(Math.random() * 1000000)}`;
	const makeSlug = (str = "") => `${str}`.toLowerCase().replace(/\W/g, "");

	$: optionsWithSlug = options.map((d) => ({
		...d,
		val: d,
		slug: makeSlug(d)
	}));
	$: isTop = legendPosition === "top";

	$: currSectionSTORE.set(value);
</script>

<div class="button-set">
	<div
		id={`group-${id}`}
		class="group"
		class:is-top={isTop}
		role="radiogroup"
		aria-labelledby={`label-${id}`}
	>
		{#if legend}<div class="legend" id="legend-{id}">{legend}</div>{/if}
		<div class="options">
			{#each optionsWithSlug as option}
				<div class="option" id={`tab-${option.slug}`}>
					<input
						type="radio"
						id={`${id}-${option.slug}`}
						name="name-{id}"
						class="sr-only input-{option.slug}"
						value={option.val}
						{disabled}
						bind:group={value}
					/>
					<label class="option {labelClass}" for={`${id}-${option.slug}`}>
						{option.val}
					</label>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.button-set {
		display: flex;
		position: sticky;
		top: 0;
		width: 100%;
		z-index: 1000;
	}

	.group {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.group.is-top {
		flex-direction: column;
	}

	.is-top .legend {
		padding-bottom: 0.5em;
		padding-right: 0;
	}

	.legend {
		padding-right: 0.5em;
		font-size: 1em;
	}

	.options {
		display: flex;
		width: 100%;
	}

	label {
		appearance: none;
		user-select: none;
		line-height: 1;
		margin: 0;
		padding: 1em;
		border-radius: 0;
		/* border: 2px solid var(--color-gray-900); */
		outline: none;
		cursor: pointer;
		font-family: inherit;
		font-size: 1em;
		display: inline-block;
	}

	.option {
		width: 100%;
	}

	/* .option + .option label {
		border-left-width: 0;
	}

	.option:first-of-type label {
		border-radius: 4px 0 0 4px;
	}

	.option:last-of-type label {
		border-radius: 0 4px 4px 0;
	}

	.option + .option > label {
		border-left-width: 0;
	} */

	input[type="radio"] + label {
		background: var(--color-white);
		color: var(--color-gray-900);
	}

	input[type="radio"]:checked + label,
	input[type="radio"]:checked:hover + label {
		background: var(--color-gray-900);
		color: var(--color-white);
	}

	.option input[type="radio"]:checked + label {
		background: var(--color-black);
	}

	input[type="radio"]:hover + label {
		background: var(--color-gray-100);
	}

	.option input[type="radio"]:focus + label {
		box-shadow: 0 0 4px 0 var(--color-black);
	}

	input[type="radio"]:disabled + label {
		color: var(--color-gray-700);
		background: var(--color-gray-500);
		cursor: not-allowed;
	}
</style>