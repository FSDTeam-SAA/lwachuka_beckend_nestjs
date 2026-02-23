import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContactpropretyDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
