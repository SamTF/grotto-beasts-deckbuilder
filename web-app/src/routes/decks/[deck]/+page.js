import { pb } from '$lib/pocketbase.js'
import { json, error, redirect } from "@sveltejs/kit";

export async function load({ url, params}) {
    console.log(`URL SLUG : ${params.deck}`)

    // Load Deck data if a deck exists with the given ID
    try {
        const result = await pb.collection("decks").getOne(params.deck, {
            expand: 'challenger, author'
        })

        return { deck: result }
    }
    
    // if no deck was found with the given ID, redirect to deck explorer
    catch (error) {
        throw redirect(303, '/decks')
    }
}