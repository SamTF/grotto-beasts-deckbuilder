<!-- JS -->
<script>
    import Header from "$components/UI/Header.svelte";
    import Footer from "$components/UI/Footer.svelte";
    import { decklistAdvance } from '$lib/stores/decklist'

    const x = $decklistAdvance
    console.log(x)
</script>

<Header />

<slot></slot>

<Footer />

