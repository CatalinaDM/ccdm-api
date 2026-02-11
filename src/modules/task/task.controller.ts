import { Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('/api/task')
export class TaskController {
  constructor(private readonly taskSvc: TaskService) {}
  // ? http://localhost:3000/api/task
  @Get()
  public getTask(): any {
    return this.taskSvc.getTasks();
  }
  //!GET  http://localhost:3000/api/task/1
  @Get(':id')
  public getTaskById(@Param('id', ParseIntPipe) id: number): any {
    const task = this.taskSvc.getTaskById(id);
    if (task) return task;
    throw new HttpException(
      `Tarea con id ${id} no encontrada`,
      HttpStatus.NOT_FOUND,
    );
  }

  //* POST http://localhost:3000/api/task
  @Post()
  public insertTask(@Body() task: any): any {
    return this.taskSvc.insertTask(task);
  }
  //! PUT http://localhost:3000/api/task/:id
  @Put(':id')
  public updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: any,
  ): any {
    return this.taskSvc.updateTask(id, task);
  }

  //? DELETE http://localhost:3000/api/task/:id
  @Delete(':id')
  public deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskSvc.deleteTask(id);
  }
}
