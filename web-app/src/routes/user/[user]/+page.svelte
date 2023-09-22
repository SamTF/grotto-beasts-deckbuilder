<!-- JS -->
<script>
    // Imports
    import DeckGridItem from '$components/DeckExplorer/DeckGridItem.svelte'
    import Meta from '$components/Meta/Meta.svelte'
    import Icon from '$components/UI/Icon.svelte';
    import { onMount } from 'svelte'
    import { pb, currentUser } from '$lib/pocketbase.js'

    // Props
    export let data

    // Vars
    let editingPage = false
    let bio = ""

    // Date when the user's account was created
    let joinDate = new Date(data.user.created).toLocaleDateString()

    onMount(() => {
        // ...
        console.log($currentUser)
        console.log(data.user)
        bio = data.user.bio
    })

    // Three random adjectives, why not?
    const getAdjectives = async () => {
        const res = await fetch ('https://random-word-form.repl.co/random/adjective?count=3')
        const adjs = await res.json()
        console.log(adjs)

        return adjs
    }

    // whether this deck was created by the current authenticated user
    const isUsersPage = $currentUser ? data.user.id == $currentUser.id : false

    

    const toggleEditProfile = () => editingPage = !editingPage

    // Update the profile changes
    const saveProfileChanges = async () => {
        try {
            const update = await pb.collection('users').update($currentUser.id, {
                bio: bio
            })

            console.log(update)
        } catch (error) {
            console.error(error)
        }

        editingPage = false
    }
</script>

<!-- META -->
<Meta title={data.username} description={`${data.username}'s profile page'`} />

<!-- HTML -->
<div class="deck-builder-header">
    <div class="deck-data-container">
        <div class="mobile-avatar-container mobile-only">
            <img
                src={data.user.avatarURL != "" ? data.user.avatarURL : `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${data.username}&backgroundColor=25609a,2bddf8,ade985,2a481e,fac648,de3852`}
                alt="User avatar"
                class="discord-avatar mobile-only"
            >
        </div>
        
        <div class="info-container">
            <h1>{data.user.username}</h1>
            <p class="deck-author">Grotto Builder since {joinDate}</p>
            <!-- <p class="deck-author">Sub text</p> -->
            <!-- <div class="deck-author">
                <input
                    type="text" 
                    class="input-deck-author"
                    placeholder="Enter your profile description..."
                    bind:value={test}
                    pattern="[a-zA-Z0-9]*"
                    title="Only letters and numbers allowed (for now)&#013;Automatically set to your Discord username if logged in!"
                >
            </div> -->
            <ul class="deck-tags">
                {#await getAdjectives() then tags}
                    {#each tags as tag}
                        <li>{tag}</li>
                    {/each}
                {/await}
            </ul>
        </div>

        <div class="header-btns">
            <img
                src={data.user.avatarURL != "" ? data.user.avatarURL : `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${data.username}&backgroundColor=25609a,2bddf8,ade985,2a481e,fac648,de3852`}
                alt="User avatar"
                class="discord-avatar desktop-only"
            >

            {#if isUsersPage}
                {#if editingPage}
                    <textarea name="user-bio" id="user-bio" maxlength="150" placeholder={bio} bind:value={bio}></textarea>
                    <button class="btn profile-btn" on:click={saveProfileChanges}>
                        <Icon name='check-circle' class='header-btn-icon' strokeWidth='0' solid={true} />
                        <span>Save</span>
                    </button>
                {:else}
                    <div class="user-bio">
                        <p class="user-bio-text">{bio}</p>
                    </div>
                    
                    <button class="btn profile-btn" on:click={toggleEditProfile}>
                        <Icon name='edit' class='header-btn-icon' strokeWidth='0' solid={true} />
                        <span>Edit</span>
                    </button>
                {/if}
                
                <!-- <div class="deck-author">
                    <input
                        type="text" 
                        class="input-deck-author"
                        placeholder="Enter your profile description..."
                        bind:value={test}
                        pattern="[a-zA-Z0-9]*"
                        title="Only letters and numbers allowed (for now)&#013;Automatically set to your Discord username if logged in!"
                    >
                </div> -->
                
            {:else}
                <div class="user-bio">
                    <p class="user-bio-text">{bio}</p>
                </div>
            {/if}
            <!-- <div class="profile-links">
                <div>
                    <a href={`https://www.grotto-bestiary.com/inventory?username=${data.username}`}>View Grotto Bestiary Inventory</a>
                    <img src="https://www.grotto-bestiary.com/images/emotes/sludge_gay.png" alt="sludge" height="20px">
                </div>

                <div>
                    <a href="/">Message on discord</a>
                    <img src="/images/icons/discord-white.svg" alt="discord logo" height="16px">
                </div>
            </div> -->
        </div>
    </div>
</div>

<div class="header-divider-alt"></div>

<!-- USER'S DECKS -->
<div class="deck-explorer-container">
    <!-- DECK GRID -->
    <div class="deck-grid">
        {#each data.decks as deck}
            <DeckGridItem {deck} />
        {/each}
    </div>
</div>

<div class="divider-alt"></div>

<style>
    .discord-avatar {
        height: 128px;
        width: 128px;

        border-radius: 100%;
        border: 2px solid white;

        filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.5));
    }

    .mobile-avatar-container {
        display: grid;
        place-items: center;
    }

    .profile-links {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .profile-links div {
        display: flex;
        flex-direction: row;
        align-items: center;
        /* gap: 0.5rem; */
        justify-content: space-between;

        color: white;

        background-color: var(--colour-blue-dark);
        padding: 4px 8px;
        border-radius: 8px;
    }

    textarea {
        /* Size */
        height: 100%;
        max-height: 100%;
        width: 50%;
        min-width: 30ch;
        max-width: 40vw;
        text-align: start;

        /* Margins & Paddings */
        padding: 1rem;

        /* Font */
        font-weight: 700;
        font-size: 1rem;

        /* Design */
        border-radius: 8px;
        background-color: var(--colour-light);
        border: none;
    }

    .user-bio {
        display: flex;
        align-items: center;

        max-width: 50%;
        height: 100%;
    }

    .user-bio p {
        font-size: 1.25rem;

        text-align: justify;
        text-justify: auto;
        word-wrap: break-word;
    }

    /* MOBILE LAYOUT */
    @media (max-width: 940px) {
        /* Center info text */
        .info-container {
            display: grid;
            place-items: center;
        }

        /* Edit buttons in the corner */
        .profile-btn {
            position: absolute;
            top: 4px;
            right: 4px;

            height: fit-content;
            width: fit-content;
            transform: scale(0.75);
        }
        /* Hide text */
        .profile-btn span {
            display: none;
        }

        /* Bolder text */
        .user-bio p {
            font-weight: 600;
        }
    }
</style>