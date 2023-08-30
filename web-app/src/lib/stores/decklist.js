// Stores the cards that the user has currently added to their deck

// Imports
import { writable } from 'svelte/store'

// Create the store
export const createDecklistStore = (data) => {
    const { subscribe, set, update } = writable({
        data: data,
        cards: data
    })

    return {
        subscribe,
        set,
        update
    }
}

export const decklist = writable([1,2,3,4,5])

export const createDecklist = () => {
    const { subscribe, set, update } = writable([])

    return {
        subscribe,
        // Add a new card to the deck list OR Increment quantity of card already in deck list
        add: (card) => {
            update(cards => {
                if (cards.some(x => x.name == card.name)) {
                    // console.log("CARD ALREADY IN DECK LIST")
                    const i = cards.findIndex(x => x.name == card.name)
                    cards[i].quantity++
                    
                    return cards
                }
                else {
                    // console.log("NEW CARD")
                    // return [...cards, { id: card.number, quantity: 1, name: card.name }]
                    return [...cards, {...card, quantity: 1}]
                }
            })
        },
        // Remove a card from the deck list OR decrement its quantity
        remove: (card) => {
            update(cards => {
                const i = cards.findIndex(x => x.name == card.name)
                cards[i].quantity--

                if (cards[i].quantity <= 0) {
                    cards.splice(i, 1)
                }

                return cards
            })
        },
        // Remove everything and set the store to an empty array
        reset: () => set([]),
        // Set the store to a specific value
        set: (cards) => set(cards),
        // Sort order for the elements in the deck list array
        sort: (method = 'name', ascending = true) => update(cards => {
            console.log(`>>> sorting decklist by ${method} | ascending: ${ascending}`)

            switch (method.toLowerCase()) {
                case 'name':
                    return cards.sort((a, b) => (ascending ? a.name > b.name : a.name < b.name))
                
                case 'cost':
                    return cards.sort((a, b) => ( ascending? a.cost > b.cost : a.cost < b.cost))
                
                case 'type':
                    return cards.sort((a, b) => (ascending ? a.type > b.type : a.type < b.type))
            
                default:
                    return cards.sort((a, b) => (ascending ? a.name > b.name : a.name < b.name))
            }

            // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
        }),
        // Total number of cards in the deck list (minus challenger)
        sum: (cards) => (
            cards.filter(({ type }) => type != 'Challenger').reduce((total, card) => total + card.quantity, 0)
        ),
        // Number of Challengers in deck
        challenger: (cards) => (
            cards
                .filter(({ type }) => type === 'Challenger')
                .reduce((total, card) => total + card.quantity, 0)
        ),
        // Get the ID of the Challenger
        challengerID: (cards) => {
            cards.find(x => x.type === 'Challenger').id
        },
        // Get the required size for this Deck
        deckSize: (cards) => {
            // basically checks if the deck has Byeah Prime, otherwise it's the default size of 40 cards
            const byeahPrime = cards.some(({ name }) => name === 'Byeah Prime')
            return byeahPrime ? 60 : 40;
        }
    }
}

export const decklistAdvance = createDecklist()

export const deckTags = writable([]);