<script>
    // Imports
    import Navbar from "./Navbar.svelte";
    import { pb, currentUser } from '$lib/pocketbase.js'

    // User Authentication
    const login = async () => {
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'discord' });
        delete authData.record // !!this prevents the cookie from going over the 4K size limit!!
        document.cookie = `authData=${JSON.stringify(authData)}; expires = Thu, 01 Jan 2030 00:00:00 GMT; path=/`;

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