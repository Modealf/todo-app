import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodosService } from './todos.service';
import { Todo } from '@prisma/client';
import { GetCurrentUserId } from 'src/auth/decorators/get-user-id.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(
    private prisma: PrismaService,
    private todosService: TodosService,
  ) {}

  @Get('')
  getAll(@GetCurrentUserId() userId) {
    return this.todosService.getAllTodos(userId);
  }

  @Get(':todoId')
  getById(@Param() todoId: string) {
    return this.todosService.getTodoById(todoId);
  }

  @Post('')
  create(@GetCurrentUserId() userId, todoTitle: string) {
    return this.todosService.createTodo(userId, todoTitle);
  }

  // must be updated with todos dto updateTodoReqDto
  @Put('')
  update(@Body() updateTodoDto: any) {
    return this.todosService.updateTodo(updateTodoDto);
  }

  @Put('/updateMany')
  updateMany(@Body() todos: Todo[]) {
    return this.todosService.updateManyTodos(todos);
  }
}
