import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateContactpropretyDto {
  @IsMongoId()
  propertyOwnerId: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}