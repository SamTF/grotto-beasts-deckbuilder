<!-- A Card item in the decklist sidebar -->

<!-- JS -->
<script>
    // Imports
    import { decklistAdvance } from '$lib/stores/decklist'

    // Props
    export let card
</script>

<!-- HTML -->
<!-- <a href={`/card/${number}`} target="_blank"> -->
<div class="decklist-item" data-card-type={card.type} on:click={() => decklistAdvance.remove(card)}  on:contextmenu={() => decklistAdvance.remove(card)} on:keypress={() => {}}>
    <!-- Quantity in Deck -->
    <div class="quantity">
        <span>{card.quantity}x</span>
    </div>

    <!-- Card Name -->
    <div class="name">
        <span>{card.name}</span>
    </div>

    {#if card.type == 'Challenger'}
        <div class="goal">
            <span>{card.goal}</span>
        </div>
    {:else}
        <!-- Summoning Cost -->
        <div class="cost">
            <span>{card.cost}</span>
        </div>
    {/if}
    
</div>
<!-- </a> -->