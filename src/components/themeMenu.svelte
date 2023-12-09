<script>
    import { themeMenu } from "../lib/stores/themeMenu.js";
    import { setTheme } from "../lib/stores/theme.js";
    import ThemeIcon from "../icons/themeIcon.svelte";
    let style = "scale: 0.96; opacity: 0"
    $: {
        if($themeMenu) {
            style = "scale: 1; opacity: 1"
        } else {
            style = "scale: 0.96; opacity: 0"
        }
    }
    const styles = [
        {theme: "dark", name: "Dark"},
        {theme: "light", name: "Light"},
        {theme: "system", name: "System"}
    ];
</script>

<section style={style}>
    {#each styles as s}
        <div class="btn" on:click={() => setTheme(s.theme)}>
            <ThemeIcon mode={s.theme}/>
            <p>{s.name}</p>
        </div>
    {/each}
</section>

<style>
    section {
        width: 5.7rem;
        height: 5.5rem;
        padding-block: 5px;
        padding-inline: 5px;
        position: absolute;
        right: 0;
        top: 2rem;
        background: var(--bg);
        border: 1px solid var(--border);
        transform-origin: right top;
        transition: all 0.15s;
        user-select: none;
        border-radius: 10px;
        display: grid;
    }
    .btn {
        font-size: 12px;
        padding-inline: 7px;
        display: flex;
        align-items: center;
        gap: 3px;
        border-radius: 5px;
        transition: all 0.2s;
        cursor: pointer;
    }
    .btn:hover {
        background: var(--border);
    }
</style>