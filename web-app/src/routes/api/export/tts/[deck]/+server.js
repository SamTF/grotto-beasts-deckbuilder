// This API Call exports a deck as a TTS deck code

import { editions, qtyValues, valueToQty, qtyToValue } from '$lib/deckcodes'
import { pb } from '$lib/pocketbase.js';
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

const collection = "decks"

export async function GET({ url, params }) {
    // console.log(url)
    // console.log(params)

    const id = params.deck

    console.log(`URL SLUG : ${params.deck}`)

    // Load Deck data if a deck exists with the given ID
    let deck = null
    try {
        const result = await pb.collection("decks").getOne(params.deck, {
            expand: 'challenger, author'
        })

        deck = result

        // let cardsSorted = deck.cards_json.deck.map(x => )
        let cardsSorted = deck.cards_json.deck.sort((a, b) => (a.id > b.id) ? 1 : -1);
        console.log(cardsSorted)
        
        let deckCode = 'GBv'
        let previousID = 0
        cardsSorted.forEach(card => {
            let qty = qtyToValue(card.quantity)
            let id = card.id - previousID
            let s = `${id}${qty}`
            deckCode += s
            previousID = card.id
        })

        let cards = ''
        deck.cards_json.deck.forEach(card => {
            let s = `${card.quantity} ${card.name}\n`
            cards += s
        });

        return new Response(deckCode, {status: 200})
    }
    // If no deck was found with the given ID, redirect to deck explorer
    catch (err) {
        throw error(400, err)  
    }
}