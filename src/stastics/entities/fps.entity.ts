import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Stastics } from './stastic.entity';

@Entity()
export class FPS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  // 将 timeStamp 字段改为 Date 类型
  @Column('timestamp')
  timeStamp: Date;

  @Column('int')
  value: number;

  @ManyToOne(() => Stastics, (stastics) => stastics.fps)
  stastics: Stastics;
}
