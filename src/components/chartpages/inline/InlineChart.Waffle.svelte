<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import inView from "$actions/inView.js";
    import { uTooltipVisible } from "$stores/misc.js";

    let data;
    let groupedData;
    const format = d3.format(",");

    onMount(async () => {
        if (id) {
            const dataFolder = id.split("_")[0];
            const dataPath = `./assets/data/${dataFolder}/${id}.csv`
            data = await d3.csv(dataPath);
            groupedData = d3.groups(data, d => d.isCanon);
            groupedData = groupedData.sort((a, b) => b[1].length - a[1].length);
        }
	});
    
    export let id;

    let inViewTrigger = false;
    let tooltipVisible = false;

    function inViewDraw() { inViewTrigger = true; }
    function exitViewDraw() { inViewTrigger = false; }

    function handleMouseEnter(e, ship) {
        uTooltipVisible.set(true)
        // Get the target element
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();

        // Get the container element
        const container = document.querySelector(`#chart-${id}`);
        const containerRect = container.getBoundingClientRect();

        // Preps tooltip
        const tooltip = d3.select(".tooltip");
        const tooltipShip = tooltip.select(".ship-text");
        const tooltipFandom = tooltip.select(".fandom-text");
        const tooltipWorks = tooltip.select(".works-text");
        const bgColor = ship.isCanon == "No"
            ? "#D03200"
            : ship.isCanon == "Yes"
            ? "#1B2AA6"
            : "#119C72";

        // Positions tooltip
        const tooltipY = rect.top - containerRect.top + container.scrollTop - 2;

        // Checks tooltip position
        let tooltipWidth = innerWidth > 600 ? "10rem" : "142px";

        if (rect.left > innerWidth / 2) {
            const tooltipRight = containerRect.right - rect.right -2;
            tooltip
                .style("right", `${tooltipRight}px`)
                .style("left", "auto");
        } else {
            const tooltipX = rect.left - containerRect.left - 2;
            tooltip
                .style("left", `${tooltipX}px`)
                .style("right", "auto"); 
        }

        tooltip
            .style("top", `${tooltipY}px`)
            .style('background', bgColor)
            .style("opacity", "1")
            .style("width", "1rem")
            .style("height", "1rem")

        tooltip
            .transition()
            .duration(250)
            .style("width", tooltipWidth)
            .style("height", tooltipWidth)

        tooltipShip.text(`${(ship.ship).replace("/", " / ")}`)
        tooltipFandom.text(`${ship.fandom}`)
        tooltipWorks.text(`${format(ship.totalWorks)} fanfics`)

        d3.selectAll(".u-tooltip-container")
            .html(
                `<p class="ship-text"><span class="ship-text-${ship.isCanon}">${(ship.ship).replace("/", " / ")}</span></p>
                <p class="fandom-text">${ship.fandom}</p>
                <p class="works-text">${format(ship.totalWorks)} fanfics</p>`
            )
    }

    function handleMouseLeave() {
        uTooltipVisible.set(false)
        const tooltip = d3.select(".tooltip");
        tooltip
            .transition()
            .duration(250)
            .style("width", "1rem")
            .style("height", "1rem")
            .style("opacity", "0")
    }

    $: innerWidth = 0;

    function setLabelText(canon) {
        let labelText = canon == "Yes"
            ? "Canon 12%"
            : canon == "No"
            ? "Non-canon 83%"
            : "Semi-canon 5%";
        return labelText;
    }
</script>

<svelte:window bind:innerWidth />

<div 
    id="chart-{id}"
    class="chart-container"
    use:inView
    on:enter={inViewDraw}
    on:exit={exitViewDraw}
>
    <div class="tooltip">
        <p class="ship-text"></p>
        <p class="fandom-text"></p>
        <p class="works-text"></p>
    </div>
    {#if groupedData}
        {#each groupedData as canon}
            {#each canon[1] as ship, i (ship)}
                {#if i == 0} 
                    <p class="label label-{canon[0]}">{setLabelText(canon[0])}</p>
                {/if}
                <div 
                    on:mouseenter={(e) => handleMouseEnter(e, ship)}
                    on:mouseleave={handleMouseLeave}
                    id="id-{canon[0]}-{i}"
                    class="ship ship-{canon[0]}"
                >
                </div>
            {/each}
        {/each}
    {/if}
</div>


<style>
    .chart-container {
        width: calc(100% - 2rem);
        background: #f2f2f2;
        margin: 1rem auto 2rem auto;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.125rem;
        position: relative;
        border: 2px solid;
        border-color: var(--window-inset-stroke);
    }

    .tooltip {
        position: absolute;
        width: 1rem;
        height:1rem;
        top: 0;
        right: 0;
        overflow: hidden;
        outline: 2px solid white;
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        padding: 1rem;
        font-family: var(--mono);
        font-size: var(--12px);
        line-height: 1.125;
    }

    .tooltip .ship-text, .tooltip .fandom-text {
        margin: 0;
        padding: 0;
    }

    .tooltip .ship-text {
        font-weight: 700;
    }

    .tooltip .works-text {
        border-top: 1px solid #f2f2f2;
        padding-top: 0.25rem;
    }
    
    .ship {
        width: 1rem;
        height: 1rem;
        position: relative;
        transition: all 0.5s linear;
        display: flex;
        cursor: pointer;
    }

    .ship-No {
        background: var(--fanfic-red);
    }

    .label {
        background: #f2f2f2;
        font-family: var(--mono);
        display: flex;
        align-items: center;
        width: 8.5rem;
        height: 1rem;
        top: 2.25rem;
        left: 0rem;
        z-index: 900;
        padding: 0 0 0 0.125rem;
        margin: 0;
        color: var(--fanfic-red);
        text-transform: uppercase;
        font-size: var(--12px);
        font-weight: bold;
        pointer-events: none;
    }

    .label-Yes {
        color: var(--fanfic-blue);
        width: 4.375rem;
    }

    .label-No {
        color: var(--fanfic-red);
        width: 6.625rem;
    }

    .label-Semi-Canon {
        color: var(--fanfic-green);
        width: 6.625rem;
    }

    .ship-Yes {
        background: var(--fanfic-blue);
    }

    .ship-Semi-Canon {
        background: var(--fanfic-green);
    }

    @media (max-width: 600px) { 
        .chart-container {
            padding: 1rem;
        }
        .ship {
            width: 10px;
            height: 10px;
        }

        .label {
            height: 10px;
        }

        .label-Yes {
            width: 82px;
        }

        .label-No, .label-Semi-Canon {
            width: 106px;
        }
        .toolip {
            font-size: 10px;
            width:  10px;
            height: 10px;
        }
    }
</style>