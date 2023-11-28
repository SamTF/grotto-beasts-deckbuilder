import { pb } from '$lib/pocketbase.js'
import { json, error, redirect } from "@sveltejs/kit";

export async function load({ url, params}) {
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
    // get all cards from local API data
    const res = await fetch(`${url.origin}/api/cards/`)
    let allCards = await res.json()

    // array of all card IDs in deck
    const deckCardIds = Array.from(deck.cards_json.deck, x => x.id)

    // Copy missing cards from original list (these are cards without an alternate version)
    for (let i = 0; i < allCards.original.length; i++) {
        const original = allCards.original[i]
        if (!allCards.patched.some(x => x.number == original.number)) {
            allCards.patched.push(original)
        }
    }
    // Sort patched cards by ID after adding missing cards
    allCards.patched.sort((a, b) => a.number > b.number)

    // filter all cards to only cards present in deck, and add their quantity
    // fetch correct version of cards depending on deck game version
    let fullCards = deck.version == 'original' ? 
        allCards.original.filter(x => deckCardIds.includes(x.number))
        : allCards.patched.filter(x => deckCardIds.includes(x.number))

    for (let i = 0; i < fullCards.length; i++) {
        const element = fullCards[i];
        element.quantity = deck.cards_json.deck[i].quantity

        // Set the card's image URL directly - depending if it's original or digital
        // original card
        // if (element.collectionName == "cards") {
        //     element.imageURL = `/images/cards/${element.number}. ${element.name}.webp`
        // }
        // // digital TTS card
        // else {
        //     element.imageURL = `https://pb.grotto.builders/api/files/${element.collectionId}/${element.id}/${element.image}`
        // }
    }
    
    // Return simplified deck and full expanded cards
    return { deck: deck, fullCards: fullCards }
}