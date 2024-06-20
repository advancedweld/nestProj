import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Stastics } from './stastic.entity';

@Entity()
export class FPS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  value: number;

  @ManyToOne(() => Stastics, (stastics) => stastics.fps)
  stastics: Stastics;
}
