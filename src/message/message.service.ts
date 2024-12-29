import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message, MessageType } from '@prisma/client';
import { OllamaService } from './ollama.service';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly ollamaService: OllamaService,
  ) {}

  public async getMessages({ chatId }: { chatId: string }): Promise<Message[]> {
    return this.prisma.message.findMany({ where: { chatId } });
  }

  public async getResponse({
    chatId,
    messageId,
  }: {
    chatId: string;
    messageId: string;
  }): Promise<Message> {
    // Load the initial source message
    const initialMessage = await this.prisma.message.findFirst({
      where: { id: messageId },
      include: { response: true },
    });

    // If the message already has a response, return it
    if (initialMessage?.response) {
      return initialMessage.response;
    }

    // Generate the response
    const response = await this.ollamaService.generateResponse(
      initialMessage.content,
    );

    // Save the response
    const responseMessage = await this.prisma.message.create({
      data: {
        role: MessageType.ASSISTANT,
        content: response,
        chatId,
      },
    });

    // Update the initial message with the response message id
    await this.prisma.message.update({
      where: { id: initialMessage.id },
      data: { responseId: responseMessage.id },
    });

    return responseMessage;
  }

  public async createMessage({
    message,
    chatId,
  }: {
    message: string;
    chatId: string;
  }): Promise<Message> {
    this.logger.log(`Creating message for chat ${chatId} with content ${message}`);

    return this.prisma.message.create({
      data: {
        role: MessageType.USER,
        content: message,
        chatId,
      },
    });
  }
}
