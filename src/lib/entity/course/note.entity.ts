import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
  } from 'typeorm';
  import { Video } from './video.entity';
import { User } from '../user/user.entity';
  
  @Entity('notes')
  export class Note {
    @PrimaryGeneratedColumn()
    noteId: number;
  
    @ManyToOne(() => Video, (video) => video.notes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'video_id' })
    video: Video;
  
    @ManyToOne(() => User, (user) => user.notes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @Column({ type: 'text', nullable: true })
    content: string; // Nội dung ghi chú (có thể là mô tả ngắn hoặc chi tiết)
  
    @Column({ type: 'int' })
    timestamp: number; // Thời điểm trên video (tính bằng giây)
  
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
  