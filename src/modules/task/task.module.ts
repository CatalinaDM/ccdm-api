import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { databaseProvider } from 'src/common/providers/database.provider';
@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService, databaseProvider[0]],
})
export class TaskModule {}
