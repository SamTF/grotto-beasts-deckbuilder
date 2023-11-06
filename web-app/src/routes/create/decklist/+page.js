// Fetch all the Grotto Beast cards

import { pb } from '$lib/pocketbase.js'
import { json, error, redirect } from "@sveltejs/kit";

export async function load({ url, params}) {
    let searchTags = url.searchParams.get('tags')

    // Format search tags appropriately, if any were given
    if (searchTags !== '' && searchTags !== null) {
        searchTags = searchTags.split(',').map(x => x.trim().toLowerCase());
    }
    
    // Fetch local API data
    const res = await fetch(`${url.origin}/api/cards/`)
    let cards = await res.json()

    // Filter Data by Tags (if any were given)
    if (searchTags?.length >= 1) {
        cards = cards.filter(card => {
            const tags = card.tags.split(',').map(x => x.toLowerCase().trim())
            
            if (card.tags == '') return false
            return tags.some( tag => searchTags.includes(tag) )
        })
    }
    
    // Return cards
    return { cards: cards.original, patched: cards.patched }
}