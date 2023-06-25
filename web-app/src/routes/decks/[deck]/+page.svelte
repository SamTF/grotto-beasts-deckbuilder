<!-- JS -->
<script>
    import { countCardType } from "$lib/cardUtils"
    import Deck from '$components/Deck.svelte';
    import DeckHeader from "$components/DeckHeader.svelte";
    import DeckStatsBar from "$components/DeckStatsBar.svelte";

    //  Local Data
    import { deck } from '$lib/test_deck.js'
    // console.log(deck)

    export let data
    // console.log(data)

    const cards = data.deck.cards_json
    // console.log(cards)



    const totalCards = deck.reduce((total, item) => total + item.quantity, 0)
    const totalBeasts = countCardType(deck, 'Beast')
    // const totalBeasts = deck.filter(x => x.type == 'Beast').reduce((total, item) => total + item.quantity, 0)

    // Events
    const onCardHover = event => {
        console.log("PARENT HOVER EVENT DETECTED")
        console.log(event.detail)
    }

</script>

<!-- HTML -->
<DeckHeader name="Super Luck" author="Jerma" tags="cool" />


<!-- <h1>deck {data.deck.name}</h1> -->

<!-- <h3>JSON</h3>
{#each Object.keys(cards) as card}
    <p>{card}: {cards[card]}</p>
{/each}



<h3>Local Data Test</h3>
{#each deck as card}
    <p>{card.name} | {card.type} | {card.quantity}</p>
{/each} -->



<!-- DECK -->
<div class="center">
    <Deck {deck} />
</div>

<!-- Stats Bar -->
<DeckStatsBar {deck} />

<!-- <h3>Relational</h3>
{#each data.deck.expand.cards_relational as c}
    <p>{c.name}</p>
{/each} -->