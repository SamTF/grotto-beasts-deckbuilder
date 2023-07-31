<!-- JS -->
<script>
    import Meta from '$components/Meta/Meta.svelte'
    import { pb, currentUser } from '$lib/pocketbase.js'
</script>

<!-- METADATA -->
<Meta />

<!-- HTML -->
<div class="header-divider"></div>

<div class="welcome-page">
    <div class="panel">
        <img src="/images/logo.svg" alt="Grotto Builder logo">
        <div class="tagline">
            <p>Create</p>
            <p>✦</p>
            <p>Share</p>
            <p>✦</p>
            <p>Explore</p>
        </div>
        
        <p class="made-by">Made by Sam :)</p>

        <div class="body-text">
            <p><b>Grotto Builder</b> is a Deck Building tool for the hit trading card game <a href="https://grottobeasts.net/" target="_blank"><i><b>Grotto Beasts!</b></i></a></p>
            <p>Create decks, share them, and explore the decks the community has made.</p>
            <p>Grotto Builders also features a card browser that allows  filtering by tags.</p>
            <hr>
            <p>It is very much work in progress and being worked on in my spare time. Expect very slow but steady progress :)</p>
            <p>Feedback, suggestions, and contributions are always welcome!</p>
            <hr>
        </div>

        <p class="made-by">Special Thanks</p>
        <b>For continous help, feedback, and inspiration:</b>
        <div class="special-thanks">
            <p><a href="https://www.grotto-bestiary.com/" target="_blank">Violet</a></p>
        </div>

        <b>For scanning the cards:</b>
        <div class="special-thanks">
            <p>Jeff</p>
            <p>Paul</p>
            <p>ConvoBreaker</p>
            <p>DreamyTracker</p>
            <p>Cylosis</p>
            <p>SpookyBoogie</p>
            <p>godofgubgub</p>
            <p>quirky.</p>
            <p>TheDangerDog</p>
            <p>randomCaribou</p>
        </div>
    </div>

    <!-- display current user -->
    {#if $currentUser}
        <b>Signed in as [+{$currentUser.username}]</b>
    {:else}
        <b>[not signed in]</b>
    {/if}
</div>

<!-- CSS -->
<style>
    .welcome-page {
        display: grid;
        place-items: center;
    }

    .panel {
        /* display */
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        /* size */
        /* height: 32rem; */
        width: 36rem;

        padding: 1rem 2rem;
        
        /* design */
        background-color: var(--colour-mid-light);
        border-radius: 1rem;

        margin-bottom: 2rem;
    }

    .tagline {
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        width: 100%;

        color: white;
        text-transform: uppercase;
        font-weight: 700;
    }

    .made-by {
        font-size: 1.25rem;
        font-weight: 900;
        color: var(--colour-red);
        letter-spacing: 2px;
        /* -webkit-text-stroke: 1px;
        -webkit-text-stroke-color: var(--colour-accent); */
    }

    .body-text {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    hr {
        width: 66%;
        border-top: 1px solid rgba(0, 0, 0, 0.425);
        border-bottom: 0px;
        align-self: center;
        margin: 0.5rem 0rem;
    }

    .special-thanks {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;

        justify-content: center;

        width: 100%;
    }
    .special-thanks p::before {
        content: "✦ ";
    }
    .special-thanks a {
        text-decoration: underline;
    }
</style>