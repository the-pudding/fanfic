
<script>
    import {getContext, onMount} from 'svelte';
    import * as d3 from "d3";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import ChartHeader from "$components/chartpages/ChartHeader.svelte";
	import NetworkChart from "$components/chartpages/full/FullChart.Network.Chart.svelte";
	
	const copy = getContext("copy");

    const dataArray = [ 
		{
			fandom: "Harry Potter",
			dataUrl: "./assets/data/SLASH/networkHP.json"
		},
		{
			fandom: "Marvel Cinematic Universe",
			dataUrl: "./assets/data/SLASH/networkMCU.json"
		}
	];
	let scrollIndex;
	let summaryData = [];
	let blockReady = false;
	let showGenderBar = false;
	let showGenderM = false;
	let showGenderF = false;
	let showRelTypeBar = false;
	let showRelMM = false;
	let showRelFF = false;
	let showRelFM = false;

	onMount(async function() {
		let dataHP = await d3.json("./assets/data/SLASH/networkHP.json");
		let dataMCU = await d3.json("./assets/data/SLASH/networkMCU.json");

		calculateVals(dataHP, "Harry Potter");
		calculateVals(dataMCU, "Marvel Cinematic Universe");
		blockReady = true;


		d3.selectAll(".span-hp-nodesCount").text(summaryData[0].nodesCount);
		d3.selectAll(".span-mcu-nodesCount").text(summaryData[1].nodesCount);
		d3.selectAll(".span-hp-mCount").text(Math.round(summaryData[0].nodesMPercent));
		d3.selectAll(".span-mcu-mCount").text(Math.round(summaryData[1].nodesMPercent));
		d3.selectAll(".span-hp-fCount").text(Math.round(summaryData[0].nodesFPercent));
		d3.selectAll(".span-mcu-fCount").text(Math.round(summaryData[1].nodesFPercent));
		d3.selectAll(".span-hp-mmCount").text(Math.round(summaryData[0].linksMMPercent));
		d3.selectAll(".span-mcu-mmCount").text(Math.round(summaryData[1].linksMMPercent));
		d3.selectAll(".span-hp-ffCount").text(Math.round(summaryData[0].linksFFPercent));
		d3.selectAll(".span-mcu-ffCount").text(Math.round(summaryData[1].linksFFPercent));
		d3.selectAll(".span-hp-fmCount").text(Math.round(summaryData[0].linksFMPercent));
		d3.selectAll(".span-mcu-fmCount").text(Math.round(summaryData[1].linksFMPercent));

	});

	function calculateVals(data, fandom) {

        // NODES
        const nodesCount = data.nodes.length;
        const nodesMCount = data.nodes.filter(d => d.gender == "M").length;
        const nodesFCount = data.nodes.filter(d => d.gender == "F").length;
        const nodesOtherCount = data.nodes.filter(d => d.gender == "Other").length;
        const nodesMPercent = nodesMCount/nodesCount*100;
        const nodesFPercent = nodesFCount/nodesCount*100;
        const nodesOtherPercent = nodesOtherCount/nodesCount*100;

        // LINKS
        const linksCount = data.links.length;
        const linksMMCount = data.links.filter(d => d.relType == "M/M").length;
        const linksFFCount = data.links.filter(d => d.relType == "F/F").length;
        const linksFMCount = data.links.filter(d => d.relType == "F/M").length;
        const linksOtherCount = data.links.filter(d => d.relType == "Other").length;
        const linksMMPercent = linksMMCount/linksCount*100;
        const linksFFPercent = linksFFCount/linksCount*100;
        const linksFMPercent = linksFMCount/linksCount*100;
        const linksOtherPercent = linksOtherCount/linksCount*100;

        summaryData.push({fandom, nodesCount, nodesMPercent, nodesFPercent, nodesOtherPercent, linksCount, linksMMPercent, linksFFPercent, linksFMPercent, linksOtherPercent});
	}

	function updateScrollSteps(scrollIndex) {
		showGenderBar = scrollIndex > 0 ? true : false;
		showGenderF = scrollIndex > 0 ? true : false;
		showGenderM = scrollIndex > 1 ? true : false;
		showRelTypeBar = scrollIndex > 3 ? true : false;
		showRelFF = scrollIndex > 3 ? true : false;
		showRelMM = scrollIndex > 4 ? true : false;
		showRelFM = scrollIndex > 5 ? true : false;
	}

	$: updateScrollSteps(scrollIndex);
</script>

