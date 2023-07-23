import { json, error, redirect } from "@sveltejs/kit";

export async function load({ url, params, page, cookies}) {
    console.log("page: " + page)
    console.log(params)
    console.log("cookies: " + cookies)

    return {nice: 'nice'}
}