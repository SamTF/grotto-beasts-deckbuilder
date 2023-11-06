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

    // Y-scrolling
    // code from: https://blog.kowalczyk.info/article/de13a71a392f488b9352b300b3ed722d/hide-header-on-scroll-in-svelte.html

    let y = 0
    let lastY = 0
    let hideHeader = false;
    $: headerClass = scrollAnimation(y)

    // Update Y position and direction of scrolling
    const scrollAnimation = (y) => {
        const dy = lastY - y    // determine the direction of scrolling
        lastY = y               // update last Y

        return deriveClass(y, dy)
    }

    // hide when user scrolls down and show when user scrolls up.
    const deriveClass = (y, dy) => {
        const offset = 200
        const threshold = 60

        // Always true if at the top of the page
        if (y < offset) {
            return 'show'
        }

        // Scrolling down always hides below the offset
        if (dy < 0) {
            return 'hide'
        }

        // Check if the given threshold was surpassed or not
        if (Math.abs(dy) <= threshold) {
            return headerClass
        }

        // Check if scrolling up (with less tolerance)
        if (dy > 0) {
            return 'show'
        }

        // Otherwise, hide header
        return 'hide'
    }
</script>

<!-- <header class:hide={hideHeader}> -->
<header class={headerClass}>
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

<svelte:window bind:scrollY={y} />