<script lang="ts">
  import { isSignInLoading, isUserSignedIn, user } from "src/stores/auth.store";
  import { getStoredApiAccessToken } from "src/utils/auth-local-storage.utils";
  import { setUserInfoAsync } from "src/utils/auth.utils";
  import { onMount } from "svelte";

  onMount(async () => {
    isSignInLoading.set(true);

    if (!!$user) {
      isUserSignedIn.set(true);
      isSignInLoading.set(false);
      return;
    }

    const accessToken = getStoredApiAccessToken();

    if (!accessToken) {
      isSignInLoading.set(false);
      return;
    }

    const token = getStoredApiAccessToken();

    if (!token) {
      return;
    }

    await setUserInfoAsync();

    isSignInLoading.set(false);
    isUserSignedIn.set(true);
    isSignInLoading.set(false);
  });
</script>
