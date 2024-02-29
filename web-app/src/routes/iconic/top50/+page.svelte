<!-- This page shows the results of the Most Iconic Grotto Beasts Survey -->

<!-- JS -->
<script>
    // Receive props from API
    export let data

    // Imports
    import Meta from '$components/Meta/Meta.svelte'
    import VotingPair from '$components/Poll/VotingPair.svelte'
</script>

<!-- METADATA -->
<Meta title='Top 50 Iconic Grotto Beasts' description="The most well-beloved Beasts, voted on by the community!" />

<!-- HTML -->
<div class="page-container">

    <!-- HEADER -->
    <div class="deck-header">
        <div class="deck-data-container">
            <!-- Info -->
            <div class="info-container">
                <!-- Title -->
                <p class="deck-author">Round 1 - Top 50</p>
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
                        href="https://docs.google.com/spreadsheets/d/16rcRuH_jmbTmNMDSUPXkaf3U-LcVkKy9Si3l1ShD2B0/edit?usp=sharing"
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
                <p>On the 18 of February, I made a poll for the community to vote on their <b>favourite Beasts</b> from the <b><i>Grotto Beasts!</i></b> world.</p>
                <p>It was an elimination vote where Beasts were grouped into pairs, and people voted for their favourite of the two. As such, we will find out what the <b>Top 50 Most Iconic Beasts</b> are.</p>
                <p>38 people responded (myself included). After 4 days, <i><b>the results are in!</b></i></p>
                <p>I have summarised some lil fun facts in the following box. Keep scrolling down to see the full results.</p>
                <p><i>And stay tuned for Round 2!!</i></p>
            </div>
        </div>

        <!-- At a Glance -->
        <div class="panel">
            <h1>At a Glance</h1>
            <div class="body-text">
                <ul>
                    <li><b>Most unanimously beloved Beasts:</b> <b><i>Dustbunny</i></b> and <b><i>Meowdy</i></b> (36 votes each)</li>
                    <li><b>Least popular Beasts:</b> <i>Droplganger, Lobboss, Scorptus</i> (1, 2, 4 votes respectively)</li>
                    <li><b>Closest votes:</b> <i><b>Jestapod</b> VS Jukeboxer, <b>Thamacrow</b> VS Thingamachicken, Jup3 VS <b>Jup4</b></i> (each won by a single vote)</li>
                    <li><b>TIE!:</b> <i>Peep-Peep</i> and <i>Plunky</i> tied with 17 votes each!!</li>
                    <li><b>Best Jup:</b> <i>Jup the 1st</i> got the most votes out of all Jups</li>
                    <li><b>Least skipped categories:</b> <i>Byeah Beast, Meowdy, Weeniemutt</i> (everyone voted!)</li>
                    <li><b>Most skipped:</b> <i>Chromanova, Googlow, Plunky vs Peep-Peep, Seasprinter, Spectocular, Toadstool, and Trickstircuit</i> (4 people skipped)</li>
                </ul>
            </div>
        </div>

        <!-- RESULTS -->
        <!-- Each Voting Category -->
        {#each data.grotto_data as pair}
            <div class="panel">
                <h1>{pair.title}</h1>
                <div class="voting-pair">

                    <!-- Each Beast within a category -->

                    {#if pair.title == 'Sludge vs Small Enemy Spider'}
                        <div class="voting-pair-item">
                            <h2>Sludge</h2>
                            <div class="card-image-large">
                                <a href={`/card/sludge`}>
                                    <img
                                        src='/images/cards/360/181.%20Sludge.webp'
                                        alt='Sludge'
                                    >
                                </a>
                            </div> 
                            <h3>13 Votes</h3>
                            <h3>(34%)</h3>
                        </div>

                        <div class="voting-pair-item">
                            <h2>Small Enemy Spider</h2>
                            <div class="card-image-large">
                                <a href={`/card/small enemy spider`}>
                                    <img
                                        src='/images/cards/360/182. Small Enemy Spider.webp'
                                        alt='Sludge'
                                    >
                                </a>
                            </div> 
                            <h3>9 Votes</h3>
                            <h3>(24%)</h3>
                        </div>

                        <div class="voting-pair-item winner">
                            <h2>All of the above!!</h2>
                            <div class="card-image-large">
                                <img
                                    src='/images/pog.webp'
                                    alt='pog'
                                >
                            </div> 
                            <h3>16 Votes</h3>
                            <h3>(42%)</h3>
                        </div>
                    {:else}

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

                    
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>

<!-- CSS -->
<style>
    /* MOBILE LAYOUT */
    @media (max-width: 940px) {
        /* Center align page title */
        .deck-name {
            text-align: center;
        }
    }
</style>
