import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NewMessageDto } from "./dto/new-message.dto";
import { Message, MessageType } from "@prisma/client";

@Injectable()
export class MessageService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  public async createMessage(message: NewMessageDto, role: MessageType): Promise<Message> {
    return this.prisma.message.create({ 
      data: {
        ...message,
        role,
      }
    });
  }

  public async getMessages({
    chatId,
  }: {
    chatId: string;
  }): Promise<Message[]> {
    return this.prisma.message.findMany({ where: { chatId } });
  }
}
