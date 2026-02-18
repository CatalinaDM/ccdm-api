import { Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('/api/task')
export class TaskController {
  constructor(private readonly taskSvc: TaskService) {}
  // ? http://localhost:3000/api/task
  @Get()
  public async getTask(): Promise<any[]> {
    return await this.taskSvc.getTasks();
  }
  //!GET  http://localhost:3000/api/task/1
  @Get(':id')
  public async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const task = await this.taskSvc.getTaskById(id);
    if (task && task.length > 0) return task;
    else throw new HttpException(`Task no found`, HttpStatus.NOT_FOUND);
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
    @Body() task: any,
  ): Promise<any> {
    return await this.taskSvc.updateTask(id, task);
  }

  //? DELETE http://localhost:3000/api/task/:id
  @Delete(':id')
  public deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskSvc.deleteTask(id);
  }
}
