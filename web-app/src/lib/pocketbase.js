// IMPORTS
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

// Initialise Pocketbase
const domain = import.meta.env.VITE_PB_DOMAIN
export const pb = new PocketBase(domain);

// Save current user
export const currentUser = writable(pb.authStore.model)

// listen to user changes
pb.authStore.onChange((auth) => {
    console.log('>>> auth changed: ', auth)
    currentUser.set(pb.authStore.model)
})