import { MessageType } from "@prisma/client";
import { IsString, IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class MessageEntity {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(MessageType)
  @IsNotEmpty()
  role: MessageType;

  @IsString()
  @IsNotEmpty()
  chatId: string;
}
