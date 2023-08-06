<!-- JS -->
<script>
    // Imports
    import { CardTypes } from "$lib/cardUtils"
    import Meta from "$components/Meta/Meta.svelte";

    // Receive data from API
    export let data
    console.log(data)

    // image file name
    const cardImg = `${data.card.number}. ${data.card.name}.webp`

    // card tags
    const cardTags = data.card.tags.split(",")

    // Delete last column from header if card has no Attack value
    let headerStyle = ""
    if (data.card.type == CardTypes.GROTTO || data.card.type == CardTypes.WISH) {
        headerStyle = "grid-column: span 2;"
    }
    
</script>

<!-- META -->
<Meta title={data.card.name} />

<!-- HTML -->
<div class="header-divider" style="height: 6rem;"></div>

<div class="page-container center">
    <div class="page-body">
        <div class="card-page-container">
            <div class="card-image-large">
                <img src={`/images/cards/${cardImg}`} alt={cardImg}>
            </div>

            <!-- All Card related info -->
            <div class="card-info">
                <!-- Top Line -->
                <div class="header">

                    {#if data.card.type == "Challenger"}
                        <!-- Challenger Goal -->
                        <div class="card-goal">
                            <span>{data.card.goal}</span>
                        </div>

                    {:else}
                        <!-- Summoning Cost -->
                        <div class="card-cost">
                            <span>{data.card.cost}</span>
                            <div class="icon">🌟</div>
                        </div>
                    {/if}
                    
                    <!-- Name and Type -->
                    <div class="text" style={headerStyle}>
                        <div class="card-name">
                            <h1>{data.card.name}</h1>
                            <span class="card-number">#{data.card.number}</span>
                        </div>

                        <h2 class="card-type">
                            {data.card.epic ? 'Epic✦' : ''}
                            {data.card.subtype} 
                            {data.card.type}
                        </h2>
                    </div>

                    <!-- Power -->
                    {#if data.card.type == "Challenger" || data.card.type == "Beast"}
                        <div class="card-power">
                            <span>{data.card.power}</span>
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
                    <p>{data.card.effect}</p>
                </div>

                <!-- Flavour Text -->
                <div class="flavour-text">
                    {#if data.card.flavour}
                        <hr>
                        <p>{data.card.flavour}</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<div class="header-divider" style="margin-bottom: 0;"></div>