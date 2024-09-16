<script>
	import { onMount } from "svelte";
	import { currSectionSTORE, annotationVisible } from "$stores/misc.js";
	import { fade, fly } from 'svelte/transition';
	import Tabs from "$components/Tabs.svelte";
	import IntroSection from "$components/IntroSection.svelte";
	import FanFicSection from "$components/FanFicSection.svelte";
	import UniversalTooltip from "$components/UniversalTooltip.svelte";
	import MethodsSection from "$components/MethodsSection.svelte";
	import Tap from "$components/helpers/Tap.svelte";
	import Footer from "$components/Footer.svelte";
	import inView from "$actions/inView.js";
	import copy from "$data/copy.json";

	let sections = ["slash", "noncanon", "realpeople"];
	let tapVisible = false;

	$: console.log($annotationVisible)

	// Handles tap events for slash, canon, and RPF sections
	// A little hacky, but we can do it this way because we know the exact behaviors
	const onTap = async ({ detail }) => {
		if (detail == "right") {
			if ($currSectionSTORE == "slash") {
				currSectionSTORE.set("noncanon")
			} else if ($currSectionSTORE == "noncanon") {
				currSectionSTORE.set("realpeople")
			}	
		} else { 
			if ($currSectionSTORE == "realpeople") {
				currSectionSTORE.set("noncanon")
			} else if ($currSectionSTORE == "noncanon") {
				currSectionSTORE.set("slash")
			}
		}
	};

	onMount(() => {
		const slashSpans = document.querySelectorAll('span.slash-ref');
		const canonSpans = document.querySelectorAll('span.canon-ref');
		const rpfSpans = document.querySelectorAll('span.rpf-ref');

			slashSpans.forEach(span => {
				span.onclick = function() {
					currSectionSTORE.set("slash")
				};
			});
			canonSpans.forEach(span => {
				span.onclick = function() {
					currSectionSTORE.set("noncanon")
				};
			});
	});

	// Sets the translation style for the "inner" div, it's a long ternary statment that works like if/else
	$: translate = $currSectionSTORE == "slash" || $currSectionSTORE == undefined
		? "translate(0vw, 0px)"
		: $currSectionSTORE == "noncanon"
		? "translate(-96vw, 0px)"
		: "translate(-192vw, 0px)";

	// Uses inView on the sections to hide/show the tap arrows	
	function showTap() { tapVisible = true; }
	function hideTap() { tapVisible = false; }

	function annoMatch(annoID) {
		const annotations = copy.annoTriggers;
		const match = annotations[annoID].value;
		return match;
	}
</script>

<!-- PAGE HTML STARTS HERE -->
<IntroSection />
<Tabs options={sections} />

<div class="tap-wrapper" class:tapVisible={tapVisible}>
	<Tap on:tap={onTap} full={false} showArrows={true} enableKeyboard={true} size={"50%"} />
</div>
<div class="inner" style="transform:{translate}"
	use:inView
	on:enter={showTap}
	on:exit={hideTap}
