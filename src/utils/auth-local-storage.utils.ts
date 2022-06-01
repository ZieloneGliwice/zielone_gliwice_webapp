import type { AuthProviderType } from "src/types/auth.types";

const authProviderTypeStorageName = "auth-provider-type";
const apiAccessTokenStorageName = "api-access-token";

export const storeAuthProviderType = (authProviderType: AuthProviderType) => {
  localStorage.setItem(authProviderTypeStorageName, authProviderType);
};

export const getStoredAuthProviderType = () =>
  localStorage.getItem(authProviderTypeStorageName) as AuthProviderType | null;

export const storeApiAccessToken = (token: string) => {
  localStorage.setItem(apiAccessTokenStorageName, token);
};

export const clearStoredApiAccessToken = () => {
  localStorage.removeItem(apiAccessTokenStorageName);
};

export const getStoredApiAccessToken = () => localStorage.getItem(apiAccessTokenStorageName);
