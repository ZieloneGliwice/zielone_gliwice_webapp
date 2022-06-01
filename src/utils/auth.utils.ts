import { isUserSignedIn, user } from "src/stores/auth.store";
import { clearStoredApiAccessToken, getStoredApiAccessToken } from "./auth-local-storage.utils";
import { env } from "./env.util";

export const createAuthHeader = (accessToken: string) => ({ "X-ZUMO-AUTH": accessToken });

export const signOutAsync = async () => {
  const accessToken = getStoredApiAccessToken();

  if (!accessToken) {
    return;
  }

  const signOutResult = await fetch(`${env.authApiOriginUri}/.auth/logout`, {
    headers: createAuthHeader(accessToken),
  });

  if (signOutResult.status !== 200) {
    return;
  }

  user.set(undefined);
  isUserSignedIn.set(false);
  clearStoredApiAccessToken();
};
