import { IsBoolean, Length } from 'class-validator';
import { IsNotEmpty, IsNumber, IsString, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 500)
  name: string;
  @IsString()
  @IsNotEmpty()
  @Length(3, 500)
  description: string;
  @IsBoolean()
  @IsNotEmpty()
  priority: boolean;

  @IsNumber()
  @IsInt()
  user_id: number;
}
