<!-- The cards in the pack opening simulator -->

<!-- JS -->
<script>
    // Imports
    import svelteTilt from 'vanilla-tilt-svelte'
    import { slide, fade, fly } from "svelte/transition"

    // Props
    export let card = {}
    export let flipped = false
</script>

<!-- HTML -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flip-card" in:fade={{ duration: 500 }} use:svelteTilt={{ reverse: true, glare: false, "max-glare": 0.5 }} on:click>
    <div class="flip-card-inner" class:flip={flipped}>
        <div class="flip-card-front card-image">
            <img src="/images/cards/back.webp" alt="card">
        </div>
        <div class="flip-card-back card-image" class:card-image-holo={card.holo}>
            <img src={card.imageURL.small} alt={card.name}>
        </div>
    </div>
</div>

<!-- CSS -->
<style>
    .card-image {
        border-radius: 8px;
    }
    .card-image img {
        max-height: 275px;
        border-radius: 8px;
        position: relative;
    }
    .card-image-holo::after {
        position: absolute;
        top: 10px;
        right: 10px;
        content: "✨";
        font-size: 3rem;
    }

    .flip-card {
        height: 275px;
        width: 200px;
        perspective: 1500px;
    }

    .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
        transform: rotateY(var(--rotateY));
    }

    .flip-card-front, .flip-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .flip-card-back {
        transform: rotateY(180deg);
    }

    .flip {
        --rotateY: 180deg;
    }

    /* MOBILE LAYOUT */
    @media (max-width: 940px) {
        .flip-card {
            height: 200px;
            width: 142px;
        }

        .card-image img {
            max-height: 200px;
        }
    }
</style>