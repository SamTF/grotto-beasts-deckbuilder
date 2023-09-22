<!-- JS -->
<script>
    // Imports
    import { closeModal } from 'svelte-modals'
    import Icon from '../Icon.svelte';
    import toast from 'svelte-french-toast'

    // Props
    export let isOpen
    export let deckID

    // Waiting for TTS Mod to release
    const hasModReleased = false

    const exportDecklist = async () => {
        // fetching the decklist in correct format as plain text
        const res = await fetch(`/api/export/${deckID}`)
        let cards = await res.text()

        // saving the decklist as a TXT
        const f = new File([cards], 'deck.txt', {
            type: 'text/plain',
        })

        // downloading the file
        var a = document.createElement('a');
        document.body.append(a);
        a.download = `${deck.name}.txt`;
        a.href = URL.createObjectURL(f);
        a.click();
        a.remove();

        toast.success("Deck list downloaded!")

        closeModal()
    }

    const exportCode = async () => {
        // fetching the deck code as plain text
        const res = await fetch(`/api/export/tts/${deckID}`)
        let deckcode = await res.text()

        console.log(deckcode)

        await navigator.clipboard.writeText(deckcode);

        toast.success("Deck code copied!")

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
                    <!-- <Icon name='export' solid={true} strokeWidth=0 class='popup-icon' /> -->
                    <Icon name='export-file' class='popup-icon' strokeWidth='0' solid={true}/>
                </div>
                
                <h2>Export deck</h2>
                <p>Choose export method</p>

                <div class="modal-btns" style="justify-content: space-between;">
                    <button class="btn" on:click={exportDecklist}>Text Decklist</button>
                    <button class="btn" on:click={exportCode} disabled={!hasModReleased}>TTS Deck Code</button>
                </div>
            </div>
    </div>
{/if}