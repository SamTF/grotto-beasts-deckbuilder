<script>
    // Imports
    import Navbar from "./Navbar.svelte";
    import { pb, currentUser } from '$lib/pocketbase.js'

    // User Authentication
    const login = async () => {
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'discord' });
        document.cookie = `authData=${JSON.stringify(authData)}`;

        // Update avatar
        const avatarURL = authData.meta.avatarUrl

        try {
            const update = await pb.collection('users').update($currentUser.id, {
                avatarURL: avatarURL,
                discordID: authData.meta.rawUser.id
            })
        } catch (error) {
            console.error(error)
        }
    }
</script>

<header>
    <div class="center">
        <a href="/">
            <img src="/images/logo.svg" alt="Grotto Beasts Logo" class="logo">
        </a>
    </div>

    <Navbar />

    <div>
        <nav>
            <!-- <a href="/account">Account</a> -->
            {#if $currentUser}
                <a href="/account" class="btn-active desktop-only">{$currentUser.username}</a>
            {:else}
                <div class="login-container desktop-only">
                    <button class="btn" on:click={login}>
                        Log in with Discord
                        <img src="/images/icons/discord-white.svg" alt="discord logo">
                    </button>  
                </div>
            {/if}
            
        </nav>
    </div>
</header>