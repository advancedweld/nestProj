import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Stastics } from './stastic.entity';

@Entity()
export class NetworkDelay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  performanceData: object;

  @Column('json')
  performanceType: object;

  @Column('json')
  performancePaint: object;

  @ManyToOne(() => Stastics, (stastics) => stastics.networkDelay)
  stastics: Stastics;
}
