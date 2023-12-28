<!-- JS -->
<script>
    // Imports
    import Meta from '$components/Meta/Meta.svelte'
    import DeckStatsBar from "$components/Deck/DeckStatsBar.svelte"
    import BtnToggle from '$components/BtnToggle.svelte'
    import Icon from '$components/UI/Icon.svelte'
    import PopupPackOdds from '$components/UI/Popups/PopupPackOdds.svelte'
    import { openModal, closeModal } from 'svelte-modals'
    import { decklistAdvance } from '$lib/stores/decklist'
    import svelteTilt from 'vanilla-card-pack-svelte'
    import { slide, fade, fly } from "svelte/transition"
    import toast from 'svelte-french-toast'
    import { goto } from '$app/navigation'

    // Constants
    const packCost = 8.50 //USD
    const salesTax = 0.05 // 5% is the average sales tax in the US

    // Vars
    let showPack = true
    let fadePack = false
    let cardsFlipped = 0
    let deck = []

    // Reactive values
    $: pulledCards = []
    $: packsOpened = deck.length / 10
    $: moneySpent = (packCost * packsOpened)
    $: cardsCollected = showPack ? deck.length : Math.max(deck.length - 10 + cardsFlipped, 0)

    const getShippingCost = () => {
        if (packsOpened == 0)
            return 0.00

        if (packsOpened <= 4)
            return 4.99

        return 4.99 + (packsOpened - 4)
    }

    const getTax = () => (moneySpent * 0.05).toFixed(2)

    const getTotalCost = () => ((moneySpent * 1.05) + getShippingCost()).toFixed(2)

    // SHIPPING
    // 1x 4-pack = 4.99
    // 2x 4-pack = 8.98
    // 3x 4-pack = 12.97
    // 4x 4-pack = 16.96
    // THEREFORE:
    // 1st item = 4.99
    // every additional item = +3.99
    // round shipping to nearest 4-pack because nobody buys individual packs
    // ORRR maybe shipping 1 pack cost 1 buck


    const pullCards = async () => {
        // fade out pack image
        fadePack = true

        // funny notification
        toast.success(`-$${packCost.toFixed(2)}... 💸`, { style: 'font-weight: 700; background-color: var(--colour-green-light);' })

        // fetch data
        const res = await fetch('/api/pack')
        const data = await res.json()

        // update current pack
        pulledCards = data

        // update total cards pulled
        deck = [...deck, ...pulledCards]

        // hide the pack image
        showPack = false
    }

    const flipCard = (event) => {
        // console.log(event.target.parentElement.parentElement)
        // rotate the card via CSS property
        event.target.parentElement.parentElement.style.setProperty('--rotateY', '180deg')
        cardsFlipped++
    }

    let flip = false;

    const showHelpPopup = () => {
        openModal(PopupPackOdds)
    }

    const reset = () => {
        showPack = true
        pulledCards = []
        cardsFlipped = 0
        fadePack = false
    }

    const helpMoney = () => {
        toast.success(
            `${deck.length / 10} Packs:....$${moneySpent.toFixed(2)}
            Sales Tax:.\t$${getTax()}
            Shipping:.\t$${getShippingCost()}
            
            Total = \t$${getTotalCost()}`,
            { 
                duration: 4000,
                icon: '💸',
                style: 'font-weight: 700; background-color: var(--colour-green-light);'
            }
        )
    }

    function simplifyCards(cards) {
        // Create an object to keep track of unique cards and their quantities
        const uniqueCards = {};

        // Iterate over the array of cards
        cards.forEach(card => {
            const { name, number, id } = card;
            const cardKey = `${name}_${number}_${id}`;

            // If the card is not already in the uniqueCards object, add it
            if (!uniqueCards[cardKey]) {
            uniqueCards[cardKey] = { ...card, quantity: 0 };
            }

            // Increment the quantity for the current card
            uniqueCards[cardKey].quantity += 1;
        });

        // Convert the unique cards object back to an array
        const simplifiedArray = Object.values(uniqueCards);

        return simplifiedArray;
    }

    const exportCards = () => {
        const fullCards = simplifyCards(deck)
        decklistAdvance.set(deck)
        localStorage.setItem("decklist", JSON.stringify($decklistAdvance))

        goto('/create/deck')
    }
    
</script>

<!-- METADATA -->
<Meta title='Pack Opening' />

<!-- HTML -->
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
                    <button class="highlight-bubble" on:click={showHelpPopup}>
                        <span>Show Chances</span>
                        <img src="/images/emotes/meowdy.png" alt="original" height="16">
                    </button>
                </div>
            </div>
    
            <!-- Header Buttons -->
            <div class="header-btns">
                <button class="btn" title="How many cards you have collected">
                    <Icon name='card' class='header-btn-icon' strokeWidth='0' solid={true}/>
                    <span>{cardsCollected}</span>
                </button>

                <button class="btn" title="How much money you've spent on your gambling addiction" on:click={helpMoney}>
                    <Icon name='money' class='header-btn-icon' strokeWidth='0' solid={true}/>
                    <span>${moneySpent.toFixed(2)}</span>
                </button>

                <button class="btn" title="Save cards pulled as a deck list" on:click={exportCards}>
                    <Icon name='export-file' class='header-btn-icon' strokeWidth='0' solid={true}/>
                    <span style="font-size: 0.8rem;">Export</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Divider -->
    <div class="header-divider"></div>

    <!-- Main Page Content -->
    <div class="pack-opening-container center">

        <!-- Card Pack -->
        {#if showPack}
            <div
                class="card-pack"
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
                <div
                    class="flip-card"
                    on:click={flipCard}
                    in:fade={{ duration: 500 }}
                    use:svelteTilt={{
                        reverse: true,
                        glare: false,
                        "max-glare": 0.5 
                    }}
                >
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
    .pack-opening-container {
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

    .card-pack img {
        max-height: 400px;
        filter: drop-shadow(0 0 0.33rem #370101);
        transition: all 200ms;
        opacity: 1.0;
    }
    .card-pack img:hover {
        transform: scale(1.1);
        cursor: pointer;
        filter: drop-shadow(0 1rem 1rem #370101);
    }
    .card-pack img.fade {
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

    /* Header Buttons */
    .btn span {
        font-size: 2rem;
    }

    /* MOBILE LAYOUT */
    @media (max-width: 940px) {
        .pulled-cards-container {
            width: 80dvw;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }

        .flip-card {
            height: 200px;
            width: 142px;
        }

        .card-image img {
            max-height: 200px;
        }
    }
</style>
