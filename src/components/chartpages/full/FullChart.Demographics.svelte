
<script>
    import * as d3 from "d3";
    import { fade } from 'svelte/transition';
    import { LayerCake, Svg, flatten, stack, Html } from 'layercake';
    import Rank from "$components/Rank.svelte";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import AxisY from "$components/layercake/AxisY.svg.svelte";
    import InlineChartTreemap from "$components/chartpages/inline/InlineChart.Treemap.svelte";
    import data from '$data/SLASH/SLASH_genderIdentity.csv';

    console.log(data)

    export let id;
    let innerWidth;

    const treemapArray = [1, 0];
</script>

<svelte:window bind:innerWidth />

<div class="viz-wrapper">
    <div class="treemap-wrapper">
        {#each treemapArray as treemap, i}
            {@const treeId = id + i}
            {@const hed = i == 0 ? "Do you identify as LGBTQ+ in any form?" : "Do you identify transgender?"}
            <div class="treemap-inner">
                <h3>{hed}</h3>
                <InlineChartTreemap id={treeId} />
            </div>
        {/each}
    </div>
    <div class="bar-wrapper">
        <h3>What is your gender identity?</h3>
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

<style>
    .viz-wrapper {
        background: white;
        padding: 2rem;
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }

    .treemap-wrapper {
        display: flex;
        flex-direction: column;
        width: 50%;
    }

    .treemap-inner {
        display: flex;
        width: 100%;
        height: 380px;
        flex-direction: column;
    }

    .treemap-inner:last-of-type {
        margin-top: 1rem;
    }

    h3 {
        text-align: center;
        font-family: var(--mono);
        font-weight: 700;
        font-size: var(--18px);
        margin: 0 0 0.5rem 0;
        padding: 0;
    }

    .bar-wrapper {
        width: 50%;
    }

    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 4px 0;
        border: 1px solid black;
    }

    .row p {
        font-family: var(--mono); 
        font-size: 10px;
        width: 9rem;
        line-height: 1.25;
        margin: 0;
        padding: 0 0 0 0.5rem;
    }

    .bars {
        position: relative;
        height: 1.75rem;
        width: calc(100% - 9rem);
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

    @media (max-width: 600px) { 
        .viz-wrapper {
            flex-direction: column;
        }

        .treemap-wrapper, .bar-wrapper {
            width: 100%;
        }
    }
</style>