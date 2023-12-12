<script>
    import { toggleThemeMenu } from "../lib/stores/themeMenu.js";
    import ThemeIcon from "../icons/themeIcon.svelte"
    import ThemeMenu from "./themeMenu.svelte"
    import {faGithub, faInstagram} from "@fortawesome/free-brands-svg-icons";
    import Fa from "svelte-fa";

    const links = [
        {icon: faGithub, href: "https://github.com/hideko-dev"},
        {icon: faInstagram, href: "https://instagram.com/hideko.cat"},
    ]
</script>


<section>
    <div class="container">
        <div class="content">
            <a class="title" href="/">
                <p class="name">hideko</p>
                <p class="sub">■ fullstack engineer</p>
            </a>
            <div class="links">
                {#each links as link}
                    <a href={link.href} class="link"><Fa icon={link.icon}/></a>
                {/each}
            </div>
            <div on:click={toggleThemeMenu} class="theme">
                <div class="theme-icon">
                    <ThemeIcon/>
                </div>
                <ThemeMenu/>
            </div>
        </div>
        <div class="navs">
            <a class="nav" href="/works">works</a>
            <a class="nav" href="/contact">contact</a>
        </div>
    </div>
</section>

<style>
    .container {
        width: 30.2rem;
        display: block;
    }
    .navs {
        margin-top: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .nav {
        text-decoration: none;
        font-size: 15px;
        color: var(--thin);
        transition: all 0.2s;
        padding-inline: 10px;
        padding-block: 2px;
        border-radius: 100px;
        background: var(--outline);
    }
    .nav:hover {
        color: var(--text);
    }
    .title {
        text-decoration: none;
        color: var(--text);
        font-family: 'Inter', sans-serif;
        margin: 0 auto 0 0;
    }
    .name {
        font-weight: 700;
        font-size: 20px;
    }
    .sub {
        margin-top: 2px;
        font-size: 14px;
    }
    section {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 11rem;
        position: fixed;
        width: 100%;
        padding: 2rem;
        background: rgba(var(--bg-rgb), 0.8);
        backdrop-filter: blur(10px);
        z-index: 100;
    }
    .content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media (max-width: 600px) {

    }
    .theme {
        width: 1.9rem;
        height: 1.9rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 7px;
        border: 1px solid transparent;
        position: relative;
        margin-left: 12px;
        transition: all 0.2s;
    }
    .theme-icon {
        width: 100%;
        height: 100%;
        border-radius: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
    }
    .theme-icon:hover {
        background: var(--outline);
    }
    .links {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    .link {
        text-decoration: none;
        color: var(--text);
        font-size: 20px;
        transition: all 0.2s;
    }
    .link:hover {
        opacity: 0.6;
    }
</style>