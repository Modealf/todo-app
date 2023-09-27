import { Controller, Get, Post, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { userService } from './user.service';
@Controller('user')
export class userController {
  constructor(
    private prisma: PrismaService,
    private userService: userService,
  ) {}

  @Post('signup')
  signUp(
    @Query('userEmail') userEmail: string,
    @Query('userPassword') userPassword: string,
    @Query('userFirstName') userFirstName: string,
    @Query('userLastName') userLastName: string,
    @Query('DOB') userDOB: string,
  ) {
    return this.userService.createUser(
      userEmail,
      userPassword,
      userFirstName,
      userLastName,
      userDOB,
    );
  }

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
