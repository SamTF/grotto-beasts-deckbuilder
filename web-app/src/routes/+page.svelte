<!-- JS -->
<script>
    import Meta from '$components/Meta/Meta.svelte'
    import { pb, currentUser } from '$lib/pocketbase.js'
    import { openModal } from 'svelte-modals'
    import Icon from '$components/UI/Icon.svelte';
</script>

<!-- METADATA -->
<Meta />

<!-- HTML -->
<div class="header-divider"></div>

<div class="welcome-page">
    <div class="panel">
        <img src="/images/logo.svg" alt="Grotto Builders logo" class="site-logo">
        <div class="tagline">
            <p>Create</p>
            <p>✦</p>
            <p>Share</p>
            <p>✦</p>
            <p>Explore</p>
        </div>
        
        <p class="made-by">Made by Sam :)</p>

        <div class="body-text">
            <p><b>Grotto Builders</b> is a Deck Building tool for the hit trading card game <a href="https://grottobeasts.net/" target="_blank"><i><b>Grotto Beasts!</b></i></a></p>
            <p>Create decks, share them, and explore the decks the community has made.</p>
            <p>Grotto Builders is an <b>unofficial</b> fan-made resource and not affiliated with Elberston and Sons.</p>
            <hr>
            <p>While mostly complete, Grotto Builders is a work in progress and being worked on and maintained in my spare time.</p>
            <p>Feedback, suggestions, and contributions are always welcome!</p>
            <p>You can find and message me on <a href="https://discord.com/users/216972321099874305/" target="_blank">Discord</a> or <a href="https://steamcommunity.com/id/customurlalreadyused/" target="_blank">Steam</a>.</p>
        </div>
    </div>

    <div class="buttons-panel">
        <a href="/cards" class="route-icon-btn">
            <img src="/images/icons/cards.svg" alt="Cards" class="icon">
            <span>Explore Cards</span>
        </a>
        <a href="/decks" class="route-icon-btn">
            <img src="/images/icons/decks.svg" alt="Decks" class="icon">
            <span>Explore Decks</span>
        </a>
        <a href="/create/deck" class="route-icon-btn">
            <Icon name='plus-circle' solid={true} strokeWidth='0' />
            <span>Create Deck</span>
        </a>
        <a href="/pack" class="route-icon-btn">
            <img src="/images/icons/pack.svg" alt="Card Pack" class="icon">
            <span>Open Packs</span>
        </a>
    </div>

    
    <div class="panel">
    <p class="made-by">About me</p>
        <div class="body-text">
            <p>Hi there, my name is Sam! Some of you may know me from Jerma chat as SamFreelancePolice.</p>
            <p>I've been watching Jerma since I was 12 and this summer I spent all my spare money on Grotto Beasts, and I enjoy them so much that I decided to create this online deck builder and give something to the Jerma community!</p>
            <p>I graduated a Game Design course from university this summer <a href="https://chroma-mancer.com/" target="_blank">(where I made a game called Chroma Mancer)</a>. I'm currently unemployed and looking for a job, so if any of you millionaire Andys own a game studio or need a website made, <a href="https://sam.freelancepolice.org/" target="_blank"> hit me up</a> :)</p>            
        </div>
    </div>

    <div class="panel">
        <p class="made-by">Donations & Support</p>
            <div class="body-text">
                <p>I've finally set up a <a href="/donate">donations page!</a></p>
                <p>If you've found <b><i>Grotto Builders!</i></b> useful, and want to contribute to its continued existence or support the creator, <a href="/donate">I would very gratefully accept a small donation :)</a></p>
            </div>
        </div>

    <div class="panel">
        <p class="made-by">Special Thanks</p>
        <b>Supported by:</b>
        <div class="special-thanks">
            <p><a href="/user/netdotnet">Net</a></p>
        </div>

        <b>For help, feedback, and inspiration:</b>
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
        <b>Signed in as [{$currentUser.username}]</b>
    {:else}
        <b>[not signed in]</b>
    {/if}
</div>
