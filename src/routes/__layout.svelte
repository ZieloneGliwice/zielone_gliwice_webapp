<script>
  import AutoSignIn from "src/components/auto-sign-in.svelte";
  import { isSignInLoading, isUserSignedIn, user } from "src/stores/auth.store";
  import { signOutAsync } from "src/utils/auth.utils";
</script>

<AutoSignIn />
<nav>
  <a href="/">Strona główna</a>
  <a href="/about">O nas</a>
  <a href="/my-trees">Moje drzewa</a>
  {#if !$isUserSignedIn && !$isSignInLoading}
    <a href="/sign-in">Zaloguj się</a>
  {/if}
  {#if $isUserSignedIn && !$isSignInLoading}
    <button on:click={signOutAsync}>Wyloguj się</button>
  {/if}
</nav>
{#if !!$user}
  <span>{$user.email}</span>
{/if}

<slot />
