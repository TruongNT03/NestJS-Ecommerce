import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  frontendUrl: process.env.FRONTEND_URL,
}));
