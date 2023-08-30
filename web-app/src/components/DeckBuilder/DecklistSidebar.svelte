<!-- Sidebar containing list of cards added to the current decklist -->

<!-- JS -->
<script>
    // Imports
    import DecklistItem from './DecklistItem.svelte';
    import BtnToggle from '$components/BtnToggle.svelte';
    import { decklistAdvance } from '$lib/stores/decklist'
	import { onDestroy, onMount } from 'svelte';

    // Props
    export let visible = true

    // Save Decklist to session cookies
    let saveStore = false
    $: if ($decklistAdvance && saveStore) {
        sessionStorage.setItem("decklist", JSON.stringify($decklistAdvance))
        localStorage.setItem("decklist", JSON.stringify($decklistAdvance))
    }

    // Save/Load decklist data to/from Session Storage
    onMount(() => {
        // let store = window.sessionStorage.getItem("decklist")
        // https://dev.to/danawoodman/svelte-quick-tip-connect-a-store-to-local-storage-4idi
        let store = localStorage.decklist

        if ($decklistAdvance.length > 0) {
            localStorage.setItem("decklist", JSON.stringify($decklistAdvance))
        }
        else if (store) {
            $decklistAdvance = JSON.parse(store)
        }

        saveStore = true

        console.log($decklistAdvance)
    })
    
    // Count cards in decklist
    const CardsInDecklist = () => {
        const sum = $decklistAdvance.reduce((total, card) => total + card.quantity, 0)
        return decklistAdvance.sum($decklistAdvance)
    }
    // Count Challengers in deck list
    const ChallengersInDecklist = () => {
        return decklistAdvance.challenger($decklistAdvance)
    }

    // Sorting cards in deck list
    const sortingMethods = ['name', 'type', 'cost']
    let decklistSort = {}

    const sortDecklist = (method) => {
        method = method.toLowerCase()

        // invert order if method is already selected
        if (method in decklistSort) {
            decklistSort[method] = !decklistSort[method]
        }
        // otherwise, set the new method as current sorting method
        else {
            decklistSort = {}
            decklistSort[method] = true
        }

        const ascending = decklistSort[method]
        decklistAdvance.sort(method, ascending)
    }
</script>

<!-- HTML -->
<div class="deck-list-sidebar" oncontextmenu="return false" class:hidden={!visible}>

    <div class="decklist-wrapper">
    <!-- Header / Deck Title -->
    <div class="decklist-header">
        <h1>DECK LIST</h1>

        {#key $decklistAdvance}
            <p class="card-count">{CardsInDecklist()}/{decklistAdvance.deckSize($decklistAdvance)} Cards</p>
            <p class="card-count-challenger">{ChallengersInDecklist()}/1 Challenger</p>
        {/key}
    </div>
    
    <!-- Card List -->
    <div class="deck-list-container">
    <div class="deck-list">

        <!-- Sorting buttons -->
        <div class="sorting-btns">
            {#each sortingMethods as method}
                <BtnToggle
                    text={!(method in decklistSort) ? method : decklistSort[method] ? `${method}▲` : `${method}▼`}
                    toggle={method in decklistSort}
                    onClick={() => sortDecklist(method)}
                />
            {/each}
        </div>

        <!-- List of card items -->
        {#key $decklistAdvance}
        {#each $decklistAdvance as card}
            <!-- <div>{quantity}x {name}(#{number})</div> -->
            <DecklistItem {card} />
        {/each}
        {/key}
    </div>
    </div>

    <!-- Buttons -->
    <div class="decklist-footer">
        <button class="btn btn-negative" on:click={() => decklistAdvance.reset()}>Clear all ✖</button>
        <a href="/create/deck" class="btn btn-positive">Done ✔</a>
    </div>
    </div>
</div>