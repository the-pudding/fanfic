
<script>
    import {onMount} from 'svelte';
    import * as d3 from "d3";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import ChartHeader from "$components/chartpages/ChartHeader.svelte";

    let innerWidth;

    let width = innerWidth;
    let element;
	let element2;
	let mounted = false;

	let hpNodes;
	let hpMNodes;
	let hpFNodes;
	let hpOtherNodes;
	let hpLines;
	let hpMMLines;
	let hpFFLines;
	let hpFMLines;
	let hpOtherLines;

	let mcuNodes;
	let mcuMNodes;
	let mcuFNodes;
	let mcuOtherNodes;
	let mcuLines;
	let mcuMMLines;
	let mcuFFLines;
	let mcuFMLines;
	let mcuOtherLines;

	let hpCharacters;
	let hpMCharPercent;
	let hpFCharPercent;
	let hpOCharPercent;

	let mcuCharacters;
	let mcuMCharPercent;
	let mcuFCharPercent;
	let mcuOCharPercent;

	let hpMMLinksPercent;
	let hpFFLinksPercent;
	let hpFMLinksPercent;
	let hpOtherLinksPercent;

	let mcuMMLinksPercent;
	let mcuFFLinksPercent;
	let mcuFMLinksPercent;
	let mcuOtherLinksPercent;

    onMount(async function() {
        let data = await d3.json('./assets/data/RPF/network.json');
		let data2 = await d3.json('./assets/data/RPF/networkMCU.json');

		// HP NODES
		hpCharacters = data.nodes.length;
		let hpMCharacters = data.nodes.filter(d => d.gender == "M");
		let hpFCharacters = data.nodes.filter(d => d.gender == "F");
		let hpOCharacters = data.nodes.filter(d => d.gender == "Other");
		hpMCharPercent = hpMCharacters.length/hpCharacters*100;
		hpFCharPercent = hpFCharacters.length/hpCharacters*100;
		hpOCharPercent = hpOCharacters.length/hpCharacters*100;
		console.log({hpMCharPercent, hpFCharPercent, hpOCharPercent});

		// HP LINKS
		let hpLinks = data.links.length;
		let hpMMLinks = data.links.filter(d => d.relType == "M/M");
		let hpFFLinks = data.links.filter(d => d.relType == "F/F");
		let hpFMLinks = data.links.filter(d => d.relType == "F/M");
		let hpGenLinks = data.links.filter(d => d.relType == "Gen");
		let hpOtherLinks = data.links.filter(d => d.relType == "Other");
		hpMMLinksPercent = hpMMLinks.length/hpLinks*100;
		hpFFLinksPercent = hpFFLinks.length/hpLinks*100;
		hpFMLinksPercent = hpFMLinks.length/hpLinks*100;
		hpOtherLinksPercent = hpOtherLinks.length/hpLinks*100;
		console.log({hpMMLinksPercent, hpFFLinksPercent, hpFMLinksPercent, hpOtherLinksPercent});

		// MCU NODES
		mcuCharacters = data2.nodes.length;
		let mcuMCharacters = data2.nodes.filter(d => d.gender == "M");
		let mcuFCharacters = data2.nodes.filter(d => d.gender == "F");
		let mcuOCharacters = data.nodes.filter(d => d.gender == "Other");
		mcuMCharPercent = mcuMCharacters.length/mcuCharacters*100;
		mcuFCharPercent = mcuFCharacters.length/mcuCharacters*100;
		mcuOCharPercent = mcuOCharacters.length/mcuCharacters*100;
		console.log({mcuMCharPercent, mcuFCharPercent, mcuOCharPercent})
		
		// MCU LINKS
		let mcuLinks = data2.links.length;
		let mcuMMLinks = data2.links.filter(d => d.relType == "M/M");
		let mcuFFLinks = data2.links.filter(d => d.relType == "F/F");
		let mcuFMLinks = data2.links.filter(d => d.relType == "F/M");
		let mcuGenLinks = data2.links.filter(d => d.relType == "Gen");
		let mcuOtherLinks = data2.links.filter(d => d.relType == "Other");
		mcuMMLinksPercent = mcuMMLinks.length/mcuLinks*100;
		mcuFFLinksPercent = mcuFFLinks.length/mcuLinks*100;
		mcuFMLinksPercent = mcuFMLinks.length/mcuLinks*100;
		mcuOtherLinksPercent = mcuOtherLinks.length/mcuLinks*100;
		console.log({mcuMMLinksPercent, mcuFFLinksPercent, mcuFMLinksPercent, mcuOtherLinksPercent});

		let chart = ForceGraph(data, {
			nodeId: d => d.index,
			nodeGender: d => d.gender,
			nodeTitle: d => `${d.name}`,
			linkStrokeWidth: l => Math.sqrt(l.value)/20,
			linkStroke: l => l.relType,
			width,
			height: 600,
		});

		let chart2 = ForceGraph(data2, {
			nodeId: d => d.index,
			nodeGender: d => d.gender,
			nodeTitle: d => `${d.name}`,
			linkStrokeWidth: l => Math.sqrt(l.value)/20,
			linkStroke: l => l.relType,
			width,
			height: 600,
		});
		
		d3.select(element).append(() => chart);
		d3.select(element2).append(() => chart2);

		// SELECTIONS
		hpNodes = d3.selectAll("#hp-network-chart svg g circle");
		hpMNodes = d3.selectAll("#hp-network-chart svg g .node-m");
		hpFNodes = d3.selectAll("#hp-network-chart svg g .node-f");
		hpOtherNodes = d3.selectAll("#hp-network-chart svg g .node-other");
		hpLines = d3.selectAll("#hp-network-chart svg g line");
		hpMMLines = d3.selectAll("#hp-network-chart svg g .link-mm");
		hpFFLines = d3.selectAll("#hp-network-chart svg g .link-ff");
		hpFMLines = d3.selectAll("#hp-network-chart svg g .link-fm");
		hpOtherLines = d3.selectAll("#hp-network-chart svg g .link-other");

		mcuNodes = d3.selectAll("#mcu-network-chart svg g circle");
		mcuMNodes = d3.selectAll("#mcu-network-chart svg g .node-m");
		mcuFNodes = d3.selectAll("#mcu-network-chart svg g .node-f");
		mcuOtherNodes = d3.selectAll("#mcu-network-chart svg g .node-other");
		mcuLines = d3.selectAll("#mcu-network-chart svg g line");
		mcuMMLines = d3.selectAll("#mcu-network-chart svg g .link-mm");
		mcuFFLines = d3.selectAll("#mcu-network-chart svg g .link-ff");
		mcuFMLines = d3.selectAll("#mcu-network-chart svg g .link-fm");
		mcuOtherLines = d3.selectAll("#mcu-network-chart svg g .link-other");
		
		mounted = true;
    })

    function ForceGraph({
		nodes, // an iterable of node objects (typically [{id}, …])
		links // an iterable of link objects (typically [{source, target}, …])
	}, {
		nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
		nodeGender, // given d in nodes, returns an (ordinal) value for color
		// nodeGroups, // an array of ordinal values representing the node groups
		nodeTitle, // given d in nodes, a title string
		nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
		nodeStroke = "#fff", // node stroke color
		nodeStrokeWidth = 1, // node stroke width, in pixels
		nodeStrokeOpacity = 1, // node stroke opacity
		nodeRadius = 10, // node radius, in pixels
		nodeStrength,
		linkSource = ({source}) => source, // given d in links, returns a node identifier string
		linkTarget = ({target}) => target, // given d in links, returns a node identifier string
		linkStroke, // link stroke color
		linkStrokeOpacity = 0.6, // link stroke opacity
		linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
		linkStrokeLinecap = "round", // link stroke linecap
		linkStrength,
		colors = d3.schemeTableau10, // an array of color strings, for the node groups
		width = innerWidth, // outer width, in pixels
		height = 400, // outer height, in pixels
		invalidation // when this promise resolves, stop the simulation
	} = {}) {
		// Compute values.
		const N = d3.map(nodes, nodeId).map(intern);
		const LS = d3.map(links, linkSource).map(intern);
		const LT = d3.map(links, linkTarget).map(intern);
		if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
		const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
		const G = nodeGender == null ? null : d3.map(nodes, nodeGender).map(intern);
		const W = typeof linkStrokeWidth !== "function" ? null : d3.map(links, linkStrokeWidth);
		const L = typeof linkStroke !== "function" ? null : d3.map(links, linkStroke);
		const gender = d3.map(nodes, nodeId).map(intern);

		// Replace the input nodes and links with mutable objects for the simulation.
		nodes = d3.map(nodes, (_, i) => ({id: N[i]}));
		links = d3.map(links, (_, i) => ({source: LS[i], target: LT[i]}));

		// Compute default domains.
		// if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

		// Construct the scales.
		// const color = nodeGender == null ? null : d3.scaleOrdinal(nodeGroups, colors);

		// Construct the forces.
		const forceNode = d3.forceManyBody().strength(-40);
		const forceLink = d3.forceLink(links).distance(100).id(({index: i}) => N[i]);
		if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
		if (linkStrength !== undefined) forceLink.strength(linkStrength);

		const simulation = d3.forceSimulation(nodes)
				.force("link", forceLink)
				.force("charge", forceNode)
                .force("r", d3.forceRadial(function(d, i) { return innerWidth/5; }))
				.force("center",  d3.forceCenter())
				.on("tick", ticked);

		const svg = d3.create("svg")
				.attr("width", width)
				.attr("height", height)
				.attr("viewBox", [-width / 2, -height / 2, width, height])
				.attr("style", "max-width: 100%; height: auto; height: intrinsic;");

		const link = svg.append("g")
				.attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
				.attr("stroke-opacity", linkStrokeOpacity)
				.attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
				.attr("stroke-linecap", linkStrokeLinecap)
                .selectAll("line")
                .data(links)
                .join("line");

		const node = svg.append("g")
				.attr("fill", nodeFill)
				.attr("stroke", nodeStroke)
				.attr("stroke-opacity", nodeStrokeOpacity)
				.attr("stroke-width", nodeStrokeWidth)
                .selectAll("circle")
                .data(nodes)
                .join("circle")
				.attr("r", nodeRadius)
				.attr("fill", "#C0B9C6")
				// .call(drag(simulation));

		if (W) link.attr("stroke-width", ({index: i}) => W[i]);
		if (L) link.attr("class", function({index: i}) {
			let linkColor = L[i] == "M/M"
				? "link-mm"
				: L[i] == "F/F"
				? "link-ff"
				: L[i] == "F/M"
				? "link-fm"
				: "link-gen"
			return linkColor
		});
		if (G) node.attr("class", function({index: i}) {
			let fillColor = G[i] == "M" ? "node-m" : "node-f"
			return fillColor
		});
		if (T) node.append("title").text(({index: i}) => T[i]);
		if (invalidation != null) invalidation.then(() => simulation.stop());

		function intern(value) {
			return value !== null && typeof value === "object" ? value.valueOf() : value;
		}

		function ticked() {
			link
				.attr("x1", d => d.source.x)
				.attr("y1", d => d.source.y)
				.attr("x2", d => d.target.x)
				.attr("y2", d => d.target.y);

			node
				.attr("cx", d => d.x)
				.attr("cy", d => d.y);
		}

		return Object.assign(svg.node());
	}

	let scrollIndex;

    // To replace with copy once copy is set
    let steps = ["Here are the characters from the Harry Potter (61) and MCU (59) fandoms that appear in AO3 ships with more than 1,000 works.",
		"38 (62%) of the characters are men and 23 (38%) of the characters are women",
		"M/M 23, F/F 8, F/M 35, Gen 14 "
	];

	function updateScrollSteps(mounted, scrollIndex) {
		console.log({mounted, scrollIndex})
		if (mounted && scrollIndex == undefined) {
			hpLines.style("opacity", 0);
			hpNodes.style("opacity", 0).style("fill", "#C0B9C6");
			mcuLines.style("opacity", 0);
			mcuNodes.style("opacity", 0).style("fill", "#C0B9C6");
		}
		else if (mounted && scrollIndex == 0) {
			hpLines.style("opacity", 0);
			hpNodes.style("opacity", 1).style("fill", "#C0B9C6");
			mcuLines.style("opacity", 0);
			mcuNodes.style("opacity", 1).style("fill", "#C0B9C6");
		} else if (mounted && scrollIndex == 1) {
			hpLines.style("opacity", 0);
			mcuLines.style("opacity", 0);
			hpMNodes.style("fill", "#1B2AA6");
			mcuMNodes.style("fill", "#1B2AA6");
			hpFNodes.style("fill", "#FFAAB9");
			mcuFNodes.style("fill", "#FFAAB9");
		} else if (mounted && scrollIndex == 2) {
			hpMNodes.style("fill", "#1B2AA6");
			mcuMNodes.style("fill", "#1B2AA6");
			hpFNodes.style("fill", "#FFAAB9");
			mcuFNodes.style("fill", "#FFAAB9");
			hpMMLines.style("opacity", 1);
			mcuMMLines.style("opacity", 1);
			hpFFLines.style("opacity", 0);
			mcuFFLines.style("opacity", 0);
			hpFMLines.style("opacity", 0);
			mcuFMLines.style("opacity", 0);
		} else if (mounted && scrollIndex == 3) {
			hpMNodes.style("fill", "#1B2AA6");
			mcuMNodes.style("fill", "#1B2AA6");
			hpFNodes.style("fill", "#FFAAB9");
			mcuFNodes.style("fill", "#FFAAB9");
			hpMMLines.style("opacity", 0);
			mcuMMLines.style("opacity", 0);
			hpFFLines.style("opacity", 1);
			mcuFFLines.style("opacity", 1);
			hpFMLines.style("opacity", 0);
			mcuFMLines.style("opacity", 0);
		} else if (mounted && scrollIndex == 4) {
			hpMNodes.style("fill", "#1B2AA6");
			mcuMNodes.style("fill", "#1B2AA6");
			hpFNodes.style("fill", "#FFAAB9");
			mcuFNodes.style("fill", "#FFAAB9");
			hpMMLines.style("opacity", 0);
			mcuMMLines.style("opacity", 0);
			hpFFLines.style("opacity", 0);
			mcuFFLines.style("opacity", 0);
			hpFMLines.style("opacity", 1);
			mcuFMLines.style("opacity", 1);
		}
	}

	$: updateScrollSteps(mounted, scrollIndex);
