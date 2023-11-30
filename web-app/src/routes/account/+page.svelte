<!-- JS -->
<script>
    // imports
    import { onMount } from 'svelte';
    import { pb, currentUser } from '$lib/pocketbase.js'
    import Checkbox from '$components/UI/Checkbox.svelte';
    import toast from 'svelte-french-toast'
    import { goto } from '$app/navigation'

    // vars
    let showBestiary = false
    let integrations = { bestiary: false, discord: false }

    $: changesDetected = $currentUser ? !compareObjects(integrations, $currentUser.integrations) : false

    // Read user preferences on mount
    onMount(() => {
        if ($currentUser.integrations != null) {
            // must do a deep copy of the object, not a reference
            integrations = JSON.parse(JSON.stringify($currentUser.integrations));
        }
    })

    // log in user via Discord
    const login = async () => {
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'discord' });
        delete authData.record // !!this prevents the cookie from going over the 4K size limit!!
        document.cookie = `authData=${JSON.stringify(authData)};expires = Thu, 01 Jan 2030 00:00:00 GMT; path=/`;

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

    // log out current user
    const logout = () => {
        pb.authStore.clear()
        document.cookie = "authData= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        location.reload()
    }

    // Simple way to compare objects with same order of keys
    const compareObjects = (objA, objB) => {
        return JSON.stringify(objA) === JSON.stringify(objB)
    }

    // Update the profile changes
    const saveChanges = async () => {
        // currently only saves integration changes
        try {
            const update = await pb.collection('users').update($currentUser.id, {
                integrations: integrations
            })

            toast.success("Account changes saved successfully!")
        } catch (error) {
            console.error(error)
            toast.error("Changes not saved x(")
        }
    }

    // Cancel changes
    const cancelChanges = () => {
        // currently only resets integration changes
        // must do a deep copy of the object, not a reference
        integrations = JSON.parse(JSON.stringify($currentUser.integrations))

        toast.success("Reset all changes")
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
                <p>This is your simple account page and general settings.</p>
            </div>
            <div class="account-panel-btns">
                <!-- <h3>General Settings</h3> -->
                <button class="btn" on:click={() => goto('/user/me')}>View My Profile</button>
                <button class="btn" on:click={logout}>Log out</button>
                <button class="btn" disabled={true}>Change avatar</button>
                <!-- <button class="btn" disabled={true}>Edit display name</button> -->
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

    <!-- Integration Options Toggle Buttons -->
    <!-- <div class="account-panel">
        <div class="account-panel-header">
            <h1>Integrations A</h1>
        </div>

        <div class="account-panel-body">
            <p>This allows you to link to other accounts/websites on your profile page!</p>
        </div>

        <div class="account-panel-btns">
            <button class="btn btn-toggle active">Unlink Grotto Bestiary account</button>
            <button class="btn">Link Discord profile</button>
        </div>
    </div> -->

    <!-- Integration Options - Checkboxes -->
    <div class="account-panel">
        <div class="account-panel-header">
            <h1>Integrations</h1>
        </div>

        <div class="account-panel-body">
            <p>This allows you to link to other accounts/websites on your profile page!</p>
        </div>

        <div class="account-panel-btns">
            <div class="checkbox-field">
                <span>Link Grotto Bestiary account?</span>
                <Checkbox bind:checked={integrations.bestiary} />
            </div>

            <div class="checkbox-field">
                <span>Link Discord account?</span>
                <Checkbox bind:checked={integrations.discord} />
            </div>
        </div>
    </div>

    <!-- Display Save / Cancel buttons if changes were made -->
    {#if changesDetected}
        <div class="account-panel">
            <div class="account-panel-header">
                <h2>Changes detected!</h2>
            </div>

            <div class="account-panel-btns">
                <button class="btn btn-positive" on:click={saveChanges}>Save</button>
                <button class="btn btn-negative" on:click={cancelChanges}>Cancel</button>
            </div>
        </div>
    {/if}

    <!-- Bestiary Link -->
    {#if showBestiary}
        <div class="account-panel">
            <div class="account-panel-header">
                <h2>Grotto Bestiary</h2>
            </div>
            <div class="account-panel-body">
                <p>This will add a link to your Grotto Bestiary account on your Grotto Builders profile page.</p>
            </div>
            <div class="account-panel-btns">
                <input type="text" name="bestiary-username" id="bestiary-username" placeholder="Enter your Grotto Bestiary username...">
                <button class="btn btn-positive" on:click={() => {}}>Save</button>
                <button class="btn btn-negative" on:click={() => {showBestiary = false}}>Cancel</button>
            </div>
        </div>
    {/if}
    
</div>

<style>
    .page-container {
        display: grid;
        place-items: center;
    }

    input[type="text"] {
        background: var(--colour-light);
        font-size: 1rem;
    }

    .checkbox-field {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .checkbox-field span {
        /* font-size: 1.25rem; */
        font-weight: 700;
    }
</style>