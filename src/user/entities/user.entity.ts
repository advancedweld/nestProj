import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { IsInt, IsString, isString } from 'class-validator';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  username: string;

  @Column()
  @IsString()
  password: string;

  @Column({ nullable: true })
  avatar: string;
}
