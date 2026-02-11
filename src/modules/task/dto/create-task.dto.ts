import { IsBoolean, IsNotEmpty, IsString, Max, Min } from 'class-validator';
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
}
