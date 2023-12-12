<script>
    import TechBar from "../_components/techBar.svelte"
    import TechItems from "../_components/techItems.svelte"
</script>

<section>
    <div class="titles">
        <p class="title">Technologies</p>
        <div class="bar"><TechBar/></div>
    </div>

    <div class="items">
        <TechItems/>
    </div>
</section>

<style>
    .title {
        font-weight: 700;
        font-size: 25px;
    }
    .titles {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    section {
        margin-top: 4rem;
    }
    .items {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    @media (max-width: 600px) {
        .titles {
            display: block;
        }
        .bar {
            margin-top: 8px;
        }
    }
</style>