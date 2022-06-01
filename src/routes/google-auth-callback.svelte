<script lang="ts">
  import { goto } from "$app/navigation";

  import { page } from "$app/stores";
  import { routes } from "src/constants/routes.constant";
  import { isSignInLoading } from "src/stores/auth.store";
  import type { ApiAuthenticationResponse } from "src/types/auth.types";
  import { storeApiAccessToken } from "src/utils/auth-local-storage.utils";
  import { env } from "src/utils/env.util";
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

    const signInResponse = await fetch(`${env.authApiOriginUri}/.auth/login/google`, {
      method: "POST",
      body: JSON.stringify({
        id_token: idToken,
        authorization_code: authorizationCode,
        redirect_uri: `${env.originUri}/google-auth-callback`,
      }),
    });

    if (signInResponse.status !== 200) {
      isSignInLoading.set(false);

      // TODO: redirect to some error page
      throw new Error("Failed to sign in.");
    }

    const { authenticationToken } = (await signInResponse.json()) as ApiAuthenticationResponse;

    storeApiAccessToken(authenticationToken);
    isSignInLoading.set(false);

    goto(routes.home);
  });
</script>

<p>Logowanie w toku, proszę czekać...</p>
