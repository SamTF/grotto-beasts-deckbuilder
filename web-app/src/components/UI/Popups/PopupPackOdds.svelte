<!-- Pop up alert -->

<!-- JS -->
<script>
    import { closeModal } from 'svelte-modals'
    import Icon from '../Icon.svelte';

    // provided by <Modals />
    export let isOpen
</script>

<!-- HTML -->
{#if isOpen}
    <div class="modal" role="dialog">
        <div class="modal-contents">
            <!-- Close button -->
            <button class="modal-close" on:click={closeModal}>
                <Icon name='close' solid={true} class='modal-close-icon' strokeWidth='0' />
            </button>

            <!-- Popup Icon -->
            <div class="icon-container">
                <Icon name='?' solid={false} strokeWidth=2 class='popup-icon' />
            </div>
            
            <h2>Pack Composition</h2>
            <ol>
                <li>100% Beast</li>
                <li>85% Challenger, 15% Beast</li>
                <li>100% Beast</li>
                <li>100% Wish</li>
                <li>75% Grotto, 25% Beast</li>
                <li>100% Beast</li>
                <li>100% Beast</li>
                <li>90% Wish, 10% Grotto</li>
                <li>100% Rare (guaranteed Challenger if 2nd card is a Beast)</li>
                <li>100% Holo (any card)</li>
            </ol>

            <code>Based on real data collected by Brandon</code>

            <div class="modal-btns">
                <button class="btn" on:click={closeModal}>OK</button>
            </div>
        </div>
    </div>
{/if}

<style>
    ol {
        background-color: var(--colour-accent);
        border-radius: 1rem;
        padding: 1rem;
        margin-bottom: 1rem;

        list-style: none;
        counter-reset: cards;
    }
    ol li {
        font-size: 1.25rem;
        padding: 4px;
        margin-left: 2rem
    }

    /* styling numbers from -> https://www.joshwcomeau.com/css/styling-ordered-lists-with-css-counters/ */
    ol li {
        counter-increment: cards;
    }
    ol li:before {
        content: "Card #" counter(cards) " - ";
        font-weight: 700;
    }
</style>