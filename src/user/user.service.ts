import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { userUpdateDto } from './dtos/user-update.dto';
import { userChangePasswordDto } from './dtos/user-changepassword.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  // you need to import prisma in your user service and your user module

  // we will replace with a simple register user function that is already validated
  // moved to auth.service

  // async createUser(userInfo: any) {
  //   try {
  //     const hash = await argon2.hash(userInfo.userPassword);
  //     return await this.prisma.user.create({
  //       data: {
  //         email: userInfo.userEmail,
  //         password: hash,
  //         firstName: userInfo.userFirstName,
  //         lastName: userInfo.userLastName,
  //         dateOfBirth: userInfo.DOB ?? '',
  //       },
  //     });
  //   } catch (error) {
  //     if (error == PrismaClientKnownRequestError)
  //       throw new HttpException(
  //         'this Email is already in use',
  //         HttpStatus.CONFLICT,
  //       );
  //     else
  //       throw new HttpException(
  //         'an unknown error has occured',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //   }
  // }

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

  // what is this?
  async findUser(userEmail: string) {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: {
          email: userEmail,
        },
      });
    } catch (error) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteUser(userId: string) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new HttpException(
        'failed to delete the user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // I dont need this anymore
  // async getUserId(userEmail: string) {
  //   try {
  //     return await this.prisma.user.findUniqueOrThrow({
  //       where: {
  //         email: userEmail,
  //       },
  //       select: {
  //         id: true,
  //       },
  //     });
  //   } catch (error) {
  //     throw new HttpException(
  //       'failed to find the user',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  // we will use jwt tokens to get the user id
  async updateUserInfo(updateDto: userUpdateDto, userId: string) {
    try {
      const hash = await argon2.hash(updateDto.password);
      return await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          email: updateDto.email,
          password: hash,
          firstName: updateDto.firstName,
          lastName: updateDto.lastName,
          dateOfBirth: updateDto.dateOfBirth ?? '',
        },
      });
    } catch (error) {
      throw new HttpException(
        'failed to update the user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // nvm we dont need this anymore
  // async changePassword(userId: string, oldPassword: string, newPassword: string) {
  //   try {
  //     if(await argon2.verify(oldPassword, (await this.getUserInformation(userId)).password)
  //   } catch (error) {
  //   }
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
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  }
  async changeUserPassword(
    passwordChangeDto: userChangePasswordDto,
    userId: string,
  ) {
    try {
      return await this.prisma.user.update({
        where: {
          id: userId,
          password: passwordChangeDto.oldpassword,
        },
        data: {
          password: passwordChangeDto.newpassword,
        },
      });
    } catch (error) {}
  }
}
