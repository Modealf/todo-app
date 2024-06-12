import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { userSignUpDto } from '../user/dtos/user-signup.dto';
import { userSignInDto } from '../user/dtos/user-signin.dto';
import { JwtPayload } from './types/jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  // couple of questions come up here  .....
  async signIn(signInDto: userSignInDto): Promise<any> {
    const user = await this.userService.findUser(signInDto.email);
    if (!(await argon2.verify(user.password, signInDto.password))) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(signUpDto: userSignUpDto) {
    try {
      const hash = await argon2.hash(signUpDto.password);
      return await this.prisma.user.create({
        data: {
          email: signUpDto.email,
          password: hash,
          firstName: signUpDto.firstName,
          lastName: signUpDto.lastName,
          dateOfBirth: signUpDto.dateOfBirth ?? '',
        },
      });
    } catch (error) {
      if (error == PrismaClientKnownRequestError)
        throw new HttpException(
          'this Email is already in use',
          HttpStatus.CONFLICT,
        );
      else
        throw new HttpException(
          'an unknown error has occured',
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
