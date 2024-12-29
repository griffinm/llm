import { Injectable, Logger } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import axios from 'axios';

@Injectable()
export class OllamaService {
  private readonly logger = new Logger(OllamaService.name);
  private readonly ollamaClient: AxiosInstance;
  private readonly model: string;

  constructor() {
    this.ollamaClient = axios.create({
      baseURL: 'http://localhost:11434',
    });
    this.model = 'llama3.1:8b';
  }

  public async generateResponse(message: string): Promise<string> {
    const startTime = new Date();
    this.logger.debug(`Generating response for message`);

    const response = await this.ollamaClient.post('/api/chat', {
      model: this.model,
      messages: this.formatMessage({ message }),
      stream: false,
    });

    const content = response.data.message.content;

    this.logger.debug(
      `Response generated in ${new Date().getTime() - startTime.getTime()}ms. Content: ${content}`,
    );
    return content;
  }

  private formatMessage({ message }: { message: string }) {
    return [
      {
        role: 'user',
        content: message,
      },
    ];
  }
}
