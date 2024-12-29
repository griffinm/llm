import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatEntity } from './entity/chat.entity';
import { plainToInstance } from 'class-transformer';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async findMany(): Promise<ChatEntity[]> {
    const chats = await this.chatService.findMany();
    return plainToInstance(ChatEntity, chats);
  }
}
