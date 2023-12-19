import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsInt, IsString } from 'class-validator';

import { User } from '../../users/entities/user.entity';
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
  description: string;

  @Column()
  @IsString()
  filename: string;

  @Column('int')
  @IsInt()
  views: number;

  @Column()
  isPublished: boolean;

  @ManyToOne((type) => User, (user) => user.photos)
  // 关系所有者方需要添加JoinColumn 注解
  @JoinColumn()
  user: User;
}
