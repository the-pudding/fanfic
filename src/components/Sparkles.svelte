<script>
    // Make an array of numbers between 1-20, change 20 to be any number
    const sparkleArray = Array.from({length: 20}, (_, index) => index + 1);
    
    // These are properties passed in from the parent component, IntroSection.svelte
    export let introW;
    export let introH;

    // This generates a random placement for the sparkles based on the pixel width and height of the parent container
    // EXAMPLE: if pixels is 100, then the possible return values would be 0, 20, 40, 60, 80, or 100
    function generateRandomPos(pixels) {
        // Since the sparkles themselves are 20px, we need to find the maximum number of times they can fit in the width/height so none overlap
        const maxMultiple = Math.floor(pixels / 20);
        // This selects a random integer from 0 to the maxMultiple, (maxMultiple + 1) ensures maxMultiple is included, and Math.floor rounds down to the nearest whole number 
        const randomMultiple = Math.floor(Math.random() * (maxMultiple + 1));
        // This returns the pixel placement of the sparkle (random multiple * the sparkle width of 20px)
        return randomMultiple * 20;
    }

    // This generates a random duration for the sparkle spin
    // EXAMPLE: since max is 3, the possible return values would be 2, 3, or 4
    function generateRandomDur(max) {
        // This generates a random decimal between 0-1, then scales that range by the max and insures that the value of the integer is not les than 2
        const random = Math.floor(Math.random() * max)+2;
        return random;
    }
</script>

<div class="sparkles" >
    <!-- For each number/sparkle (20) in the sparklesArray, add an image with unique styles -->
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
        z-index: 900;
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

    @media (prefers-reduced-motion: reduce) {
        .sparkles {
            display: none;
        }
    }
</style>