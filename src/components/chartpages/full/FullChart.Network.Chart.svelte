
<script>
    import {onMount} from 'svelte';
    import * as d3 from "d3";

    export let fandom;
    export let scrollIndex;

    let innerWidth;

    let width = innerWidth;
    let element;
	let mounted = false;

    let nodes;
    let hpNodes;
    let mcuNodes;
	let mNodes;
	let fNodes;
    let otherNodes;
    let links;
    let mmLinks;
    let ffLinks;
    let fmLinks;
    let otherLinks;

    let summaryData = [];

	function calculateVals(data) {
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

        summaryData.push({nodesCount, nodesMPercent, nodesFPercent, nodesOtherPercent, linksCount, linksMMPercent, linksFFPercent, linksFMPercent, linksOtherPercent});
	}

    onMount(async function() {
        let data = await d3.json(fandom.dataUrl);

        calculateVals(data);

		let chart = ForceGraph(data, {
			nodeId: d => d.index,
			nodeGender: d => d.gender,
			nodeTitle: d => `${d.name}`,
			linkStrokeWidth: l => Math.sqrt(l.value)/20,
			linkStroke: l => l.relType,
			width,
			height: 600,
		});
		
		d3.select(element).append(() => chart);

		// SELECTIONS
		nodes = d3.selectAll(".network-chart svg g circle");
        hpNodes = d3.selectAll("#harrypotter-network svg g circle");
        mcuNodes = d3.selectAll("#marvelcinematicuniverse-network svg g circle");
		mNodes = d3.selectAll(".network-chart svg g .node-m");
		fNodes = d3.selectAll(".network-chart svg g .node-f");
        otherNodes = d3.selectAll(".network-chart svg g .node-other");

        links = d3.selectAll(".network-chart svg g line");
        mmLinks= d3.selectAll(".network-chart svg g .link-mm");
        ffLinks= d3.selectAll(".network-chart svg g .link-ff");
        fmLinks= d3.selectAll(".network-chart svg g .link-fm");
        otherLinks= d3.selectAll(".network-chart svg g .link-other");
		
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

		// Construct the forces.
		const forceNode = d3.forceManyBody().strength(-40);
		const forceLink = d3.forceLink(links).distance(200).id(({index: i}) => N[i]);
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

		if (W) link.attr("stroke-width", ({index: i}) => W[i]*2);
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

	function updateScrollSteps(mounted, scrollIndex) {
		// console.log({mounted, scrollIndex})
        if (mounted && scrollIndex == undefined) {
            nodes.attr("opacity", 0);
            links.attr("opacity", 0);
        } else if (mounted && scrollIndex == 0) {
            hpNodes
                .attr("fill", "#C0B9C6")
                .transition()
                .delay((d,i) => i*20)
                .duration(1000)
                .attr("opacity", 1);
            mcuNodes
                .attr("fill", "#C0B9C6")
                .transition()
                .delay((d,i) => i*10)
                .duration(1000)
                .attr("opacity", 1);
            links.attr("opacity", 0);
        } else if (mounted && scrollIndex == 1) {
            mNodes
                .attr("opacity", 1)
                .transition()
                .duration(1000)
                .attr("fill", "#1B2AA6");
            fNodes
                .attr("opacity", 1)
                .transition()
                .duration(1000)
                .attr("fill", "#FFAAB9");
            links.attr("opacity", 0);
        } else if (mounted && scrollIndex == 2) {
            mNodes.attr("opacity", 1).attr("fill", "#1B2AA6");
            fNodes.attr("opacity", 0.25).attr("fill", "#FFAAB9");
            mmLinks
                .transition()
                .duration(1000)
                .attr("opacity", 1);
            ffLinks
                .transition()
                .duration(1000)
                .attr("opacity", 0);
            fmLinks
                .transition()
                .duration(1000)
                .attr("opacity", 0);
        } else if (mounted && scrollIndex == 3) {
            mNodes.attr("opacity", 0.25).attr("fill", "#1B2AA6");
            fNodes.attr("opacity", 1).attr("fill", "#FFAAB9");
            mmLinks
                .transition()
                .duration(1000)
                .attr("opacity", 0);
            ffLinks
                .transition()
                .duration(1000)
                .attr("opacity", 1);
            fmLinks
                .transition()
                .duration(1000)
                .attr("opacity", 0);
        } else if (mounted && scrollIndex == 4) {
            mNodes.attr("opacity", 1).attr("fill", "#1B2AA6");
            fNodes.attr("opacity", 1).attr("fill", "#FFAAB9");
            otherNodes.attr("opacity", 1).attr("fill", "#C0B9C6");
            mmLinks
                .transition()
                .duration(1000)
                .attr("opacity", 0);
            ffLinks
                .transition()
                .duration(1000)
                .attr("opacity", 0);
            fmLinks
                .transition()
                .duration(1000)
                .attr("opacity", 1);
        } else if (mounted && scrollIndex == 5) {
            mNodes.attr("opacity", 1).attr("fill", "#1B2AA6");
            fNodes.attr("opacity", 1).attr("fill", "#FFAAB9");
            otherNodes.attr("opacity", 1).attr("fill", "#C0B9C6");
            mmLinks
                .transition()
                .duration(1000)
                .attr("opacity", 1);
            ffLinks
                .transition()
                .duration(1000)
                .attr("opacity", 1);
            fmLinks
                .transition()
                .duration(1000)
                .attr("opacity", 1);
        }
	}

	$: updateScrollSteps(mounted, scrollIndex);

    function cleanString(input) {
        return input
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');
    }
</script>

<svelte:window bind:innerWidth />


<div class="network-chart" id="{cleanString(fandom.fandom)}-network" bind:this={element}>	</div>


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

	/* :global(#hp-network-chart svg g circle, #hp-network-chart svg g line) {
		opacity: 0
	} */
</style>