<script>
    import Prose from "$components/Prose.svelte";
    import copy from "$data/copy.json";

    console.log(copy.methods)
</script>

<section id="methods" >
    <h3>Methodology</h3>
    <div class="prose">
        <Prose copy={copy.methods}/>
    </div>
</section>

<style>
    section {
        width: 100%;
        opacity: 1;
        padding: 0 1rem;
        margin: 3rem 0;
        padding: 5rem 0;
    }

    .prose, h3 {
        max-width: 700px;
        margin: 0 auto;
        color: var(--color-white);
    }

    h3 {
        font-family: var(--mono);
        text-transform: uppercase;
        color: var(--fanfic-highlighter);
        font-weight: 700;
        font-size: var(--18px);
    }

    :global(#methods p) {
        font-family: var(--sans);
        font-size: var(--14px);
        line-height: 1.25;
    }
</style>