<!-- A Grotto Beast card as displayed in the card grid -->

<!-- JS -->
<script>
    // Imports
    import { CardTypes } from "$lib/cardUtils"
    import { createDecklistStore, decklist, decklistAdvance } from '$lib/stores/decklist'
    import toast from 'svelte-french-toast'
    import { onMount } from "svelte"
    import Icon from "../UI/Icon.svelte";

    // Props
    export let card

    // vars
    let quantity = 0
    let maxQuantity = card.type == 'Challenger' ? 1 : 3
    $: deckSize = decklistAdvance.deckSize($decklistAdvance)
    $: if (card.name == 'Byeah Beast') maxQuantity = deckSize

    $: byeahPrime = $decklistAdvance.some(({ name }) => name === 'Byeah Prime')
    
    $: if (quantity > maxQuantity) quantity = maxQuantity

    // Update quantity when removing cards via clicking in the Decklisr Sidebar
    $: if ($decklistAdvance.length > 1) {
        const i = $decklistAdvance.findIndex(x => x.name == card.name)
        
        // if the card was found in the decklist, fetch its quantity
        if (i >= 0) { 
            quantity = $decklistAdvance[i].quantity
        }
        // if not found, set quantity to 0
        else {
            quantity = 0
        }
    }

    // Reactively update the Quantity counter after any change in the Decklist
    $: if ($decklistAdvance.some(x => x.name == card.name)) {
        const i = $decklistAdvance.findIndex(x => x.name == card.name)
        quantity = $decklistAdvance[i].quantity
    } else {
        quantity = 0
    }

    const decreaseQuantity = () => {
        if (quantity > 0) {
            quantity--
            decklistAdvance.remove(card)
            toast.success(`Removed a ${card.name} from your decklist!`)
        }
    }
    const increaseQuantity = () => {
        // Do not add any more cards if the deck is at it's limit
        if (deckMaxCapacity()) {
            toast.error("The deck is already at maximum capacity!\nRemove some cards if you want to add more :P")
            return
        }

        // Ensure that the deck can only have one challenger
        if (card.type == 'Challenger' && deckHasChallenger()) {
            toast.error("Grotto Beasts!™ decks can only have one (1) Challenger!\nIf you want to swap Challengers, remove the one in the deck first :)")
            return
        }

        // Only add the card if it hasn't reached its maximum quantity
        if (quantity < maxQuantity) {
            quantity++

            decklistAdvance.add(card)
            // decklist.update(contents => [...contents, { id: card.number, quantity: 1 }])
            toast.success(`Added ${quantity} ${card.name}${quantity > 1 ? 's' : ''} to your decklist!`)
        }
    }

    // Check if the deck has reached maximum capacity
    const deckMaxCapacity = () => {
        if (card.type == CardTypes.CHALLENGER) {
            return (decklistAdvance.challenger($decklistAdvance) >= 1)
        } else {
            return (decklistAdvance.sum($decklistAdvance) >= deckSize)
        }
    }

    // Check if the deck already has a Challenger
    const deckHasChallenger = () => {
        return ($decklistAdvance.some(x => x.type == 'Challenger'))
    }

    // RENDER UI ONLY AFTER CARD IMAGE LOADS
    // to prevent the weird loading thing
    let showUI = false

    onMount(() => {
        setTimeout(() => showUI = true, '100')
    })
</script>

<!-- HTML -->
<div class="card deckbuilder-card" id={card.number} oncontextmenu="return false">
    <div class="card-image">
        <!-- <a href={`/card/${card.number}`} target="_blank"><img src={`/images/cards/360/${card.number}. ${card.name}.webp`} alt={card.name} loading="lazy"></a> -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img
            src={card.imageURL.small}
            alt={card.name}
            loading="lazy"
            on:click={increaseQuantity}
            on:contextmenu={decreaseQuantity}
            >
        
        <!-- Re-render block when $decklist changes -->
        {#key $decklistAdvance}
        {#if showUI}
        <!-- Buttons to add/remove card copies -->
            <div class="builder-btns">
                <!-- + -->
                <button class="btn btn-builder btn-positive" on:click={increaseQuantity} disabled={quantity >= maxQuantity || deckMaxCapacity()}>
                    <Icon name='plus' class='btn-builder-icon' strokeWidth={4} solid={false} />
                </button>

                <!-- - -->
                <button class="btn btn-builder btn-negative" on:click={decreaseQuantity} disabled={quantity <= 0}>
                    <Icon name='minus' class='btn-builder-icon' strokeWidth={4} solid={false} />
                </button>
            </div>

            <!-- Number of copies of this card in the user's deck list -->
            <span class="deckbuilder-card-quantity">x{quantity}</span>
        {/if}
        {/key}
    </div> 
</div>