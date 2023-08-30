<!-- A Grotto Beast card as displayed in the card grid -->

<!-- JS -->
<script>
    // Imports
    import { CardTypes } from "$lib/cardUtils"
    import { createDecklistStore, decklist, decklistAdvance } from '$lib/stores/decklist'

    // Props
    export let card

    // vars
    let quantity = 0
    let maxQuantity = card.type == 'Challenger' ? 1 : 3
    // let maxQuantity = card.type == 'Challenger' ? 1 : card.name == 'Byeah Beast' ? 60 : 3
    $: deckSize = decklistAdvance.deckSize($decklistAdvance)
    $: if (card.name == 'Byeah Beast') maxQuantity = deckSize

    $: byeahPrime = $decklistAdvance.some(({ name }) => name === 'Byeah Prime')
    $: console.log('BYEAH PRIME? >>> ', byeahPrime)
    
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

    if ($decklistAdvance.some(x => x.name == card.name)) {
        const i = $decklistAdvance.findIndex(x => x.name == card.name)
        quantity = $decklistAdvance[i].quantity
    }

    const decreaseQuantity = () => {
        if (quantity > 0) {
            quantity--
            decklistAdvance.remove(card)
            // decklist.update(data => {console.log(data)})
            // cartContents.update(contents => [...contents, item]);
        }
    }
    const increaseQuantity = () => {
        // Do not add any more cards if the deck is at it's limit
        if (deckMaxCapacity()) {
            alert("The deck is already at maximum capacity!\nRemove some cards if you want to add more :P")
            return
        }

        // Ensure that the deck can only have one challenger
        if (card.type == 'Challenger' && deckHasChallenger()) {
            alert("Grotto Beasts!™ decks can only have one (1) Challenger!\nIf you want to swap Challengers, remove the one in the deck first :)")
            return
        }

        // Only add the card if it hasn't reached its maximum quantity
        if (quantity < maxQuantity) {
            quantity++

            decklistAdvance.add(card)
            // decklist.update(contents => [...contents, { id: card.number, quantity: 1 }])
            console.log($decklistAdvance)
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
</script>

<!-- HTML -->
<div class="card deckbuilder-card" id={card.number}}>
    <div class="card-image">
        <a href={`/card/${card.number}`} target="_blank"><img src={`/images/cards/360/${card.number}. ${card.name}.webp`} alt={card.name} loading="lazy"></a>
        {#key $decklistAdvance}

        <!-- Buttons to add/remove card copies -->
            <div class="builder-btns">
                <button class="btn btn-builder btn-positive" on:click={increaseQuantity} disabled={quantity >= maxQuantity || deckMaxCapacity()}>+</button>
                <button class="btn btn-builder btn-negative" on:click={decreaseQuantity} disabled={quantity <= 0}>-</button>
            </div>

            <!-- Number of copies of this card in the user's deck list -->
            <span class="deckbuilder-card-quantity">x{quantity}</span>
        {/key}
    </div> 
</div>

<style>
    .deckbuilder-card {
        position: relative;
    }

    .builder-btns {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
    }

    .card-image:hover {
        transform: scale(1);
    }
    .card-image img:hover {
        outline: 0.5rem solid gold;
    }

    .btn-builder {
        font-family: 'Alegreya Sans', 'Roboto', sans-serif;
        font-weight: 900 !important;
        font-size: 1rem;
        opacity: 1;
    }

    .btn-builder:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .deckbuilder-card-quantity {
        /* position */
        position: absolute;
        bottom: 0.5rem;
        right: 1rem;

        color: white;
        font-size: 4rem;
        font-weight: 900;
        -webkit-text-stroke: 2px brown;
    }

    .card-image img {
        max-height: 280px;
    }
</style>