import type { User } from "src/types/auth.types";
import { writable } from "svelte/store";

export const user = writable<User | undefined>();

export const isUserSignedIn = writable(false);

export const isSignInLoading = writable(true);
