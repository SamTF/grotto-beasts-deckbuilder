<!-- JS -->
<script>
    // Imports
    import Card from '$components/Cards/Card.svelte';
    import BtnToggle from '$components/BtnToggle.svelte';
    import { createSearchStore, searchHandlerAdvance } from '$lib/stores/search'
	import { onDestroy } from 'svelte';
    import { goto } from "$app/navigation";
    import { page } from "$app/stores"; 

    // API data
    export let data

    // Searchable data
    const searchableCards = data.cards.map((card) => ({
        ...card,
        searchTerms: `${card.name} ${card.type} ${card.subtype}`
    }))

    // Svelte store stuff
    const searchStore = createSearchStore(searchableCards)

    // watch for changes in the data
    const unsub = searchStore.subscribe(model => searchHandlerAdvance(model))

    // unsub to avoid memory leaks
    onDestroy(() => {
        unsub()
    })


    // FILTERS
    let typeFilters = {
        challenger : false,
        beast: false,
        grotto: false,
        wish: false
    }

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

        // reset button values
        Object.keys(typeFilters).forEach(v => typeFilters[v] = false)
    }


</script>

<!-- HTML -->
<div class="header-divider"></div>

<div class="card-grid-container">
    <h1>Card List</h1>

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

        <!-- <span class="btn" data-card-type="challenger">Challengers</span>
        <span class="btn" data-card-type="beast">Beasts</span>
        <span class="btn" data-card-type="grotto">Grottos</span>
        <span class="btn" data-card-type="wish">Wishes</span> -->
    </div>

    <!-- <div class="type-filters">
        <label class="toggle">
            <input type="checkbox">
            <span class="labels" data-on="ON" data-off="OFF">ALL</span>
        </label>
    </div> -->

    <div class="card-grid">
        <!-- {#each data.cards as card} -->
        {#each $searchStore.filtered as card}
            <Card {card} />
            <!-- <div>{card.number} | {card.name}</div> -->
        {/each}
    </div>
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

        width: 80vw;
    }

    h1 {
        margin-bottom: 2rem;
    }

    .type-filters {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-bottom: 4rem;
    }
</style>
