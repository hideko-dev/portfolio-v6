<script>
    import {onMount} from "svelte";
    import {onNavigate} from "$app/navigation";

    let worksStyle = "width: 4rem; left: 0; opacity: 1";
    let contactStyle = "width: 4.7rem; left: 58px; opacity: 1"
    let boxStyle = "opacity: 0";

    let route = "/";
    $: {
        if(route === "/works") {
            boxStyle = worksStyle
        } else if(route === "/contact") {
            boxStyle = contactStyle
        } else {
            boxStyle = "opacity: 0"
        }
    }

    onMount(() => {
        route = window.location.pathname;
    })
    onNavigate((c) => {
        route = c.to.route.id
    })
    const navStyle = "color: var(--bg);"
</script>

<div class="navs">
    <div class="box" style={boxStyle}/>
    <a class="nav works" href="/works" style={`${route === "/works" ? navStyle : null}`}>
        <p class="navtext">works</p>
    </a>
    <a class="nav contact" href="/contact" style={`${route === "/contact" ? navStyle : null}`}>
        <p class="navtext">contact</p>
    </a>
</div>

<style>
    .navtext {
        z-index: 2;
    }
    .navs {
        border-radius: 100px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        border: 1px solid var(--border);
        background: rgba(var(--bg-rgb), 0.2);
        backdrop-filter: blur(10px);
        position: relative;
        width: 8.5rem;
    }
    .box {
        position: absolute;
        height: 1.6rem;
        z-index: -1;
        border-radius: 100px;
        background: var(--text);
        opacity: 1;
        transition: all 0.3s;
    }
    .nav {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-size: 15px;
        color: var(--btn-text);
        transition: all 0.2s;
        padding-block: 3px;
        border-radius: 100px;
        position: relative;
    }
    .nav:hover {
        color: var(--thin);
    }
    .works {
        width: 4rem;
    }
    .contact {
        width: 4rem;
    }
</style>