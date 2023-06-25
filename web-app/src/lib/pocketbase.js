// IMPORTS
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

// Initialise Pocketbase
const domain = import.meta.env.VITE_PB_DOMAIN
export const pb = new PocketBase(domain);