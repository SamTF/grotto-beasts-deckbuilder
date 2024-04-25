<!-- JS -->
<script>
    // Imports
    import DeckHeader from "$components/Deck/DeckHeader.svelte"
    import { CardTypes, countCardType } from "$lib/cardUtils"
    import { delay } from "$lib/utils"
    import { fade } from "svelte/transition"
    import toast from 'svelte-french-toast'

    // drag and drop
    import {flip} from "svelte/animate"
    import {dndzone} from "svelte-dnd-action"
    
    // Props
    export let data

    // Create a deck from the given cards and their respective quantity
    const populateDeck = (cards) => {
        let deck = []

        // loop over all cards and append them to the deck according to their quantity
        cards.forEach(c => {
            // ignore challengers
            if (c.type == "Challenger") {
                return
            }

            // append cards to deck
            for (let i = 0; i < c.quantity; i++) {
                deck.push(c)
            }
        })

        // return the populated deck
        return deck
    }

    // Draw 8 random cards from the deck to create the starting hand
    const startingHand = (cards) => {
        let deck = [...cards]  // copy the value, otherwise JS passes the variable as a reference... smh my head
        let hand = []

        for (let i = 0; i < 8; i++) {
            // let card = deck[deck.length * Math.random() | 0]
            const i = Math.floor( Math.random() * (deck.length - 1));
            let card = deck[i]

            // add card to hand
            hand.push(card)

            // remove card from deck
            deck.splice(i, 1)
        }

        // save the remaining cards in the deck to the "working deck"
        workingDeck = deck

        // return cards in hand
        return hand
    }

    // Selects or Deselects a clicked card
    const selectCard = (i) => {
        
        // Remove selected card from selection
        if (selectedCards.includes(i)) {
            selectedCards = selectedCards.filter(x => x != i)
        }

        // Add card to selection if not at maximum
        else {
            if (selectedCards.length < maxSelectedCards) {
                selectedCards.push(i)
            }
        }

        selectedCards.sort()
        selectedCards = [...selectedCards]
        console.log(selectedCards)
        console.log(selectedCards.length)
    }

    // Remove selected cards from hand
    const discardSelection = async() => {
        // Check that maximum discards are not exceeded
        if (discards >= maxDiscards) {
            toast.error("You've already used all your discards! x(")
            return
        }
        const numOfCards = selectedCards.length
        const cards = document.querySelectorAll('.playing-card');     

        // Instead of removing the card, make it invisible
        for (const i of selectedCards) {
            const cardToRemove = cards[i]
            // cardToRemove.style.visibility = 'hidden';
            cardToRemove.classList.add('fade-out')
        }

        // Wait 1 second
        await delay(500)

        // remove the selected cards from hand by index
        for (const i of selectedCards.reverse()) {
            console.log(i)
            hand.splice(i, 1);
        }
        
        // remove the fade out class
        for (const card of cards) {
            card.classList.remove('fade-out')
        }

        // update reactive vars
        hand = hand
        selectedCards = []
        discards++

        // Wait 1 second
        await delay(500)

        // Draw new cards to replace discarded ones
        for (let i = 0; i < numOfCards; i++) {
            drawCard()
            await delay(100)
        }

        hand = hand
        return
        
        // remove the selected cards from hand by index
        for (const i of selectedCards.reverse()) {
            console.log(i)
            hand.splice(i, 1);
        }

        // update reactive vars
        hand = hand
        selectedCards = []

        console.log(hand)

        // Wait 1 second
        await delay(500)

        for (let i = 0; i < numOfCards; i++) {
            drawCard()
            await delay(100)
        }

        hand = hand
    }

    // Add a new card to hand
    const drawCard = () => {
        // check if user hasn't exceeded maximum
        if (hand.length >+ maxCardsInHand) return
        
        // draw random card and add it to hand
        let card = workingDeck[workingDeck.length * Math.random() | 0]
        hand = [...hand, card]

        // remove that card from deck
        const index = workingDeck.findIndex(x => x.number === card.number)
        if (index !== -1) {
            workingDeck.splice(index, 1);
        }

        // update reactive values
        workingDeck = workingDeck
    }

    const playCards = async() => {
        // check that the current play is valid
        if (playedCards.length + selectedCards.length > maxPlayedCards) {
            toast.error("You can only play a maximum of 5 cards per round!")
            return
        }
        else if (selectedCards.length < 1) {
            toast.error("You must play at least 1 card, silly :)")
            return
        }

        // get info of selected cards
        let cards = hand.filter((card, i) => selectedCards.includes(i))
        cards = cards.map(card => ({...card, id: `${card.id}_${handsPlayed}_${discards}_${Math.random() * 100}`}))
        console.log(cards)

        // add them to the play area
        playedCards = [...playedCards, ...cards]
        console.log(playedCards)

        // Instead of removing the card, make it invisible
        const playingCards = document.querySelectorAll('.playing-card'); 
        for (const i of selectedCards) {
            const cardToRemove = playingCards[i]
            // cardToRemove.style.visibility = 'hidden';
            cardToRemove.classList.add('fade-out')
        }

        // Wait 1 second
        await delay(500)

        // remove the selected cards from hand by index
        for (const i of selectedCards.reverse()) {
            console.log(i)
            hand.splice(i, 1);
        }
        // remove the fade out class
        for (const card of playingCards) {
            card.classList.remove('fade-out')
        }

        // update reactive vars
        selectedCards = []
        hand = hand
        handsPlayed++
    }

    // Score Cards!
    const scoreCards = () => {
        let totalScore = 0
        let totalMult = 0

        playedCards.forEach((card) => {
            if (card.type == "Beast") {
                // card base stats
                let chips = card.cost
                let mult = card.power

                // multiply chips
                let multedChips = totalMult > 0 ? totalMult * chips : chips

                // increment score and mult
                totalScore += multedChips
                totalMult += mult

                console.log(`${card.name} -> +${chips} X${totalMult-mult}\nTotal Score: ${totalScore}\nTotal Mult: ${totalMult}`)
                toast.success(
                    `${card.name} -> +${chips} X${totalMult}\nTotal Score: ${totalScore}\nTotal Mult: ${totalMult}`,
                    {
                        icon: '🐱',
                        duration: 6000
                    }
                )
            }
        })
    }

    // CONSTANTS
    const deck = populateDeck(data.fullCards)
    const maxCardsInHand = 8
    const maxSelectedCards = 5
    const maxDiscards = 3
    const maxHands = 3
    const maxPlayedCards = 5

    // Variables
    let workingDeck = [...deck]
    let hand = startingHand(deck)
    let selectedCards = []
    let playedCards = []
    let discards = 0
    let handsPlayed = 0

    // SVELTE-DND-ACTION
    // let playedCards = []
    // let items = [
    //     {id: 1, name: "item1"},
    //     {id: 2, name: "item2"},
    //     {id: 3, name: "item3"},
    //     {id: 4, name: "item4"}
    // ];

    const flipDurationMs = 300;

    function handler(e) {
        playedCards = e.detail.items;
        console.log(playedCards)
    }

    // test
    $: console.log(hand)
    $: console.log(selectedCards)
