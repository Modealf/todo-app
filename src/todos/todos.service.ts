import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async getAllTodos(userId: string) {
    try {
      return await this.prisma.todos.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw new HttpException('invalid input', HttpStatus.BAD_REQUEST);
    }
  }
  // new method
  async getTodosById(userId: string) {
    try {
      return await this.prisma.todos.findFirst({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw new HttpException('invalid input', HttpStatus.BAD_REQUEST);
    }
  }
}
