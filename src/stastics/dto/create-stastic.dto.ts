import {
  IsArray,
  IsOptional,
  IsObject,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { FPSDto } from './fps.dto';

export class CreateStasticDto {
  @IsOptional()
  @IsString()
  clientIp?: string;

  @IsArray()
  @IsObject({ each: true })
  networkDelay: any[];

  @IsArray()
  @IsObject({ each: true })
  apiLatency: any[];

  @IsArray()
  @IsOptional()
  @IsNotEmpty({ each: true }) // 如果 fps 数组存在，确保它不是空数组
  fps: FPSDto[];

  @IsArray()
  @IsOptional()
  @IsObject({ each: true })
  error: any[];
}
