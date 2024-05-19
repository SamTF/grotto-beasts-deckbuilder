// Random assortment of utility functions used only in the Blackjack game

// Imports
import StatusTypes from "$lib/blackjack/statusTypes.js"

// Find the index of the last played Beast
export const findLastBeastIndex = (cards) => {
    for (let i = cards.length - 1; i >= 0; i--) {
        if (cards[i].type === "Beast") {
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
        if (cards[i].type == 'Beast') {
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