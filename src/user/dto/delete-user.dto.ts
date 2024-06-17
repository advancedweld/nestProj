import { IsInt, IsString, isString, IsEmail } from 'class-validator';
export class DeleteUserDto {
  @IsString()
  userId: string;
}
