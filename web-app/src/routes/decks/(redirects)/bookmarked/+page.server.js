// Decks bookmarked by logged in user

import { redirect } from "@sveltejs/kit"

export async function load({ params, cookies, request }) {
    // fetch the current logged in user (if any) via cookies!
    const authData = JSON.parse(cookies.get('authData'));
    console.log(authData)

    // Only filter decks by user if a user is logged in
    if (authData.meta.id) {
        throw redirect(303, '/decks?type=bookmarked')
    } else {
        throw redirect(303, '/')
    }
}