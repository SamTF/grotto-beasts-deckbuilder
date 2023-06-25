
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
    return deck.filter(x => x.type == type).reduce((total, item) => total + item.quantity, 0)
}