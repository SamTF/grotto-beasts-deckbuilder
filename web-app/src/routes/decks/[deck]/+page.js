import { pb } from '$lib/pocketbase.js'
import { json, error, redirect } from "@sveltejs/kit";

export async function load({ url, params}) {
    console.log(`URL SLUG : ${params.deck}`)

    const result = await pb.collection("decks").getList(1, 50, {
        sort: 'created',
        expand: 'cards_relational'
    });

    // console.log(result)
    
    let deck = result.items[0]

    return { deck: deck }
}