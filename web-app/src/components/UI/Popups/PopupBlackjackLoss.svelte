<!-- This pop-up modal opens when you defeat a challenger in Mr Greenz Blackjack Challenge -->

<!-- JS -->
<script>
    import { closeModal } from 'svelte-modals'
    import Icon from '../Icon.svelte'
    import { fade } from 'svelte/transition'

    // provided by <Modals />
    export let isOpen
    export let title = 'Game Over :('
    export let icon = 'sad'
    export let challenger = 'Mr Greenz'
    export let round = 1
    export let onConfirm 
</script>

<!-- HTML -->
{#if isOpen}
    <div class="modal" role="dialog" transition:fade|global>
        <div class="modal-contents">
            <!-- Popup Icon -->
            <div class="icon-container">
                <Icon name={icon} solid={true} strokeWidth=0 class='popup-icon' />
            </div>
            
            <h2>{title}</h2>
            <p>You were defeated by {challenger}!</p>
            <p>You got as far as round #{round} this time. Don't give up!</p>

            <!-- Buttons -->
            <div class="modal-btns">
                <a class="btn btn-negative" href="https://www.youtube.com/watch?v=IVXOU0QeHxY">Give up</a>

                <button
                    class="btn btn-positive"
                    style="background: var(--colour-green-light);"
                    on:click={onConfirm}
                >Try Again</button>
            </div>
        </div>
    </div>
{/if}