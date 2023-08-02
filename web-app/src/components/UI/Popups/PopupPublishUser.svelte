<!-- Pop up window with two options -->
<!-- letting the user login or upload deck as a guest -->

<!-- JS -->
<script>
    import { closeModal } from 'svelte-modals'
    import Icon from '../Icon.svelte';
    import { publishUser } from '$lib/stores/publishUser'

    // provided by <Modals />
    export let isOpen

    const deckPublishUser = (choice) => {
        localStorage.setItem('deckPublishUser', choice)
        console.log('user: ', localStorage.getItem('deckPublishUser'))
        $publishUser = choice
        console.log('publish user: ', $publishUser)
        closeModal()
    }
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
                <Icon name='alert' solid={true} strokeWidth=0 class='popup-icon' />
            </div>
            
            <h2>Not Logged In</h2>
            <p>You may choose to login via Discord and upload the deck to your account, or upload the deck as a Guest User.</p>
            <!-- <p>Logging in will tie the deck to your account, allowing you to edit it later and take credit for your creation :D</p>
            <p>If you choose to upload the deck as Guest, you will not be able to edit nor will you get any accolades :P</p> -->
            <b>Choose the option you prefer, then click "Publish Deck" again!</b>

            <div class="modal-btns" style="justify-content: space-between;">
                <button class="btn" on:click={() => deckPublishUser('discord')}>Log In</button>
                <button class="btn" on:click={() => deckPublishUser('guest')}>Continue as Guest</button>
            </div>
        </div>
    </div>
{/if}