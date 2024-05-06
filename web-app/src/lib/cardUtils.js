
// Eenum of Card Tyes in Grotto Beasts
export const CardTypes = {
    CHALLENGER : 'Challenger',
    BEAST : 'Beast',
    GROTTO : 'Grotto',
    WISH : 'Wish'
}

// Filter cards by type
export const cardsByType = (deck, type) => {
    return deck.filter(x => x.type == type)
}

// Counts the total number of cards of a given type
export const countCardType = (deck, type) => {
    return deck.filter(x => x.type == type).reduce((total, item) => total + (item.quantity || 1), 0)
}

// Create a deck from the given cards and their respective quantity
export const populateDeck = (cards) => {
    let deck = []

    // loop over all cards and append them to the deck according to their quantity
    cards.forEach(c => {
        // ignore challengers
        if (c.type == "Challenger") {
            return
        }

        // append cards to deck
        for (let i = 0; i < c.quantity; i++) {
            deck.push(c)
        }
    })

    // return the populated deck
    return deck
}

// Counts the number of cards at each mana cost
export const GetManaCurve = (fullCards) => {
    let manaCurve = {}

    fullCards.forEach(card => {
        if (card.type == 'Challenger') return

        if (card.cost in manaCurve) {
            manaCurve[card.cost] += card.quantity
        } else {
            manaCurve[card.cost] = card.quantity
        }
        
    });

    return manaCurve
}

// Count the number of beasts of each type present in the deck
export const CountBeastTypes = (fullCards) => {
    let beastTypes = {}

    fullCards.forEach(card => {
        if (card.type != CardTypes.BEAST)   return

        if (card.subtype in beastTypes)     beastTypes[card.subtype] += card.quantity
        else                                beastTypes[card.subtype] = card.quantity
    })

    return beastTypes
}