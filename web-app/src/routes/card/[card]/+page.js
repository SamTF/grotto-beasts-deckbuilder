import { pb } from '$lib/pocketbase.js'
import { json, error, redirect } from "@sveltejs/kit";

export async function load({ url, params}) {
    // the filter by which to find the desired card
    let filter = `name ~ "${params.card}"`
    
    // filter by card number instead of name if a number was given in the URL parameter
    const usingId = Number.isInteger(parseInt(Number(params.card)))
    if (usingId) {
        const id = parseInt(Number(params.card))
        filter = `number = ${id}`
    }

    const results = await pb.collection("cards").getList(1, 1, {
        filter: filter
    })

    // if no matching card was found, redirect to glueman
    if (results.items.length < 1) {
        throw redirect(303, '/card/glueman')
    }

    // if a card was found successfully
    const card = results.items[0]
    return { card }
}