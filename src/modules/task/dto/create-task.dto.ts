import { IsBoolean, Length } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';

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
}
