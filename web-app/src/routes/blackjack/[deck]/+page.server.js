import { pb } from '$lib/pocketbase.js'
import { json, error, redirect } from "@sveltejs/kit"
import { populateDeck } from '$lib/blackjack/utils'

export async function load({ url, params, setHeaders}) {
    console.log(url.origin)
    console.log(params)

    const deckID = params.deck || 'donfcktbwm5488s'

    // Load Deck data if a deck exists with the given ID
    let deck = null
    try {
        const result = await pb.collection("decks").getOne(deckID, {
            expand: 'challenger, author'
        })

        deck = result
    }
    // If no deck was found with the given ID, redirect to deck explorer
    catch (error) {
        throw redirect(303, '/decks')        
    }

    // --- EXPAND CARD INFO --------
    // get all cards from local API data
    const res = await fetch(`${url.origin}/api/cards/`)
    // const res = await fetch(`https://grotto.builders/api/cards/`)
    let allCards = await res.json()

    // array of all card IDs in deck
    const deckCardIds = Array.from(deck.cards_json.deck, x => x.id)

    // filter all cards to only cards present in the deck
    let fullCards = allCards.original.filter(x => deckCardIds.includes(x.number))

    // Set correct quantity
    for (let i = 0; i < fullCards.length; i++) {
        const element = fullCards[i];
        element.quantity = deck.cards_json.deck[i].quantity
    }

    // List of all Challengers
    const challengers = allCards.original.filter(x => x.type == 'Challenger')

    // Populate the deck!
    const populatedDeck = populateDeck(fullCards)

    // Return simplified deck and full expanded cards
    // return { deck: deck, fullCards: fullCards, challengers: challengers }

    // Return serialized data
    return { deck: structuredClone(deck), fullCards: structuredClone(fullCards), challengers: structuredClone(challengers), populatedDeck: structuredClone(populatedDeck) }
}