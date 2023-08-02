<!-- Pop up alert -->

<!-- JS -->
<script>
    import { closeModal } from 'svelte-modals'
    import Icon from '../Icon.svelte';

    // provided by <Modals />
    export let isOpen
    export let title = 'Title'
    export let message
    export let icon = 'alert'
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
                <Icon name={icon} solid={true} strokeWidth=0 class='popup-icon' />
            </div>
            
            <h2>{title}</h2>
            {#if message}
                <p>{message}</p>
            {/if}

            <div class="modal-btns">
                <button class="btn" on:click={closeModal}>OK</button>
            </div>
        </div>
    </div>
{/if}