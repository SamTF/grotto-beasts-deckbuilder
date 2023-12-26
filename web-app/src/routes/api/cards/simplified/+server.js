// Fetches ALL the Grotto Beasts cards
// Returns them in a simplified format

import { pb } from '$lib/pocketbase.js';
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

const collection = "cards"

export async function GET({ url, params }) {
    const result = await pb.collection(collection).getList(1, 200, {
        '$autoCancel' : false
    })

    const cardsSimplified = result.items.map(x => ({ number: x.number, name: x.name, type: x.type }))

    // Cache the results for 10 mins
    setHeaders({
        "cache-control": "max-age=600",
    })

    return json(cardsSimplified)
}