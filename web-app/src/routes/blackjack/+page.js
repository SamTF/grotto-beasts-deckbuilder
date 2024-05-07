// Just redirect to the Super Luck Blackjack page for now

import { json, error, redirect } from "@sveltejs/kit";

export async function load({ params}) {
    throw redirect(302, '/blackjack/donfcktbwm5488s')
}