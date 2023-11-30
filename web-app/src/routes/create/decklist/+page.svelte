<!-- JS -->
<script>
    // Imports
    import DeckbuilderCard from '$components/Cards/DeckbuilderCard.svelte'
    import DecklistSidebar from '$components/DeckBuilder/DecklistSidebar.svelte'
    import BtnToggle from '$components/BtnToggle.svelte'
    import TagFilters from '$components/TagFilters.svelte'
    import { createSearchStore, searchHandlerAdvance } from '$lib/stores/search'
    import { decklistAdvance } from '$lib/stores/decklist'
	import { onDestroy, onMount } from 'svelte'
    import { slide } from "svelte/transition"
    import Icon from '$components/UI/Icon.svelte'
    import Meta from '$components/Meta/Meta.svelte'

    // API data
    export let data

    let currentVersion = 'original'
    let saveStore = false

    onMount(() => {
        let store = localStorage.deckInfo

        if (store) {
            let deckInfo = JSON.parse(store)
            currentVersion = deckInfo.patched ? 'patched' : 'original'
        }

        saveStore = true
    })


    // Searchable data
    let searchableCards = data.cards.map((card) => ({
        ...card,
        searchTerms: `${card.name} ${card.type} ${card.subtype}`
    }))

    // searchable patched version
    let searchableCards_v2 = data.patched.map((card) => ({
        ...card,
        searchTerms: `${card.name} ${card.type} ${card.subtype}`
    }))

    // Check whether to show only ORIGINAL cards or show PATCHED TTS cards
    // $: searchableCards = deckInfo.patched ? searchableCards_v2 : searchableCards_original

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

    // Filter search by the card types selected. Reset filter if none are selected
    $: if ( Object.values(typeFilters).some(element => element == true) ) {
        let types = []
        for (const [key, value] of Object.entries(typeFilters)) {
            if (value == true) {
                types.push(key)
                $searchStore.types = types
            }
        }

    } else {
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

    // User feedback
    let showHelp = false

    // Mobile toggles
    let showDecklist = false

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

        // save version to Deck Info
       
        if (!saveStore) return

        let store = localStorage.deckInfo
        let deckInfo = JSON.parse(store)
        deckInfo.patched = currentVersion != 'original'

        sessionStorage.setItem("deckInfo", JSON.stringify(deckInfo))
        localStorage.setItem("deckInfo", JSON.stringify(deckInfo))
    }
</script>

<!-- METADATA -->
<Meta title={'Deck Builder'} description={'Build your own Grotto Beasts deck!'} />

<!-- HTML -->
<div class="header-divider"></div>
<div class="page-container-decklist">
    <div class="card-grid-container">
        <div class="top">
            <h1>Add Cards To Your Deck List!</h1>
            <BtnToggle bind:toggle={showHelp} text={showHelp ? 'Hide help' : 'Show help'} />

            {#if showHelp}
                <div class="help" transition:slide>
                    <ul class="help-list">
                        <li>Decks must have <b>40 cards</b> + <b>1 Challenger</b></li>
                        <li>Maximum of <b>3 copies</b> of any card.</li>
                        <li>Your deck list is displayed on the sidebar on the right.</li>
                        <li>Click the <b>+</b>/<b>-</b> buttons to add/subtract cards from your list.</li>
                        <ul style="padding-left: 1rem;"><li>Or <b>click/right-click</b> a card directly to <b>add/subtract</b> it.</li></ul>
                        <ul style="padding-left: 1rem;"><li>You can also click/right-click an item in the deck list menu to remove it.</li></ul>
                        <li>Click <b>Clear All</b> to nuke your deck list.</li>
                        <li>Click <b>Done</b> to save and go to your deck info page.</li>
                        <ul style="padding-left: 1rem;"><li>Don't worry, you can edit your deck as much as you like :)</li></ul>
                        <li>Make sure to give your deck a name and tags in the deck info page!</li>
                        <li>Once you're happy with your deck, save it to publish it to the Grotto Explorer and make it shareable with everyone :D</li>
                        
                    </ul>
                    <code><b>Dev notes</b>: your Deck List is <b>saved automatically</b> to your browser's local storage. This means that <b>if you close the browser, your deck list is still saved!</b> You can keep editing your deck for as long as you want, no pressure to publish it. Just don't clear the cookies or else *poof*.</code>
                    <code>Any suggestions are welcome c:</code>
                </div>
            {/if}
            <!-- <code>Click done</code> -->
        </div>
        

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

        <!-- Main container for ALL search filter options and toggles -->
        {#if showSearchOptions}

            <!-- Filtering by Type -->
            <div class="type-filters" transition:slide>
                <BtnToggle bind:toggle={typeFilters.challenger} text={'Challengers'}    cardType={'challenger'} onClick={() => typeFilters.challenger != typeFilters.challenger} />
                <BtnToggle bind:toggle={typeFilters.beast}      text={'Beasts'}         cardType={'beast'}/>
                <BtnToggle bind:toggle={typeFilters.grotto}     text={'Grottos'}        cardType={'grotto'} />
                <BtnToggle bind:toggle={typeFilters.wish}       text={'Wishes'}         cardType={'wish'} />
            </div>

            <div class="card-search-options" transition:slide>
                <!-- Filtering by Tag -->
                <TagFilters bind:tagFilters={tagFilters} />

                <!-- Sorting cards show/hide -->
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

                <!-- Sorting cards -->
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
                <!-- <CardVersions
                    bind:currentVersion={currentVersion}
                    onClick={() => {}}
                /> -->
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
        <div class="card-grid-deckbuilder">
            {#key $searchStore.filtered}
            {#each $searchStore.filtered as card}
                <DeckbuilderCard {card} />
            {/each}
            {/key}
        </div>
    </div>

    <!-- Decklist Sidebar -->
    <div class="desktop-only">
        <DecklistSidebar />
    </div>

    <!-- Mobile UI -->
    <div class="mobile-only">
        <!-- Sidebar toggle for mobile -->
        <div class="decklist-sidebar-toggle mobile-only" on:click={() => showDecklist = !showDecklist}>
            <h2>{ showDecklist ? "Hide Decklist ◀" : "Show Decklist ▶" }</h2>
        </div>

        <!-- Decklist Sidebar -->
        <DecklistSidebar bind:visible={showDecklist} />
    </div>
</div>
