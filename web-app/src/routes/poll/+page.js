// Redirect to the google forms link

import { json, error, redirect } from "@sveltejs/kit";

export async function load({ params}) {
    throw redirect(302, 'https://forms.gle/4STv6wa6xwu6MgYV6')
}