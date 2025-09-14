import { RoleType } from 'src/common/enum/role.enum';

export interface JwtPayload {
  id: string;
  email: string;
  roles?: RoleType[];
  jti: string;
  type: TokenType;
}

export interface UserRequestPayload {
  id: string;
  email: string;
  roles?: RoleType[];
  jti: string;
}

export enum TokenType {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}
