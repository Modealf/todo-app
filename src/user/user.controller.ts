import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { userUpdateDto } from './dtos/user-update.dto';
import { GetCurrentUserId } from 'src/auth/decorators/get-user-id.decorator';
import { userChangePasswordDto } from './dtos/user-changepassword.dto';

@Controller('user')
export class userController {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  @UseGuards()
  @Get('getInfo')
  getUserInformation(@GetCurrentUserId() userId) {
    return this.userService.getUserInformation(userId);
  }

  @UseGuards()
  @Post('deleteUser')
  deleteUser(@GetCurrentUserId() userId) {
    return this.userService.deleteUser(userId);
  }

  // something is wrong here probably
  // this needs a lot of revising on how this will be used
  @UseGuards()
  @Post('updateUser')
  updateUser(@Body() updateDto: userUpdateDto, @GetCurrentUserId() userId) {
    return this.userService.updateUserInfo(updateDto, userId);
  }

  @UseGuards()
  @Post('changePassword')
  changePassword(
    @Body() passwordChangeDto: userChangePasswordDto,
    @GetCurrentUserId() userId,
  ) {
    return this.userService.changeUserPassword(passwordChangeDto, userId);
  }
}
