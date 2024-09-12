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
        <div class="left" transition:fly={{ delay: 250, duration: 300, x: -200}}>
            <img src="./assets/images/heads/{copy.imgA}.png" alt="character"/>
            <p>
                <span>{copy.nameAfirst}</span> 
                {#if copy.nameAlast}
                <span>{copy.nameAlast}</span>
                {/if}
            </p>
        </div>
        <div class="right" transition:fly={{ delay: 250, duration: 300, x: 200}}>
            <img src="./assets/images/heads/{copy.imgB}.png" alt="character"/>
            <p>
                <span>{copy.nameBfirst}</span> 
                {#if copy.nameBlast}
                <span>{copy.nameBlast}</span>
                {/if}
            </p>
        </div>
    {/if}
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

    .left {
        border: 2px solid;
        border-color: var(--window-button-stroke);
        height: 280px;
        width: 240px;
        overflow: hidden;
        margin-top: 10rem;
        margin-right: -2rem;
    }

    .right {
        height: 280px;
        width: 240px;
        overflow: hidden;
        margin-left: -2rem;
    }

    .left p {
        font-family: var(--mono);
        font-weight: 700;
        color: var(--fanfic-pink);
        text-transform: uppercase;
        font-size: var(--22px);
        text-align: center;
        padding: 0;
        margin: -1rem 0 0 0;
    }

    .right p {
        font-family: var(--mono);
        font-weight: 700;
        color: var(--fanfic-highlighter);
        text-transform: uppercase;
        font-size: var(--22px);
        text-align: center;
        padding: 0;
        margin: -1rem 0 0 0;
    }

    .left img {
        width: 100%;
        z-index: 1000;
    }

    .right img {
        width: 100%;
        z-index: 1000;
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

    @media (max-width: 600px) {
        .faces img {
            width: 50%;
            z-index: 1000;
        }

        .faces img:nth-of-type(1) {
            margin-top: 5rem;
        }

        .bg-connecter {
            font-size: 300px;
        }

        .name-mono {
            font-size: var(--24px);
        }
        
        .name-script {
            font-size: var(--40px);
            margin: -1rem 0 0 0;
        }

        .tag {
            font-size: var(--18px);
        }
	}
</style>