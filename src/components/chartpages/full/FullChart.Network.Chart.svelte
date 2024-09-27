
<script>
    import {onMount} from 'svelte';
    import * as d3 from "d3";
    import hpNetworkData from "$data/SLASH/SLASH_harryPotterShips.csv";
	import mcuNetworkData from "$data/SLASH/SLASH_mcuShips.csv";

    export let fandom;
    export let scrollIndex;

    let divW;
    let pageInnerWidth;

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
    let formatedData;

    function formatData(data) {
        const nodes = [];
        const links = [];
        const nodeMap = {};

        data.forEach((entry) => {
            const { partnerA, partnerAID, partnerAGender, partnerB, partnerBID, partnerBGender, relType, totalWorks } = entry;

            // Add Partner A if not already in the nodes
            if (!nodeMap[partnerAID]) {
                const nodeA = {
                    name: partnerA,
                    gender: partnerAGender,
                    group: 1,
                    index: parseInt(partnerAID)
                };

                nodes.push(nodeA);
                nodeMap[partnerAID] = nodeA;
            }

            // Add Partner B if not already in the nodes
            if (!nodeMap[partnerBID]) {
                const nodeB = {
                    name: partnerB,
                    gender: partnerBGender,
                    group: 1,
                    index: parseInt(partnerBID)
                };
                nodes.push(nodeB);
                nodeMap[partnerBID] = nodeB;  // Map to track added nodes
            }

            // Create a link
            const link = {
                source: parseInt(partnerAID),
                target: parseInt(partnerBID),
                value: parseInt(totalWorks),
                relType: relType
            };
            links.push(link);
        });

        return { nodes, links };
    }

	function calculateVals(data) {
        // NODES
        const nodesCount = data.nodes.length;
        const nodesMCount = data.nodes.filter(d => d.gender == "M").length;
        const nodesFCount = data.nodes.filter(d => d.gender == "F").length;
        const nodesMPercent = nodesMCount/nodesCount*100;
        const nodesFPercent = nodesFCount/nodesCount*100;

        // LINKS
        const linksCount = data.links.length;
        const linksMMCount = data.nodes.filter(d => d.relType == "MM").length;
        const linksFFCount = data.nodes.filter(d => d.relType == "FF").length;
        const linksFMCount = data.nodes.filter(d => d.relType == "FM").length;
        const linksMMPercent = linksMMCount/linksCount*100;
        const linksFFPercent = linksFFCount/linksCount*100;
        const linksFMPercent = linksFMCount/linksCount*100;

        summaryData.push({nodesCount, nodesMPercent, nodesFPercent, linksCount, linksMMPercent, linksFFPercent, linksFMPercent });
	}

    function setupChart(data) {
        console.log("chart")
        if (data) {
            let chart = ForceGraph(data, {
                nodeId: d => d.index,
                nodeGender: d => d.gender,
                nodeTitle: d => `${d.name}`,
                linkStrokeWidth: l => Math.sqrt(l.value)/10,
                linkStroke: l => l.relType,
                width,
                height,
            });
            
            d3.select(element).html(''); // Clear the existing chart (if any)
            d3.select(element).append(() => chart);
        }
    }

    onMount(async function() {

        formatedData = fandom.fandom == "Harry Potter"
            ? formatData(hpNetworkData)
            : formatData(mcuNetworkData);

        calculateVals(formatedData);

		setupChart(formatedData);

		// SELECTIONS
		nodes = d3.selectAll(".network-chart svg rect");
        hpNodes = d3.selectAll("#harrypotter-network svg g rect");
        mcuNodes = d3.selectAll("#mcu-network svg g rect");
		mNodes = d3.selectAll(".network-chart svg g rect.M");
		fNodes = d3.selectAll(".network-chart svg g rect.F");

        links = d3.selectAll(".network-chart svg g line");
        mmLinks= d3.selectAll(".network-chart svg g line.MM");
        ffLinks= d3.selectAll(".network-chart svg g line.FF");
        fmLinks= d3.selectAll(".network-chart svg g line.FM");
        containerDiv = d3.selectAll(".network-chart");
		
		mounted = true;
    })

    

    function ForceGraph({
		nodes, // an iterable of node objects (typically [{id}, …])
		links // an iterable of link objects (typically [{source, target}, …])
	}, {
		nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
		nodeGender = d => d.gender,
		nodeTitle = d => d.name, // given d in nodes, a title string
		nodeStrength,
		linkSource = ({source}) => source, // given d in links, returns a node identifier string
		linkTarget = ({target}) => target, // given d in links, returns a node identifier string
		linkStroke = ({relType}) => relType.replace("/", ""), // link stroke color
		linkStrokeWidth = ({value}) => value, // given d in links, returns a stroke width in pixels
		linkStrength,
		width = divW, // outer width, in pixels
		height = divW, // outer height, in pixels
		invalidation // when this promise resolves, stop the simulation
	} = {}) {
		// Compute values.
		const N = d3.map(nodes, nodeId).map(intern);
        const G = d3.map(nodes, nodeGender).map(intern);
        const T = d3.map(nodes, nodeTitle).map(intern);
		const LS = d3.map(links, linkSource).map(intern);
		const LT = d3.map(links, linkTarget).map(intern);
        const LR = d3.map(links, linkStroke).map(intern);
        const LW = typeof linkStrokeWidth !== "function" ? null : d3.map(links, linkStrokeWidth);

		// Replace the input nodes and links with mutable objects for the simulation.
		nodes = d3.map(nodes, (_, i) => ({id: N[i], gender: G[i], title: T[i]}));
		links = d3.map(links, (_, i) => ({source: LS[i], target: LT[i], relType: LR[i], value: LW[i]}));

		// Construct the forces.
        const forceX = pageInnerWidth > 600 ? d3.forceX().strength(0) : d3.forceX().strength(0);  // Custom strength for x-axis
        const forceY = pageInnerWidth > 600 ? d3.forceY().strength(0) : d3.forceY().strength(0.1); // Custom strength for y-axis
		const forceNode = pageInnerWidth > 600 ? d3.forceManyBody().strength(-width/10) : d3.forceManyBody().strength(-width/20);
		const forceLink = pageInnerWidth > 600 ? d3.forceLink(links).distance(100).id(({index: i}) => N[i]) : d3.forceLink(links).distance(50).id(({index: i}) => N[i]);
        const nodeSize = pageInnerWidth > 600 ? 14 : 10;
		if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
		if (linkStrength !== undefined) forceLink.strength(linkStrength);

		const simulation = d3.forceSimulation(nodes)
				.force("link", forceLink)
				.force("charge", forceNode)
                .force("x", forceX) // Custom x-axis force
                .force("y", forceY) // Custom y-axis force
                .force("r", d3.forceRadial(function(d, i) { return divW/100; }))
				.force("center",  d3.forceCenter())
				.on("tick", ticked);

		const svg = d3.create("svg")
				.attr("width", width)
				.attr("height", height)
				.attr("viewBox", [-width / 2, -height / 2, width, height])
				.attr("style", "max-width: 100%; height: auto; height: intrinsic;");

		const link = svg.append("g")
                .selectAll("line")
                .data(links)
                .join("line")
                .attr("class", linkStroke) 
                .attr("stroke-width", d => d.value/1.5)

		const node = svg.append("g")
				.attr("fill", "#c6c6c6")
				.attr("stroke", "#151515")
				.attr("stroke-opacity", 1)
				.attr("stroke-width", 1)
                .selectAll("rect")
                .data(nodes)
                .join("rect")
				.attr("width", nodeSize )   
                .attr("height", nodeSize )
                .attr("x", d => d.x - nodeSize  / 2)
                .attr("y", d => d.y - nodeSize  / 2)
				.attr("class", nodeGender) 
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
            .text(d => d.title)
            .attr("class", "dot-label");
    
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
                .attr("x", d => d.x - 12  / 2)
                .attr("y", d => d.y - 12 / 2);
            
            textElems
                .attr("x", d => d.x > 0 ? d.x - 10 : d.x + 10)
                .attr("y", d => d.y)
                .attr("text-anchor", d => d.x > 0 ? "end" : "start");
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
                .style("fill", "#C0B9C6")
                .transition()
                .delay((d,i) => i*20)
                .duration(500)
                .attr("opacity", 1);
            mcuNodes
                .style("fill", "#C0B9C6")
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
                .style("fill", "#D03E00");
            mNodes
                .attr("opacity", 1)
                .transition()
                .duration(500)
                .style("fill", "#C0B9C6");
        } else if (mounted && scrollIndex == 2) {
            containerDiv.style("pointer-events", "none");
            links.attr("opacity", 0).attr("stroke", "#C0B9C6");
            fNodes
                .attr("opacity", 1)
                .transition()
                .duration(500)
                .style("fill", "#C0B9C6");
            mNodes
                .attr("opacity", 1)
                .transition()
                .duration(500)
                .style("fill", "#1B2AA6");
        } else if (mounted && scrollIndex == 3) {
            containerDiv.style("pointer-events", "none");
            mNodes.attr("opacity", 1).style("fill", "#1B2AA6");
            fNodes.attr("opacity", 1).style("fill", "#D03E00");
            links
                .transition()
                .duration(500)
                .style("stroke", "#C0B9C6")
                .attr("opacity", 0.6);
        } else if (mounted && scrollIndex == 4) {
            containerDiv.style("pointer-events", "none");
            mNodes.attr("opacity", 0.25).style("fill", "#1B2AA6");
            fNodes.attr("opacity", 1).style("fill", "#D03E00");
            mmLinks
                .transition()
                .duration(500)
                .style("stroke", "#C0B9C6")
                .attr("opacity", 0);
            ffLinks
                .transition()
                .duration(500)
                .style("stroke", "#D03E00")
                .attr("opacity", 0.6);
            fmLinks
                .transition()
                .duration(1000)
                .style("stroke", "#C0B9C6")
                .attr("opacity", 0);
        } else if (mounted && scrollIndex == 5) {
            containerDiv.style("pointer-events", "none");
            mNodes.attr("opacity", 1).style("fill", "#1B2AA6");
            fNodes.attr("opacity", 0.25).style("fill", "#D03E00");
            mmLinks
                .transition()
                .duration(500)
                .style("stroke", "#1B2AA6")
                .attr("opacity", 0.6);
            ffLinks
                .transition()
                .duration(500)
                .style("stroke", "#C0B9C6")
                .attr("opacity", 0);
            fmLinks
                .transition()
                .duration(500)
                .style("stroke", "#C0B9C6")
                .attr("opacity", 0);
        } else if (mounted && scrollIndex == 6) {
            containerDiv.style("pointer-events", "none");
            mNodes.attr("opacity", 1).style("fill", "#1B2AA6");
            fNodes.attr("opacity", 1).style("fill", "#D03E00");
            mmLinks
                .transition()
                .duration(500)
                .style("stroke", "#C0B9C6")
                .attr("opacity", 0);
            ffLinks
                .transition()
                .duration(500)
                .style("stroke", "#C0B9C6")
                .attr("opacity", 0);
            fmLinks
                .transition()
                .duration(500)
                .style("stroke", "#119C72")
                .attr("opacity", 0.6);
        } else if (mounted && scrollIndex == 7) {
            containerDiv.style("pointer-events", "auto").style("cursor", "pointer");
            mNodes.attr("opacity", 1).style("fill", "#1B2AA6");
            fNodes.attr("opacity", 1).style("fill", "#D03E00");
            mmLinks
                .transition()
                .duration(500)
                .style("stroke", "#1B2AA6")
                .attr("opacity", 0.6);
            ffLinks
                .transition()
                .duration(500)
                .style("stroke", "#D03E00")
                .attr("opacity", 0.6);
            fmLinks
                .transition()
                .duration(500)
                .style("stroke", "#119C72")
                .attr("opacity", 0.6);
        }
	}

	$: updateScrollSteps(mounted, scrollIndex);

    function cleanString(input) {
        return input
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');
    }

    function debounce(fn, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
            fn(...args);
            }, delay);
        };
    }

    const debouncedSetupChart = debounce(setupChart, 200);

    $: pageInnerWidth, debouncedSetupChart(formatedData);
</script>


<svelte:window bind:innerWidth={pageInnerWidth} />

<div bind:clientWidth={divW} class="network-chart" id="{cleanString(fandom.fandom)}-network" bind:this={element}>	</div>


<style>
    .network-chart {
        width: 100%;
        aspect-ratio: 1;
        pointer-events: none;
        cursor: none;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid;
        border-color: var(--window-inset-stroke);
        background-color: var(--fanfic-black);
        overflow: hidden;
    }

    :global(.network-chart rect.M) {
        fill: var(--fanfic-blue);
    }

    :global(.network-chart rect.F) {
        fill: var(--fanfic-red);
    }

    :global(.network-chart line.MM) {
        stroke: var(--fanfic-blue);
    }

    :global(.network-chart line.FF) {
        stroke: var(--fanfic-red);
    }

    :global(.network-chart line.FM) {
        stroke: var(--fanfic-green);
    }

    :global(.dot-label) {
        font-family: var(--mono);
        font-size: 12px;
        opacity: 0;
        fill: white;
        pointer-events: none;
        font-weight: bold;
    }
	@media (max-width: 600px) { 
        .network-chart {
            height: 200px;
            overflow: hidden;
        }
	}
</style>