<!-- JS -->
<script>
    // Imports
    import { page } from '$app/stores'
    
    // Props
    export let author, name, tags
</script>

<!-- HTML -->
<div class="deck-header">
    <div class="deck-builder-header">
        <div class="info-container">
            <div class="deck-author">
                <input type="text" class="input-deck-author" placeholder="Enter your username..." bind:value={author}>
            </div>

            <div class="deck-name">
                <input type="text" class="deck-name input-deck-name" placeholder="Enter deck name..." bind:value={name}>
            </div>
            
            <ul class="deck-tags">
                {#each tags as tag}
                    <li><a href={$page.url.pathname}>{tag}</a></li>
                {/each}
            </ul>
        </div>

        <div class="header-btns">
            <a href="/create/decklist" class="btn btn-add-cards">
                <span>＋</span>
                <span>add cards</span>
            </a>
            <button class="btn btn-save-deck">
                <span>💾</span>
                <span>Publish Deck</span>
            </button>
            <!-- <button class="btn">🌐 Publish Deck</button> -->
        </div>
    </div>
</div>

<div class="header-divider">

</div>

