import { isSignInLoading, isUserSignedIn, user } from "src/stores/auth.store";
import type { ApiAuthenticationResponse, SignInToApiOptions, UserInfo } from "src/types/auth.types";
import { clearStoredApiAccessToken, getStoredApiAccessToken, storeApiAccessToken } from "./auth-local-storage.utils";
import { callApiWithAuth } from "./call-api-with-auth.util";
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

export const signInToApiAsync = async (options: SignInToApiOptions, callback?: () => void | Promise<void>) => {
  const body = JSON.stringify(
    options.providerType === "google"
      ? {
          id_token: options.idToken,
          authorization_code: options.authorizationCode,
          redirect_uri: `${env.originUri}/google-auth-callback`,
        }
      : { access_token: options.accessToken },
  );

  const signInResponse = await fetch(`${env.authApiOriginUri}/.auth/login/${options.providerType}`, {
    method: "POST",
    body,
  });

  if (signInResponse.status !== 200) {
    isSignInLoading.set(false);

    // TODO: redirect to some error page
    throw new Error("Failed to sign in.");
  }

  const { authenticationToken } = (await signInResponse.json()) as ApiAuthenticationResponse;

  storeApiAccessToken(authenticationToken);

  callback && (await callback());

  isSignInLoading.set(false);
};

export const setUserInfoAsync = async () => {
  const userInfoResponse = await callApiWithAuth(`${env.authApiOriginUri}/.auth/me`, "GET");

  if (userInfoResponse.status !== 200) {
    return;
  }

  const { user_claims } = ((await userInfoResponse.json()) as UserInfo[])[0];

  const email =
    user_claims.find((claim) => claim.typ === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")
      ?.val ?? "";
  const name =
    user_claims.find((claim) => claim.typ === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.val ?? "";

  user.set({ email, name });
};