<section id="scrolly">
    <div class="sticky">
		<div class="chart-wrapper">
            <ChartHeader title={"Fandom Gender Dynamics"} />
			<div class="viz-wrapper">
				{#each dataArray as fandom, i}
				<div class="fandom-wrapper">
					<h3>{fandom.fandom}</h3>
					{#if blockReady}
						<div class="bars">
							<div class="bar-wrapper" class:visible={showGenderBar}>
								<p>Gender</p>
								<div class="gender-bar">
									<div class:visible={showGenderF}  class="gender-f" style="width: {summaryData[i].nodesFPercent}%"><p>{Math.round(summaryData[i].nodesFPercent)}%</p></div>
									<div class:visible={showGenderM}  class="gender-m" style="width: {summaryData[i].nodesMPercent}%"><p>{Math.round(summaryData[i].nodesMPercent)}%</p></div>
								</div>
							</div>
							<div class="bar-wrapper" class:visible={showRelTypeBar}>
								<p>Relationship</p>
								<div class="relType-bar">
									<div class:visible={showRelFF} class="relType-ff" style="width: {summaryData[i].linksFFPercent}%"></div>
									<div class:visible={showRelMM} class="relType-mm" style="width: {summaryData[i].linksMMPercent}%"><p>{Math.round(summaryData[i].linksMMPercent)}%</p></div>
									<div class:visible={showRelFM} class="relType-fm" style="width: {summaryData[i].linksFMPercent}%"><p>{Math.round(summaryData[i].linksFMPercent)}%</p></div>
								</div>
							</div>
						</div>
					{/if}
					<NetworkChart {fandom} {scrollIndex}/>
				</div>					
				{/each}
			</div>
		</div>
    </div>
    <Scrolly bind:value={scrollIndex} top={500}>
			{#each copy.slashNetworkSlides as step, i}
				<div class="step">
					<p>{@html step.value}</p>
				</div>
			{/each}
    </Scrolly>
    <div class="spacer" />
</section>

<style>
	.sticky {
        width: 100%;
		position: sticky;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
		top: 2rem;
		transition: all 1s;
		height: auto;
        z-index: 1;
        overflow: hidden;
	}

	.spacer {
		height: 75vh;
	}
	.step {
		height: 80vh;
		text-align: center;
        z-index: 1000;
        max-width: 30rem;
        margin: 0 auto;
		pointer-events: none;
	}

	.step p {
		background: white;
		padding: 1rem;
		border: 1px solid var(--fanfic-black);
		pointer-events: auto;
	}

	.chart-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        background: #f2f2f2;
        border-width: 2px;
        border-color: var(--window-button-stroke);
        border-style: solid;
    }

	.viz-wrapper {
		background-color: #f2f2f2;
		width: calc(100% - 2rem);
		margin: 1rem auto 2rem auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 2rem;
		overflow: hidden;
	}
	.fandom-wrapper {
		width: calc(50% - 1rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		border-width: 2px;
        border-color: var(--window-inset-stroke);
        border-style: solid;
		padding: 1rem;
	}

	.fandom-wrapper h3 {
		font-family: var(--mono);
		font-size: var(--20px);
		font-weight: 700;
		margin: 0 auto 0.5rem auto;
		line-height: 1;
		text-align: center;
	}

	.bars {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin: 0.5rem 0 1.5rem 0;
	}

	.bar-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 4rem 0.125rem 2rem;
		opacity: 0;
		transition: opacity 0.25s linear;
	}

	.bar-wrapper p {
		margin: 0;
		padding: 0 0.25rem 0 0;
		font-family: var(--mono);
		font-size: 12px;
		text-transform: uppercase;
		font-weight: 700;
		width: 10rem;
		text-align: right;
		line-height: 1;
	}

	.gender-bar, .relType-bar {
		width: 100%;
		height: 1.25rem;
		display: flex;
		flex-direction: row;
		font-size: 10px;
		color: white;
		font-family: var(--mono);
		font-weight: 700;
		text-align: right;
		border: 2px solid;
		border-color: var(--window-inset-stroke);
	}

	.gender-bar p, .relType-bar p {
		padding: 0.25rem 0.25rem 0 0;
		margin: 0;
		width: auto;
		font-size: 10px;
	}

	.gender-m, .relType-mm {
		background: var(--fanfic-blue);
	}

	.gender-f, .relType-ff {
		background: var(--fanfic-red);
	}

	.relType-fm {
		background: var(--fanfic-green);
	}

	.gender-m, .gender-f, .relType-mm, .relType-ff, .relType-fm {
		opacity: 0;
		transition: opacity 0.25s linear;
	}

	.visible {
		opacity: 1;
		transition: opacity 0.25s linear;
	}

	:global(.span-instructions) {
		font-weight: 700;
		font-family: var(--sans);
	}

	:global(.span-instructions::before) {
		content: '';
		background-image: url("src/svg/cursor-pixel.svg");
        background-size: 18px;
        background-repeat: no-repeat;
        background-position: 0 0.25rem;
		padding: 0.35rem 0.35rem 0.35rem 1.125rem;
        white-space: nowrap;
		text-transform: uppercase;
	}

	:global(.span-f) {
		font-weight: 700;
		font-family: var(--sans);
		background-color: var(--fanfic-red);
		color: white;
		padding: 0.125rem;
	}

	:global(.span-m) {
		font-weight: 700;
		font-family: var(--sans);
		background-color: var(--fanfic-blue);
		color: white;
		padding: 0.125rem;
	}
	:global(.span-fm) {
		font-weight: 700;
		font-family: var(--sans);
		background-color: var(--fanfic-green);
		color: white;
		padding: 0.125rem;
	}

	@media (max-width: 800px) {
		.fandom-wrapper h3 {
			font-size: var(--14px);
		}
	}

	@media (max-width: 600px) { 
		.sticky {
			justify-content: start;
			top: 4rem;
		}
		.viz-wrapper {
			flex-direction: column;
			align-items: flex-start;
			padding: 0;
		}

		.fandom-wrapper {
			width: 100%;
		}
		.bars {
			margin: 0.5rem 0;
		}
		.bar-wrapper {
			padding: 0;
			width: 100%;
		}
		.bar-wrapper p {
			font-size: 10px;
			width: 5rem;
		}
		.gender-bar, .relType-bar  {
			width: calc(100% - 5rem);
		}
		.gender-bar p, .relType-bar p {
			padding: 0.25rem 0.25rem 0 0;
			margin: 0;
			width: auto;
			font-size: 10px;
		}
	}
</style>