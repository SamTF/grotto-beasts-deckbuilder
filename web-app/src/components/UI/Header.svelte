<script>
    // Imports
    import Navbar from "./Navbar.svelte";
    import { pb, currentUser } from '$lib/pocketbase.js'

    // User Authentication
    const login = async () => {
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'discord' });
        console.log(authData)
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
                <a href="/account" class="btn-active">{$currentUser.username}</a>
            {:else}
                <div class="login-container">
                    <button class="btn" on:click={login}>
                        Log in with Discord
                        <img src="/images/icons/discord-white.svg" alt="discord logo">
                    </button>  
                </div>
            {/if}
            
        </nav>
    </div>
</header>