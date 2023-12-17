<script>
    import { themeMenu, toggleThemeMenu } from "../lib/stores/themeMenu.js";
    import { setTheme } from "../lib/stores/theme.js";
    import ThemeIcon from "../icons/themeIcon.svelte";
    import { onMount } from "svelte";
    let sectionRef;
    let style = "scale: 0.9; opacity: 0; pointer-events: none"
    $: {
        if($themeMenu) {
            style = "scale: 1; opacity: 1; pointer-events: all"
        } else {
            style = "scale: 0.9; opacity: 0; pointer-events: none"
        }
    }
    const styles = [
        {theme: "dark", name: "Dark"},
        {theme: "light", name: "Light"},
        {theme: "system", name: "System"}
    ];

    onMount(() => {
        window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    });
    function handleOutsideClick(event) {
        const isSectionClick = sectionRef && sectionRef.contains(event.target);
        const isThemeClick = event.target.closest('.theme');
        if (!isSectionClick && !isThemeClick) {
            if($themeMenu) {
                toggleThemeMenu()
            }
        }
    }
</script>

<section style={style} bind:this={sectionRef}>
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
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
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