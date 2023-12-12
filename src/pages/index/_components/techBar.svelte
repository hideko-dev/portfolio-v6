<script>
    import { techState } from "../../../lib/stores/tech.js";
    let style = "width: 5.3rem; left: 2px;"
    export function toggleBar(key){
        if(key === 0){
            style = "width: 5.3rem; left: 2px;"
            techState.set(0)
        } else {
            style = "width: 5.9rem; left: 85px;"
            techState.set(1)
        }
    }
</script>

<section>
    <div class="box" style={style}/>
    <p class="text" on:click={() => toggleBar(0)}>Language</p>
    <p class="text" on:click={() => toggleBar(1)}>Framework</p>
</section>

<style>
    section {
        width: 11.6rem;
        height: 2rem;
        border: 2px solid var(--border);
        border-radius: 7px;
        position: relative;
        padding: 2px;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: var(--thin);
    }
    .box {
        position: absolute;
        height: 1.5rem;
        background: var(--outline);
        border-radius: 5px;
        z-index: -1;
        transition: all 0.3s;
    }
    .text {
        padding: 7px;
        font-size: 15px;
        transition: all 0.2s;
    }
    .text:hover {
        color: var(--text);
    }
</style>