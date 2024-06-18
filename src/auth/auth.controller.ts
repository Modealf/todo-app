import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { userSignUpDto } from './dtos/user-signup.dto';
import { userSignInDto } from './dtos/user-signin.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() signInDto: userSignInDto) {
    return this.authService.signIn(signInDto);
  }

  // Is this correct?
  @Post('signUp')
  signUp(@Body() userInfo: userSignUpDto) {
    return this.authService.register(userInfo);
  }

  // this probably needs change
  // I think this should be in the user service
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
