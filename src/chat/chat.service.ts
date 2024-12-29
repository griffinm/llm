import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Chat } from '@prisma/client';
import { NewChatDto } from './dto/new-chat.dto';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(private readonly prisma: PrismaService) {}

  public async findMany(): Promise<Chat[]> {
    this.logger.debug('findMany');
    return this.prisma.chat.findMany();
  }

  public async createChat(chat: NewChatDto): Promise<Chat> {
    return this.prisma.chat.create({
      data: chat,
    });
  }
}
