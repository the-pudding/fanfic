<script>
    export let copy;

    const stringSplit = copy.split("");

    function checkVowel(char) {
        char = char.toLowerCase();
        return ['a', 'e', 'i', 'o', 'u'].includes(char);
    }
</script>


<h3>
    {#each stringSplit as char, i}
    {@const isVowel = checkVowel(char)}
        <span class="hedspan-{isVowel}">{char}</span>
    {/each}
</h3>


<style>
    h3 {
        font-size: var(--80px);
        line-height: 1.65;
        margin: 2rem 0;
        text-transform: uppercase;
        font-family: var(--mono);
        font-weight: 300;
    }

    .hedspan-true {
        font-family: var(--script);
        color: var(--fanfic-highlighter);
    }
</style>