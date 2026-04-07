import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AuthModule, TaskModule, UserModule],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
