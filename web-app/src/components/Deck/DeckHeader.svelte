<!-- JS -->
<script>
    // Imports
    import { page } from '$app/stores'
    
    // Props
    export let author, name, tags
</script>

<!-- HTML -->
<div class="deck-header">
    <div class="info-container">
        <a href={`/users/${author}`} class="deck-author">{author}</a>
        <h1 class="deck-name">{name}</h1>
        
        <ul class="deck-tags">
            {#each tags as tag}
                <li><a href={$page.url.pathname}>{tag}</a></li>
            {/each}
        </ul>
    </div>
</div>

<div class="header-divider">

</div>

