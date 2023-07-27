<!-- JS -->
<script>
    // imports
    import { pb, currentUser } from '$lib/pocketbase.js'

    // user auth functions
    const logout = () => {
        pb.authStore.clear()
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
        
    </div>
    
</div>

<style>
    .page-container {
        display: grid;
        place-items: center;
    }

    .account-panel {
        /* size */
        height: 32rem;
        width: 28rem;

        padding: 1rem 2rem;
        
        /* design */
        background-color: var(--colour-mid-light);
        border-radius: 1rem;
    }

    .account-panel-header {
        margin-bottom: 2rem;
    }
    .account-panel-body {
        color: white;
        margin-bottom: 2rem;
    }
    .account-panel-btns {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .account-panel-btns button {
        width: 100%;
    }
    .account-panel-btns button:disabled {
        opacity: 0.5;
        cursor: no-drop;
    }
</style>