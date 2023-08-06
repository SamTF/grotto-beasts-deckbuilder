<!-- Toggle Buttons that filter cards by the selected tags -->

<!-- JS -->
<script>
    // Imports
    import BtnToggle from "./BtnToggle.svelte";
    import { cardTags } from "$lib/cardTags"

    // Props
    export let visible = false
    export let tagFilters = []

    const toggleFilters = (toggle) => {
        visible = toggle
    }

    const clearTags = () => {
        tagFilters = []
    }

    const toggleTag = (tag) => {
        // tagFilters[tag] = toggle

        // Remove the tag if it already exists
        if (tagFilters.includes(tag)) {
            const i = tagFilters.indexOf(tag);
            tagFilters.splice(i, 1);
        }
        // Add the tag if it doesn't yet exist
        else {
            tagFilters.push(tag)
        }

        // to make the svelte reactive thing work
        tagFilters = tagFilters
    }
</script>

<!-- HTML -->
<div class="card-tag-filters-container">
    <!-- Tags are hidden -->
    {#if !visible}
        <button class="btn" on:click={() => toggleFilters(true)}>Filter by Tags ▶</button>
        <!-- ▼ -->

        <!-- Tags are visible -->
    {:else}
        <div class="buttons">
            <button class="btn" on:click={() => toggleFilters(false)}>Hide Tags ▲</button>
            <button class="btn red-btn" on:click={clearTags}>Clear All ✖</button>
        </div>

        <div class="card-tag-filters">
            {#each cardTags as tag}
                <BtnToggle text={tag} cardType={tag} toggle={tagFilters.includes(tag)} onClick={() => toggleTag(tag)} />
            {/each}
        </div>
    {/if}
</div>