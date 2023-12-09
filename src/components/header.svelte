<script>
    import { toggleThemeMenu } from "../lib/stores/themeMenu.js";
    import ThemeIcon from "../icons/themeIcon.svelte"
    import ThemeMenu from "./themeMenu.svelte"
</script>


<section>
    <p class="name">hideko</p>
    <div on:click={toggleThemeMenu} class="theme-icon">
        <ThemeIcon/>
        <ThemeMenu/>
    </div>
</section>

<style>
    section {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .theme-icon {
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 7px;
        border: 1px solid transparent;
        position: relative;
    }

    .name {
        font-weight: 700;
    }
</style>