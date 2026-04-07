import { Length } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';
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
  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  password: string;
  created_at: Date;
  // tasks: Task[];
}
