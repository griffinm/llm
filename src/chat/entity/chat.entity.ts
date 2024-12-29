import { IsString, IsDate } from 'class-validator';

export class ChatEntity {
  @IsString()
  id: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
