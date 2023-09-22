import { Controller, Get, Post, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { userService } from './user.service';
@Controller('user')
export class userController {
  constructor(
    private prisma: PrismaService,
    private userService: userService,
  ) {}

  //   @Post('signup')
  //   signUp(): string {
  //     return 'user has been created';
  //   }

  //   signIn() {
  //     return this.userService.signIn();
  //   }

  @Get('getInfo')
  getUserInformation(@Query('userId') userId: string) {
    return this.userService.getUserInformation(userId);
  }

  //   deleteUser() {}

  //   updateUser() {}
}
