<!-- JS -->
<script>
    // Imports
    import { page } from '$app/stores'
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { pb } from '$lib/pocketbase.js'
    import { decklistAdvance } from '$lib/stores/decklist'
    
    // Deck Info
    let deckInfo = {
        name: '',
        author: '',
        tags: ['+ Add tag...']
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
        console.log("STORE:")
        console.log(store)

        if (store) {
            deckInfo = JSON.parse(store)
        }

        saveStore = true
    })

    // Upload Deck
    const uploadDeck = async () => {
        // validate that deck is in correct format
        if (decklistAdvance.sum($decklistAdvance) != 40 || decklistAdvance.challenger($decklistAdvance) != 1) {
            alert("Your deck must have exactly 40 cards PLUS 1 Challenger!")
            return
        }

        // remove extra spaces from deck name
        deckInfo.name.replace(/\s+/g,' ').trim()

        // format the simplified deck
        const deck = $decklistAdvance.map(x => { 
            return {id: x.number, name: x.name, type: x.type, quantity: x.quantity}
        })

        // get ID of challenger
        const challengerID = $decklistAdvance.find(x => x.type === 'Challenger').id

        // Try to POST the deck data to pocketbase
        try {
            const data = {
                name: deckInfo.name,
                author: '000000000000000',
                challenger: challengerID,
                cards_json: JSON.stringify({deck: deck}),
                tags: ['Grotto Tribal', 'Coin Flipping'],
            }

            const newRecord = await pb.collection('decks').create(data);

            // Reset local storage
            deckInfo = {
                name: '',
                author: '',
                tags: ['+ Add tag...']
            }

            decklistAdvance.reset()
            localStorage.setItem("decklist", JSON.stringify($decklistAdvance))

            goto('/decks')
        } catch (error) {
            console.error(error)
        }
        
    }
</script>

<!-- HTML -->
<div class="deck-header">
    <div class="deck-builder-header">
        <div class="info-container">
            <div class="deck-author">
                <input
                    type="text" 
                    class="input-deck-author"
                    placeholder="Enter your username..."
                    bind:value={deckInfo.author}
                    pattern="[a-zA-Z0-9]*"
                    title="Only letters and numbers allowed (for now)"
                >
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
                {#each deckInfo.tags as tag}
                    <li><a href={$page.url.pathname}>{tag}</a></li>
                {/each}
            </ul>
        </div>

        <div class="header-btns">
            <a href="/create/decklist" class="btn btn-add-cards">
                <span>＋</span>
                <span>add cards</span>
            </a>
            <button class="btn btn-save-deck" on:click={uploadDeck}>
                <span>💾</span>
                <span>Publish Deck</span>
            </button>
            <!-- <button class="btn">🌐 Publish Deck</button> -->
        </div>
    </div>
</div>

<div class="header-divider">

</div>

