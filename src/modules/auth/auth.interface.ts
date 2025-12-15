import { LoginType } from 'src/common/enum/login-type.enum';
import { RoleType } from 'src/common/enum/role.enum';

export interface JwtPayload {
  id: string;
  email: string;
  roles?: RoleType[];
  loginType: LoginType;
  jti: string;
  type: TokenType;
}

export interface UserRequestPayload {
  id: string;
  email: string;
  roles?: RoleType[];
  loginType: LoginType;
  jti: string;
}

export enum TokenType {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export interface UserGooglePayload {
  googleId: string;
  email: string;
  name: string;
  avatar: string;
}

export interface GoogleRedisData {
  accessToken: string;
  refreshToken: string;
  code: string;
}
