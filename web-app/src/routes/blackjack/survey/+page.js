// Game feedback survey

import { json, error, redirect } from "@sveltejs/kit";

export async function load({ params}) {
    throw redirect(302, 'https://forms.gle/fFPb3QiR1HvEqCbR7')
}