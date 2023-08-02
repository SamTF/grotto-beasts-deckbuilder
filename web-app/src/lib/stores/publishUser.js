// This store tracks whether the user would like to log in and upload their deck to their account
//  or publish to a guest account

import { writable } from "svelte/store";

export const publishUser = writable('login');