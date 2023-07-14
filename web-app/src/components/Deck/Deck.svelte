<!-- JS -->
<script>
    // Imports
    import DeckSection from "./DeckSection.svelte";
    import { CardTypes } from "$lib/cardUtils"

    // Props
    export let deck = []

    let previewImg = "back.webp"

    const onCardHover = event => {
        console.log(event.detail)
        const { id, name } = event.detail
        previewImg = `${id}. ${name}.webp`
    }

</script>

<!-- HTML -->
<div class="deck-container">
    <!-- PREVIEW -->
    <div class="card-preview card-image">
        <img src={`/images/cards/${previewImg}`} alt="Card Preview" on:error={() => previewImg = "back.webp"}>

        <!-- <img src={`/images/cards/${previewImg}`} alt="Card Preview"> -->
    </div>

    <!-- Card List -->
    <div class="deck">
        {#each Object.values(CardTypes) as type}
            <DeckSection cardType={type} deck={deck} on:cardHover={onCardHover} />
        {/each}
    </div>
</div>
