<!-- JS -->
<script>
    // Receive props from API
    export let data

    // Imports
    import Meta from '$components/Meta/Meta.svelte'
	import Break from '$components/Break.svelte'
</script>

<!-- METADATA -->
<Meta title='Top 10 Iconic Challengers' description="The hardest-hitting crowd pleasers in the JWF!" />

<!-- HTML -->
<div class="page-container">

    <!-- HEADER -->
    <div class="deck-header">
        <div class="deck-data-container">
            <!-- Info -->
            <div class="info-container">
                <!-- Title -->
                <p class="deck-author">Top 10 Challengers</p>
                <h1 class="deck-name desktop-only">Most Iconic Challengers</h1>
                <h1 class="deck-name mobile-only center">Most Iconic Challengers</h1>

                <!-- Tags -->
                <ul class="deck-tags">
                    <li>Popularity Contest</li>
                    <li>Democracy</li>
                    <li>Idols</li>
                </ul>

                <!-- Hightlight Buttons -->
                <div class="header-bottom-line">
                    <a
                        href="https://docs.google.com/spreadsheets/d/1n1r7yN9SdAZCdPBZae3sk4bDm7jqJliNIhsi6eL6Vvw/edit?usp=sharing"
                        target="_blank"
                        class="highlight-bubble"
                        title="Link to Google Sheets with raw survey data"
                        >
                        <span>Raw Data</span>
                        <img src="/images/emotes/meowdy.png" alt="original" height="16">
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Divider -->
    <div class="header-divider"></div>

    <!-- Main Page Content -->
    <div class="main-container center">
    
        <!-- Introduction -->
        <div class="panel">
            <h1>Introduction</h1>
            <div class="body-text">
                <p>After making an objectively-correct <a href="/iconic/top10">list of the greatest Grotto Beasts</a> of all time, we now come to the <b>Challengers</b> - <i>the top dogs of the Jerma Wrestling Federation</i>.</p>
                <p>It was time to settle once and for all who the true Kings and Queens of the ring are! To seperate the heroes from the heels (i think that's what they say in wrestling right?)</p>
                <p>In this <b>Royal Rumble of democracy</b>, the Grotto community has voted on and chosen their 10 favourite Challengers - the highest voted Challengers made it to glory, and the rest were eliminated over the top rope!</p>
                <p>The vote ran for about two weeks in April and got 32 responses in total. After 84 years, <b><i>the results are in!</i></b></p>
                <p>I have summarised some lil fun facts in the following box. Keep scrolling down to see the full results.</p>
            </div>
        </div>

        <!-- At a Glance -->
        <div class="panel">
            <h1>At a Glance</h1>
            <div class="body-text">
                <ul>
                    <li><b>Fan Favourite:</b> <b>Bugleberry</b> turned out to be everyone's favourite Challenger with 84% of the vote!!</li>
                    <li><b>Eternal Underdog:</b> Much like in the Jerma Rumbles, <b>Glueman</b> made it to the final 2 on the ring <i>but still did not win!</i></li>
                    <li><b>Small Streamer:</b> <b>Jerma</b> himself just <i>barely</i> managed to stay in the Top 10, tied with the Giant Rat.</li>
                    <li><b>Most Hated:</b> <i>The Green Screen</i> and <i>Cloud King</i> only got 2 votes each :(</li>
                    <li><b>Grotto World:</b> None of the original Grotto Beasts characters made it into the Top 10</li>
                    <li><b>The Planets:</b> <i>Jerma Moon</i> seems to be the most beloved planet, while <i>Jerma Earth</i> is the less liked</li>
                </ul>
            </div>

            <h2 class="greeting"><span>Scroll down to view the results!</span><img src="/images/icons/point_down.svg" alt="point-down" height="28"></h2>
        </div>

        <!-- Divider -->
        <Break />

        <!-- RESULTS -->
        <!-- TOP 10 -->
        <div class="panel-wide">
            <h1>✦ TOP 10 CHALLENGERS OF ALL TIME! ✦</h1>
            <br>

            <div class="top-ten">
                {#each data.grotto_data.slice(0, 10) as challenger, index}
                    <div class="top-ten-item winner">
                        <h2>{challenger.name}</h2>
                        <div class="card-image-small">
                            <a href={`/card/${challenger.id}`}>
                                <img
                                    src={challenger.imageURL.small}
                                    alt={challenger.Option}
                                >
                            </a>
                            <div class="rank">
                                <span>{index+1}</span>
                            </div>
                        </div>
                        <h3>{challenger.Votes} votes</h3>
                        <h3>({challenger.percentage}%)</h3>

                    </div>
                {/each}
            </div>

            <br><br>
        </div>

        <!-- Divider -->
        <Break />

        <!-- Runner-Ups -->
        <div class="panel">
            <h1>Runner Ups</h1>
            <div class="top-ten">
                {#each data.grotto_data.slice(10, data.grotto_data.length) as beast}
                    <div class="top-ten-item" style={`transform: scale(${beast.percentage >= 60 ? 1.0 : (60 + beast.percentage)/100});`}>
                        <h2>{beast.name}</h2>
                        <div class="card-image-small">
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
    
    </div>


</div>