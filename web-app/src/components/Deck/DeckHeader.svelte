<!-- JS -->
<script>
    // Imports
    import { page } from '$app/stores'
    import { currentUser, pb } from '$lib/pocketbase.js'
    import { decklistAdvance } from '$lib/stores/decklist'
    import { goto } from '$app/navigation'
    import Icon from '../UI/Icon.svelte'
    import { openModal } from 'svelte-modals'
    import Popup from '$components/UI/Popups/Popup.svelte'
    
    // Props
    export let author, name, tags, authorID, fullCards
    export let deck

    // whether this deck was created by the current authenticated user
    const userCreatedThisDeck = $currentUser ? authorID == $currentUser.id : false

    // whether the user bookmarked this deck
    $: deckIsBookmarked = $currentUser ? $currentUser.bookmarks.includes(deck.id) : ''

    const remixDeck = () => {
        decklistAdvance.set(fullCards)
        localStorage.setItem("decklist", JSON.stringify($decklistAdvance))
        localStorage.setItem("deckInfo", JSON.stringify({ 
            name: `${name} Remix`,
            author,
            tags,
            remix: true,
            remix_of: deck.id
        }))

        goto(`/create/deck?remix=${deck.id}`)
    }

    const editDeck = () => {
        decklistAdvance.set(fullCards)
        localStorage.setItem("decklist", JSON.stringify($decklistAdvance))
        localStorage.setItem("deckInfo", JSON.stringify({ 
            name,
            author,
            tags,
            edit: true,
            deckID: deck.id
        }))

        goto(`/create/deck?edit=${deck.id}`)
    }

    const deleteDeck = async () => {
        try {
            const data = await pb.collection('decks').delete(deck.id)
            console.log(data)
            openModal(Popup, { title: 'Deck successfully deleted', icon: 'sparkles' })
            goto('/decks')
        } catch (error) {
            openModal(Popup, { title: 'Error x(', message: error })
        }
    }

    const bookmarkDeck = async () => {
        try {
            const data = await pb.collection('users').getOne($currentUser.id)
            console.log(data.bookmarks)
            const bookmarks = [...data.bookmarks, deck.id]
            console.log(bookmarks)
            const update = await pb.collection('users').update($currentUser.id, {
                bookmarks: bookmarks
            })
            console.log(data)
            openModal(Popup, { title: 'Deck bookmarked', icon: 'sparkles' })
        } catch (error) {
            openModal(Popup, { title: 'Error x(', message: error })
        }
    }

    const unbookmarkDeck = async () => {
        try {
            const index = $currentUser.bookmarks.indexOf(deck.id)
            const bookmarks = $currentUser.bookmarks.filter(item => item !== deck.id)

            const update = await pb.collection('users').update($currentUser.id, {
                bookmarks: bookmarks
            })

            openModal(Popup, { title: 'Deck removed from bookmarks', icon: 'sparkles' })
        } catch (error) {
            openModal(Popup, { title: 'Error x(', message: error })
        }
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

            {#if deck.remix}
                <div class="remix">
                    <p>Remix of <a href={`${deck.remix_of}`} data-sveltekit-reload>{deck.remix_of}</a></p>
                </div>
            {/if}
        </div>

        <!-- Special Controls for the deck author -->
        <div class="header-btns">
            {#if userCreatedThisDeck}
                <!-- Export as TXT -->
                <button class="btn" title="Save decklist as Text file to import it somewhere else &#013;>>> Currently does nothing :)" disabled={true}>
                    <Icon name='export-file' class='header-btn-icon' strokeWidth='0' solid={true}/>
                    <span>Export</span>
                </button>

                <!-- DELETE -->
                <!-- <form action="?/delete" method="POST"> -->
                <button class="btn" title="Delete this deck from the database. No take backsies!" on:click={deleteDeck}>
                    <Icon name='trash' class='header-btn-icon' strokeWidth='0' solid={true} />
                    <span>Delete Deck</span>
                </button>
                <!-- </form> -->

                <!-- EDIT -->
                <button class="btn" title="Update your deck and publish changes" on:click={editDeck}>
                    <Icon name='edit' class='header-btn-icon' strokeWidth='0' solid={true} />    
                    <span>Edit Deck</span>
                </button>
            
            <!-- Normal deck buttons -->
            {:else}
                <!-- Export as TXT -->
                <button class="btn" title="Save decklist as Text file to import it somewhere else &#013;>>> Currently does nothing :)" disabled={true}>
                    <Icon name='export-file' class='header-btn-icon' strokeWidth='0' solid={true}/>
                    <span>Export</span>
                </button>

                <!-- Remix -->
                <button class="btn" on:click={remixDeck} title="Edit this deck and create a new one!">
                    <Icon name='remix' class='header-btn-icon' strokeWidth='2' />                         
                    <span>Remix</span>
                </button>

                <!-- Bookmark -->
                {#key deckIsBookmarked}
                {#if deckIsBookmarked}
                    <button class="btn" title="Bookmark this deck&#013;Must be logged in to user this feature" disabled={!$currentUser} on:click={unbookmarkDeck}>
                        <Icon name='bookmark' class='header-btn-icon' strokeWidth='2' solid={true} colour='gold'/>
                        <span>Remove Bookmark</span>
                    </button>
                {:else}
                    <button class="btn" title="Bookmark this deck&#013;Must be logged in to user this feature" disabled={!$currentUser} on:click={bookmarkDeck}>
                        <Icon name='bookmark' class='header-btn-icon' strokeWidth='2' />
                        <span>Bookmark</span>
                    </button>
                {/if}
                {/key}
            {/if}
        </div>
    </div>
</div>

<div class="header-divider"></div>

<style>
    .remix {
        margin-top: 1rem;
        color: var(--colour-blue-dark);
        font-weight: 700;
        opacity: 0.75;
    }

    .remix a {
        margin-left: 0.25rem;
        padding: 0.25rem 0.5rem;

        border-radius: 1rem;
        background-color: rgba(255, 255, 255, 0.5);
    }

    .remix a:hover {
        background-color: var(--colour-blue-dark);
        color: white;
        opacity: 1;
    }
</style>