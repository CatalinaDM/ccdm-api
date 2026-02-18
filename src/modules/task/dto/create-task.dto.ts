import { IsBoolean, IsNotEmpty, IsNumber, IsString, Max, Min,IsInt } from 'class-validator';


export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Min(3)
  @Max(100)
  name: string;
  @IsString()
  @IsNotEmpty()
  @Min(3)
  @Max(500)
  description: string;
  @IsBoolean()
  @IsNotEmpty()
  priority: boolean;

  @IsNumber()
  @IsInt()
  user_id: number;
}
