<!-- JS -->
<script>
    // Imports
    import { page } from '$app/stores'
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'
    import { pb, currentUser } from '$lib/pocketbase.js'
    import { decklistAdvance } from '$lib/stores/decklist'
    import { publishUser } from '$lib/stores/publishUser'
    import Icon from '../UI/Icon.svelte'
    import Popup from '$components/UI/Popups/Popup.svelte'
    import PopupPublishUser from '$components/UI/Popups/PopupPublishUser.svelte'
    import { openModal } from 'svelte-modals'
    
    // Deck Info
    let deckInfo = {
        name: '',
        // author: '',
        author: $currentUser ? $currentUser.username : 'Guest User',
        tags: []
    }

    // DECK NAME: Allow only alphanumeric character and spaces, but remove extra spaces later
    $: if (deckInfo.name.length > 1) {
        deckInfo.name = deckInfo.name
            .replace(/[^a-z0-9\ ]/gi, '')
    }
    // AUTHOR NAME: Allow only Alphanumeric characters
    $: if (deckInfo.author.length > 1) {
        deckInfo.author = deckInfo.author
            .replace(/[^a-z0-9]/gi, '')
    }

    // automatically set username to logged in user
    $: if ($currentUser) deckInfo.author = $currentUser.username

    // Save/Load deck metadata to local storage
    let saveStore = false
    $: if (deckInfo && saveStore) {
        sessionStorage.setItem("deckInfo", JSON.stringify(deckInfo))
        localStorage.setItem("deckInfo", JSON.stringify(deckInfo))
    }

    // Save/Load decklist data to/from Session Storage
    onMount(() => {
        // let store = window.sessionStorage.getItem("decklist")
        // https://dev.to/danawoodman/svelte-quick-tip-connect-a-store-to-local-storage-4idi
        let store = localStorage.deckInfo

        if (store) {
            deckInfo = JSON.parse(store)
        }

        saveStore = true

        // auto-fill username if user is logged in
        if ($currentUser) deckInfo.author = $currentUser.username

        // guest or login
        $publishUser = localStorage.deckPublishUser || ''
    })

    // Upload Deck
    const uploadDeck = async () => {
        // validate that deck is in correct format
        if (decklistAdvance.sum($decklistAdvance) != 40 || decklistAdvance.challenger($decklistAdvance) != 1) {
            openModal(Popup, {title: 'Invalid Deck D:', message: 'Your deck must have exactly 40 cards + 1 Challenger'})
            return
        }

        // check if user is logged in (or publishing as a guest)
        if (!$currentUser && $publishUser != 'guest') {
            // openModal(Popup, {title: 'Not Logged In :P', message: 'You must be logged in before you can publish a deck'})
            openModal(PopupPublishUser)

            console.log('deck header user: ', $publishUser)

            if($publishUser != 'guest') {
                return
            }
            // const publishUser = localStorage.getItem('deckPublishUser')
            // console.log(publishUser)
            // if(localStorage.getItem('deckPublishUser') != 'guest') {
            //     return
            // }
        }

        // remove extra spaces from deck name
        deckInfo.name.replace(/\s+/g,' ').trim()

        // validate deck and user name
        if (deckInfo.name == '' || deckInfo.author == '') {
            // alert("Don't forget to give the deck a name :)")
            openModal(Popup, {title: 'Invalid Name :s', message: "Don't forget to give the deck a name :)"})
            return
        }

        // format the simplified deck
        let deck = $decklistAdvance.map(x => { 
            return {id: x.number, name: x.name, type: x.type, quantity: x.quantity}
        })

        // sort the simplified deck by card number
        deck = deck.sort((a, b) => a.id > b.id)

        // get ID of challenger
        const challengerID = $decklistAdvance.find(x => x.type === 'Challenger').id

        // Try to POST the deck data to pocketbase
        try {
            const data = {
                name: deckInfo.name,
                author: $currentUser ? $currentUser.id : '000000000000000', // use logged in user id if available, otherwise use guest user id
                challenger: challengerID,
                cards_json: JSON.stringify({deck: deck}),
                tags: [],
                author_name: deckInfo.author
            }

            // edit deck instead of posting new one if in edit mode
            if (deckInfo.edit == true) {
                console.log("EDIT MODE!! \nEDIT MODE EDMOEMOEMOE!!!")
                const updatedRecord = await pb.collection('decks').update(deckInfo.deckID, {
                    name: deckInfo.name,
                    challenger: challengerID,
                    cards_json: JSON.stringify({deck: deck}), 
                })
            }
            // otherwise create a new deck
            else {
                const newRecord = await pb.collection('decks').create(data);
            }
            

            // Reset local storage
            deckInfo = {
                name: '',
                author: '',
                tags: [],
                edit: false,
                deckID: ''
            }

            decklistAdvance.reset()
            localStorage.setItem("decklist", JSON.stringify($decklistAdvance))
            localStorage.setItem('deckPublishUser', '')

            // show upload confirmaton via popup
            openModal(Popup, { title: 'Deck uploaded successfully!', icon: 'sparkles' })

            // redirect after 2 seconds
            // setTimeout(() => goto('/decks'), '2000')

            // redirect instantly
            goto('/decks')
        } catch (error) {
            console.error(error)
            openModal(Popup, { title: 'An error occured :(', message: 'Try again I guess ^^"' })
        }
    }
</script>

<!-- HTML -->
<div class="deck-builder-header">
    <div class="deck-data-container">
        <div class="info-container">
            <div class="deck-author">
                <!-- <input
                    type="text" 
                    class="input-deck-author"
                    placeholder="Enter your username..."
                    bind:value={deckInfo.author}
                    pattern="[a-zA-Z0-9]*"
                    title="Only letters and numbers allowed (for now)&#013;Automatically set to your Discord username if logged in!"
                    readonly={$currentUser}
                > -->
                <p class="deck-author">{$currentUser ? $currentUser.username : 'Guest User'}</p>
            </div>

            <div class="deck-name">
                <input 
                    type="text" 
                    class="deck-name input-deck-name" 
                    placeholder="Enter deck name..." 
                    bind:value={deckInfo.name}
                    title="Only letters, numbers, and spaces allowed (for now)"
                >
            </div>
            
            <ul class="deck-tags">
                <!-- {#each deckInfo.tags as tag}
                    <li><a href={$page.url.pathname}>{tag}</a></li>
                {/each} -->
                <li><a href={$page.url.pathname}>＋ Add tag</a></li>
            </ul>
        </div>

        <div class="header-btns">
            <!-- Edit Deck -->
            <a href="/create/decklist" class="btn">
                {#if decklistAdvance.sum($decklistAdvance) < 30}
                    <Icon name='plus' class='header-btn-icon' strokeWidth='2' />                 
                    <span>Add Cards</span>
                {:else}
                    <Icon name='edit' class='header-btn-icon' strokeWidth='0' solid={true} />                 
                    <span>Edit Deck</span>
                {/if}
            </a>

            <!-- Upload Deck -->
            <button class="btn" on:click={uploadDeck}>
                <Icon name='upload' strokeWidth=2/>
                <span>Publish Deck</span>
            </button>
        </div>
    </div>
</div>

<div class="header-divider-alt"></div>