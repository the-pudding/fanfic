<script>
import { currSectionSTORE } from "$stores/misc.js";

export let options;

let isActive;

function stripCharacters(string) {
    let stripped = string.replace(/[^A-Z0-9]/ig, '').toLowerCase();
    return stripped;
} 

function onClick() {
    let id = (this.id).split("-")[1];
    currSectionSTORE.set(id)
}

function setTitle(option) {
    let title = option == "slash"
    ? "Slash"
    : option == "noncanon"
    ? "Canon" :
    "Real People"
    return title;
}
</script>

<div class="tabs">
    {#each options as option}
    {@const isActive = stripCharacters($currSectionSTORE) == option ? true : false}
    <button on:click={onClick}
        id="tab-{stripCharacters(option)}"
        class:isActive={isActive}>
        {setTitle(option)}
    </button>
    {/each}
</div>

<style>
    .tabs {
        width: 100%;
        display: flex;
        flex-direction: row;
        position: sticky;
        top: 0;
        z-index: var(--z-overlay);
    }
    button {
        width: 33.33%;
        border-radius: 0;
        padding: 1rem;
    }

    #tab-slash.isActive {
        background: var(--fanfic-blue);
        color: var(--fanfic-highlighter);
    }

    #tab-noncanon.isActive {
        background: var(--fanfic-green);
        color: var(--fanfic-highlighter);
    }

    #tab-realpeople.isActive {
        background: var(--fanfic-red);
        color: var(--fanfic-highlighter);
    }
</style>