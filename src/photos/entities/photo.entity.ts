import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsInt, IsString, IsOptional } from 'class-validator';

import { Author } from '../../author/entities/author.entity';
@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  @IsString()
  name: string;

  @Column('int')
  @IsInt()
  totalPages: number;

  // nullable声明可选参数
  @Column({ nullable: true })
  @IsOptional()
  description: string;

  @Column()
  @IsString()
  filename: string;

  @Column('int', { default: 0 })
  views: number;

  @Column()
  isPublished: boolean;

  @ManyToOne((type) => Author, (author) => author.photos)
  // 关系所有者方需要添加JoinColumn 注解
  @JoinColumn()
  author: Author;
}
