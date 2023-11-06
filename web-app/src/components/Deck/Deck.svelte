<!-- JS -->
<script>
    // Imports
    import DeckSection from "./DeckSection.svelte";
    import { CardTypes, countCardType } from "$lib/cardUtils"

    // Props
    export let deck = []

    let previewImg = deck.length > 0 ?
         `${deck[0].id}. ${deck[0].name}.webp`
         : 'back.webp'

    const onCardHover = event => {
        const { id, name } = event.detail
        previewImg = `${id}. ${name}.webp`
    }

</script>

<!-- HTML -->
<div class="deck-container">
    <!-- PREVIEW -->
    <div class="card-preview card-image">
        <img src={`/images/cards/${previewImg}`} alt="Card Preview" on:error={() => previewImg = "back.webp"}>
    </div>

    <!-- Card List -->
    <div class="deck">
        <!-- Create a section for each card type -->
        {#each Object.values(CardTypes) as type}
            <!-- but only if there exist cards of that type in the deck -->
            {#if countCardType(deck, type) > 0}
                <DeckSection cardType={type} deck={deck} on:cardHover={onCardHover} />
            {/if}
        {/each}
    </div>
</div>
