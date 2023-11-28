<!-- JS -->
<script>
    // Imports
    import { CardTypes } from "$lib/cardUtils"
    import Meta from "$components/Meta/Meta.svelte"
    import CardVersions from '$components/Cards/CardVersions.svelte'
    import { page } from "$app/stores"
    import { get } from 'svelte/store'

    // Receive data from API
    export let data
    let card = data.card
    
    // image file name - this is now set directly from the backend API
    // const cardImg = `${data.card.number}. ${data.card.name}.webp`

    // card tags
    const cardTags = data.card.tags.split(",")

    // Delete last column from header if card has no Attack value
    let headerStyle = ""
    if (data.card.type == CardTypes.GROTTO || data.card.type == CardTypes.WISH) {
        headerStyle = "grid-column: span 2;"
    }

    // Check if card has a patched other versions
    // const cardHasAltVersions = 'patchedVersion' in data.card
    const cardHasAltVersions = Object.keys(data).length > 1 // if there are multiple card objects sent by the API

    // Store different versions of card data
    const versions = ['original', 'patched']
    let currentVersion = 'original'
    const cardVersions = {
        original: data.card,
        patched: cardHasAltVersions ? data.patched : null
    }
    $: setVersion(currentVersion)

    // Show other versions of card
    let showVersions = false
    const toggleVersions = () => showVersions = !showVersions
    
    // choose which card version to display
    const setVersion = v => {
        // check if a valid version was given
        if (!versions.includes(v.toLowerCase())) {
            console.error("invalid version given")
            return
        }

        // check if version is not already selected
        // if (v.toLowerCase() == currentVersion) {
        //     console.log("selected the current version. ignoring...")
        //     return
        // }

        // update card info to match selected version
        currentVersion = v
        card = cardVersions[v]
    }

    // Automatically set version if query param was given
    if (get(page).url.searchParams.get('version') == 'digital' && cardHasAltVersions) {
        setVersion(versions[1])
    }
    
</script>

<!-- META -->
<Meta title={card.name} description={card.effect} thumbnail={card.imageURL} bigMode={true}/>

<!-- HTML -->
<div class="header-divider" style="height: 6rem;"></div>

<div class="page-container center">
    <div class="page-body">
        <div class="card-page-container">
            <div class="card-image-large">
                <img src={card.imageURL} alt={card.imageURL} loading="lazy">
            </div>

            <!-- All Card related info -->
            <div class="card-info">
                <!-- Top Line -->
                <div class="header">

                    {#if card.type == "Challenger"}
                        <!-- Challenger Goal -->
                        <div class="card-goal">
                            <span>{card.goal}</span>
                        </div>

                    {:else}
                        <!-- Summoning Cost -->
                        <div class="card-cost">
                            <span>{card.cost}</span>
                            <div class="icon">🌟</div>
                        </div>
                    {/if}
                    
                    <!-- Name and Type -->
                    <div class="text" style={headerStyle}>
                        <div class="card-name">
                            <h1>{card.name}</h1>
                            <span class="card-number">#{card.number}</span>
                        </div>

                        <h2 class="card-type">
                            {card.epic ? 'Epic✦' : ''}
                            {card.subtype} 
                            {card.type}
                        </h2>
                    </div>

                    <!-- Power -->
                    {#if card.type == "Challenger" || card.type == "Beast"}
                        <div class="card-power">
                            <span>{card.power}</span>
                        </div>
                    {/if}
                    
                </div>

                <!-- Card Tags -->
                <ul class="btn-tags card-tags">
                    {#each cardTags as tag}
                        <li><a href={`/cards?tags=${tag.trim()}`}>{tag}</a></li>
                    {/each}
                </ul>

                <!-- Card Effect -->
                <div class="card-effect">
                    <p>{card.effect}</p>
                </div>

                <!-- Flavour Text -->
                <div class="flavour-text">
                    {#if card.flavour}
                        <hr>
                        <p>{card.flavour}</p>
                    {/if}
                </div>
            </div>

            <!-- Toggle card version -->
            <!-- first check if there is a patched version -->
            {#if cardHasAltVersions}
                <!-- Card Versions -->
                <!-- <div class="card-versions-wrapper">
                    <CardVersions
                        bind:currentVersion={currentVersion}
                        onClick={() => {}}
                    />
                </div> -->

                {#if currentVersion == 'original'}
                    <button class="highlight-bubble" on:click={() => currentVersion = 'patched'}>
                        <span>Original</span>
                        <img src="/images/emotes/meowdy.png" alt="original" height="20">
                    </button>
                {:else}
                    <button class="highlight-bubble-alt" on:click={() => {currentVersion = 'original'}}>
                        <span>Digital</span>
                        <img src="/images/icons/robot.svg" alt="digital" height="20">
                    </button>
                {/if}
            {/if}
            
        </div>
    </div>
</div>

<div class="header-divider" style="margin-bottom: 0;"></div>

<style>
    .card-versions-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        margin: 1rem 0rem;
    }

    .highlight-bubble, .highlight-bubble-alt {
        margin-top: 0.5rem;
        font-size: 1.25rem;
        padding: .25rem 1rem;
    }
</style>