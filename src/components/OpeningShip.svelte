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
        <img transition:fly={{ delay: 250, duration: 300, x: -200}} src="./assets/images/faceA.png" alt="character"/>
        <img transition:fly={{ delay: 250, duration: 300, x: 200}} src="./assets/images/faceB.png" alt="character"/>
    {/if}
</div>
<div class="names">
    <div class="name nameA">
        <h5 class="name-mono">{copy.nameAfirst}</h5> 
        {#if copy.nameAlast !== undefined}
            <h5 class="name-script">{copy.nameAlast}</h5> 
        {/if}
    </div>
    <h5 class="connector">{copy.connector}</h5>
    <div class="name nameB">
        <h5 class="name-mono">{copy.nameBfirst}</h5> 
        {#if copy.nameBlast !== undefined}
            <h5 class="name-script">{copy.nameBlast}</h5> 
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
    }

    .faces img {
        width: 200px;
    }

    .names {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 2rem;
        align-items: center;
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
        font-weight: 100;
        font-size: var(--128px);
        font-family: var(--mono);
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