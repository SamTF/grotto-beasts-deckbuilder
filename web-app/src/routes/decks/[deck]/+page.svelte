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
    const challengerImg = `${data.deck.expand.challenger.number}. ${data.deck.expand.challenger.name}.webp`
</script>

<!-- METADATA -->
<Meta title={data.deck.name} description={`A deck built by ${data.deck.expand.author.username}`} thumbnail={`/images/cards/360/${challengerImg}`} />

<!-- HTML -->
<DeckHeader name={data.deck.name} author={data.deck.expand.author.username} tags={data.deck.tags} authorID={data.deck.expand.author.id} fullCards={fullCards} deck={data.deck}/>

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