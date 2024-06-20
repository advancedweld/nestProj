import { IsArray, IsOptional, IsObject } from 'class-validator';

export class CreateStasticDto {
  @IsArray()
  @IsObject({ each: true })
  networkDelay: any[];

  @IsArray()
  @IsObject({ each: true })
  apiLatency: any[];

  @IsArray()
  @IsOptional()
  fps: number[];

  @IsArray()
  @IsOptional()
  @IsObject({ each: true })
  error: any[];
}
