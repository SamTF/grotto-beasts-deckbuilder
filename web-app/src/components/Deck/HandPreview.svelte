<!-- Shows a preview of what your starting hand could be with this deck -->

<!-- JS -->
<script>
    // Props
    export let cards = []

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

    // Gets a random card from the deck
    const randomCard = (deck) => {
        // items[items.length * Math.random() | 0]
        const i = Math.floor( Math.random() * (deck.length - 1));
        return 1
    }

    // Draw 6 random cards from the deck to create the starting hand
    const startingHand = (cards) => {
        let deck = [...cards]  // copy the value, otherwise JS passes the variable as a reference... smh my head
        let hand = []

        for (let i = 0; i < startingCardsInHand; i++) {
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

    // Add a new card to hand
    const drawCard = () => {
        // check if user hasn't exceeded maximum
        if (hand.length >+ maxCardsInHand) return
        
        // draw card and add to hand
        let card = workingDeck[workingDeck.length * Math.random() | 0]
        hand = [...hand, card]

        // remove that card from deck
        const index = workingDeck.findIndex(x => x.id === card.id)
        if (index !== -1) {
            workingDeck.splice(index, 1);
        }
    }

    // Constants
    const startingCardsInHand = 6
    const maxCardsInHand = 15
    const deck = populateDeck(cards)

    // Variables
    let workingDeck = [...deck]
    let hand = startingHand(deck)    
    


</script>

<!-- HTML -->
<div class="starting-hand-container">
    <h2>Starting Hand</h2>

    <div class="starting-hand">
        {#each hand as card}
            <div class="card-image">
                <a href={`/card/${card.id}`} target="_blank">
                    <img src={`/images/cards/digital/360/${card.id}. ${card.name}.webp`} alt={card.name}>
                </a>
            </div> 
        {/each}
    </div>

    <div class="buttons">
        <button on:click={() => hand = startingHand(deck)}>Deal another hand</button>
        <button on:click={() => drawCard(deck)}>Draw a card</button>
    </div>
</div>