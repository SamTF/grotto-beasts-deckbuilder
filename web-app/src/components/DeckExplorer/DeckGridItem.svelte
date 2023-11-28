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
        <div class="highlight-bubble-light">
            {#if deck.version == 'original' || deck.version == ''}
                <span>Original</span>
                <img src="/images/emotes/meowdy.png" alt="original" height="16">
            {:else}
                <span class="icon-digital">Digital</span>
                <!-- <img src="/images/icons/robot.svg" alt="digital" height="16"> -->
            {/if}
        </div>
        
        <p class="deck-item-info">{deck.expand.challenger.name}</p>
    </div>
</a>