>
	{#if sections}
		{#each sections as section}
			<FanFicSection {section} />
		{/each}
	{/if}
</div>
<div class="texture"></div>
{#if $annotationVisible[0]}
	<div id="annotation-block">
		<div class="bubble" in:fly={{ delay: 500, duration: 300, y: 200}} out:fade>
			<p>{annoMatch($annotationVisible[1])}</p>
		</div>
		<img in:fly={{ delay: 0, duration: 300, y: 200}} out:fade src="./assets/images/heads/draco-malfoy.png" alt="character" />
	</div>
{/if}
<MethodsSection />
<UniversalTooltip />
<Footer />

<!-- CSS STARTS HERE -->
<style>
	#annotation-block {
		position: fixed;
		top: 25%;
		right: 0.5rem;
		display: flex;
		flex-direction: column;
		align-items: end;
		z-index: 1000;
		pointer-events: none;
	}
	.bubble {
		width: 200px;
		background: white;
		font-family: var(--sans);
		font-size: 10px;
		position: relative;
		padding: 1rem;
		border: 2px solid black;
	}
	.bubble p {
		padding: 0;
		margin: 0;
		font-style: italic;
	}
	.bubble:after {
		content: '';
		position: absolute;
		border-style: solid;
		border-width: 10px 10px 0;
		border-color: #ffffff transparent;
		display: block;
		width: 0;
		z-index: 1;
		bottom: -10px;
		left: 55%;
	}
	.bubble:before {
		content: '';
		position: absolute;
		border-style: solid;
		border-width: 11px 11px 0;
		border-color: #151515 transparent;
		display: block;
		width: 0;
		z-index: 0;
		bottom: -13px;
		left: 55%;
	}
	#annotation-block img {
		width: 160px;
	}
	.texture {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		pointer-events: none;
		z-index: -1;
		background: url("/assets/images/cloud-ascii-a.png");
		opacity: 0.05;
	}
	.sparkle {
		position: absolute;
		top: 2rem;
		left: 2rem;
		z-index: 1000;
	}
	.inner {
		transform: translate(0vw, 0px);
		width: 300vw;
		display: flex;
		transition: transform 0.5s;
	}

	.tap-wrapper {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: var(--z-overlay);
		pointer-events: none;
		display: none;
	}

	.tap-wrapper.tapVisible {
		display: block;
	}

	:global(#slash-slide .canon-ref) {
		color: var(--fanfic-black);
        font-weight: 700;
        font-size: var(--14px);
        font-family: var(--mono);
        background-color: var(--fanfic-window-gray);
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
        padding: 0.35rem;
        white-space: nowrap;
		text-transform: uppercase;
		cursor: pointer;
	}

	:global(#slash-slide .canon-ref::before) {
		content: '';
		background-image: url("src/svg/right-arrow-pixel.svg");
        background-size: 18px;
        background-repeat: no-repeat;
        background-position: 0 0.25rem;
        padding: 0.35rem 0.35rem 0.35rem 1.125rem;
        white-space: nowrap;
		text-transform: uppercase;
	}

	:global(#slash-slide .canon-ref:hover) {
		background-color: var(--fanfic-red);
		color: white;
	}

	:global(#noncanon-slide .slash-ref) {
		color: var(--fanfic-black);
        font-weight: 700;
        font-size: var(--14px);
        font-family: var(--mono);
        background-color: var(--fanfic-window-gray);
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
        padding: 0.35rem;
        white-space: nowrap;
		text-transform: uppercase;
		cursor: pointer;
	}

	:global(#noncanon-slide .slash-ref::before) {
		content: '';
		background-image: url("src/svg/left-arrow-pixel.svg");
        background-size: 18px;
        background-repeat: no-repeat;
        background-position: 0 0.25rem;
        padding: 0.35rem 0.35rem 0.35rem 1.125rem;
        white-space: nowrap;
		text-transform: uppercase;
	}

	:global(#realpeople-slide .slash-ref) {
		color: var(--fanfic-black);
        font-weight: 700;
        font-size: var(--14px);
        font-family: var(--mono);
        background-color: var(--fanfic-window-gray);
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
        padding: 0.35rem;
        white-space: nowrap;
		text-transform: uppercase;
		cursor: pointer;
	}

	:global(#realpeople-slide .slash-ref::before) {
		content: '';
		background-image: url("src/svg/double-left-arrow-pixel.svg");
        background-size: 18px;
        background-repeat: no-repeat;
        background-position: 0 0.25rem;
        padding: 0.35rem 0.35rem 0.35rem 1.125rem;
        white-space: nowrap;
		text-transform: uppercase;
	}

	:global(#realpeople-slide .slash-ref:hover, #noncanon-slide .slash-ref:hover) {
		background-color: var(--fanfic-blue);
		color: white;
	}

	:global(#realpeople-slide .canon-ref) {
		color: var(--fanfic-black);
        font-weight: 700;
        font-size: var(--14px);
        font-family: var(--mono);
        background-color: var(--fanfic-window-gray);
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
        padding: 0.35rem;
        white-space: nowrap;
		text-transform: uppercase;
		cursor: pointer;
	}

	:global(#realpeople-slide .canon-ref::before) {
		content: '';
		background-image: url("src/svg/left-arrow-pixel.svg");
        background-size: 18px;
        background-repeat: no-repeat;
        background-position: 0 0.25rem;
        padding: 0.35rem 0.35rem 0.35rem 1.125rem;
        white-space: nowrap;
		text-transform: uppercase;
	}

	:global(#realpeople-slide .canon-ref:hover ) {
		background-color: var(--fanfic-red);
		color: white;
	}
</style>
