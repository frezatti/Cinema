import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'The email cannot be empty.' })
  @IsEmail({}, { message: 'Please provide a valid email.' })
  email: string;

  @IsOptional()
  @IsString({ message: 'The name must be a string.' })
  name?: string;

  @IsNotEmpty({ message: 'The password cannot be empty.' })
  @MinLength(8, { message: 'The password must be at least 8 characters long.' })
  password: string;
}
