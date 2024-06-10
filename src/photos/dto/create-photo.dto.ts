import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreatePhotoDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  name: string;

  @IsInt()
  totalPages: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  filename: string;

  @IsOptional()
  isPublished?: boolean;

  @IsInt()
  authorId: number;
}
