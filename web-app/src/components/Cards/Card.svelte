<!-- A Grotto Beast card as displayed in the card grid -->

<!-- JS -->
<script>
    // Props
    export let card

    const imageURL = `/images/cards/360/${card.number}. ${card.name}.webp`
</script>

<!-- HTML -->
<div class="card" id={card.number}>
    <div class="card-image">
        <a href={`/card/${card.number}`}>
            <img
                src={card.imageURL.small || imageURL}
                alt={card.name}
                loading="lazy"
            >
        </a>
    </div> 
</div>