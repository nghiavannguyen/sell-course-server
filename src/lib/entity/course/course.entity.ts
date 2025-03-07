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
import { Category } from './category.entity';
import { User } from '../user/user.entity';
import { CourseMaterial } from './course-material.entity';
import { Lesson } from './lesson.entity';
import { Review } from './review.entity';
import { Wishlist } from './wish-list.entity';
import { Section } from './section.entity';
import { Enrollment } from './enrollment.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Category, (category) => category.courses)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => User, (user) => user.courses)
  @JoinColumn({ name: 'instructor_id' })
  instructor: User;

  @Column({ name: 'preview_video_url', length: 255, nullable: true })
  previewVideoUrl: string;

  @Column({
    name: 'price_before_discount',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  priceBeforeDiscount: number;

  @Column({
    name: 'price_after_discount',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  priceAfterDiscount: number;

  @Column({
    name: 'average_rating',
    type: 'decimal',
    precision: 3,
    scale: 2,
    nullable: true,
  })
  averageRating: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  // Relationships
  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => Section, (section) => section.course)
  sections: Section[];

  @OneToMany(() => CourseMaterial, (material) => material.course)
  materials: CourseMaterial[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.course)
  wishlists: Wishlist[];

  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[];
}
