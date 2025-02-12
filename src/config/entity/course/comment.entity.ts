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
  
  @Entity('comments')
  export class Comment {
    @PrimaryGeneratedColumn()
    comment_id: number;
  
    @ManyToOne(() => Video, (video) => video.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'video_id' })
    video: Video;
  
    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @Column({ type: 'text' })
    content: string;
  
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
  