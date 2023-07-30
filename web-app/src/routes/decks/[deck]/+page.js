import { pb } from '$lib/pocketbase.js'
import { json, error, redirect } from "@sveltejs/kit";

export async function load({ url, params}) {
    console.log(`URL SLUG : ${params.deck}`)

    // Load Deck data if a deck exists with the given ID
    let deck = null
    try {
        const result = await pb.collection("decks").getOne(params.deck, {
            expand: 'challenger, author'
        })

        deck = result
    }
    // If no deck was found with the given ID, redirect to deck explorer
    catch (error) {
        throw redirect(303, '/decks')        
    }

    // --- EXPAND CARD INFO --------
    // get all cards
    const allCards = await pb.collection('cards').getFullList({
        sort: 'number',
    });

    // array of all card IDs in deck
    const deckCardIds = Array.from(deck.cards_json.deck, x => x.id)

    // filter all cards to only cards present in deck, and add their quantity
    let fullCards = await allCards.filter(x => deckCardIds.includes(x.number))
    for (let i = 0; i < fullCards.length; i++) {
        const element = fullCards[i];
        element.quantity = deck.cards_json.deck[i].quantity
        
    }
    
    // Return simplified deck and full expanded cards
    return { deck: deck, fullCards: fullCards }
}