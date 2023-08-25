<!-- JS -->
<script>
    // imports
    import { pb, currentUser } from '$lib/pocketbase.js'

    // log in user via Discord
    const login = async () => {
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'discord' });
        document.cookie = `authData=${JSON.stringify(authData)}`;
    }

    // log out current user
    const logout = () => {
        pb.authStore.clear()
        document.cookie = "authData= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        location.reload()
    }
</script>

<!-- HTML -->
<div class="header-divider"></div>

<div class="page-container">
    <div class="account-panel">
        <div class="account-panel-header">
            <h1>Account Settings</h1>
        </div>
  
        <!-- Loggged in Account Panel -->
        {#if $currentUser}
            <div class="account-panel-body">
                <h2>Hi there, {$currentUser.username}! <img src="/images/emotes/meowdy.png" alt="meowdy" height="32"> </h2>
                    <br>
                    <p>This is your simple account page</p>
                    <p>It is a work in progress</p>
                    <p>Right only logging in and out works</p>
                    <p>there will be more options here later :)</p>
            </div>
            <div class="account-panel-btns">
                <button class="btn" on:click={logout}>Log out</button>
                <button class="btn" disabled={true}>Edit display name</button>
                <button class="btn" disabled={true}>Edit avatar</button>
                <button class="btn" disabled={true}>Make profile private</button>
            </div>

        <!-- Not Signed in Panel -->
        {:else}
            <div class="account-panel-body">
                <h2>Hi there partner, looks like you are not signed in! <img src="/images/emotes/meowdy.png" alt="meowdy" height="32"> </h2>
                <br>
                <p>Conveniently sign in using Discord to take full advantage of <b>Grotto Builders!</b></p>
                <p>This allows you to: </p>
                <ul>
                    <li>take credit for decks you create</li>
                    <li>edit your published decks</li>
                    <li>bookmark other people's decks</li>
                </ul>
            </div>
            <div class="account-panel-btns">
                <button class="btn" on:click={login}>Log In</button>
            </div>
        {/if}
        
    </div>
    
</div>

<style>
    .page-container {
        display: grid;
        place-items: center;
    }
</style>