import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Todos } from '@prisma/client';
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
  // userId from token probably so this should always be correct??, then we just add the todo information and link to the user
  // when would this fail???
  async createTodo(userId: string, todoTitle: string) {
    try {
      return await this.prisma.todos.create({
        data: {
          title: todoTitle,
          userId: userId,
        },
      });
    } catch (error) {
      throw new HttpException(
        'an unknown error has occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async editTodo(todo: Todos, newTitle: string) {
    try {
      return await this.prisma.todos.update({
        where: {
          id: todo.id,
        },
        data: {
          title: newTitle,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException(
        'an unkown error has occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // something is wrong here im not sure what???
  async markTodoComplete(todo: Todos) {
    try {
      return await this.prisma.todos.update({
        where: {
          id: todo.id,
          completed: false,
        },
        data: {
          completed: true,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException('todo already completed', HttpStatus.BAD_REQUEST);
    }
  }

  async markAllTodosComplete(userId: string) {
    try {
      return await this.prisma.todos.updateMany({
        where: {
          userId: userId,
          completed: false,
        },
        data: {
          completed: true,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException(
        'an unkown error has occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteTodo(todo: Todos) {
    try {
      return await this.prisma.todos.delete({
        where: {
          id: todo.id,
        },
      });
    } catch (error) {
      throw new HttpException(
        'an unkown error has occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // used unfamiliar property "deleteMany"
  async deleteAllTodos(userId: string) {
    try {
      return await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          todos: {
            deleteMany: {},
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        'an unknown error has occurred',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
