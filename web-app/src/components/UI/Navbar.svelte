<!-- JS -->
<script>
    import Icon from "./Icon.svelte";
</script>

<!-- HTML -->
<nav class="desktop-only">
    <a href="/">Home</a>
    <a href="/cards">Cards</a>
    <a href="/decks">Decks</a>
    <a href="/decks">Your Decks</a>
    <a href="/create/deck">＋ Create Deck!</a>
</nav>

<nav class="mobile-only">
    <div class="mobile-nav-container mobile-only">
        <a href="/">
            <Icon name='home' solid={true} strokeWidth='0' />
        </a>

        <a href="/cards">
            <img src="/images/icons/cards.svg" alt="Cards" class="icon">
        </a>
        <a href="/decks">
            <img src="/images/icons/decks.svg" alt="Decks" class="icon">
        </a>

        <a href="/create/deck">
            <Icon name='plus-circle' solid={true} strokeWidth='0' />
        </a>

        <a href="/account">
            <Icon name='user' solid={true} strokeWidth='0' />
        </a>
    </div>
    
</nav>