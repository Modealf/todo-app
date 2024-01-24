import { Module } from '@nestjs/common';
import { userService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [userService],
  imports: [PrismaModule],
  exports: [userModule],
})
export class userModule {}
