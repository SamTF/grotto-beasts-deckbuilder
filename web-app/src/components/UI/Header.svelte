<script>
    // Imports
    import Navbar from "./Navbar.svelte";
    import { pb, currentUser } from '$lib/pocketbase.js'

    // User Authentication
    const login = async () => {
        console.log("AAAAA")
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'discord' });
        console.log(authData)
    }
</script>

<header>
    <div class="center">
        <a href="/">
            <img src="/images/Logo.webp" alt="Grotto Beasts Logo">
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

<style>
    .login-container {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        align-items: center;
    }
    .btn {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        align-items: center;
    }
    .login-container img {
        height: 1rem;
    }
</style>