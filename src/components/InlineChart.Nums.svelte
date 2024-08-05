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
            <p class="count">{Math.round($usersVal)}</p>
            <p class="label">{chunk.nums[0].label}</p>
        </div>
        <div class="num-wrapper">
            <p class="count">{Math.round($worksVal)}</p>
            <p class="label">{chunk.nums[1].label}</p>
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
        width: calc(50% - 2rem);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .count {
        font-family: var(--sans);
        font-size: var(--48px); 
    }

    .label {
        font-family: var(--sans);
    }
</style>