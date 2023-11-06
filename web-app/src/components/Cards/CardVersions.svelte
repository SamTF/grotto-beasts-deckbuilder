<!-- Collapsible Menu with Toggle Buttons to pick between alternate versions of the same card -->

<!-- JS -->
<script>
    // Imports
    import versions from '$lib/versions.js'
    import { fade, blur, fly, slide, scale } from "svelte/transition"
    import { quintOut } from "svelte/easing"

    // Props
    export let showMenu = false
    export let currentVersion = versions[0].name
    export let onClick = () => {}
    

    // Functions
    const toggleMenu = () => showMenu = !showMenu
</script>

<!-- HTML -->
<div class="card-versions-container" transition:slide>
    {#if showMenu}
        <button class="btn" on:click={toggleMenu}>Hide Versions ▲</button>
    {:else}
        <button class="btn" on:click={toggleMenu}>Choose Version ▶</button>
    {/if}
</div>

{#if showMenu}
    <div class="card-versions" transition:slide={{ delay: 0, duration: 500, easing: quintOut }}>
        <button
            class="btn-toggle"
            class:active="{currentVersion == 'original'}"
            on:click={() => { currentVersion = 'original'; onClick() }}
        >
            Original 👴
        </button>

        <button
            class="btn-toggle"
            class:active="{currentVersion == 'patched'}"
            on:click={() => { currentVersion = 'patched'; onClick() }}
        >
            Patched 🤖
        </button>
    </div>
{/if}