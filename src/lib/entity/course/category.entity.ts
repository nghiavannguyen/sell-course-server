import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from './course.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true, length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Course, (course) => course.category)
  courses: Course[];
}
