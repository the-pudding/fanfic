<script>
    import inView from "$actions/inView.js";
    import { fly } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';
    import Icon from "$components/helpers/Icon.svelte";
    import Book from "$svg/book-pixel.svg";
    import Bookmark from "$svg/bookmark-pixel.svg";
    import Retweet from "$svg/retweet-pixel.svg";
    import News from "$svg/newspaper-pixel.svg";
    import Heart from "$svg/heart-pixel.svg";
    import Quote from "$svg/quote-pixel.svg";

    export let copy;

    let inViewTrigger = false;

    // Uses inView on "quote" to trigger flying window divs	
    function inViewQuote() { inViewTrigger = true; }
    function exitViewQuote() { inViewTrigger = false; }
</script>

<div class="quote"
    use:inView={{ bottom: 100 }} 
    on:enter={inViewQuote}
    on:exit={exitViewQuote}
>
    {#if inViewTrigger == true}
        <div class="bg" transition:fly={{ delay: 750, duration: 250, y: 100, opacity: 0, easing: sineInOut }}></div>
        <div class="bg" transition:fly={{ delay: 500, duration: 250, y: 100, opacity: 0, easing: sineInOut }}></div>
        <div class="real"
        transition:fly={{ delay: 250, duration: 250, y: 100, opacity: 0, easing: sineInOut }}
        >
            <div class="attribution">
                <img src="./assets/images/quote-icons/{copy.imgSlug}.png" />
                <div class="credit">
                    <p class="name">{copy.attribute}</p>
                    <p class="title">{copy.title}</p>
                </div>
            </div>
            <p class="text">{copy.text}</p>
            {#if copy.source}
                <div class="underline">
                    <div>
                        <span class="icon">
                            {#if copy.attribute == "Sun Jung" || copy.attribute == "Stefan Robinson" || copy.attribute == "Henry Jenkins"}
                                {@html News}
                            {:else}
                                {@html Book}
                            {/if}
                        </span>
                        <a href="{copy.url}"><p>{copy.source}</p></a>
                    </div>
                </div>
            {/if}
            {#if copy.attribute == "@thvsparadise"}
                <div class="underline">
                    <div class="left">
                        <a href="{copy.url}"><p>11:55 PM · Nov 5, 2020</p></a>
                    </div>
                    <div class="right">
                        <div>
                            <span class="icon">
                                {@html Quote}
                            </span>
                            <p>43</p>
                        </div>
                        <div>
                            <span class="icon">
                                {@html Retweet}
                            </span>
                            <p>908</p>
                        </div>
                        <div>
                            <span class="icon">
                                {@html Heart}
                            </span>
                            <p>4.9K</p>
                        </div>
                        <div>
                            <span class="icon">
                                {@html Bookmark}
                            </span>
                            <p>133</p>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    .quote {
        position: relative;
        max-width: 550px;
        margin: 6rem auto;
        height: 340px;
    }

    .icon {
        width: 1.5rem;
        height: 1.5rem;
    }

    .right .icon {
        width: 1.25rem;
        height: 1.25rem;
    }

    :global(.icon svg rect) {
        fill: var(--fanfic-black);
    }

    .real, .bg {
        border-width:2px;
        border-color: var(--window-button-stroke);
        border-style:solid;
        width: 100%;
        margin: 0;
        background: var(--fanfic-highlighter);
        padding: 1rem;
        position: absolute;
        height: 340px;
    }

    .bg{
        top: 0.5rem;
        left: -0.5rem;
    }

    .bg:first-of-type  {
        top: 1rem;
        left: -1rem;
    }

    .attribution {
        display: flex;
        flex-direction: row;
    }

    .attribution img {
        width: 4rem;
        height: 4rem;
        background: var(--fanfic-window-gray);
        margin: 0 1rem 0 0;
    }

    .credit {
        width: calc(100% - 6rem);
    }

    .name {
        margin: 0;
        font-family: var(--mono);
        font-weight: 700;
        text-transform: uppercase;
        line-height: 1.25;
    }

    .title {
        margin: 0;
        font-family: var(--mono);
        font-size: var(--12px);
        line-height: 1.25;
    }

    .text {
        font-family: var(--sans);
        font-size: var(--18px);
        font-weight: 700;
        font-style: italic;
    }

    .underline {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 2rem;
        gap: 2rem;
    }

    .underline div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .right {
        display: flex;
        flex-direction: row;
        gap: 2rem; 
        color: var(--fanfic-black);
    }

    :global(.underline div svg) {
        margin: 0.25rem 0.25rem 0 0;
    }

    .underline div p {
        font-family: var(--mono);
        padding: 0;
        margin: 0;
        font-size: var(--12px);
        line-height: 1.25;
    }

    @media (max-width: 600px) {
        .quote, .real, .bg {
            height: 420px;
        }
        .quote {
            margin: 4rem 0;
        }
        .attribution img {
            width: 3rem;
            height: 3rem;
        }
        .name {
            font-size: var(--12px);
            line-height: 1.25;
        }
        .title, .underline div p {
            font-size: 10px;
            line-height: 1.25;
        }

        .text {
            font-size: var(--14px);
        }

        .underline {
            flex-direction: column;
            gap: 0.5rem;
        }
        .right {
            justify-content: space-between;
        }
    }
</style>