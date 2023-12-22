import {
  IsInt,
  IsString,
  isString,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  password: string;
}
