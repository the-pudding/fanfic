<script>
    export let rank;
</script>

<div class="rank">
    <p>{rank}</p>
</div>

<style>
    .rank {
        position: absolute;
        background: var(--fanfic-black);
        padding: 0.125rem 0.25rem;
    }

    p {
        color: white;
        font-family: var(--mono);
        font-size: 10px;
        padding: 0;
        margin: 0;
    }
</style>