<!-- JS -->
<script>
    // Imports
    import Meta from '$components/Meta/Meta.svelte'
</script>

<!-- METADATA -->
<Meta title='The Grotto Builders Foundation' description='Help support the continued development of this cool deck builder and explorer :)'/>

<!-- HTML -->
<div class="deck-header">
    <div class="deck-data-container">
        <!-- <h1>Hello</h1> -->
        <div class="info-container">
            <h1>The Grotto Builders Foundation</h1>
            <p class="deck-author">Help support the continued development of this cool deck builder and explorer :)</p>
            <ul class="deck-tags">
                <li>Generous</li>
                <li>Charitable</li>
                <li>Kind-Hearted</li>
                <li>Gambling</li>
                <li>Grotto Tribal</li>
            </ul>
        </div>
    </div>
</div>

<div class="header-divider-alt"></div>

<div class="welcome-page">

    <div class="panel">
        <h1>Donations & Support</h1>
        <h2 class="greeting"><span>Hi there grotto pals!</span><img src="/images/icons/hand_wave.svg" alt="meowdy" height="28"><img src="/images/emotes/meowdy.png" alt="meowdy" height="32"></h2>
        <p>My name is <a href="https://sam.freelancepolice.org/" target="_blank">Sebastião "Sam" Casaleiro</a>, and I've been developing this website in my free time since June 11th 2023. I created it for love of <b><i>Grotto Beasts!</i></b>, and to help myself and fellow grotto enjoyers create and explore decks.</p>
        <p>Everything is 100% free and <a href="https://github.com/SamTF/grotto-beasts-deckbuilder" target="_blank">open source</a>. That said, if you've found <b><i>Grotto Builders</i></b> useful, and want to contribute to its continued existence or support the creator, I would very gratefully accept a small donation :)</p>
    </div>

    <div class="panel">
        <div class="donation-container">
            <iframe
                id='kofiframe'
                src='https://ko-fi.com/samfreelancepolice/?hidefeed=true&widget=true&embed=true&preview=true'
                height='712'
                title='samfreelancepolice'>
            </iframe>
        </div>
    </div>

</div>

<div class="divider"></div>

<!-- CSS -->
<style>
    .panel h1 {
        color: var(--colour-red);
    }
    .panel .greeting {
        display: flex;
        align-items: center;
        font-size: 1.25rem;
    }
    .panel .greeting span {
        margin-right: 0.5rem;
    }

    iframe {
        width: 100%;
        padding: 4px;

        background:#f9f9f9;
        border: none;
    }

    .donation-container {
        width: 70%;
        height: 666px;
        min-width: fit-content;
        min-height: fit-content;

        border-radius: 1rem;
        overflow: hidden;
    }
</style>