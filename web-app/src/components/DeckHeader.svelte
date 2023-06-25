<!-- JS -->
<script>
    export let author, name, tags
</script>

<!-- HTML -->
<div class="deck-header">
    <div class="info-container">
        <a href={`/users/${author}`} class="deck-author">{author}</a>
        <h1 class="deck-name">{name}</h1>
        
        <ul class="deck-tags">
            <li>Dice Rolling</li>
            <li>Coin Flipping</li>
        </ul>
    </div>
</div>

<div class="header-divider">

</div>

