<!-- JS -->
<script>
    // Imports
    import Meta from '$components/Meta/Meta.svelte'
    import DeckStatsBar from "$components/Deck/DeckStatsBar.svelte"
    import BtnToggle from '$components/BtnToggle.svelte'
    import svelteTilt from 'vanilla-tilt-svelte'
    import { slide, fade, fly } from "svelte/transition"
    import toast from 'svelte-french-toast'

    let showPack = true
    let fadePack = false
    let cardsFlipped = 0
    let deck = []

    const pullCards = async () => {
        fadePack = true

        const res = await fetch('/api/pack')
        const data = await res.json()

        // update current pack
        pulledCards = data

        // update total cards pulled
        deck = [...deck, ...pulledCards]

        // hide the pack image
        showPack = false
    }

    $: pulledCards = []

    const flipCard = (event) => {

        // console.log(event.target.parentElement.parentElement)
        // rotate the card via CSS property
        event.target.parentElement.parentElement.style.setProperty('--rotateY', '180deg')
        cardsFlipped++
    }

    let flip = false;
    
    const showHelp = () => {
        const msg = {
            icon: '🎰',
            text: `1st card - 100% Beast
            2nd card - 85% Challenger, 15% Beast
            3rd card - 100% Beast
            4th card - 100% Wish
            5th card - 75% Grotto, 25% Beast
            6th card - 100% Beast
            7th card - 100% Beast
            8th card - 90% Wish, 10% Grotto
            9th card - 100% Rare (Challenger if card 2 is a Beast)
            10th card - 100% Holo
            
            Based on real data collected by Brandon
            `
        }

        toast.success(
            msg.text,
            {
                icon: msg.icon,
                duration: 5000
            }
        )
    }

    const reset = () => {
        // location.reload()
        showPack = true
        pulledCards = []
        cardsFlipped = 0
        fadePack = false
    }
    
</script>

<!-- METADATA -->
<Meta title='Pack Opening' />

<!-- HTML -->
<!-- <div class="header-divider" style="margin-bottom: 0;"></div> -->

<div class="pack-sim-container">
    <!-- HEADER -->
    <div class="deck-header">
        <div class="deck-data-container">
            <!-- Info -->
            <div class="info-container">
                <!-- Title -->
                <p class="deck-author">100% free! (cards not included)</p>
                <h1 class="deck-name desktop-only">Pack Opening Simulator</h1>
                <h1 class="deck-name mobile-only">Pack Opening Sim</h1>

                <!-- Tags -->
                <ul class="deck-tags">
                    <li>Exciting</li>
                    <li>Suspenseful</li>
                    <li>Gambling</li>
                </ul>

                <!-- Hightlight Buttons -->
                <div class="header-bottom-line">
                    <button class="highlight-bubble" on:click={showHelp}>
                        <span>Show Chances</span>
                        <img src="/images/emotes/meowdy.png" alt="original" height="16">
                    </button>
                </div>
            </div>
    
            <!-- Header Buttons -->
            <div class="header-btns">
                <h1>{cardsFlipped}</h1>
                <h1>{deck.length}</h1>
            </div>
        </div>
    </div>

    <!-- Divider -->
    <div class="header-divider"></div>

    <!-- Main Page Content -->
    <div class="page center">

        <!-- Card Pack -->
        {#if showPack}
            <div
                class="tilt"
                on:click={pullCards}
                on:keydown={pullCards}
                use:svelteTilt={{
                    max: 15,
                    reverse: true,
                    reset: true,
                    perspective: 1000
            }}>
                <img src="images/pack_front.webp" alt="grotto beasts card pack" class:fade={fadePack}>
            </div>
        {/if}
        
        <!-- Pulled Cards -->
        <div class="pulled-cards-container">
            {#each pulledCards as card}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="flip-card" use:svelteTilt={{ reverse: true, glare: false, "max-glare": 0.5 }} on:click={flipCard} in:fade={{ duration: 500 }}>
                    <div class="flip-card-inner" class:flip={flip}>
                        <div class="flip-card-front card-image">
                            <img src="images/cards/back.webp" alt="card">
                        </div>
                        <div class="flip-card-back card-image" class:card-image-holo={card.holo}>
                            <img src={card.imageURL.small} alt={card.name}>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Open Another -->
        {#if cardsFlipped === 10}
            <button
                class="btn-try-another"
                on:click={reset}
                in:fade={{ duration: 1000 }}
            >
            <img src="/images/icons/try another.png" alt="Try Another!">
                <span>🍾Try Another!</span>
            </button>
        {/if}
        
    </div>

    <!-- Stats Bar -->
    {#key deck}
        <DeckStatsBar {deck} />
    {/key}
</div>

<!-- CSS -->
<style>
    .page {
        /* height: 70dvh; */
        perspective: 1500px;
        margin-bottom: 2rem;
        min-height: 50dvh;
    }

    .pulled-cards-container {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        /* grid-auto-rows: 1fr; */
        grid-template-rows: 1fr 1fr;

        gap: 2rem;
    }

    .tilt img {
        max-height: 400px;
        filter: drop-shadow(0 0 0.33rem #370101);
        transition: all 200ms;
        opacity: 1.0;
    }
    .tilt img:hover {
        transform: scale(1.1);
        cursor: pointer;
        filter: drop-shadow(0 1rem 1rem #370101);
    }
    .tilt img.fade {
        opacity: 0.0;
        transition: all 300ms;
    }

    .card-image {
        border-radius: 8px;
    }
    .card-image img {
        max-height: 275px;
        border-radius: 8px;
        position: relative;
    }
    .card-image-holo::after {
        position: absolute;
        top: 10px;
        right: 10px;
        content: "✨";
        font-size: 3rem;
    }
    /* .card-image:hover {
        transform: scale(1) !important;
    } */

    .flip-card {
        height: 275px;
        width: 200px;
        perspective: 1500px;
    }

    .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
        transform: rotateY(var(--rotateY));
    }

    /* .flip-card:hover .flip-card-inner {
        transform: rotateY(180deg);
    } */

    .flip-card-front, .flip-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .flip-card-back {
        transform: rotateY(180deg);
    }

    .btn-try-another {
        /* display */
        position: relative;
        display: flex;
        flex-direction: row-reverse;
        align-items: end;

        /* font */
        font-size: 1.5rem;
        font-family: "Alegreya Sans","Roboto",sans-serif;
        font-weight: 700;
        font-style: italic;
        color: white;
        
        /* margins */
        margin: 4rem 0rem 2rem 0rem;
        padding: 0.25rem 4rem 0.25rem 1rem;

        /* design */
        border-radius: 1rem;
        background-color: var(--colour-red);
        outline: 2px solid var(--colour-accent);
        filter: drop-shadow(0 0 0.25rem #370101);

        cursor: pointer;

        transition: all 150ms;
    }
    .btn-try-another img {
        /* max-height: 5rem; */
        object-fit: contain;
        height: 4rem;

        position: absolute;
        bottom: 0;
        right: 0;

        transition: all 150ms;

        filter: drop-shadow(0 0 0.25rem #370101);
    }
    .btn-try-another:hover {
        /* transform: scale(1.1); */
        font-size: 1.7rem;
        filter: drop-shadow(0 0 0.5rem #370101);
    }
    .btn-try-another:hover img {
        transform: scale(1.25);
        right: -1rem;
        filter: drop-shadow(0 0 0.5rem #370101);
    }
</style>
