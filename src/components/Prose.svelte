<script>
    export let copy;
</script>

{#each copy as text, i}
    <p>{text.value}</p>
{/each}

<style>
    p {
        font-size: var(--18px);
        line-height: 1.65;
        margin: 2rem 0;
    }
</style>