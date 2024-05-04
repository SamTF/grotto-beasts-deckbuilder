<!-- JS -->
<script>
    // Imports
    import DeckHeader from "$components/Deck/DeckHeader.svelte"
    import { CardTypes, countCardType } from "$lib/cardUtils"
    import { delay } from "$lib/utils"
    import { fade } from "svelte/transition"
    import toast from 'svelte-french-toast'

    // drag and drop
    import {flip} from "svelte/animate"
    import {dndzone} from "svelte-dnd-action"
    
    // Props
    export let data

    // Create a deck from the given cards and their respective quantity
    const populateDeck = (cards) => {
        let deck = []

        // loop over all cards and append them to the deck according to their quantity
        cards.forEach(c => {
            // ignore challengers
            if (c.type == "Challenger") {
                return
            }

            // append cards to deck
            for (let i = 0; i < c.quantity; i++) {
                // Create a new simplified card Object with a UUID
                const { number, name, type, imageURL, cost, power } = c
                const newCard = { number, name, type, imageURL, cost, power, id: Math.round(Math.random() * 1000) }
                
                // add card to deck
                deck.push(newCard)
            }
        })

        console.log(deck)

        // return the populated deck
        return deck
    }

    // Draw 8 random cards from the deck to create the starting hand
    const startingHand = (cards) => {
        let deck = [...cards]  // copy the value, otherwise JS passes the variable as a reference... smh my head
        let hand = []

        for (let i = 0; i < 8; i++) {
            // let card = deck[deck.length * Math.random() | 0]
            const i = Math.floor( Math.random() * (deck.length - 1));
            let card = deck[i]
            card.id = `${card.id}${Math.round(Math.random() * 100)}`

            // add card to hand
            hand.push(card)

            // remove card from deck
            deck.splice(i, 1)
        }

        // save the remaining cards in the deck to the "working deck"
        workingDeck = deck

        console.log("HAAAAND")
        console.log(hand)

        // return cards in hand
        return hand
    }

    // Selects or Deselects a clicked card
    const selectCard = (i) => {
        
        // Remove selected card from selection
        if (selectedCards.includes(i)) {
            selectedCards = selectedCards.filter(x => x != i)
        }

        // Add card to selection if not at maximum
        else {
            if (selectedCards.length < maxSelectedCards) {
                selectedCards.push(i)
            }
        }

        selectedCards.sort()
        selectedCards = [...selectedCards]
        console.log(selectedCards)
        console.log(selectedCards.length)

        hand=hand
    }

    // Remove selected cards from hand
    const discardSelection = async() => {
        // Check that maximum discards are not exceeded
        if (discards >= maxDiscards) {
            toast.error("You've already used all your discards! x(")
            return
        }
        // const numOfCards = maxCardsInHand - hand.length
        const numOfCards = selectedCards.length
        const cards = document.querySelectorAll('.playing-card');  

        // notification
        toast.success(`Discarding and re-drawing ${numOfCards} cards...`, {
            duration: 5000
        })

        // Instead of removing the card, make it invisible
        for (const i of selectedCards) {
            const cardToRemove = cards[i]
            // cardToRemove.style.visibility = 'hidden';
            cardToRemove.classList.add('fade-out')
        }

        // Wait 1 second
        await delay(500)

        // remove the selected cards from hand by index
        for (const i of selectedCards.reverse()) {
            console.log(i)
            hand.splice(i, 1);
        }
        
        // remove the fade out class
        for (const card of cards) {
            card.classList.remove('fade-out')
        }

        // update reactive vars
        hand = hand
        selectedCards = []
        discards++

        // Wait 1 second
        await delay(500)
        toast.success(`${maxDiscards - discards} discards remain`, {
            duration: 5000
        })

        console.log("CARDS TO DRAW: ")
        console.log(maxCardsInHand - hand.length)

        // Draw new cards to replace discarded ones
        for (let i = 0; i < numOfCards; i++) {
            drawCard()
            await delay(100)
        }

        hand = hand
        return
        
        // remove the selected cards from hand by index
        for (const i of selectedCards.reverse()) {
            console.log(i)
            hand.splice(i, 1);
        }

        // update reactive vars
        hand = hand
        selectedCards = []

        console.log(hand)

        // Wait 1 second
        await delay(500)

        for (let i = 0; i < numOfCards; i++) {
            drawCard()
            await delay(100)
        }

        hand = hand
    }

    // Add a new card to hand
    const drawCard = () => {
        // check if user hasn't exceeded maximum
        if (hand.length >+ maxCardsInHand) return
        
        // draw random card and add it to hand
        let card = workingDeck[workingDeck.length * Math.random() | 0]
        hand = [...hand, card]

        // remove that card from deck
        const index = workingDeck.findIndex(x => x.number === card.number)
        if (index !== -1) {
            workingDeck.splice(index, 1);
        }

        // update reactive values
        workingDeck = workingDeck
    }

    const playCards = async() => {
        // check that the current play is valid
        if (playedCards.length + selectedCards.length > maxPlayedCards) {
            toast.error("You can only play a maximum of 5 cards per round!")
            return
        }
        else if (selectedCards.length < 1) {
            toast.error("You must play at least 1 card, silly :)")
            return
        }

        // get info of selected cards
        let cards = hand.filter((card, i) => selectedCards.includes(i))
        cards = cards.map(card => ({...card, id: `${card.id}_${handsPlayed}_${discards}_${Math.random() * 100}`}))
        console.log(cards)

        // add them to the play area
        playedCards = [...playedCards, ...cards]
        console.log(playedCards)

        // Instead of removing the card, make it invisible
        const playingCards = document.querySelectorAll('.playing-card'); 
        for (const i of selectedCards) {
            const cardToRemove = playingCards[i]
            // cardToRemove.style.visibility = 'hidden';
            cardToRemove.classList.add('fade-out')
        }

        // Wait 1 second
        await delay(500)

        // remove the selected cards from hand by index
        for (const i of selectedCards.reverse()) {
            console.log(i)
            hand.splice(i, 1);
        }
        // remove the fade out class
        for (const card of playingCards) {
            card.classList.remove('fade-out')
        }

        // update reactive vars
        selectedCards = []
        hand = hand
        handsPlayed++
    }

    // Score Cards!
    const scoreCards = async() => {
        // Check if player has any hands left
        if (handsPlayed >= maxHands) {
            toast.error("Sorry buckeroo, you ran out of hands to play!")
            return
        }

        // init vars
        let totalScore = 0
        let totalMult = 0
        scoreHistory = []
        cardsScored = 0

        // Calculate the score, one card at a time
        for (let i = 0; i < playedCards.length; i++) {
            const card = playedCards[i];

            // SCORING BEASTS
            if (card.type == "Beast") {
                // card base stats
                let chips = card.cost
                let mult = card.power

                // multiply chips
                let multedChips = totalMult > 0 ? totalMult * chips : chips

                // increment score and mult
                totalScore += multedChips
                totalMult += mult

                console.log(`${card.name} -> +${chips} X${totalMult-mult}\nTotal Score: ${totalScore}\nTotal Mult: ${totalMult}`)
            }

            // SCORING WISHES
            else if (card.type == "Wish") {
                // increment score
                let chips = card.cost
                totalScore += chips

                console.log(`${card.name} -> +${chips}\nTotal Score: ${totalScore}\nTotal Mult: ${totalMult}`)
            }

            // SCORING GROTTOS
            else if (card.type == "Grotto") {
                // increment mult
                let mult = card.cost
                totalMult += mult

                console.log(`${card.name} -> X${mult}\nTotal Score: ${totalScore}\nTotal Mult: ${totalMult}`)
            }

            // Updating Sidebar UI
            handScore = totalScore
            if (scoreHistory.length >= 3) {scoreHistory.pop()}
            scoreHistory.unshift(playedCards[i].scorePreview)
            cardsScored++
            console.log(scoreHistory)

            // Wait
            await delay(500)
        }

        // Check if the score was enough to win
        challengerHpLost++

        // toast feedback
        toast.success(
            `Total Score: ${totalScore}\nTotal Mult: ${totalMult}`,
            {
                icon: '🐱',
                duration: 6000
            }
        )

        // Sidebar UI feedback
        handScore = totalScore

        // Increment hands played
        handsPlayed++
    }

    // Score Preview
    const scorePreview = (card) => {
        let chips = 0
        let mult = 0

        switch (card.type) {
            case 'Beast':
                chips = card.cost
                mult = card.power
                return `${chips} x${mult}`
            
            case 'Wish':
                chips = card.cost
                return `+${chips}`
            
            case 'Grotto':
                mult = card.cost
                return `x${mult}`
        
            default:
                break;
        }
    }

    // Score Preview Reactive
    const scorePreviewReactive = cards => {
        console.log("SCORE PREVIEW REACTIVE!!")
        let totalMult = 0

        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            let cardScorePreview = ''
            
            
            switch (card.type) {
                case 'Wish': {
                    let chips = card.cost
                    cardScorePreview = `+${chips}`
                    break
                }
                case 'Grotto': {
                    let mult = card.cost
                    totalMult += mult
                    cardScorePreview = `x${mult}`
                    break
                }
                case 'Beast': {
                    let chips = card.cost
                    let mult = card.power

                    // multiply chips
                    let multedChips = totalMult > 0 ? totalMult * chips : chips
                    cardScorePreview = totalMult > 0 ? `+${chips} x${totalMult}` : `+${chips}`
                    // cardScorePreview = `+${multedChips} +X${mult}`
                    totalMult += mult
                    break
                }

                default:
                    break;
            }

            console.log(totalMult)
            card.scorePreview = cardScorePreview
            console.log(card.scorePreview)
        }
    }

    // CONSTANTS
    const deck = populateDeck(data.fullCards)
    const maxCardsInHand = 8
    const maxSelectedCards = 5
    const maxDiscards = 3
    const maxHands = 3
    const maxPlayedCards = 5
    const challengerMaxHp = 3

    // Variables
    let workingDeck = [...deck]
    let hand = startingHand(deck)
    let selectedCards = []
    let playedCards = []
    let actualPlayedCards = []
    let discards = 0
    let handsPlayed = 0
    let handScore = 0
    let scoreHistory = []
    let cardsScored = 0
    let challengerHpLost = 0

    // Reactive Variables

    // SVELTE-DND-ACTION
    const flipDurationMs = 300;

    // DND Reactive Vars
    $: teamDropDisabled = playedCards.length >= maxPlayedCards ? true : false
    $: handDropDisabled = hand.length >= maxCardsInHand ? true : false
    $: handDragDisabled = selectedCards.length >= 1

    function dndPlayerTeamDrag(e) {
        console.log(e.detail.info)
        console.log("---------actual played cards--------")
        console.log(actualPlayedCards)

        if (!actualPlayedCards.some(card => card.id === e.detail.info.id)) {
            if (e.detail.info.trigger == "draggedEntered" && playedCards.length >= maxPlayedCards) {
                toast.error("Hold your horses, partner! Your Team is already maxxed out!", {icon: '🐱'})
            }
        }

        // update list of played cards
        playedCards = e.detail.items;
        console.log(playedCards)
    }

    function dndPlayerTeamDrop(e) {
        // ACTUALLY update the list of played cards for real
        playedCards = e.detail.items;
        actualPlayedCards = playedCards

        scorePreviewReactive(playedCards)
    }

    // DND Player Hand
    function dndPlayerHand(e) {
        const banana = e.detail.items
        hand = banana
        console.log(banana)
    }

    // test
    $: console.log(hand)
    $: console.log(selectedCards)
