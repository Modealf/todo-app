import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
export class userChangePasswordDto {
  @IsNotEmpty()
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$')
  newpassword: string;

  oldpassword: string;
}
