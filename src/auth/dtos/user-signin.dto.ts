import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class userSignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
