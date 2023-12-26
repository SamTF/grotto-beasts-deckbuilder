import { pb } from '$lib/pocketbase.js';
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

const collection = "cards"

export async function GET({ url, params }) {
    // console.log(url)
    // console.log(params)

    const id = params.card

    // filter by card number instead of name if a number was given in the URL parameter
    const usingId = Number.isInteger(parseInt(Number(params.card)))

    const result = await pb.collection(collection).getList(1,1, {
        filter: usingId ? `number = ${id}` : `name ~ "${params.card}"`,
        '$autoCancel' : false
    })

    // check
    if (result.items.length < 1) {
        throw error(400, `card [${id}] not found :c`)
    }

    const card = result.items[0]

    // Cache the results for 10 mins
    setHeaders({
        "cache-control": "max-age=600",
    })
    
    return json(card)
}