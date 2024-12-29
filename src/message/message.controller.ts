import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageEntity } from "./entity/message.entity";
import { NewMessageDto } from "./dto/new-message.dto";
import { MessageType } from "@prisma/client";

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('chats/:chatId/messages')
  async findMany(@Param('chatId') chatId: string): Promise<MessageEntity[]> {
    return this.messageService.getMessages({ chatId });
  }

  @Post('chats/:chatId/messages')
  async create(@Param('chatId') chatId: string, @Body() message: NewMessageDto): Promise<MessageEntity> {
    return this.messageService.createMessage({ chatId, ...message }, MessageType.USER);
  }
}
