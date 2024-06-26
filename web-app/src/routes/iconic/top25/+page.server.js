import grotto_data from "$lib/data/top25.js"

export async function load({ event, url, params}) {
    // Fetch local API data
    const res = await fetch(`${url.origin}/api/cards/`)
    let cards = await res.json()

    // loop over every pair and beast in the voting results
    for (let i = 0; i < grotto_data.length; i++) {
        const pair = grotto_data[i].data;
        for (let i = 0; i < pair.length; i++) {
            const item = pair[i];

            // find beast card in database
            const card = cards.original.find(c => c.name == item.Option)

            // add new data
            pair[i].imageURL = card ? card.imageURL : null
            pair[i].id = card ? card.number : null
            pair[i].percentage = Math.round(( pair[i].Votes / (pair[0].Votes + pair[1].Votes) ) * 100)
        }
    }

    return {grotto_data}
}