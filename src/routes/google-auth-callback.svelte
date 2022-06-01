<script lang="ts">
  import { goto } from "$app/navigation";

  import { page } from "$app/stores";
  import { routes } from "src/constants/routes.constant";
  import { isSignInLoading } from "src/stores/auth.store";
  import { setUserInfoAsync, signInToApiAsync } from "src/utils/auth.utils";
  import { onMount } from "svelte";

  onMount(async () => {
    isSignInLoading.set(true);

    // Google returns query params preceeded by "#" instead of "?".
    const url = new URL($page.url.toString().replace("#", "?"));
    const authorizationCode = url.searchParams.get("code");
    const idToken = url.searchParams.get("id_token");

    if (!authorizationCode || !idToken) {
      isSignInLoading.set(false);

      // TODO: redirect to some error page
      throw new Error("Failed to sign in.");
    }

    await signInToApiAsync({ providerType: "google", idToken, authorizationCode });
    await setUserInfoAsync();

    goto(routes.home);
  });
</script>

<p>Logowanie w toku, proszę czekać...</p>
