<script>
	import { onMount } from "svelte";
	import { get } from 'svelte/store';
	import { currSectionSTORE, annotationVisible, scrollSLASH, scrollCANON, scrollRPF } from "$stores/misc.js";
	import Tabs from "$components/Tabs.svelte";
	import IntroSection from "$components/IntroSection.svelte";
	import FanFicSection from "$components/FanFicSection.svelte";
	import UniversalTooltip from "$components/UniversalTooltip.svelte";
	import MethodsSection from "$components/MethodsSection.svelte";
	import Tap from "$components/helpers/Tap.svelte";
	import Annotation from "$components/Annotation.svelte";
	import Footer from "$components/Footer.svelte";
	import inView from "$actions/inView.js";
	import copy from "$data/copy.json";

	let sections = ["slash", "noncanon", "realpeople"];
	let tapVisible = false;
	let tabVisible = true;
	let innerWidth;
	let innerHeight;

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
		// Subscribe to the current section store to track changes
		currSectionSTORE.subscribe((value) => {
			prevSection = value;
			updateScrollPosition(value);
		});
		
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
		rpfSpans.forEach(span => {
			span.onclick = function() {
				currSectionSTORE.set("realpeople")
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
	function showTab() { tabVisible = true; }
	function hideTab() { tabVisible = false; }

	let prevSection;
  	let scrollY;

	 // Watch for changes in scrollY and currSectionSTORE
	 $: recordSectionScroll($currSectionSTORE, scrollY);

	 function recordSectionScroll(curr, scrollY) {
		if (curr === "slash") {
			scrollSLASH.set(scrollY);
		} else if (curr === "noncanon") {
			scrollCANON.set(scrollY);
		} else if (curr === "realpeople") {
			scrollRPF.set(scrollY);
		}
	}

	function updateScrollPosition(curr) {
		if (typeof window !== 'undefined') { // Check if window is available
			const sectionEl = document.getElementById('section-start')
			const sectionTopPos = sectionEl.getBoundingClientRect().top + scrollY;
			let scrollPos;
			if (curr === "slash") {
				scrollPos = get(scrollSLASH); // Get the value from the store
			} else if (curr === "noncanon") {
				scrollPos = get(scrollCANON); // Get the value from the store
			} else if (curr === "realpeople") {
				scrollPos = get(scrollRPF); // Get the value from the store
			}

			// Check if scrollPos is defined
			if (scrollPos !== undefined) {
				scrollPos = scrollPos > sectionTopPos ? scrollPos : sectionTopPos;
				setTimeout(() => {
					window.scrollTo({ top: scrollPos });
				}, 0); // Delay of 1000ms (1 second)
			} 
		}
	}
</script>

<!-- PAGE HTML STARTS HERE -->
<svelte:window bind:innerWidth={innerWidth} bind:innerHeight={innerHeight} bind:scrollY={scrollY}/>

<IntroSection />
<Tabs options={sections} tabVisible={tabVisible}/>

<div class="tap-wrapper" class:tapVisible={tapVisible}>
	<Tap on:tap={onTap} full={false} showArrows={true} enableKeyboard={true} size={"50%"} />
</div>
<div id="section-start" class="inner" style="transform:{translate}"
	use:inView={{ bottom: innerHeight-100 }}
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
	<Annotation />
{/if}
<div class="methods-trigger"
	use:inView={{ bottom: innerHeight-100 }}
	on:enter={hideTab}
	on:exit={showTab}
>
	<MethodsSection />
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
		background-image: url("/src/svg/left-arrow-pixel.svg");
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
		background-image: url("/src/svg/double-left-arrow-pixel.svg");
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
		background-image: url("/src/svg/left-arrow-pixel.svg");
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
