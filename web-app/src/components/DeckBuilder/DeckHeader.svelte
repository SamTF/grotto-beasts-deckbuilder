<!-- JS -->
<script>
    // Imports
    import { page } from '$app/stores'
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'
    import { pb, currentUser } from '$lib/pocketbase.js'
    import { decklistAdvance, deckTags } from '$lib/stores/decklist'
    import { publishUser } from '$lib/stores/publishUser'
    import Icon from '$components/UI/Icon.svelte'
    import Popup from '$components/UI/Popups/Popup.svelte'
    import PopupPublishUser from '$components/UI/Popups/PopupPublishUser.svelte'
    import PopupTags from '$components/UI/Popups/PopupTags.svelte'
    import { openModal } from 'svelte-modals'
    import Checkbox from '$components/UI/Checkbox.svelte'
    import toast from 'svelte-french-toast'
    import Meta from '$components/Meta/Meta.svelte'
    
    // Deck Info
    let deckInfo = {
        name: '',
        // author: '',
        author: $currentUser ? $currentUser.username : 'Guest User',
        tags: [],
        patched: false
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
    $: deckInfo.tags = $deckTags

    // Save/Load decklist data to/from Session Storage
    onMount(() => {
        // let store = window.sessionStorage.getItem("decklist")
        // https://dev.to/danawoodman/svelte-quick-tip-connect-a-store-to-local-storage-4idi
        let store = localStorage.deckInfo

        if (store) {
            deckInfo = JSON.parse(store)
            $deckTags = deckInfo.tags
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
        const deckSize = decklistAdvance.deckSize($decklistAdvance)
        if (decklistAdvance.sum($decklistAdvance) != deckSize || decklistAdvance.challenger($decklistAdvance) != 1) {
            openModal(Popup, {title: 'Invalid Deck D:', message: `Your deck must have exactly ${deckSize} cards + 1 Challenger`})
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
        if (deckInfo.name == '') {
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
        let challenger = $decklistAdvance.find(x => x.type === 'Challenger')

        const res = await fetch(`/api/card/${challenger.number}`)
        const c = await res.json()

        // If using a Patched Challenger, fetch the original version of that Challenger
        if (challenger.collectionName != 'cards') {
            const res = await fetch(`/api/card/${challenger.number}`)
            challenger = await res.json()
        }

        // Try to POST the deck data to pocketbase
        try {
            const data = {
                name: deckInfo.name,
                author: $currentUser ? $currentUser.id : '000000000000000', // use logged in user id if available, otherwise use guest user id
                challenger: challenger.id,
                cards_json: JSON.stringify({deck: deck}),
                tags: deckInfo.tags,
                author_name: deckInfo.author,
                remix: deckInfo.remix || false,
                remix_of: deckInfo.remix_of || '',
                version: deckInfo.patched ? 'digital' : 'original',
            }

            // edit deck instead of posting new one if in edit mode
            if (deckInfo.edit == true) {
                const updatedRecord = await pb.collection('decks').update(deckInfo.deckID, {
                    name: deckInfo.name,
                    challenger: challenger.id,
                    cards_json: JSON.stringify({deck: deck}),
                    tags: deckInfo.tags,
                    version: deckInfo.patched ? 'digital' : 'original',
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
                deckID: '',
                patched: false
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

    // Update cards when version changes
    let x = 0
    // $: version, x++, testFunc()
    $: version = deckInfo.patched

    const onVersionSwitched = async () => {
        toast.success(`Switching game version to ${version ? 'Digital' : 'Original'}`)

        await toggleDeckVersion()
    }

    // Reset decklist store and local storage
    const resetDecklist = () => {
        decklistAdvance.reset()
        localStorage.setItem("decklist", JSON.stringify($decklistAdvance))
        setTimeout(() => location.reload(), '400')
    }

    const toggleDeckVersion = async () => {
        let res = await fetch('/api/cards')
        let allCards = await res.json()

        let newCards = []
        $decklistAdvance.forEach(card => {
            // 
        });

        const deckCardIds = Array.from($decklistAdvance, x => x.number)

        // filter all cards to only cards present in deck, and add their quantity
        // fetch correct version of cards depending on deck game version
        let fullCards = deckInfo.patched == false ? 
            allCards.original.filter(x => deckCardIds.includes(x.number))
            : allCards.patched.filter(x => deckCardIds.includes(x.number))

        // set the quantity value of each card
        for (let i = 0; i < fullCards.length; i++) {
            const element = fullCards[i];
            element.quantity = $decklistAdvance.find(x => x.number == element.number).quantity
        }

        decklistAdvance.set(fullCards)
        localStorage.setItem("decklist", JSON.stringify($decklistAdvance))
        setTimeout(() => location.reload(), '400')
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

<!-- METADATA -->
<Meta title={'Deck Builder'} description={'Build your own Grotto Beasts deck!'} />

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
                    maxlength="20"
                >
            </div>
            
            <ul class="deck-tags">
                {#each $deckTags as tag}
                    <li>{tag}</li>
                {/each}
                <button on:click={() => openModal(PopupTags)}>Edit Tags</button>
            </ul>

            <!-- Version -->
            <div class="header-bottom-line" title="Which version of Grotto Beasts this deck was built for">
                {#if !deckInfo.patched}
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
            </div>
        </div>

        <div class="header-btns">
            <!-- Upload Deck -->
            <a href="/create/import" class="btn">
                <Icon name='import' strokeWidth=0 solid={true}/>
                <span>Import Decklist</span>
            </a>

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

<div class="header-divider-alt">
    <div class="test">
        <span class="icon-original">Original</span>
        <Checkbox bind:checked={ deckInfo.patched } onClick={onVersionSwitched} />
        <span class="icon-digital">Digital</span>
    </div>
</div>

<style>
    .header-divider-alt {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .test {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;

        font-weight: bold;
    }
    .remix, .header-bottom-line {
        margin-top: 1rem;
        color: var(--colour-blue-dark);
        font-weight: 700;
        /* opacity: 0.75; */

        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
</style>