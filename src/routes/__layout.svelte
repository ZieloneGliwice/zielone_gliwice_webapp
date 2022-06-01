<script>
  import AutoSignIn from "src/components/auto-sign-in.svelte";
  import FacebookInitializer from "src/components/facebook-initializer.svelte";
  import { isSignInLoading, isUserSignedIn, user } from "src/stores/auth.store";
  import { signOutAsync } from "src/utils/auth.utils";
</script>

<FacebookInitializer />
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
  <span>{$user.name} ({$user.email})</span>
{/if}

<slot />
