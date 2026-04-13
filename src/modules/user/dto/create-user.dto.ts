import { Length, IsOptional, IsBoolean } from 'class-validator';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
//import { Task } from 'src/modules/task/entities/task.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 250)
  name: string;
  @IsString()
  @IsNotEmpty()
  @Length(3, 250)
  lastname: string;
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  username: string;
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{6,}$/, {
    message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.',
  })
  password: string;
  @IsBoolean()
  @IsOptional()
  role_admin?: boolean;
  created_at: Date;
}
