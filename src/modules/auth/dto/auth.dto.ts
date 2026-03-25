import { IsNotEmpty, IsString } from 'class-validator';
export class AuthDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
