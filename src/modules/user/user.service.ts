import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma.service';
import { Client } from 'pg';
import { Task } from '../task/entities/task.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Client,
    private prisma: PrismaService,
  ) {}

  // Obtener todos los usuarios
  public async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { id: 'asc' },]
      select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        created_at: true,
       }
      });
    return users;
  }

  // Obtener usuario por ID
  public async getUserById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  // Obtener tareas de un usuario por ID
  public async getTasksByUser(id: number): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: { user_id: id }, // Filtra las tareas por el ID del usuario
    });
  }

  // Crear nuevo usuario
  public async insertUser(user: CreateUserDto): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: user,
    });
    return newUser;
  }

  // Actualizar usuario existente
  public async updateUser(
    id: number,
    userUpdated: UpdateUserDto,
  ): Promise<User | null> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: id },
        data: userUpdated,
      });
      return updatedUser;
    } catch (error) {
      console.log(error);
      // Si no existe, Prisma lanza un error
      return null;
    }
  }

  // Eliminar usuario por ID
  public async deleteUser(id: number): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id: id },
      });
      return true;
    } catch (error) {
      console.log(error);
      // Si no existe, Prisma lanza un error
      return false;
    }
  }
}
