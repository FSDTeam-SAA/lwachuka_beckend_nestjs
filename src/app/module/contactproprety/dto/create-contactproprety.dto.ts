import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsMongoId,
  IsEmail,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateContactpropretyDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsMongoId()
  @IsOptional()
  propertyId: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  userId: Types.ObjectId;

  @IsEnum(['pending', 'viewed', 'responded'], { message: 'Invalid status' })
  @IsOptional()
  status?: string;
}
