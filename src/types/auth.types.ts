export type AuthProviderType = "google" | "facebook";

export interface ApiAuthenticationResponse {
  authenticationToken: string;
  user: {
    userId: string;
  };
}

export interface UserInfo {
  access_token: string;
  expires_on: Date;
  id_token: string;
  provider_name: AuthProviderType;
  refresh_token: string;
  user_claims: { typ: string; val: string }[];
  user_id: string;
}

export interface User {
  email: string;
}
