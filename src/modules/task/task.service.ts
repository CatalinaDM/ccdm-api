import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  private tasks: any[] = [];

  public getTasks(): any[] {
    return this.tasks;
  }
  public getTaskById(id: number): any[] {
    const task = this.tasks.find( (data) => data.id == id);
    return task;
  }
  public insertTask(task: CreateTaskDto): any {
    const id = this.tasks.length + 1;
    const position = this.tasks.push({
      ...task,
      id,
    });
    //task.id = id;
    return this.tasks[position - 1];
  }

  public updateTask(id: number, task: any): any {
    const taskUpdate = this.tasks.map((data) => {
      if (data.id == id) {
        if (task.name) data.name = task.name;
        if (task.description) data.description = task.description;
        if (task.priority != null) data.priority = task.priority;
        return data;
      }
    });
    return taskUpdate;
  }

  public deleteTask(id: number): string {
    const array = this.tasks.filter((data) => data.id != id);
    this.tasks = array;
    return `Tarea con id ${id} eliminada`;
  }
}
