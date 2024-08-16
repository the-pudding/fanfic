<script>
    export let title;
</script>

<div class="header-wrapper">
    <h3>{title}</h3>
    <div class="slash-box">
        <p>/</p>
    </div>
</div>

<style>
    .header-wrapper {
        width: 100%;
        background: var(--fanfic-blue);
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    h3 {
        color: var(--fanfic-highlighter);
        font-family: var(--mono);
        text-transform: uppercase;
        margin: 0;
        font-size: var(--18px);
        padding: 0.25rem 0;
    }

    .slash-box {
        position: absolute;
        right: 0.5rem;
        height: 1.25rem;
        width: 1.25rem;
        border-width:2px;
        border-color:#FFFFFF #808080 #808080 #FFFFFF;
        border-style:solid;
        background: var(--fanfic-window-gray);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .slash-box p {
        font-size: 14px;
        color: var(--fanfic-black);
        padding: 0;
        margin: 0;
        line-height: 1;
        font-family: var(--mono);
        font-weight: 700;
    }
</style>