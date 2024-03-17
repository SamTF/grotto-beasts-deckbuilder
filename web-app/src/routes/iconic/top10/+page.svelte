<!-- JS -->
<script>
    // Receive props from API
    export let data

    // Imports
    import Meta from '$components/Meta/Meta.svelte'
	import Break from '$components/Break.svelte'

    console.log(data)
</script>

<!-- METADATA -->
<Meta title='Top 10 Iconic Grotto Beasts' description="The most well-beloved Beasts, voted on by the community!" />

<!-- HTML -->
<div class="page-container">

    <!-- HEADER -->
    <div class="deck-header">
        <div class="deck-data-container">
            <!-- Info -->
            <div class="info-container">
                <!-- Title -->
                <p class="deck-author">Round 3 - Top 10</p>
                <h1 class="deck-name desktop-only">Most Iconic Grotto Beasts</h1>
                <h1 class="deck-name mobile-only center">Most Iconic Grotto Beasts</h1>

                <!-- Tags -->
                <ul class="deck-tags">
                    <li>Popularity Contest</li>
                    <li>Democracy</li>
                    <li>Idols</li>
                </ul>

                <!-- Hightlight Buttons -->
                <div class="header-bottom-line">
                    <a
                        href="https://docs.google.com/spreadsheets/d/1J2_CULL7SgyhaKQtNP4yZAaaj79BEMDkWmaYp2O9VfI/edit?usp=sharing"
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
                <p>The third round in the series of voting for everyone's <b>favourite Beasts</b> from the <b><i>Grotto Beasts!</i></b> world, deciding which Beasts deserve a spot in the coveted Top 10 Of All Time list.</p>
                <p>This poll ran from March 2 to March 9. It was kept open longer than usual on account of numerous ties, and I finally closed it when the ties for 10th place were broken.</p>
                <p>66 people responded (myself included). After 84 years, <i><b>the results are in!</b></i></p>
                <p>I have summarised some lil fun facts in the following box. Keep scrolling down to see the full results.</p>
            </div>
        </div>

        <!-- At a Glance -->
        <div class="panel">
            <h1>At a Glance</h1>
            <div class="body-text">
                <ul>
                    <li><b>Most beloved Beasts:</b> <b><i>Meowdy</i></b> and <b><i>Sludge</i></b> (with 71% and 68% of the votes)</li>
                    <li><b>Least popular Beasts:</b> <i>Birthday Basher</i> and <i>Toadstool</i> (8, 7 votes each)</li>
                    <li><b>Closest runner-ups:</b> <i>Optimal Illusion</i> and <i>Weeniemutt</i> were 1 point short of making it!</li>
                    <li><b>Four-Way Tie:</b> <i>Baghost, Dustbunny, Strong Rat, Weeniemutt</i> were originally all tied for 10th place (20 votes each)</li>
                    <li><b>Clutch King:</b> <i>Hypodaze</i> went from 15th place to being tied for 10th place.</li>
                    <li><b>Clutch Queen:</b> <i>Dustbunny</i> went from being tied for 10th place up to 8th place.</li>
                    <li><b>Voter Turnout:</b> 66 responses, the most voters ever!!</li>
                </ul>
            </div>

            <h2 class="greeting"><span>Scroll down to view the results!</span><img src="/images/icons/point_down.svg" alt="point-down" height="28"></h2>
        </div>

        <!-- Divider -->
        <Break />

        <!-- RESULTS -->
        <!-- TOP 10 -->
        <div class="panel-wide">
            <h1>✦ TOP 10 BEASTS OF ALL TIME! ✦</h1>
            <br>

            <div class="top-ten">
                {#each data.grotto_data.slice(0, 10) as beast, index}
                    <div class="top-ten-item winner">
                        <h2>{beast.name}</h2>
                        <div class="card-image-small">
                            <a href={`/card/${beast.id}`}>
                                <img
                                    src={beast.imageURL.small}
                                    alt={beast.Option}
                                >
                            </a>
                            <div class="rank">
                                <span>{index+1}</span>
                            </div>
                        </div>
                        <h3>{beast.Votes} votes</h3>
                        <h3>({beast.percentage}%)</h3>

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
                        <h3>({beast.percentage})</h3>

                    </div>
                {/each}
            </div>
        </div>
    
    </div>


</div>