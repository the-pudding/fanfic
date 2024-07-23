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

	console.log(copy)

	let sliderEl; // component binding
	let sections = ["Slash", "Non-Canon", "Real People"];
	let value;

	function stripCharacters(string) {
		let stripped = string.replace(/[^A-Z0-9]/ig, '').toLowerCase();
		return stripped;
	} 

	function resetTabs($currSectionSTORE, detail) {
		const slashTab = select("#tab-slash input").node();
		const noncanonTab = select("#tab-noncanon input").node();
		const realpeopleTab = select("#tab-realpeople input").node();
		if (detail == "right") {
			if (slashTab.checked) {
				slashTab.checked = false;
				noncanonTab.checked = true;
			} else if (noncanonTab.checked) {
				noncanonTab.checked = false;
				realpeopleTab.checked = true;
			}
		} else {
			if (realpeopleTab.checked) {
				realpeopleTab.checked = false;
				noncanonTab.checked = true;
			} else if (noncanonTab.checked) {
				noncanonTab.checked = false;
				slashTab.checked = true;
			}
		}
	}

	const onTap = async ({ detail }) => {
		if (detail == "right") {
			sliderEl.next();
			resetTabs($currSectionSTORE, detail);
		} else {
			sliderEl.prev();
			resetTabs($currSectionSTORE, detail);
		}
	};


	function setSection($currSectionSTORE) {
		if (sliderEl !== undefined) {
			if ($currSectionSTORE == "Slash") {
				sliderEl.jump(0);
			} else if ($currSectionSTORE == "Non-Canon") {
				sliderEl.jump(1);
			} else if ($currSectionSTORE == "Real People") {
				sliderEl.jump(2);
			}
		}
	}

	$: setSection($currSectionSTORE)
	$: value == $currSectionSTORE;
	// import Footer from "$components/Footer.svelte";

	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<CharacterSwap />
<IntroScroll />
<ButtonSet options={sections} bind:userSelected={value} {sliderEl}/>
<div class="tap-wrapper">
	<Tap on:tap={onTap} full={true} enableKeyboard={true} size={"50%"} />
	<Slider bind:this={sliderEl}>
		{#each sections as section}
			<Slide className={stripCharacters(section)}>
				<FanFicSection section={stripCharacters(section)} />
			</Slide>
		{/each}
	</Slider>
</div>
<!-- <Footer /> -->

<style>
	.tap-wrapper {
		position: relative;
	}
</style>
