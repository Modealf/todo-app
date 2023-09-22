import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { userController } from './user/user.controller';
import { userModule } from './user/user.module';
import { userService } from './user/user.service';

@Module({
  imports: [PrismaModule, userModule],
  controllers: [AppController, userController],
  providers: [AppService, userService],
})
export class AppModule {}
