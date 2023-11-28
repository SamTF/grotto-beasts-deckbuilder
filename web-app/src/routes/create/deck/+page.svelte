<!-- JS -->
<script>
    import Deck from '$components/Deck/Deck.svelte'
    import DeckHeader from "$components/DeckBuilder/DeckHeader.svelte"
    import DeckStatsBar from "$components/Deck/DeckStatsBar.svelte"
    import HandPreview from "$components/Deck/HandPreview.svelte"
    import DeckGraphs from "$components/Deck/DeckGraphs.svelte"
    import { decklistAdvance } from '$lib/stores/decklist'
    import { onMount } from 'svelte'

    // Receive props from API
    export let data

    // Constants... derived from the Decklist store
    let deck = []
    let fullCards = []

    // Save/Load decklist data to/from Session Storage
    onMount(() => {
        let store = localStorage.getItem("decklist")

        if (store) {
            $decklistAdvance = JSON.parse(store)
        }

        // populate the simplified deck thing
        deck = $decklistAdvance.map(x => { 
            return {id: x.number, name: x.name, type: x.type, quantity: x.quantity}
        })

        // save the full cards
        fullCards = $decklistAdvance
    })

    // total number of cards in a deck
    $: deckSum = decklistAdvance.sum($decklistAdvance)
</script>

<!-- HTML -->
<!-- <DeckHeader name={data.deck.name} author={data.deck.expand.author.name} tags={data.deck.tags} /> -->
<DeckHeader />

<!-- DECK -->
{#key fullCards}
    <div class="center">
        <Deck {deck} fullCards={fullCards} />
    </div>
{/key}


<!-- Stats Bar -->
{#key deck}<DeckStatsBar {deck} />{/key}

<!-- Starting Hand Preview -->
{#if deck.length >= 7}
    {#key deck}<HandPreview cards={deck} />{/key}
{:else}
    <div class="center" style="margin-top: 2rem;">
        <h1>Add more cards to see a preview of your starting hand!</h1>
    </div>
{/if}

<!-- Graphs -->
{#if deck.length >= 7}
    <div class="divider"></div>
    {#key deck}<DeckGraphs {fullCards} />{/key}
{/if}