<!-- Metadata Component -->

<!-- JS -->
<script>
    export let title = ''
    export let description = 'Create, share, and explore decks for Grotto Beasts!'
    export let thumbnail = '/images/logo.webp'
    export let url = 'https:/grotto.builders'
    export let colour = '#F6C955'
</script>

<!-- META -->
<svelte:head>
    <!-- Page Title -->
    <title>{title == '' ? 'Grotto Builder!' : `${title} // Grotto Builder!`}</title>

    <!-- Link Embed Stuff -->
    <meta property="og:site_name"   content="grotto.builders">      <!-- Top of the embed -->
    <meta property="og:title"       content={title}>                <!-- Big Bold Letters -->
    <meta property="og:description" content={description}>          <!-- Subtitle, smaller, under title -->
    <meta property="og:image"       content={thumbnail}>            <!-- Cool lil thumbnail to the side! :) -->
    <meta property="og:url"         content={url}>                  <!-- Link when you click on the title -->
    <meta name="theme-color"        content={colour}>               <!-- Embed sidebar colour! -->
    <meta name="twitter:card"       content="summary_large_image">  <!-- BIG image -->
</svelte:head>