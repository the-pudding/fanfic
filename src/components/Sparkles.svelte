<script>
    const sparkleArray = Array.from({length: 20}, (_, index) => index + 1);
    export let introW;
    export let introH;

    function generateRandomPos(pixels) {
        const maxMultiple = Math.floor(pixels / 20);
        const randomMultiple = Math.floor(Math.random() * (maxMultiple + 1));
        return randomMultiple * 20;
    }

    function generateRandomDur(max) {
        const random = Math.floor(Math.random() * max)+1;
        return random;
    }
</script>

<div class="sparkles" >
    {#each sparkleArray as sparkle}
        <img 
            style="top:{generateRandomPos(introH)}px; 
                left:{generateRandomPos(introW)}px;
                animation-duration:{generateRandomDur(3)}s"
            class="sparkle" 
            src="./assets/images/sparkle.png" 
            alt="sparkle"
        />
    {/each}
</div>

<style>
    .sparkles {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
    }

    img {
        position: absolute;
        transition: transform 0.25s linear;
        animation: rotate;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    @keyframes rotate {
        0%{
            transform: rotate(0deg) scale(0);
        }
        50% {
            transform: rotate(180deg) scale(1);
        }
        100%{
            transform: rotate(360deg) scale(0);
        }
    }

</style>