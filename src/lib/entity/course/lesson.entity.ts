import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Section } from './section.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Section, (section) => section.lessons)
  @JoinColumn({ name: 'section_id' })
  section: Section;

  @Column({ length: 255 })
  title: string;

  @Column({ name: 'video_url', length: 255 })
  videoUrl: string;

  @Column({ type: 'int' })
  duration: number;

  @Column({ name: 'order', type: 'int' })
  order: number;

  @Column({ type: 'text', nullable: true })
  description: string;
}
