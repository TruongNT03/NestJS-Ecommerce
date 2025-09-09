export interface JwtPayload {
  id: string;
  email: string;
  role?: string[];
  jti: string;
  type: TokenType;
}

export interface UserRequestPayload {
  id: string;
  email: string;
  role?: string[];
  jti: string;
}

export enum TokenType {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}
