import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class userService {
  constructor(private prisma: PrismaService) {}
  // you need to import prisma in your user service and your user module

  async createUser(
    userEmail: string,
    userPassword: string,
    userFirstName: string,
    userLastName: string,
    DOB?: string,
  ) {
    try {
      return await this.prisma.user.create({
        data: {
          email: userEmail,
          password: userPassword,
          firstName: userFirstName,
          lastName: userLastName,
          dateOfBirth: DOB ?? '',
        },
      });
    } catch (error) {
      if (error == PrismaClientKnownRequestError)
        throw new HttpException(
          'This Email is already in use',
          HttpStatus.CONFLICT,
        );
      else
        throw new HttpException(
          'an unknown error has occured',
          HttpStatus.BAD_REQUEST,
        );
    }
  }

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

  async getUserInformation(userId: string) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
        select: {
          email: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
          createdAt: true,
        },
      });
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
