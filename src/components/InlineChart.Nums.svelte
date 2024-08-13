<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import inView from "$actions/inView.js";
    import { tweened } from "svelte/motion";
    import { linear } from "svelte/easing";

    export let chunk;

    let isEntered = false;
    let usersValue = 0;
    let worksValue = 0;

    const usersVal = tweened(usersValue, {
        duration: 500,
        delay: 0,
        easing: linear
    })

    const worksVal = tweened(worksValue, {
        duration: 500,
        delay: 0,
        easing: linear
    })

    function updateValue() {
        if (isEntered) {
            usersVal.set(+chunk.nums[0].count)
            worksVal.set(+chunk.nums[1].count)
        } else {
            usersVal.set(0)
            worksVal.set(0)
        }
    }

    function enterNums() { isEntered = true; }
    function exitNums() { isEntered = false; }

    $: isEntered, updateValue();
</script>

{#if chunk}
    <div class="multiple-wrapper" 
        use:inView
        on:enter={enterNums}
        on:exit={exitNums}
    >
        <div class="num-wrapper">
            <div class="inner">
                <h3>Number of Users</h3>
                <p class="count">{Math.round($usersVal)}</p>
            </div>
        </div>
        <div class="num-wrapper">
            <div class="inner">
                <h3>Number of Fanfics</h3>
                <p class="count">{Math.round($worksVal)}</p>
            </div>
        </div>
    </div>
{/if}


<style>
    .multiple-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .num-wrapper {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: var(--fanfic-window-gray);
        border-width:2px;
        border-color:#FFFFFF #808080 #808080 #FFFFFF;
        border-style:solid;
    }

    .num-wrapper:last-of-type {
        margin: 2rem 0 0 2rem;
    }

    .inner {
        background: white;
        width: 100%;
    }

    h3 {
        width: 100%;
        background: var(--fanfic-blue);
        color: var(--fanfic-highlighter);
        font-family: var(--mono);
        text-transform: uppercase;
        text-align: center;
        margin: 0;
        font-size: var(--18px);
        padding: 0.25rem 0;
    }

    .count {
        width: 100%;
        text-align: center;
        color: var(--fanfic-black);
        font-family: var(--mono);
        font-size: var(--48px); 
    }

    .label {
        font-family: var(--sans);
    }
</style>