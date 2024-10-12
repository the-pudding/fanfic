<script>
	import { getContext } from "svelte";
    import reducedMotion from "$stores/reducedMotion.js";
    import * as d3 from "d3";
    import top20Data from "$data/INTRO/INTRO_top20.csv";
    import { fade } from 'svelte/transition';
    import Rank from "$components/Rank.svelte";
    import roundCounts from "$utils/roundCounts.js";

	export let scrollIndex;
    export let start;
    export let end;
    export let totalSets;
    export let set;
    
    const format = d3.format(",");
    let active;
    let innerWidth;

    function stripData(data) {
        let stripped = data.replace(/[^\w\s]/gi, '').toLowerCase();
        return stripped;
    }

    function setState(scrollIndex, ship) {
        if (scrollIndex == 0 && ship.relType =="M/M") {
            active = true;
        } else if (scrollIndex == 1 && ship.isCanon == "No") {
            active = true;
        } else if (scrollIndex == 2 && ship.isRPF == "Yes") {
            active = true;
        } else { active = false }
        return active;
    }

    function setDelay(start, set, i) {
        let delay = 50*(start+i+1);
        return delay
    }
</script>

<svelte:window bind:innerWidth />

<ul class="intro-table-chunk">
    {#each top20Data.slice(start, end) as ship, i}
    {#if scrollIndex >= 0 || scrollIndex == "exit"}
    <li in:fade={!$reducedMotion ? { delay: setDelay(start, set, i), duration: 300 } : undefined}
        out:fade={!$reducedMotion ? { delay: 50, duration: 300 } : undefined}
        class="ship 
        ship-relType-{stripData(ship.relType)}
        ship-canon-{stripData(ship.isCanon)}
        ship-rpf-{stripData(ship.isRPF)}"
        class:active={setState(scrollIndex, ship)}
    >
        <Rank rank={start+i+1} />
        <div class="content-wrapper">
            <p class="ship-name">{ship.ship}</p>
            <p>{format(roundCounts(ship.totalWorks, "ten"))} fics</p>
        </div>
    </li>
    {/if}
    {/each}
</ul>


<style>
    ul {
        width: calc(25% - 0.5rem);
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0;
        padding: 0;
    }

    li {
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
        padding: 0;
        margin: 0.5rem 0;
        display: flex;
        flex-direction: row;
        background-color: var(--fanfic-window-gray);
        transition: background-color 250ms linear;
        height: 4.25rem;
        position: relative;
    }
    

    .content-wrapper {
        display: flex;
        flex-direction: column;
        padding: 0.25rem 1rem 0.25rem 1.5rem;
    }

    .rank {
        font-family: var(--mono);
        margin-right: 1rem;
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 0.25rem;
        margin: 0;
        color: white;
        background: var(--fanfic-black);
        font-size: 10px;
    }

    p {
        font-family: var(--mono);
        font-size: var(--12px);
        padding: 0;
        margin: 0;
        line-height: 1.125;
    }

    .ship-name {
        font-weight: 700;
    }

    .active {
        background-color: var(--fanfic-highlighter);
    }

    @media (max-width: 800px) {
        ul {
            width: calc(50% - 0.5rem);
        }
        li {
            height: 3.75rem;
            margin: 0.25rem 0;
        }
    }

    @media (max-width: 700px) {
        li {
            height: 3.5rem;
        }
		p {
            font-size: 10px; 
        }
	}
</style>
