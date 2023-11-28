<!-- JS -->
<script>
    // Imports
    import DeckSection from "./DeckSection.svelte";
    import { CardTypes, countCardType } from "$lib/cardUtils"

    // Props
    export let deck = []
    export let fullCards = []

    let previewImg = deck.length > 0 ?
        fullCards[0].imageURL.small
        : '/images/cards/back.webp'

    const onCardHover = event => {
        const { id, name, collection, imageURL } = event.detail
        previewImg = imageURL
    }

</script>

<!-- HTML -->
<div class="deck-container">
    <!-- PREVIEW -->
    <div class="card-preview card-image">
        <img src={previewImg} alt="Card Preview" on:error={() => previewImg = "/images/cards/back.webp"}>
    </div>

    <!-- Card List -->
    <div class="deck">
        <!-- Create a section for each card type -->
        {#each Object.values(CardTypes) as type}
            <!-- but only if there exist cards of that type in the deck -->
            {#if countCardType(deck, type) > 0}
                <DeckSection cardType={type} deck={deck} fullCards={fullCards} on:cardHover={onCardHover} />
            {/if}
        {/each}
    </div>
</div>
