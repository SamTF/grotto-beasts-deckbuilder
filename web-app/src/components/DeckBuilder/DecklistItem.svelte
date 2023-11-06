<!-- A Card item in the decklist sidebar -->

<!-- JS -->
<script>
    // Imports
    import { decklistAdvance } from '$lib/stores/decklist'
    import { scale } from 'svelte/transition'

    // Props
    export let card
</script>

<!-- HTML -->
<!-- <a href={`/card/${number}`} target="_blank"> -->
<div
    class="decklist-item"
    data-card-type={card.type}
    on:click={() => decklistAdvance.remove(card)} 
    on:contextmenu={() => decklistAdvance.remove(card)}
    on:keypress={() => {}}
    transition:scale|local
    >
    <!-- https://github.com/sveltejs/kit/issues/9314 -->

    <!-- Quantity in Deck -->
    <div class="quantity">
        <span>{card.quantity}x</span>
    </div>

    <!-- Card Name -->
    <div class="name">
        {#if card.epic}
            <span>✦</span>
        {/if}
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