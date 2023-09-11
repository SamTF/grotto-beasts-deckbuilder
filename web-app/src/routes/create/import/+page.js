// Fetch all the Grotto Beast cards

import { pb } from '$lib/pocketbase.js'
import { json, error, redirect } from "@sveltejs/kit";

export async function load({ url, params}) {
    // Fetch local API data
    const res = await fetch(`${url.origin}/api/cards/`)
    let cards = await res.json()

    
    // Return cards
    return { cards: cards }
}