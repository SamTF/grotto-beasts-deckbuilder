import { pb } from '$lib/pocketbase.js'
import { json, error, redirect } from "@sveltejs/kit";

export async function load({ url, params}) {
    // the filter by which to find the desired card
    let filter = `name ~ "${params.card}"`
    
    // filter by card number instead of name if a number was given in the URL parameter
    const usingId = Number.isInteger(parseInt(Number(params.card)))
    if (usingId) {
        const id = parseInt(Number(params.card))
        filter = `number = ${id}`
    }

    const results = await pb.collection("cards").getList(1, 1, {
        filter: filter
    })

    // if no matching card was found, redirect to glueman
    if (results.items.length < 1) {
        throw redirect(303, '/card/glueman')
    }

    // if a card was found successfully
    const card = results.items[0]

    // set the card's image URL directly on the object
    card.imageURL = `/images/cards/digital/${card.number}.webp`

    // check if it has other versions
    const altVersions = await pb.collection("cards_patched").getList(1, 1, {
        filter: `number = ${card.number}`
    })
    
    // no alternate versions exist
    if (altVersions.items.length < 1) {
        console.log("No alternate versions exist for ", card.name)
        return { card }
    }

    // if a patched version exists, append it to the data
    const patched = altVersions.items[0]

    // set the patched card image's URL via pocketbase
    patched.imageURL = `https://pb.grotto.builders/api/files/${patched.collectionId}/${patched.id}/${patched.image}`

    // return both versions - original & patched
    return { card, patched }
}