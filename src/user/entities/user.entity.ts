import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export enum UserRole {
  Root = 'root',
  Vip = 'vip',
  Normal = 'normal',
}
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_name',
  })
  userName: string;

  // 返回的字段中不 包含password
  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  email: string;

  // 年龄
  @Column({ nullable: true })
  age: number;

  // 性别
  @Column({ nullable: true })
  gender: 'male' | 'female';
  // 用户角色
  @Column('simple-enum', { enum: UserRole })
  role: string;

  @Column({ nullable: true })
  hobby: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @Column({ nullable: true })
  avatar: string;
}
