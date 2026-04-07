import { Delete, Req, UseGuards } from '@nestjs/common';
import { Get, HttpCode, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from '../user/entities/user.entity';

@ApiTags('tasks')
@Controller('/api/task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskSvc: TaskService) {}
  // ? http://localhost:3000/api/task
  @Get()
  @ApiOperation({ summary: 'Obtiene todas las tareas' })
  public async getTask(@Req() request: any): Promise<any[]> {
    const user = request['user'] as User;
    //console.log(user);
    return await this.taskSvc.getTasks(user.id);
  }
  //!GET  http://localhost:3000/api/task/1
  @Get(':id')
  public async getTaskById(
    @Param('id', ParseIntPipe)
    id: number,
    @Req() request: any,
  ): Promise<any> {
    const user = request['user'] as User;
    const task = await this.taskSvc.getTaskById(id, user.id);
    if (task) return task;
    else throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  //* POST http://localhost:3000/api/task
  @Post()
  public async insertTask(
    @Req() request: any,
    @Body() task: CreateTaskDto,
  ): Promise<any> {
    const user = request['user'] as User;
    task.user_id = user.id;
    return await this.taskSvc.insertTask(task);
  }
  //! PUT http://localhost:3000/api/task/:id
  @Put(':id')
  public async updateTask(
    @Req() request: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto,
  ): Promise<any> {
    const user = request['user'] as User;
    return this.taskSvc.updateTask(id, user.id, task);
  }

  //? DELETE http://localhost:3000/api/task/:id
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteTask(
    @Req() request: any,
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<boolean> {
    const user = request['user'] as User;
    if (!user?.id) {
      throw new HttpException(
        'Usuario no autenticado',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      await this.taskSvc.deleteTask(id, user.id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}
