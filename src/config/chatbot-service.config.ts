import { registerAs } from '@nestjs/config';

export default registerAs('chatbotService', () => ({
  host: process.env.CHATBOT_SERVICE_HOST,
  port: process.env.CHATBOT_SERVICE_PORT,
}));
