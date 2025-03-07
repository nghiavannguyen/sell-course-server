import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { User } from '../user/user.entity';

@Entity('wishlist')
export class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.wishlists)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Course, (course) => course.wishlists)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @CreateDateColumn({ name: 'added_at', type: 'timestamptz' })
  addedAt: Date;
}
