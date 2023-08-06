<!-- JS -->
<script>
    // Imports
    import Card from '$components/Cards/Card.svelte';
    import BtnToggle from '$components/BtnToggle.svelte';
    import TagFilters from '$components/TagFilters.svelte';
    import { createSearchStore, searchHandlerAdvance } from '$lib/stores/search'
	import { onDestroy, onMount } from 'svelte';
    import { page } from "$app/stores"; 
	import Meta from '$components/Meta/Meta.svelte';

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
        const tagParams = $page.url.searchParams.get('tags')

        if (tagParams) {
            const tags = tagParams.split(',')
            tagFilters = [...tags]
        }
    })

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
            placeholder="Enter card name, #type, and/or #tag"
            bind:value={$searchStore.search}
        >
        <!-- <button>➜</button> -->
        <button on:click={clearSearch}>✖</button>
    </div>

    <div class="type-filters">
        <BtnToggle bind:toggle={typeFilters.challenger} text={'Challengers'}    cardType={'challenger'} onClick={() => typeFilters.challenger != typeFilters.challenger} />
        <BtnToggle bind:toggle={typeFilters.beast}      text={'Beasts'}         cardType={'beast'}/>
        <BtnToggle bind:toggle={typeFilters.grotto}     text={'Grottos'}        cardType={'grotto'} />
        <BtnToggle bind:toggle={typeFilters.wish}       text={'Wishes'}         cardType={'wish'} />

    </div>

    <TagFilters bind:tagFilters={tagFilters} />

    <div class="card-grid">
        {#each $searchStore.filtered as card}
            <Card {card} />
        {/each}
    </div>
</div>