import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { databaseProvider } from 'src/common/providers/database.provider';
import { PrismaService } from 'src/prisma.service';
import { UtilService } from 'src/common/services/util.service';
@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService, databaseProvider[0], PrismaService, UtilService],
})
export class TaskModule {}
