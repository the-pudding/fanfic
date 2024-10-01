<script>
    export let copy;

    const wordSplit = copy.split(" ");
    const charSplit = copy.split("");

    function checkVowel(char) {
        char = char.toLowerCase();
        return ['a', 'e', 'o'].includes(char);
    }
</script>


<h3>
    {#each wordSplit as word, i}
        <span class="word">
            {#each word.split("") as char, i}
                {@const isVowel = checkVowel(char)}
                <span class="char hedspan-{isVowel}">{char}</span>
            {/each}
        </span>
    {/each}
</h3>


<style>
    h3 {
        font-size: var(--80px);
        line-height: 1.125;
        margin: 2rem auto 0 auto;
        text-transform: uppercase;
        font-family: var(--sans);
        font-weight: 300;
        text-align: center;
        color: var(--fanfic-highlighter);
    }

    .word {
        display: block;
    }

    .hedspan-true {
        font-family: var(--script);
        color: var(--fanfic-highlighter);
    }

    @media (max-width: 800px) {
        h3 {
            font-size: var(--48px);
        }
    }

    @media (max-width: 600px) {
        h3 {
            font-size: var(--32px);
        }
    }

    @media (max-width: 400px) {
        h3 {
            font-size: 30px;
        }
    }
</style>