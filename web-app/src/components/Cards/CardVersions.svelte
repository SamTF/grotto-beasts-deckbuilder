<!-- Collapsible Menu with Toggle Buttons to pick between alternate versions of the same card -->

<!-- JS -->
<script>
    // Imports
    import versions from '$lib/versions.js'
    import { slide } from "svelte/transition"
    import { quintOut } from "svelte/easing"

    // Props
    export let showMenu = false
    export let currentVersion = versions[0].name
    export let onClick = () => {}
    

    // Functions
    const toggleMenu = () => showMenu = !showMenu
</script>

<!-- HTML -->
<div class="card-versions-container">
    {#if showMenu}
        <button class="btn" on:click={toggleMenu}>Hide Versions ▲</button>
    {:else}
        <button class="btn" on:click={toggleMenu}>Choose Version ▶</button>
    {/if}
</div>

{#if showMenu}
    <div class="card-versions" transition:slide>
        <button
            class="btn-toggle"
            class:active="{currentVersion == 'original'}"
            on:click={() => { currentVersion = 'original'; onClick() }}
        >
            <span>Original</span>
            <img src="/images/emotes/meowdy.png" alt="meowdy" height="16">
        </button>

        <button
            class="btn-toggle"
            class:active="{currentVersion == 'patched'}"
            on:click={() => { currentVersion = 'patched'; onClick() }}
        >
            <span>Digital</span>
            <img src="/images/icons/robot.svg" alt="meowdy" height="16">
        </button>
    </div>
{/if}

<style>
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
    }
</style>