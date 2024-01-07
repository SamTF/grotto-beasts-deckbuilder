<!-- JS -->
<script>
    // Imports
    import DeckGridItem from '$components/DeckExplorer/DeckGridItem.svelte'
    import Meta from '$components/Meta/Meta.svelte'
    import Icon from '$components/UI/Icon.svelte';
    import IntegrationLink from '$components/UI/IntegrationLink.svelte';
    import { onMount } from 'svelte'
    import { pb, currentUser } from '$lib/pocketbase.js'
    import { CardTypes, cardsByType, countCardType } from "$lib/cardUtils"

    // Props
    export let data

    // Vars
    let editingPage = false
    let bio = ""
    let decksInfo = { challengerNum: 0, beastNum: 0, grottoNum: 0, wishNum: 0 }
    let totalUniqueCards = 0

    // Date when the user's account was created
    let joinDate = new Date(data.user.created).toLocaleDateString()

    // Seasonal Events
    const christmas = import.meta.env.VITE_EVENT_CHRISTMAS || false

    onMount(() => {
        // set the user's bio description
        bio = data.user.bio

        // Combine all decks into one array
        let combinedCards = []
        data.decks.forEach(element => {
            combinedCards = combinedCards.concat(element.cards_json.deck)
        });
        
        // Calculate unique cards
        let combinedCardIds = combinedCards.map(x => x.id)
        let uniqueCards = [...new Set(combinedCardIds)]
        totalUniqueCards = uniqueCards.length

        // Calculate the total number of cards used by type across all of the user's decks
        decksInfo.challengerNum = countCardType(combinedCards, CardTypes.CHALLENGER)
        decksInfo.beastNum = countCardType(combinedCards, CardTypes.BEAST)
        decksInfo.grottoNum = countCardType(combinedCards, CardTypes.GROTTO)
        decksInfo.wishNum = countCardType(combinedCards, CardTypes.WISH)
    })

    // whether this deck was created by the current authenticated user
    const isUsersPage = $currentUser ? data.user.id == $currentUser.id : false

    // Toggle editing mode
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

    // Reset bio changes
    const cancelChanges = () => {
        editingPage = false // disable page editing
        bio = data.user.bio // reset the bio to its original value
    }
</script>

<!-- META -->
<Meta title={data.username} description={bio ? bio : `${data.user.username}'s profile!'`} thumbnail={data.user.avatarURL ? data.user.avatarURL : `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${data.username}&backgroundColor=25609a,2bddf8,ade985,2a481e,fac648,de3852`} />

