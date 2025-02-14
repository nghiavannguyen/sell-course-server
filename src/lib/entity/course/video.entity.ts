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
import { Note } from './note.entity';
import { Comment } from './comment.entity';
  
  @Entity('videos')
  export class Video {
    @PrimaryGeneratedColumn()
    video_id: number;
  
    @ManyToOne(() => Course, (course) => course.videos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'course_id' })
    course: Course;
  
    @Column()
    title: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @Column()
    video_url: string;
  
    @Column({ type: 'int', nullable: true })
    duration: number; // Thời lượng video tính bằng giây
  
    @Column({ type: 'int', nullable: true })
    position: number; // Thứ tự hiển thị trong khóa học
  
    @OneToMany(() => Comment, (comment) => comment.video)
    comments: Comment[];
  
    @OneToMany(() => Note, (note) => note.video)
    notes: Note[];
  
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
  