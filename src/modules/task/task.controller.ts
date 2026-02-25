import { Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('/api/task')
export class TaskController {
  constructor(private readonly taskSvc: TaskService) {}
  // ? http://localhost:3000/api/task
  @Get()
  @ApiOperation({ summary: 'Obtiene todas las tareas' })
  public async getTask(): Promise<any[]> {
    return await this.taskSvc.getTasks();
  }
  //!GET  http://localhost:3000/api/task/1
  @Get(':id')
  public async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const task = await this.taskSvc.getTaskById(id);
    if (task) return task;
    throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
  }

  //* POST http://localhost:3000/api/task
  @Post()
  public async insertTask(@Body() task: CreateTaskDto): Promise<any> {
    return await this.taskSvc.insertTask(task);
  }
  //! PUT http://localhost:3000/api/task/:id
  @Put(':id')
  public async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto,
  ): Promise<any> {
    return this.taskSvc.updateTask(id, task);
  }

  //? DELETE http://localhost:3000/api/task/:id
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    const result = await this.taskSvc.deleteTask(id);
    if (!result)
      throw new HttpException('No se puede eliminar la tarea',HttpStatus.INTERNAL_SERVER_ERROR);
    return result;
  }
}
