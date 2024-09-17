<script>
	import { getContext } from "svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import IntroTable from "$components/Intro.Table.svelte";
	// import Footer from "$components/Footer.svelte";

	const copy = getContext("copy");
	// const data = getContext("data");
	let scrollIndex;
    let steps = [0,1,2,3,4,5];
</script>

<section id="scrolly">
	<div class="sticky">
		<IntroTable scrollIndex={scrollIndex} />
    </div>
	<Scrolly bind:value={scrollIndex}>
        {#if copy.introSlides}
            {#each copy.introSlides as text, i}
                <div class="step">
					<div class="step-inner">
						<p>{@html text.value}</p>
					</div>
                </div>
            {/each}
        {/if}
	</Scrolly>
	<div class="spacer" />
</section>

<style>
	#scrolly {
		position: relative;
		margin: 0;
		z-index: 1000;
	}
    .sticky {
		position: sticky;
		top: 0;
		transition: all 1s;
		height: 100vh;
        z-index: 1;
        overflow-x: hidden;
		pointer-events: none;
	}
	.spacer {
		height: 75vh;
	}
	.step {
		height: 80vh;
		text-align: center;
        z-index: 1000;
        max-width: 30rem;
        margin: 0 auto;
		pointer-events: none;
	}

	.step-inner {
		padding: 1rem;
		background-color: white;
		border: 1px solid var(--fanfic-black);
	}

	:global(.step .strong) {
		color: var(--fanfic-black);
	}

	:global(.step .intro-slash, .step .intro-noncanon, .step .intro-realpeople) {
		color: var(--fanfic-black);
		font-family: var(--sans);
		font-weight: 700;
		padding: 0.125rem;
		background: var(--fanfic-highlighter);
	}

	@media (max-width: 600px) {
		
	}
</style>
