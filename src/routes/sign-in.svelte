<script lang="ts">
  import { routes } from "src/constants/routes.constant";

  import { env } from "src/utils/env.util";

  const redirectUri = encodeURIComponent(`${env.originUri}${routes.googleAuthCallback}`);
  const scope = encodeURIComponent(env.googleScope ?? "");
</script>

<svelte:head>
  <title>Zaloguj się | Zielone Gliwice</title>
</svelte:head>

<h1>Zaloguj się</h1>

<!-- svelte doesn't recognize global "crypto" package -->
<!-- svelte-ignore missing-declaration -->
<a
  href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUri}&prompt=consent&response_type=code id_token&nonce=${crypto.randomUUID()}&client_id=${
    env.googleClientId
  }&scope=${scope}&access_type=offline`}>Zaloguj się za pomocą konta Google</a
>
