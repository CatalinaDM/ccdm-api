import { IsBoolean, IsOptional, IsString, Length, Matches } from 'class-validator';
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
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{6,}$/, {
    message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.',
  })
  password?: string;

  @IsOptional()
  created_at?: Date;
  @IsBoolean()
  @IsOptional()
  role_admin?: boolean;

  //   @IsOptional()
  //   tasks?: Task[];
}
