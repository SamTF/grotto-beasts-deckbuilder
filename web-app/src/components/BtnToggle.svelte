<!-- JS -->
<script>
    // Props
    export let text = 'Toggle Button'
    export let onClick = () => {console.log("click")}
    export let toggle = false
    export let cardType
</script>

<!-- HTML -->
<button
    class="btn-toggle"
    class:active="{toggle}"
    data-card-type={cardType}
    on:click={() => {toggle = !toggle}}
>   
    {text}
</button>
