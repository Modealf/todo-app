import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async getAllTodos(userId: string) {
    try {
      return await this.prisma.todo.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw new HttpException('invalid input', HttpStatus.BAD_REQUEST);
    }
  }
  // new method
  async getTodoById(userId: string) {
    try {
      return await this.prisma.todo.findFirst({
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
      return await this.prisma.todo.create({
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

  async updateTodo(todo: Todo) {
    try {
      return await this.prisma.todo.update({
        where: {
          id: todo.id,
        },
        data: {
          title: todo.title,
          completed: todo.completed,
        },
      });
    } catch (error) {
      throw new HttpException(
        'an unkown error has occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateManyTodos(todos: Todo[]) {
    todos.forEach((todo: Todo) => {
      this.updateTodo(todo);
    });
  }
  // something is wrong here im not sure what???
  // async markTodoComplete(todo: Todo) {
  //   try {
  //     return await this.prisma.todo.update({
  //       where: {
  //         id: todo.id,
  //         completed: false,
  //       },
  //       data: {
  //         completed: true,
  //         updatedAt: new Date(),
  //       },
  //     });
  //   } catch (error) {
  //     throw new HttpException('todo already completed', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // async markAllTodoComplete(userId: string) {
  //   try {
  //     return await this.prisma.todo.updateMany({
  //       where: {
  //         userId: userId,
  //         completed: false,
  //       },
  //       data: {
  //         completed: true,
  //         updatedAt: new Date(),
  //       },
  //     });
  //   } catch (error) {
  //     throw new HttpException(
  //       'an unkown error has occured',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  async deleteTodo(todo: Todo) {
    try {
      return await this.prisma.todo.delete({
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
  async deleteAllTodo(userId: string) {
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
