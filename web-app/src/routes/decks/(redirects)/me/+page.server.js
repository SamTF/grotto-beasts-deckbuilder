// Decks created by logged in user

import { redirect } from "@sveltejs/kit"
import { currentUser } from '$lib/pocketbase.js'
import { get } from 'svelte/store'

export async function load({ params, cookies, request }) {
    // fetch the current logged in user (if any) via cookies!
    const cookieValue = cookies.get('authData')
    const authData = cookieValue ? JSON.parse(cookies.get('authData')) : "";

    // Only filter decks by user if a user is logged in
    if (authData) {
        throw redirect(303, '/decks?type=me')
    } else {
        throw redirect(303, '/decks')
    }
}