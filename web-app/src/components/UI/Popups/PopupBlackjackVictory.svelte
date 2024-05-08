<!-- This pop-up modal opens when you defeat a challenger in Mr Greenz Blackjack Challenge -->

<!-- JS -->
<script>
    import { closeModal } from 'svelte-modals'
    import Icon from '../Icon.svelte'
    import { fade } from 'svelte/transition'

    // provided by <Modals />
    export let isOpen
    export let title = 'Victory!'
    export let icon = 'sparkles'
    export let challenger = 'Mr Greenz'
    export let round = 1
    export let onConfirm 
</script>

<!-- HTML -->
{#if isOpen}
    <div class="modal" role="dialog" transition:fade|global>
        <div class="modal-contents">
            <!-- Close button -->
            <button class="modal-close" on:click={closeModal}>
                <Icon name='close' solid={true} class='modal-close-icon' strokeWidth='0' />
            </button>

            <!-- Popup Icon -->
            <div class="icon-container">
                <Icon name={icon} solid={true} strokeWidth=0 class='popup-icon' />
            </div>
            
            <h2>{title}</h2>
            <p>You defeated {challenger}!</p>
            <p>Moving up to round {round+1}</p>

            <div class="modal-btns">
                <button class="btn" on:click={onConfirm}>Next Round</button>
            </div>
        </div>
    </div>
{/if}