// Official Decks

import { redirect } from "@sveltejs/kit"

export async function load({ params}) {
    throw redirect(303, '/decks?type=official')
}