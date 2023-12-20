<script>
    import {techOverlay, toggleTechOverlay} from "$lib/stores/tech.js";
    let style = "opacity: 0; pointer-events: none"
    let boxStyle = "scale: 0.95"
    let lines = []

    $: {
        if($techOverlay.status) {
            style = "opacity: 1; pointer-events: all"
            boxStyle = "opacity: 1; scale: 1"
        } else {
            style = "opacity: 0; pointer-events: none"
            boxStyle = "opacity: 0; scale: 0.95"
        }
        lines = [
            {name: "Ability", context: $techOverlay.state},
            {name: "Web", context: $techOverlay.web, href: $techOverlay.web}
        ]
    }
</script>

<section on:click={toggleTechOverlay} style={style}>
    <div class="box" style={boxStyle}>
        <p class="title">{$techOverlay.text}</p>
        {#each lines as c}
            <div class="line">
                <p class="name">{c.name}</p>
                <a class="context" href={c.href}>{c.context}</a>
            </div>
        {/each}
    </div>
</section>

<style>
    section {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(var(--bg-rgb), 0.7);
        backdrop-filter: blur(10px);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
    }
    .box {
        width: 20rem;
        height: 7rem;
        border-radius: 10px;
        border: 1px solid var(--outline);
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
        background: var(--bg);
        transform-origin: bottom center;
        transition: all 0.3s;
        padding: 1rem;
        font-family: 'Inter', sans-serif;
    }
    .title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 12px;
    }
    .line {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-block: 5px;
    }
    .name {
        background: var(--outline);
        padding-inline: 5px;
        padding-block: 1px;
        border-radius: 4px;
        font-size: 12px;
    }
    .context {
        overflow: hidden;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 15px;
        text-decoration: none;
        color: var(--text);
        transition: all 0.2s;
    }
    .context:hover {
        color: var(--thin)
    }
</style>