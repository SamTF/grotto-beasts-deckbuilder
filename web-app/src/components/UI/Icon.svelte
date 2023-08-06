<!-- Wrapper for SVG icons -->

<!-- JS -->
<script>
    // Imports
    import icons from '$lib/icons.js'
    
    // Props
    export let name
    export let colour = ''
    export let solid = false
    export let width = "24"
    export let height = "24"
    export let strokeWidth = "1"
    export let role = 'img'

    let className = 'header-btn-icon'
    export { className as class };

    $: displayIcon = name in icons ? icons[name] : icons['?']
</script>

<!-- SVG -->
<svg 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 {displayIcon.box} {displayIcon.box}"
    fill={solid ? colour ? colour : 'currentColor' : 'none'}
    stroke={colour ? colour : 'currentColor'}
    stroke-width={strokeWidth}
    class={`icon ${className}`}
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-label={name}
    fill-rule="evenodd"
    clip-rule="evenodd"
>
    {@html displayIcon.svg}
</svg> 