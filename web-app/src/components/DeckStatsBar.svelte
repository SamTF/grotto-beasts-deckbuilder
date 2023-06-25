<!-- JS -->
<script>
    import { CardTypes, cardsByType, countCardType } from "$lib/cardUtils"
    
    // Props
    export let deck = []

    // Vars
    let totalCards = deck.length
    let challengerNum = countCardType(deck, CardTypes.CHALLENGER)
    let beastNum = countCardType(deck, CardTypes.BEAST)
    let grottoNum = countCardType(deck, CardTypes.GROTTO)
    let wishNum = countCardType(deck, CardTypes.WISH)
</script>

<!-- HTML -->
<div class="deck-stats-bar">
    <!-- left panel contaning deck general info -->
    <div class="left">
        <span>{totalCards} total cards</span>
    </div>

    <!-- right panel containing card count by type -->
    <div class="right">
        <span data-card-type="challenger">{challengerNum}</span>
        <span data-card-type="beast">{beastNum}</span>
        <span data-card-type="grotto">{grottoNum}</span>
        <span data-card-type="wish">{wishNum}</span>
    </div>
</div>