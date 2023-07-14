<!-- JS -->
<script>
    import Deck from '$components/Deck.svelte';
    import DeckHeader from "$components/DeckHeader.svelte";
    import DeckStatsBar from "$components/DeckStatsBar.svelte";
    import HandPreview from "$components/Deck/HandPreview.svelte";
    import DeckGraphs from "$components/Deck/DeckGraphs.svelte";

    //  Local Data
    // import { deck } from '$lib/test_deck.js'
    // console.log(deck)

    // Receive props from API
    export let data

    // Constants
    const cards = data.deck.cards_json
    const deck = cards.deck
    const fullCards = data.fullCards
</script>

<!-- HTML -->
<DeckHeader name={data.deck.name} author={data.deck.expand.author.name} tags={data.deck.tags} />

<!-- DECK -->
<div class="center">
    <Deck {deck} />
</div>

<!-- Stats Bar -->
<DeckStatsBar {deck} />

<!-- Starting Hand Preview -->
<HandPreview cards={deck} />

<!-- Graphs -->
<div class="header-divider"></div>
<DeckGraphs {fullCards} />