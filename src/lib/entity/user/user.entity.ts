import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from '../course/course.entity';
import { Wishlist } from '../course/wish-list.entity';
import { Review } from '../course/review.entity';
import { UserSettings } from './user-setting.entity';
import { Notification } from './notification.entity';
import { RefreshToken } from './refresh-token.entity';
import { Enrollment } from '../course/enrollment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  // how to make id is uuid
  id: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column()
  name: string;

  @Column({ name: 'password', length: 255 })
  password: string;

  @Column({ length: 50 })
  role: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ name: 'profile_picture_url', length: 255, nullable: true })
  profilePictureUrl: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  // Relationships
  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlists: Wishlist[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshToken: RefreshToken[];

  @OneToOne(() => UserSettings, (settings) => settings.user)
  settings: UserSettings;
}
