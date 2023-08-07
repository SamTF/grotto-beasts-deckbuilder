<!-- Pop up window with two options -->
<!-- letting the user login or upload deck as a guest -->

<!-- JS -->
<script>
    import { closeModal, openModal } from 'svelte-modals'
    import Icon from '../Icon.svelte';
    import Popup from './Popup.svelte';
    import { currentUser, pb } from '$lib/pocketbase.js'
    import { goto } from '$app/navigation'

    // provided by <Modals />
    export let isOpen
    export let deckID

    const deleteDeck = async () => {
        try {
            const data = await pb.collection('decks').delete(deckID)
            console.log(data)
            closeModal()
            openModal(Popup, { title: 'Deck successfully deleted', icon: 'sparkles' })
            goto('/decks')
        } catch (error) {
            openModal(Popup, { title: 'Error x(', message: error })
        }
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
            
            <h2>Are you sure?</h2>
            <p>Deleting a deck is permanent. There are no take-backsies!</p>

            <div class="modal-btns" style="justify-content: space-between;">
                <button
                    class="btn btn-positive"
                    style="background: var(--colour-green-light);"
                    on:click={deleteDeck}
                >Delete it!</button>
                <button
                    class="btn btn-negative"
                    style="background: var(--colour-red);"
                    on:click={closeModal}
                >Nevermind</button>
            </div>
        </div>
    </div>
{/if}