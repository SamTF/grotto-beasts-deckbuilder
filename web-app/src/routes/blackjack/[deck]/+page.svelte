<!-- JS -->
<script>
    // Imports
    import DeckHeader from "$components/Deck/DeckHeader.svelte"
    import Meta from '$components/Meta/Meta.svelte'
    import Checkbox from '$components/UI/Checkbox.svelte'
    import SettingsItem from "../../../components/Blackjack/SettingsItem.svelte"
    import { CardTypes, countCardType } from "$lib/cardUtils"
    import Popup from '$components/UI/Popups/Popup.svelte'
    import PopupBlackjackVictory from "$components/UI/Popups/PopupBlackjackVictory.svelte"
    import PopupBlackjackLoss from "$components/UI/Popups/PopupBlackjackLoss.svelte"
    import { openModal, closeModal } from 'svelte-modals'
    import { delay } from "$lib/utils"
    import { fade, slide } from "svelte/transition"
    import toast from 'svelte-french-toast'
    import { onMount } from "svelte"
    import svelteTilt from 'vanilla-tilt-svelte'
    import { nanoid } from 'nanoid'
    import { deepClone } from '$lib/utils'

    // drag and drop
    import {flip} from "svelte/animate"
    import {dndzone} from "svelte-dnd-action"

    // BLACKJACK
    import { helpTrainingMode, helpDancingMode, helpHands, helpDiscards, helpTenacity, helpScore, helpChallenger, helpGoal, helpRound, helpChallenger2 } from "$lib/blackjack/helpMessages"
    import { findLastBeastIndex, findBeastIds, jermaEffect } from "$lib/blackjack/utils"
    import challengerEffects from "$lib/blackjack/challengerEffects.js"
    import StatusTypes from "$lib/blackjack/statusTypes.js"

    // Props
    export let data


    // Draw 8 random cards from the deck to create the starting hand
    const startingHand = (cards) => {
        workingDeck = deepClone(deck)
        hand = []

        // Check for Debuffs - Grandpa
        if (challenger.number == 3) {
            maxCardsInHand = 6
        } else {
            maxCardsInHand = baseHandSize
        }

        // Draw random starting hand
        for (let i = 0; i < maxCardsInHand; i++) {
            drawCard()
        }
    }

    // Choose a random challenger based on the current round
    const getChallenger = (round = 0) => {
        // init vars
        let challengersFiltered = deepClone(data.challengers)
        let [min, max] = [0, 21]

        // ENDLESS BETA: Use only first 12 challengers in ENDLESS MODE
        if (round > 5) {
            challengersFiltered = challengersFiltered.slice(0, 12)
        }

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
                [min, max] = [0, 20];
                break
        }

        // Filter array by goal
        challengersFiltered = challengersFiltered.filter(x => x.goal >= min && x.goal <= max)
        // Filter out the previous challenger
        challengersFiltered = challengersFiltered.filter(challenger => challenger.number !== previousChallenger)

        // Get random challenger
        const i = Math.floor( Math.random() * (challengersFiltered.length - 1))
        let challenger = challengersFiltered[i]

        // Reset max goal just in case
        maxGoal = 21

        if (round <= 5) return challenger

        // Edit properties for Endless Mode
        if (round > 5) {
            switch (round) {
                case 6:
                    challenger.power = 2
                    challenger.goal = 18
                    maxGoal = 21
                    break

                case 7:
                    challenger.power = 2
                    challenger.goal = 20
                    maxGoal = 21
                    break

                case 8:
                    challenger.power = 3
                    challenger.goal = 20
                    maxGoal = 21
                    break

                case 9:
                    challenger = data.challengers[5]
                    challenger.power = 2
                    challenger.goal = 21
                    maxGoal = 21
                    break
                    
                
                case 10:
                    challenger.power = 2
                    challenger.goal = 22
                    maxGoal = 26
                    toast.success('Bust value has been INCREASED to 26!!', { duration: 2000 })
                    break
                
                case 11:
                    challenger.power = 3
                    challenger.goal = 22
                    maxGoal = 26
                    break
                

                case 12:
                    challenger.power = 2
                    challenger.goal = 26
                    maxGoal = 31
                    toast.success('Bust value has been INCREASED to 31!!', { duration: 2000 })
                    break
                
                case 13:
                    challenger.power = 3
                    challenger.goal = 28
                    maxGoal = 31
                    break
                
                case 14:
                    challenger.power = 3
                    challenger.goal = 13
                    maxGoal = 13
                    toast.success('Bust value has been DECREASED to 13!!', { duration: 2000 })
                    break
                
                case 15:
                    challenger = data.challengers[5]
                    challenger.power = 3
                    maxGoal = 21
                    toast.success('Somehow, Mr Greenz returned...', { duration: 3000 })
                    break
                
                case 16:
                    challenger.goal = 40
                    challenger.power = 2
                    maxGoal = 48
                    toast.success('Bust value has been INCREASED to 45!!', { duration: 2000 })
                    break
                
                case 17:
                    challenger.goal = 42
                    challenger.power = 3
                    maxGoal = 48
                    break
                
                case 18:
                    challenger.goal = 12
                    challenger.power = 3
                    maxGoal = 12
                    break
                
                case 19:
                    challenger.goal = 15
                    challenger.power = 3
                    maxGoal = 15
                    break
                
                case 20:
                    challenger.goal = 16
                    challenger.power = 3
                    maxGoal = 16
                    break
                
                case 21:
                    challenger.goal = 18
                    challenger.power = 3
                    maxGoal = 18
                    break
                
                case 22:
                    challenger = data.challengers[5]
                    challenger.power = 3
                    maxGoal = 21
                    toast.success('Somehow, Mr Greenz returned...', { duration: 3000 })
                    break
                
                default:
                    let x = [13, 18, 21, 28, 36, 42, 50]
                    let y = x[Math.floor( Math.random() * (x.length - 1))]
                    challenger.power = 3
                    challenger.goal = y
                    maxGoal = y
                    break
            }
        }

        // Set stat trackers
        baseMaxGoal = maxGoal
        previousChallenger = challenger.number

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

    // Deselects all cards if any are selected
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
        const cards = document.querySelectorAll('.playing-card')

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

        // remove the fade out class
        for (const card of cards) {
            card.classList.remove('fade-out')
        }

        // remove the selected cards from hand by index
        for (const i of selectedCards.reverse()) {
            hand.splice(i, 1);
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

        // Update reactive var
        hand = hand

        // REMOVE FADE OUT CLASS!!! AAAAAA
        const x = document.querySelectorAll('.playing-card')
        for (const card of x) {
            card.classList.remove('fade-out')
        }

        // Update stat trackers
        cardsDiscardedThisRound += numOfCards
        totalCardsDiscarded += numOfCards
        totalDiscardsUsed++
    }

    // Add a new card to hand
    const drawCard = () => {
        // check if user hasn't exceeded maximum
        if (hand.length >+ maxCardsInHand) return
        
        // draw random card
        let card = workingDeck[workingDeck.length * Math.random() | 0]
        
        // remove that card from deck
        const index = workingDeck.findIndex(x => x.id === card.id)
        if (index !== -1) {
            workingDeck.splice(index, 1);
        }

        // CHECK FOR CHALLENGERS EFFECTS
        // 7. Jerma
        if (challenger.number == 7 && card.type == 'Wish') {
            card = jermaEffect(card)
        }
        // 9. JermaEarth
        else if (challenger.number == 9 && card.type == 'Grotto') {
            card.status = StatusTypes.DOUBLE
        }
        // 11. JermaVenus
        else if (challenger.number == 11 && card.type != 'Beast') {
            card.status = StatusTypes.DEBUFFED
        }
        
        // Add card to hand
        hand = [...hand, card]

        // update reactive values
        workingDeck = workingDeck
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
        totalHandsPlayed++

        // init vars
        let totalScore = 0
        let totalMult = 0
        isScoringCards = true
        scoreHistory = []
        cardsScored = 0

        // Calculate the score, one card at a time
        for (let i = 0; i < playedCards.length; i++) {
            const card = playedCards[i];

            // CHECK FOR DEBUFFS
            // 1. Glueman
            if (debuffGlueman && card.type == "Beast" && i != lastBeastIndex) {
                // card base stats
                let mult = card.power

                // increment ONLY mult
                totalMult += mult
            }
            // 2. Bugleberry // DEBUFF in general
            else if (debuffBugleberry || card.status == StatusTypes.DEBUFFED) {
                let chips = 0
                let mult = 0
                card.scorePreview = 'debuffed!'
            }
            // 7. Jerma
            else if (debuffJerma && card.type == "Wish") {
                let chips = card.cost

                // Negative Score
                if (card.status == 'Negative') {
                    totalScore -= chips
                }
                // Double Score
                else if (card.status == 'Double') {
                    chips = chips * 2
                    totalScore += chips
                }
            }
            // 9. Jerma Earth
            else if (debuffEarth && card.type == 'Grotto') {
                let mult = card.cost * 2
                totalMult += mult
            }
            
            // NORMAL SCORING
            // SCORING BEASTS
            else if (card.type == "Beast") {
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

            // CHALLENGER EFFECTS PART 2
            // 11. Jerma Pluto
            if (debuffPluto) {
                totalScore -= 2
                toast.error("-2!")
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
        console.log(`Total Score: ${totalScore}\nBust value: ${maxGoal}\nChallenger Goal: ${challengerGoal}`)
        if (totalScore >= challengerGoal && totalScore <= maxGoal) {            
            // Challenger loses HP
            challengerHpLost++

            // BLACKJACK BUFF -> Challenger loses 1 extra hp
            if (totalScore == maxGoal) {
                toast.success("BLACKJACK!!\nYou dazzle your opponent with your insane hand!", {
                    duration: 2000
                })
                challengerHpLost++
            
                // check for overflow
                if (challengerHpLost > 3) challengerHpLost = 3

                await delay(2000)
            }

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
            }
            // Check if enough hands left to win
            else if (challengerHP > handsLeft) {
                toast.error(`Oops! You no longer have enough hands left to defeat ${challenger.name} :(`)
            }
            // Not Enough score
            else {
                toast.error(`Your score wasn't enough to beat ${challenger.name} :(`)
            }

            // Check if Game Over
            if (handsPlayed >= maxHands || challengerHP > handsLeft) {
                openModal(PopupBlackjackLoss, {
                    challenger: challenger.name, round: roundCounter, icon: 'sad',
                    onConfirm: () => {
                        window.location.reload()
                    }
                })
            }
        }

        // Sidebar UI feedback
        handScore = totalScore

        // POST-SCORE EFFECTS
        await postScoreEffects()

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
        // De-select all cards
        selectedCards = []

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
            const numOfCards = maxCardsInHand - hand.length
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

        // REMOVE FADE OUT CLASS!!! AAAAAA
        for (const card of cards) {
            card.classList.remove('fade-out')
        }

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

            // CHECK FOR DEBUFFS
            // 1. Glueman
            if (debuffGlueman && card.type == "Beast" && i != lastBeastIndex) {
                let mult = card.power
                cardScorePreview = `x${mult}`
            }
            // 7. Jerma
            else if (debuffJerma && card.type == "Wish") {
                if (card.status == 'Negative') {
                    cardScorePreview = `-${card.cost}`
                }
                else if (card.status == 'Double') {
                    cardScorePreview = `+${card.cost * 2}`
                }
            }
            // 9. Jerma Earth
            else if (debuffEarth && card.type == 'Grotto') {
                let mult = card.cost
                totalMult += mult
                cardScorePreview = `x${mult * 2}`
            }
            // 11. Jerma Pluto
            else if (debuffPluto) {
                cardScorePreview += ' (-2)'
            }

            // Set score preview on card
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

        // 3. pick a new challenger
        challenger = getChallenger(roundCounter)
        challengerGoal = challenger.goal
        challengerMaxHp = Math.min(Math.max(challenger.power, 1), 3)
        challengerHpLost = 0

        // 4. Shuffle the deck and deal new hand
        workingDeck = deepClone(deck)
        startingHand(deck)

        // 5. REMOVE FADE OUT CLASS!!! AAAAAA
        const x = document.querySelectorAll('.playing-card')
        for (const card of x) {
            card.classList.remove('fade-out')
        }

        // 6. Reset stat trackers
        cardsDiscardedThisRound = 0
    }

    // Challenger Effects that happen after scoring a hand
    const postScoreEffects = async() => {
        // 4. Demond Lord Zeraxos
        // -> Discard ALL Beasts in hand
        if (debuffZeraxos) {
            // Find all Beasts in hand
            const beastsInHand = findBeastIds(hand)
            const cards = document.querySelectorAll('.playing-card')

            // Check if there even are any Beasts in hand
            if (beastsInHand.length <= 0) return

            // UI Feedback
            toast.success(
                "Demon Lord Zeraxos has sacrificed all your unplayed Beasts!!",
                {
                    icon: '💀',
                    duration: 2000
                }
            )

            // Add styles
            for (const i of beastsInHand) {
                cards[i].classList.add('sacrifice')
                await delay(250)
                cards[i].classList.add('fade-out')
            }

            // Wait 1 second
            await delay(500)

            // remove styles
            for (const card of cards) {
                card.classList.remove('fade-out')
                card.classList.remove('sacrifice')
            }

            // remove the selected cards from hand by index
            for (const i of beastsInHand.reverse()) {
                hand.splice(i, 1);
            }

            // update reactive vars
            hand = hand
        }

        // 6. Mr Greenz (ONLY IN ENDLESS)
        // -> Double Goal after every hand played
        if (debuffMrGreenz && roundCounter > 5) {
            challengerGoal = 2 * challengerGoal

            // UI Feedback
            toast.success(
                "Double or Nothing: Mr Greenz's Goal just doubled!!",
                {
                    icon: '💀',
                    duration: 2000
                }
            )
        }
    }

    // CONSTANTS
    // let deck = []
    const deck = deepClone(data.populatedDeck)
    let challenger = {}
    let challengerGoal = 0
    let challengerMaxHp = 0
    const baseHandSize = 8
    const maxSelectedCards = 5
    const maxDiscards = 3
    const maxHands = 3
    const maxPlayedCards = 5

    // Variables
    let workingDeck = []
    let hand = []
    let maxGoal = 21
    let baseMaxGoal = 21
    let maxCardsInHand = 8
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
    let showChallengerEffect = false

    // Reactive vars
    $: beastNum = countCardType(workingDeck, CardTypes.BEAST)
    $: grottoNum = countCardType(workingDeck, CardTypes.GROTTO)
    $: wishNum = countCardType(workingDeck, CardTypes.WISH)
    $: challengerHP = challengerMaxHp - challengerHpLost
    $: handsLeft = maxHands - handsPlayed
    // Dynamically scale Max Goal if challenger goals overtakes it
    $: if (challengerGoal > maxGoal) {
        maxGoal = challengerGoal
    } else {
        maxGoal = baseMaxGoal
    }

    // CHALLENGER EFFECTS
    // 1. Glueman
    $: debuffGlueman = challenger.number == 1
    $: lastBeastIndex = playedCards.length > 0 ? findLastBeastIndex(playedCards) : -1
    // 2. Bugleberry
    $: debuffBugleberry = challenger.number == 2 && cardsDiscardedThisRound < 3
    // 3. Grandpa
    $: debuffGrandpa = challenger.number == 3
    $: debuffGrandpa ? maxCardsInHand = 6 : baseHandSize
    // 4. Demond Lord Zeraxos
    $: debuffZeraxos = challenger.number == 4
    // 5. JEX
    $: debuffJEX = challenger.number == 5
    $: debuffJEX ? discards = 3 : 0
    // 6. Mr Greenz
    $: debuffMrGreenz = challenger.number == 6
    // 7. Jerma
    $: debuffJerma = challenger.number == 7
    // 8. Carl Griffenstead
    $: debuffCarl = challenger.number == 8
    $: debuffCarl ? challengerGoal = challenger.goal + Math.floor(cardsDiscardedThisRound * 0.5) : challenger.goal
    // 9. Jerma Earth
    $: debuffEarth = challenger.number == 9
    // 10. Jerma Moon
    $: debuffMoon = challenger.number == 10
    $: debuffMoon ? challengerGoal = challenger.goal + findBeastIds(playedCards).length * 2 : challenger.goal
    // 11. Jerma Venus
    $: debuffVenus = challenger.number == 11
    // 12. Jerma Pluto
    $: debuffPluto = challenger.number == 12

    // Stats trackers
    let totalHandsPlayed = 0
    let totalDiscardsUsed = 0
    let cardsDiscardedThisRound = 0
    let totalCardsDiscarded = 0
    let previousChallenger = 0

    // Set this stuff ONCE on page load
    onMount(async() => {
        // challenger
        challenger = getChallenger(roundCounter)
        challengerGoal = challenger.goal
        challengerMaxHp = Math.min(Math.max(challenger.power, 1), 3)

        await delay(10)

        // deck and starting hand
        // deck = populateDeck(data.fullCards)
        workingDeck = deepClone(deck)
        startingHand()

        // set loaded state
        loaded = true

        // Remove intro animation classes (this is stupid)
        await delay(500)
        const x = document.querySelectorAll('.ui-sidebar')
        for (const card of x) {
            card.classList.remove('anim-slide-down')
        }
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
<Meta title={"Mr Greenz Blackjack Challenge!"} description={`Try your best to get a Lucky 21 using deck built by ${data.deck.expand.author.username}`} thumbnail="/images/blackjack/MrGreenz_480.webp" />

<!-- HTML -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="page-container center">
<div class="game-wrapper desktop-only">

    <!-- UI Sidebar -->
    {#if loaded}
    <div class="ui-sidebar anim-slide-down" class:no-anim={reducedMotion} class:invisible={!loaded}>
        <!-- Round Counter -->
        <div class="round-counter-container hover-outline" on:click={ () => {helpRound(roundCounter)} }>
            <span>✦✦✦ Round {roundCounter} ✦✦✦</span>
        </div>
        <!-- Challenger Info Box -->
        <div class="game-opponent-challenger anim-wiggle-sm" style={`animation-delay: ${Math.random() * -3}s;`}>
            <!-- Challenger Name -->
            <div
                class="challenger-name hover-outline"
                class:challenger-name-sm={challenger.name?.length > 16}
                on:click={() => { helpChallenger2(challenger.number) }}
            >
                <p>{challenger.name || ''}</p>
            </div>

            <!-- Challanger Picture -->
            <div class="challenger-avatar-container">
                <a href={`/card/${challenger.number}`} target="_blank">
                    <div
                        class="challenger-pic tilt"
                        style={`background-image: url("${challenger.imageURL?.small || 'https://imageplaceholder.net/1'}");`}
                        use:svelteTilt={{ max: 25, reverse: true, glare: true, "max-glare": 0.5 }}
                    ></div>
                </a>
            </div>

            <!-- Challenger Effect -->
            {#if challenger.number in challengerEffects}
                <div class="challenger-effect hover-outline" on:click={() => {showChallengerEffect = !showChallengerEffect}}>
                    <div class="center">
                        <span class="challenger-effect-header">EFFECT</span>

                        {#if showChallengerEffect}
                            <span
                                class="challenger-effect-text"
                                transition:slide
                                use:svelteTilt={{ max: 10, reverse: true, scale: 1.05, glare: true, "max-glare": 0.1 }}
                            >{challengerEffects[challenger.number]}</span>
                        {/if}
                    </div>
                </div>
            {/if}

            <!-- Challenger Goal -->
            <!-- Normal Mode -->
            {#if roundCounter <= 0}
                <div class="challenger-goal hover-outline" on:click={ () => { helpGoal(challengerGoal, maxGoal) } }>
                    <span class="goal-text">Goal:</span>
                    <div class="goal-value-container">
                        <span
                            class="goal-value tilt"
                            use:svelteTilt={{ max: 10, reverse: true, scale: 1.05, glare: true, "max-glare": 0.1 }}
                        >{challengerGoal || ''}</span>
                    </div>
                </div>
            
            <!-- Endless mode -->
            {:else}
                <div class="challenger-goal hover-outline" on:click={ () => { helpGoal(challengerGoal, maxGoal) } }>
                    <span class="goal-text">Goal:</span>
                    <div class="goal-value-container goal-bust-value-container">
                        <div class="goal-bust-values tilt" use:svelteTilt={{ max: 10, reverse: true, scale: 1.05, glare: true, "max-glare": 0.1 }}>
                            <span class="endless-goal-value">{challengerGoal}</span>
                            <span class="endless-bust-value">{maxGoal}</span>
                        </div>
                    </div>
                </div>
            {/if}
            
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
                class:debuffed={debuffJEX}
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
        <SettingsItem text='How To Play' emote='Q.png' hasToggleBtn={false} onClick={ () => {window.open('help', '_blank').focus()} } />
        <SettingsItem text='Training Wheels' emote='meowdy.png' bind:toggle={showScorePreview} onClick={helpTrainingMode} />
        <SettingsItem text='No Dancing' emote='meowdy.png' bind:toggle={reducedMotion} onClick={helpDancingMode} />
        <SettingsItem text='Feedback Survey' emote='Q.png' hasToggleBtn={false} onClick={ () => {window.open('survey', '_blank').focus()} } />
        <SettingsItem text='NEXT ROUND' emote='Q.png' hasToggleBtn={false} onClick={ nextRound } />
        <SettingsItem text='Endless Skip' emote='meowdy.png' hasToggleBtn={false} onClick={ () => {roundCounter=5; nextRound()} } />
    </div>
    {/if}


    <!-- PLAY AREA -->
    <!-- Where the gaming takes place -->
    <div class="play-area" class:no-anim={reducedMotion} oncontextmenu="return false">
        <!-- TEAM -->
        <div class="player-team-container anim-slide-down-2" class:invisible={!loaded}>
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
                {#each playedCards as card, i (card.id)}
                    <div
                        class="card-image-small team-card"
                        animate:flip={{duration:flipDurationMs}}
                        on:contextmenu={() => moveToHand(i)}
                        use:svelteTilt={{ reverse: true, max: 15, glare: false, scale: 1 }}

                        class:debuffed={debuffBugleberry || card.status == StatusTypes.DEBUFFED}
                        class:debuff-half={debuffGlueman && card.type == "Beast" && i != lastBeastIndex}
                        class:double={card.status == StatusTypes.DOUBLE}
                        class:negative={card.status == StatusTypes.NEGATIVE}
                        class:sad={debuffPluto || card.status == StatusTypes.SAD}
                    >
                        <!-- Card image -->
                        {#key cardsScored}
                        <img
                            src={card.imageURL.small}
                            alt={card.name}
                            class='no-anim-wiggle'
                            class:selected={i+1 <= cardsScored}
                            title={card.name}
                        >

                        <!-- Score preview -->
                        <!-- A: Always Shown -->
                        {#if (showScorePreview || i+1 <= cardsScored) && card.scorePreview}
                            <div class="score" class:selected-offset={i+1 <= cardsScored}>
                                <span>{card.scorePreview}</span>
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
                    <div
                        class="hand-container starting-hand"
                        use:dndzone="{{items: hand, flipDurationMs, dropFromOthersDisabled: handDropDisabled, dragDisabled: handDragDisabled, morphDisabled: true}}"
                        on:consider="{dndPlayerHand}"
                        on:finalize="{dndPlayerHand}"
                    >
                        {#each hand as card, i (card.id)}
                        <div
                            class="card-image-small playing-card"
                            animate:flip={{duration:flipDurationMs}}
                            use:svelteTilt={{ reverse: true, max: 15, glare: false, scale: 1 }}
                            
                            class:debuffed={debuffBugleberry || card.status == StatusTypes.DEBUFFED}
                            class:double={card.status == StatusTypes.DOUBLE}
                            class:negative={card.status == StatusTypes.NEGATIVE}
                        >
                            <img
                                src={card.imageURL.small}
                                alt={card.name}
                                title={`${card.status == undefined ? card.name : card.status + ' ' + card.name}`}
                                class="anim-wiggle"
                                style={`animation-delay: ${Math.random() * -2.5}s;`}
                                on:click={() => selectCard(i)}
                                class:selected = {selectedCards.includes(i)}
                                
                            >
                        </div>
                        {/each}
                    </div>

                <!-- Cards in hand -->
                <div class="cards-in-hand center">
                    <span>{hand.length} / {maxCardsInHand}</span>
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
                            class:disabled={discards >= maxDiscards || selectedCards.length < 1}
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
<span class="sacrifice" style="display: none;"><img src="" alt=""></span>

<!-- CSS -->
<style>
    .sacrifice {
        visibility: visible;
    }
    .sacrifice img {
        filter: hue-rotate(100deg) contrast(200%) saturate(70%) invert(90%);
        /* filter: brightness(0.7) contrast(1.2) sepia(1) saturate(3) hue-rotate(-10deg); */
    }

    /* Card image page specific overrides */
    .card-image-small {
        transition: transform 0.2s;
        opacity: 1;
        flex: 0 0 auto;
        z-index: 10;
    }
    .card-image-small:hover {
        transform: scale(1);
        z-index: 11;
    }
    .card-image-small:active,
    .card-image-small:focus {
        outline: none;
        border: none;
    }

    /* Actual card image */
    .card-image-small img {
        max-height: 200px;
        opacity: 1;
    }

    /* The score of each card */
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

    /* Fade out animation */
    /* .fade-out {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    } */

    .fade-out {
        animation: 0.5s 1 ease-out fadeout;
        animation-fill-mode: forwards;
    }
    @keyframes fadeout {
        from {
            opacity: 1;
        } to {
            opacity: 0;
        }
    }

    /* Endless */
    .goal-bust-values {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 80%;
    }
    .goal-bust-values span {
        width: 50%;
    }
    .goal-bust-values span:first-child {
        background-color: var(--colour-blue-dark);
        border-radius: 1rem 0 0 1rem;
    }
    .goal-bust-values span:nth-child(2) {
        background-color: var(--colour-accent);
        border-radius: 0 1rem 1rem 0;
    }

    /* Challenger Effect Text */
    .challenger-effect {
        height: fit-content;

        border-top: 2px solid var(--colour-accent);
        border-bottom: 2px solid var(--colour-accent);
        background-color: rgba(0,0,0,.2);

        /* preserve line breaks */
        white-space: pre-wrap; 
    }
    .challenger-effect-text {
        width: 90%;

        padding: 1rem;
        margin-bottom: 0.5rem;

        font-size: 1.25rem;
        background-color: rgba(0, 0, 0, 0.5);
        background-color: #123857a1;
        border-radius: 1rem;

        box-shadow: inset 8px 8px 17px #0f304a,
                    inset -8px -8px 17px #154064;
    }
    /* no longer hard-code the height of the challenger box */
    .ui-sidebar .game-opponent-challenger {
        height: fit-content;
    }
    
</style>