import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Course } from './course.entity';

@Entity('course_materials')
export class CourseMaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Course, (course) => course.materials)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ length: 255 })
  title: string;

  @Column({ name: 'file_url', length: 255 })
  fileUrl: string;

  @Column({ name: 'file_type', length: 50 })
  fileType: string;

  @CreateDateColumn({ name: 'uploaded_at', type: 'timestamptz' })
  uploadedAt: Date;
}
