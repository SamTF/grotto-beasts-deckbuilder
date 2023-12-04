// Stores searched/filtered items

// Imports
import { writable } from 'svelte/store'
import { sortByKey } from '../utils'

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
                    sortByKey(data.data, 'name', ascending)
                    return data
                
                case 'creation':
                    sortByKey(data.data, 'created', ascending)
                    return data
                
                case 'author':
                    sortByKey(data.data, 'author_name', ascending)
                    return data

                case 'challenger':
                    sortByKey(data.data, 'challenger', ascending)
                    return data
            
                default:
                    sortByKey(data.data, 'name', ascending)
                    return data
            }
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

    // filter by tags
    if (tagFilters.length >= 1) {
        store.filtered = store.data.filter(item => {
            const deckTags = item.tags
            return deckTags.some(tag => tagFilters.includes(tag))
        })
    } else {
        store.filtered = store.data
    }

    // search by @author
    if (searchTerm.includes('@')) {
        const searchAuthor = searchTerm.replace('@', '')

        store.filtered = store.filtered
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
    
    // // reset results
    // else {
    //     store.filtered = store.data
    // }
    
}

