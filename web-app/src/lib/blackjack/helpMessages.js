// Help messages that pop up when clicking UI Sidebar elements

// Imports
import toast from 'svelte-french-toast'
import challengerEffects from "$lib/blackjack/challengerEffects.js"

export const helpTrainingMode = () => {
    toast.success('Enables a real-time preview of each card\'s score', {
        duration: 5000,
        icon: '🐱'
    })
}

export const helpDancingMode = () => {
    toast.success('Disables the smooth wiggling animation and 3D tilt effect :(', {
        duration: 5000,
        icon: '🐱'
    })
}

export const helpHands = () => {
    toast.success('How many hands of cards you can play this round.\nOnce it is depleted, you can no longer play anything!', {
        duration: 8000,
        icon: '🙌'
    })
}

export const helpDiscards = () => {
    toast.success('How many times you can discard cards from your hand.\nYou can discard up to 5 cards per discard!', {
        duration: 8000,
        icon: '🗑️'
    })
}

export const helpTenacity = () => {
    toast.success("How many times you need to beat the Challenger's goal in order to defeat them.\n\nYou can think of it as their HP!", {
        duration: 8000,
        icon: '❤️'
    })
}

export const helpScore = () => {
    toast.success("This tracks how many points you've scored with the current hand.\nWill stay blank until you score something!", {
        duration: 8000,
        icon: '💯'
    })
}

export const helpGoal = (challengerGoal, maxGoal) => {
    toast.success(`Current Score goal: ${challengerGoal}\nCurrent Bust value: ${maxGoal}\n\nScore at least ${challengerGoal} without going over ${maxGoal}!`, {
        duration: 8000,
        icon: '🐱'
    })   
}

export const helpChallenger = () => {
    toast.success("This is the Challenger you're up against now!\nDefeat them for a shot at winning a Grottillion Dollars in the grand finale!", {
        duration: 8000,
        icon: '🐱'
    })
}

export const helpRound = (round) => {
    toast.success(`On every round you will face off against a random Challenger chosen from an increasingly difficult pool of Challengers.\n
    Round 1 - Goal: 12-13 ${ round == 1 ? '<-- you are here' : ''}
    Round 2 - Goal: 14-15 ${ round == 2 ? '<-- you are here' : ''}
    Round 3 - Goal: 16 ${ round == 3 ? '<-- you are here' : ''}
    Round 4 - Goal: 17-18 ${ round == 4 ? '<-- you are here' : ''}
    Round 5 - MR GREENZ!!! ${ round == 5 ? '<-- you are here' : ''}
    Round 6+ - ??? ${ round >= 6 ? '<-- you are here' : ''}
    `, {
        duration: 12000,
        icon: '🐱'
    })
}

export const helpChallenger2 = ( challengerID = 0 ) => {
    let msg = challengerEffects[challengerID] || "This is the Challenger you're up against now!\nDefeat them for a shot at winning a Grottillion Dollars in the grand finale!"

    toast.success(msg, {
        duration: 8000,
        icon: '🐱'
    })
}