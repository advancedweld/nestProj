import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { NetworkDelay } from './network-delay.entity';
import { ApiLatency } from './api-latency.entity';
import { FPS } from './fps.entity';
import { Error } from './error.entity';

@Entity()
export class Stastics {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => NetworkDelay, (networkDelay) => networkDelay.stastics, {
    cascade: true,
  })
  networkDelay: NetworkDelay[];

  @OneToMany(() => ApiLatency, (apiLatency) => apiLatency.stastics, {
    cascade: true,
  })
  apiLatency: ApiLatency[];

  @OneToMany(() => FPS, (fps) => fps.stastics, { cascade: true })
  fps: FPS[];

  @OneToMany(() => Error, (error) => error.stastics, { cascade: true })
  error: Error[];
}
