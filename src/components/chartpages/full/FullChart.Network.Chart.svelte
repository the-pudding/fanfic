
<script>
    import {onMount} from 'svelte';
    import * as d3 from "d3";

    export let fandom;
    export let scrollIndex;

    let divW;

    let width = divW;
    let height = divW;
    let element;
	let mounted = false;

    let nodes;
    let hpNodes;
    let mcuNodes;
	let mNodes;
	let fNodes;
    let links;
    let mmLinks;
    let ffLinks;
    let fmLinks;
    let containerDiv;

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
			height,
		});
		
		d3.select(element).append(() => chart);

		// SELECTIONS
		nodes = d3.selectAll(".network-chart svg rect");
        hpNodes = d3.selectAll("#harrypotter-network svg g rect");
        mcuNodes = d3.selectAll("#marvelcinematicuniverse-network svg g rect");
		mNodes = d3.selectAll(".network-chart svg g .node-m");
		fNodes = d3.selectAll(".network-chart svg g .node-f");

        links = d3.selectAll(".network-chart svg g line");
        mmLinks= d3.selectAll(".network-chart svg g .link-mm");
        ffLinks= d3.selectAll(".network-chart svg g .link-ff");
        fmLinks= d3.selectAll(".network-chart svg g .link-fm");
        containerDiv = d3.selectAll(".network-chart");
		
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
		nodeRadius = 7, // node radius, in pixels
        nodeWidth = 12,
		nodeStrength,
		linkSource = ({source}) => source, // given d in links, returns a node identifier string
		linkTarget = ({target}) => target, // given d in links, returns a node identifier string
		linkStroke, // link stroke color
		linkStrokeOpacity = 0, // link stroke opacity
		linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
		linkStrokeLinecap = "round", // link stroke linecap
		linkStrength,
		colors = d3.schemeTableau10, // an array of color strings, for the node groups
		width = divW, // outer width, in pixels
		height = divW, // outer height, in pixels
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
		const forceLink = d3.forceLink(links).distance(100).id(({index: i}) => N[i]);
		if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
		if (linkStrength !== undefined) forceLink.strength(linkStrength);

        $: console.log({divW})

		const simulation = d3.forceSimulation(nodes)
				.force("link", forceLink)
				.force("charge", forceNode)
                .force("r", d3.forceRadial(function(d, i) { return divW/100; }))
				.force("center",  d3.forceCenter())
				.on("tick", ticked);

		const svg = d3.create("svg")
				.attr("width", width)
				.attr("height", height)
				.attr("viewBox", [-width / 2, -height / 2, width, height])
				.attr("style", "max-width: 100%; height: auto; height: intrinsic;");

		const link = svg.append("g")
				.attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
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
                .selectAll("rect")
                .data(nodes)
                .join("rect")
				.attr("width", nodeWidth )   
                .attr("height", nodeWidth )
                .attr("x", d => d.x - nodeWidth  / 2)
                .attr("y", d => d.y - nodeWidth  / 2)
				.attr("fill", "#C0B9C6")
                .on("mouseover", function(event, d) {
                    node.style("opacity", 0.1);
                    link.style("opacity", 0.1);

                    d3.select(this).style("opacity", 1);

                    link.filter(function(l) {
                        return l.source === d || l.target === d;
                    })
                    .style('opacity', 0.6)
                    .each(function(link) {
                        node.filter(function(n) {
                            return n === link.source || n === link.target;
                        }).style('opacity', 1);
                        textElems.filter(function(t) {
                            return t === link.source || t === link.target;
                        }).style('opacity', 1);
                    });
                })
                .on("mouseout", function() {
                    node.style('opacity', 1);
                    link.style('opacity', 1);
                    textElems.style('opacity', 0);
                })

        const textElems = svg.append("g")
            .selectAll('text')
            .data(nodes)
            .join('text')
            .text(d => T[d.id])
            .attr("class", "dot-label")

		if (W) link.attr("stroke-width", ({index: i}) => W[i]*1.5);
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
		if (T) node.append("text").text(({index: i}) => T[i]);
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
                .attr("x", d => d.x - nodeWidth  / 2)
                .attr("y", d => d.y - nodeWidth  / 2);
            
            textElems
                .attr("x", d => d.x + 10)
                .attr("y", d => d.y);
		}

		return Object.assign(svg.node());
    }

	function updateScrollSteps(mounted, scrollIndex) {
        if (mounted && scrollIndex == undefined) {
            containerDiv.style("pointer-events", "none");
            nodes.attr("opacity", 0);
            links.attr("opacity", 0).attr("stroke", "#C0B9C6");
        } else if (mounted && scrollIndex == 0) {
            containerDiv.style("pointer-events", "none");
            links.attr("opacity", 0).attr("stroke", "#C0B9C6");
            hpNodes
                .attr("fill", "#C0B9C6")
                .transition()
                .delay((d,i) => i*20)
                .duration(500)
                .attr("opacity", 1);
            mcuNodes
                .attr("fill", "#C0B9C6")
                .transition()
                .delay((d,i) => i*20)
                .duration(500)
                .attr("opacity", 1);
        } else if (mounted && scrollIndex == 1) {
            containerDiv.style("pointer-events", "none");
            links.attr("opacity", 0).attr("stroke", "#C0B9C6");
            fNodes
                .attr("opacity", 1)
                .transition()
                .duration(500)
                .attr("fill", "#FFAAB9");
            mNodes
                .attr("opacity", 1)
                .transition()
                .duration(500)
                .attr("fill", "#C0B9C6");
        } else if (mounted && scrollIndex == 2) {
            containerDiv.style("pointer-events", "none");
            links.attr("opacity", 0).attr("stroke", "#C0B9C6");
            fNodes
                .attr("opacity", 1)
                .transition()
                .duration(500)
                .attr("fill", "#C0B9C6");
            mNodes
                .attr("opacity", 1)
                .transition()
                .duration(500)
                .attr("fill", "#1B2AA6");
        } else if (mounted && scrollIndex == 3) {
            containerDiv.style("pointer-events", "none");
            mNodes.attr("opacity", 1).attr("fill", "#1B2AA6");
            fNodes.attr("opacity", 1).attr("fill", "#FFAAB9");
            links
                .transition()
                .duration(500)
                .attr("opacity", 0.6);
        } else if (mounted && scrollIndex == 4) {
            containerDiv.style("pointer-events", "none");
            mNodes.attr("opacity", 0.25).attr("fill", "#1B2AA6");
            fNodes.attr("opacity", 1).attr("fill", "#FFAAB9");
            mmLinks
                .transition()
                .duration(500)
                .attr("stroke", "#C0B9C6")
                .attr("opacity", 0);
            ffLinks
                .transition()
                .duration(500)
                .attr("stroke", "#FFAAB9")
                .attr("opacity", 0.6);
            fmLinks
                .transition()
                .duration(1000)
                .attr("stroke", "#C0B9C6")
                .attr("opacity", 0);
        } else if (mounted && scrollIndex == 5) {
            containerDiv.style("pointer-events", "none");
            mNodes.attr("opacity", 1).attr("fill", "#1B2AA6");
            fNodes.attr("opacity", 0.25).attr("fill", "#FFAAB9");
            mmLinks
                .transition()
                .duration(500)
                .attr("stroke", "#1B2AA6")
                .attr("opacity", 0.6);
            ffLinks
                .transition()
                .duration(500)
                .attr("stroke", "#C0B9C6")
                .attr("opacity", 0);
            fmLinks
                .transition()
                .duration(500)
                .attr("stroke", "#C0B9C6")
                .attr("opacity", 0);
        } else if (mounted && scrollIndex == 6) {
            containerDiv.style("pointer-events", "none");
            mNodes.attr("opacity", 1).attr("fill", "#1B2AA6");
            fNodes.attr("opacity", 1).attr("fill", "#FFAAB9");
            mmLinks
                .transition()
                .duration(500)
                .attr("stroke", "#C0B9C6")
                .attr("opacity", 0);
            ffLinks
                .transition()
                .duration(500)
                .attr("stroke", "#C0B9C6")
                .attr("opacity", 0);
            fmLinks
                .transition()
                .duration(500)
                .attr("stroke", "#119C72")
                .attr("opacity", 0.6);
        } else if (mounted && scrollIndex == 7) {
            containerDiv.style("pointer-events", "auto").style("cursor", "pointer");
            mNodes.attr("opacity", 1).attr("fill", "#1B2AA6");
            fNodes.attr("opacity", 1).attr("fill", "#FFAAB9");
            mmLinks
                .transition()
                .duration(500)
                .attr("stroke", "#1B2AA6")
                .attr("opacity", 0.6);
            ffLinks
                .transition()
                .duration(500)
                .attr("stroke", "#FFAAB9")
                .attr("opacity", 0.6);
            fmLinks
                .transition()
                .duration(500)
                .attr("stroke", "#119C72")
                .attr("opacity", 0.6);
        }
	}

	$: updateScrollSteps(mounted, scrollIndex);

    function cleanString(input) {
        return input
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');
    }
</script>


<div bind:clientWidth={divW} class="network-chart" id="{cleanString(fandom.fandom)}-network" bind:this={element}>	</div>


<style>
    .network-chart {
        width: 100%;
        pointer-events: none;
        cursor: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    :global(.dot-label) {
        font-family: var(--mono);
        font-size: 12px;
        opacity: 0;
        pointer-events: none;
        font-weight: bold;
    }
	@media (max-width: 600px) { 
	}
</style>