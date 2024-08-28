<script>
	import { getContext } from "svelte";
    import top20Data from "$data/INTRO/INTRO_top20.csv";
    import { fade } from 'svelte/transition';
    import Rank from "$components/Rank.svelte"

	export let scrollIndex;
    export let start;
    export let end;
    export let totalSets;
    export let set;
    
    let active;
    let innerWidth;

    function stripData(data) {
        let stripped = data.replace(/[^\w\s]/gi, '').toLowerCase();
        return stripped;
    }

    function setState(scrollIndex, ship) {
        if (scrollIndex == 1 && ship.relType =="M/M") {
            active = true;
        } else if (scrollIndex ==2 && ship.isCanon == "No") {
            active = true;
        } else if (scrollIndex == 3 && ship.isRPF == "Yes") {
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
    {#if scrollIndex >= 0}
    <li in:fade={{ delay: setDelay(start, set, i), duration: 300 }}
        out:fade={{ delay: 50, duration: 300 }}
        class="ship 
        ship-relType-{stripData(ship.relType)}
        ship-canon-{stripData(ship.isCanon)}
        ship-rpf-{stripData(ship.isRPF)}"
        class:active={setState(scrollIndex, ship)}
    >
        <Rank rank={start+i+1} />
        <div class="content-wrapper">
            <p class="ship-name">{(ship.ship).replace("/", " / ")}</p>
            <p>{ship.fandom}</p>
        </div>
    </li>
    {/if}
    {/each}
</ul>


<style>
    ul {
        width: 100%;
        list-style: none;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 0.5rem;
        margin: 0;
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
        height: 4.5rem;
        position: relative;
    }
    

    .content-wrapper {
        display: flex;
        flex-direction: column;
        padding: 0.5rem 1rem 0.5rem 2rem;
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
        font-size: var(--14px);
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

    @media (max-width: 600px) {
        li {
            height: 4rem;
        }
		p {
            font-size: var(--12px); 
        }
	}
</style>
