<script>
    import TechBar from "../_components/techBar.svelte"
    import TechItems from "../_components/techItems.svelte"
    import Fa from "svelte-fa";
    import PageTitle from "../../../components/pageTitle.svelte";
    import {faLightbulb} from "@fortawesome/free-regular-svg-icons";
</script>

<section>
    <div class="titles">
        <PageTitle title="Technology"/>
        <div class="bar"><TechBar/></div>
    </div>

    <div class="items">
        <TechItems/>
    </div>
</section>

<style>
    .titles {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    section {
        margin-top: 4rem;
    }
    .items {
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    @media (max-width: 700px) {
        .titles {
            margin-left: 10%;
        }
        .bar {
            margin-top: 8px;
        }
    }
</style>