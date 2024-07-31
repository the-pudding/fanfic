<script>
	import { getContext } from "svelte";
	import { currSectionSTORE } from "$stores/misc.js";
	import CharacterSwap from "$components/CharacterSwap.svelte";
	import IntroScroll from "$components/Intro.Scroll.svelte";
	import Tabs from "$components/Tabs.svelte";
	import FanFicSection from "$components/FanFicSection.svelte";
	import Tap from "$components/helpers/Tap.svelte";
	import Footer from "$components/Footer.svelte";
	import copy from "$data/copy.json";
	import {select, selectAll} from "d3";

	let sections = ["slash", "noncanon", "realpeople"];
	let value;

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

	$: translate = $currSectionSTORE == "slash" || $currSectionSTORE == undefined
		? "translate(0vw, 0px)"
		: $currSectionSTORE == "noncanon"
		? "translate(-85vw, 0px)"
		: "translate(-170vw, 0px)";
</script>

<CharacterSwap />
<IntroScroll />
<Tabs options={sections} />

<div class="tap-wrapper">
	<Tap on:tap={onTap} full={false} showArrows={true} enableKeyboard={true} size={"50%"} />
</div>
<div class="inner" style="transform:{translate}">
	{#if sections}
		{#each sections as section}
			<FanFicSection {section} />
		{/each}
	{/if}
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
