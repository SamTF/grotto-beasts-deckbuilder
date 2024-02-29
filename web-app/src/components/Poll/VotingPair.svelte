<!-- Represent a voting pair from the iconic beasts survey -->
<!-- Contains 2 Beasts and shows which Beast won the voting -->

<!-- JS -->
<script>
    export let pair = { title: '', data: [] }
</script>

<!-- HTML -->
<div class="panel">
    <!-- Beast 1 VS Beast 2 -->
    <h1>{pair.title}</h1>

    <!-- The actual data for each Beast in the voting bracket -->
    <div class="voting-pair">
        {#each pair.data as beast}
            <div class="voting-pair-item" style={`transform: scale(${beast.percentage >= 50 ? 1.0 : (50 + beast.percentage)/100});`} class:winner = {beast.percentage >= 50}>
                <h2>{beast.Option}</h2>
                <div class="card-image-large">
                    <a href={`/card/${beast.id}`}>
                        <img
                            src={beast.imageURL.small}
                            alt={beast.Option}
                        >
                    </a>
                </div>
                <h3>{beast.Votes} votes</h3>
                <h3>({beast.percentage}%)</h3>
            </div>
        {/each}
    </div>
</div>
