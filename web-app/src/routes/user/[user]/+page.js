import { pb } from '$lib/pocketbase.js'
import { json, error, redirect } from "@sveltejs/kit"

export async function load({ url, params}) {
    const username = params.user

    // fetch a user record by discord username
    const result = await pb.collection('users').getList(1,1, {
        filter: `username = "${username}"`
    })

    const user = await result.items[0]

    // if no users were found, throw 404 error
    if (result.items.length < 1) {
        throw error(404, `No user found with username [${username}]`)
    }

    // fetch decks made by user
    const results = await pb.collection("decks").getList(1, 50, {
        sort: 'created',
        expand: 'challenger, author',
        filter: `author = "${user.id}"`
    });
    let decks = results.items

    // check if user is a VIP
    const vipUsers = import.meta.env.VITE_VIPS.split(',').map(str => str.trim());

    if (vipUsers.includes(username)) {
        console.log("USER IS A SUPPORTER!!")
        user.supporter = true
    }
    
    // Return
    return { user: user, username: params.user, decks: decks }
}