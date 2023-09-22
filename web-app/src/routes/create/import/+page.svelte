<!-- JS -->
<script>
    // Imports
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'
    import { decklistAdvance } from '$lib/stores/decklist'
    import { cardList } from '$lib/cardList'
    import Icon from '$components/UI/Icon.svelte'

    // API data
    export let data

    // User decklist input
    let decklist = ""

    // IMPORRRTTT
    const importDecklist = () => {
        // 1. split input by new lines
        const result = decklist.split(/\r?\n/);
        console.log(result)
        
        // 2. seperate number and card name + remove empty first item
        // let cards = result.map((x) => x.split(/(\d+)/).slice(1, 3))
        let cards = result.map((x) => x.split(/(\d+\s+)/).slice(1, 3))

        // 3. filter out empty items and items without card names
        cards = cards.filter(x => x.length == 2 && x[1].trim() != '')

        // 4. trim card names
        cards = cards.map(x => [x[0], x[1].trim()])
        console.log(cards)

        // 5. filter out cards that don't exist
        cards = cards.filter(x => {
            if (cardList.some(e => e.name.toLowerCase() === x[1].toLowerCase())) {
                return x
            }
        })
        console.log(cards)

        // 6. format the correct array of cards as an array of objects
        let final = cards.map((x) => {
            let quantity = x[0]
            let cardName = x[1].trim()

            // Full version in PB format
            let card = data.cards.find(x => x.name.toLowerCase() == cardName.toLowerCase())
            card.quantity = parseInt(quantity)
            return card

            // Simplified version
            // let card = cardList.find(x => x.name.toLowerCase() == cardName.toLowerCase())

            // return {
            //     id: card.number,
            //     number: card.number,
            //     name: cardName,
            //     type: card.type,
            //     quantity: parseInt(quantity)
            // }
        })

        console.log(final)

        $decklistAdvance = final
        localStorage.setItem("decklist", JSON.stringify($decklistAdvance))
        goto('/create/deck/')
    }

    // IMPORT DECK CODE
    const importDeckcode = async (deckcode) => {
        // decode into json decklist
        const res = await fetch(`/api/import/tts/${deckcode}`)
        let cards = await res.json()

        console.log(cards)

        // format the correct array of cards as an array of objects
        let final = cards.map((card) => {
            // Full version in PB format
            let fullCard = data.cards.find(x => x.number == card.id)
            fullCard.quantity = card.quantity
            return fullCard
        })

        $decklistAdvance = final
        localStorage.setItem("decklist", JSON.stringify($decklistAdvance))
        goto('/create/deck/')
    }

    // Parse Import Input to check whether it's a decklist or deck code
    const parseInput = () => {
        const result = decklist.split(/\r?\n/);

        // TTS Deck Code
        if (result.length == 1 && decklist.startsWith('GB')) {
            importDeckcode(decklist)
        }
        // Text Decklist
        else {
            importDecklist()
        }
    }
</script>

<!-- HTML -->
<div class="header-divider-alt"></div>

<div class="center">
    <div class="panel">
        <h1>Import Decklist</h1>

        <p>Paste a <b>text decklist</b> or a <b>TTS deck code</b> in the format shown.</p>

        <textarea name="decklist-import" id="decklist-import" placeholder="Example decklist:
        1 Jerma
        2 Brightlight Casino
        1 Fossil Ridge
        2 Batter Up!
        3 Bonus Luck
        2 Surprise Snack
        3 Crabcha
        2 Festive Mimic
        1 Hydraxolotl&#13;
        
        Example TTS deck code:
        GBv7i22i5j6i11j1i4j1l11l15j8j4j12j9l10j14i4j15l8j24l8j
        "
        spellcheck="false"
        bind:value={decklist}></textarea>

        <button class="btn" on:click={parseInput}>
            <span>Import</span>
        </button>
    </div>
</div>


<div class="deck-stats-bar"></div>

<style>
    h1 {
        margin: 1rem 0;
        /* font-size: 1.25rem; */
        font-weight: 900;
        color: var(--colour-red);
        letter-spacing: 2px;
    }
    textarea {
        max-width: 80vw;
        min-width: 30ch;
        width: 30ch;
        height: 40rem;

        padding: 1rem;
        margin-bottom: 2rem;

        /* font-family: 'Alegreya Sans', 'Roboto', sans-serif; */
        font-weight: 700;
        font-size: 1.25rem;

        border-radius: 8px;
        background-color: var(--colour-light);
        border: none;

        white-space: pre-line;
        resize: none;
    }
    button {
        font-size: 2rem;
        width: 100%;
        margin-bottom: 2rem;
    }
</style>