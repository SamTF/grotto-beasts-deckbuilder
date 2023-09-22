// Generates a decklist (in my own format) from a TTS deck code

import { cardList } from '$lib/cardList'
import { editions, qtyValues, valueToQty, qtyToValue } from '$lib/deckcodes'
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function GET({ url, params }) {
    // console.log(url)
    // console.log(params)

    const deckCode = params.deck_code

    // Check if deck code begins with edition code
    if (editions.some(substr => deckCode.startsWith(substr))) {
        const cardsRaw = [...deckCode.matchAll(/(\d+)(i|j|l|\(\d+\))/g)];
        console.log(cardsRaw)

        let id = 0
        let deck = cardsRaw.map(card => {
            id += parseInt(card[1])
            let quantity = valueToQty[card[2]] ?? parseInt(card[2].substring(1, card[2].length - 1));
            
            // Code validation
            if (quantity > 60) {
                throw error(400, `Deck code is invalid because a card cannot have more than 60 copies: [${card[0]}]`) 
            }
            if (id > 200 || id < 0) {
                throw error(400, `Card ID must be a positive integer between 1 and 200: [${card[0]}]`) 
            }

            return { id, quantity }
        })

        // return new Response(deck, {status: 200})
        // return (json(deck))

        console.log(cardList)

        let formattedDeck = deck.map(item => {
            const id = item.id
            const quantity = item.quantity
            const card = cardList.find(x => x.number == id)
            console.log(card)

            return { id, quantity, name: card.name, type: card.type }
        })

        return (json(formattedDeck))
    }
    // If not, return error
    else {
        throw error(400, 'Deck code must begin with a set code (GB! or GBv)') 
    }
}