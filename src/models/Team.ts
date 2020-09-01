import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from './User';

@Entity('teams')
export default class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  avatar_id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column()
  top_id: string;

  @Column()
  jungle_id: string;

  @Column()
  mid_id: string;

  @Column()
  adcarry_id: string;

  @Column()
  support_id: string;

  @Column()
  coach_id: string;

  @Column()
  cash: number;

  @Column()
  points: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
