<script>
    // This is the headline text passed in from the parent component, FanFicSection.svelte
    export let copy;

    // This splits the text at every space, giving us an array of words
    const wordSplit = copy.split(" ");

    // Check if the char is included in the letter array below
    function checkChar(char) {
        // Change all characters to lowercase
        char = char.toLowerCase();
        // Return true/false if the character is included in the array of letters below
        // EXAMPLE: 'a' would return true, but 's' would return false
        return ['a', 'e', 'o'].includes(char);
    }
</script>


<h3>
    <!-- For each word in the wordSplit array, create a span -->
    {#each wordSplit as word, i}
        <span class="word">
            <!-- For each character in the word, split again and create a span -->
            {#each word.split("") as char, i}
                <!-- Check if the char is a included in the letter array inside the checkChar() function, and if it is set isVowel to true -->
                {@const isVowel = checkChar(char)}
                <!-- Set the span class by isVowel so you get "hedspan-true" or "hedspan-false", then style it accordingly in the css -->
                <span class="char hedspan-{isVowel}">{char}</span>
            {/each}
        </span>
    {/each}
</h3>


<style>
    h3 {
        font-size: var(--80px);
        font-family: var(--sans);
        font-weight: 300;
        text-transform: uppercase;
        text-align: center;
        line-height: 1.125;
        margin: 2rem auto 0 auto;
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