<!-- JS -->
<script>
    // Imports
    import DeckbuilderCard from '$components/Cards/DeckbuilderCard.svelte';
    import DecklistSidebar from '$components/DeckBuilder/DecklistSidebar.svelte';
    import BtnToggle from '$components/BtnToggle.svelte';
    import TagFilters from '$components/TagFilters.svelte';
    import { createSearchStore, searchHandlerAdvance } from '$lib/stores/search'
    import { decklistAdvance } from '$lib/stores/decklist'
	import { onDestroy, onMount } from 'svelte';
    import { goto } from "$app/navigation";
    import { page } from "$app/stores"; 
	import { text } from '@sveltejs/kit';

    // API data
    export let data

    // // Save Decklist to session cookies
    // let saveStore = false
    // $: if ($decklistAdvance && saveStore) {
    //     window.sessionStorage.setItem("decklist", JSON.stringify($decklistAdvance))
    // }

    // onMount(() => {
    //     let store = window.sessionStorage.getItem("decklist")
    //     console.log("STORE:")
    //     console.log(store)

    //     if (store) {
    //         $decklistAdvance = JSON.parse(store)
    //     }

    //     saveStore = true
    // })

    // console.log($decklistAdvance)

    // Searchable data
    const searchableCards = data.cards.map((card) => ({
        ...card,
        searchTerms: `${card.name} ${card.type} ${card.subtype}`
    }))

    // Svelte store stuff
    const searchStore = createSearchStore(searchableCards)
    // const decklistStore = createDecklistStore([])

    // watch for changes in the data
    const unsub = searchStore.subscribe(model => searchHandlerAdvance(model))

    // unsub to avoid memory leaks
    onDestroy(() => {
        unsub()
    })


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
            console.log(key, value);
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

    // User feedback
    let showHelp = false


</script>

<!-- HTML -->
<div class="header-divider"></div>
<div class="page-container">
    <div class="card-grid-container">
        <div class="top">
            <h1>Add Cards To Your Deck List!</h1>
            <BtnToggle bind:toggle={showHelp} text={showHelp ? 'Hide help' : 'Show help'} />

            {#if showHelp}
                <div class="help">
                    <ul class="help-list">
                        <li>Decks must have <b>40 cards</b> + <b>1 Challenger</b></li>
                        <li>Maximum of <b>3 copies</b> of any card.</li>
                        <li>Your deck list is displayed on the sidebar on the right.</li>
                        <li>Click the <b>+</b>/<b>-</b> buttons to add/subtract cards from your list.</li>
                        <ul style="padding-left: 1rem;"><li>You can also click or right-click a card in the deck list to remove it.</li></ul>
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
                placeholder="Enter card name, #type, and/or #tag"
                bind:value={$searchStore.search}
            >
            <!-- <button>➜</button> -->
            <button on:click={clearSearch}>✖</button>
        </div>

        <div class="type-filters">
            <!-- <BtnToggle bind:toggle={toggle} text={'ALL'} cardType={'all'} /> -->
            <BtnToggle bind:toggle={typeFilters.challenger} text={'Challengers'}    cardType={'challenger'} onClick={() => typeFilters.challenger != typeFilters.challenger} />
            <BtnToggle bind:toggle={typeFilters.beast}      text={'Beasts'}         cardType={'beast'}/>
            <BtnToggle bind:toggle={typeFilters.grotto}     text={'Grottos'}        cardType={'grotto'} />
            <BtnToggle bind:toggle={typeFilters.wish}       text={'Wishes'}         cardType={'wish'} />
        </div>

        <TagFilters bind:tagFilters={tagFilters} />

        <div class="card-grid">
            <!-- {#each data.cards as card} -->
            {#key $searchStore.filtered}
            {#each $searchStore.filtered as card}
                <DeckbuilderCard {card} />
            {/each}
            {/key}
        </div>
    </div>

    <!-- Decklist Sidebar -->
    <DecklistSidebar />
</div>


<!-- CSS -->
<style>
    
    .card-grid-container {
        display: grid;
        place-items: center;
        width: 100%;
    }

    .card-grid {
        /* display: flex; */
        /* flex-direction: row; */
        /* flex-wrap: wrap; */
        /* gap: 4rem; */

        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-auto-rows: auto;
        grid-row-gap: 2rem;
        place-items: center;

        /* width: 80vw; */
        width: 90%;
    }

    .top {
        display: grid;
        place-items: center;
        margin-bottom: 2rem;
    }
    .top h1 {
        margin-bottom: 1rem;
    }

    .help {
        margin-top: 1rem;
        max-width: 70ch;
    }
    .help .help-list {
        margin-bottom: 1rem;
    }
    .help .help-list li {
        margin-bottom: 0.25rem;
    }

    code {
        display: block;
        margin-bottom: 0.5rem;
    }

    .type-filters {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .page-container {
        display: grid;
        grid-template-columns: 1fr 20%;
    }
</style>
