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

    // Expand card info
    let fullCards = []

    try {
        for (let i = 0; i < deck.cards_json.deck.length; i++) {
            const element = deck.cards_json.deck[i];
            const id = element.id;
            const res = await fetch(`${url.origin}/api/card/${id}`)
            const item = await res.json()
            
            // add card quantity field
            item.quantity = element.quantity
            fullCards.push(item)
        } 
    } catch (error) {
        console.error(error)
        throw error(error)
    }
       

    // Return simplified deck and full expanded cards
    return { deck: deck, fullCards: fullCards }
}