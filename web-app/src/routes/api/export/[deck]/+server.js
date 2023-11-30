import { pb } from '$lib/pocketbase.js';
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

const collection = "decks"

export async function GET({ url, params }) {
    // console.log(url)
    // console.log(params)

    const id = params.deck

    // Load Deck data if a deck exists with the given ID
    let deck = null
    try {
        const result = await pb.collection("decks").getOne(params.deck, {
            expand: 'challenger, author'
        })

        deck = result

        let cards = ''
        deck.cards_json.deck.forEach(card => {
            let s = `${card.quantity} ${card.name}\n`
            cards += s
        });

        return new Response(cards, {status: 200})
    }
    // If no deck was found with the given ID, redirect to deck explorer
    catch (err) {
        throw error(400, err)  
    }
}