<!-- JS -->
<script>
    import Header from "$components/UI/Header.svelte";
    import Footer from "$components/UI/Footer.svelte";
    import { decklistAdvance } from '$lib/stores/decklist'
    import { pb, currentUser } from '$lib/pocketbase.js'

    const x = $decklistAdvance
    const y = $currentUser
</script>

<!-- META -->
<svelte:head>
    <!-- Page Title -->
    <title>Grotto Builder!</title>

    <!-- Link Embed Stuff -->
    <meta property="og:site_name"   content="grotto.builders">          <!-- Top of the embed -->
    <meta property="og:title"       content="Grotto Builders!">                      <!-- Big Bold Letters -->
    <meta property="og:description" content="Create, share, and explore decks for Grotto Beasts!">                 <!-- Subtitle, smaller, under title -->
    <meta property="og:image"       content="/images/cards/154. Meowdy.webp">                      <!-- Cool lil thumbnail to the side! :) -->
    <meta property="og:url"         content="http:/grotto.builders">    <!-- Link when you click on the title -->
    <meta name="theme-color"        content="#F6C955">                          <!-- Embed sidebar colour! -->
    <meta name="twitter:card"       content="summary_large_image">              <!-- BIG image -->

    <!-- https://github.com/SebastianAigner/twemoji-amazing -->
</svelte:head>

<Header />

<slot></slot>

<Footer />

