<script>
    import { fly } from 'svelte/transition';
    import inView from "$actions/inView.js";

    export let copy;

    let inViewTrigger = false;

    function inViewFly() { inViewTrigger = true; }
    function exitViewFly() { inViewTrigger = false; }
</script>

<div class="faces"
    use:inView
    on:enter={inViewFly}
    on:exit={exitViewFly}  
>   
    {#if inViewTrigger}
        <img transition:fly={{ delay: 250, duration: 300, x: -200}} src="./assets/images/heads/{copy.imgA}.png" alt="character"/>
        <img transition:fly={{ delay: 250, duration: 300, x: 200}} src="./assets/images/heads/{copy.imgB}.png" alt="character"/>
    {/if}
    <p class="bg-connecter">{copy.connector}</p>
</div>
<div class="names">
    <div class="name nameA">
        {#if copy.nameAlast !== undefined}
            <h5 class="name-mono">{copy.nameAfirst}</h5> 
            <h5 class="name-script">{copy.nameAlast}</h5> 
        {:else}
            <h5 class="name-script">{copy.nameAfirst}</h5> 
        {/if}
    </div>
    <h5 class="connector">{copy.connector}</h5>
    <div class="name nameB">
        {#if copy.nameBlast !== undefined}
            <h5 class="name-mono">{copy.nameBfirst}</h5> 
            <h5 class="name-script">{copy.nameBlast}</h5> 
        {:else}
            <h5 class="name-script">{copy.nameBfirst}</h5> 
        {/if}
    </div>
</div>
<p class="tag">{copy.description}</p>

<style>
    .faces {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .faces img {
        width: 250px;
        z-index: 1000;
    }

    .faces img:nth-of-type(1) {
        margin-top: 7rem;
    }

    .bg-connecter {
        position: absolute;
        font-family: var(--script);
        color: white;
        opacity: 0.05;
        font-size: 400px;
        z-index: 500;
        padding-top: 7rem;
    }

    .names {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 2rem;
        align-items: end;
        justify-content: center;
    }

    .name {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .name-mono {
        font-size: var(--48px);
        font-family: var(--mono);
        font-weight: 400;
        text-transform: uppercase;
        color: var(--fanfic-pink);
        margin: 0;
        padding: 0;
    }

    .name-script {
        font-size: var(--80px);
        font-family: var(--script);
        font-weight: 400;
        color: var(--fanfic-highlighter);
        margin: -2rem 0 0 0;
        padding: 0;
    }

    h5.connector {
        font-weight: 400;
        font-size: var(--48px);
        font-family: var(--script);
        color: var(--fanfic-black);
    }

    .tag {
        max-width: 700px;
        margin: 0 auto;
        color: white;
        font-family: var(--sans);
        font-style: italic;
        font-size: var(--28px);
        text-align: center;
        padding: 3rem 0;
    }
</style>