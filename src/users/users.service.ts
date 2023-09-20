import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  // you need to import prisma in your user service and your user module

  // async signIn(email: string, password: string) {
  //     try {
  //         const foundUser = await this.prisma.user.findUniqueOrThrow({
  //             where: {
  //                 email: email,
  //             },
  //             select: {
  //                 password: true,
  //             },
  //         });
  //         //hash the password and compare it to the one in the database
  //         if (foundUser.password === password) {
  //             return '';
  //         }
  //         //if the password is correct, return a jwt token
  //     } catch (error) {
  //         return
  //     }

  // }

  async getUserInformation(userId: string){
    return await this.prisma.user.findUnique(userId);
  }
}
