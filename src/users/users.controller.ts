import { Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  //   @Post('signup')
  //   signUp(): string {
  //     return 'user has been created';
  //   }

  //   signIn() {
  //     return this.usersService.signIn();
  //   }

  // @Get('')
  // getUserInformation() {}

  //   deleteUser() {}

  //   updateUser() {}
}
