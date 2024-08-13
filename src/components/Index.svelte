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
	import inView from "$actions/inView.js";

	let sections = ["slash", "noncanon", "realpeople"];
	let value;
	let tapVisible = false;

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

	function showTap() { tapVisible = true; }
	function hideTap() { tapVisible = false; }
</script>

<CharacterSwap />
<FanFicSection section={"intro"} />
<IntroScroll />
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
<!-- <Footer /> -->

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
</style>