</script>

<!-- HTML -->
<DeckHeader name={data.deck.name} author={data.deck.expand.author.username} tags={data.deck.tags} authorID={data.deck.expand.author.id} fullCards={data.fullCards} deck={data.deck}/>

<div class="page-container center">
<div class="game-wrapper">

    <!-- UI Sidebar -->
    <div class="ui-sidebar">
        <h1>SIDEBAR</h1>

    </div>

    <!-- Where the gaming takes place -->
    <div class="play-area" oncontextmenu="return false" on:contextmenu={() => selectedCards = []}>
        <!-- TEAM -->
        <div class="player-team-container">
            <!-- Played Cards -->
            <div class="player-team">
            <div
                class="player-team-grid"
                use:dndzone="{{items: playedCards, flipDurationMs, dropTargetStyle: {outline: 'rgba(0, 0, 0, 0) solid 2px'} }}"
                on:consider="{handler}"
                on:finalize="{handler}"
                
            >
                {#each playedCards as item(item.id)}
                    <div class="card-image-small" animate:flip={{duration:flipDurationMs}}>
                        <!-- <img src="/images/cards/back.webp" alt="deck of cards"> -->
                        <img src={item.imageURL.small} alt="deck of cards">
                    </div>
                {/each}
            </div>
            </div>
        </div>
        
        <!-- The Players Hand & Their Deck -->
        <div class="hand-and-deck">
            <!-- The Player's Hand AND Buttons-->
            <div class="player-hand-and-btns">
                <!-- {#key hand} -->
                    <div class="hand-container starting-hand">
                        {#each hand as card, i}
                        <div class="card-image-small playing-card" in:fade>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <img
                            src={`/images/cards/360/${card.number}. ${card.name}.webp`}
                            alt={card.name}
                            title={i}
                            on:click={() => selectCard(i)}
                            class:selected = {selectedCards.includes(i)}
                            >
                        </div>
                        {/each}
                    </div>
                <!-- {/key} -->

                <!-- Cards in hand -->
                <div class="cards-in-hand center">
                    <span>{hand.length} / 8</span>
                </div>

                <!-- The Play & Discard buttons -->
                <div class="hand-btns-container">
                    <div class="hand-btns">
                        <!-- Add Cards to play area -->
                        <button
                            class="play-btn"
                            on:click={playCards}
                            class:disabled={selectedCards < 1 || playedCards.length >= maxPlayedCards}
                        >Play</button>

                        <!-- Submit your play! -->
                        <button
                            class="play-btn"
                            on:click={scoreCards}
                            class:disabled={playedCards.length < 1}
                        >Score!</button>

                        <!-- Discard X cards and draw X cards from the deck -->
                        <button
                            class="play-btn"
                            on:click={discardSelection}
                            class:disabled={discards >= maxDiscards}
                        >Discard</button>
                    </div>
                </div>
            </div>
            
            <!-- The Player's Deck -->
            <div class="blackjack-deck-container">
                <div class="card-image-small">
                    <img src="/images/cards/back.webp" alt="deck of cards">
                </div>

                <div class="cards-in-hand">
                    <span>{workingDeck.length} / 40</span>
                </div>
            </div>
        </div>

        
    </div>
</div>
</div>

<span class="fade-out"></span>


<!-- CSS -->
<style>
    .game-wrapper {
        display: grid;
        grid-template-columns: 1fr 6fr;
    }

    .play-area {
        width: 100%;
        display: grid;
        place-items: center;
    }
    
    .hand-and-deck {
        display: grid;
        grid-template-columns: 8fr 1fr;
        align-content: end;

        /* outline: 4px solid green;
        outline-style: dashed; */
        width: 95%;
        /* height: 50rem; */
    }

    .player-hand-and-btns {
        /* display: grid;
        place-items: center;
        gap: 0.5rem; */
        /* background-color: white; */
        display: grid;
        place-items: center;
    }

    .hand-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center !important;
        align-content: center;

        /* height: 15rem; */
        background-color: rgba(255, 255, 255, 0.375);
        width: 90%;
        border-radius: 1rem;
        padding: 8rem 0rem;
        margin-bottom: 0.5rem !important;
    }

    .hand-btns-container {
        display: grid;
        place-items: center;

        /* background-color: blueviolet; */
    }

    .hand-btns {
        /* background-color: aqua; */
        display: flex;
        justify-content: space-evenly;
        flex-direction: row;
        /* gap: 2rem; */

        width: 50rem;
    }

    .hand-btns button {
        /* size */
        width: 10rem;
        padding: 0.75rem 1.5rem;

        /* design */
        background-color: var(--colour-accent);
        outline: 4px solid var(--colour-dark);
        border-radius: 8px;

        /* font */
        font-family: var(--font-family);
        font-weight: bold;
        font-size: 2rem;
        color: white;

        /* animations */
        cursor: pointer;
        transition: all 200ms;
    }

    .hand-btns button:hover {
        transform: scale(1.25);
        filter: invert();
    }

    .blackjack-deck-container {
        display: grid;
        place-items: center;

        height: 18rem;
        background-color: rgba(255, 255, 255, 0.375);
        border-radius: 1rem;
        padding: 0 2rem;
    }

    .card-image-small {
        transition: transform 0.2s ease-in-out;
        opacity: 1;
        flex: 0 0 auto;
    }

    .card-image-small img {
        max-height: 200px;
        /* transition: all 200ms; */
    }

    .selected {
        transition: all 200ms;
        outline: 2px solid gold;
        transform: translateY(-5rem);
        z-index: 10;
    }

    .cards-in-hand {
        margin-bottom: 0.5rem;

        font-size: 1.5rem;
        font-weight: bold;
    }

    .fade-out {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    .player-team-container {
        /* outline: 4px solid yellow;
        outline-style: dashed; */

        height: 24rem;
        width: 95%;

        display: grid;
        grid-template-columns: 8fr 1fr;
        place-items: center;
    }

    .player-team {
        display: grid;
        place-items: center;
        
        width: 60rem;
        height: 16rem;
        background-color: rgba(255, 255, 255, 0.375);
        border-radius: 1rem;
    }

    .player-team-grid {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }

    .ui-sidebar {
        height: 100%;
        width: 100%;

        background-color: blueviolet;
    }
</style>