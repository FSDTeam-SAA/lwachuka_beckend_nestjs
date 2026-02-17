import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty({ message: 'First  name is requried' })
  fullName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is Requried' })
  email: string;

  @IsStrongPassword()
  @IsNotEmpty({ message: 'Password is Requried' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Role is required' })
  role: string;
}
