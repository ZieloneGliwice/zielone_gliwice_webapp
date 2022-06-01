import type { UserInfo } from "src/types/auth.types";
import { getStoredApiAccessToken } from "./auth-local-storage.utils";
import { callApiWithAuth } from "./call-api-with-auth.util";
import { env } from "./env.util";

// TODO: extend to support other auth providers.
export const getUserInfoAsync = async () => {
  const token = getStoredApiAccessToken();

  if (!token) {
    return;
  }

  const userInfoResponse = await callApiWithAuth(`${env.authApiOriginUri}/.auth/me`, "GET");

  if (userInfoResponse.status !== 200) {
    return;
  }

  return ((await userInfoResponse.json()) as UserInfo[])[0];
};
