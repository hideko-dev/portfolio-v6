<script>
    // import { framework, language, technology, library } from "../../../lib/consts/techs.js";
    import { techState } from "../../../lib/stores/tech.js";
    import { fly } from "svelte/transition";
    import {onMount} from "svelte";
    import {cms} from "$lib/cms/cms.js";

    let language = [],
        library = [],
        framework = [],
        technology = []

    onMount(async () => {
        const res = await cms.get({ endpoint: "technologies" });
        const processType = (type) => {
            const data = res.contents.find(item => item.type.includes(type));
            if (data) {
                return data.array.split(',').map(item => item.trim());
            }
            return [];
        };

        language = processType('language')
        library = processType('library')
        framework = processType('framework')
        technology = processType('technology')
    });
</script>

<section style={`height: 10rem; transition-delay: ${$techState === 0 ? 0.3 : 0}s;`}>
    {#key $techState}
        <div class="contents" in:fly={{ x: -5, duration: 500 }} out:fly={{ x: 5, duration: 500 }}>
            {#if $techState === 0}
                {#each language as c}
                    <div class="box">
                        <p>{c}</p>
                    </div>
                {/each}
            {:else if $techState === 1}
                {#each library as c}
                    <div class="box">
                        <p>{c}</p>
                    </div>
                {/each}
            {:else if $techState === 2}
                {#each framework as c}
                    <div class="box">
                        <p>{c}</p>
                    </div>
                {/each}
            {:else if $techState === 3}
                {#each technology as c}
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
        width: 35rem;
        position: relative;
        transition: height 0.2s;
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
    @media (max-width: 700px) {
        section {
            width: 80%;
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