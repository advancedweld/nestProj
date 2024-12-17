import { IsString, IsInt, IsDateString, IsNotEmpty } from 'class-validator';

export class FPSDto {
  @IsString()
  @IsNotEmpty() // 确保 url 不能为空
  url: string;

  @IsDateString()
  @IsNotEmpty() // 确保 timeStamp 不能为空
  timeStamp: string; // 使用 ISO 8601 日期字符串格式

  @IsInt()
  @IsNotEmpty() // 确保 value 不能为空
  value: number;
}
