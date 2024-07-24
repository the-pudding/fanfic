<script>
	import { getContext } from "svelte";
	import { currSectionSTORE } from "$stores/misc.js";
	import CharacterSwap from "$components/CharacterSwap.svelte";
	import IntroScroll from "$components/Intro.Scroll.svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import Slider from "$components/helpers/Slider.svelte";
	import Slide from "$components/helpers/Slider.Slide.svelte";
	import FanFicSection from "$components/FanFicSection.svelte";
	import Tap from "$components/helpers/Tap.svelte";
	import Footer from "$components/Footer.svelte";
	import copy from "$data/copy.json";
	import {select, selectAll} from "d3";
	// import Footer from "$components/Footer.svelte";

	let sliderEl; // component binding
	let sections = ["Slash", "Non-Canon", "Real People"];
	let value;

	function stripCharacters(string) {
		let stripped = string.replace(/[^A-Z0-9]/ig, '').toLowerCase();
		return stripped;
	} 

	const onTap = async ({ detail }) => {
		if (detail == "right") {
			if ($currSectionSTORE == "Slash") {
				currSectionSTORE.set("Non-Canon")
			} else if ($currSectionSTORE == "Non-Canon") {
				currSectionSTORE.set("Real People")
			}	
		} else { 
			if ($currSectionSTORE == "Real People") {
				currSectionSTORE.set("Non-Canon")
			} else if ($currSectionSTORE == "Non-Canon") {
				currSectionSTORE.set("Slash")
			}
		}
	};

	$: currSectionSTORE.set(value);
	$: console.log($currSectionSTORE)
	$: translate = $currSectionSTORE == "Slash"
		? "translate(0vw, 0px)"
		: $currSectionSTORE == "Non-Canon"
		? "translate(-85vw, 0px)"
		: "translate(-170vw, 0px)";

</script>

<CharacterSwap />
<IntroScroll />
<ButtonSet options={sections} bind:userSelected={value} {sliderEl}/>


<div class="tap-wrapper">
	<Tap on:tap={onTap} full={false} showArrows={true} enableKeyboard={true} size={"50%"} />
</div>
<div class="inner" style="transform:{translate}">
	{#each sections as section}
		<FanFicSection section={stripCharacters(section)} />
	{/each}
</div>
<!-- <Footer /> -->

<style>
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
	}
</style>
