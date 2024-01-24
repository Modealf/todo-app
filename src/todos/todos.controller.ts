import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(
    private prisma: PrismaService,
    private todosService: TodosService,
  ) {}

  @Get('getTodos')
  getTodos(userId: string) {
    return this.todosService.getAllTodos(userId);
  }
}
