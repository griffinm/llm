import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatEntity } from './entity/chat.entity';
import { plainToInstance } from 'class-transformer';
import { NewChatDto } from './dto/new-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async findMany(): Promise<ChatEntity[]> {
    const chats = await this.chatService.findMany();
    return plainToInstance(ChatEntity, chats);
  }

  @Post()
  async createChat(@Body() chat: NewChatDto): Promise<ChatEntity> {
    const newChat = await this.chatService.createChat(chat);
    return plainToInstance(ChatEntity, newChat);
  }
}