</script>

<svelte:window bind:innerWidth />

<section id="scrolly">
    <div class="sticky">
		<div class="chart-wrapper">
            <ChartHeader title={"TKTK"} />
			<div class="viz-wrapper">
				<div class="hed-wrapper">
					<h3>Harry Potter</h3>
					<div class="percent-bar">
						<div class="mm-bar" style="width: {Math.round(hpMMLinksPercent)}%"></div>
						<div class="ff-bar" style="width: {Math.round(hpFFLinksPercent)}%"></div>
						<div class="fm-bar" style="width: {Math.round(hpFMLinksPercent)}%"></div>
					</div>
					<div id="hp-network-chart" bind:this={element}>	</div>
				</div>
				<div class="hed-wrapper">
					<h3>Marvel Cinematic Universe</h3>
					<div class="percent-bar">
						<div class="mm-bar" style="width: {Math.round(mcuMMLinksPercent)}%"></div>
						<div class="ff-bar" style="width: {Math.round(mcuFFLinksPercent)}%"></div>
						<div class="fm-bar" style="width: {Math.round(mcuFMLinksPercent)}%"></div>
					</div>
					<div id="mcu-network-chart" bind:this={element2}>	</div>
				</div>
			</div>
		</div>
    </div>
    <Scrolly bind:value={scrollIndex}>
			<div class="step">
				<p>Here are the characters from the Harry Potter ({hpCharacters}) and MCU ({mcuCharacters}) fandoms that appear in AO3 romantic ships with more than 1,000 works.</p>
			</div>
			<div class="step">
				<p>In Harry Potter {Math.round(hpMCharPercent)}% of the characters are men (blue) and {Math.round(hpFCharPercent)}% of the characters are women (pink).
					In the MCU {Math.round(mcuMCharPercent)}% of the characters are men (blue) and {Math.round(mcuFCharPercent)}% of the characters are women (pink).
				</p>
			</div>
			<div class="step">
				<p>M/M relationships make up {Math.round(hpMMLinksPercent)}% of the ships in Harry Potter and make up {Math.round(mcuMMLinksPercent)}% of the ships in the MCU.
				</p>
			</div>
			<div class="step">
				<p>F/F relationships make up {Math.round(hpFFLinksPercent)}% of the ships in Harry Potter and make up {Math.round(mcuFFLinksPercent)}% of the ships in the MCU.
				</p>
			</div>
			<div class="step">
				<p>F/M relationships make up {Math.round(hpFMLinksPercent)}% of the ships in Harry Potter and make up {Math.round(mcuFMLinksPercent)}% of the ships in the MCU.
				</p>
			</div>
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
		display: flex;
		flex-direction: row;
		padding: 2rem 0;
		align-items: center;
	}
	.hed-wrapper {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 600px;
	}

	.hed-wrapper h3 {
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

	:global(#hp-network-chart svg g circle, #hp-network-chart svg g line) {
		opacity: 0
	}
</style>