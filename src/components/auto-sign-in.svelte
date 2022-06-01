<script lang="ts">
  import { isSignInLoading, isUserSignedIn, user } from "src/stores/auth.store";
  import { getStoredApiAccessToken } from "src/utils/auth-local-storage.utils";
  import { getUserInfoAsync } from "src/utils/get-user-info.utils";
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

    const userInfo = await getUserInfoAsync();

    if (!userInfo) {
      isSignInLoading.set(false);
      return;
    }

    user.set({ email: userInfo.user_id });
    isUserSignedIn.set(true);
    isSignInLoading.set(false);
  });
</script>
