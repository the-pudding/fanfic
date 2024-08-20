<script>
    import inView from "$actions/inView.js";
    import { tweened } from "svelte/motion";
    import { linear } from "svelte/easing";

    export let chunk;

    let isEntered = false;
    let usersValue = 0;

    const usersVal = tweened(usersValue, {
        duration: 500,
        delay: 0,
        easing: linear
    })

    function updateValue() {
        if (isEntered) {
            usersVal.set(+chunk.count)
        } else {
            usersVal.set(0)
        }
    }

    // Uses inView on "num-wrapper" to trigger the tweened numbers
    function enterNums() { isEntered = true; }
    function exitNums() { isEntered = false; }

    $: isEntered, updateValue();
</script>

{#if chunk}
    <div class="num-wrapper"
        use:inView
        on:enter={enterNums}
        on:exit={exitNums}
    >
        <p class="count">{Math.round($usersVal)}</p>
    </div>
{/if}


<style>
    .num-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: white;
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