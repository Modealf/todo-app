import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';

@Controller('user')
export class userController {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  // @Post('signup')
  // signUp(@Body() userInfo: any) {
  //   return this.userService.createUser(userInfo);
  // }

  //   signIn() {
  //     return this.userService.signIn();
  //   }

  @UseGuards()
  @Get('getInfo')
  getUserInformation(@Query('userId') userId: string) {
    return this.userService.getUserInformation(userId);
  }

  @UseGuards()
  @Post('deleteUser')
  deleteUser(@Body() userInfo: any) {
    return this.userService.deleteUser(userInfo.userId);
  }

  // something is wrong here probably
  @UseGuards()
  @Post('updateUser')
  updateUser(@Body() userInfo: any) {
    return this.userService.updateUserInfo(userInfo.userId, userInfo);
  }
}
