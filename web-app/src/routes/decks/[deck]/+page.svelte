<!-- JS -->
<script>
    import Deck from '$components/Deck/Deck.svelte';
    import DeckHeader from "$components/Deck/DeckHeader.svelte";
    import DeckStatsBar from "$components/Deck/DeckStatsBar.svelte";
    import HandPreview from "$components/Deck/HandPreview.svelte";
    import DeckGraphs from "$components/Deck/DeckGraphs.svelte";
    import Meta from '$components/Meta/Meta.svelte'

    // Receive props from API
    export let data

    // Constants
    const cards = data.deck.cards_json
    const deck = cards.deck
    const fullCards = data.fullCards
</script>

<!-- METADATA -->
<Meta title={data.deck.name} />

<!-- HTML -->
<DeckHeader name={data.deck.name} author={data.deck.expand.author.username} tags={data.deck.tags} authorID={data.deck.expand.author.id} deck={fullCards} deckID={data.deck.id} />

<!-- DECK -->
<div class="center">
    <Deck {deck} />
</div>

<!-- Stats Bar -->
<DeckStatsBar {deck} />

<!-- Starting Hand Preview -->
<HandPreview cards={deck} />

<!-- Graphs -->
<div class="divider"></div>
<DeckGraphs {fullCards} />