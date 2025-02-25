import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Course } from '../course/course.entity';
import { Note } from '../course/note.entity';
import { Comment } from '../course/comment.entity';
import { RefreshToken } from './refresh-token.entity';

export enum UserRole {
  ADMIN = 'admin',
  COURSE_CREATOR = 'COURSE_CREATOR',
  STUDENT = 'student',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  // Nếu user là admin, có thể có nhiều khóa học tạo ra
  @OneToMany(() => Course, (course) => course.admin)
  courses: Course[];

  // Các bình luận của user (dành cho học viên)
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  // Các ghi chú của user (dành cho học viên)
  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @OneToMany(() => RefreshToken, (rf) => rf.user)
  refreshToken: RefreshToken[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
