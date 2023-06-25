import { pb } from '$lib/pocketbase.js'

export async function load({ url, params, route, fetch }) {
    return {
        deck: "grotto beats",
        url: url,
        params: params,
        route: route
    }
}