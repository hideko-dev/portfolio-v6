<script>
    import Title from "$lib/title.svelte"
    import { onMount } from "svelte";
    import { cms } from "$lib/cms/cms.js";
    import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { fade } from "svelte/transition";
    import PageTitle from "../../components/pageTitle.svelte";
    import {worksData} from "$lib/stores/works.js";
    let datas = [];
    onMount(async () => {
        const res = await cms.get({ endpoint: "works" });
        datas = res.contents;
    })
</script>

<Title value="Works"/>

<section>
    <div class="items">
        <PageTitle title="Works"/>
        {#key data}
            <div in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
                {#if datas.length > 0}
                    <div class="contents">
                        {#each datas as data}
                            <a href={data.website} class="item">
                            <span class="titles">
                                <p class="title">{data.title}</p>
                                <span class="stats">
                                    {#if JSON.stringify(data.stats) === JSON.stringify(['None'])}
                                    {:else}
                                        <p>{data.stats}</p>
                                    {/if}
                                </span>
                            </span>
                                <p class="bio">{data.bio}</p>
                            </a>
                        {/each}
                    </div>
                {:else}
                    <div class="loading">
                        <Fa icon={faCircleNotch} size="3x" spin />
                    </div>
                {/if}
            </div>
        {/key}
    </div>
</section>

<style>
    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 50%;
    }
    section {
        display: flex;
        justify-content: center;
        min-height: 100vh;
        height: max-content;
        padding-block: 2rem;
        padding-top: 11rem;
    }
    .items {
        margin: 0 auto 0;
        width: 35rem;
    }
    .stats {
        font-size: 11px;
        border-radius: 8px;
        background:var(--text);
        color: var(--bg);
        margin-left: 5px;
    }
    .stats p{
        margin-inline: 8px;
        margin-block: 2px;
    }
    .titles {
        display: flex;
        align-items: center;
    }
    .title {
        font-weight: 500;
        border-bottom: 1px solid var(--text);
        margin-bottom: 1px;
    }
    .contents {
        margin-top: 5px;
    }
    .item {
        font-family: 'Inter', sans-serif;
        display: block;
        text-decoration: none;
        color: var(--text);
        border-radius: 10px;
        padding-block: 10px;
        transition: all 0.2s;
        padding-inline: 2px;
        position: relative;
    }
    .item::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        opacity: 0;
        height: 100%;
        background: linear-gradient(to right, var(--bg-thin), transparent);
        border-radius: 10px;
        z-index: -1;
        transition: all 0.2s ease;
    }
    .item:hover {
        padding-inline: 13px;
    }
    .item:hover::before {
        /*width: 100%;*/
        opacity: 1;
    }
    .bio {
        font-size: 14px;
        color: var(--thin);
        width: 100%;
    }
    @media (max-width: 700px) {
        .items {
            width: 80%;
        }
    }
</style>