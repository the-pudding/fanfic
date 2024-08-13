<script>
	import { getContext } from "svelte";
    import top20Data from "$data/INTRO/INTRO_top20.csv";
    import { fade } from 'svelte/transition';
	// import Footer from "$components/Footer.svelte";

	// const copy = getContext("copy");
	// const data = getContext("data");

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
        <div class="content-wrapper">
            <div class="heads">
                <img src="./assets/images/characters/heads/character1-head.png" alt="character"/>
                <img src="./assets/images/characters/heads/character2-head.png" alt="character"/>
            </div>
            <div class="details">
                <p class="rank">{start+i+1}</p>
                <p>{ship.ship}</p>
            </div>
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
    }

    li {
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
        padding: 0.5rem;
        margin: 0.5rem 0;
        display: flex;
        flex-direction: row;
        background-color: var(--fanfic-window-gray);
        transition: background-color 250ms linear;
        height: 4.5rem;
    }
    

    .content-wrapper, .heads, .details {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .details {
        margin: 0 0 0 1rem;
    }
    
    .heads img {
        width: 3.5rem;
        margin: 0 -0.75rem;
    }

    .rank {
        font-family: var(--mono);
        margin-right: 1rem;
    }

    .active {
        background-color: var(--fanfic-blue);
        color: var(--color-white);
    }
</style>
