import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { GetCurrentUserId } from 'src/auth/decorators/get-user-id.decorator';
import { updateTodoDto } from './dtos/update-todo.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { getTodoByIdDto } from './dtos/get-todo-by-id.dto';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { DeleteTodosDto } from './dtos/delete-todo.dto';
import { getTodoByTitleDto } from './dtos/get-todo-by-title.dto';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get('')
  getAll(@GetCurrentUserId() userId: string) {
    return this.todosService.getAllTodos(userId);
  }

  @Get('search/complete')
  getComplete(@GetCurrentUserId() userId: string) {
    return this.todosService.getCompleteTodo(userId);
  }

  @Get('search/uncomplete')
  getUncomplete(@GetCurrentUserId() userId: string) {
    return this.todosService.getUncompleteTodo(userId);
  }

  @Get(':id')
  async getTodoById(@Param() params: getTodoByIdDto) {
    try {
      return await this.todosService.getTodoById(params);
    } catch (error) {
      throw new HttpException(
        'Could not retrieve todo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // the getTodoDto must be remade into 2 seperate dtos... whats done here is not best practice
  @Get('search/title')
  async getTodosByTitle(
    @GetCurrentUserId() userId: string,
    @Query() query: getTodoByTitleDto,
  ) {
    try {
      return await this.todosService.getTodosByTitle(userId, query);
    } catch (error) {
      throw new HttpException(
        'Could not retrieve todos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('')
  create(@GetCurrentUserId() userId: string, CreateTodoDto: CreateTodoDto) {
    return this.todosService.createTodo(userId, CreateTodoDto);
  }

  @Put('')
  update(@Body() updateTodoDto: updateTodoDto) {
    return this.todosService.updateTodo(updateTodoDto);
  }

  @Put('/updateMany')
  updateMany(@Body() todos: updateTodoDto[]) {
    return this.todosService.updateManyTodos(todos);
  }

  @Delete()
  async deleteAllTodos(@GetCurrentUserId() userId: string) {
    try {
      return await this.todosService.deleteAllTodos(userId);
    } catch (error) {
      throw new HttpException(
        'Could not delete todos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Want to change batch to something else
  @Delete('batch')
  async deleteTodosByIds(
    @GetCurrentUserId() userId: string,
    @Body() deleteTodosDto: DeleteTodosDto,
  ) {
    try {
      return await this.todosService.deleteTodosById(userId, deleteTodosDto);
    } catch (error) {
      throw new HttpException(
        'Could not delete todos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
