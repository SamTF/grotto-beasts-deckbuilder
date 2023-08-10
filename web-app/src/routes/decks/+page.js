import { pb, currentUser } from '$lib/pocketbase.js'
import { get } from 'svelte/store'

export async function load({ url, params, route, fetch }) {
    // console.log(params)
    // console.log(url)
    // console.log(url.searchParams)

    // get deck type params
    const deckType = url.searchParams.get('type')
    
    // fetch the current logged in user (if any)
    const user = get(currentUser)
    console.log(user)

    // filter API request
    let filter = ''
    if (deckType == 'me' && user != null) {
        console.log(user)
        filter = `author = "${user.id}"`
    } else if (deckType == 'official') {
        filter = `author = "srygbxh3t3jneel"`
    } else if (deckType == 'bookmarked') {
        // const bookmarks = user.bookmarks
        console.log("BOOKMARKS: ", user?.bookmarks)
        filter = ``
        user?.bookmarks.forEach(b => {
            filter += `id = "${b}" ||`
        });
        filter = filter.slice(0, -2)
        console.log("FILTER: ", filter)
    }

    console.log(filter)

    const result = await pb.collection("decks").getList(1, 50, {
        sort: 'created',
        expand: 'challenger, author',
        filter: filter
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