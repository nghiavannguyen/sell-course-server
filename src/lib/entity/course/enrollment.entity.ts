import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Course } from '../course/course.entity';
import { User } from '../user/user.entity';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.enrollments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Course, (course) => course.enrollments)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ type: 'float' })
  progress: number;

  @CreateDateColumn({ name: 'enrolled_at', type: 'timestamptz' })
  enrolledAt: Date;
}
