// A simulation of opening a Grotto Beasts! pack
import { json, error } from '@sveltejs/kit'
import { groupBy, rng } from '$lib/utils.js';

// 1st card - 100% Beast
// 2nd card - 85% Challenger, 15% Beast
// 3rd card - 100% Beast
// 4th card - 100% Wish
// 5th card - 75% Grotto, 25% Beast
// 6th card - 100% Beast
// 7th card - 100% Beast
// 8th card - 90% Wish, 10% Grotto
// 9th card - 100% Rare (Challenger if card 2 is a Beast)
// 10th card - 100% Holo

// Helper function to randomlly pull item from array
const getRandomItem = array => array[Math.floor(Math.random() * array.length)];


export async function GET({ url, params }) {
    // get all cards from local API data
    const res = await fetch(`${url.origin}/api/cards/`)
    let data = await res.json()
    let allCards = data.original
    allCards.forEach(card => card.quantity = 1)

    // Group the cards by type
    // let cardsGrouped = groupBy(allCards.original, 'type')

    // Group the cards by rarity and type
    const cards = {
        common: groupBy(allCards.filter(x => x.rare == false), 'type'),
        rare: groupBy(allCards.filter(x => x.rare == true), 'type'),
    }
    // Group the cards by rarity only
    let cardsByRarity = groupBy(allCards, 'rare')


    // Initalise the array of pulled cards
    let pulledCards = []

    //// BEGIN UNPACKING ////
    // 1st card - 100% Beast
    pulledCards[0] = getRandomItem(cards.common.Beast)
    // 2nd card - 85% Challenger, 15% Beast
    pulledCards[1] = rng() > 15 ? getRandomItem(cards.common.Challenger) : getRandomItem(cards.common.Beast)
    // 3rd card - 100% Beast
    pulledCards[2] = getRandomItem(cards.common.Beast)
    // 4th card - 100% Wish
    pulledCards[3] = getRandomItem(cards.common.Wish)
    // 5th card - 75% Grotto, 25% Beast
    pulledCards[4] = rng() > 25 ? getRandomItem(cards.common.Grotto) : getRandomItem(cards.common.Beast)
    // 6th card - 100% Beast
    pulledCards[5] = getRandomItem(cards.common.Beast)
    // 7th card - 100% Beast
    pulledCards[6] = getRandomItem(cards.common.Beast)
    // 8th card - 90% Wish, 10% Grotto
    pulledCards[7] = rng() > 10 ? getRandomItem(cards.common.Wish) : getRandomItem(cards.common.Grotto)
    // 9th card - 100% Rare (Challenger if card 2 is a Beast)
    pulledCards[8] = pulledCards[1].type == 'Beast' ? getRandomItem(cards.rare.Challenger) : getRandomItem(cardsByRarity.true)
    // 10th card - 100% Holo (i.e. any card at all)
    pulledCards[9] = getRandomItem(allCards)
    pulledCards[9].holo = true

    // return json(pulledCards.map(({ name, rare, imageURL }) => ({ name, rare, imageURL })))
    // return json(pulledCards.map(({ name, rare, imageURL }) => (name)))
    return json(pulledCards)
}