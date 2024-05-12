<!-- JS -->
<script>
    // Imports
    import Meta from '$components/Meta/Meta.svelte'
    import PackCard from '$components/Cards/PackCard.svelte'
    import DeckStatsBar from "$components/Deck/DeckStatsBar.svelte"
    import BtnToggle from '$components/BtnToggle.svelte'
    import Icon from '$components/UI/Icon.svelte'
    import PopupPackOdds from '$components/UI/Popups/PopupPackOdds.svelte'
    import { openModal, closeModal } from 'svelte-modals'
    import { decklistAdvance } from '$lib/stores/decklist'
    import svelteTilt from 'vanilla-tilt-svelte'
    import { slide, fade, fly } from "svelte/transition"
    import toast from 'svelte-french-toast'
    import { goto } from '$app/navigation'

    // Constants
    const packCost = 8.50 //USD
    const salesTax = 0.05 // 5% is the average sales tax in the US
    const cardsPerPack = 10

    // Vars
    let showPack = true
    let fadePack = false
    let cardsFlipped = 0
    let deck = []
    let flippedList = Array(cardsPerPack).fill(false) // Initialize the array with false values

    // Reactive values
    $: pulledCards = []
    $: totalCards = deck.reduce((total, item) => total + item.quantity, 0)
    $: packsOpened = totalCards / 10
    $: moneySpent = (packCost * packsOpened)
    $: cardsCollected = showPack ? totalCards : Math.max(totalCards - 10 + cardsFlipped, 0)

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

    const showHelpPopup = () => {
        openModal(PopupPackOdds)
    }

    const reset = () => {
        showPack = true
        pulledCards = []
        cardsFlipped = 0
        fadePack = false
        flippedList = Array(cardsPerPack).fill(false)

        deck = simplifyCards(deck)
    }

    const helpMoney = () => {
        toast.success(
            `${packsOpened} Packs:....$${moneySpent.toFixed(2)}
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
        // array to keep track of unique cards and their quantities
        let uniqueCardsList = []
        let uniqueCardIds = []

        cards.forEach(card => {
            // check if card is in array
            if (uniqueCardIds.includes(card.number)) {
                // if it is, increment its quantity
                uniqueCardsList.find(i => i.number == card.number).quantity += card.quantity
            }

            // if not, add it
            else {
                uniqueCardsList.push(card)
                uniqueCardIds.push(card.number)
            }
        })

        return uniqueCardsList
    }

    const exportCards = () => {
        const fullCards = simplifyCards(deck)
        decklistAdvance.set(fullCards)
        localStorage.setItem("decklist", JSON.stringify($decklistAdvance))

        goto('/create/deck')
    }

    const flipCard = (index) => {
        // check if card is already flipped
        if (flippedList[index]) {
            return
        }

        // Flip the card
        flippedList[index] = true
        cardsFlipped++
	}
    
</script>

<!-- METADATA -->
<Meta title='Pack Opening' description="Open Grotto Beasts! packs to your heart's content! For free!! (cards not included)" />

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
                <img src="/images/pack_front.webp" alt="grotto beasts card pack" class:fade={fadePack}>
            </div>
        {/if}
        
        <!-- Pulled Cards -->
        <div class="pulled-cards-container">
            {#each pulledCards as card, index}
                <PackCard {card} bind:flipped={flippedList[index]} on:click={() => flipCard(index)} />
            {/each}
        </div>

        <!-- Open Another -->
        {#if cardsFlipped >= 10}
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
    }
</style>
