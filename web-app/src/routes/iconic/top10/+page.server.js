import grotto_data from "$lib/data/top10.js"

export async function load({ event, url, params}) {
    // Fetch local API data
    const res = await fetch(`${url.origin}/api/cards/`)
    let cards = await res.json()

    // sort the array just in case it's messed up
    grotto_data.sort((a, b) => b.Votes - a.Votes)

    // loop over every beast in the voting results
    for (let i = 0; i < grotto_data.length; i++) {
        const beast = grotto_data[i]

        // find beast card in database
        const card = cards.original.find(c => c.name == beast.Beast)

        // // add new data
        grotto_data[i].imageURL = card ? card.imageURL : null
        grotto_data[i].id = card ? card.number : null
        grotto_data[i].name = beast.Beast
        grotto_data[i].percentage = Math.round(parseFloat(beast.Percentage.replace('%', '')));
    }

    return {grotto_data}
}