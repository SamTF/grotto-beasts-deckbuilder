// Fetches ALL the Grotto Beasts cards

import { pb } from '$lib/pocketbase.js';
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

const collection = "cards"

export async function GET({ url, params }) {
    const result = await pb.collection(collection).getList(1, 200, {
        '$autoCancel' : false
    })

    return json(result.items)
}