</script>

<!-- HTML -->
<!-- <DeckHeader name={data.deck.name} author={data.deck.expand.author.username} tags={data.deck.tags} authorID={data.deck.expand.author.id} fullCards={data.fullCards} deck={data.deck}/> -->

<div class="page-container center">
<div class="game-wrapper">

    <!-- UI Sidebar -->
    <div class="ui-sidebar">
        <!-- Challenger Info Box -->
        <div class="game-opponent-challenger">
            <div class="challenger-name"><p>Mr Greenz</p></div>

            <div class="challenger-avatar-container">
                <div class="challenger-pic" style={`background-image: url("images/cards/6. Mr. Greenz.webp");`}></div>
            </div>

            <div class="challenger-goal">
                <span class="goal-text">Goal:</span>
                <div class="goal-value-container">
                    <span class="goal-value">21</span>
                </div>
            </div>
        </div>

        <!-- Challenger Tenacity -->
        <div class="hands-discards-containers">
            <div class="ui-tenacity-container">
                <h2>Tenacity</h2>

                <div class="ui-hands-value">
                    {#each [...Array(challengerMaxHp).keys()] as x, i}
                        <span class:faded={i < challengerHpLost}>⚪</span>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Round Score -->
        <div class="round-score-container">
            <div class="round-score">
                {#if handScore > 0}
                    <div class="round-score-total">
                        <h1>{handScore}</h1>
                    </div>

                    <div class="round-score-history">
                        {#key cardsScored}
                        {#each scoreHistory as score}
                            <p>{score}</p>
                        {/each}
                        {/key}
                    </div> 
                {/if}
            </div>
        </div>

        <!-- Hands & Discards -->
        <div class="hands-discards-containers">
            <div class="ui-hands-container">
                <h2>Hands</h2>

                <div class="ui-hands-value">
                    {#each [...Array(maxHands).keys()] as x, i}
                        <span class:faded={i < handsPlayed}>⚪</span>
                    {/each}
                </div>
            </div>

            <div class="ui-discards-container">
                <h2>Discards</h2>

                <div class="ui-discards-value">
                    {#each [...Array(maxDiscards).keys()] as x, i}
                        <span class:faded={i < discards}>⚪</span>
                    {/each}
                </div>
            </div>
        </div>

    </div>

    <!-- Where the gaming takes place -->
    <div class="play-area" oncontextmenu="return false" on:contextmenu={() => selectedCards = []}>
        <!-- TEAM -->
        <div class="player-team-container">
            <!-- Played Cards -->
            <div class="player-team">
            <div
                class="player-team-grid"
                use:dndzone="{{
                    items: playedCards, 
                    flipDurationMs, 
                    // dropTargetStyle: {outline: 'rgba(0, 0, 0, 0) solid 2px'},
                    dropFromOthersDisabled: teamDropDisabled
                }}"
                on:consider="{dndPlayerTeamDrag}"
                on:finalize="{dndPlayerTeamDrop}"
                
            >
                {#each playedCards as item, i (item.id)}
                    <div class="card-image-small" animate:flip={{duration:flipDurationMs}}>
                        <!-- Card image -->
                        {#key cardsScored}
                        <img
                            src={item.imageURL.small}
                            alt={item.name}
                            class:selected={i+1 <= cardsScored}
                            title={i}
                        >

                        <!-- Score preview -->
                        <!-- A: Always Shown -->
                        <div class="score" class:selected-offset={i+1 <= cardsScored}>
                            <span>{item.scorePreview}</span>
                        </div>

                        <!-- B: Shows only when scored -->
                        <!-- {#if i+1 <= cardsScored}
                            <div class="score" class:selected-offset={i+1 <= cardsScored}>
                                <span>{item.scorePreview}</span>
                            </div>
                        {/if} -->
                        {/key}
                    </div>
                {/each}
            </div>
            </div>
        </div>
        
        <!-- The Players Hand & Their Deck -->
        <div class="hand-and-deck">
            <!-- The Player's Hand AND Buttons-->
            <div class="player-hand-and-btns">
                <!-- {#key hand} -->
                    <div
                        class="hand-container starting-hand"
                        use:dndzone="{{items: hand, flipDurationMs, dropFromOthersDisabled: handDropDisabled, dragDisabled: handDragDisabled}}"
                        on:consider="{dndPlayerHand}"
                        on:finalize="{dndPlayerHand}"
                    >
                        <!-- {#each items as card, i (card.id)} -->
                        {#each hand as card, i (`${card.id}_${Math.random() * 100}`)}
                        <div class="card-image-small playing-card" animate:flip={{duration:flipDurationMs}}>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <img
                                src={card.imageURL.small}
                                alt={card.name}
                                title={i}
                                on:click={() => selectCard(i)}
                                class:selected = {selectedCards.includes(i)}
                            >
                        </div>
                        {/each}
                    </div>
                <!-- {/key} -->

                <!-- Cards in hand -->
                <div class="cards-in-hand center">
                    <span>{hand.length} / 8</span>
                </div>

                <!-- The Play & Discard buttons -->
                <div class="hand-btns-container">
                    <div class="hand-btns">
                        <!-- Add Cards to play area -->
                        <!-- <button
                            class="play-btn"
                            on:click={playCards}
                            class:disabled={selectedCards < 1 || playedCards.length >= maxPlayedCards}
                        >Play</button> -->

                        <!-- Submit your play! -->
                        <button
                            class="play-btn"
                            on:click={scoreCards}
                            class:disabled={playedCards.length < 1}
                        >Score!</button>

                        <!-- Discard X cards and draw X cards from the deck -->
                        <button
                            class="play-btn"
                            on:click={discardSelection}
                            class:disabled={discards >= maxDiscards || selectedCards < 1}
                        >Discard</button>
                    </div>
                </div>
            </div>
            
            <!-- The Player's Deck -->
            <div class="blackjack-deck-container">
                <div class="card-image-small">
                    <img src="/images/cards/back.webp" alt="deck of cards">
                </div>

                <div class="cards-in-hand">
                    <span>{workingDeck.length} / 40</span>
                </div>
            </div>
        </div>

        
    </div>
</div>
</div>

<span class="fade-out"></span>


<!-- CSS -->
<style>
    .game-wrapper {
        display: grid;
        grid-template-columns: 1fr 6fr;
    }

    .play-area {
        width: 100%;
        display: grid;
        place-items: center;
    }
    
    .hand-and-deck {
        display: grid;
        grid-template-columns: 8fr 1fr;
        align-content: end;

        /* outline: 4px solid green;
        outline-style: dashed; */
        width: 95%;
        /* height: 50rem; */
    }

    .player-hand-and-btns {
        /* display: grid;
        place-items: center;
        gap: 0.5rem; */
        /* background-color: white; */
        display: grid;
        place-items: center;
    }

    .hand-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center !important;
        align-content: center;

        /* height: 15rem; */
        background-color: rgba(255, 255, 255, 0.375);
        width: 90%;
        border-radius: 1rem;
        padding: 8rem 0rem;
        margin-bottom: 0.5rem !important;
    }

    .hand-btns-container {
        display: grid;
        place-items: center;

        /* background-color: blueviolet; */
    }

    .hand-btns {
        /* background-color: aqua; */
        display: flex;
        justify-content: space-evenly;
        flex-direction: row;
        /* gap: 2rem; */

        width: 50rem;
    }

    .hand-btns button {
        /* size */
        width: 10rem;
        padding: 0.75rem 1.5rem;

        /* design */
        background-color: var(--colour-accent);
        outline: 4px solid var(--colour-dark);
        border-radius: 8px;

        /* font */
        font-family: var(--font-family);
        font-weight: bold;
        font-size: 2rem;
        color: white;

        /* animations */
        cursor: pointer;
        transition: all 200ms;
    }

    .hand-btns button:hover {
        transform: scale(1.25);
        filter: invert();
    }

    .blackjack-deck-container {
        display: grid;
        place-items: center;

        height: 18rem;
        background-color: rgba(255, 255, 255, 0.375);
        border-radius: 1rem;
        padding: 0 2rem;
    }

    .card-image-small {
        transition: transform 0.2s;
        opacity: 1;
        flex: 0 0 auto;
    }

    .card-image-small img {
        max-height: 200px;
        /* transition: transform 0.2s; */
        /* transition: all 500ms; */
    }

    .selected {
        outline: 2px solid gold;
        transform: translate(0, -3rem);
        -moz-transform: translate(0, -3rem);
        z-index: 10;
    }
    .selected-offset {
        transform: translate(0, -3rem);
        -moz-transform: translate(0, -3rem);
    }

    .cards-in-hand {
        margin-bottom: 0.5rem;

        font-size: 1.5rem;
        font-weight: bold;
    }

    .fade-out {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    .player-team-container {
        /* outline: 4px solid yellow;
        outline-style: dashed; */

        height: 24rem;
        width: 95%;

        display: grid;
        grid-template-columns: 8fr 1fr;
        place-items: center;
    }

    .player-team {
        display: grid;
        place-items: center;
        
        width: 60rem;
        height: 16rem;
        background-color: rgba(255, 255, 255, 0.375);
        border-radius: 1rem;
    }

    .player-team-grid {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        width: 100%;
        height: 100%;
        border-radius: 1rem;
    }

    
    .score {
        /* position */
        position: absolute;
        bottom: -2.25rem;
        left: 0;
        z-index: -1;
        
        /* display */
        display: grid;
        place-items: center;
        
        /* size */
        width: 100%;
        height: 3rem;
        
        /* font */
        font-size: 2rem;
        font-weight: 700;
        
        /* design */
        border-radius: 0 0 8px 8px;
        background-color: var(--colour-accent);
        box-shadow: inset 8px 8px 17px #d1ab48,
            inset -8px -8px 17px #ffe762;
    }
    
    .card-image-small {
        z-index: 10;
    }
    
    /* SIDEBAR */
    .ui-sidebar {
        /* display: grid; */
        /* place-items: center; */
        /* justify-items: center; */
        /* grid-template-rows: 1fr 1fr 1fr; */
        /* grid-auto-flow: row; */

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        height: 92.5dvh;
        width: 100%;

        background-color: #a34d9d;
    }

    .game-opponent-challenger {
        /* display: grid; */
        /* place-items: center; */
        display: flex;
        flex-direction: column;
        gap:0;

        margin-top: 1rem;
        width: 90%;
        height: 18rem;

        color: white;
        font-size: 2rem;
        font-weight: 900;
    }

    .challenger-name {
        display: grid;
        place-items: center;
        
        width: 100%;
        height: 3rem;

        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 1rem 1rem 0 0;
    }

    .challenger-avatar-container {
        display: grid;
        place-items: center;

        width: 100%;
        height: 60%;

        background-color: rgba(0, 0, 0, 0.2);
    }

    .challenger-pic {
        height: 10rem;
        width: 10rem;
        border-radius: 50%;

        background-size: 150%;
        background-position: center center;
    }

    .challenger-goal {
        display: grid;
        grid-template-columns: 2fr 3fr;
        
        width: 100%;
        height: 4rem;

        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 0 0 1rem 1rem;
    }

    .challenger-goal span {
        display: grid;
        place-items: center;
    }

    .challenger-goal .goal-text {
        font-weight: normal;
        justify-self: end;
    }

    .challenger-goal .goal-value-container {
        display: grid;
        place-items: center;
    }
    .challenger-goal .goal-value {
        width: 80%;
        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.5);
        
        font-weight: 700;
        font-size: 2rem;
    }

    .round-score-container {
        display: grid;
        place-items: center;

        height: 10rem;
        width: 90%;
        
        color: white;
        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .round-score {
        display: grid;
        grid-auto-flow: row;
        grid-template-rows: 2fr 3fr;

        justify-items: center;
        align-items: start;

        width: 100%;
        height: 100%;
    }

    .round-score-total {
        display: grid;
        place-items: center;

        width: 100%;
        height: 100%;

        background: #00000052;
        border-radius: 1rem 1rem 0 0;
    }

    .round-score h1 {
        font-size: 4rem;
        color: var(--colour-accent);
        line-height: 3rem;
    }

    .round-score-history {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        height: 100%;
        width: 100%;

        font-size: 1.25rem;
    }

    .round-score-history p:first-child {
        font-weight: 700;
        opacity: 1;
    }

    .round-score-history p {
        opacity: 0.75;
    }

    .hands-discards-containers {
        display: grid;
        grid-auto-flow: row;
        justify-items: center;
        gap: 1rem;

        width: 90%;
    }

    .ui-hands-container, .ui-discards-container, .ui-tenacity-container {
        display: grid;
        grid-auto-flow: row;
        justify-items: center;

        width: 100%;
        height: 6rem;
        padding: 0.5rem 0;
        
        color: white;
        background-color: #2470af;
        border-radius: 1rem;
    }
    .ui-discards-container {
        background-color: #cb3a63;
    }
    .ui-tenacity-container {
        background-color: var(--colour-accent);
        color: #a34d9d;
    }

    .ui-hands-value, .ui-discards-value {
        display: grid;
        place-items: center;
        grid-auto-flow: column;

        width: 90%;
        height: 3rem;
        margin-bottom: 1rem;
        
        font-size: 2rem;

        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .faded {
        opacity: 0.33;
    }
</style>