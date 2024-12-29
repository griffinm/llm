import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { OllamaService } from './ollama.service';

@Module({
  imports: [PrismaModule],
  controllers: [MessageController],
  providers: [MessageService, OllamaService],
})
export class MessageModule {}