<!-- HTML -->
<div class="deck-builder-header">
    <div class="deck-data-container">
        <div class="mobile-avatar-container mobile-only">
            <img
                src={data.user.avatarURL != "" ? data.user.avatarURL : `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${data.username}&backgroundColor=25609a,2bddf8,ade985,2a481e,fac648,de3852`}
                alt="User avatar"
                class="discord-avatar mobile-only"
            >

            <!-- Seasonal Hat overlay -->
            {#if christmas == true}
                <img src="/images/hats/christmas.webp" alt="santa hat" class="cowboy-hat">
            {/if}

            <!-- Show Hat overlay if the user is a Supporter -->
            {#if data.user.supporter === true && christmas !== true}
                <img src="/images/hats/meowdy.svg" alt="cowboy hat" class="cowboy-hat">
            {/if}

        </div>
        
        <div class="info-container">
            <h1>{data.user.username}</h1>
            <p class="deck-author">Grotto Builder since {joinDate}</p>
            <ul class="deck-tags">
                {#each data.adjs as tag}
                    <li>{tag}</li>
                {/each}
            </ul>

            <!-- Profile Links -->
            <div class="profile-links">
                <!-- Bestiary Link -->
                {#if data.user.integrations?.bestiary}
                    <IntegrationLink
                        text='View Grotto Bestiary Inventory'
                        textMobile='Grotto Bestiary'
                        link={`https://www.grotto-bestiary.com/inventory?username=${data.username}`}
                        icon='/images/icons/sludge.svg'
                        iconAlt='sludge'
                    />
                {/if}

                <!-- Discord link -->
                {#if data.user.integrations?.discord}
                    <IntegrationLink
                        text='Message on Discord'
                        textMobile='Discord'
                        link={`https://discord.com/users/${data.user.discordID}/`}
                        icon='/images/icons/discord-white.svg'
                        iconAlt='discord icon'
                        iconHeight='15px'
                    />
                {/if}
            </div>
        </div>

        <div class="header-btns">
            <div class="avatar-container desktop-only">
                <img
                    src={data.user.avatarURL != "" ? data.user.avatarURL : `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${data.username}&backgroundColor=25609a,2bddf8,ade985,2a481e,fac648,de3852`}
                    alt="User avatar"
                    class="discord-avatar"
                >

                <!-- Seasonal Hat overlay -->
                {#if christmas == true}
                    <img src="/images/hats/christmas.webp" alt="santa hat" class="cowboy-hat">
                {/if}

                <!-- Show Hat overlay if the user is a Supporter -->
                {#if data.user.supporter === true && christmas !== true}
                    <img src="/images/hats/meowdy.svg" alt="cowboy hat" class="cowboy-hat">
                {/if}
            </div>

            {#if isUsersPage}
                {#if editingPage}
                    <!-- Text input area -->
                    <textarea
                        name="user-bio" id="user-bio"
                        class="user-bio-input"
                        maxlength="150"
                        placeholder={bio}
                        bind:value={bio}
                    ></textarea>

                    <!-- Butotn to save changes -->
                    <button class="btn profile-btn profile-btn-positive" on:click={saveProfileChanges}>
                        <Icon name='check-circle' class='header-btn-icon' strokeWidth='0' solid={true} />
                        <span>Save</span>
                    </button>

                    <!-- Butotn to cancel changes -->
                    <button class="btn profile-btn profile-btn-negative" on:click={cancelChanges}>
                        <Icon name='trash' class='header-btn-icon' strokeWidth='0' solid={true} />
                        <span>Cancel</span>
                    </button>
                {:else}
                    <div
                        class="user-bio user-bio-btn"
                        on:click={toggleEditProfile}
                        on:keypress={() => {}}
                    >
                        <p class="user-bio-text" class:empty={bio == ""}>
                            { bio ? bio : 'Click to add a profile bio!' }
                        </p>

                        <div class="user-bio-edit-btn">
                            <span>Click to edit ✏️</span>
                        </div>
                    </div>

                    <button class="btn profile-btn profile-btn-positive mobile-only" on:click={toggleEditProfile}>
                        <Icon name='edit' class='header-btn-icon' strokeWidth='0' solid={true} />
                        <span>Edit</span>
                    </button>
                {/if}
            {:else}
                <div class="user-bio">
                    <p class="user-bio-text">{bio}</p>
                </div>
            {/if}
        </div>
    </div>
</div>

<!-- <div class="header-divider-alt"></div> -->
<div class="deck-stats-bar">
    <div class="left">
        <img src="/images/icons/decks.svg" alt="Decks" class="icon">
        <span>{data.decks.length} decks built</span>
        <!-- <span>/</span> -->
        <img src="/images/icons/cards.svg" alt="Decks" class="icon">
        <span class="desktop-only">{totalUniqueCards}/200 unique cards used</span>
        <span class="mobile-only">{totalUniqueCards} unique cards</span>
    </div>

    <div class="right">
        <span data-card-type="challenger">{decksInfo.challengerNum}</span>
        <span data-card-type="beast">{decksInfo.beastNum}</span>
        <span data-card-type="grotto">{decksInfo.grottoNum}</span>
        <span data-card-type="wish">{decksInfo.wishNum}</span>
    </div>
</div>

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

<!-- CSS -->
<style>
    .deck-builder-header {
        border-bottom: none;
    }

    .icon {
        color: white;
        height: 2.5rem;
    }

    /* MOBILE LAYOUT */
    @media (max-width: 940px) {

        /* Mobile edit buttons */
        .profile-btn {
            position: absolute;

            height: fit-content;
            width: fit-content;
            transform: scale(0.75);
        }
        /* Hide text */
        .profile-btn span {
            display: none;
        }
        .profile-btn-positive {
            top: 4px;
            right: 4px;
        }
        .profile-btn-negative {
            top: 4px;
            left: 4px;
        }

        /* Deck stats bar */
        .deck-stats-bar {
            height: 6rem;
            flex-direction: column;
        }
        .deck-stats-bar div {
            width: 100%;
            justify-content: center;
        }
    }

    .avatar-container {
        position: relative;
    }

    .cowboy-hat {
        width: 100px;
        
        position: absolute;
        top: -24px;
        left: 0;
        right: 0; 
        margin-left: auto; 
        margin-right: auto; 
    }
</style>