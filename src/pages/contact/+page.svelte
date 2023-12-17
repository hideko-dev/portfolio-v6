<script>
    import Title from "$lib/title.svelte"
    import PageTitle from "../../components/pageTitle.svelte";
    import { sendForm } from "$lib/form/toast.js";
    import toast from "svelte-french-toast";

    let mail;
    let message;
    async function handleSubmit() {
        await sendForm(mail, message)
    }
</script>

<Title value="Contact"/>

<section>
    <div class="box">
        <PageTitle title="Contact" customStyle="margin: 0 auto 5px"/>
        <span class="span-input">Email</span>
        <input type="email" class="inputs" bind:value={mail}>
        <span class="span-textarea">What are the requirements?</span>
        <textarea class="inputs" bind:value={message}/>
        <div class="btn inputs" on:click={handleSubmit}>Submit</div>
    </div>
</section>

<style>
    section {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    }
    .box {
        display: grid;
    }
    .inputs {
        background: var(--bg);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 1rem;
        transition: all 0.2s;
        outline: 1px solid transparent;
        margin-block: 3px;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    }
    .inputs:hover {
        border-color: var(--text);
    }
    .inputs:focus {
        outline-color: var(--text);
    }
    input {
        height: 2.5rem;
    }
    textarea {
        width: 20rem;
        height: 12rem;
        resize: none;
    }
    span {
        margin-top: 5px;
        color: var(--thin);
        font-size: 14px;
    }
    .btn {
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
    }
    .btn:active {
        outline-color: var(--text);
    }
</style>