import { getStoredApiAccessToken, storeApiAccessToken } from "./auth-local-storage.utils";
import { createAuthHeader } from "./auth.utils";
import { env } from "./env.util";

// TODO: extend to support other providers
export const callApiWithAuth = async (
  url: string,
  method: "GET" | "POST",
  body?: BodyInit | null,
): Promise<Response> => {
  const accessToken = getStoredApiAccessToken();

  if (!accessToken) {
    throw new Error("No api access token found in storage.");
  }

  const firstResponse = await fetch(url, {
    method,
    headers: createAuthHeader(accessToken),
    body,
  });

  if (firstResponse.status !== 401) {
    return firstResponse;
  }

  const refreshResponse = await fetch(`${env.authApiOriginUri}/.auth/refresh`, {
    headers: createAuthHeader(accessToken),
  });

  if (refreshResponse.status !== 200) {
    return firstResponse;
  }

  const freshApiAccessToken = (await refreshResponse.json()).authenticationToken;
  storeApiAccessToken(freshApiAccessToken);

  return await fetch(url, {
    method,
    headers: createAuthHeader(accessToken),
    body,
  });
};
