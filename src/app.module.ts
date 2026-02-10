import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TaskService } from './modules/task/task.service';

//Tiene todas las piezas yo manejo este controllador y este servicio
@Module({
  imports: [AuthModule],
  providers: [TaskService],
})
export class AppModule {}
