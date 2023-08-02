<!-- JS -->
<script>
    // Imports
    import { page } from '$app/stores'
    import { currentUser } from '$lib/pocketbase.js'
    import { decklistAdvance } from '$lib/stores/decklist'
    import { goto } from '$app/navigation'
    import Icon from '../UI/Icon.svelte';
    
    // Props
    export let author, name, tags, authorID, deck, deckID

    // whether this deck was created by the current authenticated user
    const userCreatedThisDeck = $currentUser ? authorID == $currentUser.id : false

    const editDeck = () => {
        decklistAdvance.set(deck)
        localStorage.setItem("decklist", JSON.stringify($decklistAdvance))
        localStorage.setItem("deckInfo", JSON.stringify({ 
            name: `${name} 2`,
            author,
            tags
        }))

        goto(`/create/deck?edit=${deckID}`)
    }
</script>

<!-- HTML -->
<div class="deck-header">
    <div class="deck-data-container">
        <div class="info-container">
            <a href={`/users/${author}`} class="deck-author">{author}</a>
            <h1 class="deck-name">{name}</h1>
            
            <ul class="deck-tags">
                {#each tags as tag}
                    <li><a href={$page.url.pathname}>{tag}</a></li>
                {/each}
            </ul>
        </div>

        <!-- Special Controls for the deck author -->
        <div class="header-btns">
            {#if userCreatedThisDeck}
                <!-- Export as TXT -->
                <button class="btn" title="Save decklist as Text file to import it somewhere else &#013;>>> Currently does nothing :)" disabled={true}>
                    <Icon name='export-file' class='header-btn-icon' strokeWidth='0' solid={true}/>
                    <span>Export as TXT</span>
                </button>

                <!-- DELETE -->
                <button class="btn" title="Delete this deck from the database! D:&#013;>>> Currently does nothing :)" disabled={true}>
                    <Icon name='trash' class='header-btn-icon' strokeWidth='0' solid={true} />
                    <span>Delete Deck</span>
                </button>

                <!-- EDIT -->
                <button class="btn" title=">>> Currently just remixes the deck (ie. it creates a copy instead of editing the original. I'm working on it!)" on:click={editDeck}>
                    <Icon name='edit' class='header-btn-icon' strokeWidth='0' solid={true} />    
                    <span>Edit Deck</span>
                </button>
            
            <!-- Normal deck buttons -->
            {:else}
                <!-- Export as TXT -->
                <button class="btn" title="Save decklist as Text file to import it somewhere else &#013;>>> Currently does nothing :)" disabled={true}>
                    <Icon name='export-file' class='header-btn-icon' strokeWidth='0' solid={true}/>
                    <span>Export as TXT</span>
                </button>

                <!-- Remix -->
                <button class="btn" on:click={editDeck} title="Edit this deck and create a new one!">
                    <Icon name='remix' class='header-btn-icon' strokeWidth='2' />                         
                    <span>Remix</span>
                </button>

                <!-- Bookmark -->
                <button class="btn" title="Bookmark this deck&#013;Must be logged in to user this feature" disabled={!$currentUser}>
                    <Icon name='bookmark' class='header-btn-icon' strokeWidth='2' />
                    <span>Bookmark</span>
                </button>
            {/if}
        </div>
    </div>
</div>

<div class="header-divider">

</div>

