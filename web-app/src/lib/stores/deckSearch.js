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
        update
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

    console.log(searchTerm)

    // search by #author
    if (searchTerm.includes('#')) {
        const searchAuthor = searchTerm.replace('#', '')
        console.log(searchAuthor)

        store.filtered = store.data
            .filter(item => {
                console.log(item.expand.author.username)
                return item.expand.author.username.toLowerCase().includes(searchAuthor)
            })
    }

    // search name and type
    if (searchTerm != '') {
        store.filtered = store.filtered
            // filter by search term
            .filter(item => {
                return item.searchTerms.toLowerCase().includes(searchTerm)
            })
            // sort by name (only when shoing filtered results)
            .sort((a, b) => searchTerm == '' ? a === b : a.name > b.name)
    }
    
}
