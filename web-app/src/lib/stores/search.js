// Stores searched/filtered items

// Imports
import { writable } from 'svelte/store'

// Create the store
export const createSearchStore = (data) => {
    const { subscribe, set, update } = writable({
        data: data,
        filtered: data,
        search: '',
        types: []
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
    console.log(typesFilter)
    console.log(typesFilter.length)

    // filter by card type
    if (typesFilter.length >= 1) {
        console.log("LET'S GOOOO")
        store.filtered = store.data
            .filter(card => {
                console.log(card.type)
                return typesFilter.includes(card.type.toLowerCase())
            })
    } else {
        store.filtered = store.data
    }

    // search tags
    if (searchTerm.includes('#')) {
        console.log("FILTERING BY TAGS")

        store.filtered = store.data
            .filter(item => {
                // const searchTags = searchTerm.replace('#', '').split(',')
                const searchTags = searchTerm.split('#').filter(x => x != '' )
                console.log(searchTags)

                const tags = item.tags.split(',').map(x => x.toLowerCase().trim())
                // console.log(tags)

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

