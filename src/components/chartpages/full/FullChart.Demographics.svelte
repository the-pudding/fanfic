
<script>
    import * as d3 from "d3";
    import { fade } from 'svelte/transition';
    import { LayerCake, Svg, flatten, stack, Html } from 'layercake';
    import Rank from "$components/Rank.svelte";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import AxisY from "$components/layercake/AxisY.svg.svelte";
    import InlineChartTreemap from "$components/chartpages/inline/InlineChart.Treemap.svelte";
    import data from '$data/SLASH/SLASH_genderIdentity.csv';

    export let id;
    let innerWidth;

    const treemapArray = [0, 1];
</script>

<svelte:window bind:innerWidth />

<div class="viz-wrapper">
    <div class="content-wrapper">
        <div class="treemap-wrapper">
            {#each treemapArray as treemap, i}
                {@const treeId = id + i}
                {@const hed = i == 0 ? "Do you identify as LGBTQ+ in any form?" : "Do you identify transgender?"}
                <div class="treemap-inner">
                    <h5>{hed}</h5>
                    <InlineChartTreemap id={treeId} height={300} />
                </div>
            {/each}
        </div>
        <div class="bar-wrapper">
            <h5>What is your gender identity?</h5>
            {#each data as response, i}
            <div class="row">
                <p>{response.response}</p>
                <div class="bars">
                    <div class="baseline"></div>
                    <div class="dataline" style="width: {response.percent}%">
                        <p>{response.percent}%</p>
                    </div>
                </div>
            </div>
            {/each}
        </div>
    </div>
    <p class="note">Note: Unsure includes questioning. NR is no response.</p>
</div>

<style>
    :global(#SLASH_AO3demographics0, #SLASH_AO3demographics1) {
        border: none;
        margin: 0;
        width: 100%;
    }
    
    .viz-wrapper {
        width: 100%;
        margin: 1rem auto 2rem auto;
        background: #f2f2f2;
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
    }

    .content-wrapper {
        width: 100%;
        display: flex;
        gap: 2rem;
        flex-direction: row;
    }

    .treemap-wrapper {
        display: flex;
        flex-direction: column;
        width: 50%;
        border: 2px solid;
        border-color: var(--window-inset-stroke);
        padding: 1rem;
    }

    .treemap-inner {
        display: flex;
        width: 100%;
        flex-direction: column;
    }

    .treemap-inner:last-of-type {
        margin-top: 2rem;
    }

    .note {
        font-family: var(--sans);
        font-size: 10px;
        font-style: italic;
        line-height: 1.25;
    }

    h5 {
        text-align: center;
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--18px);
        margin: 0 0 0.5rem 0;
        padding: 0;
        line-height: 1.25;
    }

    .bar-wrapper {
        width: 50%;
        border: 2px solid;
        border-color: var(--window-inset-stroke);
        padding: 1rem;
    }

    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 4px 0;
        /* border: 1px solid black; */
    }

    .row p {
        font-family: var(--mono); 
        font-size: var(--12px);
        width: 9rem;
        line-height: 1.25;
        margin: 0;
        padding: 0 0 0 0.5rem;
        font-weight: 700;
    }

    .bars {
        position: relative;
        height: 1.75rem;
        width: calc(100% - 9rem);
        border: 2px solid;
        border-color: var(--window-inset-stroke);
    }

    .baseline {
        width: 100%;
        height: 100%;
        position: absolute;
        background: var(--fanfic-window-gray);
    }

    .dataline {
        position: absolute;
        height: 100%;
        background: var(--fanfic-blue);
        display: flex;
        align-items: center;
    }

    .dataline p {
        position: absolute;
        left: calc(100% + 5px);
        width: auto;
        padding: 0;
    }

    @media (max-width: 800px) {
        h5 {
            font-size: var(--14px);
        }
    }

    @media (max-width: 600px) { 
        .viz-wrapper {
            flex-direction: column;
        }

        .treemap-wrapper, .bar-wrapper {
            width: 100%;
        }
        .row p {
            font-size: 10px;
            width: 7.5rem;
        }
        .bars {
            width: calc(100% - 7.5rem);
        }
    }
</style>