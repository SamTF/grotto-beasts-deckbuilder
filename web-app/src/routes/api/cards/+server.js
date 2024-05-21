// Fetches ALL the Grotto Beasts cards
// Including alternate versions

import { pb } from '$lib/pocketbase.js';
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import versions from '$lib/versions.js'


const collection = versions[0].collection
const collection_v2 = versions[1].collection

export async function GET({ url, params, setHeaders }) {
    // ORIGINAL CARDS
    const result = await pb.collection(collection).getList(1, 200, {
        '$autoCancel' : false,
        sort: 'number',
    })

    // set the original card's image URL directly on the object
    for (let i = 0; i < result.items.length; i++) {
        const card = result.items[i];
        card.imageURL = { 
            large: `/images/cards/digital/${card.number}.webp`,
            small: `/images/cards/digital/360/${card.number}. ${card.name}.webp` 
        }
    }

    // PATCHED TTS CARDS
    const result_v2 = await pb.collection(collection_v2).getList(1, 200, {
        '$autoCancel' : false
    })

    // set the patched card image's URL via pocketbase
    for (let i = 0; i < result_v2.items.length; i++) {
        const patched = result_v2.items[i];
        patched.imageURL = {
            large: `https://pb.grotto.builders/api/files/${patched.collectionId}/${patched.id}/${patched.image}`,
            small: `https://pb.grotto.builders/api/files/${patched.collectionId}/${patched.id}/${patched.image}`
        }
    }

    // Copy missing cards from original list (these are cards without an alternate version)
    for (let i = 0; i < result.items.length; i++) {
        const original = result.items[i]
        if (!result_v2.items.some(x => x.number == original.number)) {
            result_v2.items.push(original)
        }
    }
    // Sort patched cards by ID after adding missing cards
    result_v2.items.sort((a, b) => a.number > b.number)

    // Cache the results for 10 mins
    setHeaders({
        "cache-control": "max-age=600",
    })

    return json({ original: structuredClone(result.items), patched: structuredClone(result_v2).items })
}