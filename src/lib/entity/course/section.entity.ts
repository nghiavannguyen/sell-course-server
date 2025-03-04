import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { Lesson } from './lesson.entity';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Course, (course) => course.sections)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ length: 255 })
  title: string;

  // Vì "order" là từ khóa nên vẫn mapping tên cột là "order"
  @Column({ name: 'order', type: 'int' })
  order: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Lesson, (lesson) => lesson.section)
  lessons: Lesson[];
}
