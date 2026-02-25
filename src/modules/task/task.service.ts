import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Client } from 'pg';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update.task.dto';

@Injectable()
export class TaskService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Client) {}
  private tasks: any[] = [];

  public async getTasks(): Promise<Task[]> {
    const query = 'SELECT * FROM task';
    const result = await this.db.query(query);
    return result.rows;
  }
  public async getTaskById(id: number): Promise<Task> {
    const query = `SELECT * FROM tasks WHERE id = '${id}'`;
    const results = (await this.db.query(query)).rows;
    return results[0];
  }
  public async insertTask(task: CreateTaskDto): Promise<number> {
    const query = 'INSERT INTO task (name, description, priority, user_id) VALUES ($1, $2, $3, $4) RETURNING id';
    const result = await this.db.query(query, [
      task.name,
      task.description,
      task.priority,
      task.user_id,
    ]);
    return result.oid;
  }

  public async updateTask(id: number, taskUpdated: UpdateTaskDto): Promise<any> {
    const task = await this.getTaskById(id);
    task.name = taskUpdated.name ?? task.name;
    task.description = taskUpdated.description ?? task.description;
    task.priority = taskUpdated.priority ?? task.priority;
    const query = `UPDATE tasks SET name = '${task.name}', description = '${task.description}', priority = ${task.priority} WHERE id = ${id} RETURNING *`;
    const result = await this.db.query(query);
    return result.rows[0];
  }

  public async deleteTask(id: number): Promise<boolean> {
    const sql = `DELETE FROM tasks WHERE id = ${id}`;
    const result = await this.db.query(sql);

    return result.rows.length > 0;
  }
}
