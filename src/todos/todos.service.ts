import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateTodoDto } from './dtos/update-todo.dto';
import { getTodoByIdDto } from './dtos/get-todo-by-id.dto';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { DeleteTodosDto } from './dtos/delete-todo.dto';
import { getTodoByTitleDto } from './dtos/get-todo-by-title.dto';

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
      throw new HttpException(
        'Could not retrieve todos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // userId will be made visible to the front-end for simplicity
  async getTodoById(dto: getTodoByIdDto) {
    try {
      return await this.prisma.todo.findFirst({
        where: {
          id: dto.id,
        },
      });
    } catch (error) {
      throw new HttpException('invalid input', HttpStatus.BAD_REQUEST);
    }
  }

  async getTodosByTitle(userId: string, dto: getTodoByTitleDto) {
    try {
      return await this.prisma.todo.findMany({
        where: {
          userId: userId,
          title: {
            contains: dto.title,
          },
        },
      });
    } catch (error) {
      throw new HttpException('invalid input', HttpStatus.BAD_REQUEST);
    }
  }
  async getCompleteTodo(userId: string) {
    try {
      return await this.prisma.todo.findMany({
        where: {
          completed: true,
          userId: userId,
        },
      });
    } catch (error) {
      throw new HttpException('invalid input', HttpStatus.BAD_REQUEST);
    }
  }
  async getUncompleteTodo(userId: string) {
    try {
      return await this.prisma.todo.findMany({
        where: {
          completed: false,
          userId: userId,
        },
      });
    } catch (error) {
      throw new HttpException('invalid input', HttpStatus.BAD_REQUEST);
    }
  }
  // userId from token probably so this should always be correct??, then we just add the todo information and link to the user
  // when would this fail??? I think never...
  async createTodo(userId: string, CreateTodoDto: CreateTodoDto) {
    try {
      return await this.prisma.todo.create({
        data: {
          title: CreateTodoDto.title,
          userId: userId,
        },
      });
    } catch (error) {
      console.error('Error creating todo:', error);
      throw new HttpException(
        'an unknown error has occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateTodo(userId: string, todo: updateTodoDto) {
    try {
      return await this.prisma.todo.update({
        where: {
          userId: userId,
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

  async updateManyTodos(userId: string, todos: updateTodoDto[]) {
    console.log('todos:', todos);
    console.log('userId:', userId);
    try {
      const updatePromises = todos.map((todo: updateTodoDto) =>
        this.updateTodo(userId, todo),
      );
      return await Promise.all(updatePromises);
    } catch (error) {
      console.error('Error updating todos:', error); // Log the actual error
      throw new HttpException(
        'An unknown error has occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

  // bad implementation of delete could of just used the
  async deleteTodosById(userId: string, deleteTodosDto: DeleteTodosDto) {
    try {
      return await this.prisma.todo.deleteMany({
        where: {
          userId: userId,
          id: { in: deleteTodosDto.ids },
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
      return await this.prisma.todo.deleteMany({
        where: {
          userId: userId,
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
