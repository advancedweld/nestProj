import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Stastics } from './stastic.entity';

@Entity()
export class Error {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  message: string;

  @ManyToOne(() => Stastics, (stastics) => stastics.error)
  stastics: Stastics;
}
