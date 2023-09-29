<!-- Simple component for the integration links on a user's profile -->

<!-- JS -->
<script>
    // Imports
    import Icon from "./Icon.svelte";
    
    // Props
    export let link
    export let text
    export let textMobile = text
    export let icon
    export let iconAlt
    export let iconHeight = '20px'
</script>

<!-- HTML -->
<div class="integration-link">
    <Icon name='link' solid={true} strokeWidth=0 class='integration-icon' />
      
    <a href={link} target="_blank">
        <span class="desktop-only">{text}</span>
        <span class="mobile-only">{textMobile}</span>
    </a>

    <img src={icon} alt={iconAlt} height={iconHeight}>
</div>