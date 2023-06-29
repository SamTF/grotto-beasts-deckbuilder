import { pb } from '$lib/pocketbase.js'

export async function load({ url, params, route, fetch }) {
    const result = await pb.collection("decks").getList(1, 50, {
        sort: 'created',
        expand: 'challenger, author'
    });
    
    let decks = result.items

    return { decks: decks }

    return {
        deck: "grotto beats",
        url: url,
        params: params,
        route: route
    }
}