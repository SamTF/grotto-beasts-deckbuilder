<!-- JS -->
<script>
    // Imports
    import { cardsByType, countCardType } from "$lib/cardUtils"
    import CardItem from "./CardItem.svelte"

    // Props
    export let cardType = ''
    export let deck = []
    export let fullCards = []
</script>

<!-- HTML -->
<div class="deck-section">
    <div class={`header header-${cardType.toLowerCase()}`}>{cardType} ({countCardType(deck, cardType)})</div>

    {#each cardsByType(deck, cardType).sort((a, b) => a.name > b.name) as card}
        <CardItem id={card.id} type={card.type} name={card.name} quantity={card.quantity} fullCard={fullCards.find(x => x.number == card.id)} on:cardHover />
    {/each}
</div>