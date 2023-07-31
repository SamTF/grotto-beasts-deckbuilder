<!-- JS -->
<script>
    // Imports
    import DeckGridItem from '$components/DeckExplorer/DeckGridItem.svelte';
    import Meta from '$components/Meta/Meta.svelte';

    export let data

    console.log(data)
    // console.log(data.url.searchParams)
</script>

<!-- METADATA -->
<Meta title='Deck Explorer' />

<!-- HTML -->
<div class="header-divider" style="height: 6rem; margin-bottom: 0;"></div>

<div class="deck-explorer-container">
    <div class="explorer-filters">
        <h1>Grotto Explorer!</h1>

        <div class="deck-types">
            <ul class="btn-tags">
                <li class="btn-tag">All Decks</li>
                <li class="btn-tag">Official Decks</li>
                <li class="btn-tag">Your Decks</li>
                <li class="btn-tag">Bookmarked Decks</li>
            </ul>
        </div>

        <div class="deck-search">
            <button>Filters</button>
            <input type="text" name="deck-search" id="deck-search" placeholder="Search decks...">
        </div>
    </div>

    <!-- DECK GRID -->
    <div class="deck-grid">
        {#each data.decks as deck}
            <DeckGridItem {deck} />
        {/each}
    </div>

</div>