<script>
    // Imports
    import { createEventDispatcher } from "svelte"
    
    // Props
    export let id, name, type, quantity, imageURL, collection
    export let fullCard

    // imageURL = fullCard?.imageURL
    imageURL = typeof fullCard?.imageURL === "string" ? fullCard?.imageURL : fullCard?.imageURL.small;
    collection = fullCard?.collectionName

    // Event dispatcher
    const dispatch = createEventDispatcher()

    // Hover effect
    const onHover = () => {
        dispatch('cardHover', { id, name, imageURL, collection })
    }
</script>

<!-- HTML -->
<div class="card-item" on:mouseenter={onHover}>
    <span>{quantity}x</span>
    <span><a href="/card/{name}">{name}</a></span>
</div>