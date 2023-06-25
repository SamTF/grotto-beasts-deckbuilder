<script>
    // Imports
    import { createEventDispatcher } from "svelte"
    
    // Props
    export let id, name, type, quantity

    // Event dispatcher
    const dispatch = createEventDispatcher()

    // Hover effect
    const onHover = () => {
        console.log(`hovering over ${name}`)
        dispatch('cardHover', { id, name })
    }
</script>

<!-- HTML -->
<div class="card-item" on:mouseenter={onHover}>
    <span>{quantity}x</span>
    <span><a href="/images/cards/{id}. {name}.webp">{name}</a></span>
</div>