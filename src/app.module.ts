import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { userController } from './user/user.controller';
import { userModule } from './user/user.module';
import { UserService } from './user/user.service';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    userModule,
    ConfigModule.forRoot(),
    TodosModule,
    AuthModule,
  ],
  controllers: [AppController, userController, TodosController],
  providers: [AppService, UserService, TodosService],
})
export class AppModule {}
