<!-- JS -->
<script>
    import Header from "$components/UI/Header.svelte";
    import Footer from "$components/UI/Footer.svelte";
    import { decklistAdvance } from '$lib/stores/decklist'
    import { pb, currentUser } from '$lib/pocketbase.js'
    import { Modals, closeModal } from 'svelte-modals'
    import { onMount } from 'svelte'
    import {Toaster} from 'svelte-french-toast'

    const x = $decklistAdvance
    const y = $currentUser

    // Check for User Auth Data cookies on mount
    onMount(() => {
        
        // check if there is an authData cookie
        if (!document.cookie.includes("authData")) {
            return
        }
        else {
            // fetch the current logged in user (if any) via cookies!
            const cookieValue = document.cookie
                .split("; ")
                .find((row) => row.startsWith("authData="))
                ?.split("=")[1];

            const authData = JSON.parse(cookieValue);

            if (!$currentUser) {
                pb.authStore.save(authData.token, { verified: true })
            }
        }
    })
</script>

<Header />

<div class="snow-overlay"></div>
<slot></slot>

<Footer />

<Modals>
    <div
      slot="backdrop"
      class="backdrop"
      on:click={closeModal}
      on:keydown={closeModal}
    />
</Modals>
<Toaster />

<style>
    .snow-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100dvw;
        height: 100dvh;
        z-index: 999;
        background-image: url("https://i.giphy.com/ggK4TpfK2cfuZcokhj.webp");
        background-repeat: repeat-x;
        pointer-events: none;
    }
</style>