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
        line-height: 1;
        margin: 2rem auto;
        text-transform: uppercase;
        font-family: var(--mono);
        font-weight: 300;
        text-align: center;
    }

    .hedspan-true {
        font-family: var(--script);
        color: var(--fanfic-highlighter);
    }
</style>