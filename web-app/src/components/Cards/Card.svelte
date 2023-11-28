<!-- A Grotto Beast card as displayed in the card grid -->

<!-- JS -->
<script>
    // Props
    export let card

    const imageURL = `/images/cards/360/${card.number}. ${card.name}.webp`

    $: cardURL = card.collectionName == 'cards' ? `/card/${card.number}` : `/card/${card.number}?version=digital`
</script>

<!-- HTML -->
<div class="card" id={card.number}>
    <div class="card-image">
        <a href={cardURL}>
            <img
                src={card.imageURL.small || imageURL}
                alt={card.name}
                loading="lazy"
            >
        </a>
    </div> 
</div>