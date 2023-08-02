<!-- JS -->
<script>
    // Props
    export let text = 'Toggle Button'
    export let onClick = () => {}
    export let toggle = false
    export let cardType

    let className = 'btn-toggle'
    export { className as class };
</script>

<!-- HTML -->
<button
    class={className}
    class:active="{toggle}"
    data-card-type={cardType}
    on:click={() => {toggle = !toggle; onClick()}}
>   
    {text}
</button>
