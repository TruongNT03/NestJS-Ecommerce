import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  accessExpires: process.env.JWT_ACCESS_EXPIRES,
  refreshExpires: process.env.JWT_REFRESH_EXPIRES,
}));
