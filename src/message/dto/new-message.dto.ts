import { PickType } from "@nestjs/mapped-types";
import { MessageEntity } from "../entity/message.entity";

export class NewMessageDto extends PickType(
  MessageEntity, 
  [
    'chatId',
    'content',
  ]) {}
