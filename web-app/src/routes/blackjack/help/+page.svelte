<!-- JS -->
<script>
    // Imports
    import Meta from '$components/Meta/Meta.svelte'
    import Icon from '$components/UI/Icon.svelte'
</script>

<!-- METADATA -->
<Meta title='Blackjack Bootcamp' description="Learn how to play Mr Greenz's dastardly version of Blackjack using Grotto Beasts cards!" thumbnail="/images/blackjack/MrGreenz_480.webp"/>

<!-- HTML -->
<div class="deck-header">
    <div class="deck-data-container" style="grid-template-columns: 1fr;">
        <!-- <h1>Hello</h1> -->
        <div class="info-container center">
            <h1>Mr Greenz Blackjack Challenge</h1>
            <p class="deck-author">Learn how to play this dastardly version of Blackjack that uses Grotto Beasts cards!</p>
            <ul class="deck-tags">
                <li>Gambling</li>
                <li>Exciting</li>
                <li>Addictive</li>
            </ul>
        </div>
    </div>
</div>

<div class="header-divider-alt"></div>

<div class="welcome-page">

    <!-- Quick Intro -->
    <div class="panel hover-outline">
        <h1>Introduction</h1>
        <h2 class="greeting"><span>What is this game?</span><img src="/images/emotes/meowdy.png" alt="meowdy" height="32"><img src="/images/emotes/Q.png" alt="?" height="32"></h2>
        <p>Mr Greenz Blackjack Challenge is a leveled-up version of Blackjack played with original Grotto Beasts! Cards. Can be played with any existing deck or random assortment of Grotto Beasts cards.</p>
        <p>Games are fast and exciting, but force you to rattle your brain and be strategic to make your way to grand finale!</p>
    </div>

    <!-- Game's Story -->
    <div class="panel hover-outline">
        <h1>Lore</h1>
        <h2 class="greeting"><span>Calling all Challengers!</span><img src="/images/emotes/jermaPointR.png" alt="jermaPointR" height="32"></h2>
        <p>Mr Greenz’s very own casino - <b><i>The Greedy Grinner Gambling</i></b> -  is having its <span class="red">GRAND OPENING</span> in Metrometropolis! To celebrate this, he has invited Challengers from all around the magical Grotto Beasts world to come play his games (and lose their money).</p>
        <p>The most daring and bold Challengers are welcome to try their hand at the Blackjack Tournament, where the winner will face off against the Black Belt Master of Blackjack - <span class="green">Mr Greenz himself!!</span></p>
        <p>To make matters even more exciting, <span class="green">Mr Greenz</span> has gone ALL-IN - the winner takes it all! That is, if you can defeat Mr Greenz…</p>
        <p>Somehow, you got an invitation to this tournament. And who could resist this opportunity?</p>
    </div>

    <!-- Section Buttons -->
    <div class="buttons-panel">
        <a href="#rules" class="route-icon-btn">
            <img src="/images/icons/cards.svg" alt="Cards" class="icon">
            <span>Rules</span>
        </a>

        <a href="#scoring" class="route-icon-btn">
            <img src="/images/icons/decks.svg" alt="Decks" class="icon">
            <span>Scoring</span>
        </a>

        <a href="#controls" class="route-icon-btn">
            <Icon name='cursor' solid={true} strokeWidth='0'/>
            <span>Controls</span>
        </a>
    </div>

    <!-- HOW TO PLAY -->
    <div class="panel hover-outline" id="rules">
        <h1>How to Play</h1>
    </div>

    <!-- Card Terminology -->
    <div class="panel hover-outline">
        <div class="center">
            <h2 class="greeting">0. Card Terminology</h2>
        </div>

        <p>The game is played using official Grotto Beasts cards, so the cards are exactly the same. However, for the purposes of this game, some elements are interpreted differently.</p>
        <ul>
            <li>Ignore all effects written on a card</li>
            <li>The <i>Summoning Cost</i> of <span data-card-type="beast">Beasts</span> and <span data-card-type="wish">Wishes</span> is now known as their <span class="score">SCORE</span></li>
            <li>The <i>Power</i> value of <span data-card-type="beast">Beasts</span> is now their <span class="mult">MULT</span></li>
            <li>The <i>Summoning Cost</i> of <span data-card-type="grotto">Grottos</span> is now their <span class="mult">MULT</span></li>
            <li>The <i>Power</i> value of <span data-card-type="challanger">Challengers</span> is now their <span class="power">TENACITY</span></li>
        </ul>
    </div>

    <!-- Objective -->
    <div class="panel hover-outline">
        <div class="center">
            <h2 class="greeting">1. Objective / How to Win</h2>
        </div>

        <p>Your objective is to defeat the <span data-card-type="challenger">Challenger</span> you are up against by <span class="blue">scoring points</span> <i>equal to or greater than</i> their <span class="red">Goal</span> value <b>without going over 21 points!</b></p>

        <div class="center">
            <p><b>Example: Playing against Jerma</b></p>
            <ul>
                <li>Jerma has a <span class="red">Goal of 12</span></li>
                <li>You must score at <span class="blue">least 12 points</span> to win</li>
                <li>If you score <b>over 21 points</b>, you bust out!</li>
            </ul>
        </div>

        <p>Some Challengers need to be defeated multiple times before they give up - this is known as their <span class="mult">Tenacity</span>. Tenacity is based on the Challenger's <span class="power">Power</span> value but is capped between 1-3.</p>
        
        <div class="center">
            <p><b>Example: Playing against Carl Griffensteed</b></p>
            <ul>
                <li>Carl has a <span class="red">Goal of 17</span> and <span class="power">Power/Tenacity</span> of 3</li>
                <li>You must score at <span class="blue">least 12 points</span> to win</li>
                <li>You must win against him <span class="power">3 times</span> to defeat him</li>
                <li>If you score <b>over 21 points</b>, you bust out!</li>
            </ul>
        </div>
    </div>

    <!-- Round & Turn Actions -->
    <div class="panel hover-outline">
        <div class="center">
            <h2 class="greeting">2. Round & Turn Actions</h2>
        </div>

        <p>Each round is played over <span class="blue">3 hands</span> - meaning of have three attempts to defeat your Challenger.</p>
        <p>At the start of your turn and after scoring cards, you draw cards until you have 8 cards in your hand.</p>
        
        <div class="center">
            <p><b>Each turn, there are 3 actions you can take:</b></p>
            <ul>
                <li><span class="blue">Play</span> up to 5 cards into your <b>Team</b></li>
                <li><span class="blue">Re-arrange</span> the cards in your <b>Team</b></li>
                <li><span class="red">Discard</span> up to 5 cards at once from your <b>hand</b></li>
            </ul>
        </div>

        <p>You can freely move cards between your <b>Team</b> and <b>hand</b> until you're satisfied with your strategy. Once you're done, you <span class="score">score your cards!</span></p>
    </div>

    <!-- SCORING!! -->
    <div class="panel hover-outline" id="scoring">
        <div class="center">
            <h1>SCORING</h1>
        </div>
    </div>

    <!-- Key Concepts -->
    <div class="panel hover-outline">
        <div class="center">
            <h2 class="greeting">3.1. Score & Mult</h2>
        </div>

        <p>This is where it all comes together. Let's find out how to get those points and defeat all Challengers you face off against!</p>

        <div class="center">
            <p><b>Scoring points is based on <span class="score">SCORE</span> and <span class="mult">MULT</span></b></p>
            <ul>
                <li><span class="score">SCORE</span> is how many <i>base points</i> you get from a card</li>
                <li><span class="mult">MULT</span> <i>multiplies</i> the base points to get the final points of a card
                    <ul>
                        <li>Note 1: <span class="mult">Mult</span> starts at <b>0</b>, but never multiplies your score below <b>x1</b></li>
                        <li>Note 2: <span class="mult">Mult</span> stacks for your entire hand</li>
                    </ul>
                </li>
            </ul>
        </div>

        <p>Now that you understand the concepts of <span class="score">score</span> and <span class="mult">mult</span>, let's see how to score each card.</p>
    </div>

    <!-- How To Score -->
    <div class="panel hover-outline">
        <div class="center">
            <h2 class="greeting">3.2. How To Score</h2>
        </div>

        <p> ✦ Scoring is done card by card, NOT by adding up everything ✦</p>
        <div class="center">
            <ul>
                <li>Wishes add their <span class="score">SCORE</span> value as points. Plain and simple.</li>
                <li>Grottos add their <span class="mult">MULT</span> value to your total <span class="mult">MULT</span>. They give no points.</li>
                <li>Beasts also add <span class="score">SCORE</span> as points, but their score is multiplied by your total <span class="mult">MULT</span> value.</li>
                <li>Beasts add their <span class="power">Power</span> value to your <span class="mult">MULT</span> <i><b>after scoring!</b></i>
                    <ul>
                        <li>i.e. a Beast's <span class="mult">mult</span> only affects the Beasts that come <b>after it</b>, and not itself</li>
                    </ul>
                </li>
            </ul>
        </div>
        <p>Therefore, the order in which you arrange your played cards on your team dramatically influences your final score!</p>
        <p>If this sounds very confusing, I'm sorry but <b><i>trust me it's really very intutive once you start playing!!</i></b></p>
    </div>

    <!-- Examples -->
    <div class="panel hover-outline score-examples">
        <div class="center">
            <h2 class="greeting">3.3. Score Examples</h2>
        </div>

        <p>Let's look at some examples to visualise the scoring system.</p>
        <p>You can hover on the images to zoom in or click them to open the fullscreen image!</p>

        <!-- Example 1 -->
        <a href="/images/blackjack/scoring_ex1.png" target="_blank">
            <img src="/images/blackjack/scoring_ex1.png" alt="example 1">
        </a>

        <!-- Example 2 -->
        <a href="/images/blackjack/scoring_ex2.png" target="_blank">
            <img src="/images/blackjack/scoring_ex2.png" alt="example 2">
        </a>

        <!-- Example 3 -->
        <a href="/images/blackjack/scoring_ex3.png" target="_blank">
            <img src="/images/blackjack/scoring_ex3.png" alt="example 3">
        </a>
    </div>

    <!-- CONTROLS -->
    <div class="panel hover-outline" id="controls">
        <div class="center">
            <h1>CONTROLS</h1>
        </div>
    </div>

    <!-- How To Play -->
    <div class="panel hover-outline">
        <p>Now that you understand the rules, let's go over how you can play this game online <b><i>right here on Grotto Builders!!</i></b></p>

        <div class="center">
            <h2 class="greeting">1. How To Play</h2>

            <ul>
                <li><span class="blue">To play a card</span>, simply drag it from your <b>hand</b> into the <b>Team</b> area.</li>
                <li>You can drag cards around both in your <b>Team</b> and in your <b>hand</b> to re-arrange them.</li>
                <li>You can drag cards back to the <b>hand</b> from the <b>team</b> if you'd like to swap them out.</li>
                <li><b>Shortcut:</b> right-click a card in your <b>Team</b> to instantly send it back to your hand!</li>
                <br>
            </ul>

            <p><b>NOTE:</b> You cannot drag hand cards if any cards are selected for discarding. De-select all cards before attempting to drag them from your hand into the Team.</p>
        </div>

        <p style="margin: 1rem 0;">✦✦✦</p>

        <div class="center">
            <h2 class="greeting">2. How To Discard</h2>

            <ul>
                <li><span class="red">To discard cards</span>, single-click the cards in your hand to select them, then press the <span class="red">DISCARD</span> button</li>
                <li>To de-select a card, single-click on it again.</li>
                <li><b>Shortcut:</b> To de-select ALL cards, right-click anywhere in your hand.</li>
                <br>
            </ul>

            <p><b>NOTE:</b> You can only select a maximum of 5 cards, because that is the discard maximum.</p>
        </div>

        <p style="margin: 1rem 0;">✦✦✦</p>

        <div class="center">
            <h2 class="greeting">3. How To Score</h2>

            <ul>
                <li>Press the <span class="score">SCORE</span> button and sit back :)
                    <ul>
                        <li>If you defeated the Challenger, you move on to the next round!</li>
                        <li>If you didn't, you subtract 1 hand and try again!</li>
                        <li>If you ran out of hands, you lose :(</li>
                    </ul>
                </li>   
            </ul>
        </div>
    </div>

    <!-- CONTROLS -->
    <div class="panel hover-outline" id="end">
        <div class="center">
            <h1>THE END</h1>
        </div>
    </div>

    <div class="panel hover-outline">
        <div class="center">
            <h2 class="greeting">Time to play! <img src="/images/emotes/jermaPointR.png" alt="jermaPointR" height="32"></h2>
        </div>

        <p>✦ Now that you know everything, it's to play!!! ✦</p>
        <p>Go to your <a href="/account">account settings</a> and enable <b>beta participation</b>.</p>
        <p>Once you do, a <b>BLACKJACK</b> button will appear on <i>deck pages</i> - click it to play Mr Greenz Blackjack Challenge using that deck!</p>

        <img src="https://i.imgur.com/LaAxf6t.png" alt="blackjack panel" class="panel-img">

        <h2>Alternatively, use this <a href="/blackjack">direct link to play NOW!!!</a></h2>
    </div>
</div>

<div class="divider"></div>

<!-- CSS -->
<style>
    .center {
        width: 100%;
    }
    
    .panel {
        /* align-items: start; */
        text-align: justify;
        padding: 1rem 3rem;
    }

    .route-icon-btn {
        padding: 2rem 3rem;
    }
    .route-icon-btn span {
        font-size: 1.5rem;
        font-weight: 700;
    }

    .red {
        color: var(--colour-red);
        font-weight: 700;
    }

    .green {
        color: var(--colour-green-dark);
        font-weight: 700;
        font-style: italic;
    }

    .blue {
        color: var(--colour-blue-dark);
        font-weight: 700;
    }

    .score {
        color: var(--colour-blue-dark);
        text-transform: uppercase;
        font-weight: 700;
    }

    .mult {
        color: var(--colour-accent);
        text-transform: uppercase;
        font-weight: 700;
    }

    .power {
        color: #af6a28;
        font-weight: 700;
    }

    /* Bullet list */
    ul {
        margin-top: 1rem;
    }
    ul li {
        margin-bottom: 0.5rem;
    }

    /* Card Type Icons */
    [data-card-type="challenger"]::before,
    [data-card-type="beast"]::before,
    [data-card-type="wish"]::before,
    [data-card-type="grotto"]::before {
        margin-left: 0.5rem;
        margin-right: 0.25rem;
    }

    /* Examples */
    .score-examples {
        background-color: white;
    }
    .panel-img,
    .score-examples img {
        max-width: 100%;
        max-height: 250px;
        border-radius: 1rem;
        transition: all 300ms ease;
    }
    .score-examples img:hover {
        transform: scale(2);
        outline: 8px solid var(--colour-accent);
        cursor: pointer;
    }

    /* Hover outline */
    .hover-outline:hover {
        outline: 2px solid white;
    }
</style>