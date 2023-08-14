<!-- Pop Up menu contianing all tags that a user can add to their deck -->

<!-- JS -->
<script>
    import { onMount } from 'svelte'
    import { cardTags } from "$lib/cardTags"
    import { deckTags } from '$lib/stores/decklist'
    import { closeModal } from 'svelte-modals'
    import Icon from '../Icon.svelte'
    import BtnToggle from "../../BtnToggle.svelte";

    // provided by <Modals />
    export let isOpen

    let tags = []
    let deckInfo = {}

    // Save/Load deck metadata to local storage
    let saveStore = false
    $: if (deckInfo && saveStore) {
        deckInfo.tags = tags
        sessionStorage.setItem("deckInfo", JSON.stringify(deckInfo))
        localStorage.setItem("deckInfo", JSON.stringify(deckInfo))
    }

    onMount(() => {
        let store = localStorage.deckInfo

        if (store) {
            deckInfo = JSON.parse(store)
            tags = deckInfo.tags
        }

        saveStore = true
    })

    const toggleTag = (tag) => {
        // tagFilters[tag] = toggle

        // Remove the tag if it already exists
        if (tags.includes(tag)) {
            const i = tags.indexOf(tag);
            tags.splice(i, 1);
        }
        // Add the tag if it doesn't yet exist (and the maximum number of tags hasn't been reached)
        else if (tags.length < 6) {
            tags.push(tag)
        }

        // to make the svelte reactive thing work
        tags = tags
        deckInfo.tags = tags
        $deckTags = tags
    }

    $: console.log(tags)
    

    const clearAll = () => tags = []
</script>

<!-- HTML -->
{#if isOpen}
    <div class="modal" role="dialog">
        <div class="modal-contents">
            <!-- Close button -->
            <button class="modal-close" on:click={closeModal}>
                <Icon name='close' solid={true} class='modal-close-icon' strokeWidth='0' />
            </button>

            <h2>Choose the tags that best describe your deck!</h2>
            <h3>Choose up to 6 tags ({tags.length}/6)</h3>

            <div class="card-tag-filters">
                {#each cardTags as tag}
                    <!-- <span class="tag">{tag}</span> -->
                    <BtnToggle text={tag} cardType={tag} toggle={tags.includes(tag)} onClick={() => toggleTag(tag)} class={`tag  ${tags.length >= 6 ? 'disabled' : ''}`}/>
                {/each}
            </div>

            <div class="modal-btns">
                <button
                    class="btn btn-positive"
                    on:click={closeModal}
                    style="background: var(--colour-green-light);"
                >OK</button>

                <button
                    class="btn btn-negative"
                    on:click={clearAll}
                    style="background: var(--colour-red);"
                >Clear All ✖</button>
            </div>
        </div>
    </div>
{/if}


<style>
    .card-tag-filters {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;

        /* max-width: 70%; */
        margin-top: 1rem;

        overflow-y: auto;
        max-height: 40vh;
    }

    .modal-btns {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-self: start;
    }
    .modal-btns button {
        font-size: 1.5rem;
        padding: 0.5rem 1.5rem;
    }
</style>