import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
import { Course } from './course.entity';
  
  @Entity('categories')
  export class Category {
    @PrimaryGeneratedColumn()
    categoryId: number;
  
    @Column({ unique: true, length: 100 })
    name: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @OneToMany(() => Course, (course) => course.category)
    courses: Course[];
  
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
  