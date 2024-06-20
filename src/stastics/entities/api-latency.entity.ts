import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Stastics } from './stastic.entity';

@Entity()
export class ApiLatency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column('float')
  latency: number;

  @ManyToOne(() => Stastics, (stastics) => stastics.apiLatency)
  stastics: Stastics;
}
