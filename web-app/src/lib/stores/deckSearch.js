// Stores searched/filtered items

// Imports
import { writable } from 'svelte/store'

// Create the store
export const createSearchStore = (data) => {
    const { subscribe, set, update } = writable({
        data: data,
        filtered: data,
        search: '',
        types: [],
        tags: []
    })

    return {
        subscribe,
        set,
        update,
        // Sort order for the elements in the list of decks
        sort: (method = 'name', ascending = true) => update(data => {
            switch (method.toLowerCase()) {
                case 'name':
                    data.data.sort((a, b) => (ascending ? a.name.toLowerCase() > b.name.toLowerCase() : a.name.toLowerCase() < b.name.toLowerCase()))
                    return data
                
                case 'creation':
                    data.data.sort((a, b) => (ascending? a.created > b.created : a.created < b.created))
                    return data
                
                case 'author':
                    data.data.sort((a, b) => (ascending? a.author_name.toLowerCase() > b.author_name.toLowerCase() : a.author_name.toLowerCase() < b.author_name.toLowerCase()))
                    return data

                case 'challenger':
                    data.data.sort((a, b) => (ascending ? a.challenger > b.challenger : a.challenger < b.challenger))
                    return data
            
                default:
                    data.data.sort((a, b) => (ascending ? a.name.toLowerCase() > b.name.toLowerCase() : a.name.toLowerCase() < b.name.toLowerCase()))
                    return data
            }

            // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
        })
    }
}

// Filters items based on the user's search term
export const searchHandler = (store) => {
    const searchTerm = store.search.toLowerCase().trim() || ''
    store.filtered = store.data
        // filter by search term
        .filter(item => {
            return item.searchTerms.toLowerCase().includes(searchTerm)
        })
        // sort by name (only when shoing filtered results)
        .sort((a, b) => searchTerm == '' ? a === b : a.name > b.name)
}

export const searchHandlerAdvance = (store) => {
    const searchTerm = store.search.toLowerCase().trim() || ''
    const typesFilter = store.types
    const tagFilters = store.tags

    // search by @author
    if (searchTerm.includes('@')) {
        const searchAuthor = searchTerm.replace('@', '')

        store.filtered = store.data
            .filter(item => {
                const deckAuthor = item.expand.author.username.toLowerCase()
                return deckAuthor.includes(searchAuthor)
            })
    }

    // search name and type
    else if (searchTerm != '') {
        store.filtered = store.filtered
            // filter by search term
            .filter(item => {
                return item.searchTerms.toLowerCase().includes(searchTerm)
            })
            // sort by name (only when shoing filtered results)
            .sort((a, b) => searchTerm == '' ? a === b : a.name > b.name)
    }
    
    // reset results
    else {
        store.filtered = store.data
    }
    
}

