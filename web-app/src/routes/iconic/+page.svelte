<!-- JS -->
<script>
    // Receive props from API
    export let data

    // Imports
    import Meta from '$components/Meta/Meta.svelte'
    import Icon from '$components/UI/Icon.svelte'
    import Break from '$components/Break.svelte'
</script>

<!-- METADATA -->
<Meta title='Most Iconic Grotto Beasts' description="The most well-beloved Beasts, voted on by the community!" />

<!-- HTML -->
<div class="page-container">

    <!-- Header -->
    <div class="deck-header">
        <div class="deck-data-container">
            <div class="info-container">
                <h1>The Most Iconic Grotto Beasts</h1>
                <p class="deck-author">As decided by the grotto community!</p>
                <ul class="deck-tags">
                    <li>Democracy</li>
                    <li>Popularity Contest</li>
                    <li>Idols</li>
                    <li>Meowdy is the Beast</li>
                    <li>Grotto Tribal</li>
                </ul>
            </div>
        </div>
    </div>
    
    <!-- Divider -->
    <div class="header-divider-alt"></div>

    <!-- Main Page Content -->
    <div class="main-container center">

        <!-- Introduction -->
        <div class="panel">
            <h1>Introduction</h1>
            <h2 class="greeting"><span>Hi there grotto pals!</span><img src="/images/icons/hand_wave.svg" alt="meowdy" height="28"><img src="/images/emotes/meowdy.png" alt="meowdy" height="32"></h2>
            <div class="body-text">
                <p>The Most Iconic Grotto Beasts is a micro-project where the community came together to vote on which <b>Beasts</b> in the <b><i>Grotto Beasts!</i></b> World they like more and believe are more iconic.</p>
                <p>It was started by me on February 18 because I thought it would be fun :)</p>
                <p>We are currently on Round 2, which narrowed down the <b>Top 25 Beast</b>. So far, an average of 39 people have participated in each round.</p>
                <p>Stay tuned for Round 3, where we will decide <i>the Top 10!!</i></p>
            </div>
            <h2 class="greeting"><span>Click the buttons below to view the results!</span><img src="/images/icons/point_down.svg" alt="point-down" height="28"></h2>
        </div>

        <Break/>

        <!-- BEASTS -->
        <h1>BEASTS</h1>

        <!-- Buttons Panel -->
        <div class="buttons-panel">
            <a href="/iconic/top50" class="route-icon-btn">
                <img src="/images/icons/cards.svg" alt="Cards" class="icon">
                <span>Top 50</span>
            </a>
            <a href="/iconic/top25" class="route-icon-btn">
                <img src="/images/icons/decks.svg" alt="Decks" class="icon">
                <span>Top 25</span>
            </a>

            <a href="/iconic/top10" class="route-icon-btn">
                <img src="/images/icons/pack.svg" alt="Card Pack" class="icon">
                <!-- <Icon name='?' solid={false} strokeWidth='2' /> -->
                <span>Top 10</span>
            </a>
        </div>

        <Break/>

        <!-- Challengers -->
        <h1>CHALLENGERS</h1>

        <div class="buttons-panel">
             <a href="/iconic/challengers" class="route-icon-btn">
                <!-- <img src="/images/icons/pack.svg" alt="Card Pack" class="icon"> -->
                <Icon name='trophy' solid={true} />
                <span>Top 10</span>
            </a>
        </div>

        <Break/>

        <!-- Methodoly -->
        <div class="panel">
            <h1>Methodology</h1>
            <div class="body-text">
                <p>The voting was based on elimination rounds for the first 2 rounds. All Beasts were arranged into pairs in order of their Card Number, and people picked one of the two per pair. The Beast within a pair with the least votes was eliminated, and the winning Beast proceeded to the next round.</p>
                <p>In the rare cases were a tie was observed, both Beasts moved on to the next round and were arranged into different pairs.</p>
                <br>
                <p>For the Top 10 voting rounds, people directly chose their 10 favourite options and those with the most votes were crowned the winners.</p>
                <p>When a tie was observed for 10th place, we just waited it out until more people voted and the ties were broken.</p>
                <br>
                <p>Voting was done via a Google Form shared around the Grotto Beasts Discord community. Thank you very much to everyone who participated!!</p>
            </div>
        </div>
    </div>
</div>