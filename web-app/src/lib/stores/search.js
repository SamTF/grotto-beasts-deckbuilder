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
        // Sort order for the elements in the list of data.data
        sort: (method = 'number', ascending = true) => update(data => {
            switch (method.toLowerCase()) {
                case 'number':
                    sortByKey(data.data, 'number', ascending)
                    return data
                
                case 'name':
                    sortByKey(data.data, 'name', ascending)
                    return data
                
                case 'cost':
                    sortByKey(data.data, 'cost', ascending)
                    return data

                case 'power':
                    sortByKey(data.data, 'power', ascending)
                    return data
            
                default:
                    sortByKey(data.data, 'number', ascending)
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

    // filter by card type
    if (typesFilter.length >= 1) {
        store.filtered = store.data
            .filter(card => {
                return typesFilter.includes(card.type.toLowerCase())
            })
    } else {
        store.filtered = store.data
    }

    // filter by tags
    if (tagFilters.length >= 1) {
        store.filtered = store.filtered.filter(card => {
            const cardTags = card.tags.split(',').map(x => x.trim())
            return cardTags.some(tag => tagFilters.includes(tag))
        })
    }

    // search tags
    if (searchTerm.includes('#')) {

        store.filtered = store.data
            .filter(item => {
                // const searchTags = searchTerm.replace('#', '').split(',')
                const searchTags = searchTerm.split('#').filter(x => x != '' )

                const tags = item.tags.split(',').map(x => x.toLowerCase().trim())

                // return tags.includes(searchTags)
                return tags.some( tag => searchTags.includes(tag) )
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

