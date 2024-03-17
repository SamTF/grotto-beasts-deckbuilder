<!-- JS -->
<script>
    // Receive props from API
    export let data

    // Imports
    import Meta from '$components/Meta/Meta.svelte'
    import VotingPair from '$components/Poll/VotingPair.svelte'
    import Break from '$components/Break.svelte'
</script>

<!-- METADATA -->
<Meta title='Top 25 Iconic Grotto Beasts' description="The most well-beloved Beasts, voted on by the community!" />

<!-- HTML -->
<div class="page-container">

    <!-- HEADER -->
    <div class="deck-header">
        <div class="deck-data-container">
            <!-- Info -->
            <div class="info-container">
                <!-- Title -->
                <p class="deck-author">Round 2 - Top 25</p>
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
                        href="https://docs.google.com/spreadsheets/d/1NAaMjzHQJw_3lDk4L6PvU43xMCyf0GAexYJFK_zKiPw/edit?usp=sharing"
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
                <p>The second round in the series of voting for everyone's <b>favourite Beasts</b> from the <b><i>Grotto Beasts!</i></b> world.</p>
                <p>This poll ran from February 24 (my birthday!! :)) to February 29.</p>
                <p>40 people responded (myself included). After 5 days, <i><b>the results are in!</b></i></p>
                <p>I have summarised some lil fun facts in the following box. Keep scrolling down to see the full results.</p>
                <p><i>And stay tuned for Round 3!!</i></p>
            </div>
        </div>

        <!-- At a Glance -->
        <div class="panel">
            <h1>At a Glance</h1>
            <div class="body-text">
                <ul>
                    <li><b>Most beloved Beasts:</b> <b><i>Meowdy</i></b> and <b><i>Rummage Rat</i></b> (won by 88%)</li>
                    <li><b>Overall most voted Beasts:</b> <b><i>Weeniemutt</i></b> and <b><i>Strong Rat</i></b> (33 votes each)</li>
                    <li><b>Least popular Beasts:</b> <i>Seasprinter, Beelt, Peep-Peep</i> (4, 6, 6 votes respectively)</li>
                    <li><b>Closest votes:</b> <b>Optimal Illusion</b> VS Nightmite, <b>Thamacrow</b> VS Sweet Tooth (each won by a single vote)</li>
                    <li><b>Clutch King:</b> <i>Thamacrow</i> has won by a single vote <i>for the second time in a row!</i></li>
                    <li><b>Voter Turnout:</b> Most responses per bracket was 39, least was 32 responses - average participation was 87%</li>
                </ul>
            </div>

            <h2 class="greeting"><span>Scroll down to view the results!</span><img src="/images/icons/point_down.svg" alt="point-down" height="28"></h2>
        </div>

        <!-- Divider -->
        <Break />

        <!-- RESULTS -->
        <!-- Each Voting Category -->
        {#each data.grotto_data as pair}
            <VotingPair {pair} />
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