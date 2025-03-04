import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_settings')
export class UserSettings {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToOne(() => User, (user) => user.settings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 50 })
  language: string;

  @Column({ length: 50 })
  theme: string;

  @Column({ name: 'notifications_enabled', type: 'boolean', default: true })
  notificationsEnabled: boolean;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
