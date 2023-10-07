import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { userService } from './user.service';
import { userInfo } from 'os';

@Controller('user')
export class userController {
  constructor(
    private prisma: PrismaService,
    private userService: userService,
  ) {}

  @Post('signup')
  signUp(@Body() userInfo: any) {
    return this.userService.createUser(userInfo);
  }

  //   signIn() {
  //     return this.userService.signIn();
  //   }

  @Get('getInfo')
  getUserInformation(@Query('userId') userId: string) {
    return this.userService.getUserInformation(userId);
  }

  @Post('deleteUser')
  deleteUser(@Body() userInfo: any) {
    return this.userService.deleteUser(userInfo.userId);
  }

  // something is wrong here probably
  @Post('updateUser')
  updateUser(@Body() userInfo: any) {
    return this.userService.updateUserInfo(userInfo.userId, userInfo);
  }
}
