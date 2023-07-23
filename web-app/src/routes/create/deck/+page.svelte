<!-- JS -->
<script>
    import Deck from '$components/Deck/Deck.svelte';
    import DeckHeader from "$components/DeckBuilder/DeckHeader.svelte";
    import DeckStatsBar from "$components/Deck/DeckStatsBar.svelte";
    import HandPreview from "$components/Deck/HandPreview.svelte";
    import DeckGraphs from "$components/Deck/DeckGraphs.svelte";
    import { decklistAdvance } from '$lib/stores/decklist'
    import { onMount } from 'svelte';

    // Receive props from API
    export let data

    // Constants... derived from the Decklist store
    let deck = []
    let fullCards = []

    // Save/Load decklist data to/from Session Storage
    onMount(() => {
        console.log($decklistAdvance)

        // let store = window.sessionStorage.getItem("decklist")
        let store = localStorage.getItem("decklist")
        console.log("STORE:")
        console.log(store)

        if (store) {
            $decklistAdvance = JSON.parse(store)
        }

        console.log($decklistAdvance)

        // populate the simplified deck thing
        deck = $decklistAdvance.map(x => { 
            return {id: x.number, name: x.name, type: x.type, quantity: x.quantity}
        })

        // save the full cards
        fullCards = $decklistAdvance


        console.log(deck)
    })

</script>

<!-- HTML -->
<!-- <DeckHeader name={data.deck.name} author={data.deck.expand.author.name} tags={data.deck.tags} /> -->
<DeckHeader name='' author='' tags={['add tag...']} />

<!-- DECK -->
<div class="center">
    <Deck {deck} />
</div>

<!-- Stats Bar -->
{#key deck}<DeckStatsBar {deck} />{/key}

<!-- Starting Hand Preview -->
{#if deck.length > 1}
    {#key deck}<HandPreview cards={deck} />{/key}
{/if}

<!-- Graphs -->
{#if deck.length >= 7}
    <div class="header-divider"></div>
    {#key deck}<DeckGraphs {fullCards} />{/key}
{:else}
    <div class="center" style="margin-top: 2rem;">
        <h1>Add more cards to see a preview of your starting hand!</h1>
    </div>
    
{/if}