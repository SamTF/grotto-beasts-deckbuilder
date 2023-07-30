<!-- JS -->
<script>
    import Header from "$components/UI/Header.svelte";
    import Footer from "$components/UI/Footer.svelte";
    import { decklistAdvance } from '$lib/stores/decklist'
    import { pb, currentUser } from '$lib/pocketbase.js'

    const x = $decklistAdvance
    const y = $currentUser
</script>

<Header />

<slot></slot>

<Footer />

