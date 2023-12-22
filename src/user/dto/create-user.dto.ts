import { IsInt, IsString, isString, IsEmail } from 'class-validator';
export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  createTime: Date;

  updateTime: Date;

  avatar: string;
}
