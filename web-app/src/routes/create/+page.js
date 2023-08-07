// Just redirects the user to /create/deck because the /create has nothing

import { redirect } from "@sveltejs/kit";

export async function load({ url, params }) {
    throw redirect(303, '/create/deck')
}