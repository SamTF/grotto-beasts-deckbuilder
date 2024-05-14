<!-- The settings iteam that allow users to toggle stuff or link to other resources -->

<!-- JS -->
<script>
    // Imports
    import Checkbox from '$components/UI/Checkbox.svelte'

    // Props
    export let text = 'Settings Item'
    export let emote = 'Q.png'
    export let emote_alt = '?'
    export let onClick = () => {}
    export let hasToggleBtn = true
    export let toggle = true
</script>

<!-- HTML -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="settings-item hover-outline anim-wiggle-sm">
    <span class="center-row" style="gap: 0.5rem" on:click={onClick}>
        <img src={`/images/emotes/${emote}`} alt={emote_alt} height="24">
        <span>{text}</span>
    </span>

    {#if hasToggleBtn}
        <Checkbox bind:checked={toggle} />
    {/if}
</div>