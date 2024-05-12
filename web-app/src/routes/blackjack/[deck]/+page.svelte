<!-- JS -->
<script>
    // Imports
    import DeckHeader from "$components/Deck/DeckHeader.svelte"
    import Meta from '$components/Meta/Meta.svelte'
    import Checkbox from '$components/UI/Checkbox.svelte'
    import { CardTypes, countCardType } from "$lib/cardUtils"
    import Popup from '$components/UI/Popups/Popup.svelte'
    import PopupBlackjackVictory from "$components/UI/Popups/PopupBlackjackVictory.svelte"
    import PopupBlackjackLoss from "$components/UI/Popups/PopupBlackjackLoss.svelte"
    import { openModal, closeModal } from 'svelte-modals'
    import { delay } from "$lib/utils"
    import { fade } from "svelte/transition"
    import toast from 'svelte-french-toast'
    import { onMount } from "svelte"
    import svelteTilt from 'vanilla-tilt-svelte'

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
            const i = Math.floor( Math.random() * (deck.length - 1))
            let card = deck[i]
            card.id = `${card.id}${Math.round(Math.random() * 100)}`

            // add card to hand
            hand.push(card)

            // remove card from deck
            deck.splice(i, 1)
        }

        // save the remaining cards in the deck to the "working deck"
        workingDeck = deck

        // return cards in hand
        return hand
    }

    // Choose a random challenger based on the current round
    const getChallenger = (round = 0) => {
        // init vars
        let challengersFiltered = [...data.challengers]
        let [min, max] = [0, 21]

        // Filter Challengers by their Goal value depending on the current round
        switch (round) {
            case 1:
                [min, max] = [12, 13]
                break
            
            case 2:
                [min, max] = [14, 15]
                break
            
            case 3:
                [min, max] = [16, 16]
                break

            case 4:
                [min, max] = [17, 18]
                break

            case 5:
                [min, max] = [21, 21]
                break
        
            default:
                break;
        }

        // Filter array
        challengersFiltered = data.challengers.filter(x => x.goal >= min && x.goal <= max)

        // Get random challenger
        const i = Math.floor( Math.random() * (challengersFiltered.length - 1))
        const challenger = challengersFiltered[i]

        // Edit properties for Endless Mode
        if (round > 5) {
            switch (round) {
                case 6:
                    challenger.power = 2
                    challenger.goal = 20
                    break
                
                case 7:
                    challenger.power = 3
                    challenger.goal = 20
                    break
                
                case 8:
                    challenger.power = 2
                    challenger.goal = 21
                    break
                
                case 9:
                    challenger.power = 3
                    challenger.goal = 21
                    break
                
                default:
                    challenger.power = 3
                    challenger.goal = 21
                    break
            }
        }

        // Return challenger
        return challenger
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
        hand=hand
    }

    // Dselects all cards if any are selected
    const deselectCards = () => {
        if (selectedCards.length > 0) {
            selectedCards = []
        }
    }

    // Returns a card from the Team to the hand
    const moveToHand = (i) => {
        if ( i >= playedCards.length ) return

        // get card object
        const card = playedCards[i]

        // remove card from Team
        playedCards.splice(i, 1)
        playedCards = playedCards 

        // add card to Hand
        hand.push(card)
        hand = hand

        // update score preview
        scorePreviewReactive(playedCards)
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
        card.id = `${card.id}${Math.round(Math.random() * 100)}`
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

        // add them to the play area
        playedCards = [...playedCards, ...cards]

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

        // Increment hands played
        handsPlayed++

        // init vars
        let totalScore = 0
        let totalMult = 0
        isScoringCards = true
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
            }

            // SCORING WISHES
            else if (card.type == "Wish") {
                // increment score
                let chips = card.cost
                totalScore += chips
            }

            // SCORING GROTTOS
            else if (card.type == "Grotto") {
                // increment mult
                let mult = card.cost
                totalMult += mult
            }

            
            // Updating Sidebar UI
            handScore = totalScore
            if (scoreHistory.length >= 3) {scoreHistory.pop()}
            scoreHistory.unshift(card.scorePreview)
            cardsScored++

            // Wait
            await delay(500)
        }

        // Wait
        await delay(500)

        // Check if the score was enough to win
        if (totalScore >= challengerGoal && totalScore <= maxGoal) {
            challengerHpLost++

            // Check if Challenger has any remaining Tenacity
            if (challengerHpLost >= challengerMaxHp) {
                toast.success(`You defeated ${challenger.name}!`)
                
                await delay(1000)

                // openModal(Popup, { title: 'Victory!', message: `You defeated ${challenger.name}!`, icon: 'sparkles' })
                openModal(PopupBlackjackVictory, {
                    challenger: challenger.name, round: roundCounter, icon: 'sparkles',
                    onConfirm: () => {
                        closeModal()
                        nextRound()
                    }
                })
                
                return
            }
            // otherwise, play one more hand
            else {
                const winsLeft = challengerMaxHp - challengerHpLost
                toast.success(`You won this hand! Only ${winsLeft} to go.`)
            }
        }
        // Loss
        else {
            // Check if busted out or not enough score
            if (totalScore > maxGoal) {
                toast.error(`Busted! You can't go over ${maxGoal} points`)
            } else {
                toast.error(`Your score wasn't enough to beat ${challenger.name} :(`)
            }

            console.log(`Hands played: ${handsPlayed}`)

            // Check if Game Over
            if (handsPlayed >= maxHands) {
                openModal(PopupBlackjackLoss, {
                    challenger: challenger.name, round: roundCounter, icon: 'sad',
                    onConfirm: () => {
                        console.log("Try again!!")
                        window.location.reload()
                    }
                })
            }
        }

        // Sidebar UI feedback
        handScore = totalScore

        //// RESET PLAYING FIELD AND RE-DRAW CARDS

        // Wait
        await delay(1000)

        // Reset scored cards and score history
        await resetPlayTeam()

        // Reactive vars
        hand = hand
    }

    // Reset playing field after scoring
    const resetPlayTeam = async(drawNewHand = true) => {
        // Discard played cards
        // Instead of removing the card, make it invisible
        const cards = document.querySelectorAll('.team-card')
        for (const card of cards) {
            card.classList.add('fade-out')
            await delay(200)
        }

        // Wait
        await delay(200)

        // Draw new cards to replace discarded ones IF CHOSEN
        if (drawNewHand) {
            const numOfCards = playedCards.length
            for (let i = 0; i < numOfCards; i++) {
                drawCard()
                await delay(100)
            }
        }

        // Remove score history
        for (let i = 0; i < scoreHistory.length; i++) {
            scoreHistory[i] = ''
            await delay(100)
        }

        // Wait
        await delay(200)

        // reset vars
        playedCards = []
        cardsScored = 0
        handScore = 0
        isScoringCards = false

        // Reactive vars
        hand = hand
    }

    // Score Preview Reactive
    const scorePreviewReactive = cards => {
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

            card.scorePreview = cardScorePreview
        }
    }

    // Next Round
    const nextRound = async() => {
        // 0. increment round counter
        roundCounter++

        // 1. Reset scored cards, hands played, and discards used
        await resetPlayTeam(false)
        handsPlayed = 0
        discards = 0

        // 2. Discard hand
        const cards = document.querySelectorAll('.playing-card');  
        for (const card of cards) {
            card.classList.add('fade-out')
            await delay(100)
        }

        await delay(400)

        // 3. Shuffle the deck and deal new hand
        workingDeck = [...deck]
        hand = startingHand(deck)

        // 4. pick a new challenger
        challenger = getChallenger(roundCounter)
        challengerGoal = challenger.goal
        challengerMaxHp = Math.min(Math.max(challenger.power, 1), 3)
        challengerHpLost = 0
    }

    // Help Tooltips
    const helpTrainingMode = () => {
        toast.success('Enables a real-time preview of each card\'s score', {
            duration: 5000,
            icon: '🐱'
        })
    }

    const helpDancingMode = () => {
        toast.success('Disables the smooth wiggling animation and 3D tilt effect :(', {
            duration: 5000,
            icon: '🐱'
        })
    }

    const helpHands = () => {
        toast.success('How many hands of cards you can play this round.\nOnce it is depleted, you can no longer play anything!', {
            duration: 8000,
            icon: '🙌'
        })
    }

    const helpDiscards = () => {
        toast.success('How many times you can discard cards from your hand.\nYou can discard up to 5 cards per discard!', {
            duration: 8000,
            icon: '🗑️'
        })
    }

    const helpTenacity = () => {
        toast.success("How many times you need to beat the Challenger's goal in order to defeat them.\n\nYou can think of it as their HP!", {
            duration: 8000,
            icon: '❤️'
        })
    }

    const helpScore = () => {
        toast.success("This tracks how many points you've scored with the current hand.\nWill stay blank until you score something!", {
            duration: 8000,
            icon: '💯'
        })
    }

    const helpGoal = () => {
        toast.success("Your score aim. Score this value or higher in order to win.\nBut be careful, if you go over 21 points you will bust out!", {
            duration: 8000,
            icon: '🐱'
        })
    }

    const helpChallenger = () => {
        toast.success("This is the Challenger you're up against now!\nDefeat them for a shot at winning a Grottillion Dollars in the grand finale!", {
            duration: 8000,
            icon: '🐱'
        })
    }

    const helpRound = () => {
        toast.success(`On every round you will face off against a random Challenger chosen from an increasingly difficult pool of Challengers.\n
        Round 1 - Goal: 12-13 ${ roundCounter == 1 ? '<-- you are here' : ''}
        Round 2 - Goal: 14-15 ${ roundCounter == 2 ? '<-- you are here' : ''}
        Round 3 - Goal: 16 ${ roundCounter == 3 ? '<-- you are here' : ''}
        Round 4 - Goal: 17-18 ${ roundCounter == 4 ? '<-- you are here' : ''}
        Round 5 - MR GREENZ!!! ${ roundCounter == 5 ? '<-- you are here' : ''}
        Round 6+ - ??? ${ roundCounter >= 6 ? '<-- you are here' : ''}
        `, {
            duration: 12000,
            icon: '🐱'
        })
    }

    // CONSTANTS
    let deck = []
    let challenger = {}
    let challengerGoal = 0
    let challengerMaxHp = 0
    const maxCardsInHand = 8
    const maxSelectedCards = 5
    const maxDiscards = 3
    const maxHands = 3
    const maxPlayedCards = 5
    const maxGoal = 21

    // Variables
    let workingDeck = []
    let hand = []
    let selectedCards = []
    let playedCards = []
    let actualPlayedCards = []
    let discards = 0
    let handsPlayed = 0
    let handScore = 0
    let scoreHistory = []
    let cardsScored = 0
    let isScoringCards = false
    let challengerHpLost = 0
    let roundCounter = 1
    let loaded = false

    // User preferences
    let showScorePreview = true
    let reducedMotion = false

    // Reactive vars
    $: beastNum = countCardType(workingDeck, CardTypes.BEAST)
    $: grottoNum = countCardType(workingDeck, CardTypes.GROTTO)
    $: wishNum = countCardType(workingDeck, CardTypes.WISH)

    // Set this stuff ONCE on page load
    onMount(async() => {
        // deck and starting hand
        deck = populateDeck(data.fullCards)
        workingDeck = [...deck]
        hand = startingHand(deck)

        // challenger
        challenger = getChallenger(roundCounter)
        challengerGoal = challenger.goal
        challengerMaxHp = Math.min(Math.max(challenger.power, 1), 3)

        // await delay(500)
        loaded = true
    })

    // SVELTE-DND-ACTION
    const flipDurationMs = 300;

    // DND Reactive Vars
    $: teamDropDisabled = playedCards.length >= maxPlayedCards ? true : false
    $: handDropDisabled = hand.length >= maxCardsInHand ? true : false
    $: handDragDisabled = selectedCards.length >= 1

    function dndPlayerTeamDrag(e) {
        if (!actualPlayedCards.some(card => card.id === e.detail.info.id)) {
            if (e.detail.info.trigger == "draggedEntered" && playedCards.length >= maxPlayedCards) {
                toast.error("Hold your horses, partner! Your Team is already maxxed out!", {icon: '🐱'})
            }
        }

        // update list of played cards
        playedCards = e.detail.items;
    }

    function dndPlayerTeamDrop(e) {
        // ACTUALLY update the list of played cards for real
        playedCards = e.detail.items;
        actualPlayedCards = playedCards

        scorePreviewReactive(playedCards)
    }

    // DND Player Hand
    function dndPlayerHand(e) {
        hand = e.detail.items
    }
