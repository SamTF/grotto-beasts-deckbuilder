<!-- JS -->
<script>
    // Imports
    import { page } from '$app/stores'
    import { currentUser, pb } from '$lib/pocketbase.js'
    import { decklistAdvance } from '$lib/stores/decklist'
    import { goto } from '$app/navigation'
    import Icon from '$components/UI/Icon.svelte'
    import { openModal, closeModal } from 'svelte-modals'
    import Popup from '$components/UI/Popups/Popup.svelte'
    import PopupDeleteDeck from '$components/UI/Popups/PopupDeleteDeck.svelte'
    import PopupExport from '$components/UI/Popups/PopupExport.svelte'
    import toast from 'svelte-french-toast'
    
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
        openModal(PopupDeleteDeck, { deckID: deck.id })
    }

    const bookmarkDeck = async () => {
        try {
            const data = await pb.collection('users').getOne($currentUser.id)
            const bookmarks = [...data.bookmarks, deck.id]
            const update = await pb.collection('users').update($currentUser.id, {
                bookmarks: bookmarks
            })
            openModal(Popup, { title: 'Deck bookmarked', icon: 'sparkles' })
            toast.success('Deck successfully bookmarked!')
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
            toast.success('Deck removed from bookmarks')
        } catch (error) {
            openModal(Popup, { title: 'Error x(', message: error })
        }
    }

    // Open the export options modal
    const exportDeck = async () => {
        openModal(PopupExport, { deckID: deck.id, deckName: name })
    }

    // Fetch deck code and copy to clipboard
    const exportCode = async () => {
        const res = await fetch(`/api/export/tts/${deck.id}`)
        let deckcode = await res.text()

        console.log(deckcode)

        await navigator.clipboard.writeText(deckcode);

        toast.success(`${deckcode} copied to your clipboard!`)

        closeModal()
    }

    // Game version hint text
    const gameVersionHint = (original = true) => {
        let _original = {
            icon: '🐱',
            text: 'This deck was created for the original IRL version of GB - aka the "vintage" version',
        }

        let _digital = {
            icon: '🤖',
            text: 'This deck was created for the digital Tabletop Simulator version of GB - aka the "modern" version',
        }

        let msg = original ? _original : _digital

        toast.success(
            msg.text,
            {
                icon: msg.icon,
                duration: 5000
            }
        )
    }
</script>

<!-- HTML -->
<div class="deck-header">
    <div class="deck-data-container">
        <div class="info-container">
            <a href={`/user/${author}`} class="deck-author">{author}</a>
            <h1 class="deck-name">{name}</h1>
            
            <ul class="deck-tags">
                {#each tags as tag}
                    <li>{tag}</li>
                {/each}
            </ul>

            {#if deck.remix}
                <div class="remix">
                    <p>Remix of <a href={`${deck.remix_of}`} data-sveltekit-reload>{deck.remix_of}</a></p>
                </div>
            {/if}


            <!-- Game Version -->
            <div class="header-bottom-line" title="Which version of Grotto Beasts this deck was built for">
                {#if deck.version == 'original' || deck.version == ''}
                    <!-- Original -->
                    <button class="highlight-bubble" on:click={gameVersionHint}>
                        <span>Original</span>
                        <img src="/images/emotes/meowdy.png" alt="original" height="16">
                    </button>
                {:else}
                    <!-- Digital -->
                    <button class="highlight-bubble-alt" on:click={() => {gameVersionHint(false)}}>
                        <span>Digital</span>
                        <img src="/images/icons/robot.svg" alt="digital" height="16">
                    </button>
                {/if}

                <!-- TTS Deck Code -->
                <button class="highlight-bubble-alt" on:click={exportCode} title="Copy TTS Deck Code to your clipboard">
                    <Icon name='copy' class='deck-code-icon' strokeWidth='2' solid={false}/>
                    <span>TTS Deck Code</span>
                </button>
            </div>
        </div>

        <!-- Special Controls for the deck author -->
        <div class="header-btns">
            {#if userCreatedThisDeck}
                <!-- Export as TXT -->
                <button class="btn" title="Save decklist as Text file to import it somewhere else" on:click={exportDeck}>
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
                <button class="btn" title="Save decklist as Text file to import it somewhere else" on:click={exportDeck}>
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
    .remix, .header-bottom-line {
        margin-top: 1rem;
        color: var(--colour-blue-dark);
        font-weight: 700;
        /* opacity: 0.75; */

        display: flex;
        align-items: center;
        gap: 0.5rem;
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