// Just redirect to the Glueman card page for now

import { json, error, redirect } from "@sveltejs/kit";

export async function load({ params}) {
    throw redirect(302, '/card/glueman')
}