import { currentUser } from '$lib/pocketbase.js'
import { json, redirect } from '@sveltejs/kit';
import { get } from "svelte/store";

export async function load({ params}) {
    const user = get(currentUser)

    if (!user) {
        throw redirect(303, '/decks')
    }

    return {data: 'yes'}
    
}