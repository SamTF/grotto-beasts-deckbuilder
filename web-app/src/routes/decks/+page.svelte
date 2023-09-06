<!-- JS -->
<script>
    // Imports
    import DeckGridItem from '$components/DeckExplorer/DeckGridItem.svelte'
    import Meta from '$components/Meta/Meta.svelte'
    import BtnToggle from '$components/BtnToggle.svelte'
    import TagFilters from '$components/TagFilters.svelte'
    import { createSearchStore, searchHandler, searchHandlerAdvance } from '$lib/stores/deckSearch'
    import { onDestroy, onMount } from 'svelte'
    import CreateDeckItem from '$components/DeckExplorer/CreateDeckItem.svelte'

    export let data

    // console.log(data)
    // console.log(data.url.searchParams)

    // Searchable data
    const searchableDecks = data.decks.map((deck) => ({
        ...deck,
        searchTerms: `${deck.name} ${deck.expand.author.name} ${deck.expand.challenger.name}`
    }))

    // Svelte store stuff
    const searchStore = createSearchStore(searchableDecks)

    // watch for changes in the data
    // const unsub = searchStore.subscribe(model => searchHandler(model))
    const unsub = searchStore.subscribe(model => searchHandlerAdvance(model))

    // unsub to avoid memory leaks
    onDestroy(() => {
        unsub()
    })

    // Searching by input
    const clearSearch = () => {
        $searchStore.search = ''
    }

    // Sorting decks
    let sortingVisible = false
    const sortingMethods = ['name', 'author', 'creation', 'challenger']
    let deckSort = { creation: true }

    const sortDecks = (method) => {
        method = method.toLowerCase()

        // invert order if method is already selected
        if (method in deckSort) {
            deckSort[method] = !deckSort[method]
        }
        // otherwise, set the new method as current sorting method
        else {
            deckSort = {}
            deckSort[method] = true
        }

        const ascending = deckSort[method]
        searchStore.sort(method, ascending)
    }
</script>

<!-- METADATA -->
<Meta title='Deck Explorer' />

<!-- HTML -->
<div class="header-divider" style="margin-bottom: 0;"></div>

<div class="deck-explorer-container">
    <div class="explorer-filters">
        <h1>Grotto Explorer!</h1>

        <div class="deck-search-bar">
            <input
                type="text"
                class="input-search"
                placeholder="Enter deck name, challenger, or @author"
                bind:value={$searchStore.search}
            >
            <button on:click={clearSearch}>✖</button>
        </div>

        <div class="deck-types">
            <ul class="btn-tags">
                <li class="btn-tag"><a data-sveltekit-reload href="/decks">All Decks</a></li>
                <li class="btn-tag"><a data-sveltekit-reload href="/decks/official">Official Decks</a></li>
                <li class="btn-tag"><a data-sveltekit-reload href="/decks/me">Your Decks</a></li>
                <li class="btn-tag"><a data-sveltekit-reload href="/decks/bookmarked">Bookmarked Decks</a></li>
            </ul>
        </div>

        <div class="deck-search">
            <button>Filters</button>
            <input type="text" name="deck-search" id="deck-search" placeholder="Search decks...">
        </div>

        <!-- <TagFilters bind:tagFilters={tagFilters} /> -->
    </div>

    <div class="sorting-options-container">
        {#if !sortingVisible}
            <div class="buttons">
                <button class="btn" on:click={() => sortingVisible = true}>Sorting Options ▶</button>
            </div>
        {:else}
            <div class="buttons">
                <button class="btn" on:click={() => sortingVisible = false}>Sorting Options ▲</button>
            </div>
            
            <!-- Sorting buttons -->
            <div class="sorting-options">
                {#each sortingMethods as method}
                    <BtnToggle
                        text={!(method in deckSort) ? method : deckSort[method] ? `${method}▲` : `${method}▼`}
                        toggle={method in deckSort}
                        onClick={() => sortDecks(method)}
                    />
                {/each}
            </div>
        {/if}
    </div>

    <!-- DECK GRID -->
    <div class="deck-grid">
        <!-- button to create new deck -->
        <CreateDeckItem />

        <!-- display all decks according to the user's search terms -->
        {#each $searchStore.filtered as deck}
            <DeckGridItem {deck} />
        {/each}
    </div>

</div>