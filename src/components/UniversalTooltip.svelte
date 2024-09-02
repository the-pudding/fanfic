<script>
    export let position = 'top'; // Default position
    export let posX;
    export let posY;
  
    let visible = false;
</script>

<div class="tooltip-container">
    <slot name="tooltip"></slot>
</div>

<style>
    .tooltip-container {
        width: 100%;
        background-color: white;
        color: var(--fanfic-black);
        padding: 0.75rem;
        border-top: 1px solid var(--fanfic-black);
        position: absolute;
        top: 0;
        left: 0;
        font-family: var(--mono);
        font-size: var(--12px);
        z-index: 1000;
        height: 6rem;
    }

    :global(.tooltip-container  p) {
        padding: 0;
        margin: 0;
    }
    :global(.tooltip-container  .year) {
        font-weight: 700;
        text-transform: uppercase;
    }
  </style>