</script>

<!-- METADATA -->
<Meta title={"Mr Greenz Blackjack Challenge!"} description={`Try your best to get a Lucky 21 using deck built by ${data.deck.expand.author.username}`} thumbnail={'/images/cards/6. Mr. Greenz.webp'} />

<!-- HTML -->
<!-- <DeckHeader name={data.deck.name} author={data.deck.expand.author.username} tags={data.deck.tags} authorID={data.deck.expand.author.id} fullCards={data.fullCards} deck={data.deck}/> -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="page-container center">
<div class="game-wrapper desktop-only">

    <!-- UI Sidebar -->
    <div class="ui-sidebar" class:no-anim={reducedMotion}>
        <!-- Round Counter -->
        <div class="round-counter-container hover-outline" on:click={helpRound}>
            <span>✦✦✦ Round {roundCounter} ✦✦✦</span>
        </div>
        <!-- Challenger Info Box -->
        <div class="game-opponent-challenger anim-wiggle-sm" style={`animation-delay: ${Math.random() * -3}s;`}>
            <div
                class="challenger-name hover-outline"
                class:challenger-name-sm={challenger.name?.length > 15}
                on:click={helpChallenger}
            >
                <p>{challenger.name || ''}</p>
            </div>

            <div class="challenger-avatar-container">
                <a href={`/card/${challenger.number}`} target="_blank">
                    <div
                        class="challenger-pic tilt"
                        style={`background-image: url("${challenger.imageURL?.small || 'https://imageplaceholder.net/1'}");`}
                        use:svelteTilt={{ reverse: true, glare: true, "max-glare": 0.5 }}
                    ></div>
                </a>
            </div>

            <div class="challenger-goal hover-outline" on:click={helpGoal}>
                <span class="goal-text">Goal:</span>
                <div class="goal-value-container">
                    <span
                        class="goal-value tilt"
                        use:svelteTilt={{ max: 10, reverse: true, scale: 1.05, glare: true, "max-glare": 0.1 }}
                    >{challenger?.goal || ''}</span>
                </div>
            </div>
        </div>

        <!-- Challenger Tenacity -->
        <div class="hands-discards-containers anim-wiggle-sm" style={`animation-delay: ${Math.random() * -3}s;`}>
            <div
                class="ui-tenacity-container hover-outline tilt"
                use:svelteTilt={{ max: 10, reverse: true, scale: 1.05, glare: true, "max-glare": 0.25 }}
                on:click={helpTenacity}
            >
                <h2>Tenacity</h2>

                <div class="ui-hands-value">
                    {#each [...Array(challengerMaxHp).keys()] as x, i}
                        <span class:faded={i < challengerHpLost}>⚪</span>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Round Score -->
        <div
            class="round-score-container hover-outline tilt"
            use:svelteTilt={{ max: 10, reverse: true, scale: 1.05, glare: true, "max-glare": 0.25 }}
            on:click={helpScore}
        >
            <div class="round-score anim-wiggle-sm" style={`animation-delay: ${Math.random() * -3}s;`}>
                {#if isScoringCards}
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
        <div class="hands-discards-containers anim-wiggle-sm" style={`animation-delay: ${Math.random() * -3}s;`}>
            <div
                class="ui-hands-container hover-outline tilt"
                use:svelteTilt={{ max: 10, reverse: true, scale: 1.05, glare: true, "max-glare": 0.25 }}
                on:click={helpHands}
            >
                <h2>Hands</h2>

                <div class="ui-hands-value">
                    {#each [...Array(maxHands).keys()] as x, i}
                        <span class:faded={i < handsPlayed}>⚪</span>
                    {/each}
                </div>
            </div>

            <div
                class="ui-discards-container hover-outline tilt"
                use:svelteTilt={{ max: 10, reverse: true, scale: 1.05, glare: true, "max-glare": 0.25 }}
                on:click={helpDiscards}
            >
                <h2>Discards</h2>

                <div class="ui-discards-value">
                    {#each [...Array(maxDiscards).keys()] as x, i}
                        <span class:faded={i < discards}>⚪</span>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Settings -->
        <div class="settings-item hover-outline anim-wiggle-sm" on:click={() => {window.open('help', '_blank').focus()}}>
            <span class="center-row" style="gap: 0.5rem" on:click={helpTrainingMode}>
                <img src="/images/emotes/Q.png" alt="meowdy" height="24">
                <span>How To Play</span>
            </span>
        </div>

        <div class="settings-item hover-outline anim-wiggle-sm">
            <span class="center-row" style="gap: 0.5rem" on:click={helpTrainingMode}>
                <img src="/images/emotes/meowdy.png" alt="meowdy" height="24">
                <span>Training Wheels</span>
            </span>

            <Checkbox bind:checked={showScorePreview} />
        </div>

        <div class="settings-item hover-outline anim-wiggle-sm">
            <span class="center-row" style="gap: 0.5rem" on:click={helpDancingMode}>
                <img src="/images/emotes/meowdy.png" alt="meowdy" height="24">
                <span>No Dancing</span>
            </span>

            <Checkbox bind:checked={reducedMotion} />
        </div>
    </div>


    <!-- PLAY AREA -->
    <!-- Where the gaming takes place -->
    <div class="play-area" class:no-anim={reducedMotion} oncontextmenu="return false">
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
                    dropFromOthersDisabled: teamDropDisabled,
                    morphDisabled: true
                }}"
                on:consider="{dndPlayerTeamDrag}"
                on:finalize="{dndPlayerTeamDrop}"
                
            >
                <!-- {#each playedCards as item, i (item.id)} -->
                {#each playedCards as item, i (`${item.id}_${Math.random() * 100}`)}
                    <div
                        class="card-image-small team-card"
                        animate:flip={{duration:flipDurationMs}}
                        on:contextmenu={() => moveToHand(i)}
                        use:svelteTilt={{ reverse: true, max: 15, glare: false, scale: 1 }}
                    >
                        <!-- Card image -->
                        {#key cardsScored}
                        <img
                            src={item.imageURL.small}
                            alt={item.name}
                            class='no-anim-wiggle'
                            class:selected={i+1 <= cardsScored}
                            title={item.name}
                        >

                        <!-- Score preview -->
                        <!-- A: Always Shown -->
                        {#if (showScorePreview || i+1 <= cardsScored) && item.scorePreview}
                            <div class="score" class:selected-offset={i+1 <= cardsScored}>
                                <span>{item.scorePreview}</span>
                            </div>    
                        {/if}
                        {/key}
                    </div>
                {/each}
            </div>
            </div>
        </div>
        
        <!-- The Players Hand & Their Deck -->
        {#if loaded}
        <div class="hand-and-deck anim-slide-in" on:contextmenu={deselectCards}>
            <!-- The Player's Hand AND Buttons-->
            <div class="player-hand-and-btns">
                <!-- {#key hand} -->
                    <div
                        class="hand-container starting-hand"
                        use:dndzone="{{items: hand, flipDurationMs, dropFromOthersDisabled: handDropDisabled, dragDisabled: handDragDisabled, morphDisabled: true}}"
                        on:consider="{dndPlayerHand}"
                        on:finalize="{dndPlayerHand}"
                    >
                        <!-- {#each hand as card, i (card.id)} -->
                        {#each hand as card, i (`${card.id}_${Math.random() * 100}`)}
                        <div
                            class="card-image-small playing-card"
                            animate:flip={{duration:flipDurationMs}}
                            use:svelteTilt={{ reverse: true, max: 15, glare: false, scale: 1 }}
                        >
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <img
                                src={card.imageURL.small}
                                alt={card.name}
                                title={card.name}
                                class="anim-wiggle"
                                style={`animation-delay: ${Math.random() * -2.5}s;`}
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
                <!-- Deck Image -->
                <div class="card-image-small">
                    <a href={`/decks/${data.deck.id}`} target="_blank">
                        <img src="/images/cards/back.webp" alt="deck of cards">
                    </a>
                    <!-- Hover tooltip -->
                    <div class="tooltip-view-deck">
                        <div>
                            <p>View</p>
                            <p>Deck</p>
                        </div>
                    </div>
                </div>

                <!-- Cards remaning counter -->
                <div class="cards-in-hand">
                    <span>{workingDeck.length} / 40</span>
                </div>

                <!-- Deck info tooltip -->
                <div class="tooltip-deck-preview-container">
                    <div class="tooltip-deck-preview">
                        <span data-card-type="beast">{beastNum}</span>
                        <span data-card-type="grotto">{grottoNum}</span>
                        <span data-card-type="wish">{wishNum}</span>
                    </div>
                </div>
            </div>
        </div>
        {:else}
            <div style="width: 95%; min-width: 95%; height: 100%;"></div>
        {/if}
        
    </div>
</div>

<!-- MOBILE -->
<div class="mobile-only" style="height: 100dvh;">
    <div class="center" style="height: 100%; grid-template-rows:1fr 3fr;">
        <div class="center" style="gap: 1rem">
            <h1 style="margin-bottom: 1rem;">Hello mobile andys</h1>
            <h2>Unfortunately this game is currently not playable on mobile devices.</h2>
            <h2>Stay tuned for updates!</h2>
            <p>In the mean time, enjoy these funny gifs:</p>
        </div>

        <div class="center" style="height: 70%;">
            <img src="/images/construction/cellphone_030.gif" alt="cellphone">
            <img src="/images/construction/under_constructionA.gif" alt="under construction sign">
            <img src="/images/construction/head_construction.gif" alt="literally me">
            <img src="/images/construction/026.gif" alt="grotto beast">
            <img src="/images/construction/casinobanner.gif" alt="casino">
        </div>
    </div>
</div>
</div>

<span class="fade-out"></span>
<span class="spin"></span>
<span class="anim-wiggle"></span>
<span class="anim-wiggle-sm"></span>
<span class="no-anim"></span>
<span class="hover-outline"></span>
<span class="anim-slide-in"></span>

<!-- CSS -->
<style>
    .game-wrapper {
        display: grid;
        grid-template-columns: 1fr 5fr;
        position: relative;
        perspective: 1000px;
        width: 100%;
    }

    .play-area {
        width: 100%;
        display: grid;
        grid-template-rows: 5fr 6fr;
        align-items: start;
        justify-items: center;
    }
    
    .hand-and-deck {
        display: grid;
        grid-template-columns: 8fr 1fr;
        align-content: end;

        width: 95%;
    }

    .player-hand-and-btns {
        display: grid;
        place-items: center;
    }

    .hand-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center !important;
        align-content: center;

        background-color: rgba(255, 255, 255, 0.375);
        width: 90%;
        border-radius: 1rem;
        padding: 8rem 0rem;
        margin-bottom: 0.5rem !important;
    }

    .hand-btns-container {
        display: grid;
        place-items: center;
    }

    .hand-btns {
        display: flex;
        justify-content: space-evenly;
        flex-direction: row;

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
        position: relative;

        height: 18rem;
        background-color: rgba(255, 255, 255, 0.375);
        border-radius: 1rem;
        padding: 0 2rem;
    }
    .blackjack-deck-container:hover .tooltip-view-deck {
        opacity: 1;
    }
    .blackjack-deck-container:hover .tooltip-deck-preview-container {
        top: -4rem;
        font-weight: 700;
        opacity: 1;
    }

    .card-image-small {
        transition: transform 0.2s;
        opacity: 1;
        flex: 0 0 auto;
    }
    .card-image-small:hover {
        transform: scale(1);
        z-index: 11;
    }

    .card-image-small img {
        max-height: 200px;
    }

    .selected {
        outline: 2px solid gold;
        transform: translate(0, -3rem) !important;
        -moz-transform: translate(0, -3rem) !important;
        z-index: 10;
    }
    .selected-offset {
        transform: translate(0, -3rem) !important;
        -moz-transform: translate(0, -3rem) !important;
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
        height: 24rem;
        width: 95%;

        display: grid;
        grid-template-columns: 5fr 1fr;
        place-items: center;
    }

    .player-team {
        display: grid;
        place-items: center;
        
        /* width: 60rem; */
        width: 80%;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;

        width: 100%;
        margin-left: 2rem;

        filter: drop-shadow(0 10px 5px rgba(0, 0, 0, 0.5));
    }

    .round-counter-container {
        display: grid;
        place-items: center;
        
        width: 90%;
        height: 2rem;

        color: var(--colour-accent);
        font-size: 1.25rem;
        font-weight: 700;

        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 0 0 1rem 1rem;
    }

    .game-opponent-challenger {
        display: flex;
        flex-direction: column;
        gap:0;

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
    .challenger-name-sm {
        font-size: 1.5rem;
    }

    .challenger-avatar-container {
        display: grid;
        place-items: center;

        width: 100%;
        height: 60%;

        background-color: rgba(0, 0, 0, 0.2);
    }

    .challenger-pic {
        height: 8rem;
        width: 8rem;
        border-radius: 50%;

        background-size: 150%;
        background-position: center 33%;

        outline: 2px solid white;
        filter: drop-shadow(10px 10px 30px black);

        transition: all 200ms ease;
    }
    .challenger-pic:hover {
        border-radius: 25%;
        outline: 4px solid var(--colour-accent);
        filter: drop-shadow(10px 10px 30px black);
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
        gap: 0.5rem;

        width: 90%;
    }

    .ui-hands-container, .ui-discards-container, .ui-tenacity-container {
        display: grid;
        grid-auto-flow: row;
        justify-items: center;

        width: 100%;
        height: 5rem;
        padding: 0.25rem 0;
        
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
    .ui-hands-container:hover {
        transform: scale(2);
    }

    .ui-hands-value, .ui-discards-value {
        display: grid;
        place-items: center;
        grid-auto-flow: column;

        width: 90%;
        height: 2.5rem;
        margin-bottom: 0.25rem;
        
        font-size: 1.5rem;

        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .tooltip-view-deck {
        position: absolute;
        top:0;
        right:0;
        
        display: grid;
        place-items: center;

        height: 100%;
        width: 100%;

        color: white;
        font-size: 2rem;
        font-weight: 900;

        border-radius: 1rem;
        background: rgba(0, 0, 0, 0.5);

        opacity: 0;
        transition: all 200ms ease;

        pointer-events: none;
    }

    .tooltip-deck-preview-container {
        position: absolute;
        top: 0;
        left: 0;

        display: grid;
        place-items: center;

        width: 100%;
        height: 3rem;

        background-color: rgba(255, 255, 255, 0.375);
        border-radius: 1rem;

        z-index: 11;
        opacity: 0;
        
        transition: all 200ms ease;
    }

    .tooltip-deck-preview {
        display: flex;
        justify-content: space-evenly;

        width: 100%;
    }

    .settings-item {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;
        justify-content: space-evenly;

        width: 90%;
        height: 3rem;
        font-size: 1.25rem;

        background-color: rgba(255, 255, 255, 0.375);
        border-radius: 1rem;

        transition: all 200ms ease;
    }
    .settings-item:hover {
        background-color: rgba(255, 255, 255, 0.75);
        cursor: pointer;
    }

    /* Hover outline */
    .hover-outline:hover {
        outline: 2px solid white;
        cursor: pointer;
    }
    
    /* Fade out animation */
    .faded {
        opacity: 0.33;
    }

    /* Spin animation */
    .spin {
        animation: 600ms 2 alternate spin;
    }
    @keyframes spin {
        from {
            transform: rotate3d(0);
        }

        to {
            transform: rotate3d(0,1,0,180deg)
        }
    }

    /* Wiggle animation */
    .anim-wiggle {
        animation: 2.5s infinite alternate linear wiggle;
    }
    @keyframes wiggle {
        from {
            transform: rotate(-2deg);
        } to {
            transform: rotate(2deg);
        }
    }

    /* Wiggle animation subtler */
    .anim-wiggle-sm {
        animation: 3s infinite alternate linear wiggle-sm;
    }
    @keyframes wiggle-sm {
        from {
            transform: rotate(-1deg);
        } to {
            transform: rotate(1deg);
        }
    }

    /* Slide in animation */
    .anim-slide-in {
        animation: 0.5s 1 ease-out slide-in;
    }
    @keyframes slide-in {
        from {
            transform: translateY(30rem);
            opacity: 0;
        } to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    /* Disable animations */
    .ui-sidebar.no-anim .anim-wiggle-sm,
    .ui-sidebar.no-anim .tilt,
    .play-area.no-anim .card-image-small,
    .play-area.no-anim .anim-wiggle,
    .no-anim {
        animation: none !important;
        transform: none !important;
    }
</style>