<!-- A Grotto Beast card as displayed in the card grid -->

<!-- JS -->
<script>
    // Props
    export let card
</script>

<!-- HTML -->
<div class="card" id={card.number}>
    <div class="card-image">
        <a href={`/card/${card.number}`}><img src={`/images/cards/360/${card.number}. ${card.name}.webp`} alt={card.name} loading="lazy"></a>
    </div> 
</div>