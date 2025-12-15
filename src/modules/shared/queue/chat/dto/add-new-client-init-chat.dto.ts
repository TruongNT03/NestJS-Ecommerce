import { UserConversation } from 'src/entities/user-conversations.entity';
import { MessageResponseDto } from 'src/modules/chat/dto/response/message-response.dto';

export class AddNewClientInitChat {
  conversation: UserConversation;
  message: MessageResponseDto;
}
