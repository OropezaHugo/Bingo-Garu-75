export type User = {
  firstName: string,
  lastName: string,
  email: string,
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
