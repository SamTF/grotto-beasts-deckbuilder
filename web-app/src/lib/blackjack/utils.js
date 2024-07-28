// Random assortment of utility functions used only in the Blackjack game

// Imports
import StatusTypes from "$lib/blackjack/statusTypes.js"
import { CardTypes } from "$lib/cardUtils"
import { nanoid } from 'nanoid'

// Create a deck from the given cards and their respective quantity
export const populateDeck = (cards) => {
    let deck = []

    // loop over all cards and append them to the deck according to their quantity
    cards.forEach(c => {
        // ignore challengers
        if (c.type == CardTypes.CHALLENGER) {
            return
        }

        // append cards to deck
        for (let i = 0; i < c.quantity; i++) {
            // Create a new simplified card Object with a UUID
            const { number, name, type, imageURL, cost, power } = c
            const newCard = { number, name, type, imageURL, cost, power, id: nanoid(), status: 'normal' }
            
            // add card to deck
            deck.push(newCard)
        }
    })

    // return the populated deck
    return deck
}

// Find the index of the last played Beast
export const findLastBeastIndex = (cards) => {
    for (let i = cards.length - 1; i >= 0; i--) {
        if (cards[i].type === CardTypes.BEAST) {
            return i
        }
    }
    
    // If no Beast is found, return -1
    return -1
}

// Finds the INDEX of all beasts
export const findBeastIds = (cards) => {
    const indices = []

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].type == CardTypes.BEAST) {
            indices.push(i)
        }
        
    }

    return indices
}

export const jermaEffect = card => {
    let status
    const flip = Math.random()
    
    if (flip <= 0.5) {
        status = StatusTypes.NEGATIVE
    } else {
        status = StatusTypes.DOUBLE
    }

    card.status = status

    return card
}