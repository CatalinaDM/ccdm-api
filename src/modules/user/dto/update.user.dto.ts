import { IsOptional, IsString, Length } from 'class-validator';
//import { Task } from 'src/modules/task/entities/task.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 250, { message: 'El nombre debe tener entre 3 y 250 caracteres' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @Length(3, 250, {
    message: 'El apellido debe tener entre 3 y 250 caracteres',
  })
  lastname?: string;

  @IsOptional()
  @IsString({ message: 'El username debe ser una cadena de texto' })
  @Length(3, 100, {
    message: 'El username debe tener entre 3 y 100 caracteres',
  })
  username?: string;

  @IsOptional()
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @Length(6, 100, {
    message: 'La contraseña debe tener entre 6 y 100 caracteres',
  })
  password?: string;

  @IsOptional()
  created_at?: Date;

  //   @IsOptional()
  //   tasks?: Task[];
}
