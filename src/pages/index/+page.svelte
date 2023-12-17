<script>
    import Title from "$lib/title.svelte"
    import About from "./_components/about.svelte"
    import Tech from "./_components/tech.svelte"
</script>

<Title value="Home"/>

<section>
    <div>
        <About/>
        <Tech/>
    </div>
</section>

<style>
    section {
        display: flex;
        justify-content: center;
        padding-top: 11rem;
    }
</style>