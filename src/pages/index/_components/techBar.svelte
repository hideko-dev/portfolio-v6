<script>
    import { techState } from "../../../lib/stores/tech.js";
    import Fa from "svelte-fa";
    import {faLanguage, faMeteor, faMicrochip, faPlug} from "@fortawesome/free-solid-svg-icons";
    import {faCode} from "@fortawesome/free-solid-svg-icons/faCode";
    import {onMount} from "svelte";

    let stateMenu = false;
    let menuStyle = "scale: 0.92; opacity: 0; pointer-events: none";
    let sectionRef;

    const checkMark = `<svg style="margin: 0 2px 0 auto" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-auto h-4 w-4 opacity-100"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`

    function toggleBar(key){
        techState.set(key)
        toggleMenu()
    }

    function toggleMenu(){
        if(stateMenu === true){
            stateMenu = false;
            menuStyle = "scale: 0.92; opacity: 0; pointer-events: none";
        } else {
            stateMenu = true;
            menuStyle = "scale: 1; opacity: 1; pointer-events: all";
        }
    }

    onMount(() => {
        window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    });
    function handleOutsideClick(event) {
        const isSectionClick = sectionRef && sectionRef.contains(event.target);
        const isThemeClick = event.target.closest('.titles');
        if (!isSectionClick && !isThemeClick) {
            if(stateMenu) {
                toggleMenu()
            }
        }
    }

    const menus = [
        {icon: faCode, text: "Language", state: 0},
        {icon: faPlug, text: "Library", state: 1},
        {icon: faMeteor, text: "Framework", state: 2},
        {icon: faMicrochip, text: "Technology", state: 3}
    ];
</script>

<section bind:this={sectionRef}>
    <div class="titles">
        <div class="title" on:click={toggleMenu}>
            <Fa icon={menus[$techState].icon} color="var(--thin)" fw/>
            <p>{menus[$techState].text}</p>
        </div>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-auto h-4 w-4 shrink-0 opacity-50">
            <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>

        <div class="menu" style={menuStyle}>
            {#each menus as menu}
                <div class="menuBox" on:click={() => toggleBar(menu.state)}>
                    <Fa icon={menu.icon} fw/>
                    <p>{menu.text}</p>
                    {#if $techState === menu.state}
                        {@html checkMark}
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    section {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 9rem;
        height: 1.95rem;
        border: 1px solid var(--border);
        border-radius: 6px;
        padding: 2px;
        cursor: pointer;
        font-size: 15px;
        font-family: 'Inter', sans-serif;
    }
    .titles {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: relative;
        user-select: none;
    }
    .menuBox {
        display: flex;
        align-items: center;
        color: var(--thin);
        gap: 4px;
        height: 1.7rem;
        width: 8.2rem;
        font-size: 14px;
        padding: 5px;
        border-radius: 3px;
        transition: all 0.2s;
    }
    .menuBox:hover {
        background: var(--btn-thin)
    }
    .menu {
        position: absolute;
        left: -2px;
        top: 30px;
        background: rgba(var(--bg-rgb), 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid var(--border);
        width: 9rem;
        height: 8em;
        border-radius: 6px;
        z-index: 100;
        transform-origin: center top;
        transition: all 0.15s;
        padding-block: 5px;
        display: grid;
        place-items: center;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }
    .title {
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 5px;
        margin-left: 8px;
        color: var(--thin);
        width: 100%;
        height: 100%;
    }
    svg {
        margin: 0 10px 0 auto;
        transition: all 0.3s;
    }
</style>