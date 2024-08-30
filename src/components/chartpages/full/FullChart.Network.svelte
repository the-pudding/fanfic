
<script>
    import {onMount} from 'svelte';
    import * as d3 from "d3";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import ChartHeader from "$components/chartpages/ChartHeader.svelte";
	import NetworkChart from "$components/chartpages/full/FullChart.Network.Chart.svelte";


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
	const steps = [0,1,2,3,4,5]
	let scrollIndex;
	let receivedData;
	let summaryData = [];

	onMount(async function() {
		let dataHP = await d3.json("./assets/data/SLASH/networkHP.json");
		let dataMCU = await d3.json("./assets/data/SLASH/networkMCU.json");

		calculateVals(dataHP, "Harry Potter");
		calculateVals(dataMCU, "Marvel Cinematic Universe");

		console.log(summaryData)
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
        const linksMMCount = data.nodes.filter(d => d.relType == "M/M").length;
        const linksFFCount = data.nodes.filter(d => d.relType == "F/F").length;
        const linksFMCount = data.nodes.filter(d => d.relType == "F/M").length;
        const linksOtherCount = data.nodes.filter(d => d.relType == "Other").length;
        const linksMMPercent = linksMMCount/linksCount*100;
        const linksFFPercent = linksFFCount/linksCount*100;
        const linksFMPercent = linksFMCount/linksCount*100;
        const linksOtherPercent = linksOtherCount/linksCount*100;

        summaryData.push({fandom, nodesCount, nodesMPercent, nodesFPercent, nodesOtherPercent, linksCount, linksMMPercent, linksFFPercent, linksFMPercent, linksOtherPercent});
	}
</script>

<section id="scrolly">
    <div class="sticky">
		<div class="chart-wrapper">
            <ChartHeader title={"TKTK"} />
			<div class="viz-wrapper">
				{#each dataArray as fandom, i}
				<div class="fandom-wrapper">
					<h3>{fandom.fandom}</h3>
					<NetworkChart {fandom} {scrollIndex}/>
				</div>					
				{/each}
			</div>
		</div>
    </div>
    <Scrolly bind:value={scrollIndex}>
			{#each steps as step, i}
				<div class="step">
					<p>Step {i}</p>
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
		top: 0;
		transition: all 1s;
		height: 100vh;
        z-index: 1;
        overflow-x: hidden;
		pointer-events: none;
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
	}

	.chart-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        background: var(--fanfic-window-gray);
        border-width:2px;
        border-color:#FFFFFF #808080 #808080 #FFFFFF;
        border-style:solid;
    }

	.viz-wrapper {
		background-color: white;
		width: 100%;
		display: flex;
		flex-direction: row;
		padding: 2rem 0;
		align-items: center;
	}
	.fandom-wrapper {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 600px;
	}

	.fandom-wrapper h3 {
		font-family: var(--mono);
		font-size: var(--20px);
		font-weight: 700;
	}

	.percent-bar {
		width: 80%;
		height: 1.5rem;
		display: flex;
		flex-direction: row;
		border: 1px solid black;
		margin-bottom: 4rem;
	}

	.mm-bar {
		height: 100%;
		background: var(--fanfic-blue);
	}

	.ff-bar {
		height: 100%;
		background: var(--fanfic-pink);
	}

	.fm-bar {
		height: 100%;
		background: var(--fanfic-green);
	}

	:global(.link-mm) {
		stroke: var(--fanfic-blue);
	}
	:global(.link-ff) {
		stroke: var(--fanfic-pink);
	}
	:global(.link-fm) {
		stroke: var(--fanfic-green);
	}
	:global(.link-gen) {
		stroke: var(--fanfic-window-gray);
	}

	/* :global(#hp-network-chart svg g circle, #hp-network-chart svg g line) {
		opacity: 0
	} */
</style>