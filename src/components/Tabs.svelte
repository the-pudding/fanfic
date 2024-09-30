<script>
import { currSectionSTORE } from "$stores/misc.js";

export let options;
export let tabVisible;

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
    ? "CH1: Slash"
    : option == "noncanon"
    ? "CH2: Canon" :
    "CH3: RPF"
    return title;
}
</script>

<div class="tabs tabVisible-{tabVisible}">
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
        gap: 1rem;
        padding: 0.5rem;
        top: 0;
        z-index: var(--z-overlay);
        /* background: var(--fanfic-black); */
    }
    .tabVisible-false {
        opacity: 0;
    }
    button {
        width: 33.33%;
        border-radius: 0;
        height: 3rem;
        display: flex;
        align-items: center;
        padding: 1rem;
        border-width:2px;
        background: var(--fanfic-window-gray);
        border-color: var(--window-button-stroke);
        border-style:solid;
        text-transform: uppercase;
        font-family: var(--mono);
        text-align: left;
        font-size: var(--16px);
    }

    button:hover {
        transform: scale(0.98);
    }

    #tab-slash.isActive {
        background: var(--fanfic-blue);
        color: var(--fanfic-highlighter);
        font-weight: 700;
    }

    #tab-noncanon.isActive {
        background: var(--fanfic-green);
        color: var(--fanfic-highlighter);
        font-weight: 700;
    }

    #tab-realpeople.isActive {
        background: var(--fanfic-red);
        color: var(--fanfic-highlighter);
        font-weight: 700;
    }

    @media (max-width: 600px) {
        button {
            font-size: var(--14px);
            height: 2.5rem;
            padding: 0.5rem;
        }
	}

    @media (max-width: 400px) {
        button {
            font-size: var(--12px);
            height: 2.25rem;
            padding: 0.5rem;
        }
	}
</style>