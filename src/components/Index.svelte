<script>
	import { onMount } from "svelte";
	import { currSectionSTORE } from "$stores/misc.js";
	import Tabs from "$components/Tabs.svelte";
	import IntroSection from "$components/IntroSection.svelte";
	import FanFicSection from "$components/FanFicSection.svelte";
	import UniversalTooltip from "$components/UniversalTooltip.svelte";
	import Tap from "$components/helpers/Tap.svelte";
	import Footer from "$components/Footer.svelte";
	import inView from "$actions/inView.js";

	let sections = ["slash", "noncanon", "realpeople"];
	let tapVisible = false;

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
    const spans = document.querySelectorAll('span.slash-ref');

		spans.forEach(span => {
		span.onclick = function() {
			console.log('Span clicked!', this);
			currSectionSTORE.set("slash")
			// Your onclick function logic here
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
<div class="texture">
</div>
<UniversalTooltip />
<Footer />

<!-- CSS STARTS HERE -->
<style>
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
	}

	:global(#realpeople-slide .slash-ref::before) {
		content: '';
		/* background-image: url(". d/svg/left-arrow-pixel.svg"); */
        background-size: 18px;
        background-repeat: no-repeat;
        background-position: 0 0.25rem;
        padding: 0.35rem 0.35rem 0.35rem 1.125rem;
        white-space: nowrap;
		text-transform: uppercase;
	}

	:global(#realpeople-slide .slash-ref:hover) {
		background-color: var(--fanfic-blue);
		color: white;
	}
</style>
