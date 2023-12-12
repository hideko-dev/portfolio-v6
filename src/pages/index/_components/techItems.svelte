<script>
    import { frameworks, languages } from "../../../lib/consts/techs.js";
    import { techState } from "../../../lib/stores/tech.js";
    import { fly } from "svelte/transition";
</script>

<section style={`height: ${$techState === 0 ? 6 : 12}rem`}>
    {#key $techState}
        <div class="contents" in:fly={{ x: -5, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}>
            {#if $techState === 0}
                {#each languages as c}
                    <div class="box">
                        <p>{c}</p>
                    </div>
                {/each}
            {:else}
                {#each frameworks as c}
                    <div class="box">
                        <p>{c}</p>
                    </div>
                {/each}
            {/if}
        </div>
    {/key}
</section>

<style>
    section {
        width: 30rem;
        position: relative;
        transition: all 0.2s;
    }
    .contents {
        position: absolute;
        display: inline-flex;
        box-sizing: border-box;
        align-items: center;
        line-height: 1.1876em;
        letter-spacing: 0.00938em;
        flex-wrap: wrap;
        gap: 6px;
        width: 100%;
    }
    @media (max-width: 600px) {
        section {
            width: 20rem;
        }
    }
    .box {
        width: max-content;
        padding-inline: 12px;
        padding-block: 3px;
        border-radius: 100px;
        font-size: 15px;
        border: 1px solid var(--border);
    }
</style>