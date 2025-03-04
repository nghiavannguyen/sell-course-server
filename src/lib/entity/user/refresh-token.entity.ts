import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('RefreshTokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => User, (user) => user.refreshToken, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  refreshToken: string;

  @Column()
  expireAt: Date;
}
