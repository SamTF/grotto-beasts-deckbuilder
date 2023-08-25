<!-- JS -->
<script>
    import Header from "$components/UI/Header.svelte";
    import Footer from "$components/UI/Footer.svelte";
    import { decklistAdvance } from '$lib/stores/decklist'
    import { pb, currentUser } from '$lib/pocketbase.js'
    import { Modals, closeModal } from 'svelte-modals'
    import { onMount } from 'svelte'

    const x = $decklistAdvance
    const y = $currentUser

    // Check for User Auth Data cookies on mount
    onMount(() => {
        console.log('cookies', document.cookie)
        
        // check if there is an authData cookie
        if (!document.cookie.includes("authData")) {
            console.log("No user login cookies found!")
            return
        }
        else {
            console.log("User log in cookies found!")

            // fetch the current logged in user (if any) via cookies!
            const cookieValue = document.cookie
                .split("; ")
                .find((row) => row.startsWith("authData="))
                ?.split("=")[1];

            console.log('cookieValue', cookieValue)

            const authData = JSON.parse(cookieValue);
            console.log(authData)

            if (!$currentUser) {
                console.log("Not logged in!! Authenticating user automatically...")
                pb.authStore.save(authData.token, { verified: true })
            }
        }
    })
</script>

<Header />

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