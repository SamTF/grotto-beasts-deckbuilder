<!-- JS -->
<script>
    // Imports
    import Card from '$components/Cards/Card.svelte'
    import BtnToggle from '$components/BtnToggle.svelte'
    import TagFilters from '$components/TagFilters.svelte'
    import { createSearchStore, searchHandlerAdvance } from '$lib/stores/search'
	import { onDestroy, onMount } from 'svelte'
    import { page } from "$app/stores"
    import { get } from 'svelte/store'
	import Meta from '$components/Meta/Meta.svelte'
    import CardVersions from '$components/Cards/CardVersions.svelte'
    import { slide } from "svelte/transition"
    import Icon from '$components/UI/Icon.svelte'

    // API data
    export let data

    // Searchable data
    const searchableCards = data.cards.map((card) => ({
        ...card,
        searchTerms: `${card.name} ${card.type} ${card.subtype}`
    }))

    // searchable patched version
    let searchableCards_v2 = data.patched.map((card) => ({
        ...card,
        searchTerms: `${card.name} ${card.type} ${card.subtype}`
    }))
    
    
    // Svelte store stuff
    // let searchStore = createSearchStore(searchableCards)
    const searchStore_v1 = createSearchStore(searchableCards)
    const searchStore_v2 = createSearchStore(searchableCards_v2)
    let searchStore = searchStore_v1

    // watch for changes in the data
    // const unsub = searchStore.subscribe(model => searchHandlerAdvance(model))
    const unsub_v1 = searchStore_v1.subscribe(model => searchHandlerAdvance(model))
    const unsub_v2 = searchStore_v2.subscribe(model => searchHandlerAdvance(model))

    // unsub to avoid memory leaks
    onDestroy(() => {
        // unsub()
        unsub_v1()
        unsub_v2()
    })

    // SEARCH OPTIONS
    let showSearchOptions = false
    const toggleSearchOptions = () => { showSearchOptions = !showSearchOptions }

    // FILTERS
    // Filtering by Type
    let typeFilters = {
        challenger : false,
        beast: false,
        grotto: false,
        wish: false
    }

    // Filtering by Tags
    let tagFilters = []
    $: $searchStore.tags = tagFilters

    // SEARCH FUNCTION
    // Filter search by the card types selected. Reset filter if none are selected
    $: if ( Object.values(typeFilters).some(element => element == true) ) {
        let types = []
        for (const [key, value] of Object.entries(typeFilters)) {
            if (value == true) {
                types.push(key)
                $searchStore.types = types
            }
        }

        // let query = new URLSearchParams($page.url.searchParams.toString());
        // query.set('tags', 'draw');
        // goto(`?${query.toString()}`);
    } else {
        // console.log("boblin")
        let types = []
        $searchStore.types = types
    }


    // RESET EVERYTHING
    const clearSearch = () => {
        // reset search input
        $searchStore.search = ''
        // reset search type filter
        let types = []
        $searchStore.types = types
        // reset tag filters
        tagFilters = []
        $searchStore.tags = tagFilters

        // reset button values
        Object.keys(typeFilters).forEach(v => typeFilters[v] = false)
    }

    // print all tags
    const getAllTags = () => {
        let tags = []
        $searchStore.filtered.forEach(x => {
            const cardTags = x.tags.split(',').map(x => x.trim())

            for (const i in cardTags) {
                const t = cardTags[i]
                if (tags.includes(t)) {
                    continue
                } else {
                    tags.push(t)
                }
            }
        })

        tags.sort()
        console.log(tags)
    }

    // getAllTags()

    // Get tags from query (if any)
    onMount(() => {
        // const tagParams = $page.url.searchParams.get('tags')
        const tagParams = get(page).url.searchParams.get('tags')

        if (tagParams) {
            const tags = tagParams.split(',')
            tagFilters = [...tags]
        }
    })

    // Sorting cards
    let sortingVisible = false
    const sortingMethods = ['number', 'name', 'cost', 'power']
    let cardSort = { number: true }

    const sortDecks = (method) => {
        method = method.toLowerCase()

        // invert order if method is already selected
        if (method in cardSort) {
            cardSort[method] = !cardSort[method]
        }
        // otherwise, set the new method as current sorting method
        else {
            cardSort = {}
            cardSort[method] = true
        }

        const ascending = cardSort[method]
        searchStore.sort(method, ascending)
    }

    // Toggling between original and laternate versions of cards
    let currentVersion = 'original'
    $: setVersion(currentVersion)

    // Update the Search Store to reflect the chosen card version
    const setVersion = (version) => {
        const searchTerm = $searchStore.search

        // change search store
        currentVersion == 'original' ? searchStore = searchStore_v1 : searchStore = searchStore_v2

        // set search term
        $searchStore.search = searchTerm

        // set sorting method
        const method = Object.keys(cardSort)[0]
        searchStore.sort(method, cardSort[method])

        // set tag filters
        $searchStore.tags = tagFilters

        // set type filters
        let types = []
        for (const [key, value] of Object.entries(typeFilters)) {
            if (value == true) {
                types.push(key)
            }
        }
        $searchStore.types = types
    }
