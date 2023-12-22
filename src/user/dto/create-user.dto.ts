import { IsInt, IsString, isString, IsEmail } from 'class-validator';
export class CreateUserDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;

  // @IsEmail()
  email: string;

  createTime: Date;

  updateTime: Date;

  avatar: string;
}
