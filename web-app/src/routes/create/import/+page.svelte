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

    onMount(() => {
        console.log(cardList)
        console.log(data)
    })
</script>

<!-- HTML -->
<div class="header-divider-alt"></div>

<div class="center">
    <div class="panel">
        <h1>Import Decklist</h1>

        <p>Paste a decklist in the format shown.</p>

        <textarea name="decklist-import" id="decklist-import" placeholder="Example decklist...
        1 Jerma
        1 The Big Baker
        2 Brightlight Casino
        1 Fossil Ridge
        2 Sportball Stadium
        1 Sunspring Field
        2 Batter Up!
        3 Bonus Luck
        3 Dunk Tank
        2 Reckless Offroading
        2 Surprise Snack
        2 Try Another!
        2 Birthday Basher
        3 Crabcha
        2 Festive Mimic
        1 Hydraxolotl
        2 Jukeboxer
        3 Mr. Anycard
        2 Poñata
        3 Sweet Tooth
        2 Weeniemutt &#13;"
        spellcheck="false"
        bind:value={decklist}></textarea>

        <button class="btn" on:click={importDecklist}>
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