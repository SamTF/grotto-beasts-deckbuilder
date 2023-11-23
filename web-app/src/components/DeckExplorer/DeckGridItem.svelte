<!-- These are the Deck items that populate the Deck Explorer -->

<!-- JS -->
<script>
    export let deck

    $: challengerImg = `${deck.expand.challenger.number}. ${deck.expand.challenger.name}.webp`
</script>

<!-- HTML -->
<a class="deck-grid-item" href={`/decks/${deck.id}`} style={`--bg-image: url("images/cards/360/${challengerImg}")`}>
    <h2 class="deck-item-name">{deck.name}</h2>
    <p class="deck-item-author">{deck.expand.author.username}</p>
    <div class="deck-info-bottom">
        <p class="deck-item-info">{deck.expand.challenger.name}</p>
    </div>
</a>