</script>

<!-- META -->
<Meta title='Card Explorer' />

<!-- HTML -->
<div class="header-divider"></div>

<div class="card-grid-container">
    <h1>Card List</h1>

    <div class="search-bar">
        <input
            type="text"
            class="input-search"
            placeholder="Enter card name or type"
            bind:value={$searchStore.search}
        >
        <!-- <button>➜</button> -->
        <button on:click={clearSearch}>✖</button>
    </div>

    <!-- Advanced Search Options -->
    {#if showSearchOptions}
        <!-- Filtering by type -->
        <div class="type-filters" transition:slide>
            <BtnToggle bind:toggle={typeFilters.challenger} text={'Challengers'}    cardType={'challenger'} onClick={() => typeFilters.challenger != typeFilters.challenger} />
            <BtnToggle bind:toggle={typeFilters.beast}      text={'Beasts'}         cardType={'beast'}/>
            <BtnToggle bind:toggle={typeFilters.grotto}     text={'Grottos'}        cardType={'grotto'} />
            <BtnToggle bind:toggle={typeFilters.wish}       text={'Wishes'}         cardType={'wish'} />

        </div>

        <!-- Main container for ALL search filter options and toggles -->
        <div class="card-search-options" transition:slide>
            <!-- Filtering by Tag -->
            <TagFilters bind:tagFilters={tagFilters} />

            <!-- Sorting Cards -->
            <div class="sorting-options-container">
                {#if !sortingVisible}
                    <div class="buttons">
                        <button class="btn" on:click={() => sortingVisible = true}>Sorting Options ▶</button>
                    </div>
                {:else}
                    <div class="buttons">
                        <button class="btn" on:click={() => sortingVisible = false}>Sorting Options ▲</button>
                    </div>
                {/if}
            </div>

            {#if sortingVisible}
                <!-- Sorting buttons -->
                <div class="sorting-options" transition:slide>
                    {#each sortingMethods as method}
                        <BtnToggle
                            text={!(method in cardSort) ? method : cardSort[method] ? `${method}▲` : `${method}▼`}
                            toggle={method in cardSort}
                            onClick={() => sortDecks(method)}
                        />
                    {/each}
                </div>
            {/if}

            <!-- Card Versions -->
            <CardVersions
                bind:currentVersion={currentVersion}
                onClick={() => {}}
            />
        </div>
    {/if}

    <!-- Button to show/hide search options -->
    <button
        class="card-search-options-btn"
        class:active={showSearchOptions}
        on:click={toggleSearchOptions}
    >
        <Icon name='chevron-down' class='card-search-options-icon' strokeWidth='2' solid={false} />
    </button>

    <!-- CARD GRID -->
    <div class="card-grid">
        {#each $searchStore.filtered as card}
            <Card {card} />
        {/each}
    </div>
</div>