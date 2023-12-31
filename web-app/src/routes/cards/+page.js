// Fetch all the Grotto Beast cards

import { pb } from '$lib/pocketbase.js'
import { json, error, redirect } from "@sveltejs/kit";

export async function load({ url, params}) {
    // look for search params
    console.log(url.searchParams)

    let searchTags = url.searchParams.get('tags')

    // Format search tags appropriately, if any were given
    if (searchTags !== '' && searchTags !== null) {
        searchTags = searchTags.split(',').map(x => x.trim().toLowerCase());
    }
    
    // Fetch local API data
    const res = await fetch(`${url.origin}/api/cards/`)
    let cards = await res.json()

    // Filter Data by Tags (if any were given)
    // if (searchTags?.length >= 1) {
    //     cards = cards.filter(card => {
    //         const tags = card.tags.split(',').map(x => x.toLowerCase().trim())
            
    //         if (card.tags == '') return false
    //         return tags.some( tag => searchTags.includes(tag) )
    //     })
    // }

    // Copy missing cards from original list (these are cards without an alternate version)
    for (let i = 0; i < cards.original.length; i++) {
        const original = cards.original[i]
        if (!cards.patched.some(x => x.number == original.number)) {
            cards.patched.push(original)
        }
    }
    // Sort patched cards by ID after adding missing cards
    cards.patched.sort((a, b) => a.number > b.number)
    
    // Return cards
    return { cards: cards.original, patched: cards.patched }
}