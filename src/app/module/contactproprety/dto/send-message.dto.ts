import { IsMongoId, IsNotEmpty, IsString, IsIn } from 'class-validator';

export class SendMessageDto {
  @IsMongoId()
  contactId: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsIn(['user', 'owner'])
  senderRole: 'user' | 'owner';
}
