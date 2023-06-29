<!-- JS -->
<script>
    export let data

    const cardImg = `${data.card.number}. ${data.card.name}.webp`
    console.log(data)
</script>

<!-- HTML -->
<div class="header-divider" style="height: 6rem;"></div>

<div class="page-container center">
    <div class="page-body">
        <div class="card-page-container">
            <div class="card-image debug-outline">
                <img src={`/images/cards/${cardImg}`} alt={cardImg}>
            </div>

            <!-- All Card related info -->
            <div class="card-info debug-outline">
                <!-- Top Line -->
                <div class="header debug-outline">

                    {#if data.card.type == "Challenger"}
                        <!-- Challenger Goal -->
                        <div class="card-goal debug-outline">
                            <span>{data.card.goal}</span>
                        </div>

                    {:else}
                        <!-- Summoning Cost -->
                        <div class="card-cost debug-outline">
                            <span>{data.card.cost}</span>
                            <div class="icon">🌟</div>
                        </div>
                    {/if}
                    

                    <!-- Name and Type -->
                    <div class="text debug-outline">
                        <div class="card-name">
                            <h1>{data.card.name}</h1>
                            <span class="card-number">#{data.card.number}</span>
                        </div>

                        <h2 class="card-type">{data.card.type}</h2>
                    </div>

                    <!-- Power -->
                    {#if data.card.type == "Challenger" || data.card.type == "Beast"}
                    <div class="card-power debug-outline">
                        <span>{data.card.power}</span>
                    </div>
                    {/if}
                    
                </div>

                <!-- Card Effect -->
                <div class="card-effect debug-outline">
                    <p>{data.card.effect}</p>
                </div>

                <!-- Flavour Text -->
                <div class="flavour-text debug-outline">
                    <hr>
                    <p>The long paw of the law!</p>
                </div>
            </div>
        </div>
    </div>
</div>