import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterRequest {
  @IsString()
  @IsNotEmpty()
  @Length(0, 50)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  password!: string;
}
