import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Client } from 'pg';

@Injectable()
export class TaskService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Client) {}
  private tasks: any[] = [];

  public async getTasks(): Promise<any[]> {
    const query = 'SELECT * FROM task';
    const result = await this.db.query(query);
    return result.rows;
  }
  public async getTaskById(id: number): Promise<any> {
    const query = `SELECT * FROM task WHERE id = ${id}`;
    const result = await this.db.query(query, [id]);
    return result.rows[0];
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

  public async updateTask(id: number, task: any): Promise<any> {
   const query = `UPDATE task SET name = COALESCE($1, name), description = COALESCE($2, description), priority = COALESCE($3, priority) WHERE id = $4 RETURNING *`;
    const result = await this.db.query(query, [
      task.name,
      task.description,
      task.priority,
      id,
    ]);
    return result.rows[0];
  }

  public deleteTask(id: number): string {
    const array = this.tasks.filter((data) => data.id != id);
    this.tasks = array;
    return `Tarea con id ${id} eliminada`;
  }
}
