import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
// import { TaskService } from './modules/task/task.service';
import { TaskModule } from './modules/task/task.module';

//Tiene todas las piezas yo manejo este controllador y este servicio
@Module({
  imports: [AuthModule, TaskModule],
  // providers: [TaskService,databaseProvider[0]],
  exports: ['DATABASE_CONNECTION'],
})
export class AppModule {}
