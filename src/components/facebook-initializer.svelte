<script lang="ts">
  import { env } from "src/utils/env.util";
  import { onMount } from "svelte";

  onMount(() => {
    FB.init({
      appId: env.facebookAppId,
      autoLogAppEvents: true,
      xfbml: true,
      version: "v14.0",
    });
  });
</script>

<svelte:head>
  <script crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
</svelte:head>
