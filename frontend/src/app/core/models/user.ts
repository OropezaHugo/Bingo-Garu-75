export type User = {
  firstName: string,
  lastName: string,
  email: string,
  role: string,
}

export interface AuthToken {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: string
}

export interface LoginVal {
  email: string
  password: string
}
export interface GoogleUserInfo {
  at_hash: string;
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  name: string;
  picture: string;
  sub: string;
  role: string;
}
