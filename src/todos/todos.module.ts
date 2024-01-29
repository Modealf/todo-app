import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaModule],
})
export class TodosModule {}
