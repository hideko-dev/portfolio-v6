<script>
    import catIcon from "$lib/assets/cat.webp"
</script>

<section>
    <p class="title">About</p>
    <div class="bios">
        <div class="img">
            <img src={catIcon} alt="icon">
        </div>
        <div class="bio">
            I am a front end developer. I can do backend and software as well as frontend. Not only that, I release various projects as open source.
            <br><br>
            When I was very young, I fell in love with Minecraft and wanted to create plug-ins and mods from it. From there I worked hard to buy a computer and suddenly started learning Java.
            <br><br>
            I said I was learning Java out of the blue, and I didn't do any research to make sure I was doing it right.
            <br><br>
            After that I stopped programming for about two years, and after that I suddenly wanted to do front-end development.
            <br><br>
            In the beginning, we created a simple static site with only HTML, CSS, and JavaScript. From there, I became interested in React and learned about it, and then Next.js.
            <br><br>
            From there, I fell in love with JavaScript and started back-end development with Nodejs, and have done many other things. At first I created a portfolio with React, but I failed many times.
            <br><br>
            That's when I came across Svelte, which I felt was the framework that best suited me, and from there I created
            <a href="https://v1.hideko.cf">Portfolio v1</a>. This was also a failure, but from there I went through a lot of trial and error and eventually created <a href="https://hideko.cf">Portfolio v5</a>.
            <br><br>
            We developed not only the front end but also the back end, including <a href="https://github.com/hideko-dev/thundis">Thundis</a>, <a href="https://github.com/hideko-dev/discord-cdn-deliver">discord-cdn-deliver</a>, <a href="https://github.com/hideko-dev/Mod-Us">ModUs</a> and <a href="https://github.com/hideko-dev/meteor">Meteor</a> using Electron. From there, I worked on the front-end development of
            <a href="https://github.com/yukieiji/ExtremeRoles">yukieiji's ExtremeRoles</a> to learn a great deal about Git, including Branches, Issues, Pull Requests, and Git Command. Docs, etc. I was involved in the development of ExtremeRoles.
            <br><br>
            Other projects we have developed include <a href="https://github.com/yukieiji/ExtremeRoles.Docs">ExtremeRoles.Docs</a>,
            <a href="https://github.com/hideko-dev/ExtremeRoles.Web">ExtremeRoles.Web</a> and a dedicated server match system in ExtremeRoles.
        </div>
    </div>
</section>

<style>
    .title {
        font-weight: 700;
        font-size: 25px;
    }
    .bios {
        margin: 0 auto;
        width: 30rem;
    }
    .bio {
        margin-top: 15px;
    }
    img {
        float: right;
        margin-left: 1rem;
        margin-bottom: 1rem;
        border-radius: 100%;
        outline: 1px solid var(--border);
        aspect-ratio: 1 / 1;
        height: 120px;
        width: 120px;
        object-fit: cover;
    }
    a {
        text-decoration: none;
        color: var(--text);
        position: relative;
    }
    a:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 100%;
        height: 1px;
        border-radius: 100px;
        background:var(--little);
        transition: all 0.2s;
    }
    a:hover::after {
        background: var(--text);
    }
    @media (max-width: 600px) {
        .bios {
            width: 20rem;
        }
        img {
            float: none;
            height: 140px;
            width: 140px;
        }
        .img {
            margin-top: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>