
<script>
    import {onMount} from 'svelte';
    import * as d3 from "d3";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import ChartHeader from "$components/chartpages/ChartHeader.svelte";

    let innerWidth;

    let width = innerWidth;
    let element;
	let element2;

    onMount(async function() {
        let data = await d3.json('./assets/data/RPF/network.json');
		let data2 = await d3.json('./assets/data/RPF/network.json');

        let chart = ForceGraph(data, {
			nodeId: d => d.index,
			nodeGender: d => d.gender,
			nodeTitle: d => `${d.name}`,
			linkStrokeWidth: l => Math.sqrt(l.value)/20,
			linkStroke: l => l.relType,
			width,
			height: 600,
		});

		let chart2 = ForceGraph(data, {
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
		// Or alternatively, via the native DOM API:
		// element.appendChild(chart)
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
		console.log({G})

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
    let steps = ["Here are the 61 characters from Harry Potter that appear in AO3 ships with more than 1,000 works.",
		"38 (62%) of the characters are men and 23 (38%) of the characters are women",
		"M/M 23, F/F 8, F/M 35, Gen 14 "
	];

	function updateScrollSteps(scrollIndex) {
		console.log(scrollIndex)
		if (scrollIndex == 0 || scrollIndex == undefined) {
			d3.selectAll("#hp-network-chart svg g line").attr("opacity", 0);
			d3.selectAll("#hp-network-chart svg g circle").attr("fill", "#C0B9C6");
		} else if (scrollIndex == 1) {
			d3.selectAll("#hp-network-chart svg g line").attr("opacity", 0);
			d3.selectAll("#hp-network-chart svg g .node-m").attr("fill", "#1B2AA6");
			d3.selectAll("#hp-network-chart svg g .node-f").attr("fill", "#FFAAB9");
		} else if (scrollIndex == 2) {
			d3.selectAll("#hp-network-chart svg g line").attr("opacity", 1);
		}
	}

	// $: updateScrollSteps(scrollIndex);
</script>

<svelte:window bind:innerWidth />

<section id="scrolly">
    <div class="sticky">
		<div class="chart-wrapper">
            <ChartHeader title={"TKTK"} />
			<div class="viz-wrapper">
				<div id="hp-network-chart" bind:this={element}>	</div>
				<div id="mcu-network-chart" bind:this={element2}>	</div>
			</div>
		</div>
    </div>
    <Scrolly bind:value={scrollIndex}>
        {#if steps}
            {#each steps as text, i}
                <div class="step">
                    <p>{@html text}</p>
                </div>
            {/each}
        {/if}
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
		height: 500px;
		align-items: center;
	}
	.viz-wrapper div {
		width: 50%;
	}
	:global(.link-mm) {
		stroke: var(--fanfic-blue);
	}
	:global(.link-ff) {
		stroke: var(--fanfic-pink);
	}
	:global(.link-fm) {
		stroke: var(--fanfic-highlighter);
	}
	:global(.link-gen) {
		stroke: var(--fanfic-window-gray);
	}
</style>