<script>
    import { currSectionSTORE, annotationVisible } from "$stores/misc.js";
    import { fade, fly } from 'svelte/transition';
    import copy from "$data/copy.json";

	let fadeDuration = 500;

    function annoMatch(annoID) {
        if ($annotationVisible[1] !== null) {
            let annotations = $currSectionSTORE == "slash" 
                ? copy.annoTriggersSlash
                : $currSectionSTORE == "noncanon"
                ? copy.annoTriggersCanon
                : copy.annoTriggersRPF
            const match = annotations[annoID].value;
            return match;  
        }
	}

    function imgMatch(annoID) {
        let img
        if (annoID % 2 === 0) {
            img = $currSectionSTORE == "slash" 
                ? "draco-malfoy" :
                $currSectionSTORE == "noncanon"
                ? "castiel"
                : "jeon-jungkook"
        } else {
            img = $currSectionSTORE == "slash" 
                ? "harry-potter" :
                $currSectionSTORE == "noncanon"
                ? "dean-winchester"
                : "harry-styles"
        }
        return img
    }

	function hideAnnoSectionChange($currSectionSTORE) { 
		fadeDuration = 0;
		setTimeout(() => {
			fadeDuration = 500;
		}, 500)
	}

	$: $currSectionSTORE, hideAnnoSectionChange();
</script>

<div id="annotation-block">
    <div class="bubble" in:fly={{ delay: 300, duration: 300, y: 100}} out:fade={{duration: fadeDuration}}>
        <p>{@html annoMatch($annotationVisible[1])}</p>
    </div>
    <div class="img-wrapper" in:fly={{ delay: 0, duration: 300, y: 100}} out:fade={{duration: fadeDuration}}>
        {#if $annotationVisible[1] % 2 === 0}
            <img src="./assets/images/heads/{imgMatch($annotationVisible[1])}.png" alt="character" />
        {:else if $annotationVisible[1] % 2 !== 0}
            <img src="./assets/images/heads/{imgMatch($annotationVisible[1])}.png" style="transform: scaleX(-1)" alt="character" />
        {/if}
    </div>
</div>

<style>
    #annotation-block {
		position: fixed;
		top: 10%;
		right: 0.5rem;
		display: flex;
		flex-direction: column;
		align-items: end;
		z-index: 1000;
		pointer-events: none;
	}

	:global(#annotation-block a) {
        color: var(--fanfic-black);
		font-weight: 500;
		cursor: pointer;
    }

	:global(#annotation-block a:hover) {
       opacity: 0.75;
    }

    :global(#annotation-block .strong) {
        color: var(--fanfic-black);
    }
	.bubble {
		width: 200px;
		background: white;
		font-family: var(--sans);
		font-size: 10px;
		position: relative;
		padding: 0.75rem;
		border: 2px solid black;
		pointer-events: auto;
	}
	.bubble p {
		padding: 0;
		margin: 0;
		font-style: italic;
	}
	.bubble:after {
		content: '';
		position: absolute;
		border-style: solid;
		border-width: 10px 10px 0;
		border-color: #ffffff transparent;
		display: block;
		width: 0;
		z-index: 1;
		bottom: -10px;
		left: 55%;
	}
	.bubble:before {
		content: '';
		position: absolute;
		border-style: solid;
		border-width: 11px 11px 0;
		border-color: #151515 transparent;
		display: block;
		width: 0;
		z-index: 0;
		bottom: -13px;
		left: 55%;
	}
	#annotation-block img {
		width: 160px;
	}

	@media(max-width: 800px) {
		#annotation-block img {
			width: 120px;
		}
		.bubble {
			width: 160px;
		}
	}
</style>